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
    <div className="flex flex-col min-h-full font-sans text-slate-800 bg-slate-50/50 transition-colors">
      {showCertificate && (
        <Certificate 
          course={course} 
          user={user}
          customProfile={customProfile}
          onClose={() => setShowCertificate(false)} 
        />
      )}
      <header className="h-16 bg-[#0F172A] text-white border-b border-slate-800 px-4 md:px-8 flex items-center shadow-lg sticky top-0 z-20 shrink-0">
         <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-300 hover:text-amber-400 transition-colors font-sans text-xs md:text-sm font-semibold uppercase tracking-wider bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700 cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Volver a Cursos</span>
          </button>
      </header>

      <div className="p-4 sm:p-6 md:p-10 max-w-5xl mx-auto w-full flex-1 pb-28 space-y-8">
        {/* Module Banner */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#1E1B4B] p-6 md:p-10 text-white overflow-hidden shadow-xl border border-slate-800">
           <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
           <div className="relative z-10">
             <div className="text-[10px] md:text-xs font-sans text-amber-400 uppercase tracking-widest mb-3 flex items-center gap-2 font-semibold">
               <span className="bg-amber-400/10 border border-amber-500/30 px-3 py-1 rounded-full">Módulo Activo</span>
               <span>•</span>
               <span>{course.durationMonths ? `Duración Sugerida: ${course.durationMonths} Meses` : 'Duración Sugerida: 3 Meses Mínimo'}</span>
             </div>
             <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 leading-tight">
               {course.title}
             </h1>
             <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-3xl border-l-2 border-amber-500/80 pl-4">
               {course.description}
             </p>
           </div>
        </div>

        {/* Progress Card */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 md:p-8 shadow-md">
           <div className="flex justify-between items-end mb-3 font-sans">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Progreso General ({completedReal.toLocaleString('es-ES')}/{total.toLocaleString('es-ES')} Clases Completadas)</span>
              <span className="text-base font-bold text-slate-900 font-mono">{percentage}%</span>
           </div>
           <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden mb-4 p-0.5 border border-slate-200/50">
             <div className="h-full bg-gradient-to-r from-amber-600 to-amber-500 rounded-full transition-all duration-500 shadow-sm" style={{ width: `${percentage}%` }}></div>
           </div>
           {percentage === 100 && (
             <div className="pt-4 border-t border-slate-100 flex justify-end">
               <button 
                 onClick={() => setShowCertificate(true)}
                 className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-3 rounded-2xl text-xs font-bold tracking-wider uppercase hover:from-amber-700 hover:to-amber-800 transition-all shadow-lg active:scale-95 cursor-pointer font-sans"
               >
                 <Award size={18} className="text-amber-200" />
                 Ver Certificado Oficial
               </button>
             </div>
           )}
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-serif font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-3">
             <BookOpen size={22} className="text-amber-700" /> 
             Índice de Clases y Evaluaciones
          </h2>

          {/* Academic Highlight for Next Lesson */}
          {(() => {
            const nextLesson = course.lessons.find(l => !progress.completedLessons[l.id]);
            if (!nextLesson || (!nextLesson.commentaries && !nextLesson.assignments && !nextLesson.verses)) return null;
            
            return (
              <div className="bg-gradient-to-br from-amber-500/10 via-amber-50/40 to-slate-50 border border-amber-200 rounded-3xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Award size={20} className="text-amber-800" />
                  <h3 className="text-xs font-bold text-amber-900 uppercase tracking-widest font-sans">Próxima Clase Disponible</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* Commentary Preview */}
                  {(nextLesson.commentaries && nextLesson.commentaries.length > 0) && (
                    <div className="space-y-2">
                      <div className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">Comentario Teológico de Entrada</div>
                      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-amber-200/80 shadow-xs">
                        <p className="text-sm text-slate-700 italic font-serif leading-relaxed line-clamp-3">
                          "{nextLesson.commentaries[0].text}"
                        </p>
                        <p className="text-[10px] font-bold text-amber-800 mt-2 uppercase tracking-wider">— {nextLesson.commentaries[0].author}</p>
                      </div>
                    </div>
                  )}

                  {/* Tasks Preview */}
                  {(nextLesson.assignments && nextLesson.assignments.length > 0) && (
                    <div className="space-y-2">
                      <div className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Objetivo de Aprendizaje (Día {nextLesson.day})</div>
                      <ul className="space-y-2">
                        {nextLesson.assignments.slice(0, 2).map((a, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 bg-white/80 p-3 rounded-xl border border-amber-200/80">
                            <div className="w-2 h-2 rounded-full bg-amber-600 mt-1.5 shrink-0"></div>
                            <span className="line-clamp-2">{a.description}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <button 
                  onClick={() => onSelectLesson(nextLesson.id)}
                  className="w-full bg-[#0F172A] hover:bg-slate-800 text-white py-3.5 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 active:scale-98 cursor-pointer font-sans"
                >
                  Continuar Clase {nextLesson.day}: {nextLesson.title}
                  <PlayCircle size={18} className="text-amber-400" />
                </button>
              </div>
            );
          })()}
          
          <div className="grid gap-3">
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
                      className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 md:p-5 rounded-2xl border text-left transition-all duration-200 ${
                        isUnlocked 
                          ? 'bg-white border-slate-200/90 hover:border-amber-500/50 hover:shadow-md cursor-pointer group' 
                          : 'bg-slate-50 border-slate-200/60 opacity-60 cursor-not-allowed'
                      }`}
                    >
                     <div className="flex items-start gap-4 mb-3 sm:mb-0">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 mt-0.5 transition-transform group-hover:scale-105 ${
                           isCompleted ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 
                           isUnlocked ? 'bg-[#0F172A] text-amber-400 border border-slate-700' : 'bg-slate-200 text-slate-400'
                        }`}>
                           {isCompleted ? <CheckCircle size={20} /> : 
                            isUnlocked ? <PlayCircle size={20} /> : <Lock size={20} />}
                        </div>
                        <div>
                           <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-sans mb-0.5">
                             {course.type === 'SPECIALIZED' ? 'Unidad' : 'Día'} {lesson.day}
                           </div>
                           <h3 className={`font-serif font-bold text-base md:text-lg leading-tight ${isUnlocked ? 'text-slate-900 group-hover:text-amber-800' : 'text-slate-400'}`}>
                             {lesson.title}
                           </h3>
                        </div>
                     </div>
                     
                     <div className="flex items-center sm:w-auto w-full justify-between sm:justify-end pl-14 sm:pl-0 gap-4 font-sans">
                        {isCompleted && score !== undefined && (
                          <div className="text-xs">
                            <span className="text-slate-400 uppercase tracking-wider text-[9px] mr-1 block sm:inline">Examen:</span>
                            <span className="font-bold text-emerald-700 font-mono text-sm">{score}%</span>
                          </div>
                        )}
                        {isUnlocked && !isCompleted && (
                           <div className="text-[10px] bg-amber-100/80 text-amber-900 border border-amber-200 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                             Pendiente
                           </div>
                        )}
                        {!isUnlocked && (
                           <div className="text-[10px] bg-slate-200 text-slate-500 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                             Bloqueado
                           </div>
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
