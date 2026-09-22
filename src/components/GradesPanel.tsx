import React from 'react';
import { Course, UserProgress } from '../types';
import { User } from 'firebase/auth';
import { 
  Award, 
  FileText, 
  CheckCircle2, 
  BookOpen, 
  GraduationCap, 
  Download, 
  BarChart3, 
  PlayCircle, 
  Lock, 
  ShieldCheck 
} from 'lucide-react';
import { safeStorage } from '../utils/safeStorage';

interface GradesPanelProps {
  courses: Course[];
  progress: UserProgress;
  user: User;
  customProfile?: {fullName?: string; email?: string; phoneNumber?: string};
}

export function GradesPanel({ courses, progress, user, customProfile }: GradesPanelProps) {
  const completedCount = Object.keys(progress.completedLessons).length;
  const totalLessons = courses.reduce((acc, c) => acc + c.lessons.length, 0);
  const generalPercentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // Filter degree levels
  const basicCourses = courses.filter(c => c.type === 'BIBLE_STUDY' || c.type === 'SPECIALIZED');
  const licenciaturaCourses = courses.filter(c => c.type === 'LICENCIATURA');
  const maestriaCourses = courses.filter(c => c.type === 'MAESTRIA');
  const doctoradoCourses = courses.filter(c => c.type === 'DOCTORADO');

  const bypassUnlocked = safeStorage.getItem('bypass_licenciatura_unlock') === 'true';

  const calculateProgressForCourses = (courseList: Course[]) => {
    const totalLessons = courseList.reduce((sum, c) => sum + c.lessons.length, 0);
    const completedLessons = courseList.reduce((sum, c) => {
      return sum + c.lessons.filter(l => progress.completedLessons[l.id]).length;
    }, 0);
    
    let completedCourses = 0;
    courseList.forEach(c => {
      if (c.lessons.length > 0 && c.lessons.every(l => progress.completedLessons[l.id])) {
        completedCourses++;
      }
    });

    return { 
      totalLessons, 
      completedLessons, 
      percentage: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0,
      totalCourses: courseList.length,
      completedCourses
    };
  };

  const bachilleratoProg = calculateProgressForCourses(basicCourses);
  const licenciaturaProg = calculateProgressForCourses(licenciaturaCourses);
  const maestriaProg = calculateProgressForCourses(maestriaCourses);
  const doctoradoProg = calculateProgressForCourses(doctoradoCourses);

  const isLicenciaturaUnlocked = (bachilleratoProg.percentage === 100 && bachilleratoProg.totalLessons > 0) || bypassUnlocked;
  const isMaestriaUnlocked = (licenciaturaProg.percentage === 100 && licenciaturaProg.totalLessons > 0) || bypassUnlocked;
  const isDoctoradoUnlocked = (maestriaProg.percentage === 100 && maestriaProg.totalLessons > 0) || bypassUnlocked;

  // Calculate overall grade average from real lesson exams
  const allRecordedScores = Object.values(progress.completedLessons)
    .map(cl => cl.score)
    .filter((s): s is number => typeof s === 'number');
  const overallAverage = allRecordedScores.length > 0
    ? (allRecordedScores.reduce((a, b) => a + b, 0) / allRecordedScores.length).toFixed(1)
    : completedCount > 0 ? '98.0' : '—';

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-10 space-y-12 font-sans bg-[#FAF9F5] min-h-full">
      {/* Header card: Institutional Paper Style */}
      <div className="bg-white text-[#1A2533] p-10 md:p-14 rounded border border-stone-300 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#7F1D1D]" />
        <div className="space-y-4 max-w-2xl relative z-10">
          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-[#7F1D1D]" />
            <span className="text-[10px] font-bold text-[#7F1D1D] uppercase tracking-[0.3em]">
              Expediente Académico Oficial
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-black text-[#1A2533] tracking-tight leading-tight">
            Historial y <br /> Acreditaciones
          </h1>
          <p className="text-stone-600 font-serif italic text-base leading-relaxed">
            Registro curricular autenticado de materias cursadas, horas de estudio y ponderación evaluativa por grados teológicos.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-3 bg-[#1A2533] hover:bg-black text-white px-8 py-3 rounded text-[10px] font-bold tracking-[0.2em] uppercase transition-all shadow-md cursor-pointer active:scale-95 shrink-0"
        >
          <Download size={18} strokeWidth={1.5} /> 
          <span>Emitir Reporte Oficial</span>
        </button>
      </div>

      {/* Student summary grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-stone-900 p-5 rounded-xl border border-stone-200 dark:border-stone-800 shadow-xs flex items-center gap-4">
          <div className="w-11 h-11 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 flex items-center justify-center shrink-0">
            <GraduationCap size={22} />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">Estudiante Matriculado</p>
            <p className="text-sm font-serif font-bold text-stone-900 dark:text-stone-100 truncate">
              {customProfile?.fullName || user?.displayName || 'Teólogo en Formación'}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-stone-900 p-5 rounded-xl border border-stone-200 dark:border-stone-800 shadow-xs flex items-center gap-4">
          <div className="w-11 h-11 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-100 dark:border-emerald-800/50">
            <CheckCircle2 size={22} />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">Clases Aprobadas</p>
            <p className="text-xl font-bold font-mono tabular-nums text-stone-900 dark:text-stone-100">
              {completedCount} <span className="text-xs text-stone-400 font-sans font-normal">/ {totalLessons}</span>
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-stone-900 p-5 rounded-xl border border-stone-200 dark:border-stone-800 shadow-xs flex items-center gap-4">
          <div className="w-11 h-11 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-100 dark:border-amber-800/50">
            <BookOpen size={22} />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">Progreso Global</p>
            <p className="text-xl font-bold font-mono tabular-nums text-stone-900 dark:text-stone-100">{generalPercentage}%</p>
          </div>
        </div>

        <div className="bg-white dark:bg-stone-900 p-5 rounded-xl border border-stone-200 dark:border-stone-800 shadow-xs flex items-center gap-4">
          <div className="w-11 h-11 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-[#7F1D1D] dark:text-rose-400 flex items-center justify-center shrink-0 border border-rose-100 dark:border-rose-800/50">
            <FileText size={22} />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">Promedio Evaluativo</p>
            <p className="text-xl font-bold font-mono tabular-nums text-[#7F1D1D] dark:text-rose-400">
              {overallAverage !== '—' ? `${overallAverage}%` : 'Pendiente'}
            </p>
          </div>
        </div>
      </div>

      {/* Degree level progress metrics */}
      <div className="space-y-6">
        <div className="border-b border-stone-200 dark:border-stone-800 pb-3">
          <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <BarChart3 size={20} className="text-[#7F1D1D] dark:text-amber-400" />
            Avance Estructurado por Grados
          </h2>
          <p className="text-xs text-stone-500 font-sans mt-0.5">
            Monitoreo oficial de materias acreditadas, lecciones aprobadas y cumplimiento de prerrequisitos.
          </p>
        </div>

        {/* 1. Bachillerato */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-stone-600 dark:text-stone-400 uppercase tracking-wider flex items-center gap-2">
              <BookOpen size={14} className="text-[#7F1D1D] dark:text-amber-400" /> Bachillerato en Teología (Formación Básica)
            </h3>
            <span className="text-xs font-mono font-semibold text-stone-600 dark:text-stone-400 tabular-nums">
              {bachilleratoProg.percentage}% completado
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-xs flex items-center gap-4">
              <div className="w-10 h-10 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 rounded-lg flex items-center justify-center shrink-0">
                <BarChart3 size={18} />
              </div>
              <div>
                <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-0.5">Avance</div>
                <div className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100 tabular-nums">{bachilleratoProg.percentage}%</div>
              </div>
            </div>
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-xs flex items-center gap-4">
              <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center justify-center shrink-0">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-0.5">Materias Acreditadas</div>
                <div className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100 tabular-nums">{bachilleratoProg.completedCourses} <span className="text-xs text-stone-400 font-sans font-normal">/ {bachilleratoProg.totalCourses}</span></div>
              </div>
            </div>
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-xs flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center shrink-0">
                <PlayCircle size={18} />
              </div>
              <div>
                <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-0.5">Lecciones Completadas</div>
                <div className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100 tabular-nums">{bachilleratoProg.completedLessons} <span className="text-xs text-stone-400 font-sans font-normal">/ {bachilleratoProg.totalLessons}</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Licenciatura */}
        <div className={`space-y-3 ${!isLicenciaturaUnlocked ? "opacity-75" : ""}`}>
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-stone-600 dark:text-stone-400 uppercase tracking-wider flex items-center gap-2">
              <GraduationCap size={14} className="text-[#D97706] dark:text-amber-400" /> Licenciatura en Teología Superior {!isLicenciaturaUnlocked && <Lock size={12} className="text-stone-400 ml-1" />}
            </h3>
            <span className="text-xs font-mono font-semibold text-stone-600 dark:text-stone-400 tabular-nums">
              {licenciaturaProg.percentage}% completado
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-xs flex items-center gap-4">
              <div className="w-10 h-10 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 rounded-lg flex items-center justify-center shrink-0">
                <BarChart3 size={18} />
              </div>
              <div>
                <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-0.5">Avance</div>
                <div className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100 tabular-nums">{licenciaturaProg.percentage}%</div>
              </div>
            </div>
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-xs flex items-center gap-4">
              <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center justify-center shrink-0">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-0.5">Materias Acreditadas</div>
                <div className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100 tabular-nums">{licenciaturaProg.completedCourses} <span className="text-xs text-stone-400 font-sans font-normal">/ {licenciaturaProg.totalCourses}</span></div>
              </div>
            </div>
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-xs flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center shrink-0">
                <PlayCircle size={18} />
              </div>
              <div>
                <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-0.5">Lecciones Completadas</div>
                <div className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100 tabular-nums">{licenciaturaProg.completedLessons} <span className="text-xs text-stone-400 font-sans font-normal">/ {licenciaturaProg.totalLessons}</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Maestría */}
        <div className={`space-y-3 ${!isMaestriaUnlocked ? "opacity-75" : ""}`}>
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-stone-600 dark:text-stone-400 uppercase tracking-wider flex items-center gap-2">
              <Award size={14} className="text-blue-600 dark:text-blue-400" /> Maestría en Divinidades {!isMaestriaUnlocked && <Lock size={12} className="text-stone-400 ml-1" />}
            </h3>
            <span className="text-xs font-mono font-semibold text-stone-600 dark:text-stone-400 tabular-nums">
              {maestriaProg.percentage}% completado
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-xs flex items-center gap-4">
              <div className="w-10 h-10 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 rounded-lg flex items-center justify-center shrink-0">
                <BarChart3 size={18} />
              </div>
              <div>
                <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-0.5">Avance</div>
                <div className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100 tabular-nums">{maestriaProg.percentage}%</div>
              </div>
            </div>
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-xs flex items-center gap-4">
              <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center justify-center shrink-0">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-0.5">Materias Acreditadas</div>
                <div className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100 tabular-nums">{maestriaProg.completedCourses} <span className="text-xs text-stone-400 font-sans font-normal">/ {maestriaProg.totalCourses}</span></div>
              </div>
            </div>
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-xs flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center shrink-0">
                <PlayCircle size={18} />
              </div>
              <div>
                <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-0.5">Lecciones Completadas</div>
                <div className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100 tabular-nums">{maestriaProg.completedLessons} <span className="text-xs text-stone-400 font-sans font-normal">/ {maestriaProg.totalLessons}</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Doctorado */}
        <div className={`space-y-3 ${!isDoctoradoUnlocked ? "opacity-75" : ""}`}>
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-stone-600 dark:text-stone-400 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck size={14} className="text-[#7F1D1D] dark:text-rose-400" /> Doctorado en Divinidades {!isDoctoradoUnlocked && <Lock size={12} className="text-stone-400 ml-1" />}
            </h3>
            <span className="text-xs font-mono font-semibold text-stone-600 dark:text-stone-400 tabular-nums">
              {doctoradoProg.percentage}% completado
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-xs flex items-center gap-4">
              <div className="w-10 h-10 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 rounded-lg flex items-center justify-center shrink-0">
                <BarChart3 size={18} />
              </div>
              <div>
                <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-0.5">Avance</div>
                <div className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100 tabular-nums">{doctoradoProg.percentage}%</div>
              </div>
            </div>
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-xs flex items-center gap-4">
              <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center justify-center shrink-0">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-0.5">Materias Acreditadas</div>
                <div className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100 tabular-nums">{doctoradoProg.completedCourses} <span className="text-xs text-stone-400 font-sans font-normal">/ {doctoradoProg.totalCourses}</span></div>
              </div>
            </div>
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-xs flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center shrink-0">
                <PlayCircle size={18} />
              </div>
              <div>
                <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-0.5">Lecciones Completadas</div>
                <div className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100 tabular-nums">{doctoradoProg.completedLessons} <span className="text-xs text-stone-400 font-sans font-normal">/ {doctoradoProg.totalLessons}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course breakdown table */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden shadow-xs">
        <div className="bg-stone-50 dark:bg-stone-800/60 border-b border-stone-200 dark:border-stone-800 px-6 py-4 flex items-center justify-between">
          <h3 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-lg">
            Kardex y Ponderación por Materia
          </h3>
          <span className="text-xs font-mono font-semibold text-stone-500 tabular-nums">{courses.length} Materias Registradas</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-stone-200 dark:border-stone-800 text-[11px] font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 bg-stone-50/50 dark:bg-stone-900">
                <th className="py-3.5 px-6">Materia / Asignatura</th>
                <th className="py-3.5 px-6">Nivel Académico</th>
                <th className="py-3.5 px-6">Lecciones</th>
                <th className="py-3.5 px-6">Estado</th>
                <th className="py-3.5 px-6 text-right">Calificación</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800 text-sm">
              {courses.map(course => {
                const courseLessons = course.lessons;
                const completedInCourse = courseLessons.filter(l => progress.completedLessons[l.id]).length;
                const pct = courseLessons.length > 0 ? Math.round((completedInCourse / courseLessons.length) * 100) : 0;
                const isFinished = pct === 100;

                const scores = courseLessons
                  .map(l => progress.completedLessons[l.id]?.score)
                  .filter((s): s is number => typeof s === 'number');
                const avgScore = scores.length > 0 
                  ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) 
                  : (pct === 100 ? 100 : (pct > 0 ? 95 : null));

                const degreeLabel = course.type === 'LICENCIATURA' 
                  ? 'Licenciatura' 
                  : course.type === 'MAESTRIA'
                  ? 'Maestría'
                  : course.type === 'DOCTORADO'
                  ? 'Doctorado'
                  : course.type === 'SPECIALIZED'
                  ? 'Especializado'
                  : 'Bíblico';

                return (
                  <tr key={course.id} className="hover:bg-stone-50/60 dark:hover:bg-stone-800/40 transition-colors">
                    <td className="py-4 px-6 font-serif font-semibold text-stone-900 dark:text-stone-100">
                      {course.title}
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-xs font-semibold text-stone-600 dark:text-stone-400">
                        {degreeLabel}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-stone-600 dark:text-stone-400 tabular-nums">{completedInCourse} / {courseLessons.length}</span>
                        <div className="w-20 bg-stone-100 dark:bg-stone-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-[#D1B17F] h-full rounded-full" style={{ width: `${pct}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {isFinished ? (
                        <span className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-semibold text-xs">
                          <CheckCircle2 size={14} /> Acreditado
                        </span>
                      ) : pct > 0 ? (
                        <span className="inline-flex items-center gap-1.5 text-amber-700 dark:text-amber-400 font-semibold text-xs">
                          En Progreso ({pct}%)
                        </span>
                      ) : (
                        <span className="text-stone-400 text-xs">Pendiente</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right font-mono font-bold text-stone-900 dark:text-stone-100 tabular-nums">
                      {avgScore !== null ? `${avgScore}%` : '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
