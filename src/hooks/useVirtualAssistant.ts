import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  query, 
  where, 
  orderBy, 
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
  createdAt: any;
  updatedAt: any;
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

  // Listen to user conversations from Firestore when signed in
  useEffect(() => {
    if (!userId) {
      setConversations([]);
      return;
    }

    try {
      const q = query(
        collection(db, 'conversations'),
        where('userId', '==', userId),
        orderBy('updatedAt', 'desc')
      );

      return onSnapshot(q, (snapshot) => {
        const convos = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Conversation[];
        setConversations(convos);
      }, (err) => {
        console.warn('Firestore conversation listener warning:', err);
      });
    } catch (err) {
      console.warn('Could not setup conversations listener:', err);
    }
  }, [userId]);

  // Listen to messages of active conversation from Firestore when signed in
  useEffect(() => {
    if (!activeConversationId || !userId) {
      if (!activeConversationId) {
        setMessages([INITIAL_GREETING]);
      }
      return;
    }

    try {
      const q = query(
        collection(db, `conversations/${activeConversationId}/messages`),
        orderBy('timestamp', 'asc')
      );

      return onSnapshot(q, (snapshot) => {
        const msgs = snapshot.docs.map(doc => {
          const data = doc.data();
          let tsStr = formatNow();

          if (data.timestamp?.toDate) {
            try {
              tsStr = data.timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            } catch (e) {
              tsStr = formatNow();
            }
          } else if (typeof data.timestamp === 'string' && data.timestamp && !data.timestamp.includes('Invalid')) {
            tsStr = data.timestamp;
          }

          return {
            id: doc.id,
            role: data.role,
            content: data.content,
            timestamp: tsStr
          };
        }) as AssistantMessage[];
        
        if (msgs.length === 0) {
          setMessages([INITIAL_GREETING]);
        } else {
          setMessages(msgs);
        }
      }, (err) => {
        console.warn('Firestore messages listener warning:', err);
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
      const docRef = await addDoc(collection(db, 'conversations'), {
        userId,
        title,
        lastMessage: '',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
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

    const userMsgId = 'msg-' + Date.now();
    const userTimestamp = formatNow();
    const newUserMsg: AssistantMessage = {
      id: userMsgId,
      role: 'user',
      content: trimmed,
      timestamp: userTimestamp
    };

    // Optimistically update local messages so UI responds immediately!
    setMessages(prev => [...prev, newUserMsg]);

    let currentConvId = activeConversationId;

    // Save user message to Firestore if logged in
    if (userId) {
      try {
        if (!currentConvId) {
          currentConvId = await startNewConversation(trimmed.slice(0, 30) + (trimmed.length > 30 ? '...' : ''));
        }

        if (currentConvId) {
          await addDoc(collection(db, `conversations/${currentConvId}/messages`), {
            role: 'user',
            content: trimmed,
            timestamp: serverTimestamp(),
          });

          await updateDoc(doc(db, 'conversations', currentConvId), {
            updatedAt: serverTimestamp(),
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

    const assistantMsgId = 'msg-' + (Date.now() + 1);
    const assistantTimestamp = formatNow();
    const newAssistantMsg: AssistantMessage = {
      id: assistantMsgId,
      role: 'assistant',
      content: replyText,
      timestamp: assistantTimestamp
    };

    // Add assistant response to Firestore if signed in
    if (userId && currentConvId) {
      try {
        await addDoc(collection(db, `conversations/${currentConvId}/messages`), {
          role: 'assistant',
          content: replyText,
          timestamp: serverTimestamp(),
        });
      } catch (err) {
        console.warn('Firestore write warning for assistant reply:', err);
      }
    }

    // Update local state so answer appears immediately without waiting for Firestore
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
