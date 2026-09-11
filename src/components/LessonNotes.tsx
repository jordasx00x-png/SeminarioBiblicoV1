import React, { useState, useEffect } from 'react';
import { StickyNote, Save, CheckCircle, RotateCcw } from 'lucide-react';
import { safeStorage } from '../utils/safeStorage';

interface LessonNotesProps {
  lessonId: string;
  courseId: string;
}

export function LessonNotes({ lessonId, courseId }: LessonNotesProps) {
  const [note, setNote] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const storageKey = `notes_${courseId}_${lessonId}`;

  useEffect(() => {
    const savedNote = safeStorage.getItem(storageKey);
    if (savedNote) {
      setNote(savedNote);
    } else {
      setNote('');
    }
  }, [lessonId, courseId, storageKey]);

  const handleSave = () => {
    setIsSaving(true);
    safeStorage.setItem(storageKey, note);
    setLastSaved(new Date());
    
    // Aesthetic feedback delay
    setTimeout(() => {
      setIsSaving(false);
    }, 600);
  };

  const handleReset = () => {
    setNote('');
    safeStorage.removeItem(storageKey);
    setLastSaved(null);
  };

  return (
    <section className="bg-[#FAF9F6] border border-[#E0D7C6] rounded-xl overflow-hidden shadow-sm flex flex-col font-sans">
      <div className="bg-white border-b border-[#E0D7C6] px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <StickyNote size={18} className="text-[#1A2533]" />
          <h3 className="text-sm font-bold text-[#1A2533] uppercase tracking-wider">Reflexiones Teológicas</h3>
        </div>
        <div className="flex items-center gap-4">
          {lastSaved && !isSaving && (
            <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-tight flex items-center gap-1 animate-in fade-in duration-300">
              <CheckCircle size={10} /> Guardado
            </span>
          )}
          <button 
            onClick={handleReset}
            className="text-gray-400 hover:text-red-600 transition-colors"
            title="Borrar nota"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      <div className="p-5">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Escribe aquí tus reflexiones, dudas o lo que Dios está hablando a tu vida a través de esta lección..."
          className="w-full min-h-[160px] bg-white border border-[#F0E6D2] rounded-lg p-4 text-sm text-[#2C2C2C] leading-relaxed focus:ring-1 focus:ring-[#1A2533] focus:border-[#1A2533] outline-none transition-all placeholder:text-gray-400 placeholder:italic resize-none font-serif"
        />
        
        <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-[10px] text-gray-500 italic max-w-xs leading-tight">
            * Tus notas se guardan localmente en este dispositivo y son privadas.
          </p>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded text-xs font-bold uppercase tracking-widest transition-all ${
              isSaving 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-[#1A2533] text-white hover:bg-black shadow-sm hover:shadow-md'
            }`}
          >
            {isSaving ? (
              <span className="animate-pulse">Guardando...</span>
            ) : (
              <>
                <Save size={14} />
                Guardar Reflexión
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
