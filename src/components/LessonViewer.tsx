import { useState, useEffect, useMemo } from 'react';
import { Lesson, Course, UserProgress } from '../types';
import { FinalExam } from './FinalExam';
import { LessonNotes } from './LessonNotes';
import { ReinforcementVerses } from './ReinforcementVerses';
import { LessonAssignments } from './LessonAssignments';
import { ReflectionActivities } from './ReflectionActivities';
import { FormattedContent, VerseContext } from './FormattedContent';
import { InteractiveCheckpoint } from './InteractiveCheckpoint';
import { LessonAudioPlayer } from './LessonAudioPlayer';
import { ReadingToolbar } from './ReadingToolbar';
import { BibleVerseModal } from './BibleVerseModal';
import { ArrowLeft, BookOpen, CheckCircle2, Clock, Target, ExternalLink } from 'lucide-react';

interface LessonViewerProps {
  key?: string | number;
  lesson: Lesson;
  course: Course;
  progress: UserProgress;
  onComplete: (score: number) => void;
  onBack: () => void;
}

export function LessonViewer({ lesson, course, progress, onComplete, onBack }: LessonViewerProps) {
  const isPreviouslyCompleted = !!progress.completedLessons[lesson.id];
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [readingTheme, setReadingTheme] = useState<'paper' | 'sepia' | 'contrast'>('paper');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeBibleVerse, setActiveBibleVerse] = useState<{ reference: string; text?: string } | null>(null);

  // Monitor scroll for reading progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const current = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, current)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Concatenate readable text for the audio reader
  const fullTextToRead = useMemo(() => {
    const parts: string[] = [];
    if (lesson.baseVerse) {
      parts.push(`Versículo base: ${lesson.baseVerse.text}. ${lesson.baseVerse.reference}.`);
    }
    lesson.blocks.forEach(block => {
      if (block.type === 'text' || block.type === 'note') {
        parts.push(block.content);
      }
    });
    return parts.join(' ');
  }, [lesson]);

  // Typography size classes
  const fontClass = {
    normal: 'text-base md:text-lg leading-relaxed',
    large: 'text-lg md:text-xl leading-relaxed',
    xlarge: 'text-xl md:text-2xl leading-loose'
  }[fontSize];

  // Theme classes
  const themeCardClass = {
    paper: 'bg-white border-[#E0D7C6] text-[#2C2C2C]',
    sepia: 'bg-[#FBF7EE] border-[#E5D7B7] text-[#3D332A]',
    contrast: 'bg-[#182330] border-[#2C3E50] text-[#EBE6DF]'
  }[readingTheme];

  const themeTitleClass = {
    paper: 'text-[#1A2533]',
    sepia: 'text-[#2D1E12]',
    contrast: 'text-white'
  }[readingTheme];

  return (
    <VerseContext.Provider value={{ onSelectVerse: (ref) => setActiveBibleVerse({ reference: ref }) }}>
      <div className="flex flex-col min-h-full">
        {/* Top Header */}
        <header className="h-16 bg-[#1A2533] text-white border-b border-[#2C3E50] px-4 md:px-8 flex items-center justify-between shadow-sm sticky top-0 z-30 shrink-0">
          <div className="flex items-center gap-2 md:gap-4 overflow-hidden">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors font-sans text-xs font-bold uppercase tracking-widest mr-1 md:mr-2 shrink-0 cursor-pointer"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Volver</span>
            </button>
            <div className="h-4 w-px bg-white/20 hidden sm:block shrink-0"></div>
            <span className="text-xs font-semibold text-gray-200 truncate">
              {course.title} &bull; <strong className="text-white">Día {lesson.day}</strong>
            </span>
          </div>
          <div className="flex items-center gap-3 md:gap-6 shrink-0">
            {lesson.baseVerse && (
              <button
                onClick={() => setActiveBibleVerse({ reference: lesson.baseVerse!.reference, text: lesson.baseVerse!.text })}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold bg-[#D1B17F]/20 hover:bg-[#D1B17F]/30 text-[#E0D7C6] border border-[#D1B17F]/40 transition-all font-sans cursor-pointer"
                title="Abrir versículo en la segunda pantalla de estudio"
              >
                <BookOpen size={14} />
                <span>{lesson.baseVerse.reference}</span>
              </button>
            )}
            <button 
               className="px-3 md:px-4 py-2 rounded text-[10px] md:text-xs font-bold uppercase tracking-wider transition-colors bg-[#7F1D1D] text-white hover:bg-red-800 font-sans cursor-pointer active:scale-95 shadow-sm"
               onClick={() => {
                  const targetId = lesson.finalExam && lesson.finalExam.length > 0 ? 'final-exam-section' : 'completion-section';
                  const examElement = document.getElementById(targetId);
                  if (examElement) {
                     examElement.scrollIntoView({ behavior: 'smooth' });
                  }
               }}
            >
               <span>{lesson.finalExam && lesson.finalExam.length > 0 ? 'Ir al Examen Final' : 'Completar Clase'}</span>
            </button>
          </div>
        </header>

        {/* Reading preferences toolbar */}
        <ReadingToolbar
          fontSize={fontSize}
          setFontSize={setFontSize}
          readingTheme={readingTheme}
          setReadingTheme={setReadingTheme}
          scrollProgress={scrollProgress}
          onOpenBibleViewer={() => setActiveBibleVerse({ 
            reference: lesson.baseVerse?.reference || 'Gálatas 2:16', 
            text: lesson.baseVerse?.text 
          })}
        />

        <div className="flex-1 p-4 md:p-8 flex gap-8 bg-[#FDFCFB] justify-center transition-colors">
          <div className="flex-1 flex flex-col gap-6 max-w-[850px] w-full">
            
            {/* Main Article Container */}
            <article className={`border rounded-xl p-6 md:p-10 shadow-sm flex flex-col gap-6 relative font-serif transition-colors ${themeCardClass}`}>
              
              {/* Header metadata */}
              <div className="border-b border-[#E0D7C6]/60 pb-5">
                <div className="flex flex-wrap items-center gap-2.5 text-xs font-sans font-bold uppercase tracking-widest text-[#7F1D1D] mb-3">
                  <span className="px-2.5 py-1 rounded bg-[#7F1D1D]/10 border border-[#7F1D1D]/20">
                    Día {lesson.day} de Estudio
                  </span>
                  <span className="flex items-center gap-1 text-gray-500 font-normal">
                    <Clock size={14} />
                    {lesson.estimatedMinutes || 45} minutos de formación
                  </span>
                </div>

                <h1 className={`text-2xl md:text-4xl mb-3 font-bold font-serif leading-tight ${themeTitleClass}`}>
                  {lesson.title}
                </h1>

                {/* Objectives */}
                {lesson.objectives && lesson.objectives.length > 0 && (
                  <div className="mt-4 p-4 rounded-lg bg-stone-50/80 border border-stone-200/80 font-sans">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#1A2533] uppercase tracking-wider mb-2">
                      <Target size={14} className="text-[#7F1D1D]" />
                      <span>Objetivos Pedagógicos de la Clase</span>
                    </div>
                    <ul className="space-y-1.5">
                      {lesson.objectives.map((obj, i) => (
                        <li key={i} className="text-xs md:text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-[#7F1D1D] font-bold mt-0.5">•</span>
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Audio Lecturer */}
              <LessonAudioPlayer title={lesson.title} textToRead={fullTextToRead} />

              {/* Base Verse: Highly Interactive with Second Screen trigger */}
              {lesson.baseVerse && (
                <div 
                  onClick={() => setActiveBibleVerse({ reference: lesson.baseVerse!.reference, text: lesson.baseVerse!.text })}
                  className="bg-[#FAF9F6] border-l-4 border-[#7F1D1D] p-6 rounded-r-xl my-2 shadow-xs hover:shadow-md hover:bg-amber-50/70 border border-[#D1B17F]/30 transition-all cursor-pointer group relative"
                  title="Haga clic para abrir este versículo en la segunda pantalla de estudio"
                >
                  <div className="flex items-center justify-between text-[#7F1D1D] mb-3 font-sans">
                    <div className="flex items-center gap-2">
                      <BookOpen size={18} />
                      <span className="text-xs font-bold uppercase tracking-widest">Texto Base para la Exégesis</span>
                    </div>
                    <span className="text-xs font-bold text-[#7F1D1D] bg-white px-2.5 py-1 rounded-md border border-[#7F1D1D]/20 group-hover:bg-[#7F1D1D] group-hover:text-white transition-colors flex items-center gap-1 shadow-2xs">
                      <span>Abrir en Segunda Pantalla</span>
                      <ExternalLink size={12} />
                    </span>
                  </div>
                  <p className="text-xl md:text-2xl font-serif italic text-[#1A2533] mb-3 leading-relaxed">
                    "{lesson.baseVerse.text}"
                  </p>
                  <div className="flex items-center justify-between font-sans pt-2 border-t border-[#E0D7C6]/50">
                    <span className="text-xs text-gray-500 italic">
                      Toque para consultar traducciones, contexto de capítulo y análisis morfológico
                    </span>
                    <p className="text-sm font-bold text-[#7F1D1D] uppercase tracking-widest font-sans">
                      — {lesson.baseVerse.reference}
                    </p>
                  </div>
                </div>
              )}

              {/* Content Blocks: Text, Interactive Checkpoints, and Notes */}
              <div className="space-y-6 mt-2">
                {lesson.blocks.map((block) => {
                  if (block.type === 'text') {
                    return (
                      <div key={block.id} className="animate-in fade-in duration-300">
                        <FormattedContent 
                          className={`text-gray-800 leading-relaxed font-serif ${fontClass}`}
                          content={block.content}
                          onSelectVerse={(ref) => setActiveBibleVerse({ reference: ref })}
                        />
                      </div>
                    );
                  }

                  if (block.type === 'control') {
                    return (
                      <div key={block.id} className="animate-in fade-in duration-500">
                        <InteractiveCheckpoint question={block.question} />
                      </div>
                    );
                  }

                  if (block.type === 'note') {
                    return (
                      <div key={block.id} className="animate-in fade-in duration-500">
                        <div className="bg-[#FAF9F6] border-2 border-dashed border-[#D1B17F] rounded-xl p-6 md:p-8 relative overflow-hidden my-4">
                          <div className="absolute top-0 right-0 p-3 opacity-10">
                            <BookOpen size={64} className="text-[#1A2533]" />
                          </div>
                          <h4 className="text-xs md:text-sm font-bold text-[#7F1D1D] uppercase tracking-[0.2em] mb-4 flex items-center gap-2 font-sans">
                            <CheckCircle2 size={16} />
                            Puntos Clave para su Libreta Teológica
                          </h4>
                          <FormattedContent 
                            className="text-[#1A2533] leading-relaxed font-sans text-sm md:text-base prose prose-sm max-w-none"
                            content={block.content}
                            onSelectVerse={(ref) => setActiveBibleVerse({ reference: ref })}
                          />
                        </div>
                      </div>
                    );
                  }

                  return null;
                })}
              </div>

            </article>

            {/* Reinforcement Verses */}
            {lesson.verses && lesson.verses.length > 0 && (
              <ReinforcementVerses 
                verses={lesson.verses} 
                onSelectVerse={(v) => setActiveBibleVerse({ reference: v.reference, text: v.text })}
              />
            )}

            {/* Practical Assignments & Document Submissions */}
            {lesson.assignments && lesson.assignments.length > 0 && (
              <LessonAssignments 
                lessonId={lesson.id} 
                courseId={course.id} 
                assignments={lesson.assignments}
                lessonTitle={lesson.title}
              />
            )}

            {/* Reflection Activities */}
            <ReflectionActivities lessonId={lesson.id} courseId={course.id} />

            {/* Lesson Personal Notes */}
            <LessonNotes lessonId={lesson.id} courseId={course.id} />

            {/* Comprehensive Final Exam */}
            {lesson.finalExam && lesson.finalExam.length > 0 ? (
               <div id="final-exam-section" className="mt-8 mb-20 animate-in fade-in duration-700 slide-in-from-bottom-6">
                 <FinalExam 
                   questions={lesson.finalExam} 
                   isPreviouslyCompleted={isPreviouslyCompleted}
                   previousScore={progress.completedLessons[lesson.id]?.score}
                   onComplete={onComplete} 
                 />
               </div>
            ) : (
               <div id="completion-section" className="mt-8 mb-20 animate-in fade-in duration-700 slide-in-from-bottom-6">
                 <div className="bg-white border border-[#E0D7C6] rounded-xl p-8 text-center shadow-sm">
                   <CheckCircle2 className="mx-auto text-emerald-600 mb-3" size={44} />
                   <h3 className="font-bold text-xl text-[#1A2533] mb-2 font-serif">¡Lectura y Formación Concluida!</h3>
                   <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto font-sans">
                     Ha completado todos los bloques pedagógicos de este día. Acredite su participación haciendo clic en el botón inferior.
                   </p>
                   {isPreviouslyCompleted ? (
                      <div className="inline-block bg-emerald-50 text-emerald-800 px-6 py-2.5 rounded font-bold text-xs uppercase tracking-widest border border-emerald-200 font-sans">
                        ¡Clase Acreditada con Éxito! ✅
                      </div>
                   ) : (
                      <button 
                        onClick={() => onComplete(100)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3.5 rounded text-sm font-bold tracking-widest uppercase transition-all shadow-md font-sans cursor-pointer active:scale-95"
                      >
                        Acreditar Clase y Avanzar
                      </button>
                   )}
                 </div>
               </div>
            )}
          </div>
        </div>

        {/* Dedicated Secondary Bible Verse Reader Screen */}
        <BibleVerseModal
          isOpen={activeBibleVerse !== null}
          reference={activeBibleVerse?.reference || ''}
          fallbackText={activeBibleVerse?.text}
          onClose={() => setActiveBibleVerse(null)}
          onSelectCrossReference={(crossRef) => setActiveBibleVerse({ reference: crossRef })}
        />
      </div>
    </VerseContext.Provider>
  );
}

