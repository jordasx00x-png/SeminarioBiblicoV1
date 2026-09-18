import { useState, useEffect, useCallback } from 'react';
import { AssistantMessage } from '../types';
import { safeStorage } from '../utils/safeStorage';

const STORAGE_KEY = 'std_virtual_assistant_history_v1';

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
  const [messages, setMessages] = useState<AssistantMessage[]>(() => {
    try {
      const saved = safeStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error loading assistant history:', e);
    }
    return [INITIAL_GREETING];
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Persist messages
  useEffect(() => {
    try {
      safeStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (e) {
      console.warn('Error saving assistant history:', e);
    }
  }, [messages]);

  const sendMessage = useCallback(async (
    text: string, 
    context?: { courseTitle?: string; lessonTitle?: string }
  ) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    setError(null);
    const userMsg: AssistantMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setIsLoading(true);

    try {
      // Send conversation to server
      const payloadMessages = newHistory.map(m => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: payloadMessages,
          context: context || {},
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Error al comunicarse con el asistente.');
      }

      const assistantMsg: AssistantMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'No se obtuvo respuesta del asistente.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error('Virtual assistant error:', err);
      const errorMessage = err?.message || 'Ocurrió un error inesperado al responder.';
      setError(errorMessage);

      // Add fallback friendly assistant message indicating issue
      const errorAssistantMsg: AssistantMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: `⚠️ **Aviso:** ${errorMessage}\n\nPuedes intentar nuevamente con otra pregunta o consultar a tu tutor académico.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, errorAssistantMsg]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading]);

  const clearMessages = useCallback(() => {
    setMessages([
      {
        ...INITIAL_GREETING,
        id: `welcome-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
  };
}
