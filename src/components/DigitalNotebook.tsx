import React, { useState, useEffect } from 'react';
import { Save, FileText, Trash2, Edit3, Plus, Search, Check, X as CloseIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { safeStorage } from '../utils/safeStorage';

interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: number;
}

export function DigitalNotebook({ isModal = false }: { isModal?: boolean }) {
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = safeStorage.getItem('digital_notebook_notes');
    if (!saved) return [];
    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  });
  
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  
  const activeNote = notes.find(n => n.id === activeNoteId);

  useEffect(() => {
    safeStorage.setItem('digital_notebook_notes', JSON.stringify(notes));
  }, [notes]);

  const handleCreateNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Nueva Notación',
      content: '',
      updatedAt: Date.now()
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
  };

  const handleUpdateNote = (id: string, updates: Partial<Note>) => {
    setNotes(notes.map(n => 
      n.id === id ? { ...n, ...updates, updatedAt: Date.now() } : n
    ));
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
    if (activeNoteId === id) {
      setActiveNoteId(null);
    }
    setIsDeleting(null);
  };

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    n.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`flex flex-col md:flex-row gap-0 md:gap-6 bg-white animate-in fade-in duration-500 ${isModal ? 'h-[75vh] w-full pt-4 md:pt-0 pb-4 pr-4' : 'h-[600px] border border-[#E0D7C6] rounded-xl overflow-hidden shadow-sm'}`}>
      
      {/* Sidebar - Lista de Notas */}
      <div className={`w-full md:w-80 flex flex-col border-r border-[#E0D7C6] bg-gray-50/50 ${activeNoteId ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-4 border-b border-[#E0D7C6]">
          <button 
            onClick={handleCreateNote}
            className="w-full py-2.5 px-4 bg-[#1A2533] text-white rounded-lg flex items-center justify-center gap-2 hover:bg-[#2C3E50] transition-colors font-sans text-sm font-bold shadow-sm"
          >
            <Plus size={16} /> Crear Nota Real
          </button>
        </div>
        
        <div className="p-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar notas..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white border border-[#E0D7C6] rounded outline-none focus:border-[#7F1D1D] font-sans text-sm"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
          {filteredNotes.length === 0 ? (
            <div className="text-center p-6 text-gray-400 font-sans text-sm">
              {searchQuery ? 'No se encontraron notas.' : 'Aún no tienes notas. ¡Crea una nueva!'}
            </div>
          ) : (
            filteredNotes.map(note => (
              <button
                key={note.id}
                onClick={() => setActiveNoteId(note.id)}
                className={`w-full text-left p-3 rounded-lg transition-colors border ${
                  activeNoteId === note.id 
                    ? 'bg-white border-[#7F1D1D]/20 shadow-sm' 
                    : 'bg-transparent border-transparent hover:bg-gray-100'
                }`}
              >
                <div className="font-bold text-[#1A2533] truncate text-sm mb-1">{note.title}</div>
                <div className="text-xs text-gray-500 truncate font-sans">
                  {note.content.replace(/<[^>]+>/g, '').substring(0, 50) || 'Sin contenido...'}
                </div>
                <div className="text-[10px] text-gray-400 mt-2 font-sans">
                  {new Date(note.updatedAt).toLocaleDateString()}
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Área del Editor */}
      <div className={`flex-1 flex flex-col bg-white ${!activeNoteId ? 'hidden md:flex' : 'flex'}`}>
        {activeNote ? (
          <div className="flex-1 flex flex-col h-full">
            <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E0D7C6] gap-4">
              <input 
                type="text" 
                value={activeNote.title}
                onChange={e => handleUpdateNote(activeNote.id, { title: e.target.value })}
                className="text-xl md:text-2xl font-bold font-serif text-[#1A2533] bg-transparent outline-none border-none placeholder:text-gray-300 w-full"
                placeholder="Título de la nota..."
              />
              <div className="flex items-center gap-2 shrink-0">
                <button 
                  onClick={() => setActiveNoteId(null)}
                  className="md:hidden px-3 py-1.5 text-xs font-bold font-sans text-gray-500 hover:text-[#1A2533] border border-[#E0D7C6] rounded hover:bg-gray-50 transition-colors"
                >
                  Volver a lista
                </button>
                
                <AnimatePresence mode="wait">
                  {isDeleting === activeNote.id ? (
                    <motion.div 
                      key="confirm-delete"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-lg p-1"
                    >
                      <span className="text-[10px] font-bold text-red-600 uppercase tracking-tighter px-2">¿Eliminar?</span>
                      <button 
                        onClick={() => handleDeleteNote(activeNote.id)}
                        className="p-1.5 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                        title="Confirmar eliminar"
                      >
                        <Check size={14} />
                      </button>
                      <button 
                        onClick={() => setIsDeleting(null)}
                        className="p-1.5 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 transition-colors"
                        title="Cancelar"
                      >
                        <CloseIcon size={14} />
                      </button>
                    </motion.div>
                  ) : (
                    <motion.button 
                      key="delete-trigger"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setIsDeleting(activeNote.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 transition-colors bg-white hover:bg-red-50 rounded"
                      title="Eliminar nota"
                    >
                      <Trash2 size={18} />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            <div className="flex-1 p-6 overflow-y-auto">
              <textarea 
                value={activeNote.content}
                onChange={e => handleUpdateNote(activeNote.id, { content: e.target.value })}
                placeholder="Escribe tus apuntes, reflexiones o respuestas de estudio aquí..."
                className="w-full h-full resize-none bg-transparent outline-none border-none text-[#2C2C2C] font-sans text-base md:text-lg leading-relaxed custom-scrollbar"
              />
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-[#E0D7C6]">
              <Edit3 size={32} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-[#1A2533] mb-2 font-serif">Cuaderno Digital</h3>
            <p className="font-sans text-sm max-w-sm">
              Selecciona una nota de la lista para leerla o editarla, o crea una nueva para guardar tus apuntes.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
