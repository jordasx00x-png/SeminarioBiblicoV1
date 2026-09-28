import { 
  collection, 
  addDoc, 
  query, 
  where, 
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useState, useEffect, useCallback } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { AssistantMessage } from '../types';
import { generateClientTheologicalResponse } from '../utils/theologicalFallback';

export interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  createdAt: number;
  updatedAt: number;
}

const formatNow = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const INITIAL_GREETING: AssistantMessage = {
  id: 'welcome-msg',
  role: 'assistant',
  content: `¡Paz y gracia! Soy tu **Asistente Virtual Teológico y Académico** del Seminario.

Estoy aquí para responder cualquier pregunta que tengas:
- **Dudas sobre tus clases o lecciones** en curso.
- **Exégesis bíblica**, análisis de pasajes y contexto histórico.
- **Términos en idiomas bíblicos** (Griego koiné, Hebreo y Arameo).
- **Doctrina cristiana, teología sistemática e historia de la iglesia.**
- **Orientación pastoral y aplicación práctica.**

¿Qué pregunta o tema te gustaría explorar hoy?`,
  timestamp: formatNow(),
};

export function useVirtualAssistant() {
  const [userId, setUserId] = useState<string | null>(auth.currentUser?.uid || null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<AssistantMessage[]>([INITIAL_GREETING]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Track Auth state changes dynamically
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserId(user ? user.uid : null);
    });
    return () => unsubscribe();
  }, []);

  // Listen to user conversations from Firestore without orderBy to avoid needing composite indexes
  useEffect(() => {
    if (!userId) {
      setConversations([]);
      return;
    }

    try {
      const q = query(
        collection(db, 'conversations'),
        where('userId', '==', userId)
      );

      return onSnapshot(q, (snapshot) => {
        const convos = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || 'Consulta',
            lastMessage: data.lastMessage || '',
            createdAt: data.createdAt || 0,
            updatedAt: data.updatedAt || 0,
            userId: data.userId
          };
        }) as Conversation[];

        // Sort in JS by updatedAt descending
        convos.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
        setConversations(convos);
      }, (err) => {
        console.warn('Firestore conversation listener warning (handled gracefully):', err);
      });
    } catch (err) {
      console.warn('Could not setup conversations listener:', err);
    }
  }, [userId]);

  // Listen to messages of active conversation from Firestore without orderBy to avoid index errors
  useEffect(() => {
    if (!activeConversationId || !userId) {
      if (!activeConversationId) {
        setMessages([INITIAL_GREETING]);
      }
      return;
    }

    try {
      const q = query(
        collection(db, `conversations/${activeConversationId}/messages`)
      );

      return onSnapshot(q, (snapshot) => {
        const rawMsgs = snapshot.docs.map(doc => {
          const data = doc.data();
          let tsStr = formatNow();

          if (typeof data.timestamp === 'string' && data.timestamp && !data.timestamp.includes('Invalid')) {
            tsStr = data.timestamp;
          } else if (data.createdTime) {
            tsStr = new Date(data.createdTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          }

          return {
            id: doc.id,
            role: data.role,
            content: data.content,
            timestamp: tsStr,
            createdTime: data.createdTime || 0
          };
        });

        // Sort in JS by createdTime ascending
        rawMsgs.sort((a, b) => (a.createdTime || 0) - (b.createdTime || 0));

        const msgs = rawMsgs.map(m => ({
          id: m.id,
          role: m.role,
          content: m.content,
          timestamp: m.timestamp
        })) as AssistantMessage[];
        
        if (msgs.length > 0) {
          setMessages(msgs);
        }
      }, (err) => {
        console.warn('Firestore messages listener warning (handled gracefully):', err);
      });
    } catch (err) {
      console.warn('Could not setup messages listener:', err);
    }
  }, [activeConversationId, userId]);

  const startNewConversation = useCallback(async (title = 'Nueva Consulta') => {
    if (!userId) {
      setActiveConversationId(null);
      setMessages([INITIAL_GREETING]);
      return null;
    }

    try {
      const now = Date.now();
      const docRef = await addDoc(collection(db, 'conversations'), {
        userId,
        title,
        lastMessage: '',
        createdAt: now,
        updatedAt: now,
      });
      setActiveConversationId(docRef.id);
      return docRef.id;
    } catch (err) {
      console.warn('Error creating conversation in Firestore:', err);
      setActiveConversationId(null);
      setMessages([INITIAL_GREETING]);
      return null;
    }
  }, [userId]);

  const sendMessage = useCallback(async (
    text: string, 
    context?: { courseTitle?: string; lessonTitle?: string }
  ) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    setError(null);
    setIsLoading(true);

    const now = Date.now();
    const userMsgId = 'msg-' + now;
    const userTimestamp = formatNow();
    const newUserMsg: AssistantMessage = {
      id: userMsgId,
      role: 'user',
      content: trimmed,
      timestamp: userTimestamp
    };

    // 1. Optimistically update local messages array immediately
    setMessages(prev => [...prev, newUserMsg]);

    let currentConvId = activeConversationId;

    // 2. Save user message to Firestore if logged in
    if (userId) {
      try {
        if (!currentConvId) {
          currentConvId = await startNewConversation(trimmed.slice(0, 30) + (trimmed.length > 30 ? '...' : ''));
        }

        if (currentConvId) {
          await addDoc(collection(db, `conversations/${currentConvId}/messages`), {
            role: 'user',
            content: trimmed,
            timestamp: userTimestamp,
            createdTime: now
          });

          await updateDoc(doc(db, 'conversations', currentConvId), {
            updatedAt: now,
            lastMessage: trimmed
          });
        }
      } catch (err) {
        console.warn('Firestore write warning (continuing with local chat):', err);
      }
    }

    let replyText = '';

    try {
      // Prepare history for backend API
      const currentMsgs = messages.filter(m => m.id !== 'welcome-msg');
      const apiMessages = [...currentMsgs, newUserMsg].map(m => ({
        role: m.role,
        content: m.content
      }));

      // Call Assistant API
      const res = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiMessages,
          context: context || {},
        }),
      });

      if (res.ok) {
        const data = await res.json();
        replyText = data.reply || '';
      }
    } catch (err: any) {
      console.warn('API call failed, switching to local theological engine:', err);
    }

    // Fallback if API returned empty, failed, or was unreachable
    if (!replyText) {
      replyText = generateClientTheologicalResponse(trimmed, context);
    }

    const replyTime = Date.now();
    const assistantMsgId = 'msg-' + replyTime;
    const assistantTimestamp = formatNow();
    const newAssistantMsg: AssistantMessage = {
      id: assistantMsgId,
      role: 'assistant',
      content: replyText,
      timestamp: assistantTimestamp
    };

    // 3. Save assistant response to Firestore if signed in
    if (userId && currentConvId) {
      try {
        await addDoc(collection(db, `conversations/${currentConvId}/messages`), {
          role: 'assistant',
          content: replyText,
          timestamp: assistantTimestamp,
          createdTime: replyTime
        });
      } catch (err) {
        console.warn('Firestore write warning for assistant reply:', err);
      }
    }

    // 4. Update local state so answer appears immediately without waiting
    setMessages(prev => {
      if (prev.some(m => m.id === assistantMsgId)) return prev;
      return [...prev, newAssistantMsg];
    });

    setIsLoading(false);
  }, [userId, activeConversationId, messages, isLoading, startNewConversation]);

  const deleteConversation = useCallback(async (id: string) => {
    try {
      if (userId) {
        await deleteDoc(doc(db, 'conversations', id));
      }
      if (activeConversationId === id) {
        setActiveConversationId(null);
        setMessages([INITIAL_GREETING]);
      }
    } catch (err) {
      console.error('Error deleting conversation:', err);
    }
  }, [userId, activeConversationId]);

  return {
    messages,
    conversations,
    activeConversationId,
    setActiveConversationId,
    isLoading,
    error,
    sendMessage,
    startNewConversation,
    deleteConversation,
  };
}
