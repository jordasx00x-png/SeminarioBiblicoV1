import React, { useState, useEffect } from 'react';
import { Lesson } from '../types';
import { generateLessonNotebookActivities, NotebookItem } from '../utils/notebookActivitiesGenerator';
import { 
  BookOpen, 
  PenTool, 
  CheckSquare, 
  Square, 
  Sparkles, 
  Copy, 
  Check, 
  HelpCircle, 
  Edit3, 
  FileText,
  ListChecks,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface NotebookActivitiesProps {
  lesson: Lesson;
  courseTitle?: string;
  onOpenNotesWidget?: () => void;
}

export function NotebookActivities({ lesson, courseTitle, onOpenNotesWidget }: NotebookActivitiesProps) {
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  // Load saved notebook checks for this lesson
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`notebook_checks_${lesson.id}`);
      if (saved) {
        setCompletedItems(JSON.parse(saved));
      } else {
        setCompletedItems({});
      }
    } catch {
      setCompletedItems({});
    }
  }, [lesson.id]);

  const toggleCheck = (itemId: string) => {
    setCompletedItems(prev => {
      const next = { ...prev, [itemId]: !prev[itemId] };
      try {
        localStorage.setItem(`notebook_checks_${lesson.id}`, JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  // Generate unique, tailored notebook activities specifically for this lesson
  const notebookItems: NotebookItem[] = React.useMemo(() => {
    return generateLessonNotebookActivities(lesson);
  }, [lesson]);

  const completedCount = notebookItems.filter(item => completedItems[item.id]).length;
  const progressPercent = Math.round((completedCount / notebookItems.length) * 100);

  const handleCopyGuide = () => {
    const text = `✏️ GUÍA DE CUADERNO DE APUNTES - ${lesson.title}\n` +
      `Curso: ${courseTitle || ''}\n` +
      `Pasaje: ${lesson.baseVerse?.reference || 'N/A'}\n\n` +
      notebookItems.map((item, index) => 
        `${index + 1}. [${item.category}] ${item.title}\n   ${item.instruction}\n   💡 ${item.hint || ''}\n`
      ).join('\n') +
      `\n--- Realizado a mano en libreta de estudio ---`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-gradient-to-br from-amber-50/90 via-[#FAF8F5] to-amber-100/40 dark:from-slate-900 dark:via-slate-900/90 dark:to-amber-950/30 border-2 border-amber-300/80 dark:border-amber-700/60 rounded-2xl p-5 md:p-7 shadow-md font-sans my-8 relative overflow-hidden">
      {/* Decorative notebook binding side margin */}
      <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-amber-500/80 dark:bg-amber-600/70" />
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-amber-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-md shrink-0 border border-amber-400">
            <PenTool size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base md:text-lg font-serif font-bold text-amber-950 dark:text-amber-200">
                ✏️ Trabajo en Libreta y Cuaderno de Estudio
              </h3>
              <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-200/90 text-amber-900 dark:bg-amber-900/80 dark:text-amber-200 border border-amber-300 dark:border-amber-700">
                Independiente de la Tarea
              </span>
            </div>
            <p className="text-xs text-amber-900/80 dark:text-slate-300 mt-0.5">
              Actividades prácticas para anotar a mano, responder preguntas de reflexión y profundizar en tu cuaderno.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleCopyGuide}
            className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 text-amber-900 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-slate-700 border border-amber-300/80 dark:border-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
            title="Copiar las actividades para pegarlas en tus notas"
          >
            {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
            <span>{copied ? '¡Copiado!' : 'Copiar Guía'}</span>
          </button>

          <button
            onClick={() => setIsExpanded(prev => !prev)}
            className="p-1.5 rounded-lg bg-white dark:bg-slate-800 text-amber-900 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-slate-700 border border-amber-300/80 dark:border-slate-700 transition-colors cursor-pointer"
            title={isExpanded ? "Plegar sección" : "Desplegar sección"}
          >
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4 mb-2">
        <div className="flex items-center justify-between text-xs font-bold text-amber-900 dark:text-amber-300 mb-1">
          <span className="flex items-center gap-1.5">
            <ListChecks size={15} className="text-amber-600 dark:text-amber-400" />
            <span>Progreso de Ejercicios en Cuaderno:</span>
          </span>
          <span className="font-mono bg-amber-200/60 dark:bg-amber-950 px-2 py-0.5 rounded border border-amber-300/80 dark:border-amber-800">
            {completedCount} de {notebookItems.length} completados ({progressPercent}%)
          </span>
        </div>
        <div className="w-full h-2 bg-amber-200/60 dark:bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Items list */}
      {isExpanded && (
        <div className="space-y-3.5 mt-5">
          {notebookItems.map((item, index) => {
            const isChecked = !!completedItems[item.id];
            const badgeStyle = {
              APUNTE: 'bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-800',
              PREGUNTA: 'bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-800',
              ACTIVIDAD: 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
            }[item.category];

            const categoryIcon = {
              APUNTE: <Edit3 size={13} />,
              PREGUNTA: <HelpCircle size={13} />,
              ACTIVIDAD: <Sparkles size={13} />
            }[item.category];

            return (
              <div 
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 group select-none ${
                  isChecked 
                    ? 'bg-amber-100/50 dark:bg-amber-950/40 border-amber-400/80 dark:border-amber-700/80 opacity-90' 
                    : 'bg-white/90 dark:bg-slate-900/90 border-amber-200/90 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-600 hover:shadow-xs'
                }`}
              >
                <div className="mt-0.5 text-amber-600 dark:text-amber-400 shrink-0 transition-transform group-hover:scale-110">
                  {isChecked ? (
                    <CheckSquare size={20} className="text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Square size={20} className="text-amber-800/60 dark:text-slate-500" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border flex items-center gap-1 ${badgeStyle}`}>
                      {categoryIcon}
                      <span>{item.category}</span>
                    </span>
                    <h4 className={`text-xs md:text-sm font-bold ${
                      isChecked ? 'line-through text-slate-500 dark:text-slate-400' : 'text-slate-900 dark:text-slate-100'
                    }`}>
                      {index + 1}. {item.title}
                    </h4>
                  </div>

                  <p className={`text-xs md:text-sm leading-relaxed ${
                    isChecked ? 'text-slate-500 dark:text-slate-400' : 'text-slate-700 dark:text-slate-300'
                  }`}>
                    {item.instruction}
                  </p>

                  {item.hint && (
                    <div className="mt-2 text-[11px] font-sans text-amber-800 dark:text-amber-300/90 bg-amber-50/80 dark:bg-slate-800/80 p-2 rounded-lg border border-amber-200/60 dark:border-slate-700 flex items-start gap-1.5">
                      <Sparkles size={12} className="text-amber-500 shrink-0 mt-0.5" />
                      <span><strong>Sugerencia de Cuaderno:</strong> {item.hint}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer Info */}
      <div className="mt-4 pt-3 border-t border-amber-200/70 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-amber-900/80 dark:text-slate-400">
        <span className="flex items-center gap-1">
          <BookOpen size={13} className="text-amber-600 dark:text-amber-400" />
          <span>El estudio constante en libreta fortalece la retención conceptual y la devoción personal.</span>
        </span>
        {onOpenNotesWidget && (
          <button
            onClick={onOpenNotesWidget}
            className="text-amber-800 dark:text-amber-300 font-bold hover:underline cursor-pointer flex items-center gap-1 shrink-0"
          >
            <FileText size={12} />
            <span>Abrir Mis Notas Digitales</span>
          </button>
        )}
      </div>
    </div>
  );
}
