import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  X, 
  Sparkles, 
  Minimize2, 
  Maximize2, 
  Trash2, 
  Copy, 
  Check, 
  BookOpen, 
  MessageSquare, 
  RefreshCw,
  HelpCircle,
  AlertCircle,
  Clock
} from 'lucide-react';
import { Lesson } from '../types';
import { MAX_DAILY_AI_ATTEMPTS, getRemainingAIAttempts, incrementAIAttempts } from '../utils/aiTutorQuota';

interface AIAssistantWidgetProps {
  currentLesson?: Lesson;
  courseTitle?: string;
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export function AIAssistantWidget({ currentLesson, courseTitle, isOpen, onClose }: AIAssistantWidgetProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [remainingAttempts, setRemainingAttempts] = useState<number>(getRemainingAIAttempts());

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sync remaining attempts when opening
  useEffect(() => {
    if (isOpen) {
      setRemainingAttempts(getRemainingAIAttempts());
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  // Initial welcome message when context changes
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeText = currentLesson
        ? `¡Hola! Soy tu **Tutor Teológico IA** 📖✨.\n\nEstoy listo para ayudarte con cualquier duda sobre la clase actual: **"${currentLesson.title}"**${courseTitle ? ` del curso *${courseTitle}*` : ''}.\n\n¿En qué tema o pasaje bíblico te gustaría profundizar hoy?`
        : `¡Hola! Soy tu **Tutor Teológico IA** del Seminario Digital 🎓.\n\nPuedes hacerme cualquier consulta sobre teología, hermenéutica, pasajes bíblicos, idiomas bíblicos o historia de la iglesia. ¿Cómo puedo ayudarte?`;

      setMessages([
        {
          id: 'welcome',
          role: 'model',
          text: welcomeText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [currentLesson, courseTitle]);

  if (!isOpen) return null;

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = (customPrompt || input).trim();
    if (!textToSend || isLoading) return;

    // Check query limit
    const currentRemaining = getRemainingAIAttempts();
    if (currentRemaining <= 0) {
      setErrorMessage(`Has alcanzado el límite de ${MAX_DAILY_AI_ATTEMPTS} preguntas diarias permitidas. Tu cuota se reiniciará automáticamente mañana.`);
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    if (!customPrompt) setInput('');
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const historyForApi = messages
        .filter(m => m.id !== 'welcome')
        .map(m => ({ role: m.role, text: m.text }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSend,
          history: historyForApi,
          lessonContext: currentLesson ? {
            title: currentLesson.title,
            courseTitle: courseTitle,
            textSnippet: currentLesson.blocks ? currentLesson.blocks.map(b => b.content || '').join(' ') : ''
          } : undefined
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al comunicarse con el Asistente IA.');
      }

      // Decrement attempts quota on successful response
      incrementAIAttempts();
      setRemainingAttempts(getRemainingAIAttempts());

      const modelMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: data.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, modelMessage]);
    } catch (err: any) {
      console.error('Chat error:', err);
      setErrorMessage(err.message || 'No se pudo obtener respuesta del servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClear = () => {
    setMessages([]);
    setErrorMessage(null);
  };

  const quickChips = currentLesson ? [
    ' Explícame esta clase en términos sencillos',
    '📖 Dame 3 pasajes bíblicos que profundicen esta lección',
    '💡 ¿Cómo puedo aplicar esta verdad teológica a mi vida?',
    '❓ Hazme una pregunta clave para probar si entendí el tema'
  ] : [
    '📖 ¿Qué es la hermenéutica bíblica?',
    '⛪ Explícame la doctrina de la Gracia',
    '📜 ¿Cuál es el contexto del Nuevo Testamento?',
    '💡 ¿Cómo hacer un estudio bíblico inductivo?'
  ];

  return (
    <div className={`fixed z-[80] transition-all duration-300 font-sans shadow-2xl flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden ${
      isMaximized 
        ? 'inset-3 sm:inset-6 w-auto h-auto' 
        : 'bottom-4 right-4 w-[92vw] sm:w-[480px] h-[620px] max-h-[85vh]'
    }`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 text-white px-4 py-3 border-b border-amber-500/30 flex items-center justify-between shrink-0 select-none">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-md shrink-0">
            <Bot size={18} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="font-bold text-sm text-white truncate">Asistente Teológico IA</h3>
              <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-400/40 px-1.5 py-0.2 rounded font-semibold">
                Gemini 3.8
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 ${
                remainingAttempts > 3
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
                  : remainingAttempts > 0
                    ? 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                    : 'bg-rose-500/20 text-rose-300 border-rose-400/40'
              }`}>
                <Clock size={10} />
                <span>{remainingAttempts}/{MAX_DAILY_AI_ATTEMPTS} Intentos hoy</span>
              </span>
            </div>
            {currentLesson ? (
              <p className="text-[11px] text-amber-200/80 truncate flex items-center gap-1">
                <BookOpen size={10} />
                <span>Contexto: {currentLesson.title}</span>
              </p>
            ) : (
              <p className="text-[11px] text-slate-300 truncate">
                Tutor en línea para todas tus dudas académicas
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0 text-slate-300">
          <button
            onClick={handleClear}
            className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
            title="Limpiar conversación"
          >
            <Trash2 size={15} />
          </button>
          <button
            onClick={() => setIsMaximized(prev => !prev)}
            className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
            title={isMaximized ? "Restaurar tamaño" : "Maximizar ventana"}
          >
            {isMaximized ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
            title="Cerrar asistente"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-950/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className={`flex items-start gap-2 max-w-[88%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5 ${
                msg.role === 'user'
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-800 text-amber-400 border border-slate-700'
              }`}>
                {msg.role === 'user' ? 'Tú' : <Sparkles size={14} />}
              </div>

              <div className={`p-3.5 rounded-2xl text-xs md:text-sm leading-relaxed relative group ${
                msg.role === 'user'
                  ? 'bg-amber-600 text-white rounded-tr-xs shadow-xs'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-xs shadow-xs'
              }`}>
                <div className="whitespace-pre-wrap font-sans">
                  {msg.text}
                </div>

                <div className="flex items-center justify-between gap-2 mt-2 pt-1 border-t border-black/5 dark:border-white/5 text-[10px] text-slate-400">
                  <span>{msg.timestamp}</span>
                  <button
                    onClick={() => handleCopy(msg.id, msg.text)}
                    className="opacity-60 hover:opacity-100 transition-opacity flex items-center gap-1 cursor-pointer"
                    title="Copiar texto"
                  >
                    {copiedId === msg.id ? <Check size={11} className="text-emerald-500" /> : <Copy size={11} />}
                    <span>{copiedId === msg.id ? 'Copiado' : 'Copiar'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-slate-500 text-xs p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 w-fit">
            <RefreshCw size={14} className="animate-spin text-amber-500" />
            <span>El Asistente Teológico está consultando la información...</span>
          </div>
        )}

        {errorMessage && (
          <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl text-rose-800 dark:text-rose-300 text-xs flex items-start gap-2">
            <AlertCircle size={16} className="shrink-0 mt-0.5 text-rose-600 dark:text-rose-400" />
            <div>
              <p className="font-bold">Aviso del Asistente:</p>
              <p className="mt-0.5">{errorMessage}</p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Chips */}
      <div className="px-3 py-2 bg-slate-100 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0">
        <span className="text-[10px] font-bold uppercase text-slate-400 shrink-0 flex items-center gap-1">
          <HelpCircle size={11} />
          Sugerencias:
        </span>
        {quickChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(chip)}
            disabled={isLoading}
            className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 hover:bg-amber-500 hover:text-slate-950 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap transition-colors cursor-pointer shrink-0 disabled:opacity-50"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input bar */}
      <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
        <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 px-1 mb-1 font-medium">
          <span className="flex items-center gap-1">
            <Clock size={11} className="text-amber-500" />
            <span>Consultas con el Tutor IA:</span>
          </span>
          <span className={`font-bold font-mono px-1.5 py-0.2 rounded text-[10px] ${
            remainingAttempts > 0 
              ? 'text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 border border-amber-300/60 dark:border-amber-800' 
              : 'text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-950/80 border border-rose-300/60 dark:border-rose-800'
          }`}>
            {remainingAttempts} de {MAX_DAILY_AI_ATTEMPTS} disponibles hoy
          </span>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              remainingAttempts <= 0 
                ? "Has alcanzado tus 10 intentos del día..." 
                : currentLesson 
                  ? `Preguntar sobre "${currentLesson.title}"...` 
                  : "Escribe tu duda teológica aquí..."
            }
            disabled={isLoading || remainingAttempts <= 0}
            className="flex-1 px-3.5 py-2.5 text-xs md:text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:border-amber-500 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 transition-colors disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading || remainingAttempts <= 0}
            className="w-10 h-10 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-slate-950 font-bold flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-xs"
            title="Enviar mensaje"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
