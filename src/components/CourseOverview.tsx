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
    <div className="flex flex-col min-h-full font-serif text-[#2C2C2C] dark:text-stone-300 bg-[#FDFCFB] dark:bg-[#121212] transition-colors">
      {showCertificate && (
        <Certificate 
          course={course} 
          user={user}
          customProfile={customProfile}
          onClose={() => setShowCertificate(false)} 
        />
      )}
      <header className="h-16 bg-white dark:bg-zinc-900 border-b border-[#E0D7C6] dark:border-zinc-800 px-4 md:px-8 flex items-center shadow-sm sticky top-0 z-20 shrink-0 transition-colors">
         <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-500 hover:text-[#1A2533] dark:hover:text-stone-100 transition-colors font-sans text-xs md:text-sm font-semibold uppercase tracking-widest"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Volver al Panel</span>
          </button>
      </header>

      <div className="p-6 md:p-10 max-w-4xl mx-auto w-full flex-1 pb-24">
        <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
           <div className="text-[10px] md:text-xs font-sans text-gray-500 dark:text-zinc-400 uppercase tracking-widest mb-2 flex items-center gap-2">
             <span className="bg-[#1A2533] dark:bg-zinc-700 text-[#E0D7C6] px-2 py-0.5 rounded">Módulo Activo</span>
             <span>•</span>
             <span>{course.durationMonths ? `Duración Sugerida: ${course.durationMonths} Meses` : 'Duración Sugerida: 3 Meses Mínimo'}</span>
           </div>
           <h1 className="text-3xl md:text-5xl font-bold text-[#1A2533] dark:text-stone-100 mb-4 leading-tight">
             {course.title}
           </h1>
           <p className="text-gray-600 dark:text-stone-400 font-sans mt-4 text-sm md:text-base md:text-lg leading-relaxed max-w-2xl border-l-4 border-[#7F1D1D] dark:border-red-800 pl-4">
             {course.description}
           </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-[#E0D7C6] dark:border-zinc-800 rounded-xl p-6 shadow-sm mb-10 animate-in fade-in slide-in-from-bottom-6 duration-500 transition-colors">
           <div className="flex justify-between items-end mb-2">
              <span className="text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-widest font-sans">Progreso General ({completedReal}/{total})</span>
              <span className="text-sm font-bold text-[#1A2533] dark:text-stone-100">{percentage}%</span>
           </div>
           <div className="h-2 w-full bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden mb-4">
             <div className="h-full bg-[#7F1D1D] dark:bg-red-800 rounded-full transition-all duration-500" style={{ width: `${percentage}%` }}></div>
           </div>
           {percentage === 100 && (
             <div className="pt-4 border-t border-[#E0D7C6] dark:border-zinc-800 flex justify-end">
               <button 
                 onClick={() => setShowCertificate(true)}
                 className="flex items-center gap-2 bg-[#1A2533] dark:bg-zinc-800 text-white px-6 py-2.5 rounded text-[10px] md:text-xs font-bold tracking-widest uppercase hover:bg-black dark:hover:bg-zinc-700 transition-colors shadow-sm font-sans"
               >
                 <Award size={16} className="text-[#E0D7C6]" />
                 Ver Certificado Oficial
               </button>
             </div>
           )}
        </div>

        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-500">
          <h2 className="text-xl font-bold text-[#1A2533] mb-6 flex items-center gap-2 border-b border-[#E0D7C6] pb-2">
             <BookOpen size={20} className="text-[#7F1D1D]" /> 
             Índice de Clases
          </h2>

          {/* Academic Highlight for Next Lesson */}
          {(() => {
            const nextLesson = course.lessons.find(l => !progress.completedLessons[l.id]);
            if (!nextLesson || (!nextLesson.commentaries && !nextLesson.assignments && !nextLesson.verses)) return null;
            
            return (
              <div className="mb-10 bg-[#FAF9F6] border-2 border-dashed border-[#E0D7C6] rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-2 mb-6">
                  <Award size={20} className="text-[#7F1D1D]" />
                  <h3 className="text-sm font-bold text-[#1A2533] uppercase tracking-[0.2em] font-sans">Enfoque Académico: Próxima Clase</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Commentary Preview */}
                  {(nextLesson.commentaries && nextLesson.commentaries.length > 0) && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-[#7F1D1D]">
                        <div className="h-4 w-1 bg-[#7F1D1D] rounded"></div>
                        <span className="text-[10px] font-bold uppercase tracking-widest">Comentario Académico</span>
                      </div>
                      <div className="bg-white p-5 rounded-xl shadow-sm border border-[#F0E6D2] relative">
                        <div className="absolute top-2 right-2 opacity-10">
                          <BookOpen size={40} />
                        </div>
                        <p className="text-sm text-[#2C2C2C] italic font-serif leading-relaxed line-clamp-4">
                          "{nextLesson.commentaries[0].text}"
                        </p>
                        <p className="text-[10px] font-bold text-[#7F1D1D] mt-3 uppercase tracking-tighter">— {nextLesson.commentaries[0].author}</p>
                      </div>
                    </div>
                  )}

                  {/* Tasks Preview */}
                  {(nextLesson.assignments && nextLesson.assignments.length > 0) && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-[#1A2533]">
                        <div className="h-4 w-1 bg-[#1A2533] rounded"></div>
                        <span className="text-[10px] font-bold uppercase tracking-widest">Plan de Acción (Día {nextLesson.day})</span>
                      </div>
                      <ul className="space-y-2">
                        {nextLesson.assignments.slice(0, 2).map((a, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-gray-600 bg-white/50 p-3 rounded-lg border border-[#F0E6D2]">
                            <div className="w-4 h-4 rounded-full border border-gray-300 mt-0.5 shrink-0"></div>
                            <span className="line-clamp-2">{a.description}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <button 
                  onClick={() => onSelectLesson(nextLesson.id)}
                  className="mt-8 w-full bg-[#1A2533] text-white py-3 rounded-xl text-xs font-bold uppercase tracking-[0.2em] hover:bg-black transition-all shadow-md flex items-center justify-center gap-2"
                >
                  Ir a la Clase {nextLesson.day}: {nextLesson.title}
                  <PlayCircle size={16} />
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
                      className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 md:p-5 rounded-xl border text-left transition-all duration-200 ${
                        isUnlocked 
                          ? 'bg-white border-[#E0D7C6] hover:border-[#1A2533] hover:shadow-md cursor-pointer' 
                          : 'bg-gray-50 border-gray-100 opacity-60 cursor-not-allowed'
                      }`}
                    >
                     <div className="flex items-start gap-4 mb-3 sm:mb-0">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                           isCompleted ? 'bg-emerald-100 text-emerald-600' : 
                           isUnlocked ? 'bg-[#1A2533] text-white' : 'bg-gray-200 text-gray-400'
                        }`}>
                           {isCompleted ? <CheckCircle size={20} /> : 
                            isUnlocked ? <PlayCircle size={20} /> : <Lock size={20} />}
                        </div>
                        <div>
                           <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-sans mb-1">
                             {course.type === 'SPECIALIZED' ? 'Unidad' : 'Día'} {lesson.day}
                           </div>
                           <h3 className={`font-bold text-base md:text-lg leading-tight ${isUnlocked ? 'text-[#1A2533]' : 'text-gray-500'}`}>
                             {lesson.title}
                           </h3>
                        </div>
                     </div>
                     
                     <div className="flex items-center sm:w-auto w-full justify-between sm:justify-end pl-14 sm:pl-0 gap-4">
                        {isCompleted && score !== undefined && (
                          <div className="text-xs font-sans">
                            <span className="text-gray-500 uppercase tracking-widest text-[9px] mr-1 block sm:inline">Examen Final:</span>
                            <span className="font-bold text-[#1A2533]">{score}%</span>
                          </div>
                        )}
                        {isUnlocked && !isCompleted && (
                           <div className="text-[10px] bg-amber-100 text-amber-800 px-2 py-1 rounded font-bold font-sans uppercase tracking-wider">
                             Pendiente
                           </div>
                        )}
                        {!isUnlocked && (
                           <div className="text-[10px] bg-gray-200 text-gray-500 px-2 py-1 rounded font-bold font-sans uppercase tracking-wider">
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
