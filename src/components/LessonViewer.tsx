import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Lesson, Course, UserProgress } from '../types';
import { FinalExam } from './FinalExam';
import { ReinforcementVerses } from './ReinforcementVerses';
import { LessonAssignments } from './LessonAssignments';
import { NotebookActivities } from './NotebookActivities';
import { FormattedContent, VerseContext } from './FormattedContent';
import { InteractiveCheckpoint } from './InteractiveCheckpoint';
import { ReadingToolbar } from './ReadingToolbar';
import { BibleVerseModal } from './BibleVerseModal';
import { ArrowLeft, BookOpen, CheckCircle2, Clock, Target, ExternalLink, GraduationCap, Sparkles, BookMarked, Compass, ShieldCheck, Quote } from 'lucide-react';

interface LessonViewerProps {
  key?: string | number;
  lesson: Lesson;
  course: Course;
  progress: UserProgress;
  onComplete: (score: number) => void;
  onBack: () => void;
  onOpenAssistant?: () => void;
  onOpenBible?: (reference: string, fallbackText?: string) => void;
}

export function LessonViewer({ lesson, course, progress, onComplete, onBack, onOpenAssistant, onOpenBible }: LessonViewerProps) {
  const isPreviouslyCompleted = !!progress.completedLessons[lesson.id];
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [readingTheme, setReadingTheme] = useState<'paper' | 'sepia' | 'contrast'>('paper');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeBibleVerse, setActiveBibleVerse] = useState<{ reference: string; text?: string } | null>(null);

  const handleShowVerse = (reference: string, text?: string) => {
    if (onOpenBible) {
      onOpenBible(reference, text);
    } else {
      setActiveBibleVerse({ reference, text });
    }
  };

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

  // Typography size classes
  const fontClass = {
    normal: 'text-base md:text-lg leading-relaxed',
    large: 'text-lg md:text-xl leading-relaxed',
    xlarge: 'text-xl md:text-2xl leading-loose'
  }[fontSize];

  // Theme classes
  const themeCardClass = {
    paper: 'bg-white dark:bg-slate-900 border-[#E0D7C6] dark:border-slate-800 text-[#2C2C2C] dark:text-slate-100',
    sepia: 'bg-[#FBF7EE] dark:bg-[#1C1814] border-[#E5D7B7] dark:border-[#332A22] text-[#3D332A] dark:text-[#E8DFC9]',
    contrast: 'bg-[#182330] border-[#2C3E50] text-[#EBE6DF]'
  }[readingTheme];

  const themeTitleClass = {
    paper: 'text-[#1A2533] dark:text-stone-100',
    sepia: 'text-[#2D1E12] dark:text-[#F4ECD8]',
    contrast: 'text-white'
  }[readingTheme];

  return (
    <VerseContext.Provider value={{ onSelectVerse: (ref) => handleShowVerse(ref) }}>
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
                onClick={() => handleShowVerse(lesson.baseVerse!.reference, lesson.baseVerse!.text)}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold bg-[#D1B17F]/20 hover:bg-[#D1B17F]/30 text-[#E0D7C6] border border-[#D1B17F]/40 transition-all font-sans cursor-pointer"
                title="Ver versículo en el visor bíblico"
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
          onOpenBibleViewer={() => handleShowVerse( 
            lesson.baseVerse?.reference || 'Gálatas 2:16', 
            lesson.baseVerse?.text 
          )}
        />

        <div className="flex-1 p-4 md:p-8 flex gap-8 bg-[#FDFCFB] dark:bg-slate-950 justify-center transition-all duration-300 ease-out">
          <div className="flex-1 flex flex-col gap-6 max-w-[850px] w-full transition-all duration-300 ease-out">
            
            {/* Main Article Container */}
            <article className={`border rounded-xl p-6 md:p-10 shadow-sm flex flex-col gap-6 relative font-serif transition-colors ${themeCardClass}`}>
              
              {/* Header metadata */}
              <div className="border-b border-[#E0D7C6]/60 dark:border-slate-800 pb-5">
                <div className="flex items-center gap-2 text-xs font-sans text-stone-500 dark:text-stone-400 mb-2">
                  <span className="font-semibold text-[#7F1D1D] dark:text-amber-400 uppercase tracking-widest text-[11px]">
                    Día {lesson.day}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock size={13} />
                    {lesson.estimatedMinutes || 45} min de formación
                  </span>
                </div>

                <h1 className={`text-2xl md:text-4xl mb-3 font-bold font-serif leading-tight ${themeTitleClass}`}>
                  {lesson.title}
                </h1>

                {/* Objectives */}
                {lesson.objectives && lesson.objectives.length > 0 && (
                  <div className="mt-4 p-4 rounded-lg bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 font-sans">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-800 dark:text-stone-200 uppercase tracking-wider mb-2">
                      <Target size={14} className="text-[#7F1D1D] dark:text-amber-400" />
                      <span>Objetivos Pedagógicos de la Clase</span>
                    </div>
                    <ul className="space-y-1.5">
                      {lesson.objectives.map((obj, i) => (
                        <li key={i} className="text-xs md:text-sm text-stone-700 dark:text-stone-300 flex items-start gap-2">
                          <span className="text-[#7F1D1D] dark:text-amber-400 font-bold mt-0.5">•</span>
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Guía de Lectura Bíblica (Límite Máximo: 20 min) */}
              {(() => {
                const bibleReadingTime = lesson.bibleReadingTimeMinutes || (lesson.bibleReadingPlan?.totalReadingTimeMinutes) || 13;
                return (
                  <div className="bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg p-4 font-sans flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs my-1">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#7F1D1D] text-amber-200 flex items-center justify-center shrink-0">
                        <BookOpen size={17} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900 dark:text-stone-100">
                            Plan de Lectura Bíblica Dirigido
                          </h4>
                          <span className="text-stone-500 text-xs">
                            · ~{bibleReadingTime} min de lectura (máx. 20 min)
                          </span>
                        </div>
                        <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
                          Lectura estructurada del texto sagrado: versículo principal y pasajes complementarios de soporte.
                        </p>
                      </div>
                    </div>
                    {lesson.baseVerse && (
                      <button
                        onClick={() => handleShowVerse(lesson.baseVerse!.reference, lesson.baseVerse!.text)}
                        className="flex items-center gap-1.5 text-xs font-semibold text-[#7F1D1D] dark:text-amber-400 hover:underline shrink-0 cursor-pointer"
                      >
                        <span>Pasaje: <strong>{lesson.baseVerse.reference}</strong></span>
                      </button>
                    )}
                  </div>
                );
              })()}

              {/* Base Verse: Versículo Principal de la Clase */}
              {lesson.baseVerse && (
                <div className="space-y-4 my-2">
                  <div 
                    onClick={() => handleShowVerse(lesson.baseVerse!.reference, lesson.baseVerse!.text)}
                    className="bg-stone-50/70 dark:bg-stone-900 border-l-2 border-[#7F1D1D] dark:border-amber-400 p-6 rounded-r-lg shadow-xs hover:bg-stone-50 dark:hover:bg-stone-850 border border-stone-200/80 dark:border-stone-800 transition-colors cursor-pointer group relative"
                    title="Haga clic para consultar este versículo en el visor bíblico"
                  >
                    <div className="flex items-center justify-between text-[#7F1D1D] dark:text-amber-400 mb-3 font-sans">
                      <div className="flex items-center gap-2 flex-wrap">
                        <BookMarked size={16} />
                        <span className="text-xs font-semibold uppercase tracking-wider">Versículo Principal</span>
                        <span className="text-xs text-stone-500 dark:text-stone-400">
                          · ~{lesson.baseVerse.readingTimeMinutes || 5} min de lectura
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-[#7F1D1D] dark:text-amber-300 flex items-center gap-1 group-hover:underline">
                        <span>Ver pasaje</span>
                        <ExternalLink size={12} />
                      </span>
                    </div>
                    <p className="text-xl md:text-2xl font-serif italic text-stone-900 dark:text-stone-100 mb-3 leading-relaxed">
                      &ldquo;{lesson.baseVerse.text}&rdquo;
                    </p>
                    <div className="flex items-center justify-between font-sans pt-2 border-t border-stone-200/60 dark:border-stone-800">
                      <span className="text-xs text-stone-500 dark:text-stone-400 italic">
                        Texto Bíblico Base para la Exégesis y Doctrina Central
                      </span>
                      <p className="text-sm font-semibold text-[#7F1D1D] dark:text-amber-400 uppercase tracking-wider font-sans">
                        — {lesson.baseVerse.reference}
                      </p>
                    </div>
                  </div>

                  {/* Explicación Teológica y Exegética del Versículo Principal */}
                  {lesson.theologicalExegesis ? (
                    <div className="bg-stone-50/90 dark:bg-slate-800/90 border border-amber-300/80 dark:border-amber-800/60 rounded-xl p-5 md:p-7 space-y-4 font-sans text-stone-800 dark:text-slate-200 shadow-xs">
                      <div className="flex items-center gap-2 pb-3 border-b border-amber-200/70 dark:border-slate-700">
                        <GraduationCap className="w-5 h-5 text-[#7F1D1D] dark:text-amber-400" />
                        <h3 className="font-serif font-bold text-lg md:text-xl text-[#1A2533] dark:text-amber-200">
                          {lesson.theologicalExegesis.title || `Explicación Teológica y Exegética (${lesson.baseVerse.reference})`}
                        </h3>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-stone-200/90 dark:border-slate-800 shadow-2xs">
                          <h4 className="text-xs font-bold text-[#7F1D1D] dark:text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <Compass size={14} />
                            Contexto Histórico y Gramatical
                          </h4>
                          <p className="text-xs md:text-sm text-stone-700 dark:text-slate-300 leading-relaxed font-sans">
                            {lesson.theologicalExegesis.historicalGrammaticalContext}
                          </p>
                        </div>

                        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-stone-200/90 dark:border-slate-800 shadow-2xs">
                          <h4 className="text-xs font-bold text-[#7F1D1D] dark:text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <BookOpen size={14} />
                            Análisis Teológico Doctrinal
                          </h4>
                          <p className="text-xs md:text-sm text-stone-700 dark:text-slate-300 leading-relaxed font-sans">
                            {lesson.theologicalExegesis.theologicalAnalysis}
                          </p>
                        </div>

                        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-stone-200/90 shadow-2xs">
                          <h4 className="text-xs font-bold text-[#7F1D1D] dark:text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <Sparkles size={14} />
                            Enfoque Cristocéntrico
                          </h4>
                          <p className="text-xs md:text-sm text-stone-700 dark:text-slate-300 leading-relaxed font-sans">
                            {lesson.theologicalExegesis.christocentricFocus}
                          </p>
                        </div>

                        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-stone-200/90 dark:border-slate-800 shadow-2xs">
                          <h4 className="text-xs font-bold text-[#7F1D1D] dark:text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <ShieldCheck size={14} />
                            Aplicación Pastoral y Doctrinal
                          </h4>
                          <p className="text-xs md:text-sm text-stone-700 dark:text-slate-300 leading-relaxed font-sans">
                            {lesson.theologicalExegesis.doctrinalApplication}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-stone-50/90 dark:bg-slate-800/90 border border-amber-300/80 dark:border-amber-800/60 rounded-xl p-5 md:p-6 font-sans text-stone-800 dark:text-slate-200 shadow-xs">
                      <h4 className="font-serif font-bold text-base text-[#1A2533] dark:text-amber-200 mb-2 flex items-center gap-2">
                        <GraduationCap size={18} className="text-[#7F1D1D] dark:text-amber-400" />
                        <span>Desarrollo Teológico del Versículo Principal ({lesson.baseVerse.reference})</span>
                      </h4>
                      <p className="text-xs md:text-sm text-stone-700 dark:text-slate-300 leading-relaxed font-sans">
                        Este versículo principal articula el fundamento bíblico inerrante para la lección de hoy. A través de un análisis sintáctico y contextual, extraemos las implicaciones doctrinales que sustentan la fe histórica, conectando directamente con el tema de <strong>{lesson.title}</strong>.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Content Blocks: Text, Interactive Checkpoints, and Notes */}
              <div className="space-y-6 mt-2">
                {lesson.blocks.map((block) => {
                  if (block.type === 'text') {
                    return (
                      <div key={block.id} className="animate-in fade-in duration-300">
                        <FormattedContent 
                          className={`text-gray-800 dark:text-slate-200 leading-relaxed font-serif ${fontClass}`}
                          content={block.content}
                          onSelectVerse={(ref) => handleShowVerse(ref)}
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
                        <div className="bg-[#FAF9F6] dark:bg-slate-800/80 border-2 border-dashed border-[#D1B17F] dark:border-amber-600/60 rounded-xl p-6 md:p-8 relative overflow-hidden my-4">
                          <div className="absolute top-0 right-0 p-3 opacity-10">
                            <BookOpen size={64} className="text-[#1A2533] dark:text-stone-100" />
                          </div>
                          <h4 className="text-xs md:text-sm font-bold text-[#7F1D1D] dark:text-amber-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2 font-sans">
                            <CheckCircle2 size={16} />
                            Puntos Clave para su Libreta Teológica
                          </h4>
                          <FormattedContent 
                            className="text-[#1A2533] dark:text-slate-200 leading-relaxed font-sans text-sm md:text-base prose prose-sm dark:prose-invert max-w-none"
                            content={block.content}
                            onSelectVerse={(ref) => handleShowVerse(ref)}
                          />
                        </div>
                      </div>
                    );
                  }

                  return null;
                })}
              </div>

              {/* Comentarios de Teólogos e Historiadores Clave */}
              {lesson.commentaries && lesson.commentaries.length > 0 && (
                <div className="mt-8 pt-6 border-t border-[#E0D7C6]/60 dark:border-slate-800 space-y-4">
                  <div className="flex items-center gap-2 text-[#7F1D1D] dark:text-amber-400 font-sans">
                    <Quote size={20} />
                    <h3 className="text-base md:text-lg font-bold font-serif text-[#1A2533] dark:text-amber-200">
                      Comentarios Teológicos e Históricos Relevantes
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {lesson.commentaries.map((c, idx) => (
                      <div key={idx} className="bg-stone-50/90 dark:bg-slate-800/90 p-4 md:p-5 rounded-xl border border-[#D1B17F]/40 dark:border-slate-700 shadow-2xs font-sans flex flex-col justify-between">
                        <p className="text-xs md:text-sm font-serif italic text-stone-800 dark:text-slate-200 leading-relaxed mb-3">
                          "{c.text}"
                        </p>
                        <div className="flex items-center justify-between pt-2 border-t border-stone-200/60 dark:border-slate-700 text-[11px]">
                          <span className="font-bold text-[#7F1D1D] dark:text-amber-400 uppercase tracking-wider">
                            — {c.author}
                          </span>
                          <span className="text-stone-500 dark:text-slate-400 bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-stone-200 dark:border-slate-800">
                            Teólogo Histórico
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </article>

            {/* Notebook / Physical Cuaderno Activities Section */}
            <NotebookActivities 
              lesson={lesson} 
              courseTitle={course.title} 
            />

            {/* Reinforcement Verses */}
            {lesson.verses && lesson.verses.length > 0 && (
              <ReinforcementVerses 
                verses={lesson.verses} 
                onSelectVerse={(v) => handleShowVerse(v.reference, v.text)}
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

        {/* Dedicated Secondary Bible Verse Reader Screen (when not opened in split mode) */}
        {!onOpenBible && (
          <BibleVerseModal
            isOpen={activeBibleVerse !== null}
            reference={activeBibleVerse?.reference || ''}
            fallbackText={activeBibleVerse?.text}
            onClose={() => setActiveBibleVerse(null)}
            onSelectCrossReference={(crossRef) => setActiveBibleVerse({ reference: crossRef })}
          />
        )}
      </div>
    </VerseContext.Provider>
  );
}

