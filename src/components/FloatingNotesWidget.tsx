import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Plus, 
  X, 
  Search, 
  Trash2, 
  Check, 
  Copy, 
  Edit3, 
  Sparkles, 
  BookOpen,
  ExternalLink,
  Minimize2,
  Maximize2,
  Minus,
  ChevronUp,
  GripHorizontal,
  PanelLeftClose,
  PanelLeftOpen,
  Clock,
  Eye,
  EyeOff
} from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';
import { 
  UserNote, 
  getUserNotes, 
  saveUserNote, 
  deleteUserNote, 
  subscribeToUserNotes,
  syncNotesFromFirestore 
} from '../utils/userNotesStorage';

interface FloatingNotesWidgetProps {
  user: FirebaseUser | null;
  customProfileName?: string;
  activeCourseTitle?: string;
  activeLessonTitle?: string;
  courseId?: string;
  lessonId?: string;
  onNavigateToLesson?: (courseId: string, lessonId: string) => void;
  onLayoutChange?: (info: { isOpen: boolean; isMinimized: boolean; isDocked: boolean; width: number; rightOffset: number }) => void;
  externalOpenTrigger?: number;
}

export function FloatingNotesWidget({
  user,
  customProfileName,
  activeCourseTitle,
  activeLessonTitle,
  courseId,
  lessonId,
  onNavigateToLesson,
  onLayoutChange,
  externalOpenTrigger
}: FloatingNotesWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (externalOpenTrigger && externalOpenTrigger > 0) {
      setIsOpen(true);
      setIsMinimized(false);
    }
  }, [externalOpenTrigger]);
  const userId = user?.uid || 'invitado_seminario';
  const userName = customProfileName || user?.displayName || (user?.email ? user.email.split('@')[0] : 'Estudiante');
  const userEmail = user?.email || 'invitado@seminariodigital.org';

  const [notes, setNotes] = useState<UserNote[]>(() => getUserNotes(userId));
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);

  // States for Minimization, Resizing & Sidebar Visibility
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  const [winPos, setWinPos] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);

  // Initialize winPos when opened
  useEffect(() => {
    if (isOpen && !isMinimized && !winPos) {
      const defaultW = Math.min(580, window.innerWidth - 32);
      const defaultH = Math.min(600, window.innerHeight - 90);
      const defaultLeft = Math.max(16, window.innerWidth - defaultW - 24);
      const defaultTop = Math.max(70, Math.min(100, window.innerHeight - defaultH - 40));
      setWinPos({ left: defaultLeft, top: defaultTop, width: defaultW, height: defaultH });
    }
  }, [isOpen, isMinimized, winPos]);

  // Notify parent of layout changes
  useEffect(() => {
    if (onLayoutChange) {
      onLayoutChange({
        isOpen,
        isMinimized,
        isDocked: false,
        width: winPos?.width || 520,
        rightOffset: 0
      });
    }
  }, [isOpen, isMinimized, winPos, onLayoutChange]);

  // Subscribe & sync user notes
  useEffect(() => {
    const unsub = subscribeToUserNotes(userId, () => {
      setNotes(getUserNotes(userId));
    });
    if (user?.uid) {
      syncNotesFromFirestore(user.uid).then(synced => {
        if (synced && synced.length > 0) setNotes(synced);
      });
    }
    return () => unsub();
  }, [userId, user]);

  // Active note sync
  const activeNote = useMemo(() => {
    return notes.find(n => n.id === activeNoteId) || null;
  }, [notes, activeNoteId]);

  useEffect(() => {
    if (activeNote) {
      setTitle(activeNote.title);
      setContent(activeNote.content);
    } else if (notes.length > 0 && !activeNoteId) {
      setActiveNoteId(notes[0].id);
      setTitle(notes[0].title);
      setContent(notes[0].content);
    }
  }, [activeNoteId, activeNote, notes]);

  const filteredNotes = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return notes;
    return notes.filter(n => 
      n.title.toLowerCase().includes(q) || 
      n.content.toLowerCase().includes(q)
    );
  }, [notes, searchQuery]);

  const handleCreateNew = () => {
    const newTitle = activeLessonTitle 
      ? `Nota: ${activeLessonTitle}` 
      : `Apunte de Estudio (${new Date().toLocaleDateString('es-ES')})`;

    const created = saveUserNote(userId, {
      title: newTitle,
      content: '',
      userName,
      userEmail,
      courseId,
      lessonId,
      lessonTitle: activeLessonTitle,
      courseTitle: activeCourseTitle
    });

    setActiveNoteId(created.id);
    setTitle(created.title);
    setContent('');
  };

  const handleAutoSave = (updatedTitle: string, updatedContent: string) => {
    if (!activeNoteId) return;
    setIsSaving(true);
    saveUserNote(userId, {
      id: activeNoteId,
      title: updatedTitle,
      content: updatedContent,
      userName,
      userEmail,
      courseId: activeNote?.courseId || courseId,
      lessonId: activeNote?.lessonId || lessonId,
      lessonTitle: activeNote?.lessonTitle || activeLessonTitle,
      courseTitle: activeNote?.courseTitle || activeCourseTitle
    });
    setTimeout(() => setIsSaving(false), 300);
  };

  const handleDelete = (noteId: string) => {
    deleteUserNote(userId, noteId);
    if (activeNoteId === noteId) {
      setActiveNoteId(null);
      setTitle('');
      setContent('');
    }
    setIsDeletingId(null);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Header dragging
  const handleHeaderDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (isFullScreen || !winPos) return;
    e.preventDefault();
    e.stopPropagation();

    const startX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const startY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const startLeft = winPos.left;
    const startTop = winPos.top;

    const onMove = (moveEvent: MouseEvent | TouchEvent) => {
      const currentX = 'touches' in moveEvent ? moveEvent.touches[0].clientX : moveEvent.clientX;
      const currentY = 'touches' in moveEvent ? moveEvent.touches[0].clientY : moveEvent.clientY;

      const deltaX = currentX - startX;
      const deltaY = currentY - startY;

      const newLeft = Math.max(10, Math.min(window.innerWidth - winPos.width - 10, startLeft + deltaX));
      const newTop = Math.max(10, Math.min(window.innerHeight - winPos.height - 10, startTop + deltaY));

      setWinPos(prev => prev ? { ...prev, left: newLeft, top: newTop } : null);
    };

    const onEnd = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);
    window.addEventListener('touchmove', onMove);
    window.addEventListener('touchend', onEnd);
  };

  // Edge Resizing
  const handleResizeStart = (
    e: React.MouseEvent | React.TouchEvent,
    direction: 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  ) => {
    if (isFullScreen || !winPos) return;
    e.preventDefault();
    e.stopPropagation();

    const startX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const startY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const { left: startLeft, top: startTop, width: startW, height: startH } = winPos;

    const minW = 340;
    const minH = 320;

    const onMove = (moveEvent: MouseEvent | TouchEvent) => {
      const currentX = 'touches' in moveEvent ? moveEvent.touches[0].clientX : moveEvent.clientX;
      const currentY = 'touches' in moveEvent ? moveEvent.touches[0].clientY : moveEvent.clientY;

      const deltaX = currentX - startX;
      const deltaY = currentY - startY;

      let newLeft = startLeft;
      let newTop = startTop;
      let newWidth = startW;
      let newHeight = startH;

      if (direction.includes('right')) {
        newWidth = Math.max(minW, Math.min(window.innerWidth - startLeft - 10, startW + deltaX));
      } else if (direction.includes('left')) {
        const maxDeltaX = startW - minW;
        const validDeltaX = Math.min(maxDeltaX, Math.max(-startLeft + 10, deltaX));
        newLeft = startLeft + validDeltaX;
        newWidth = startW - validDeltaX;
      }

      if (direction.includes('bottom')) {
        newHeight = Math.max(minH, Math.min(window.innerHeight - startTop - 10, startH + deltaY));
      } else if (direction.includes('top')) {
        const maxDeltaY = startH - minH;
        const validDeltaY = Math.min(maxDeltaY, Math.max(-startTop + 10, deltaY));
        newTop = startTop + validDeltaY;
        newHeight = startH - validDeltaY;
      }

      setWinPos({ left: newLeft, top: newTop, width: newWidth, height: newHeight });
    };

    const onEnd = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);
    window.addEventListener('touchmove', onMove);
    window.addEventListener('touchend', onEnd);
  };

  const wordCount = useMemo(() => {
    return content.trim() ? content.trim().split(/\s+/).length : 0;
  }, [content]);

  return (
    <>
      {/* FLOATING ACTION BUTTON */}
      {!isOpen && !isMinimized && (
        <motion.div 
          className="fixed bottom-20 right-4 md:bottom-20 md:right-6 z-50"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <button
            onClick={() => {
              setIsOpen(true);
              setIsMinimized(false);
            }}
            className="group relative flex items-center gap-3 px-5 py-3.5 bg-[#1A2533] hover:bg-black text-white rounded-full shadow-2xl border border-stone-700 transition-all duration-300 cursor-pointer active:scale-95"
            title="Abrir mis notas de clase"
          >
            <Edit3 size={22} strokeWidth={1.5} className="text-amber-200" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] hidden md:inline">Bitácora de Estudio</span>
          </button>
        </motion.div>
      )}

      {/* MINIMIZED FLOATING BAR */}
      <AnimatePresence>
        {isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            className="fixed bottom-24 right-4 md:bottom-24 md:right-6 z-[60] bg-white dark:bg-zinc-900 text-[#1A2533] dark:text-stone-100 border border-stone-200 dark:border-stone-800 rounded shadow-2xl p-4 flex items-center gap-4 font-sans max-w-xs sm:max-w-md"
          >
            <div className="p-2 bg-[#FAF9F5] dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-[#7F1D1D] dark:text-amber-500 rounded shrink-0">
              <Edit3 size={20} strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-black text-[#1A2533] dark:text-stone-100 uppercase tracking-widest truncate block">
                {activeNote ? activeNote.title : 'Bitácora'}
              </span>
              <p className="text-[10px] text-stone-400 uppercase tracking-widest mt-0.5 truncate font-bold">
                {activeNote ? (activeNote.content || 'Sin contenido') : `${notes.length} Apuntes`}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIsMinimized(false)}
                className="px-3 py-1.5 bg-[#7F1D1D] hover:bg-black text-white rounded text-[9px] font-black uppercase tracking-[0.2em] transition-all cursor-pointer shadow-sm active:scale-95"
              >
                Abrir
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsMinimized(false);
                }}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN NOTES WINDOW */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 240 }}
            style={
              isFullScreen
                ? undefined
                : {
                    left: winPos ? `${winPos.left}px` : undefined,
                    top: winPos ? `${winPos.top}px` : undefined,
                    width: winPos ? `${winPos.width}px` : undefined,
                    height: winPos ? `${winPos.height}px` : undefined,
                  }
            }
            className={`fixed z-[60] bg-white dark:bg-zinc-950 shadow-[0_30px_60px_rgba(0,0,0,0.2)] border border-stone-200 dark:border-stone-800 rounded flex flex-col font-sans transition-all duration-150 ${
              isFullScreen
                ? 'inset-2 sm:inset-6 w-auto h-auto rounded'
                : !winPos
                  ? 'inset-x-2 bottom-4 top-14 sm:inset-x-auto sm:top-16 sm:right-4 sm:left-auto sm:bottom-auto sm:w-[560px] sm:max-w-[92vw] sm:h-[650px] sm:max-h-[85vh] rounded'
                  : ''
            }`}
            onClick={e => e.stopPropagation()}
          >
            {/* 8-DIRECTION RESIZABLE HANDLES */}
            {!isFullScreen && (
              <div className="hidden sm:block">
                <div onMouseDown={e => handleResizeStart(e, 'top')} className="absolute -top-1.5 left-3 right-3 h-3 cursor-ns-resize z-30" />
                <div onMouseDown={e => handleResizeStart(e, 'bottom')} className="absolute -bottom-1.5 left-3 right-3 h-3 cursor-ns-resize z-30" />
                <div onMouseDown={e => handleResizeStart(e, 'left')} className="absolute top-3 -left-1.5 bottom-3 w-3 cursor-ew-resize z-30" />
                <div onMouseDown={e => handleResizeStart(e, 'right')} className="absolute top-3 -right-1.5 bottom-3 w-3 cursor-ew-resize z-30" />
              </div>
            )}

            {/* HEADER BAR: Institutional Paper Style */}
            <div 
              onMouseDown={!isFullScreen ? handleHeaderDragStart : undefined}
              onTouchStart={!isFullScreen ? handleHeaderDragStart : undefined}
              className={`bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-[#1A2533] dark:text-stone-100 px-5 py-4 border-b flex items-center justify-between shrink-0 select-none relative ${
                !isFullScreen ? 'cursor-grab active:cursor-grabbing' : ''
              }`}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-[#1A2533]" />
              <div className="flex items-center gap-4 min-w-0">
                <div className="p-2 bg-[#FAF9F5] dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-[#1A2533] dark:text-amber-500 rounded shrink-0">
                  <FileText size={20} strokeWidth={1.5} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-serif font-black text-[#1A2533] dark:text-stone-100 uppercase tracking-tight truncate">
                    Bitácora Académica
                  </h3>
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-0.5 truncate">
                    {userName} • {notes.length} Apuntes Registrados
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0" onClick={e => e.stopPropagation()}>
                {/* New Note Button */}
                <button
                  onClick={handleCreateNew}
                  className="px-4 py-2 bg-[#7F1D1D] hover:bg-black text-white font-black rounded text-[9px] uppercase tracking-[0.2em] flex items-center gap-2 transition-all cursor-pointer shadow-sm mr-2 active:scale-95"
                  title="Registrar nueva nota"
                >
                  <Plus size={14} strokeWidth={2.5} />
                  <span className="hidden sm:inline">Nuevo Apunte</span>
                </button>

                {/* Sidebar Toggle Button */}
                <button
                  onClick={() => setShowSidebar(prev => !prev)}
                  className={`p-2 rounded transition-colors cursor-pointer ${
                    showSidebar
                      ? 'bg-stone-100 dark:bg-stone-800 text-[#7F1D1D] dark:text-amber-500'
                      : 'text-stone-400 hover:text-[#1A2533] dark:hover:text-white hover:bg-stone-50 dark:hover:bg-stone-800'
                  }`}
                  title={showSidebar ? "Enfocar Escritorio" : "Mostrar Archivo"}
                >
                  {showSidebar ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
                </button>

                {/* Minimize Button */}
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-2 text-stone-400 hover:text-[#1A2533] hover:bg-stone-50 dark:hover:bg-stone-800 rounded transition-colors cursor-pointer"
                  title="Minimizar"
                >
                  <Minus size={18} />
                </button>

                {/* Fullscreen Button */}
                <button
                  onClick={() => setIsFullScreen(prev => !prev)}
                  className="p-2 text-stone-400 hover:text-[#1A2533] hover:bg-stone-50 dark:hover:bg-stone-800 rounded transition-colors cursor-pointer"
                  title={isFullScreen ? 'Restaurar' : 'Maximizar'}
                >
                  {isFullScreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                </button>

                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-stone-400 hover:text-[#7F1D1D] hover:bg-[#7F1D1D]/5 rounded transition-colors cursor-pointer ml-1"
                  title="Cerrar Bitácora"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* BODY: SPLIT VIEW OR FULL EDITOR */}
            <div className="flex-1 flex overflow-hidden min-h-0 bg-white dark:bg-zinc-950">
              
              {/* LEFT SIDEBAR: NOTE LIST */}
              {showSidebar && (
                <div className={`w-full sm:w-64 md:w-72 border-r flex flex-col shrink-0 bg-[#FAF9F5] dark:bg-stone-900/50 border-stone-200 dark:border-stone-800 ${
                  activeNoteId ? 'hidden sm:flex' : 'flex'
                }`}>
                  {/* Search bar */}
                  <div className="p-4 border-b border-stone-200 dark:border-stone-800">
                    <div className="relative">
                      <Search size={14} className="absolute left-3 top-2.5 text-stone-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Buscar en el archivo..."
                        className="w-full pl-9 pr-3 py-2 text-[10px] font-bold uppercase tracking-widest rounded bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-stone-800 dark:text-stone-200 outline-none focus:border-[#7F1D1D] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Notes List */}
                  <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
                    {filteredNotes.length === 0 ? (
                      <div className="p-8 text-center space-y-2">
                        <Search size={24} className="mx-auto text-stone-200" />
                        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Sin resultados</p>
                      </div>
                    ) : (
                      filteredNotes.map(n => {
                        const isActive = n.id === activeNoteId;
                        return (
                          <div
                            key={n.id}
                            onClick={() => {
                              setActiveNoteId(n.id);
                              setTitle(n.title);
                              setContent(n.content);
                            }}
                            className={`p-4 rounded border transition-all cursor-pointer ${
                              isActive
                                ? 'bg-white dark:bg-stone-800 border-[#7F1D1D] shadow-sm relative after:absolute after:left-0 after:top-0 after:bottom-0 after:w-1 after:bg-[#7F1D1D]'
                                : 'bg-transparent border-transparent hover:bg-white hover:border-stone-200'
                            }`}
                          >
                            <h4 className={`text-xs font-serif font-black mb-1 truncate ${
                              isActive ? 'text-[#7F1D1D] dark:text-amber-500' : 'text-[#1A2533] dark:text-stone-200'
                            }`}>
                              {n.title || 'Sin título'}
                            </h4>
                            <p className="text-[10px] text-stone-500 dark:text-stone-400 truncate line-clamp-1 mb-2">
                              {n.content || 'Sin contenido adicional...'}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-[9px] font-black text-stone-400 uppercase tracking-widest flex items-center gap-1.5">
                                <Clock size={10} />
                                {new Date(n.updatedAt).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}
                              </span>
                              {n.lessonTitle && (
                                <span className="text-[8px] font-black text-[#7F1D1D] dark:text-amber-500 bg-[#7F1D1D]/5 dark:bg-amber-950/40 px-1.5 py-0.5 rounded uppercase tracking-tighter truncate max-w-[80px]">
                                  {n.lessonTitle}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}

              {/* RIGHT EDITOR */}
              <div className={`flex-1 min-w-0 flex flex-col bg-white dark:bg-zinc-950 ${
                !activeNoteId && showSidebar ? 'hidden sm:flex' : 'flex'
              }`}>
                {activeNote ? (
                  <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
                    {/* Editor Toolbar */}
                    <div className="px-5 py-3 border-b bg-[#FAF9F5] dark:bg-stone-900 border-stone-200 dark:border-stone-800 flex items-center justify-between gap-3 shrink-0">
                      <div className="flex items-center gap-3 min-w-0">
                        {showSidebar && (
                          <button
                            onClick={() => setActiveNoteId(null)}
                            className="text-[9px] font-black uppercase tracking-[0.2em] text-[#7F1D1D] dark:text-amber-500 flex items-center gap-1.5 cursor-pointer sm:hidden"
                          >
                            ← Volver al Archivo
                          </button>
                        )}
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${isSaving ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
                          <span className="text-[9px] font-black text-stone-400 uppercase tracking-widest">
                            {isSaving ? 'Sincronizando...' : 'Anotación Acreditada'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleCopy(`${title}\n\n${content}`, activeNote.id)}
                          className="p-2 text-stone-400 hover:text-[#1A2533] dark:hover:text-white rounded hover:bg-white dark:hover:bg-stone-800 transition-colors cursor-pointer border border-transparent hover:border-stone-200"
                          title="Copiar contenido"
                        >
                          {copiedId === activeNote.id ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
                        </button>

                        {isDeletingId === activeNote.id ? (
                          <div className="flex items-center gap-2 bg-[#FAF9F5] border border-stone-300 px-3 py-1 rounded">
                            <span className="text-[9px] text-[#7F1D1D] font-black uppercase tracking-widest">¿Eliminar?</span>
                            <button
                              onClick={() => handleDelete(activeNote.id)}
                              className="px-2 py-0.5 bg-[#7F1D1D] text-white rounded text-[9px] font-black uppercase tracking-widest"
                            >
                              Sí
                            </button>
                            <button
                              onClick={() => setIsDeletingId(null)}
                              className="px-2 py-0.5 bg-stone-100 text-stone-600 rounded text-[9px] font-black uppercase tracking-widest"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setIsDeletingId(activeNote.id)}
                            className="p-2 text-stone-400 hover:text-[#7F1D1D] rounded hover:bg-[#7F1D1D]/5 transition-colors cursor-pointer border border-transparent hover:border-[#7F1D1D]/20"
                            title="Eliminar del archivo"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Editor Form Inputs */}
                    <div className="p-6 sm:p-10 flex-1 min-w-0 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
                      <div className="space-y-4">
                        <input
                          type="text"
                          value={title}
                          onChange={e => {
                            setTitle(e.target.value);
                            handleAutoSave(e.target.value, content);
                          }}
                          placeholder="Encabezado del Apunte..."
                          className="w-full text-2xl sm:text-3xl font-serif font-black text-[#1A2533] dark:text-stone-100 bg-transparent outline-none border-b border-stone-200 dark:border-stone-800 focus:border-[#7F1D1D] pb-3 transition-colors min-w-0"
                        />

                        {(() => {
                          const linkedTitle = activeNote?.lessonTitle || (activeNote?.lessonId === lessonId ? activeLessonTitle : undefined) || activeLessonTitle;
                          const targetCId = activeNote?.courseId || courseId;
                          const targetLId = activeNote?.lessonId || lessonId;

                          if (!linkedTitle && !targetLId) return null;

                          return (
                            <button
                              type="button"
                              onClick={() => {
                                if (targetLId && onNavigateToLesson) {
                                  onNavigateToLesson(targetCId || '', targetLId);
                                }
                              }}
                              className="group flex items-center gap-2.5 text-[10px] font-black text-[#1A2533] dark:text-stone-200 bg-[#FAF9F5] dark:bg-stone-900 hover:bg-white dark:hover:bg-stone-800 border border-stone-300 dark:border-stone-800 px-4 py-2 rounded uppercase tracking-widest w-fit max-w-full transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
                            >
                              <BookOpen size={14} className="text-[#7F1D1D] dark:text-amber-500 shrink-0" strokeWidth={2.5} />
                              <span className="truncate">
                                Vinculado: <span className="underline decoration-[#7F1D1D]/40 font-black">{linkedTitle || 'Ver lección'}</span>
                              </span>
                              <ExternalLink size={12} className="text-stone-400 group-hover:text-[#7F1D1D] shrink-0" />
                            </button>
                          );
                        })()}
                      </div>

                      <textarea
                        value={content}
                        onChange={e => {
                          setContent(e.target.value);
                          handleAutoSave(title, e.target.value);
                        }}
                        placeholder="Redacte aquí sus observaciones exegéticas, notas de clase o citas bíblicas de interés..."
                        className="w-full flex-1 min-h-[300px] font-serif italic text-base sm:text-lg leading-relaxed text-stone-700 dark:text-stone-300 bg-transparent outline-none resize-none custom-scrollbar placeholder:text-stone-300 dark:placeholder:text-stone-700 min-w-0"
                      />
                    </div>

                    {/* Footer word count info */}
                    <div className="px-6 py-3 border-t text-[9px] font-black uppercase tracking-[0.2em] flex items-center justify-between shrink-0 bg-[#FAF9F5] dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-400">
                      <div className="flex items-center gap-4">
                        <span>{wordCount} Unidades Léxicas</span>
                        <span>{content.length} Caracteres</span>
                      </div>
                      <span className="flex items-center gap-1.5">
                        <Check size={12} className="text-emerald-600" strokeWidth={3} />
                        Sincronización Permanente Activa
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-6">
                    <div className="w-24 h-24 rounded bg-[#FAF9F5] dark:bg-stone-900 flex items-center justify-center text-stone-200 dark:text-stone-800 border border-stone-100 dark:border-stone-800">
                      <Edit3 size={48} strokeWidth={1} />
                    </div>
                    <div className="max-w-xs space-y-2">
                      <h4 className="font-serif font-black text-xl text-[#1A2533] dark:text-stone-100 uppercase tracking-tight">Archivo de Apuntes</h4>
                      <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest leading-relaxed">Seleccione un registro del archivo o inicie una nueva bitácora de estudio para este módulo.</p>
                    </div>
                    <button
                      onClick={handleCreateNew}
                      className="px-8 py-3 bg-[#7F1D1D] hover:bg-black text-white font-black rounded text-[10px] uppercase tracking-[0.2em] shadow-lg transition-all cursor-pointer active:scale-95 flex items-center gap-3"
                    >
                      <Plus size={16} strokeWidth={3} />
                      Nueva Bitácora
                    </button>
                  </div>
                )}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
