import { useState, useEffect, useCallback } from 'react';
import { AssistantMessage } from '../types';
import { generateClientTheologicalResponse } from '../utils/theologicalFallback';
import { safeStorage } from '../utils/safeStorage';

const STORAGE_KEY = 'std_campus_chat_history_v6';

const formatNow = () => {
  const d = new Date();
  let hours = d.getHours();
  const minutes = d.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${hours}:${minutes} ${ampm}`;
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

export function useVirtualAssistant() {
  const [messages, setMessages] = useState<AssistantMessage[]>(() => {
    try {
      const saved = safeStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((m: any) => ({
            ...m,
            timestamp: (m.timestamp && typeof m.timestamp === 'string' && !m.timestamp.includes('Invalid')) ? m.timestamp : formatNow()
          }));
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
    setMessages(prev => [...prev, userMsg]);

    let replyContent = '';

    try {
      const apiMessages = [...messages, userMsg]
        .filter(m => m.id !== 'welcome-msg')
        .map(m => ({
          role: m.role,
          content: m.content
        }));

      // AbortController with 20 second timeout to allow complete AI generation
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

    // 2. Fallback if API returned empty, failed, or timed out
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
