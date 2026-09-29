import { useState, useEffect, useCallback } from 'react';
import { AssistantMessage, ChatSession } from '../types';
import { generateClientTheologicalResponse } from '../utils/theologicalFallback';
import { safeStorage } from '../utils/safeStorage';
import { db, auth } from '../firebase';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';

const SESSIONS_STORAGE_KEY = 'std_campus_chat_sessions_v7';
const ACTIVE_SESSION_KEY = 'std_campus_active_session_v7';

const formatNow = () => {
  const d = new Date();
  let hours = d.getHours();
  const minutes = d.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${hours}:${minutes} ${ampm}`;
};

const formatDateShort = () => {
  const d = new Date();
  return `${d.getDate()}/${d.getMonth() + 1} ${formatNow()}`;
};

const INITIAL_GREETING: AssistantMessage = {
  id: 'welcome-msg',
  role: 'assistant',
  content: `¡Paz y gracia! Soy tu **Especialista en Teología, Exégesis y Homilética** del Seminario Teológico Digital.

Mi programación está optimizada para guiarte en dos áreas maestras:
- 📜 **Creación de Sermones Profundos y Bosquejos Homiléticos** (Estructura expositiva, ICT/ICS, puntos clave, exégesis, ilustraciones y llamados al altar).
- 🔍 **Estudio Bíblico Avanzado y Exégesis** (Contexto histórico-gramatical, idiomas originales Griego Koiné y Hebreo, y Teología Sistemática).

¿Qué pasaje bíblico, tema para sermón o concepto teológico te gustaría preparar o estudiar hoy?`,
  timestamp: formatNow(),
};

const createFreshSession = (id?: string): ChatSession => ({
  id: id || 'session-' + Date.now(),
  title: 'Nuevo Chat',
  updatedAt: formatDateShort(),
  messages: [{ ...INITIAL_GREETING, timestamp: formatNow() }],
});

export function useVirtualAssistant() {
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    try {
      const saved = safeStorage.getItem(SESSIONS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {}
    const defaultSession = createFreshSession();
    return [defaultSession];
  });

  const [activeSessionId, setActiveSessionId] = useState<string>(() => {
    try {
      const savedId = safeStorage.getItem(ACTIVE_SESSION_KEY);
      if (savedId) return savedId;
    } catch (e) {}
    return sessions[0]?.id || 'session-1';
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activeSession = sessions.find(s => s.id === activeSessionId) || sessions[0] || createFreshSession();
  const messages = activeSession ? activeSession.messages : [];

  // Sync to safeStorage & Firebase Firestore
  useEffect(() => {
    try {
      safeStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(sessions));
      if (activeSessionId) {
        safeStorage.setItem(ACTIVE_SESSION_KEY, activeSessionId);
      }
    } catch (e) {}

    // Firestore sync if user is logged in
    const user = auth?.currentUser;
    if (user && user.uid !== 'invitado_seminario' && db && sessions.length > 0) {
      const docRef = doc(db, 'users', user.uid, 'chats', 'default');
      setDoc(docRef, { sessions, updatedAt: new Date().toISOString() }, { merge: true }).catch(console.error);
    }
  }, [sessions, activeSessionId]);

  // Real-time Firestore sync across devices
  useEffect(() => {
    const user = auth?.currentUser;
    if (!user || user.uid === 'invitado_seminario' || !db) return;

    const docRef = doc(db, 'users', user.uid, 'chats', 'default');
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data && Array.isArray(data.sessions) && data.sessions.length > 0) {
          setSessions(data.sessions);
          safeStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(data.sessions));
        }
      }
    }, (err) => {
      console.error("Firebase chat sync error:", err);
    });

    return () => unsubscribe();
  }, [auth?.currentUser?.uid]);

  const createNewChat = useCallback(() => {
    const newSession = createFreshSession();
    setSessions(prev => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
  }, []);

  const loadSession = useCallback((sessionId: string) => {
    setActiveSessionId(sessionId);
  }, []);

  const deleteSession = useCallback((sessionId: string) => {
    setSessions(prev => {
      const filtered = prev.filter(s => s.id !== sessionId);
      if (filtered.length === 0) {
        const fresh = createFreshSession();
        setActiveSessionId(fresh.id);
        return [fresh];
      }
      if (sessionId === activeSessionId) {
        setActiveSessionId(filtered[0].id);
      }
      return filtered;
    });
  }, [activeSessionId]);

  const clearAllHistory = useCallback(() => {
    const fresh = createFreshSession();
    setSessions([fresh]);
    setActiveSessionId(fresh.id);
  }, []);

  const sendMessage = useCallback(async (
    text: string, 
    context?: { courseTitle?: string; lessonTitle?: string }
  ) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    setError(null);
    setIsLoading(true);

    const userTimeStr = formatNow();
    const userMsg: AssistantMessage = {
      id: 'usr-' + Date.now(),
      role: 'user',
      content: trimmed,
      timestamp: userTimeStr,
    };

    let updatedTitle = activeSession.title;
    const userMsgCount = activeSession.messages.filter(m => m.role === 'user').length;
    if (userMsgCount === 0 || activeSession.title === 'Nuevo Chat') {
      const clean = trimmed
        .replace(/por favor/gi, '')
        .replace(/genera/gi, '')
        .replace(/un bosquejo/gi, '')
        .replace(/para el pasaje de:/gi, '')
        .replace(/para el pasaje de/gi, '')
        .trim();
      updatedTitle = clean.length > 28 ? clean.slice(0, 28) + '...' : (clean || 'Consulta Teológica');
    }

    const updatedMessagesWithUser = [...activeSession.messages, userMsg];

    setSessions(prev => prev.map(s => {
      if (s.id === activeSessionId) {
        return {
          ...s,
          title: updatedTitle,
          updatedAt: formatDateShort(),
          messages: updatedMessagesWithUser,
        };
      }
      return s;
    }));

    let replyContent = '';

    try {
      const apiMessages = updatedMessagesWithUser
        .filter(m => m.id !== 'welcome-msg')
        .map(m => ({
          role: m.role,
          content: m.content
        }));

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000);

      try {
        const res = await fetch('/api/assistant/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: apiMessages,
            context: context || {}
          }),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          replyContent = data.reply || '';
        }
      } catch (fetchErr) {
        clearTimeout(timeoutId);
        console.warn('API fetch aborted/failed, using client theological response generator');
      }
    } catch (err) {
      console.warn('Backend API request error:', err);
    }

    if (!replyContent) {
      replyContent = generateClientTheologicalResponse(trimmed, context);
    }

    const assistantMsg: AssistantMessage = {
      id: 'ast-' + Date.now(),
      role: 'assistant',
      content: replyContent,
      timestamp: formatNow(),
    };

    setSessions(prev => prev.map(s => {
      if (s.id === activeSessionId) {
        return {
          ...s,
          updatedAt: formatDateShort(),
          messages: [...s.messages, assistantMsg],
        };
      }
      return s;
    }));

    setIsLoading(false);
  }, [activeSession, activeSessionId, isLoading]);

  return {
    sessions,
    activeSessionId,
    activeSession,
    messages,
    isLoading,
    error,
    sendMessage,
    createNewChat,
    loadSession,
    deleteSession,
    clearAllHistory,
  };
}
