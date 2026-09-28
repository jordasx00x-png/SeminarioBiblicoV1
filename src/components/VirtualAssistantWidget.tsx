import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Send, 
  Sparkles, 
  X, 
  Minimize2, 
  Maximize2, 
  Trash2, 
  Copy, 
  Check, 
  BookOpen, 
  GraduationCap,
  MessageSquare,
  RefreshCw,
  RotateCcw,
  Plus,
  History,
  Clock,
  Search,
  ChevronRight
} from 'lucide-react';
import { useVirtualAssistant } from '../hooks/useVirtualAssistant';

interface VirtualAssistantWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen?: () => void;
  activeCourseTitle?: string;
  activeLessonTitle?: string;
  onSelectVerse?: (ref: string) => void;
  hideFloatingTrigger?: boolean;
  isSplitMode?: boolean;
}

export function VirtualAssistantWidget({
  isOpen,
  onClose,
  activeCourseTitle,
  activeLessonTitle,
  isSplitMode = false
}: VirtualAssistantWidgetProps) {
  const { 
    sessions,
    activeSessionId,
    activeSession,
    messages, 
    isLoading, 
    sendMessage, 
    createNewChat,
    loadSession,
    deleteSession,
    clearAllHistory
  } = useVirtualAssistant();

  const [inputText, setInputText] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showHistoryDrawer, setShowHistoryDrawer] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    if (isOpen && !isMinimized && !showHistoryDrawer) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen, isMinimized, showHistoryDrawer]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized && !showHistoryDrawer) {
      setTimeout(() => textareaRef.current?.focus(), 150);
    }
  }, [isOpen, isMinimized, showHistoryDrawer]);

  const handleSend = () => {
    if (!inputText.trim() || isLoading) return;
    sendMessage(inputText, {
      courseTitle: activeCourseTitle,
      lessonTitle: activeLessonTitle,
    });
    setInputText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSendSuggestion = (prompt: string) => {
    sendMessage(prompt, {
      courseTitle: activeCourseTitle,
      lessonTitle: activeLessonTitle,
    });
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Context-aware suggested questions
  const suggestedPrompts = activeLessonTitle
    ? [
        `¿Cómo puedo aplicar los principios de "${activeLessonTitle}" pastoralmente?`,
        `Genera un bosquejo homilético de predicación sobre la lección "${activeLessonTitle}"`,
        `Realiza una exégesis e idiomas originales del tema de "${activeLessonTitle}"`,
      ]
    : [
        `Genera un bosquejo homilético expositivo de Salmo 23`,
        `Análisis exegético y vocabulario en Griego Koiné de 1 Timoteo 4:12`,
        `Explicación de la doctrina de la Justificación por la Fe (Sola Fide)`,
      ];

  // Simple Markdown renderer
  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      let trimmed = line.trim();

      if (trimmed.startsWith('### ')) {
        return (
          <h4 key={idx} className="font-serif font-black text-sm text-[#7F1D1D] dark:text-amber-500 uppercase tracking-wide mt-3 mb-1.5 pb-1 border-b border-stone-200 dark:border-stone-800">
            {trimmed.replace('### ', '')}
          </h4>
        );
      }
      if (trimmed.startsWith('#### ')) {
        return (
          <h5 key={idx} className="font-serif font-bold text-xs text-[#1A2533] dark:text-stone-200 uppercase tracking-wider mt-2.5 mb-1">
            {trimmed.replace('#### ', '')}
          </h5>
        );
      }
      if (trimmed.startsWith('##### ')) {
        return (
          <h6 key={idx} className="font-sans font-black text-xs text-amber-900 dark:text-amber-400 mt-2 mb-1">
            {trimmed.replace('##### ', '')}
          </h6>
        );
      }
      if (trimmed.startsWith('> ')) {
        return (
          <blockquote key={idx} className="my-2 p-2.5 bg-[#FAF9F5] dark:bg-stone-900 border-l-2 border-[#7F1D1D] dark:border-amber-600 text-xs italic text-stone-700 dark:text-stone-300 font-serif rounded-r">
            {trimmed.replace('> ', '')}
          </blockquote>
        );
      }
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const itemText = trimmed.substring(2);
        return (
          <li key={idx} className="ml-4 list-disc text-xs text-stone-700 dark:text-stone-300 my-0.5 leading-relaxed font-sans">
            {formatInlineText(itemText)}
          </li>
        );
      }
      if (/^\d+\.\s/.test(trimmed)) {
        const match = trimmed.match(/^(\d+\.)\s*(.*)/);
        return (
          <li key={idx} className="ml-4 list-decimal text-xs text-stone-700 dark:text-stone-300 my-0.5 leading-relaxed font-sans">
            {match ? formatInlineText(match[2]) : trimmed}
          </li>
        );
      }
      if (trimmed === '---') {
        return <hr key={idx} className="my-2 border-stone-200 dark:border-stone-800" />;
      }

      if (!trimmed) {
        return <div key={idx} className="h-1.5" />;
      }

      return (
        <p key={idx} className="text-xs text-stone-800 dark:text-stone-200 my-1 leading-relaxed font-sans">
          {formatInlineText(line)}
        </p>
      );
    });
  };

  const formatInlineText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold text-[#1A2533] dark:text-white">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={i} className="italic text-stone-600 dark:text-stone-400">{part.slice(1, -1)}</em>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={i} className="px-1 py-0.5 bg-stone-100 dark:bg-stone-800 text-amber-800 dark:text-amber-400 rounded text-[11px] font-mono">{part.slice(1, -1)}</code>;
      }
      return part;
    });
  };

  // Filter sessions by search query
  const filteredSessions = sessions.filter(s => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return s.title.toLowerCase().includes(q) || s.messages.some(m => m.content.toLowerCase().includes(q));
  });

  // -------------------------------------------------------------------
  // RENDER: SPLIT MODE
  // -------------------------------------------------------------------
  if (isSplitMode) {
    if (!isOpen) return null;
    return (
      <div className="w-full h-full bg-white dark:bg-zinc-950 border-stone-200 dark:border-stone-800 flex flex-col font-sans overflow-hidden text-[#1A2533] dark:text-stone-100 relative">
        {/* TOP HEADER */}
        <div className="px-5 py-3.5 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between shrink-0 relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#7F1D1D]" />
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded bg-[#FAF9F5] dark:bg-stone-800 flex items-center justify-center border border-stone-200 dark:border-stone-700 shadow-sm shrink-0">
              <Bot size={20} strokeWidth={1.5} className="text-[#7F1D1D] dark:text-amber-500" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-serif font-black text-[#1A2533] dark:text-stone-100 uppercase tracking-tight truncate">
                  {activeSession?.title && activeSession.title !== 'Nuevo Chat' ? activeSession.title : 'Consultoría Doctrinal'}
                </h3>
                <span className="flex items-center gap-1 text-[8px] bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 px-1.5 py-0.5 rounded font-bold uppercase tracking-widest shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  En Línea
                </span>
              </div>
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest truncate mt-0.5">
                Campus Virtual • Asistencia Teológica
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* New Chat Button */}
            <button
              onClick={() => {
                createNewChat();
                setShowHistoryDrawer(false);
              }}
              className="flex items-center gap-1 px-2 py-1 bg-[#7F1D1D] hover:bg-black text-white rounded text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer shadow-sm shrink-0"
              title="Crear un nuevo chat"
            >
              <Plus size={13} strokeWidth={2.5} />
              <span className="hidden sm:inline">Nuevo Chat</span>
            </button>

            {/* History Toggle Button */}
            <button
              onClick={() => setShowHistoryDrawer(!showHistoryDrawer)}
              className={`flex items-center gap-1 px-2 py-1 border rounded text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0 ${
                showHistoryDrawer
                  ? 'bg-amber-100 dark:bg-amber-950/50 text-[#7F1D1D] dark:text-amber-400 border-amber-300 dark:border-amber-700'
                  : 'bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 border-stone-200 dark:border-stone-700'
              }`}
              title="Historial de conversaciones"
            >
              <History size={13} />
              <span className="hidden sm:inline">Historial</span>
              <span className="px-1.5 py-0.2 bg-[#7F1D1D] text-white rounded-full text-[8px] font-bold">
                {sessions.length}
              </span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-[#7F1D1D] hover:bg-stone-50 dark:hover:bg-stone-800 rounded transition-colors cursor-pointer"
              title="Cerrar consultor"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* HISTORY DRAWER (SPLIT MODE) */}
        <AnimatePresence>
          {showHistoryDrawer && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute inset-x-0 top-[52px] bottom-0 z-40 bg-white dark:bg-stone-950 flex flex-col font-sans border-r border-stone-200 dark:border-stone-800 shadow-xl"
            >
              <div className="p-3 bg-[#1A2533] text-white flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <History size={16} className="text-amber-400" />
                  <h4 className="text-xs font-serif font-black uppercase tracking-widest text-amber-200">
                    Historial de Chats
                  </h4>
                </div>
                <button
                  onClick={() => setShowHistoryDrawer(false)}
                  className="p-1 text-stone-300 hover:text-white rounded transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="p-2.5 bg-[#FAF9F5] dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => {
                    createNewChat();
                    setShowHistoryDrawer(false);
                  }}
                  className="flex-1 py-1.5 px-3 bg-[#7F1D1D] hover:bg-black text-white text-[10px] font-black uppercase tracking-wider rounded flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus size={14} />
                  + Nuevo Chat
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('¿Desea borrar todo el historial?')) {
                      clearAllHistory();
                      setShowHistoryDrawer(false);
                    }
                  }}
                  className="py-1.5 px-2 bg-stone-200 dark:bg-stone-800 hover:bg-red-900 hover:text-white text-stone-700 dark:text-stone-300 text-[9px] font-bold uppercase tracking-wider rounded flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Trash2 size={12} />
                  Vaciar
                </button>
              </div>

              <div className="p-2 border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-zinc-950">
                <div className="flex items-center gap-2 px-2.5 py-1 bg-[#FAF9F5] dark:bg-stone-900 border border-stone-300 dark:border-stone-800 rounded text-xs">
                  <Search size={13} className="text-stone-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar chats..."
                    className="flex-1 bg-transparent text-stone-800 dark:text-stone-200 outline-none text-xs"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-2.5 space-y-2 custom-scrollbar">
                {filteredSessions.length === 0 ? (
                  <div className="text-center py-6 text-stone-400 text-xs">
                    No se encontraron conversaciones.
                  </div>
                ) : (
                  filteredSessions.map((session) => {
                    const isActive = session.id === activeSessionId;
                    const userMsgCount = session.messages.filter(m => m.role === 'user').length;
                    const lastMsg = session.messages[session.messages.length - 1]?.content || '';

                    return (
                      <div
                        key={session.id}
                        onClick={() => {
                          loadSession(session.id);
                          setShowHistoryDrawer(false);
                        }}
                        className={`group p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                          isActive
                            ? 'bg-[#FAF9F5] dark:bg-stone-900 border-[#7F1D1D] dark:border-amber-500/80 shadow-xs'
                            : 'bg-white dark:bg-stone-900/40 border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <MessageSquare size={12} className={isActive ? 'text-[#7F1D1D] dark:text-amber-500' : 'text-stone-400'} />
                            <h5 className="text-xs font-bold text-stone-800 dark:text-stone-100 truncate">
                              {session.title || 'Nuevo Chat'}
                            </h5>
                          </div>
                          <div className="flex items-center gap-2 mt-0.5 text-[9px] text-stone-400">
                            <Clock size={9} />
                            <span>{session.updatedAt}</span>
                            <span>• {userMsgCount} msg</span>
                          </div>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteSession(session.id);
                          }}
                          className="p-1 text-stone-300 hover:text-red-600 dark:hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 rounded"
                          title="Eliminar chat"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MESSAGES CONTAINER */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4 bg-[#FAF9F5]/40 dark:bg-stone-950/40">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 rounded bg-[#7F1D1D] text-amber-200 flex items-center justify-center font-bold text-xs shrink-0 mt-1 shadow-sm">
                    C
                  </div>
                )}
                <div
                  className={`max-w-[88%] rounded-lg p-3.5 text-xs leading-relaxed ${
                    isUser
                      ? 'bg-[#1A2533] text-white rounded-br-none shadow-sm'
                      : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 rounded-bl-none shadow-xs'
                  }`}
                >
                  {isUser ? (
                    <p className="whitespace-pre-wrap font-sans text-xs">{msg.content}</p>
                  ) : (
                    <div>{renderFormattedContent(msg.content)}</div>
                  )}

                  <div className="mt-2 text-[9px] text-stone-400 dark:text-stone-500 flex items-center justify-between border-t border-stone-100 dark:border-stone-800/60 pt-1.5">
                    <span>{msg.timestamp && !String(msg.timestamp).includes('Invalid') ? msg.timestamp : '12:00 PM'}</span>
                    {!isUser && (
                      <button
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="hover:text-stone-700 dark:hover:text-stone-300 transition-colors cursor-pointer ml-2"
                        title="Copiar respuesta"
                      >
                        {copiedId === msg.id ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 items-center text-xs text-stone-400 py-2">
              <div className="w-7 h-7 rounded bg-[#7F1D1D] text-amber-200 flex items-center justify-center font-bold text-xs shrink-0 animate-pulse">
                C
              </div>
              <span className="italic">Redactando respuesta teológica con referencias...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* INPUT BAR */}
        <div className="p-3 bg-white dark:bg-zinc-950 border-t border-stone-200 dark:border-stone-800 shrink-0">
          {/* Quick Homiletic / Exegetical Action Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-1 custom-scrollbar shrink-0">
            <button
              onClick={() => {
                setInputText("Por favor genera un bosquejo homilético completo con Título, Texto Principal, Idea Principal, Introducción con Exégesis, Puntos (con Nombre, Texto, Introducción, Exégesis, Sobre qué hablar, Frase para la congregación y Puente), y Conclusión con Texto final para el pasaje de: ");
                textareaRef.current?.focus();
              }}
              className="px-2 py-1 bg-stone-100 dark:bg-stone-800 hover:bg-[#7F1D1D] hover:text-white dark:hover:bg-amber-600 border border-stone-200 dark:border-stone-700 rounded text-[10px] font-bold text-stone-600 dark:text-stone-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 cursor-pointer"
            >
              📜 Crear Sermón Estructurado
            </button>
            <button
              onClick={() => {
                setInputText("Realiza un análisis exegético y contexto histórico-gramatical profundo del pasaje: ");
                textareaRef.current?.focus();
              }}
              className="px-2 py-1 bg-stone-100 dark:bg-stone-800 hover:bg-[#7F1D1D] hover:text-white dark:hover:bg-amber-600 border border-stone-200 dark:border-stone-700 rounded text-[10px] font-bold text-stone-600 dark:text-stone-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 cursor-pointer"
            >
              🔍 Exégesis Bíblica
            </button>
            <button
              onClick={() => {
                setInputText("Analiza las palabras clave en Griego Koiné / Hebreo Bíblico con sus significados e implicaciones teológicas en: ");
                textareaRef.current?.focus();
              }}
              className="px-2 py-1 bg-stone-100 dark:bg-stone-800 hover:bg-[#7F1D1D] hover:text-white dark:hover:bg-amber-600 border border-stone-200 dark:border-stone-700 rounded text-[10px] font-bold text-stone-600 dark:text-stone-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 cursor-pointer"
            >
              🏛️ Idiomas Originales
            </button>
            <button
              onClick={() => {
                setInputText("Explica la fundamentación de Teología Sistemática y doctrina bíblica sobre: ");
                textareaRef.current?.focus();
              }}
              className="px-2 py-1 bg-stone-100 dark:bg-stone-800 hover:bg-[#7F1D1D] hover:text-white dark:hover:bg-amber-600 border border-stone-200 dark:border-stone-700 rounded text-[10px] font-bold text-stone-600 dark:text-stone-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 cursor-pointer"
            >
              ⚖️ Teología Sistemática
            </button>
          </div>

          <div className="relative flex items-center gap-2 bg-[#FAF9F5] dark:bg-stone-900 border border-stone-300 dark:border-stone-800 focus-within:border-[#7F1D1D] rounded p-2 transition-colors">
            <textarea
              ref={textareaRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Redacte su consulta teológica o bíblica..."
              rows={1}
              disabled={isLoading}
              className="flex-1 bg-transparent text-[#1A2533] dark:text-stone-100 text-xs placeholder:text-stone-400 outline-none resize-none custom-scrollbar leading-relaxed font-sans"
              style={{ minHeight: '24px', maxHeight: '100px' }}
            />

            <button
              onClick={handleSend}
              disabled={!inputText.trim() || isLoading}
              className="p-2 bg-[#7F1D1D] hover:bg-black disabled:bg-stone-100 dark:disabled:bg-stone-800 disabled:text-stone-400 text-white rounded transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
              title="Enviar consulta (Enter)"
            >
              <Send size={15} strokeWidth={2} />
            </button>
          </div>

          <div className="mt-1.5 text-[8px] font-bold uppercase tracking-wider text-stone-400 flex items-center justify-between px-1">
            <span>Presiona Enter para enviar</span>
            <span className="flex items-center gap-1">
              <Sparkles size={9} className="text-amber-500" />
              Asesoría Académica
            </span>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------
  // RENDER: FLOATING MODAL MODE
  // -------------------------------------------------------------------
  return (
    <AnimatePresence>
      {isOpen && !isMinimized && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 260 }}
          className={`fixed z-[65] bg-white dark:bg-zinc-950 border border-stone-200 dark:border-stone-800 shadow-[0_30px_60px_rgba(0,0,0,0.25)] rounded flex flex-col font-sans overflow-hidden text-[#1A2533] dark:text-stone-100 ${
            isExpanded
              ? 'inset-2 sm:inset-6 w-auto h-auto max-w-5xl mx-auto'
              : 'inset-x-2 bottom-2 top-12 sm:top-auto sm:inset-x-auto sm:bottom-4 sm:left-4 sm:right-auto sm:w-[480px] md:w-[520px] sm:h-[640px] sm:max-h-[88vh]'
          }`}
        >
          {/* TOP HEADER */}
          <div className="px-5 py-3.5 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between shrink-0 relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#7F1D1D]" />
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded bg-[#FAF9F5] dark:bg-stone-800 flex items-center justify-center border border-stone-200 dark:border-stone-700 shadow-sm shrink-0">
                <Bot size={20} strokeWidth={1.5} className="text-[#7F1D1D] dark:text-amber-500" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-serif font-black text-[#1A2533] dark:text-stone-100 uppercase tracking-tight truncate">
                    {activeSession?.title && activeSession.title !== 'Nuevo Chat' ? activeSession.title : 'Consultoría Doctrinal'}
                  </h3>
                  <span className="flex items-center gap-1.5 text-[9px] bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded font-bold uppercase tracking-widest shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    En Línea
                  </span>
                </div>
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest truncate mt-0.5">
                  Campus Virtual • Asistencia Académica IA
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1.5 shrink-0">
              {/* + Nuevo Chat Button */}
              <button
                onClick={() => {
                  createNewChat();
                  setShowHistoryDrawer(false);
                }}
                className="flex items-center gap-1 px-2.5 py-1.5 bg-[#7F1D1D] hover:bg-black text-white rounded text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer shadow-sm shrink-0"
                title="Iniciar un nuevo chat"
              >
                <Plus size={13} strokeWidth={2.5} />
                <span className="hidden sm:inline">Nuevo Chat</span>
              </button>

              {/* Historial Toggle Button */}
              <button
                onClick={() => setShowHistoryDrawer(!showHistoryDrawer)}
                className={`flex items-center gap-1 px-2 py-1.5 border rounded text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0 ${
                  showHistoryDrawer
                    ? 'bg-amber-100 dark:bg-amber-950/50 text-[#7F1D1D] dark:text-amber-400 border-amber-300 dark:border-amber-700'
                    : 'bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 border-stone-200 dark:border-stone-700'
                }`}
                title="Ver historial de chats"
              >
                <History size={13} />
                <span className="hidden sm:inline">Historial</span>
                <span className="px-1.5 py-0.2 bg-[#7F1D1D] text-white rounded-full text-[8px] font-bold">
                  {sessions.length}
                </span>
              </button>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 text-stone-400 hover:text-[#7F1D1D] hover:bg-stone-50 dark:hover:bg-stone-800 rounded transition-colors cursor-pointer hidden sm:block"
                title={isExpanded ? 'Restaurar tamaño' : 'Maximizar'}
              >
                {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>

              <button
                onClick={onClose}
                className="p-1.5 text-stone-400 hover:text-[#7F1D1D] hover:bg-stone-50 dark:hover:bg-stone-800 rounded transition-colors cursor-pointer"
                title="Cerrar consultor"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* HISTORY DRAWER OVERLAY (FLOATING MODE) */}
          <AnimatePresence>
            {showHistoryDrawer && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="absolute inset-x-0 top-[56px] bottom-0 z-40 bg-white dark:bg-stone-950 flex flex-col font-sans border-r border-stone-200 dark:border-stone-800 shadow-xl"
              >
                <div className="p-3 bg-[#1A2533] text-white flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2">
                    <History size={16} className="text-amber-400" />
                    <h4 className="text-xs font-serif font-black uppercase tracking-widest text-amber-200">
                      Historial de Consultas Teológicas
                    </h4>
                  </div>
                  <button
                    onClick={() => setShowHistoryDrawer(false)}
                    className="p-1 text-stone-300 hover:text-white rounded transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="p-2.5 bg-[#FAF9F5] dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      createNewChat();
                      setShowHistoryDrawer(false);
                    }}
                    className="flex-1 py-1.5 px-3 bg-[#7F1D1D] hover:bg-black text-white text-[10px] font-black uppercase tracking-wider rounded flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus size={14} />
                    + Nuevo Chat
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('¿Desea borrar todo el historial?')) {
                        clearAllHistory();
                        setShowHistoryDrawer(false);
                      }
                    }}
                    className="py-1.5 px-2 bg-stone-200 dark:bg-stone-800 hover:bg-red-900 hover:text-white text-stone-700 dark:text-stone-300 text-[9px] font-bold uppercase tracking-wider rounded flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Trash2 size={12} />
                    Vaciar
                  </button>
                </div>

                <div className="p-2 border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-zinc-950">
                  <div className="flex items-center gap-2 px-2.5 py-1 bg-[#FAF9F5] dark:bg-stone-900 border border-stone-300 dark:border-stone-800 rounded text-xs">
                    <Search size={13} className="text-stone-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Buscar chats..."
                      className="flex-1 bg-transparent text-stone-800 dark:text-stone-200 outline-none text-xs"
                    />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-2.5 space-y-2 custom-scrollbar">
                  {filteredSessions.length === 0 ? (
                    <div className="text-center py-6 text-stone-400 text-xs">
                      No se encontraron conversaciones.
                    </div>
                  ) : (
                    filteredSessions.map((session) => {
                      const isActive = session.id === activeSessionId;
                      const userMsgCount = session.messages.filter(m => m.role === 'user').length;
                      const lastMsg = session.messages[session.messages.length - 1]?.content || '';

                      return (
                        <div
                          key={session.id}
                          onClick={() => {
                            loadSession(session.id);
                            setShowHistoryDrawer(false);
                          }}
                          className={`group p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                            isActive
                              ? 'bg-[#FAF9F5] dark:bg-stone-900 border-[#7F1D1D] dark:border-amber-500/80 shadow-xs'
                              : 'bg-white dark:bg-stone-900/40 border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
                          }`}
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              <MessageSquare size={12} className={isActive ? 'text-[#7F1D1D] dark:text-amber-500' : 'text-stone-400'} />
                              <h5 className="text-xs font-bold text-stone-800 dark:text-stone-100 truncate">
                                {session.title || 'Nuevo Chat'}
                              </h5>
                            </div>
                            <div className="flex items-center gap-2 mt-0.5 text-[9px] text-stone-400">
                              <Clock size={9} />
                              <span>{session.updatedAt}</span>
                              <span>• {userMsgCount} msg</span>
                            </div>
                            {lastMsg && (
                              <p className="text-[10px] text-stone-500 dark:text-stone-400 truncate mt-1 italic">
                                {lastMsg.replace(/[#*`>-]/g, '').slice(0, 50)}...
                              </p>
                            )}
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteSession(session.id);
                            }}
                            className="p-1 text-stone-300 hover:text-red-600 dark:hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 rounded"
                            title="Eliminar chat"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* MESSAGES LIST */}
          <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-zinc-950 overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6 custom-scrollbar">
              {messages.map((msg) => {
                const isUser = msg.role === 'user';

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start animate-in fade-in slide-in-from-left-4 duration-300'}`}
                  >
                    <div
                      className={`relative max-w-[92%] sm:max-w-[85%] rounded p-4 shadow-sm ${
                        isUser
                          ? 'bg-stone-100 dark:bg-stone-800 text-[#1A2533] dark:text-stone-100 border border-stone-200 dark:border-stone-700'
                          : 'bg-[#FAF9F5] dark:bg-stone-900 text-[#1A2533] dark:text-stone-100 border border-stone-300 dark:border-stone-800'
                      }`}
                    >
                      {!isUser && (
                        <div className="flex items-center justify-between gap-4 mb-3 pb-2 border-b border-stone-200 dark:border-stone-800">
                          <span className="flex items-center gap-2 text-[10px] font-black text-[#7F1D1D] dark:text-amber-500 uppercase tracking-[0.2em]">
                            <GraduationCap size={16} strokeWidth={1.5} />
                            Asistente Teológico
                          </span>
                          <button
                            onClick={() => handleCopy(msg.id, msg.content)}
                            className="text-stone-400 hover:text-[#7F1D1D] transition-colors cursor-pointer"
                            title="Copiar respuesta"
                          >
                            {copiedId === msg.id ? (
                              <Check size={14} className="text-emerald-600" />
                            ) : (
                              <Copy size={14} />
                            )}
                          </button>
                        </div>
                      )}

                      {isUser ? (
                        <p className="text-sm whitespace-pre-wrap leading-relaxed font-sans">{msg.content}</p>
                      ) : (
                        <div className="assistant-content">
                          {renderFormattedContent(msg.content)}
                        </div>
                      )}

                      <div className={`mt-3 pt-2 border-t border-stone-200/40 dark:border-stone-800/40 text-[9px] font-bold uppercase tracking-widest ${isUser ? 'text-stone-400 text-right' : 'text-stone-500'}`}>
                        {msg.timestamp && !String(msg.timestamp).includes('Invalid') ? msg.timestamp : '12:00 PM'}
                      </div>
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex items-center gap-3 bg-[#FAF9F5] dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 rounded shadow-sm">
                  <RefreshCw size={18} className="text-[#7F1D1D] animate-spin" />
                  <span className="text-[10px] text-stone-500 font-black uppercase tracking-widest">Analizando Consulta Académica...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* QUICK SUGGESTIONS CHIPS */}
            <div className="px-5 py-3.5 bg-[#FAF9F5] dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden shrink-0 flex items-center gap-3">
              <span className="text-[9px] font-black text-stone-400 uppercase tracking-[0.2em] shrink-0 border-r border-stone-300 dark:border-stone-700 pr-3 mr-1">
                Sugerencias
              </span>
              {suggestedPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSendSuggestion(prompt)}
                  disabled={isLoading}
                  className="px-4 py-2 bg-white dark:bg-stone-800 hover:bg-[#7F1D1D] hover:text-white text-stone-600 dark:text-stone-300 border border-stone-300 dark:border-stone-700 rounded text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer disabled:opacity-50 shrink-0 shadow-sm active:scale-95"
                >
                  {prompt.length > 40 ? `${prompt.slice(0, 40)}...` : prompt}
                </button>
              ))}
            </div>

            {/* INPUT BAR */}
            <div className="p-4 sm:p-5 bg-white dark:bg-zinc-950 border-t border-stone-200 dark:border-stone-800 shrink-0">
              <div className="relative flex items-center gap-3 bg-[#FAF9F5] dark:bg-stone-900 border border-stone-300 dark:border-stone-800 focus-within:border-[#7F1D1D] rounded p-3 transition-colors">
                <textarea
                  ref={textareaRef}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Redacte su consulta teológica o académica..."
                  rows={1}
                  disabled={isLoading}
                  className="flex-1 bg-transparent text-[#1A2533] dark:text-stone-100 text-sm placeholder:text-stone-400 outline-none resize-none custom-scrollbar leading-relaxed font-sans"
                  style={{ minHeight: '28px', maxHeight: '140px' }}
                />

                <button
                  onClick={handleSend}
                  disabled={!inputText.trim() || isLoading}
                  className="p-3 bg-[#7F1D1D] hover:bg-black disabled:bg-stone-100 dark:disabled:bg-stone-800 disabled:text-stone-400 text-white rounded transition-all cursor-pointer shadow-md active:scale-95 shrink-0"
                  title="Enviar (Enter)"
                >
                  <Send size={20} strokeWidth={2.5} />
                </button>
              </div>

              <div className="mt-2.5 text-[9px] font-black uppercase tracking-[0.3em] text-stone-400 flex items-center justify-between px-1">
                <span>Enter para emitir consulta · Seminario Digital</span>
                <span className="flex items-center gap-1.5">
                  <Sparkles size={11} className="text-amber-500" />
                  Módulo de Inteligencia Académica
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
