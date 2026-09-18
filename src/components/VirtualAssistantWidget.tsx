import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  X, 
  Minimize2, 
  Maximize2, 
  ChevronUp, 
  Trash2, 
  Copy, 
  Check, 
  BookOpen, 
  HelpCircle,
  CornerDownLeft,
  GraduationCap,
  MessageSquare,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { useVirtualAssistant } from '../hooks/useVirtualAssistant';

interface VirtualAssistantWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  activeCourseTitle?: string;
  activeLessonTitle?: string;
  onSelectVerse?: (ref: string) => void;
}

export function VirtualAssistantWidget({
  isOpen,
  onClose,
  onOpen,
  activeCourseTitle,
  activeLessonTitle,
  onSelectVerse,
}: VirtualAssistantWidgetProps) {
  const { messages, isLoading, error, sendMessage, clearMessages } = useVirtualAssistant();
  const [inputText, setInputText] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen, isMinimized]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => textareaRef.current?.focus(), 150);
    }
  }, [isOpen, isMinimized]);

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

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Context-aware suggested questions
  const suggestedPrompts = activeLessonTitle
    ? [
        `¿Cómo puedo aplicar los principios de "${activeLessonTitle}" pastoralmente?`,
        `¿Qué pasajes bíblicos respaldan las doctrinas explicadas en esta lección?`,
        `¿Cuáles son las palabras clave en griego o hebreo relacionadas con esta clase?`,
        `Dame un resumen explicativo en 3 puntos fundamentales de este tema.`,
      ]
    : [
        '¿Cuál es la diferencia entre justificación y santificación en la teología bíblica?',
        '¿Qué significa el término "Logos" en Juan 1:1 según el griego koiné?',
        '¿Cuáles son los principios fundamentales de la hermenéutica reformada?',
        '¿Cómo estructurar un estudio bíblico expositivo paso a paso?',
        'Explícame la doctrina del pacto en el Antiguo y Nuevo Testamento.',
      ];

  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');
    return (
      <div className="space-y-2 text-sm leading-relaxed">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) {
            return <div key={idx} className="h-1.5" />;
          }

          // Headers
          if (trimmed.startsWith('### ')) {
            return (
              <h4 key={idx} className="font-bold text-base text-amber-300 font-serif pt-1">
                {trimmed.replace('### ', '')}
              </h4>
            );
          }
          if (trimmed.startsWith('## ')) {
            return (
              <h3 key={idx} className="font-bold text-lg text-amber-200 font-serif pt-2 border-b border-amber-500/20 pb-1">
                {trimmed.replace('## ', '')}
              </h3>
            );
          }

          // Bullet points
          if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            const itemText = trimmed.replace(/^[-*]\s+/, '');
            return (
              <div key={idx} className="flex items-start gap-2 pl-2">
                <span className="text-amber-400 mt-1">•</span>
                <span className="flex-1">{formatInline(itemText)}</span>
              </div>
            );
          }

          // Numbered lists
          const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
          if (numMatch) {
            return (
              <div key={idx} className="flex items-start gap-2 pl-2">
                <span className="text-amber-400 font-mono text-xs font-bold mt-0.5">{numMatch[1]}.</span>
                <span className="flex-1">{formatInline(numMatch[2])}</span>
              </div>
            );
          }

          // Blockquote
          if (trimmed.startsWith('> ')) {
            return (
              <blockquote key={idx} className="border-l-2 border-amber-500/60 pl-3 py-1 my-1 bg-amber-500/5 text-amber-100 italic rounded-r-md">
                {formatInline(trimmed.replace(/^>\s+/, ''))}
              </blockquote>
            );
          }

          // Standard paragraph
          return <p key={idx}>{formatInline(trimmed)}</p>;
        })}
      </div>
    );
  };

  const formatInline = (text: string) => {
    // Basic markdown inline parser for bold, code, and verses
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-semibold text-slate-100 dark:text-amber-200">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={i} className="px-1.5 py-0.5 bg-slate-800 text-amber-300 font-mono text-xs rounded border border-slate-700">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  return (
    <>
      {/* FLOATING TRIGGER BUTTON */}
      {!isOpen && !isMinimized && (
        <motion.div 
          className="fixed bottom-20 left-4 md:bottom-6 md:left-6 z-50"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <button
            onClick={onOpen}
            className="group relative flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-amber-700 via-amber-800 to-slate-900 hover:from-amber-600 hover:to-slate-800 text-white rounded-full shadow-2xl border border-amber-500/50 hover:border-amber-400 transition-all duration-300 cursor-pointer active:scale-95"
            title="Abrir Asistente Virtual Teológico"
          >
            <div className="relative flex items-center justify-center">
              <Bot size={20} className="text-amber-300 group-hover:scale-110 transition-transform duration-300" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
              </span>
            </div>
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-amber-200 flex items-center gap-1.5">
              Asistente Virtual
              <Sparkles size={13} className="text-amber-300" />
            </span>
          </button>
        </motion.div>
      )}

      {/* MINIMIZED FLOATING PILL */}
      <AnimatePresence>
        {isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            className="fixed bottom-20 left-4 md:bottom-6 md:left-6 z-50 bg-slate-900 text-white border border-amber-500/50 rounded-2xl shadow-2xl p-3 flex items-center gap-3 font-sans max-w-xs sm:max-w-sm"
          >
            <div className="p-2 bg-amber-500/20 border border-amber-500/40 text-amber-300 rounded-xl shrink-0">
              <Bot size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-200 truncate">
                  Asistente Teológico
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              </div>
              <p className="text-[11px] text-slate-400 truncate mt-0.5">
                {isLoading ? 'Generando respuesta...' : 'Listo para responder preguntas'}
              </p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => setIsMinimized(false)}
                className="px-2.5 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 text-xs shadow-md"
              >
                <ChevronUp size={15} />
                <span>Abrir</span>
              </button>
              <button
                onClick={() => {
                  setIsMinimized(false);
                  onClose();
                }}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                title="Cerrar"
              >
                <X size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN ASSISTANT WINDOW */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 260 }}
            className={`fixed z-[65] bg-slate-900/98 backdrop-blur-xl border border-amber-500/40 shadow-2xl rounded-2xl flex flex-col font-sans overflow-hidden text-slate-100 ${
              isExpanded
                ? 'inset-2 sm:inset-6 w-auto h-auto max-w-5xl mx-auto'
                : 'bottom-4 left-4 right-4 sm:right-auto sm:w-[480px] md:w-[520px] h-[640px] max-h-[88vh]'
            }`}
          >
            {/* TOP HEADER */}
            <div className="px-4 py-3 bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/70 border-b border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center border border-amber-400/40 shadow-md shrink-0">
                  <Bot size={20} className="text-white" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white truncate font-serif">
                      Asistente Virtual Teológico
                    </h3>
                    <span className="flex items-center gap-1 text-[10px] bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 px-1.5 py-0.2 rounded-full font-mono shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      En línea
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate">
                    Campus Interactivo • Consultas Bíblicas y Académicas
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1 shrink-0">
                {/* Clear Chat */}
                {showClearConfirm ? (
                  <div className="flex items-center gap-1 bg-red-950/80 border border-red-500/50 px-2 py-1 rounded-xl">
                    <span className="text-[10px] text-red-300 font-bold">¿Borrar?</span>
                    <button
                      onClick={() => {
                        clearMessages();
                        setShowClearConfirm(false);
                      }}
                      className="px-1.5 py-0.5 bg-red-600 hover:bg-red-500 text-white rounded text-[10px] font-bold"
                    >
                      Sí
                    </button>
                    <button
                      onClick={() => setShowClearConfirm(false)}
                      className="px-1.5 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[10px]"
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowClearConfirm(true)}
                    className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800/80 rounded-xl transition-colors cursor-pointer"
                    title="Reiniciar conversación"
                  >
                    <Trash2 size={16} />
                  </button>
                )}

                {/* Minimize */}
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-xl transition-colors cursor-pointer"
                  title="Minimizar"
                >
                  <Minimize2 size={16} />
                </button>

                {/* Expand / Restore */}
                <button
                  onClick={() => setIsExpanded(prev => !prev)}
                  className="hidden sm:inline-flex p-1.5 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-xl transition-colors cursor-pointer"
                  title={isExpanded ? "Reducir ventana" : "Expandir pantalla completa"}
                >
                  {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>

                {/* Close */}
                <button
                  onClick={onClose}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-xl transition-colors cursor-pointer"
                  title="Cerrar asistente"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* CONTEXT BANNER (IF STUDYING A SPECIFIC COURSE OR LESSON) */}
            {(activeCourseTitle || activeLessonTitle) && (
              <div className="px-4 py-2 bg-amber-950/30 border-b border-amber-500/20 flex items-center justify-between text-xs text-amber-200/90 shrink-0">
                <div className="flex items-center gap-2 truncate">
                  <BookOpen size={14} className="text-amber-400 shrink-0" />
                  <span className="truncate">
                    Contexto: <strong className="text-amber-100">{activeLessonTitle || activeCourseTitle}</strong>
                  </span>
                </div>
                <span className="text-[10px] text-amber-400/80 font-mono shrink-0 ml-2">Modo tutor de clase</span>
              </div>
            )}

            {/* MESSAGES LIST */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-gradient-to-b from-slate-900/50 to-slate-950/80">
              {messages.map((msg) => {
                const isUser = msg.role === 'user';

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`relative max-w-[92%] sm:max-w-[85%] rounded-2xl p-3.5 shadow-md ${
                        isUser
                          ? 'bg-gradient-to-r from-amber-700 to-amber-800 text-white rounded-tr-xs border border-amber-500/30'
                          : 'bg-slate-800/90 text-slate-100 rounded-tl-xs border border-slate-700/80 shadow-lg'
                      }`}
                    >
                      {/* Assistant Header Badge */}
                      {!isUser && (
                        <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-slate-700/60 text-[11px] text-amber-300 font-serif">
                          <span className="flex items-center gap-1.5 font-bold">
                            <GraduationCap size={14} className="text-amber-400" />
                            Tutor Teológico
                          </span>
                          <button
                            onClick={() => handleCopy(msg.id, msg.content)}
                            className="text-slate-400 hover:text-amber-300 flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-slate-700/50 transition-colors"
                            title="Copiar respuesta"
                          >
                            {copiedId === msg.id ? (
                              <>
                                <Check size={12} className="text-emerald-400" />
                                <span className="text-[10px] text-emerald-400 font-sans">Copiado</span>
                              </>
                            ) : (
                              <>
                                <Copy size={12} />
                                <span className="text-[10px] font-sans">Copiar</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}

                      {/* Content */}
                      {isUser ? (
                        <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                      ) : (
                        renderFormattedContent(msg.content)
                      )}

                      {/* Timestamp */}
                      <div className={`mt-2 text-[10px] text-right font-mono ${isUser ? 'text-amber-200/70' : 'text-slate-500'}`}>
                        {msg.timestamp}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/70 p-3 rounded-2xl rounded-tl-xs max-w-fit shadow-md animate-pulse">
                  <Bot size={16} className="text-amber-400 animate-spin" />
                  <span className="text-xs text-amber-200 font-sans">El asistente está analizando y redactando...</span>
                  <div className="flex items-center gap-1 ml-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* QUICK SUGGESTIONS CHIPS */}
            <div className="px-3 py-2 bg-slate-950/80 border-t border-slate-800/80 overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden shrink-0 flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
                <HelpCircle size={11} />
                Sugerencias:
              </span>
              {suggestedPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(prompt, { courseTitle: activeCourseTitle, lessonTitle: activeLessonTitle })}
                  disabled={isLoading}
                  className="px-2.5 py-1 bg-slate-800/90 hover:bg-amber-950/60 text-slate-300 hover:text-amber-200 border border-slate-700 hover:border-amber-500/50 rounded-full text-xs font-sans transition-all cursor-pointer disabled:opacity-50 shrink-0"
                >
                  {prompt.length > 45 ? `${prompt.slice(0, 45)}...` : prompt}
                </button>
              ))}
            </div>

            {/* INPUT BAR */}
            <div className="p-3 bg-slate-950 border-t border-slate-800 shrink-0">
              <div className="relative flex items-end gap-2 bg-slate-900 border border-slate-700/80 focus-within:border-amber-500/80 rounded-xl p-2 transition-colors">
                <textarea
                  ref={textareaRef}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Haz una pregunta bíblica, teológica o sobre tus clases..."
                  rows={2}
                  disabled={isLoading}
                  className="flex-1 bg-transparent text-slate-100 text-sm placeholder:text-slate-500 outline-none resize-none custom-scrollbar leading-relaxed"
                />

                <button
                  onClick={handleSend}
                  disabled={!inputText.trim() || isLoading}
                  className="p-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg transition-all cursor-pointer shadow-md active:scale-95 shrink-0"
                  title="Enviar pregunta (Enter)"
                >
                  <Send size={16} />
                </button>
              </div>

              <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-500 px-1">
                <span>Presiona <strong>Enter</strong> para enviar, <strong>Shift + Enter</strong> para salto de línea</span>
                <span className="hidden sm:inline">Seminario Teológico Digital AI</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
