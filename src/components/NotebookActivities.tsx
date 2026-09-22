import React, { useState, useEffect } from 'react';
import { Lesson } from '../types';
import { generateLessonNotebookPlan } from '../utils/notebookActivitiesGenerator';
import { CheckSquare, Square, Copy, Check, PenTool, FileText, Sparkles, BookOpen, Layers } from 'lucide-react';

interface NotebookActivitiesProps {
  lesson: Lesson;
  courseTitle?: string;
  onOpenNotesWidget?: () => void;
}

export function NotebookActivities({ lesson, courseTitle, onOpenNotesWidget }: NotebookActivitiesProps) {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);

  // Load checks from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`nb_sem_${lesson.id}`);
      if (saved) setCompleted(JSON.parse(saved));
      else setCompleted({});
    } catch {
      setCompleted({});
    }
  }, [lesson.id]);

  const toggle = (id: string) => {
    setCompleted(prev => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(`nb_sem_${lesson.id}`, JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  // Generate dynamic, lesson-specific notebook plan with distinct pedagogical focus
  const notebookPlan = React.useMemo(() => {
    return generateLessonNotebookPlan(lesson);
  }, [lesson]);

  const tasks = notebookPlan.tasks;
  const completedCount = tasks.filter(t => completed[t.id]).length;
  const isAllDone = completedCount === tasks.length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  const handleCopy = () => {
    const text = `📓 TRABAJO EN LIBRETA - ${lesson.title}\n` +
      `Curso: ${courseTitle || ''}\n` +
      `${notebookPlan.pedagogicalFocus}\n\n` +
      tasks.map(t => 
        `[${t.badge.toUpperCase()}] ${t.title}\n` +
        `Instrucción: ${t.task}\n` +
        `Guía: ${t.guidePrompt}\n`
      ).join('\n-----------------------------------\n') +
      `\nSeminario Teológico Digital`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-amber-50/90 via-[#FAF8F5] to-amber-100/40 dark:from-slate-900 dark:via-slate-900/90 dark:to-amber-950/30 border-2 border-amber-300/80 dark:border-amber-700/60 rounded-3xl p-4 sm:p-6 my-7 shadow-sm font-sans transition-colors duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-amber-200/80 dark:border-slate-800">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 to-amber-700 text-white flex items-center justify-center font-bold shadow-md shrink-0 border border-amber-400">
            <PenTool size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-base sm:text-lg font-serif font-bold text-amber-950 dark:text-amber-100">
                ✏️ Trabajo en Libreta y Cuaderno de Estudio
              </h4>
              {/* Dynamic Archetype Badge indicating this class's specific angle */}
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-200/90 text-amber-900 dark:bg-amber-900/80 dark:text-amber-200 border border-amber-300 dark:border-amber-700 flex items-center gap-1">
                <Layers size={11} className="text-amber-700 dark:text-amber-300" />
                <span>{notebookPlan.focusBadge}</span>
              </span>
            </div>
            <p className="text-xs text-amber-900/80 dark:text-slate-300 mt-0.5 flex items-center gap-1.5 flex-wrap">
              <span className="font-semibold text-amber-800 dark:text-amber-300">{notebookPlan.pedagogicalFocus}</span>
              <span className="hidden sm:inline text-slate-400">•</span>
              <span className="text-slate-600 dark:text-slate-400">Ejercicios adaptados a la temática de esta clase</span>
            </p>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-amber-900 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-slate-700 border border-amber-300/80 dark:border-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
            title="Copiar las consignas de esta lección"
          >
            {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
            <span>{copied ? 'Copiado' : 'Copiar Ejercicios'}</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-3.5 mb-2">
        <div className="flex items-center justify-between text-xs font-semibold text-amber-900/90 dark:text-amber-300 mb-1">
          <span className="flex items-center gap-1.5">
            <BookOpen size={14} className="text-amber-600 dark:text-amber-400" />
            <span>Progreso de Ejercicios en Cuaderno:</span>
          </span>
          <span className="font-mono bg-white dark:bg-slate-800 px-2 py-0.5 rounded-md border border-amber-300/70 dark:border-slate-700 text-[11px]">
            {completedCount} de {tasks.length} realizados ({progressPercent}%)
          </span>
        </div>
        <div className="w-full h-2 bg-amber-200/60 dark:bg-slate-800 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-400 rounded-full ${
              isAllDone ? 'bg-emerald-500' : 'bg-amber-500'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Dynamic Tasks List */}
      <div className="space-y-3 mt-4">
        {tasks.map((task) => {
          const isChecked = !!completed[task.id];

          return (
            <div
              key={task.id}
              onClick={() => toggle(task.id)}
              className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 select-none ${
                isChecked
                  ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800 opacity-90'
                  : 'bg-white/95 dark:bg-slate-900/90 border-amber-200/90 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-600 shadow-xs'
              }`}
            >
              {/* Checkbox */}
              <button
                type="button"
                className="mt-0.5 text-amber-600 dark:text-amber-400 shrink-0 cursor-pointer"
                title={isChecked ? "Marcar como pendiente" : "Marcar como terminado en tu cuaderno"}
              >
                {isChecked ? (
                  <CheckSquare size={21} className="text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <Square size={21} className="text-slate-400 hover:text-amber-600" />
                )}
              </button>

              <div className="flex-1 min-w-0">
                {/* Badge and Title */}
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md border ${task.badgeColor}`}>
                    {task.badge}
                  </span>
                  <h5 className={`text-xs sm:text-sm font-bold ${
                    isChecked ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-slate-100'
                  }`}>
                    {task.title}
                  </h5>
                </div>

                {/* Substantive Instruction */}
                <p className={`text-xs sm:text-sm leading-relaxed whitespace-pre-line mt-1 ${
                  isChecked ? 'text-slate-400 dark:text-slate-500' : 'text-slate-700 dark:text-slate-300'
                }`}>
                  {task.task}
                </p>

                {/* Quick Writing Guide */}
                <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-amber-900/80 dark:text-amber-300/80 bg-amber-50/80 dark:bg-slate-800/80 p-2 rounded-xl border border-amber-200/60 dark:border-slate-700">
                  <Sparkles size={13} className="text-amber-500 shrink-0" />
                  <span><strong>En tu hoja:</strong> {task.guidePrompt}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer advice and digital notes shortcut */}
      <div className="mt-4 pt-3 border-t border-amber-200/70 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-amber-900/80 dark:text-slate-400">
        <span className="text-[11px]">
          💡 <strong>Nota del Seminario:</strong> Cada lección rota su enfoque pedagógico para ejercitar tu capacidad exegética, homilética, apologética y pastoral sin caer en la monotonía.
        </span>

        {onOpenNotesWidget && (
          <button
            onClick={onOpenNotesWidget}
            className="text-amber-800 dark:text-amber-300 font-bold hover:underline flex items-center gap-1 shrink-0 cursor-pointer text-xs"
          >
            <FileText size={13} />
            <span>Abrir Bloc de Notas Digital</span>
          </button>
        )}
      </div>

    </div>
  );
}
