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
}

export function FloatingNotesWidget({
  user,
  customProfileName,
  activeCourseTitle,
  activeLessonTitle,
  courseId,
  lessonId,
  onNavigateToLesson,
  onLayoutChange
}: FloatingNotesWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
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
          className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <button
            onClick={() => {
              setIsOpen(true);
              setIsMinimized(false);
            }}
            className="group relative flex items-center gap-2.5 px-4 py-3 bg-slate-900 hover:bg-slate-800 text-amber-300 rounded-full shadow-2xl border border-amber-500/40 hover:border-amber-400 transition-all duration-300 cursor-pointer active:scale-95"
            title="Abrir mis notas de clase"
          >
            <div className="relative">
              <Edit3 size={19} className="text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
              {notes.length > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black flex items-center justify-center border border-slate-900 shadow-sm">
                  {notes.length}
                </span>
              )}
            </div>
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-amber-200">
              Notas ({notes.length})
            </span>
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
            className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-[60] bg-slate-900 text-white border border-amber-500/50 rounded-2xl shadow-2xl p-3 flex items-center gap-3 max-w-xs sm:max-w-md font-sans"
          >
            <div className="p-2 bg-amber-500/20 border border-amber-500/40 text-amber-300 rounded-xl shrink-0">
              <Edit3 size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-200 truncate">
                  {activeNote ? activeNote.title : 'Notas'}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 truncate mt-0.5">
                {activeNote ? (activeNote.content || 'Sin contenido aún') : `${notes.length} notas en cuenta`}
              </p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => setIsMinimized(false)}
                className="px-2.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 text-xs shadow-md"
              >
                <ChevronUp size={15} />
                <span>Restaurar</span>
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
            className={`fixed z-[60] bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col font-sans transition-all duration-150 ${
              isFullScreen
                ? 'inset-2 sm:inset-6 w-auto h-auto rounded-2xl'
                : !winPos
                  ? 'top-16 right-4 w-[520px] max-w-[92vw] h-[600px] max-h-[85vh]'
                  : ''
            }`}
            onClick={e => e.stopPropagation()}
          >
            {/* 8-DIRECTION RESIZABLE HANDLES */}
            {!isFullScreen && (
              <>
                <div onMouseDown={e => handleResizeStart(e, 'top')} className="absolute -top-1.5 left-3 right-3 h-3 cursor-ns-resize z-30" />
                <div onMouseDown={e => handleResizeStart(e, 'bottom')} className="absolute -bottom-1.5 left-3 right-3 h-3 cursor-ns-resize z-30" />
                <div onMouseDown={e => handleResizeStart(e, 'left')} className="absolute top-3 -left-1.5 bottom-3 w-3 cursor-ew-resize z-30" />
                <div onMouseDown={e => handleResizeStart(e, 'right')} className="absolute top-3 -right-1.5 bottom-3 w-3 cursor-ew-resize z-30" />
                <div onMouseDown={e => handleResizeStart(e, 'top-left')} className="absolute -top-1.5 -left-1.5 w-4 h-4 cursor-nwse-resize z-30" />
                <div onMouseDown={e => handleResizeStart(e, 'top-right')} className="absolute -top-1.5 -right-1.5 w-4 h-4 cursor-nesw-resize z-30" />
                <div onMouseDown={e => handleResizeStart(e, 'bottom-left')} className="absolute -bottom-1.5 -left-1.5 w-4 h-4 cursor-nesw-resize z-30" />
                <div onMouseDown={e => handleResizeStart(e, 'bottom-right')} className="absolute -bottom-1.5 -right-1.5 w-4 h-4 cursor-nwse-resize z-30" />
              </>
            )}

            {/* HEADER BAR */}
            <div 
              onMouseDown={!isFullScreen ? handleHeaderDragStart : undefined}
              onTouchStart={!isFullScreen ? handleHeaderDragStart : undefined}
              className={`bg-slate-900 border-slate-800 text-white px-3.5 py-3 border-b flex items-center justify-between shrink-0 select-none rounded-t-2xl ${
                !isFullScreen ? 'cursor-grab active:cursor-grabbing' : ''
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-1.5 bg-amber-500/20 text-amber-400 rounded-lg shrink-0 border border-amber-500/30">
                  <FileText size={17} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs sm:text-sm font-bold text-white truncate flex items-center gap-1.5">
                    Mis Notas de Clase
                  </h3>
                  <p className="text-[10px] text-slate-400 truncate">
                    {userName} • {notes.length} {notes.length === 1 ? 'nota' : 'notas'} guardadas
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0" onClick={e => e.stopPropagation()}>
                {/* New Note Button */}
                <button
                  onClick={handleCreateNew}
                  className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1 transition-all cursor-pointer shadow-xs mr-1"
                  title="Crear una nueva nota"
                >
                  <Plus size={14} />
                  <span className="hidden sm:inline">Nueva</span>
                </button>

                {/* Sidebar Toggle Button */}
                <button
                  onClick={() => setShowSidebar(prev => !prev)}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    showSidebar
                      ? 'bg-slate-800 text-amber-300'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                  title={showSidebar ? "Ocultar lista de notas para enfocar el editor" : "Mostrar lista de notas"}
                >
                  {showSidebar ? <PanelLeftClose size={16} /> : <PanelLeftOpen size={16} />}
                </button>

                {/* Minimize Button */}
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  title="Minimizar notas"
                >
                  <Minus size={16} />
                </button>

                {/* Fullscreen Button */}
                <button
                  onClick={() => setIsFullScreen(prev => !prev)}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  title={isFullScreen ? 'Restaurar tamaño normal' : 'Maximizar a pantalla completa'}
                >
                  {isFullScreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>

                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer ml-0.5"
                  title="Cerrar notas"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* BODY: SPLIT VIEW OR FULL EDITOR */}
            <div className="flex-1 flex overflow-hidden min-h-0 rounded-b-2xl bg-slate-50 dark:bg-slate-950">
              
              {/* LEFT SIDEBAR: NOTE LIST */}
              {showSidebar && (
                <div className={`w-full sm:w-52 md:w-56 border-r flex flex-col shrink-0 bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800/80 ${
                  activeNoteId ? 'hidden sm:flex' : 'flex'
                }`}>
                  {/* Search bar */}
                  <div className="p-2.5 border-b bg-slate-50/50 dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                    <div className="relative">
                      <Search size={13} className="absolute left-2.5 top-2.5 text-slate-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Buscar notas..."
                        className="w-full pl-8 pr-2.5 py-1.5 text-xs rounded-lg outline-none transition-colors bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:border-amber-500/60"
                      />
                    </div>
                  </div>

                  {/* Notes List */}
                  <div className="flex-1 overflow-y-auto custom-scrollbar p-1.5 space-y-1">
                    {filteredNotes.length === 0 ? (
                      <div className="p-4 text-center text-slate-400 dark:text-slate-500 text-xs">
                        No hay notas que coincidan.
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
                            className={`p-2.5 rounded-xl cursor-pointer transition-all border ${
                              isActive
                                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700/60 shadow-2xs'
                                : 'bg-transparent border-transparent hover:bg-slate-100 dark:hover:bg-slate-800/60'
                            }`}
                          >
                            <h4 className={`text-xs font-bold truncate ${
                              isActive ? 'text-amber-900 dark:text-amber-200' : 'text-slate-800 dark:text-slate-200'
                            }`}>
                              {n.title || 'Sin título'}
                            </h4>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                              {n.content || 'Nota vacía...'}
                            </p>
                            <div className="flex items-center justify-between gap-1 mt-1.5">
                              <span className="text-[9px] text-slate-400 flex items-center gap-1 font-mono">
                                <Clock size={9} />
                                {new Date(n.updatedAt).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}
                              </span>
                              {n.lessonTitle && (
                                <span className="text-[9px] text-amber-700 dark:text-amber-300 bg-amber-100/80 dark:bg-amber-950/80 px-1.5 py-0.2 rounded truncate max-w-[100px]">
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
              <div className={`flex-1 min-w-0 flex flex-col bg-white dark:bg-slate-900 ${
                !activeNoteId && showSidebar ? 'hidden sm:flex' : 'flex'
              }`}>
                {activeNote ? (
                  <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
                    {/* Editor Toolbar */}
                    <div className="px-3.5 py-2 border-b bg-slate-50/70 dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 shrink-0">
                      <div className="flex items-center gap-2 min-w-0">
                        {showSidebar && (
                          <button
                            onClick={() => setActiveNoteId(null)}
                            className="text-xs text-amber-600 dark:text-amber-400 font-bold items-center gap-1 cursor-pointer sm:hidden flex"
                          >
                            ← Lista
                          </button>
                        )}
                        <span className="text-[11px] text-slate-400 font-medium truncate">
                          {isSaving ? (
                            <span className="text-amber-500 font-bold flex items-center gap-1 animate-pulse">
                              <Sparkles size={11} /> Guardando...
                            </span>
                          ) : (
                            <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                              <Check size={11} /> Guardado
                            </span>
                          )}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-xs shrink-0">
                        <button
                          onClick={() => handleCopy(`${title}\n\n${content}`, activeNote.id)}
                          className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                          title="Copiar nota al portapapeles"
                        >
                          {copiedId === activeNote.id ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                        </button>

                        {isDeletingId === activeNote.id ? (
                          <div className="flex items-center gap-1 bg-red-500/10 border border-red-500/30 px-1.5 py-0.5 rounded-lg">
                            <span className="text-[10px] text-red-500 font-bold">¿Borrar?</span>
                            <button
                              onClick={() => handleDelete(activeNote.id)}
                              className="px-1.5 py-0.5 bg-red-600 text-white rounded text-[10px] font-bold"
                            >
                              Sí
                            </button>
                            <button
                              onClick={() => setIsDeletingId(null)}
                              className="px-1.5 py-0.5 bg-slate-700 text-white rounded text-[10px]"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setIsDeletingId(activeNote.id)}
                            className="p-1.5 text-slate-400 hover:text-red-500 rounded hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                            title="Eliminar nota"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Editor Form Inputs */}
                    <div className="p-4 sm:p-5 flex-1 min-w-0 flex flex-col gap-3 overflow-y-auto custom-scrollbar">
                      <input
                        type="text"
                        value={title}
                        onChange={e => {
                          setTitle(e.target.value);
                          handleAutoSave(e.target.value, content);
                        }}
                        placeholder="Título de la nota..."
                        className="w-full text-lg sm:text-xl font-bold font-serif text-slate-900 dark:text-slate-100 bg-transparent outline-none border-b border-slate-200/60 dark:border-slate-800 focus:border-amber-500/80 pb-2 transition-colors min-w-0"
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
                            className="group flex items-center gap-1.5 text-xs font-bold text-amber-900 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 dark:hover:bg-amber-900/80 border border-amber-300/80 dark:border-amber-800/80 px-2.5 py-1 rounded-lg w-fit max-w-full transition-all cursor-pointer shadow-2xs shrink-0"
                            title="Ir a esta clase"
                          >
                            <BookOpen size={12} className="text-amber-700 dark:text-amber-400 shrink-0" />
                            <span className="truncate max-w-[240px] sm:max-w-[340px]">
                              Clase: <span className="underline decoration-amber-500/60">{linkedTitle || 'Ver lección'}</span>
                            </span>
                            <ExternalLink size={11} className="text-amber-600 dark:text-amber-400 opacity-70 group-hover:opacity-100 shrink-0" />
                          </button>
                        );
                      })()}

                      <textarea
                        value={content}
                        onChange={e => {
                          setContent(e.target.value);
                          handleAutoSave(title, e.target.value);
                        }}
                        placeholder="Escriba aquí sus anotaciones, pasajes bíblicos o puntos clave de la lección..."
                        className="w-full flex-1 min-h-[260px] font-sans text-sm sm:text-base leading-relaxed text-slate-800 dark:text-slate-200 bg-transparent outline-none resize-none custom-scrollbar placeholder:text-slate-400 dark:placeholder:text-slate-600 min-w-0"
                      />
                    </div>

                    {/* Footer word count info */}
                    <div className="px-4 py-2 border-t text-[11px] flex items-center justify-between shrink-0 bg-slate-50/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 text-slate-400">
                      <span>{wordCount} {wordCount === 1 ? 'palabra' : 'palabras'} • {content.length} caracteres</span>
                      <span className="text-[10px] text-slate-400">Autoguardado en tiempo real</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400">
                    <FileText size={32} className="text-slate-300 dark:text-slate-700 mb-2" />
                    <p className="text-xs">Selecciona o crea una nota para comenzar a escribir.</p>
                    <button
                      onClick={handleCreateNew}
                      className="mt-3 px-3 py-1.5 bg-amber-500 text-slate-950 font-bold rounded-lg text-xs hover:bg-amber-400 transition-colors cursor-pointer"
                    >
                      + Crear Nota
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
