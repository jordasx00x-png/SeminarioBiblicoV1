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
  getDocs,
  limit,
  deleteDoc
} from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useState, useEffect, useCallback } from 'react';
import { AssistantMessage } from '../types';

export interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  createdAt: any;
  updatedAt: any;
}

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
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
};

export function useVirtualAssistant() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<AssistantMessage[]>([INITIAL_GREETING]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const userId = auth.currentUser?.uid;

  // Listen to user conversations
  useEffect(() => {
    if (!userId) return;

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
    });
  }, [userId]);

  // Listen to messages of active conversation
  useEffect(() => {
    if (!activeConversationId) {
      setMessages([INITIAL_GREETING]);
      return;
    }

    const q = query(
      collection(db, `conversations/${activeConversationId}/messages`),
      orderBy('timestamp', 'asc')
    );

    return onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          role: data.role,
          content: data.content,
          timestamp: data.timestamp?.toDate ? data.timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recién enviado'
        };
      }) as AssistantMessage[];
      
      if (msgs.length === 0) {
        setMessages([INITIAL_GREETING]);
      } else {
        setMessages(msgs);
      }
    });
  }, [activeConversationId]);

  const startNewConversation = useCallback(async (title = 'Nueva Consulta') => {
    if (!userId) return null;

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
      console.error('Error creating conversation:', err);
      return null;
    }
  }, [userId]);

  const sendMessage = useCallback(async (
    text: string, 
    context?: { courseTitle?: string; lessonTitle?: string }
  ) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading || !userId) return;

    setError(null);
    setIsLoading(true);

    try {
      let currentConvId = activeConversationId;
      
      // If no active conversation, create one
      if (!currentConvId) {
        currentConvId = await startNewConversation(trimmed.slice(0, 30) + (trimmed.length > 30 ? '...' : ''));
        if (!currentConvId) throw new Error('No se pudo crear la conversación.');
      }

      // 1. Add user message to Firestore
      await addDoc(collection(db, `conversations/${currentConvId}/messages`), {
        role: 'user',
        content: trimmed,
        timestamp: serverTimestamp(),
      });

      // Update conversation metadata
      await updateDoc(doc(db, 'conversations', currentConvId), {
        updatedAt: serverTimestamp(),
        lastMessage: trimmed
      });

      // 2. Prepare history for API
      // We get the full history from the messages state (which is updated via onSnapshot)
      const apiMessages = [...messages.filter(m => m.id !== 'welcome-msg'), { role: 'user', content: trimmed }].map(m => ({
        role: m.role,
        content: m.content
      }));

      // 3. Call Assistant API
      const res = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiMessages,
          context: context || {},
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al comunicarse con el asistente.');

      // 4. Add assistant response to Firestore
      await addDoc(collection(db, `conversations/${currentConvId}/messages`), {
        role: 'assistant',
        content: data.reply || 'No se obtuvo respuesta.',
        timestamp: serverTimestamp(),
      });

    } catch (err: any) {
      console.error('Virtual assistant error:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [userId, activeConversationId, messages, isLoading, startNewConversation]);

  const deleteConversation = useCallback(async (id: string) => {
    try {
      await deleteDoc(doc(db, 'conversations', id));
      if (activeConversationId === id) {
        setActiveConversationId(null);
      }
    } catch (err) {
      console.error('Error deleting conversation:', err);
    }
  }, [activeConversationId]);

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
