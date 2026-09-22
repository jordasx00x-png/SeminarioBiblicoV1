import React, { useState, useMemo } from 'react';
import { 
  X, 
  Search, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  Highlighter, 
  FileText, 
  Calendar, 
  Tag, 
  Check, 
  BookOpen
} from 'lucide-react';
import { 
  BibleHighlightNote, 
  HighlightColor, 
  getColorClasses, 
  deleteBibleNote, 
  saveBibleNote 
} from '../utils/bibleNotesStorage';
import { findBibleBook } from '../data/completeBibleData';

interface BibleNotesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notes: BibleHighlightNote[];
  onNavigateToVerse: (bookId: string, chapter: number, verse: number) => void;
}

const COLOR_OPTIONS: { id: HighlightColor | 'ALL'; label: string; bgClass: string }[] = [
  { id: 'ALL', label: 'Todos', bgClass: 'bg-stone-200 dark:bg-zinc-700 text-stone-800 dark:text-stone-200' },
  { id: 'yellow', label: 'Amarillo', bgClass: 'bg-amber-400 text-amber-950' },
  { id: 'green', label: 'Verde', bgClass: 'bg-emerald-500 text-white' },
  { id: 'blue', label: 'Azul', bgClass: 'bg-sky-500 text-white' },
  { id: 'pink', label: 'Rosa', bgClass: 'bg-rose-400 text-white' },
  { id: 'purple', label: 'Morado', bgClass: 'bg-purple-500 text-white' },
  { id: 'orange', label: 'Naranja', bgClass: 'bg-orange-500 text-white' },
];

export function BibleNotesDrawer({
  isOpen,
  onClose,
  notes,
  onNavigateToVerse
}: BibleNotesDrawerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedColorFilter, setSelectedColorFilter] = useState<HighlightColor | 'ALL'>('ALL');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');

  const filteredNotes = useMemo(() => {
    return notes.filter(n => {
      const matchesColor = selectedColorFilter === 'ALL' || n.color === selectedColorFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        n.bookName.toLowerCase().includes(q) ||
        `${n.chapter}:${n.verse}`.includes(q) ||
        (n.noteText || '').toLowerCase().includes(q) ||
        (n.selectedText || '').toLowerCase().includes(q);
      
      return matchesColor && matchesSearch;
    }).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }, [notes, searchQuery, selectedColorFilter]);

  if (!isOpen) return null;

  const handleStartEdit = (note: BibleHighlightNote) => {
    setEditingNoteId(note.id);
    setEditingText(note.noteText || '');
  };

  const handleSaveEdit = (note: BibleHighlightNote) => {
    saveBibleNote({
      id: note.id,
      bookId: note.bookId,
      bookName: note.bookName,
      chapter: note.chapter,
      verse: note.verse,
      color: note.color,
      selectedText: note.selectedText,
      noteText: editingText
    });
    setEditingNoteId(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Eliminar este subrayado / nota personal?')) {
      deleteBibleNote(id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-md flex justify-end animate-in fade-in duration-300">
      <div 
        className="w-full max-w-xl bg-white dark:bg-zinc-950 h-full flex flex-col shadow-[0_0_60px_rgba(0,0,0,0.5)] border-l border-stone-200 dark:border-stone-800 animate-in slide-in-from-right duration-300 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header: Institutional Night */}
        <div className="bg-white dark:bg-stone-900 p-6 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#7F1D1D]" />
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded bg-[#FAF9F5] dark:bg-stone-800 flex items-center justify-center border border-stone-200 dark:border-stone-700 shadow-sm shrink-0">
              <Highlighter className="w-5 h-5 text-[#7F1D1D] dark:text-amber-500" strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-sm font-serif font-black text-[#1A2533] dark:text-stone-100 uppercase tracking-tight flex items-center gap-2">
                <span>Mis Anotaciones</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#7F1D1D] text-white font-mono">
                  {notes.length}
                </span>
              </h2>
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-0.5">
                Archivo de Estudio Personal
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-[#7F1D1D] hover:bg-stone-50 dark:hover:bg-stone-800 rounded transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters and Search: Paper Style */}
        <div className="p-6 bg-[#FAF9F5] dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input 
              type="text"
              placeholder="Buscar en el Archivo de Notas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-white dark:bg-zinc-950 border border-stone-300 dark:border-stone-700 rounded focus:outline-none focus:border-[#7F1D1D] transition-all font-sans"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
            <span className="text-[9px] font-black text-stone-400 uppercase tracking-[0.2em] mr-2">Filtrar:</span>
            {COLOR_OPTIONS.map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedColorFilter(c.id)}
                className={`px-3 py-1.5 rounded text-[10px] font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap border ${
                  selectedColorFilter === c.id 
                    ? 'bg-[#7F1D1D] text-white border-[#7F1D1D] shadow-md' 
                    : 'bg-white dark:bg-zinc-800 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-50'
                }`}
              >
                <span className={`w-2 h-2 rounded-full border border-black/10 ${c.bgClass}`}></span>
                <span className="uppercase tracking-widest">{c.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Notes List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-white dark:bg-zinc-950">
          {filteredNotes.length === 0 ? (
            <div className="text-center py-20 px-4">
              <div className="w-16 h-16 rounded bg-[#FAF9F5] dark:bg-stone-900 text-stone-200 dark:text-stone-800 mx-auto flex items-center justify-center mb-6 border border-stone-100 dark:border-stone-800 shadow-inner">
                <FileText className="w-8 h-8" strokeWidth={1} />
              </div>
              <h4 className="text-sm font-serif font-black text-[#1A2533] dark:text-stone-100 uppercase tracking-tight">Archivo Vacío</h4>
              <p className="text-[10px] text-stone-400 uppercase tracking-[0.2em] mt-3 max-w-xs mx-auto font-bold">
                {notes.length === 0 
                  ? 'No se han registrado anotaciones académicas en este curso.'
                  : 'No se encontraron registros que coincidan con sus criterios.'}
              </p>
            </div>
          ) : (
            filteredNotes.map(note => {
              const colorInfo = getColorClasses(note.color);
              const isEditing = editingNoteId === note.id;

              return (
                <div 
                  key={note.id}
                  className="group p-5 rounded border border-stone-200 dark:border-stone-800 bg-white dark:bg-zinc-900 shadow-sm transition-all relative overflow-hidden"
                >
                  <div className={`absolute top-0 left-0 w-1 h-full ${colorInfo.dot.replace('bg-', 'bg-')}`} style={{ backgroundColor: note.color === 'yellow' ? '#f59e0b' : note.color === 'green' ? '#10b981' : note.color === 'blue' ? '#0ea5e9' : note.color === 'pink' ? '#f43f5e' : note.color === 'purple' ? '#8b5cf6' : note.color === 'orange' ? '#f97316' : '#7F1D1D' }} />
                  
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={() => {
                        onNavigateToVerse(note.bookId, note.chapter, note.verse);
                        onClose();
                      }}
                      className="font-serif font-black text-sm text-[#7F1D1D] dark:text-amber-400 hover:text-black dark:hover:text-white transition-colors flex items-center gap-2 cursor-pointer uppercase tracking-tight"
                    >
                      <BookOpen size={16} strokeWidth={1.5} className="text-stone-400" />
                      <span>{note.bookName} {note.chapter}:{note.verse}</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDelete(note.id)}
                        className="p-1.5 text-stone-300 hover:text-[#7F1D1D] hover:bg-stone-50 dark:hover:bg-stone-800 rounded transition-colors cursor-pointer"
                        title="Eliminar"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Highlighted text fragment */}
                  {note.selectedText && (
                    <div className="px-4 py-3 bg-[#FAF9F5] dark:bg-stone-800 border-l-2 border-stone-200 dark:border-stone-700 text-xs italic font-serif text-[#1A2533] dark:text-stone-200 mb-4 rounded-r shadow-inner">
                      «{note.selectedText}»
                    </div>
                  )}

                  {/* Note Content */}
                  {isEditing ? (
                    <div className="space-y-3">
                      <textarea
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        placeholder="Redacte su comentario académico..."
                        rows={3}
                        className="w-full p-3 text-xs bg-white dark:bg-zinc-800 border border-stone-300 dark:border-stone-700 rounded focus:outline-none focus:border-[#7F1D1D] dark:text-white font-sans leading-relaxed"
                        autoFocus
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingNoteId(null)}
                          className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-stone-500 hover:text-black transition-colors"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={() => handleSaveEdit(note)}
                          className="px-4 py-1.5 bg-[#7F1D1D] text-white text-[10px] font-black uppercase tracking-widest rounded shadow-md"
                        >
                          Guardar Nota
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      {note.noteText ? (
                        <div className="text-xs text-stone-600 dark:text-stone-300 bg-stone-50/50 dark:bg-zinc-800/40 p-4 rounded border border-stone-100 dark:border-stone-800 font-sans leading-relaxed whitespace-pre-wrap">
                          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#7F1D1D] block mb-2 opacity-70">Nota de Estudio:</span>
                          {note.noteText}
                        </div>
                      ) : (
                        <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest italic py-2">
                          (Sin anotaciones adicionales)
                        </div>
                      )}
                      
                      <button
                        onClick={() => handleStartEdit(note)}
                        className="mt-3 text-[10px] font-black text-[#7F1D1D] dark:text-amber-500 uppercase tracking-[0.2em] hover:text-black dark:hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Edit3 size={12} />
                        <span>{note.noteText ? 'Editar Anotación' : 'Añadir Anotación'}</span>
                      </button>
                    </div>
                  )}

                  {/* Date footer */}
                  <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-stone-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={12} className="opacity-50" />
                      <span>{new Date(note.updatedAt).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                    <span className="opacity-50">Seminario Digital</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
