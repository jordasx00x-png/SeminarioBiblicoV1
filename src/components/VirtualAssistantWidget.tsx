import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  RotateCcw
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
    messages, 
    isLoading, 
    sendMessage, 
    clearChat 
  } = useVirtualAssistant();

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
      <div className="space-y-3 text-xs sm:text-sm leading-relaxed font-sans text-[#1A2533] dark:text-stone-200">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) {
            return <div key={idx} className="h-2" />;
          }

          if (trimmed.startsWith('### ')) {
            return (
              <h4 key={idx} className="font-serif font-black text-sm sm:text-base text-[#1A2533] dark:text-white pt-2 uppercase tracking-tight">
                {trimmed.replace('### ', '')}
              </h4>
            );
          }
          if (trimmed.startsWith('## ')) {
            return (
              <h3 key={idx} className="font-serif font-black text-base sm:text-lg text-[#7F1D1D] dark:text-amber-500 pt-3 border-b border-stone-200 dark:border-stone-800 pb-1 uppercase tracking-tighter">
                {trimmed.replace('## ', '')}
              </h3>
            );
          }

          if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            const itemText = trimmed.replace(/^[-*]\s+/, '');
            return (
              <div key={idx} className="flex items-start gap-2.5 pl-1">
                <span className="text-[#7F1D1D] dark:text-amber-500 mt-1 text-base leading-none">•</span>
                <span className="flex-1">{formatInline(itemText)}</span>
              </div>
            );
          }

          const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
          if (numMatch) {
            return (
              <div key={idx} className="flex items-start gap-2 pl-1">
                <span className="text-[#7F1D1D] dark:text-amber-500 font-mono text-[10px] font-bold mt-1">{numMatch[1]}.</span>
                <span className="flex-1">{formatInline(numMatch[2])}</span>
              </div>
            );
          }

          if (trimmed.startsWith('> ')) {
            return (
              <blockquote key={idx} className="border-l-4 border-[#7F1D1D] dark:border-amber-500 pl-3.5 py-1.5 my-2 bg-[#FAF9F5] dark:bg-stone-800/60 text-[#1A2533] dark:text-stone-200 font-serif italic rounded-r">
                {formatInline(trimmed.replace(/^>\s+/, ''))}
              </blockquote>
            );
          }

          return <p key={idx}>{formatInline(trimmed)}</p>;
        })}
      </div>
    );
  };

  const formatInline = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-bold text-[#1A2533] dark:text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={i} className="px-1.5 py-0.5 bg-stone-100 dark:bg-stone-800 text-[#7F1D1D] dark:text-amber-400 font-mono text-[11px] rounded border border-stone-200 dark:border-stone-700">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  if (isSplitMode) {
    if (!isOpen) return null;
    return (
      <div className="w-full h-full bg-white dark:bg-zinc-950 border-stone-200 dark:border-stone-800 flex flex-col font-sans overflow-hidden text-[#1A2533] dark:text-stone-100">
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
                  Consultoría Doctrinal
                </h3>
                <span className="flex items-center gap-1 text-[8px] bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 px-1.5 py-0.5 rounded font-bold uppercase tracking-widest shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  En Línea
                </span>
              </div>
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest truncate mt-0.5">
                Campus Virtual • Asistencia Teológica IA
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            {showClearConfirm ? (
              <div className="flex items-center gap-1.5 bg-[#FAF9F5] dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-2 py-0.5 rounded">
                <span className="text-[9px] text-stone-500 dark:text-stone-400 font-black uppercase tracking-widest">¿Borrar?</span>
                <button
                  onClick={() => {
                    clearChat();
                    setShowClearConfirm(false);
                  }}
                  className="px-2 py-0.5 bg-[#7F1D1D] hover:bg-black text-white rounded text-[9px] font-black uppercase tracking-widest cursor-pointer"
                >
                  Sí
                </button>
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="px-2 py-0.5 bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 rounded text-[9px] uppercase font-black tracking-widest cursor-pointer"
                >
                  No
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowClearConfirm(true)}
                className="p-1.5 text-stone-400 hover:text-[#7F1D1D] hover:bg-stone-50 dark:hover:bg-stone-800 rounded transition-colors cursor-pointer"
                title="Reiniciar chat"
              >
                <RotateCcw size={16} />
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-[#7F1D1D] hover:bg-stone-50 dark:hover:bg-stone-800 rounded transition-colors cursor-pointer ml-1"
              title="Cerrar consultor"
            >
              <X size={18} />
            </button>
          </div>
        </div>

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
                    <span>{msg.timestamp}</span>
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
          <div className="px-5 py-4 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between shrink-0 relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#7F1D1D]" />
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-10 h-10 rounded bg-[#FAF9F5] dark:bg-stone-800 flex items-center justify-center border border-stone-200 dark:border-stone-700 shadow-sm shrink-0">
                <Bot size={22} strokeWidth={1.5} className="text-[#7F1D1D] dark:text-amber-500" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-serif font-black text-[#1A2533] dark:text-stone-100 uppercase tracking-tight truncate">
                    Consultoría Doctrinal
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
            <div className="flex items-center gap-1 shrink-0">
              {showClearConfirm ? (
                <div className="flex items-center gap-2 bg-[#FAF9F5] dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3 py-1.5 rounded">
                  <span className="text-[9px] text-stone-500 dark:text-stone-400 font-black uppercase tracking-widest">¿Borrar?</span>
                  <button
                    onClick={() => {
                      clearChat();
                      setShowClearConfirm(false);
                    }}
                    className="px-2 py-0.5 bg-[#7F1D1D] hover:bg-black text-white rounded text-[10px] font-black uppercase tracking-widest cursor-pointer"
                  >
                    Sí
                  </button>
                  <button
                    onClick={() => setShowClearConfirm(false)}
                    className="px-2 py-0.5 bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 rounded text-[10px] uppercase font-black tracking-widest cursor-pointer"
                  >
                    No
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowClearConfirm(true)}
                  className="p-2 text-stone-400 hover:text-[#7F1D1D] hover:bg-stone-50 dark:hover:bg-stone-800 rounded transition-colors cursor-pointer"
                  title="Reiniciar chat"
                >
                  <RotateCcw size={18} />
                </button>
              )}

              <button
                onClick={() => setIsMinimized(true)}
                className="p-2 text-stone-400 hover:text-[#1A2533] dark:hover:text-white hover:bg-stone-50 dark:hover:bg-stone-800 rounded transition-colors cursor-pointer"
                title="Minimizar"
              >
                <Minimize2 size={18} />
              </button>

              <button
                onClick={() => setIsExpanded(prev => !prev)}
                className="hidden sm:inline-flex p-2 text-stone-400 hover:text-[#1A2533] dark:hover:text-white hover:bg-stone-50 dark:hover:bg-stone-800 rounded transition-colors cursor-pointer"
                title={isExpanded ? "Reducir ventana" : "Expandir pantalla completa"}
              >
                {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>

              <button
                onClick={onClose}
                className="p-2 text-stone-400 hover:text-[#7F1D1D] hover:bg-stone-50 dark:hover:bg-stone-800 rounded transition-colors cursor-pointer"
                title="Cerrar asistente"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* CONTEXT BANNER */}
          {(activeCourseTitle || activeLessonTitle) && (
            <div className="px-5 py-2.5 bg-[#FAF9F5] dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between text-[10px] font-bold text-stone-500 uppercase tracking-widest shrink-0 font-sans">
              <div className="flex items-center gap-2 truncate">
                <BookOpen size={14} className="text-[#7F1D1D] dark:text-amber-500 shrink-0" />
                <span className="truncate">
                  Referencia: <span className="text-[#1A2533] dark:text-stone-200">{activeLessonTitle || activeCourseTitle}</span>
                </span>
              </div>
              <span className="text-[#7F1D1D] dark:text-amber-500 shrink-0 ml-2">Enfoque Académico</span>
            </div>
          )}

          {/* MESSAGES LIST */}
          <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-zinc-950 overflow-hidden">
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
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
                        {msg.timestamp}
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
            <div className="p-5 bg-white dark:bg-zinc-950 border-t border-stone-200 dark:border-stone-800 shrink-0">
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
