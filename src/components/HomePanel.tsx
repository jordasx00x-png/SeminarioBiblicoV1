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
    <div className="p-4 sm:p-6 md:p-10 w-full max-w-7xl mx-auto font-sans text-slate-800 pb-28 space-y-8">
      
      {/* 1. Dynamic Time-aware Welcome Hero Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 md:p-10 text-white overflow-hidden shadow-2xl hero-gradient border border-slate-700/60">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-80 h-80 bg-gradient-to-br from-red-600/20 to-amber-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold uppercase tracking-widest text-amber-300 border border-white/15 shadow-2xs">
              <Sparkles size={14} className="text-amber-400" />
              <span>Campus Teológico Digital</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-white leading-tight">
              {timeGreeting}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-amber-100">{studentName}</span>
            </h1>
            
            <p className="text-slate-300 font-sans text-sm md:text-base leading-relaxed">
              Tu centro interactivo de formación bíblica y exégesis. Accede a tus módulos de estudio, consulta recursos teológicos y realiza tus evaluaciones.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigateTab('courses')}
                className="px-6 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer border border-amber-500/30 active:scale-95"
              >
                <BookOpen size={16} />
                <span>Explorar Malla Curricular</span>
              </button>
            </div>
          </div>

          {/* Metric Summary Pill */}
          <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/80 rounded-2xl p-5 shrink-0 flex flex-col gap-3 min-w-[240px]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Avance del Estudiante</span>
              <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                {overallPercentage}%
              </span>
            </div>

            <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden p-0.5 border border-slate-700">
              <div 
                className="bg-gradient-to-r from-amber-500 to-amber-600 h-full rounded-full transition-all duration-500 shadow-xs"
                style={{ width: `${overallPercentage}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300 font-medium pt-1 border-t border-slate-800">
              <span>{completedLessonsCount} de {totalLessons} clases</span>
              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                <CheckCircle2 size={13} /> {completedCoursesCount} acreditados
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Dual-Zone Campus Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column (Main Focus Area - 2/3 width) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Continuation Banner (if student has active studies) */}
          {inProgressCourses.length > 0 && (
            <div className="bg-gradient-to-r from-amber-500/10 via-amber-100/30 to-amber-50/20 border border-amber-300/80 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-800" />
                  <h3 className="font-serif font-bold text-lg text-slate-900">Estudio Activo en Desarrollo</h3>
                </div>
                <span className="text-xs font-bold text-amber-900 bg-amber-200/80 px-3 py-1 rounded-full">
                  {inProgressCourses.length} en marcha
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {inProgressCourses.slice(0, 2).map(course => {
                  const completedCount = course.lessons.filter(l => progress.completedLessons[l.id]).length;
                  const percent = Math.round((completedCount / course.lessons.length) * 100);

                  return (
                    <div 
                      key={course.id}
                      onClick={() => onSelectCourse(course.id)}
                      className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-amber-500/60 transition-all cursor-pointer flex flex-col justify-between group"
                    >
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-amber-800 mb-1">
                          {course.type}
                        </div>
                        <h4 className="font-serif font-bold text-base text-slate-900 group-hover:text-amber-800 transition-colors line-clamp-1">
                          {course.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1">
                          {completedCount} de {course.lessons.length} lecciones completadas
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                        <div className="w-28 bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div className="bg-amber-600 h-full rounded-full" style={{ width: `${percent}%` }} />
                        </div>
                        <span className="text-xs font-bold text-amber-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Reanudar <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quick Malla Curricular Showcase */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-serif font-bold text-slate-900 flex items-center gap-2">
                  <Layers size={22} className="text-amber-700" />
                  Malla Curricular Destacada
                </h2>
                <p className="text-slate-500 text-xs mt-0.5">
                  Acceso directo a las áreas de formación teológica oficiales.
                </p>
              </div>

              <button
                onClick={() => onNavigateTab('courses')}
                className="text-xs font-bold text-amber-800 hover:text-amber-900 flex items-center gap-1 hover:underline cursor-pointer"
              >
                Ver Catálogo Completo <ArrowRight size={14} />
              </button>
            </div>

            {/* Course Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {courses.slice(0, 4).map(course => {
                const total = course.lessons.length;
                const completedReal = course.lessons.filter(l => progress.completedLessons[l.id]).length;
                const percentage = total > 0 ? Math.round((completedReal / total) * 100) : 0;

                return (
                  <div
                    key={course.id}
                    onClick={() => onSelectCourse(course.id)}
                    className="p-5 rounded-2xl border border-slate-200 hover:border-amber-500/50 hover:shadow-md transition-all cursor-pointer bg-slate-50/50 hover:bg-white group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-amber-800 mb-2">
                        <span className="bg-amber-100/80 px-2.5 py-0.5 rounded-full border border-amber-200">
                          {course.type}
                        </span>
                        <span>{course.durationMonths ? `${course.durationMonths} Meses` : '3 Meses'}</span>
                      </div>

                      <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-amber-800 transition-colors line-clamp-1 mb-1">
                        {course.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {course.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                      <div className="text-[11px] font-bold text-slate-500">
                        {completedReal}/{total} Clases
                      </div>
                      <div className="flex items-center gap-1 text-xs font-bold text-amber-800 group-hover:translate-x-1 transition-transform">
                        Ingresar <ArrowRight size={13} />
                      </div>
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
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-amber-500/50 transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform border border-amber-200">
                <Compass size={20} />
              </div>
              <h4 className="font-serif font-bold text-sm text-slate-900 group-hover:text-amber-800">Lector Bíblico</h4>
              <p className="text-xs text-slate-500 mt-1">Interlineal hebreo/griego y notas de estudio.</p>
            </div>

            <div 
              onClick={() => onNavigateTab('calendar')}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-amber-500/50 transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform border border-indigo-200">
                <CalendarIcon size={20} />
              </div>
              <h4 className="font-serif font-bold text-sm text-slate-900 group-hover:text-indigo-800">Plan de 3 Meses</h4>
              <p className="text-xs text-slate-500 mt-1">Cronograma de lecciones y asignaciones.</p>
            </div>

            <div 
              onClick={() => onNavigateTab('grades')}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-amber-500/50 transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform border border-emerald-200">
                <FileText size={20} />
              </div>
              <h4 className="font-serif font-bold text-sm text-slate-900 group-hover:text-emerald-800">Kardex Oficial</h4>
              <p className="text-xs text-slate-500 mt-1">Expediente de boleta y certificados.</p>
            </div>
          </div>
        </div>

        {/* Right Column (Side Command Panel - 1/3 width) */}
        <div className="space-y-6">
          
          {/* Daily Theological Verse Card */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/90 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                  <Quote size={16} /> Versículo del Día
                </span>
                
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono bg-amber-100/80 text-amber-900 px-2.5 py-0.5 rounded-full font-bold border border-amber-200">
                    {daily.reference}
                  </span>

                  <button 
                    onClick={handleCopyVerse}
                    className="p-1.5 text-slate-400 hover:text-amber-800 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                    title="Copiar versículo"
                  >
                    {copiedVerse ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
                  </button>
                </div>
              </div>

              <blockquote className="text-base font-serif italic text-slate-900 mb-4 leading-relaxed">
                &ldquo;{daily.verse}&rdquo;
              </blockquote>

              <div className="bg-slate-50 border-l-3 border-amber-600 p-4 rounded-r-2xl border border-slate-200/60 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                    Comentario Exegético
                  </h4>
                  <button 
                    onClick={() => setShowCommentary(prev => !prev)}
                    className="text-[10px] font-bold text-amber-900 hover:underline cursor-pointer"
                  >
                    {showCommentary ? 'Ocultar' : 'Ver'}
                  </button>
                </div>

                {showCommentary && (
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    {daily.commentary}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-400 flex items-center justify-between">
              <span>Edición Teológica Diaria</span>
              <span>{new Date().toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

