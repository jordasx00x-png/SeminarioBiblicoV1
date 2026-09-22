import React, { useState } from 'react';
import { Course, UserProgress } from '../types';
import { User } from 'firebase/auth';
import { BookOpen, CheckCircle, Lock, PlayCircle, ArrowLeft, Award } from 'lucide-react';
import { Certificate } from './Certificate';
import { getLessonTitleForDay } from '../data/syllabusTitles';

interface CourseOverviewProps {
  course: Course;
  progress: UserProgress;
  user: User;
  customProfile?: {fullName?: string; email?: string; phoneNumber?: string};
  onSelectLesson: (lessonId: string) => void;
  onBack: () => void;
}

export function CourseOverview({ course, progress, user, customProfile, onSelectLesson, onBack }: CourseOverviewProps) {
  const [showCertificate, setShowCertificate] = useState(false);

  const total = course.lessons.length;
  const completedReal = course.lessons.filter(l => progress.completedLessons[l.id]).length;
  const percentage = total > 0 ? Math.round((completedReal / total) * 100) : 0;

  return (
    <div className="flex flex-col min-h-full font-sans text-stone-800 dark:text-stone-100 bg-[#FAF9F5] dark:bg-stone-950 transition-colors">
      {showCertificate && (
        <Certificate 
          course={course} 
          user={user}
          customProfile={customProfile}
          onClose={() => setShowCertificate(false)} 
        />
      )}
      <header className="h-16 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 px-4 md:px-8 flex items-center shadow-sm sticky top-0 z-20 shrink-0">
         <button 
            onClick={onBack}
            className="flex items-center gap-3 text-stone-500 hover:text-[#7F1D1D] transition-all font-sans text-[10px] font-bold uppercase tracking-[0.2em] bg-stone-100 dark:bg-stone-800 px-4 py-2 rounded border border-stone-200 dark:border-stone-700 cursor-pointer active:scale-95"
          >
            <ArrowLeft size={16} strokeWidth={2.5} />
            <span>Volver al Catálogo</span>
          </button>
      </header>

      <div className="p-4 sm:p-6 md:p-10 max-w-5xl mx-auto w-full flex-1 pb-28 space-y-8">
        {/* Module Banner: Institutional Style */}
        <div className="relative rounded-lg bg-[#FAF9F5] p-8 sm:p-10 md:p-12 text-[#1A2533] border border-stone-300 shadow-sm overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-[#7F1D1D]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
           <div className="relative z-10">
             <div className="text-[10px] font-bold text-[#7F1D1D] uppercase tracking-[0.3em] mb-4 flex flex-wrap items-center gap-3">
               <span className="bg-[#7F1D1D]/10 px-2 py-0.5 rounded">Módulo Curricular</span>
               <span className="text-stone-300">|</span>
               <span>{total} Lecciones Oficiales</span>
               <span className="text-stone-300">|</span>
               <span>{course.durationMonths || 3} Meses</span>
             </div>
             <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-black text-[#1A2533] mb-6 leading-[1.1] tracking-tight">
               {course.title}
             </h1>
             <p className="text-stone-600 font-serif italic text-base md:text-lg leading-relaxed max-w-3xl border-l-2 border-[#7F1D1D] pl-6">
               {course.description}
             </p>
           </div>
        </div>

        {/* Progress Card */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-6 md:p-8 shadow-xs">
           <div className="flex justify-between items-end mb-3 font-sans text-xs">
              <span className="font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                Progreso General ({completedReal} de {total} Clases Acreditadas)
              </span>
              <span className="text-base font-bold text-stone-900 dark:text-stone-100 font-mono tabular-nums">{percentage}%</span>
           </div>
           <div className="h-2 w-full bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden mb-4">
             <div className="h-full bg-[#D1B17F] rounded-full transition-all duration-500" style={{ width: `${percentage}%` }}></div>
           </div>
           {percentage === 100 && (
             <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex justify-end">
               <button 
                 onClick={() => setShowCertificate(true)}
                 className="flex items-center gap-2 bg-[#7F1D1D] hover:bg-red-800 text-white px-5 py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-colors shadow-xs cursor-pointer font-sans"
               >
                 <Award size={16} className="text-amber-200" />
                 Ver Certificado Oficial
               </button>
             </div>
           )}
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2 border-b border-stone-200 dark:border-stone-800 pb-3">
             <BookOpen size={22} className="text-[#7F1D1D] dark:text-amber-400" /> 
             Índice de Clases y Evaluaciones
          </h2>

          {/* Academic Highlight for Next Lesson */}
          {(() => {
            const nextLesson = course.lessons.find(l => !progress.completedLessons[l.id]);
            if (!nextLesson || (!nextLesson.commentaries && !nextLesson.assignments && !nextLesson.verses)) return null;
            
            return (
              <div className="bg-amber-50/50 dark:bg-stone-900/60 border border-[#D1B17F]/40 rounded-xl p-6 shadow-xs">
                <div className="flex items-center gap-2 mb-4">
                  <Award size={18} className="text-[#7F1D1D] dark:text-amber-400" />
                  <h3 className="text-xs font-semibold text-[#7F1D1D] dark:text-amber-400 uppercase tracking-widest font-sans">
                    Próxima Clase Disponible
                  </h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* Commentary Preview */}
                  {(nextLesson.commentaries && nextLesson.commentaries.length > 0) && (
                    <div className="space-y-2">
                      <div className="text-[11px] font-semibold text-stone-600 dark:text-stone-400 uppercase tracking-wider">
                        Comentario Teológico de Entrada
                      </div>
                      <div className="bg-white dark:bg-stone-900/80 p-4 rounded-lg border border-stone-200 dark:border-stone-800">
                        <p className="text-sm text-stone-700 dark:text-stone-300 italic font-serif leading-relaxed line-clamp-3">
                          "{nextLesson.commentaries[0].text}"
                        </p>
                        <p className="text-[11px] font-semibold text-[#7F1D1D] dark:text-amber-400 mt-2 uppercase tracking-wider">— {nextLesson.commentaries[0].author}</p>
                      </div>
                    </div>
                  )}

                  {/* Tasks Preview */}
                  {(nextLesson.assignments && nextLesson.assignments.length > 0) && (
                    <div className="space-y-2">
                      <div className="text-[11px] font-semibold text-stone-600 dark:text-stone-400 uppercase tracking-wider">
                        Objetivo de Aprendizaje ({course.type === 'SPECIALIZED' ? 'Unidad' : 'Día'} {nextLesson.day})
                      </div>
                      <ul className="space-y-2">
                        {nextLesson.assignments.slice(0, 2).map((a, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs text-stone-700 dark:text-stone-300 bg-white dark:bg-stone-900/80 p-3 rounded-lg border border-stone-200 dark:border-stone-800">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#7F1D1D] dark:bg-amber-400 mt-1.5 shrink-0"></div>
                            <span className="line-clamp-2">{a.description}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <button 
                  onClick={() => onSelectLesson(nextLesson.id)}
                  className="w-full bg-[#111827] hover:bg-stone-800 text-amber-200 py-3 rounded-lg text-xs font-semibold uppercase tracking-widest transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer font-sans"
                >
                  Continuar Clase {nextLesson.day}: {nextLesson.title}
                  <PlayCircle size={16} className="text-amber-300" />
                </button>
              </div>
            );
          })()}
          
          <div className="grid gap-2.5">
             {(() => {
                const maxCompletedIndex = course.lessons.reduce((maxIdx, l, idx) => progress.completedLessons[l.id] ? idx : maxIdx, -1);
                
                return course.lessons.map((lesson, index) => {
                  const dayNumber = index + 1;
                  const isCompleted = !!progress.completedLessons[lesson.id];
                  const score = progress.completedLessons[lesson.id]?.score;
                  
                  const isUnlocked = index <= maxCompletedIndex + 2;
                  const isVisible = index <= maxCompletedIndex + 3;
                  
                  if (!isVisible) return null;

                  return (
                    <button
                      key={lesson.id}
                      disabled={!isUnlocked}
                      onClick={() => isUnlocked && onSelectLesson(lesson.id)}
                      className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 rounded-xl border text-left transition-all ${
                        isUnlocked 
                          ? 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-[#D1B17F] hover:shadow-xs cursor-pointer group' 
                          : 'bg-stone-50/60 dark:bg-stone-950 border-stone-200/50 dark:border-stone-800/50 opacity-60 cursor-not-allowed'
                      }`}
                    >
                     <div className="flex items-start gap-4 mb-3 sm:mb-0">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                           isCompleted ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60' : 
                           isUnlocked ? 'bg-stone-900 text-amber-300 border border-stone-800' : 'bg-stone-200 dark:bg-stone-800 text-stone-400'
                        }`}>
                           {isCompleted ? <CheckCircle size={18} /> : 
                            isUnlocked ? <PlayCircle size={18} /> : <Lock size={16} />}
                        </div>
                        <div>
                           <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider font-sans mb-0.5">
                             {course.type === 'SPECIALIZED' ? 'Unidad' : 'Día'} {lesson.day}
                           </div>
                           <h3 className={`font-serif font-semibold text-base sm:text-lg leading-snug ${isUnlocked ? 'text-stone-900 dark:text-stone-100 group-hover:text-[#7F1D1D] dark:group-hover:text-amber-300' : 'text-stone-400'}`}>
                             {lesson.title}
                           </h3>
                        </div>
                     </div>
                     
                     <div className="flex items-center sm:w-auto w-full justify-between sm:justify-end pl-13 sm:pl-0 gap-4 font-sans text-xs">
                        {isCompleted && score !== undefined && (
                          <div className="flex items-center gap-1.5">
                            <span className="text-stone-400 uppercase text-[10px]">Examen:</span>
                            <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono tabular-nums">{score}%</span>
                          </div>
                        )}
                        {isUnlocked && !isCompleted && (
                           <span className="text-amber-700 dark:text-amber-400 font-semibold uppercase tracking-wider text-[11px]">
                             Disponible
                           </span>
                        )}
                        {!isUnlocked && (
                           <span className="text-stone-400 font-medium uppercase tracking-wider text-[11px]">
                             Bloqueado
                           </span>
                        )}
                     </div>
                  </button>
                );
              })})()}
          </div>
        </div>
      </div>
    </div>
  );
}
