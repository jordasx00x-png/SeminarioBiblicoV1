import { useState, useEffect, useCallback } from 'react';
import { AssistantMessage } from '../types';
import { generateClientTheologicalResponse } from '../utils/theologicalFallback';
import { safeStorage } from '../utils/safeStorage';

const STORAGE_KEY = 'std_campus_chat_history_v2';

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
  const [messages, setMessages] = useState<AssistantMessage[]>(() => {
    try {
      const saved = safeStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {}
    return [{ ...INITIAL_GREETING, timestamp: formatNow() }];
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync to safeStorage
  useEffect(() => {
    try {
      safeStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (e) {}
  }, [messages]);

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

    // 1. Add user message synchronously
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);

    let replyContent = '';

    try {
      const apiMessages = updatedMessages
        .filter(m => m.id !== 'welcome-msg')
        .map(m => ({
          role: m.role,
          content: m.content
        }));

      const res = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiMessages,
          context: context || {}
        })
      });

      if (res.ok) {
        const data = await res.json();
        replyContent = data.reply || '';
      }
    } catch (err) {
      console.warn('Backend API request error, using client engine:', err);
    }

    // 2. Fallback if API returned empty or failed
    if (!replyContent) {
      replyContent = generateClientTheologicalResponse(trimmed, context);
    }

    const assistantMsg: AssistantMessage = {
      id: 'ast-' + Date.now(),
      role: 'assistant',
      content: replyContent,
      timestamp: formatNow(),
    };

    setMessages(prev => [...prev, assistantMsg]);
    setIsLoading(false);
  }, [messages, isLoading]);

  const clearChat = useCallback(() => {
    const freshMessages = [{
      ...INITIAL_GREETING,
      timestamp: formatNow()
    }];
    setMessages(freshMessages);
    safeStorage.setItem(STORAGE_KEY, JSON.stringify(freshMessages));
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat,
  };
}
