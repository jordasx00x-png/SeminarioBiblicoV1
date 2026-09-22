import { useState } from 'react';
import { BookOpen, GraduationCap, Calendar as CalendarIcon, FileText, Sparkles, Quote, Bookmark, ArrowRight, CheckCircle2, Home, Copy, Share2, Check, Flame, Trophy, Clock, Search, Layers, Compass } from 'lucide-react';
import { Course, UserProgress } from '../types';
import { User } from 'firebase/auth';
import { motion } from 'motion/react';

interface HomePanelProps {
  user?: User | null;
  customProfile?: { fullName?: string; email?: string; phoneNumber?: string };
  courses: Course[];
  progress: UserProgress;
  onNavigateTab: (tab: 'home' | 'courses' | 'academic' | 'calendar' | 'grades') => void;
  onSelectCourse: (courseId: string) => void;
}

const DAILY_VERSES = [
  {
    reference: "Josué 1:9",
    verse: "Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes, porque Jehová tu Dios estará contigo en dondequiera que vayas.",
    commentary: "Este mandamiento divino dado a Josué tras la muerte de Moisés enfatiza que el éxito ministerial no descansa en las capacidades humanas, sino en la fidelidad y la presencia inquebrantable de Dios. El valor cristiano nace de la certeza de la soberanía divina."
  },
  {
    reference: "Romanos 11:36",
    verse: "Porque de él, y por él, y para él, son todas las cosas. A él sea la gloria por los siglos. Amén.",
    commentary: "Una de las doxologías más profundas del apóstol Pablo. Afirma que Dios es el Creador (de él), el Sustentador (por él) y el Fin último (para él) de todo el universo. Todo estudio teológico y pastoral debe converger en esta adoración doxológica."
  },
  {
    reference: "Salmos 119:105",
    verse: "Lámpara es a mis pies tu palabra, y lumbrera a mi camino.",
    commentary: "En el mundo antiguo, las lámparas de aceite portátiles iluminaban solo el siguiente paso inmediato en la oscuridad del sendero. La Palabra de Dios no siempre revela todo el futuro de golpe, pero otorga la guía precisa y suficiente para caminar en obediencia hoy."
  },
  {
    reference: "Colosenses 3:16",
    verse: "La palabra de Cristo more en abundancia en vosotros, enseñándoos y exhortándoos unos a otros en toda sabiduría...",
    commentary: "El apóstol exhorta a que la doctrina de Cristo no sea un conocimiento superficial, sino que habite ricamente en el creyente, transformando los afectos, la enseñanza comunitaria y la sabiduría práctica diaria."
  }
];

export function HomePanel({ user, customProfile, courses, progress, onNavigateTab, onSelectCourse }: HomePanelProps) {
  const [copiedVerse, setCopiedVerse] = useState(false);
  const [showCommentary, setShowCommentary] = useState(true);

  const todayIndex = new Date().getDate() % DAILY_VERSES.length;
  const daily = DAILY_VERSES[todayIndex];

  const studentName = customProfile?.fullName || user?.displayName || 'Estudioso de la Palabra';

  const currentHour = new Date().getHours();
  const timeGreeting = currentHour < 12 ? '¡Buenos días' : currentHour < 19 ? '¡Buenas tardes' : '¡Buenas noches';

  const totalCourses = courses.length;
  const completedCoursesCount = courses.filter(c => {
    return c.lessons.length > 0 && c.lessons.every(l => progress.completedLessons[l.id]);
  }).length;

  const totalLessons = courses.reduce((acc, c) => acc + c.lessons.length, 0);
  const completedLessonsCount = Object.keys(progress.completedLessons).length;
  const overallPercentage = totalLessons > 0 ? Math.round((completedLessonsCount / totalLessons) * 100) : 0;

  // Find active course in progress
  const inProgressCourses = courses.filter(c => {
    const completedInCourse = c.lessons.filter(l => progress.completedLessons[l.id]).length;
    return completedInCourse > 0 && completedInCourse < c.lessons.length;
  });

  const handleCopyVerse = () => {
    navigator.clipboard.writeText(`"${daily.verse}" — ${daily.reference}`);
    setCopiedVerse(true);
    setTimeout(() => setCopiedVerse(false), 2000);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 w-full max-w-7xl mx-auto font-sans text-stone-800 dark:text-stone-100 pb-28 space-y-8">
      
      {/* 1. Academic Welcome Banner: High Fidelity Institutional Style */}
      <div className="rounded-xl p-8 sm:p-10 md:p-12 text-[#1A2533] bg-[#FAF9F5] border border-stone-300 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#7F1D1D]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#D1B17F]/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />
        
        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-[#7F1D1D]" />
              <span className="text-[10px] font-bold tracking-[0.3em] text-[#7F1D1D] uppercase">
                Campus Teológico Superior
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black text-[#1A2533] tracking-tight leading-[1.1]">
              {timeGreeting}, <br className="hidden sm:block" /> {studentName}
            </h1>
            
            <p className="text-stone-600 font-serif italic text-base md:text-lg leading-relaxed max-w-xl">
              "Escudriñad las Escrituras; porque a vosotros os parece que en ellas tenéis la vida eterna; y ellas son las que dan testimonio de mí."
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => onNavigateTab('courses')}
                className="px-8 py-3 bg-[#1A2533] hover:bg-black text-white font-bold text-xs uppercase tracking-widest rounded transition-all shadow-md flex items-center gap-3 cursor-pointer group active:scale-95"
              >
                <BookOpen size={18} strokeWidth={1.5} />
                <span>Explorar Programas</span>
              </button>
              <button
                onClick={() => onNavigateTab('academic')}
                className="px-8 py-3 bg-white hover:bg-stone-50 text-[#1A2533] font-bold text-xs uppercase tracking-widest rounded transition-all border border-stone-300 flex items-center gap-3 cursor-pointer shadow-sm active:scale-95"
              >
                <Compass size={18} strokeWidth={1.5} className="text-[#7F1D1D]" />
                <span>Visor Canónico</span>
              </button>
            </div>
          </div>

          {/* Metric Summary Block: Museum Label Style */}
          <div className="bg-white border border-stone-300 rounded-lg p-6 shrink-0 flex flex-col gap-4 min-w-[280px] shadow-sm relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#7F1D1D]" />
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Acreditación Académica</span>
              <span className="text-xl font-serif font-bold text-[#1A2533] tabular-nums">
                {overallPercentage}%
              </span>
            </div>

            <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-[#7F1D1D] h-full transition-all duration-700"
                style={{ width: `${overallPercentage}%` }}
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[10px] text-stone-600 font-bold uppercase tracking-widest">
                <span>Progreso</span>
                <span className="tabular-nums">{completedLessonsCount} / {totalLessons}</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-emerald-700 font-bold uppercase tracking-widest bg-emerald-50 px-2 py-1 rounded border border-emerald-100">
                <CheckCircle2 size={12} strokeWidth={2.5} /> 
                <span>{completedCoursesCount} Materias Oficiales Acreditadas</span>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Program Tiers Footnote */}
        <div className="mt-10 pt-6 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest">
          <div className="flex items-center gap-4">
            <span className="text-[#7F1D1D]">Grados Facultativos:</span>
            <span>Bachillerato Teológico</span>
            <span className="text-stone-300">|</span>
            <span>Licenciatura Superior</span>
            <span className="text-stone-300">|</span>
            <span>Maestría Divinidades</span>
            <span className="text-stone-300">|</span>
            <span>Doctorado</span>
          </div>
          <span className="text-stone-500 font-serif italic normal-case tracking-normal">Ciclo Académico 2026-2027</span>
        </div>
      </div>

      {/* 2. Main Dual-Zone Campus Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        
        {/* Left Column (Main Focus Area - 2/3 width) */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* Continuation Banner (if student has active studies) */}
          {inProgressCourses.length > 0 && (
            <div className="bg-[#FAF9F5] border border-stone-200 rounded-lg p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-6 bg-[#7F1D1D]" />
                  <h3 className="font-serif font-black text-xl text-[#1A2533] dark:text-stone-100 uppercase tracking-tight">Estudios en Desarrollo</h3>
                </div>
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest bg-stone-100 px-2 py-1 rounded">
                  {inProgressCourses.length} Activos
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {inProgressCourses.slice(0, 2).map(course => {
                  const completedCount = course.lessons.filter(l => progress.completedLessons[l.id]).length;
                  const percent = Math.round((completedCount / course.lessons.length) * 100);

                  return (
                    <div 
                      key={course.id}
                      onClick={() => onSelectCourse(course.id)}
                      className="bg-white dark:bg-stone-900 p-6 rounded border border-stone-200 dark:border-stone-800 hover:border-[#7F1D1D] shadow-sm transition-all cursor-pointer flex flex-col justify-between group active:scale-[0.98]"
                    >
                      <div>
                        <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#7F1D1D] dark:text-amber-500 mb-2">
                          {course.type}
                        </div>
                        <h4 className="font-serif font-bold text-base text-[#1A2533] dark:text-stone-100 group-hover:text-[#7F1D1D] transition-colors line-clamp-1 mb-1">
                          {course.title}
                        </h4>
                        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-1">
                          {completedCount} / {course.lessons.length} Acreditados
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                        <div className="w-24 bg-stone-100 dark:bg-stone-800 h-1 overflow-hidden">
                          <div className="bg-[#7F1D1D] h-full transition-all duration-500" style={{ width: `${percent}%` }} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#7F1D1D] dark:text-amber-400 flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                          Continuar <ArrowRight size={14} strokeWidth={2.5} />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quick Malla Curricular Showcase */}
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-6 md:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 dark:border-stone-800 pb-4">
              <div>
                <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <Layers size={20} className="text-[#7F1D1D] dark:text-amber-400" />
                  Malla Curricular Destacada
                </h2>
                <p className="text-stone-500 dark:text-stone-400 text-xs mt-0.5">
                  Acceso a las áreas de formación teológica y bíblica oficiales.
                </p>
              </div>

              <button
                onClick={() => onNavigateTab('courses')}
                className="text-xs font-semibold text-[#7F1D1D] dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                Ver Catálogo Completo <ArrowRight size={14} />
              </button>
            </div>

            {/* Course Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {courses.slice(0, 4).map(course => {
                const total = course.lessons.length;
                const completedReal = course.lessons.filter(l => progress.completedLessons[l.id]).length;

                return (
                  <div
                    key={course.id}
                    onClick={() => onSelectCourse(course.id)}
                    className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-[#D1B17F] transition-colors cursor-pointer bg-stone-50/50 dark:bg-stone-800/40 hover:bg-white dark:hover:bg-stone-800 group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-2">
                        <span className="font-semibold text-[#7F1D1D] dark:text-amber-400 uppercase text-[10px] tracking-wider">
                          {course.type}
                        </span>
                        <span>·</span>
                        <span>{course.durationMonths ? `${course.durationMonths} Meses` : '3 Meses'}</span>
                      </div>

                      <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 group-hover:text-[#7F1D1D] dark:group-hover:text-amber-400 transition-colors line-clamp-1 mb-1">
                        {course.title}
                      </h3>
                      <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2 leading-relaxed">
                        {course.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-200/60 dark:border-stone-700/60 flex items-center justify-between text-xs">
                      <span className="text-stone-500 dark:text-stone-400 tabular-nums">
                        {completedReal}/{total} Clases
                      </span>
                      <span className="font-semibold text-[#7F1D1D] dark:text-amber-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        Ingresar <ArrowRight size={13} />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Direct Module Navigation Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div 
              onClick={() => onNavigateTab('academic')}
              className="bg-white dark:bg-stone-900 p-5 rounded-xl border border-stone-200 dark:border-stone-800 shadow-xs hover:border-[#D1B17F] transition-colors cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-lg bg-stone-100 dark:bg-stone-800 text-[#7F1D1D] dark:text-amber-400 flex items-center justify-center mb-3 border border-stone-200 dark:border-stone-700">
                <Compass size={20} />
              </div>
              <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-[#7F1D1D] dark:group-hover:text-amber-400">Lector Bíblico</h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">Interlineal hebreo/griego y exégesis profunda.</p>
            </div>

            <div 
              onClick={() => onNavigateTab('calendar')}
              className="bg-white dark:bg-stone-900 p-5 rounded-xl border border-stone-200 dark:border-stone-800 shadow-xs hover:border-[#D1B17F] transition-colors cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 flex items-center justify-center mb-3 border border-stone-200 dark:border-stone-700">
                <CalendarIcon size={20} />
              </div>
              <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-[#7F1D1D] dark:group-hover:text-amber-400">Cronograma</h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">Plan estructurado de lecciones y asignaciones.</p>
            </div>

            <div 
              onClick={() => onNavigateTab('grades')}
              className="bg-white dark:bg-stone-900 p-5 rounded-xl border border-stone-200 dark:border-stone-800 shadow-xs hover:border-[#D1B17F] transition-colors cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 flex items-center justify-center mb-3 border border-stone-200 dark:border-stone-700">
                <FileText size={20} />
              </div>
              <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-[#7F1D1D] dark:group-hover:text-amber-400">Kardex Oficial</h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">Expediente de boleta y certificaciones oficiales.</p>
            </div>
          </div>
        </div>

        {/* Right Column (Side Panel - 1/3 width) */}
        <div className="space-y-6">
          
          {/* Daily Theological Verse Card */}
          <div className="bg-white dark:bg-stone-900 rounded-xl p-6 shadow-xs border border-stone-200 dark:border-stone-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-100 dark:border-stone-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#7F1D1D] dark:text-amber-400 flex items-center gap-1.5">
                  <Quote size={15} /> Versículo del Día
                </span>
                
                <div className="flex items-center gap-2">
                  <span className="text-xs font-serif font-semibold text-stone-700 dark:text-stone-300">
                    {daily.reference}
                  </span>

                  <button 
                    onClick={handleCopyVerse}
                    className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded transition-colors cursor-pointer"
                    title="Copiar versículo"
                  >
                    {copiedVerse ? <Check size={15} className="text-emerald-600" /> : <Copy size={15} />}
                  </button>
                </div>
              </div>

              <blockquote className="text-base font-serif italic text-stone-900 dark:text-stone-100 mb-4 leading-relaxed border-l-2 border-[#D1B17F] pl-4">
                &ldquo;{daily.verse}&rdquo;
              </blockquote>

              <div className="bg-stone-50 dark:bg-stone-800/60 p-4 rounded-lg border border-stone-200/80 dark:border-stone-700/80 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-[11px] font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-400">
                    Comentario Exegético
                  </h4>
                  <button 
                    onClick={() => setShowCommentary(prev => !prev)}
                    className="text-[11px] font-semibold text-[#7F1D1D] dark:text-amber-400 hover:underline cursor-pointer"
                  >
                    {showCommentary ? 'Ocultar' : 'Ver'}
                  </button>
                </div>

                {showCommentary && (
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-sans">
                    {daily.commentary}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-400 flex items-center justify-between">
              <span>Edición Teológica Diaria</span>
              <span>{new Date().toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}</span>
            </div>
          </div>

          {/* Student Academic Dossier Card */}
          <div className="bg-white dark:bg-stone-900 rounded-xl p-6 shadow-xs border border-stone-200 dark:border-stone-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#7F1D1D] dark:text-amber-400 flex items-center gap-1.5">
                <GraduationCap size={15} /> Expediente del Alumno
              </span>
              <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                Matrícula Activa
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-stone-100 dark:border-stone-800/60">
                <span className="text-stone-500 dark:text-stone-400">Estudiante:</span>
                <span className="font-semibold text-stone-800 dark:text-stone-200 truncate max-w-[170px]">{studentName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100 dark:border-stone-800/60">
                <span className="text-stone-500 dark:text-stone-400">Clases Acreditadas:</span>
                <span className="font-semibold text-stone-800 dark:text-stone-200 tabular-nums">{completedLessonsCount} de {totalLessons}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100 dark:border-stone-800/60">
                <span className="text-stone-500 dark:text-stone-400">Régimen Curricular:</span>
                <span className="font-semibold text-[#7F1D1D] dark:text-amber-400">Presencial / En Línea</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-stone-500 dark:text-stone-400">Rendimiento Académico:</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums">98.5% (Sobresaliente)</span>
              </div>
            </div>

            <button
              onClick={() => onNavigateTab('grades')}
              className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer mt-2"
            >
              <FileText size={14} />
              <span>Ver Kardex y Boleta Oficial</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

