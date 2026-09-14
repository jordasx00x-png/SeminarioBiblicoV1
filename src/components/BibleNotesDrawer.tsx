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
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl bg-white dark:bg-zinc-900 h-full flex flex-col shadow-2xl border-l border-stone-200 dark:border-zinc-800 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#1A2533] text-white p-4 border-b border-[#2C3E50] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300">
              <Highlighter className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold font-serif text-white flex items-center gap-2">
                <span>Mis Notas y Subrayados</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">
                  {notes.length}
                </span>
              </h2>
              <p className="text-[11px] text-gray-300">
                Resaltados y anotaciones personales en la Biblia
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters and Search */}
        <div className="p-4 bg-[#FDFBF7] dark:bg-zinc-950 border-b border-stone-200 dark:border-zinc-800 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
            <input 
              type="text"
              placeholder="Buscar en mis notas, versículos o libros..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white dark:bg-zinc-900 border border-stone-300 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 dark:text-white"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
            {COLOR_OPTIONS.map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedColorFilter(c.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap border ${
                  selectedColorFilter === c.id 
                    ? 'ring-2 ring-amber-500 border-amber-500 shadow-xs' 
                    : 'border-stone-200 dark:border-zinc-700 opacity-80 hover:opacity-100'
                }`}
              >
                <span className={`w-2.5 h-2.5 rounded-full ${c.bgClass}`}></span>
                <span className="text-stone-800 dark:text-stone-200">{c.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Notes List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar bg-stone-50/50 dark:bg-zinc-950">
          {filteredNotes.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-12 h-12 rounded-full bg-stone-200 dark:bg-zinc-800 text-gray-400 mx-auto flex items-center justify-center mb-3">
                <FileText className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
                {notes.length === 0 ? 'Aún no tienes notas ni subrayados' : 'No se encontraron resultados'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
                {notes.length === 0 
                  ? 'Haz clic en cualquier versículo de la Biblia para subrayar texto y agregar tus reflexiones de estudio.'
                  : 'Prueba cambiar los filtros de búsqueda o el color seleccionado.'}
              </p>
            </div>
          ) : (
            filteredNotes.map(note => {
              const colorInfo = getColorClasses(note.color);
              const isEditing = editingNoteId === note.id;

              return (
                <div 
                  key={note.id}
                  className={`p-4 rounded-xl border bg-white dark:bg-zinc-900 shadow-xs transition-all space-y-3 ${colorInfo.border}`}
                >
                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => {
                        onNavigateToVerse(note.bookId, note.chapter, note.verse);
                        onClose();
                      }}
                      className="font-serif font-bold text-sm text-[#7F1D1D] dark:text-amber-400 hover:underline flex items-center gap-1.5 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                      <span>{note.bookName} {note.chapter}:{note.verse}</span>
                      <ExternalLink className="w-3 h-3 text-gray-400" />
                    </button>

                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${colorInfo.badge}`}>
                        {note.color.toUpperCase()}
                      </span>
                      <button
                        onClick={() => handleDelete(note.id)}
                        className="p-1 hover:bg-red-50 dark:hover:bg-red-950/50 text-gray-400 hover:text-red-600 rounded-md transition-colors cursor-pointer"
                        title="Eliminar"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Highlighted text fragment or verse */}
                  {note.selectedText && (
                    <div className={`p-2.5 rounded-lg text-xs italic font-serif ${colorInfo.bg}`}>
                      «{note.selectedText}»
                    </div>
                  )}

                  {/* Note Content */}
                  {isEditing ? (
                    <div className="space-y-2 pt-1">
                      <textarea
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        placeholder="Escribe tu reflexión o comentario personal..."
                        rows={3}
                        className="w-full p-2.5 text-xs bg-stone-50 dark:bg-zinc-800 border border-stone-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 dark:text-white font-sans"
                        autoFocus
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingNoteId(null)}
                          className="px-2.5 py-1 text-xs rounded-lg border border-stone-300 dark:border-zinc-700 text-gray-600 dark:text-gray-300 hover:bg-stone-100"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={() => handleSaveEdit(note)}
                          className="px-3 py-1 text-xs rounded-lg bg-[#7F1D1D] text-white font-bold flex items-center gap-1"
                        >
                          <Check className="w-3 h-3" />
                          <span>Guardar</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="group relative">
                      {note.noteText ? (
                        <div className="text-xs text-gray-800 dark:text-gray-200 bg-stone-50 dark:bg-zinc-800/60 p-2.5 rounded-lg border border-stone-200 dark:border-zinc-700/60 font-sans whitespace-pre-wrap">
                          <span className="font-bold text-[10px] uppercase text-amber-600 dark:text-amber-400 block mb-1">Nota Personal:</span>
                          {note.noteText}
                        </div>
                      ) : (
                        <div className="text-[11px] text-gray-400 italic">
                          (Sin nota de texto adjunta)
                        </div>
                      )}
                      
                      <button
                        onClick={() => handleStartEdit(note)}
                        className="mt-2 text-[11px] font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>{note.noteText ? 'Editar Nota' : 'Añadir Nota'}</span>
                      </button>
                    </div>
                  )}

                  {/* Date footer */}
                  <div className="text-[10px] text-gray-400 flex items-center gap-1 pt-1 border-t border-stone-100 dark:border-zinc-800">
                    <Calendar className="w-3 h-3" />
                    <span>Actualizado: {new Date(note.updatedAt).toLocaleDateString()}</span>
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
