import { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { safeStorage } from '../utils/safeStorage';

export interface UserProfileData {
  fullName: string;
  phoneNumber: string;
  email: string;
  studyReminderEnabled?: boolean;
  studyReminderTime?: string;
}

export function useProfile() {
  const [profile, setProfile] = useState<UserProfileData>({
    fullName: '',
    phoneNumber: '',
    email: '',
    studyReminderEnabled: false,
    studyReminderTime: '08:00'
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setIsLoading(false);
      return;
    }

    const docRef = doc(db, 'users', user.uid, 'profile', 'default');
    setIsLoading(true);

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as UserProfileData;
        setProfile(data);
        safeStorage.setItem(`profile_${user.uid}`, JSON.stringify(data));
      } else {
        // Init with default/local
        const saved = safeStorage.getItem(`profile_${user.uid}`);
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            setProfile(prev => ({ ...prev, ...parsed }));
            setDoc(docRef, parsed, { merge: true }).catch(console.error);
          } catch(e) {}
        } else {
          const initProfile = {
            fullName: user.displayName || '',
            phoneNumber: '',
            email: user.email || '',
            studyReminderEnabled: false,
            studyReminderTime: '08:00'
          };
          setProfile(initProfile);
          setDoc(docRef, initProfile, { merge: true }).catch(console.error);
        }
      }
      setIsLoading(false);
    }, (error) => {
      console.error("Firebase profile sync error", error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [auth.currentUser?.uid]);

  const saveProfile = async (newProfile: UserProfileData) => {
    setProfile(newProfile);
    const user = auth.currentUser;
    if (user) {
      safeStorage.setItem(`profile_${user.uid}`, JSON.stringify(newProfile));
      const docRef = doc(db, 'users', user.uid, 'profile', 'default');
      try {
        await setDoc(docRef, newProfile, { merge: true });
      } catch (e) {
        console.error("Failed to update firestore profile", e);
      }
    }
  };

  return { profile, saveProfile, isLoading };
}
