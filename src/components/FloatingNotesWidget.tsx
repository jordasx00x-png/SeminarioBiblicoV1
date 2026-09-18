import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Plus, 
  X, 
  Search, 
  Trash2, 
  Save, 
  Check, 
  Copy, 
  Edit3, 
  User, 
  Sparkles, 
  Calendar,
  BookOpen,
  ExternalLink,
  Minimize2,
  Maximize2,
  Minus,
  ChevronUp,
  GripHorizontal,
  Move
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
  onLayoutChange?: (info: { isOpen: boolean; isMinimized: boolean; width: number; rightOffset: number }) => void;
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
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);

  // Minimization and Resizing states
  const [isMinimized, setIsMinimized] = useState(false);
  const [sizeMode, setSizeMode] = useState<'standard' | 'full'>('standard');
  const [winPos, setWinPos] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);

  // Initialize or maintain winPos inside viewport when opened
  useEffect(() => {
    if (isOpen && !isMinimized && !winPos) {
      const defaultW = Math.min(520, window.innerWidth - 32);
      const defaultH = Math.min(560, window.innerHeight - 80);
      const defaultLeft = Math.max(16, window.innerWidth - defaultW - 24);
      const defaultTop = Math.max(16, window.innerHeight - defaultH - 40);
      setWinPos({ left: defaultLeft, top: defaultTop, width: defaultW, height: defaultH });
    }
  }, [isOpen, isMinimized, winPos]);

  // Report widget open & width metrics to parent layout
  const lastEmittedRef = React.useRef<string>('');

  useEffect(() => {
    if (onLayoutChange) {
      let nextState;
      if (!isOpen || isMinimized) {
        nextState = { isOpen: false, isMinimized: !!isMinimized, width: 0, rightOffset: 0 };
      } else {
        const currentW = sizeMode === 'full' ? window.innerWidth : (winPos ? winPos.width : 520);
        const rightOff = sizeMode === 'full' 
          ? 0 
          : winPos 
            ? Math.max(0, window.innerWidth - winPos.left) 
            : 540;
        nextState = { isOpen: true, isMinimized: false, width: currentW, rightOffset: rightOff };
      }
      
      const nextStateStr = JSON.stringify(nextState);
      if (lastEmittedRef.current !== nextStateStr) {
        lastEmittedRef.current = nextStateStr;
        onLayoutChange(nextState);
      }
    }
  }, [isOpen, isMinimized, sizeMode, winPos, onLayoutChange]);

  // Dragging the header bar (moves the window)
  const handleHeaderDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (sizeMode === 'full' || !winPos) return;
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

  // Resizing edges/corners: ONLY the dragged edge/corner moves!
  const handleResizeStart = (
    e: React.MouseEvent | React.TouchEvent,
    direction: 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  ) => {
    if (sizeMode === 'full' || !winPos) return;
    e.preventDefault();
    e.stopPropagation();

    const startX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const startY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const { left: startLeft, top: startTop, width: startW, height: startH } = winPos;

    const minW = 320;
    const minH = 280;

    const onMove = (moveEvent: MouseEvent | TouchEvent) => {
      const currentX = 'touches' in moveEvent ? moveEvent.touches[0].clientX : moveEvent.clientX;
      const currentY = 'touches' in moveEvent ? moveEvent.touches[0].clientY : moveEvent.clientY;

      const deltaX = currentX - startX;
      const deltaY = currentY - startY;

      let newLeft = startLeft;
      let newTop = startTop;
      let newWidth = startW;
      let newHeight = startH;

      // RIGHT EDGE: Left stays fixed, width changes
      if (direction.includes('right')) {
        newWidth = Math.max(minW, Math.min(window.innerWidth - startLeft - 10, startW + deltaX));
      } 
      // LEFT EDGE: Right stays fixed at (startLeft + startW), left moves & width changes
      else if (direction.includes('left')) {
        const maxDeltaX = startW - minW;
        const validDeltaX = Math.min(maxDeltaX, Math.max(-startLeft + 10, deltaX));
        newLeft = startLeft + validDeltaX;
        newWidth = startW - validDeltaX;
      }

      // BOTTOM EDGE: Top stays fixed, height changes
      if (direction.includes('bottom')) {
        newHeight = Math.max(minH, Math.min(window.innerHeight - startTop - 10, startH + deltaY));
      } 
      // TOP EDGE: Bottom stays fixed at (startTop + startH), top moves & height changes
      else if (direction.includes('top')) {
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

  // Active note editor state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Sync and subscribe to notes
  useEffect(() => {
    setNotes(getUserNotes(userId));
    syncNotesFromFirestore(userId).then(updated => {
      setNotes(updated);
    });

    const unsubscribe = subscribeToUserNotes(() => {
      setNotes(getUserNotes(userId));
    });

    return () => unsubscribe();
  }, [userId]);

  // When activeNoteId changes or notes update, keep active note synced
  const activeNote = useMemo(() => {
    return notes.find(n => n.id === activeNoteId);
  }, [notes, activeNoteId]);

  useEffect(() => {
    if (activeNote) {
      setTitle(activeNote.title);
      setContent(activeNote.content);
    } else if (notes.length > 0 && !activeNoteId) {
      // Don't auto-select to avoid overwhelming, unless user clicks
    }
  }, [activeNoteId]);

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

  const toggleSizeMode = () => {
    if (sizeMode === 'standard') setSizeMode('full');
    else setSizeMode('standard');
  };

  return (
    <>
      {/* FLOATING ACTION BUTTON */}
      {!isMinimized && (
        <motion.div 
          className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <button
            onClick={() => {
              setIsOpen(prev => !prev);
              setIsMinimized(false);
            }}
            className="group relative flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-slate-900 via-[#1A2533] to-slate-900 hover:from-amber-950 hover:to-slate-900 text-amber-300 dark:text-amber-300 rounded-full shadow-2xl border border-amber-500/40 hover:border-amber-400 transition-all duration-300 cursor-pointer active:scale-95"
            title="Mis Notas de la Cuenta (Guardadas automáticamente)"
          >
            <div className="relative">
              <Edit3 size={20} className="text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
              {notes.length > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black flex items-center justify-center border border-slate-900 shadow-sm animate-pulse">
                  {notes.length}
                </span>
              )}
            </div>
            <span className="hidden sm:inline font-sans text-xs font-bold uppercase tracking-wider text-amber-200">
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
            className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-[60] bg-gradient-to-r from-slate-900 via-[#1A2533] to-slate-900 text-white border-2 border-amber-500/60 rounded-2xl shadow-2xl p-3 flex items-center gap-3.5 max-w-xs sm:max-w-md font-sans"
          >
            <div className="p-2 bg-amber-500/20 border border-amber-500/40 text-amber-300 rounded-xl shrink-0">
              <Edit3 size={18} className="animate-pulse" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-200 truncate">
                  {activeNote ? activeNote.title : 'Notas'}
                </span>
                <span className="text-[9px] bg-amber-500/30 text-amber-300 font-mono px-1.5 py-0.2 rounded font-bold uppercase">
                  Minimizado
                </span>
              </div>
              <p className="text-[11px] text-slate-300 truncate mt-0.5">
                {activeNote ? (activeNote.content || 'Sin contenido aún') : `${notes.length} notas guardadas en cuenta`}
              </p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => setIsMinimized(false)}
                className="px-2.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 text-xs shadow-md"
                title="Restaurar / Abrir cuadro de nota"
              >
                <ChevronUp size={16} />
                <span className="hidden sm:inline">Restaurar</span>
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsMinimized(false);
                }}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                title="Cerrar notas"
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING DRAGGABLE AND RESIZABLE NOTEBOOK WINDOW */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            style={
              sizeMode === 'full'
                ? undefined
                : {
                    left: winPos ? `${winPos.left}px` : undefined,
                    top: winPos ? `${winPos.top}px` : undefined,
                    width: winPos ? `${winPos.width}px` : undefined,
                    height: winPos ? `${winPos.height}px` : undefined,
                  }
            }
            className={`fixed z-[60] bg-white dark:bg-slate-900 shadow-2xl border-2 border-amber-500/40 dark:border-amber-500/30 rounded-2xl flex flex-col font-sans backdrop-blur-md ${
              sizeMode === 'full' 
                ? 'inset-2 sm:inset-6 w-auto h-auto rounded-xl' 
                : !winPos ? 'bottom-16 right-2 sm:right-6 w-[520px] max-w-[95vw] h-[540px] max-h-[90vh]' : ''
            }`}
            onClick={e => e.stopPropagation()}
          >
            {/* 8-DIRECTION RESIZABLE HANDLES */}
            {sizeMode !== 'full' && (
              <>
                {/* Top Edge */}
                <div
                  onMouseDown={e => handleResizeStart(e, 'top')}
                  onTouchStart={e => handleResizeStart(e, 'top')}
                  className="absolute -top-1.5 left-4 right-4 h-3 cursor-ns-resize z-50 hover:bg-amber-400/50 active:bg-amber-500/70 transition-colors group rounded-full touch-none"
                  title="Arrastrar arriba para mover solo el borde superior"
                />
                {/* Bottom Edge */}
                <div
                  onMouseDown={e => handleResizeStart(e, 'bottom')}
                  onTouchStart={e => handleResizeStart(e, 'bottom')}
                  className="absolute -bottom-1.5 left-4 right-4 h-3 cursor-ns-resize z-50 hover:bg-amber-400/50 active:bg-amber-500/70 transition-colors group rounded-full touch-none"
                  title="Arrastrar abajo para mover solo el borde inferior"
                />
                {/* Left Edge */}
                <div
                  onMouseDown={e => handleResizeStart(e, 'left')}
                  onTouchStart={e => handleResizeStart(e, 'left')}
                  className="absolute top-4 bottom-4 -left-1.5 w-3 cursor-ew-resize z-50 hover:bg-amber-400/50 active:bg-amber-500/70 transition-colors group rounded-full touch-none"
                  title="Arrastrar izquierda para mover solo el borde izquierdo"
                />
                {/* Right Edge */}
                <div
                  onMouseDown={e => handleResizeStart(e, 'right')}
                  onTouchStart={e => handleResizeStart(e, 'right')}
                  className="absolute top-4 bottom-4 -right-1.5 w-3 cursor-ew-resize z-50 hover:bg-amber-400/50 active:bg-amber-500/70 transition-colors group rounded-full touch-none"
                  title="Arrastrar derecha para mover solo el borde derecho"
                />
                {/* Top-Left Corner */}
                <div
                  onMouseDown={e => handleResizeStart(e, 'top-left')}
                  onTouchStart={e => handleResizeStart(e, 'top-left')}
                  className="absolute -top-2 -left-2 w-5 h-5 cursor-nwse-resize z-50 border-t-2 border-l-2 border-amber-400/80 hover:bg-amber-400/60 rounded-tl-xl transition-all shadow-xs touch-none"
                  title="Agrandar desde esquina superior izquierda"
                />
                {/* Top-Right Corner */}
                <div
                  onMouseDown={e => handleResizeStart(e, 'top-right')}
                  onTouchStart={e => handleResizeStart(e, 'top-right')}
                  className="absolute -top-2 -right-2 w-5 h-5 cursor-nesw-resize z-50 border-t-2 border-r-2 border-amber-400/80 hover:bg-amber-400/60 rounded-tr-xl transition-all shadow-xs touch-none"
                  title="Agrandar desde esquina superior derecha"
                />
                {/* Bottom-Left Corner */}
                <div
                  onMouseDown={e => handleResizeStart(e, 'bottom-left')}
                  onTouchStart={e => handleResizeStart(e, 'bottom-left')}
                  className="absolute -bottom-2 -left-2 w-5 h-5 cursor-nesw-resize z-50 border-b-2 border-l-2 border-amber-400/80 hover:bg-amber-400/60 rounded-bl-xl transition-all shadow-xs touch-none"
                  title="Agrandar desde esquina inferior izquierda"
                />
                {/* Bottom-Right Corner */}
                <div
                  onMouseDown={e => handleResizeStart(e, 'bottom-right')}
                  onTouchStart={e => handleResizeStart(e, 'bottom-right')}
                  className="absolute -bottom-2 -right-2 w-5 h-5 cursor-nwse-resize z-50 border-b-2 border-r-2 border-amber-400/80 hover:bg-amber-400/60 rounded-br-xl transition-all shadow-xs touch-none"
                  title="Agrandar desde esquina inferior derecha"
                />
              </>
            )}

            {/* Header / Drag Bar */}
            <div 
              onMouseDown={handleHeaderDragStart}
              onTouchStart={handleHeaderDragStart}
              className="bg-gradient-to-r from-[#1A2533] via-slate-900 to-[#1A2533] text-white p-3 md:p-3.5 border-b border-slate-800 flex items-center justify-between shrink-0 select-none cursor-grab active:cursor-grabbing rounded-t-2xl touch-none"
              title="Haz clic y arrastra aquí para mover esta nota por la pantalla"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-1.5 bg-amber-500/20 text-amber-300 rounded-lg shrink-0 flex items-center gap-1 border border-amber-500/30">
                  <GripHorizontal size={18} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h3 className="font-serif font-bold text-sm md:text-base text-amber-200 truncate">
                      Notas
                    </h3>
                    <span className="text-[9px] bg-amber-400/20 text-amber-300 px-1.5 py-0.2 rounded-full border border-amber-400/30 font-mono font-bold hidden sm:inline">
                      ARRASTRABLE Y REAJUSTABLE
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 flex items-center gap-1 mt-0.5 truncate">
                    <User size={11} className="text-amber-400 shrink-0" />
                    <span className="truncate">Cuenta: <strong>{userName}</strong></span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0" onClick={e => e.stopPropagation()}>
                {/* Minimize Button */}
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-1.5 text-slate-300 hover:text-amber-300 hover:bg-slate-800/80 rounded-lg transition-colors cursor-pointer"
                  title="Minimizar a barra flotante"
                >
                  <Minus size={18} />
                </button>

                {/* Size Toggle Button */}
                <button
                  onClick={toggleSizeMode}
                  className="p-1.5 text-slate-300 hover:text-amber-300 hover:bg-slate-800/80 rounded-lg transition-colors cursor-pointer"
                  title={
                    sizeMode === 'standard'
                      ? 'Pantalla Completa'
                      : 'Restaurar Tamaño Flotante'
                  }
                >
                  {sizeMode === 'full' ? (
                    <Minimize2 size={18} />
                  ) : (
                    <Maximize2 size={18} />
                  )}
                </button>

                {/* Close Button */}
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsMinimized(false);
                  }}
                  className="p-1.5 text-slate-300 hover:text-white hover:bg-red-950/50 rounded-lg transition-colors cursor-pointer"
                  title="Cerrar notas"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0 bg-slate-50 dark:bg-slate-950">
              
              {/* Left/Top List Column */}
              <div className={`w-full md:w-56 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col shrink-0 ${
                activeNoteId && sizeMode === 'standard' ? 'hidden' : activeNoteId ? 'hidden md:flex' : 'flex'
              }`}>
                
                {/* Action Bar & Search */}
                <div className="p-3 border-b border-slate-200 dark:border-slate-800 space-y-2">
                  <button
                    onClick={handleCreateNew}
                    className="w-full py-2 px-3 bg-gradient-to-r from-[#7F1D1D] to-amber-900 hover:from-amber-800 hover:to-[#7F1D1D] text-white rounded-xl flex items-center justify-center gap-2 font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    <Plus size={16} />
                    <span>Crear Nueva Nota</span>
                  </button>

                  <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Buscar notas..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full pl-8 pr-3 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-800 dark:text-slate-100 outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Notes List */}
                <div className="flex-1 overflow-y-auto p-2 space-y-1.5 custom-scrollbar">
                  {filteredNotes.length === 0 ? (
                    <div className="text-center p-6 text-slate-400 dark:text-slate-500 text-xs font-sans">
                      {searchQuery ? 'No hay notas que coincidan.' : 'No tienes notas guardadas todavía en esta cuenta.'}
                    </div>
                  ) : (
                    filteredNotes.map(n => {
                      const isSelected = n.id === activeNoteId;
                      const formattedDate = new Date(n.updatedAt).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      });

                      return (
                        <button
                          key={n.id}
                          onClick={() => {
                            setActiveNoteId(n.id);
                            setTitle(n.title);
                            setContent(n.content);
                          }}
                          className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer flex flex-col gap-1 ${
                            isSelected
                              ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500/80 shadow-xs'
                              : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <h4 className={`text-xs font-bold truncate ${isSelected ? 'text-amber-900 dark:text-amber-200' : 'text-slate-800 dark:text-slate-200'}`}>
                              {n.title || 'Nota sin título'}
                            </h4>
                            {isSelected && (
                              <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                            {n.content || '(Nota vacía)'}
                          </p>
                          <div className="flex items-center justify-between gap-1 mt-0.5">
                            {n.lessonTitle ? (
                              <span className="inline-flex items-center gap-1 text-[9px] text-amber-700 dark:text-amber-300 font-medium bg-amber-100/70 dark:bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-300/50 dark:border-amber-800/50 truncate max-w-[140px]">
                                <BookOpen size={9} /> {n.lessonTitle}
                              </span>
                            ) : <span />}
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                              {formattedDate}
                            </span>
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Right / Main Editor View */}
              <div className={`flex-1 flex flex-col bg-white dark:bg-slate-900 ${!activeNoteId ? 'hidden md:flex' : 'flex'}`}>
                {activeNote ? (
                  <div className="flex-1 flex flex-col h-full overflow-hidden">
                    {/* Editor Header Bar */}
                    <div className="p-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 flex items-center justify-between gap-2">
                      <button
                        onClick={() => setActiveNoteId(null)}
                        className={`text-xs text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1 cursor-pointer ${
                          sizeMode === 'standard' ? 'flex' : 'md:hidden flex'
                        }`}
                      >
                        ← Ver Lista de Notas
                      </button>

                        <div className="flex items-center gap-2 ml-auto text-xs text-slate-400">
                          {isSaving ? (
                            <span className="text-amber-500 text-[11px] font-bold flex items-center gap-1 animate-pulse">
                              <Sparkles size={12} /> Guardando...
                            </span>
                          ) : (
                            <span className="text-emerald-500 text-[11px] font-bold flex items-center gap-1">
                              <Check size={12} /> Guardado en Cuenta
                            </span>
                          )}

                          <button
                            onClick={() => handleCopy(`${title}\n\n${content}`, activeNote.id)}
                            className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                            title="Copiar contenido"
                          >
                            {copiedId === activeNote.id ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                          </button>

                          {isDeletingId === activeNote.id ? (
                            <div className="flex items-center gap-1 bg-red-500/10 border border-red-500/30 p-1 rounded-lg">
                              <span className="text-[10px] text-red-400 font-bold px-1">¿Eliminar?</span>
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

                      {/* Editor Input Fields */}
                      <div className="p-4 md:p-6 flex-1 flex flex-col gap-3 overflow-y-auto custom-scrollbar">
                        <input
                          type="text"
                          value={title}
                          onChange={e => {
                            setTitle(e.target.value);
                            handleAutoSave(e.target.value, content);
                          }}
                          placeholder="Título de la nota..."
                          className="w-full text-lg md:text-xl font-bold font-serif text-slate-900 dark:text-slate-100 bg-transparent outline-none border-b border-transparent focus:border-amber-500/50 pb-1"
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
                              className="group flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-200 bg-amber-100/90 dark:bg-amber-950/70 hover:bg-amber-200 dark:hover:bg-amber-900 border border-amber-300 dark:border-amber-700/80 px-3 py-1.5 rounded-lg w-fit transition-all cursor-pointer shadow-xs active:scale-95 hover:shadow-md"
                              title="Haz clic aquí para ir directamente a esta clase"
                            >
                              <BookOpen size={13} className="text-amber-700 dark:text-amber-400 group-hover:scale-110 transition-transform shrink-0" />
                              <span className="truncate max-w-[280px] sm:max-w-[360px]">
                                Vinculado a: <span className="underline decoration-amber-500/60 underline-offset-2 group-hover:text-amber-950 dark:group-hover:text-amber-100">{linkedTitle || 'Ver clase'}</span>
                              </span>
                              <ExternalLink size={12} className="text-amber-600 dark:text-amber-400 opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 ml-0.5" />
                            </button>
                          );
                        })()}

                        <textarea
                          value={content}
                          onChange={e => {
                            setContent(e.target.value);
                            handleAutoSave(title, e.target.value);
                          }}
                          placeholder="Escriba aquí sus anotaciones, reflexiones exegéticas, pasajes bíblicos o puntos clave..."
                          className="w-full flex-1 min-h-[250px] font-sans text-sm md:text-base text-slate-800 dark:text-slate-200 bg-transparent outline-none resize-none leading-relaxed custom-scrollbar placeholder:text-slate-400 dark:placeholder:text-slate-600"
                        />
                      </div>

                      {/* Footer Info */}
                      <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-[11px] text-slate-400 flex items-center justify-between">
                        <span>{content.length} caracteres • {content.trim() ? content.trim().split(/\s+/).length : 0} palabras</span>
                        <span>Guardado local y en nube por cuenta</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400 font-sans">
                      <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-amber-500 mb-4 shadow-inner">
                        <FileText size={32} />
                      </div>
                      <h4 className="font-serif font-bold text-lg text-slate-700 dark:text-slate-200 mb-1">
                        Seleccione o cree una nota
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mb-4">
                        Sus notas pertenecen a la cuenta <strong>{userName}</strong> y se sincronizan permanentemente.
                      </p>
                      <button
                        onClick={handleCreateNew}
                        className="px-4 py-2 bg-[#1A2533] text-amber-300 rounded-xl font-bold text-xs flex items-center gap-2 hover:bg-[#2C3E50] transition-all shadow-md cursor-pointer"
                      >
                        <Plus size={16} /> Crear mi primera nota
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
