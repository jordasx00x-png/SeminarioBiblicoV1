import { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { signInWithPopup, signInWithRedirect, GoogleAuthProvider, onAuthStateChanged, User } from 'firebase/auth';
import { safeStorage } from '../utils/safeStorage';

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => {
    // Check if there was an active guest session
    const isGuest = safeStorage.getItem('is_guest_mode') === 'true';
    if (isGuest) {
      return {
        uid: 'invitado_seminario',
        displayName: 'Estudiante Invitado',
        email: 'invitado@seminariodigital.org',
        photoURL: null,
      } as unknown as User;
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState(!user);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    // Fast fallback so user is never stuck on a blank/loading screen
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    if (!auth) {
      console.error("Auth object is missing");
      setIsLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      clearTimeout(timer);
      if (currentUser) {
        setUser(currentUser);
        safeStorage.removeItem('is_guest_mode');
      } else {
        const isGuest = safeStorage.getItem('is_guest_mode') === 'true';
        if (!isGuest) {
          setUser(null);
        }
      }
      setIsLoading(false);
    }, (error) => {
      console.warn("Auth state error:", error);
      clearTimeout(timer);
      setIsLoading(false);
    });

    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    if (!auth) {
      setAuthError('El sistema de autenticación no está disponible.');
      return;
    }
    const provider = new GoogleAuthProvider();
    setAuthError(null);
    try {
      // Try popup first
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      console.error('Error signing in with Google', error);
      
      // If unauthorized domain, notify the user cleanly in state
      if (error.code === 'auth/unauthorized-domain' || (error.message && error.message.includes('auth/unauthorized-domain'))) {
        const errorMsg = `El dominio actual (${window.location.hostname}) no está autorizado en la consola de Firebase.`;
        setAuthError(errorMsg);
        return;
      }

      // If popup is blocked or fails, try redirect as fallback
      if (error.code === 'auth/popup-blocked' || error.code === 'auth/popup-closed-by-user' || /Mobi|Android/i.test(navigator.userAgent)) {
        try {
          await signInWithRedirect(auth, provider);
        } catch (e: any) {
          console.error('Redirect failed too', e);
          if (e.code === 'auth/unauthorized-domain' || (e.message && e.message.includes('auth/unauthorized-domain'))) {
            setAuthError(`El dominio actual (${window.location.hostname}) no está autorizado en la consola de Firebase.`);
          } else {
            setAuthError('Error al iniciar sesión por redirección: ' + e.message);
          }
        }
      } else {
        setAuthError('Error al iniciar sesión: ' + error.message);
      }
    }
  };

  const signInAsGuest = () => {
    safeStorage.setItem('is_guest_mode', 'true');
    setUser({
      uid: 'invitado_seminario',
      displayName: 'Estudiante Invitado',
      email: 'invitado@seminariodigital.org',
      photoURL: null,
    } as unknown as User);
    setIsLoading(false);
    setAuthError(null);
  };

  const signOut = () => {
    safeStorage.removeItem('is_guest_mode');
    setUser(null);
    if (auth) {
      auth.signOut().catch(() => {});
    }
  };

  return { user, isLoading, authError, signInWithGoogle, signInAsGuest, signOut, setAuthError };
}
