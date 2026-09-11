import { BookOpen, GraduationCap, Calendar as CalendarIcon, FileText, Sparkles, Quote, Bookmark, ArrowRight, CheckCircle2, Home } from 'lucide-react';
import { Course, UserProgress } from '../types';
import { User } from 'firebase/auth';

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

export function HomePanel({ user, customProfile, courses, progress, onNavigateTab }: HomePanelProps) {
  const todayIndex = new Date().getDate() % DAILY_VERSES.length;
  const daily = DAILY_VERSES[todayIndex];

  const studentName = customProfile?.fullName || user?.displayName || 'Estudioso de la Palabra';

  const totalCourses = courses.length;
  const completedCoursesCount = courses.filter(c => {
    return c.lessons.length > 0 && c.lessons.every(l => progress.completedLessons[l.id]);
  }).length;

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto font-serif text-[#2C2C2C] pb-24">
      {/* Welcome Banner */}
      <div className="mb-10 bg-gradient-to-r from-[#1A2533] to-[#2C3E50] text-[#E0D7C6] rounded-2xl p-8 md:p-10 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-sans uppercase tracking-widest text-amber-300 mb-4 font-semibold">
            <Sparkles size={14} /> Seminario Teológico Bíblico
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-3 text-white">
            Paz y gracia, {studentName}
          </h1>
          <p className="text-gray-300 font-sans text-sm md:text-base max-w-2xl leading-relaxed">
            Bienvenido a tu portal de estudio teológico. Selecciona cualquiera de las secciones en el menú izquierdo o navega a través de las opciones principales.
          </p>
        </div>
      </div>

      {/* Daily Verse & Commentary Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 bg-white border border-[#E0D7C6] rounded-2xl p-6 md:p-8 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
              <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#7F1D1D] flex items-center gap-2">
                <Quote size={16} /> Versículo Bíblico del Día
              </span>
              <span className="text-xs font-mono bg-amber-50 text-amber-800 px-2.5 py-1 rounded-full font-bold border border-amber-200">
                {daily.reference}
              </span>
            </div>
            <blockquote className="text-xl md:text-2xl font-serif italic text-[#1A2533] mb-6 leading-relaxed">
              &ldquo;{daily.verse}&rdquo;
            </blockquote>
            <div className="bg-[#FAF7F2] border-l-4 border-[#7F1D1D] p-4 rounded-r-xl">
              <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-[#7F1D1D] mb-1">
                Comentario Teológico y Devocional
              </h4>
              <p className="font-sans text-sm text-gray-700 leading-relaxed">
                {daily.commentary}
              </p>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-sans text-gray-500">
            <span>Actualizado diariamente para edificación espiritual</span>
            <span className="font-bold text-[#1A2533]">{new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>

        {/* Quick Progress Summary */}
        <div className="bg-[#1A2533] text-[#E0D7C6] rounded-2xl p-6 md:p-8 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-sans font-bold uppercase tracking-widest text-amber-300 mb-4 flex items-center gap-2">
              <Bookmark size={14} /> Resumen de Avance
            </h3>
            <div className="space-y-4 font-sans">
              <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-400">Cursos Totales</div>
                  <div className="text-2xl font-black text-white">{totalCourses}</div>
                </div>
                <BookOpen className="text-amber-300/80" size={28} />
              </div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-400">Cursos Acreditados</div>
                  <div className="text-2xl font-black text-emerald-400">{completedCoursesCount}</div>
                </div>
                <CheckCircle2 className="text-emerald-400/80" size={28} />
              </div>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('academic')}
            className="mt-6 w-full py-3 px-4 bg-[#7F1D1D] hover:bg-[#601515] text-white font-sans text-sm font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            Abrir La Biblia <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Main Navigation Sections Grid */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#1A2533] mb-2">Apartados Principales</h2>
        <p className="text-gray-600 font-sans text-sm mb-6">
          Accede directamente a cualquier sección de tu formación ministerial.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. Catálogo de Cursos */}
          <div 
            onClick={() => onNavigateTab('courses')}
            className="group bg-white border border-[#E0D7C6] hover:border-[#1A2533] rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-start gap-5"
          >
            <div className="w-14 h-14 bg-[#1A2533] text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform">
              <BookOpen size={28} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-bold text-[#1A2533] group-hover:text-[#7F1D1D] transition-colors">Catálogo de Cursos</h3>
                <span className="text-[10px] font-sans font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">Principal</span>
              </div>
              <p className="font-sans text-sm text-gray-600 leading-relaxed mb-4">
                Explora el plan de estudios completo: desde estudios bíblicos y materias especializadas hasta Licenciatura, Maestría y Doctorado.
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs font-sans font-bold text-[#7F1D1D] group-hover:underline">
                Abrir Catálogo <ArrowRight size={14} />
              </span>
            </div>
          </div>

          {/* 2. La Biblia */}
          <div 
            onClick={() => onNavigateTab('academic')}
            className="group bg-white border border-[#E0D7C6] hover:border-[#1A2533] rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-start gap-5"
          >
            <div className="w-14 h-14 bg-[#7F1D1D] text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform">
              <BookOpen size={28} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-bold text-[#1A2533] group-hover:text-[#7F1D1D] transition-colors">La Biblia</h3>
                <span className="text-[10px] font-sans font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">Estudio Exegético</span>
              </div>
              <p className="font-sans text-sm text-gray-600 leading-relaxed mb-4">
                Estudia las Escrituras con múltiples versiones (RVR1960, LBLA, NTV, NVI), análisis interlineal hebreo y griego, comentarios teológicos y herramientas históricas.
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs font-sans font-bold text-[#7F1D1D] group-hover:underline">
                Abrir La Biblia <ArrowRight size={14} />
              </span>
            </div>
          </div>

          {/* 3. Plan de Estudio */}
          <div 
            onClick={() => onNavigateTab('calendar')}
            className="group bg-white border border-[#E0D7C6] hover:border-[#1A2533] rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-start gap-5"
          >
            <div className="w-14 h-14 bg-amber-700 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform">
              <CalendarIcon size={28} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-bold text-[#1A2533] group-hover:text-[#7F1D1D] transition-colors">Plan de Estudio</h3>
                <span className="text-[10px] font-sans font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">Cronograma</span>
              </div>
              <p className="font-sans text-sm text-gray-600 leading-relaxed mb-4">
                Consulta el calendario estructurado de 3 meses diseñado para optimizar tu ritmo de lectura bíblica, asignaciones y exámenes.
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs font-sans font-bold text-[#7F1D1D] group-hover:underline">
                Ver Plan de Estudio <ArrowRight size={14} />
              </span>
            </div>
          </div>

          {/* 4. Boleta Final */}
          <div 
            onClick={() => onNavigateTab('grades')}
            className="group bg-white border border-[#E0D7C6] hover:border-[#1A2533] rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-start gap-5"
          >
            <div className="w-14 h-14 bg-emerald-700 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform">
              <FileText size={28} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-bold text-[#1A2533] group-hover:text-[#7F1D1D] transition-colors">Boleta Final</h3>
                <span className="text-[10px] font-sans font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded">Calificaciones</span>
              </div>
              <p className="font-sans text-sm text-gray-600 leading-relaxed mb-4">
                Revisa tu expediente de calificaciones oficiales, puntajes obtenidos en exámenes y certificados de acreditación ministerial.
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs font-sans font-bold text-[#7F1D1D] group-hover:underline">
                Ver Boleta Final <ArrowRight size={14} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
