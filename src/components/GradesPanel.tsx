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

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8 font-sans">
      {/* Header card */}
      <div className="bg-[#1A2533] text-white p-6 md:p-10 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-[#2C3E50]">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-[#7F1D1D] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-[#E0D7C6]">
            <Award size={14} /> Boleta Oficial y Avance Académico
          </div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-tight">
            Historial, Progreso por Grados y Calificaciones
          </h1>
          <p className="text-sm text-gray-300">
            Registro consolidado de avance curricular, estados de acreditación y calificaciones por nivel en el Seminario Teológico Digital.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-[#7F1D1D] hover:bg-[#991B1B] text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
        >
          <Download size={16} /> Imprimir Boleta
        </button>
      </div>

      {/* Student summary grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-[#E0D7C6] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#1A2533]/5 text-[#1A2533] flex items-center justify-center font-bold">
            <GraduationCap size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Estudiante</p>
            <p className="text-sm font-bold text-[#1A2533] truncate max-w-[180px]">
              {customProfile?.fullName || user?.displayName || 'Teólogo en Formación'}
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E0D7C6] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Clases Aprobadas</p>
            <p className="text-xl font-bold text-emerald-800">{completedCount} <span className="text-xs text-gray-400 font-normal">/ {totalLessons}</span></p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E0D7C6] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
            <BookOpen size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Progreso Global</p>
            <p className="text-xl font-bold text-amber-800">{generalPercentage}%</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E0D7C6] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#7F1D1D]/10 text-[#7F1D1D] flex items-center justify-center font-bold">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Promedio Académico</p>
            <p className="text-xl font-bold text-[#7F1D1D]">98.5% <span className="text-xs text-gray-400 font-normal">(Excelencia)</span></p>
          </div>
        </div>
      </div>

      {/* Degree level progress metrics (Bachillerato, Licenciatura, Maestría, Doctorado) */}
      <div className="space-y-6">
        <div className="border-b border-[#E0D7C6] pb-2">
          <h2 className="text-lg font-serif font-bold text-[#1A2533] flex items-center gap-2">
            <BarChart3 size={20} className="text-[#7F1D1D]" />
            Avance por Grados Académicos
          </h2>
          <p className="text-xs text-gray-500">
            Monitoreo detallado del porcentaje de avance, cursos acreditados y clases cursadas por nivel teológico.
          </p>
        </div>

        {/* 1. Bachillerato */}
        <div>
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
            <BookOpen size={14} className="text-[#7F1D1D]" /> Bachillerato en Teología
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-[#E0D7C6] rounded-xl p-5 shadow-xs flex items-center gap-4">
              <div className="w-11 h-11 bg-[#1A2533] text-white rounded-xl flex items-center justify-center shrink-0 shadow-xs">
                <BarChart3 size={20} />
              </div>
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Avance Global</div>
                <div className="text-2xl font-black text-[#1A2533]">{bachilleratoProg.percentage}%</div>
              </div>
            </div>
            <div className="bg-white border border-[#E0D7C6] rounded-xl p-5 shadow-xs flex items-center gap-4">
              <div className="w-11 h-11 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Acreditadas</div>
                <div className="text-2xl font-black text-[#1A2533]">{bachilleratoProg.completedCourses} <span className="text-sm text-gray-400 font-normal">/ {bachilleratoProg.totalCourses}</span></div>
              </div>
            </div>
            <div className="bg-white border border-[#E0D7C6] rounded-xl p-5 shadow-xs flex items-center gap-4">
              <div className="w-11 h-11 bg-blue-50 border border-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                <PlayCircle size={20} />
              </div>
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Clases Vistas</div>
                <div className="text-2xl font-black text-[#1A2533]">{bachilleratoProg.completedLessons} <span className="text-sm text-gray-400 font-normal">/ {bachilleratoProg.totalLessons}</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Licenciatura */}
        <div className={!isLicenciaturaUnlocked ? "opacity-75" : ""}>
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
            <GraduationCap size={14} className="text-[#7F1D1D]" /> Licenciatura en Teología y Ministerio {!isLicenciaturaUnlocked && <Lock size={12} className="text-gray-400 ml-1" />}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-[#E0D7C6] rounded-xl p-5 shadow-xs flex items-center gap-4">
              <div className="w-11 h-11 bg-[#1A2533] text-white rounded-xl flex items-center justify-center shrink-0 shadow-xs">
                <BarChart3 size={20} />
              </div>
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Avance Global</div>
                <div className="text-2xl font-black text-[#1A2533]">{licenciaturaProg.percentage}%</div>
              </div>
            </div>
            <div className="bg-white border border-[#E0D7C6] rounded-xl p-5 shadow-xs flex items-center gap-4">
              <div className="w-11 h-11 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Acreditadas</div>
                <div className="text-2xl font-black text-[#1A2533]">{licenciaturaProg.completedCourses} <span className="text-sm text-gray-400 font-normal">/ {licenciaturaProg.totalCourses}</span></div>
              </div>
            </div>
            <div className="bg-white border border-[#E0D7C6] rounded-xl p-5 shadow-xs flex items-center gap-4">
              <div className="w-11 h-11 bg-blue-50 border border-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                <PlayCircle size={20} />
              </div>
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Clases Vistas</div>
                <div className="text-2xl font-black text-[#1A2533]">{licenciaturaProg.completedLessons} <span className="text-sm text-gray-400 font-normal">/ {licenciaturaProg.totalLessons}</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Maestría */}
        <div className={!isMaestriaUnlocked ? "opacity-75" : ""}>
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
            <Award size={14} className="text-[#7F1D1D]" /> Maestría en Divinidad y Teología Bíblica {!isMaestriaUnlocked && <Lock size={12} className="text-gray-400 ml-1" />}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-[#E0D7C6] rounded-xl p-5 shadow-xs flex items-center gap-4">
              <div className="w-11 h-11 bg-[#1A2533] text-white rounded-xl flex items-center justify-center shrink-0 shadow-xs">
                <BarChart3 size={20} />
              </div>
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Avance Global</div>
                <div className="text-2xl font-black text-[#1A2533]">{maestriaProg.percentage}%</div>
              </div>
            </div>
            <div className="bg-white border border-[#E0D7C6] rounded-xl p-5 shadow-xs flex items-center gap-4">
              <div className="w-11 h-11 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Acreditadas</div>
                <div className="text-2xl font-black text-[#1A2533]">{maestriaProg.completedCourses} <span className="text-sm text-gray-400 font-normal">/ {maestriaProg.totalCourses}</span></div>
              </div>
            </div>
            <div className="bg-white border border-[#E0D7C6] rounded-xl p-5 shadow-xs flex items-center gap-4">
              <div className="w-11 h-11 bg-blue-50 border border-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                <PlayCircle size={20} />
              </div>
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Clases Vistas</div>
                <div className="text-2xl font-black text-[#1A2533]">{maestriaProg.completedLessons} <span className="text-sm text-gray-400 font-normal">/ {maestriaProg.totalLessons}</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Doctorado */}
        <div className={!isDoctoradoUnlocked ? "opacity-75" : ""}>
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
            <ShieldCheck size={14} className="text-[#7F1D1D]" /> Doctorado en Teología e Investigación {!isDoctoradoUnlocked && <Lock size={12} className="text-gray-400 ml-1" />}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-[#E0D7C6] rounded-xl p-5 shadow-xs flex items-center gap-4">
              <div className="w-11 h-11 bg-[#1A2533] text-white rounded-xl flex items-center justify-center shrink-0 shadow-xs">
                <BarChart3 size={20} />
              </div>
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Avance Global</div>
                <div className="text-2xl font-black text-[#1A2533]">{doctoradoProg.percentage}%</div>
              </div>
            </div>
            <div className="bg-white border border-[#E0D7C6] rounded-xl p-5 shadow-xs flex items-center gap-4">
              <div className="w-11 h-11 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Acreditadas</div>
                <div className="text-2xl font-black text-[#1A2533]">{doctoradoProg.completedCourses} <span className="text-sm text-gray-400 font-normal">/ {doctoradoProg.totalCourses}</span></div>
              </div>
            </div>
            <div className="bg-white border border-[#E0D7C6] rounded-xl p-5 shadow-xs flex items-center gap-4">
              <div className="w-11 h-11 bg-blue-50 border border-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                <PlayCircle size={20} />
              </div>
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Clases Vistas</div>
                <div className="text-2xl font-black text-[#1A2533]">{doctoradoProg.completedLessons} <span className="text-sm text-gray-400 font-normal">/ {doctoradoProg.totalLessons}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course breakdown table */}
      <div className="bg-white border border-[#E0D7C6] rounded-2xl overflow-hidden shadow-xs">
        <div className="bg-[#FAF9F6] border-b border-[#E0D7C6] px-6 py-4 flex items-center justify-between">
          <h3 className="font-serif font-bold text-[#1A2533] text-lg">Desglose de Calificaciones por Materia</h3>
          <span className="text-xs font-mono font-bold text-gray-500">{courses.length} Materias Registradas</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-xs font-bold uppercase tracking-wider text-gray-500 bg-gray-50">
                <th className="py-4 px-6">Materia / Programa</th>
                <th className="py-4 px-6">Nivel Académico</th>
                <th className="py-4 px-6">Lecciones Completadas</th>
                <th className="py-4 px-6">Estado</th>
                <th className="py-4 px-6 text-right">Calificación</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {courses.map(course => {
                const courseLessons = course.lessons;
                const completedInCourse = courseLessons.filter(l => progress.completedLessons[l.id]).length;
                const pct = courseLessons.length > 0 ? Math.round((completedInCourse / courseLessons.length) * 100) : 0;
                const isFinished = pct === 100;

                return (
                  <tr key={course.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-4 px-6 font-serif font-bold text-[#1A2533]">
                      {course.title}
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#1A2533]/5 text-[#1A2533]">
                        {course.type}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs">{completedInCourse} / {courseLessons.length}</span>
                        <div className="w-24 bg-gray-200 h-2 rounded-full overflow-hidden">
                          <div className="bg-[#7F1D1D] h-full rounded-full" style={{ width: `${pct}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {isFinished ? (
                        <span className="inline-flex items-center gap-1.5 text-emerald-700 font-bold text-xs">
                          <CheckCircle2 size={14} /> Aprobado
                        </span>
                      ) : pct > 0 ? (
                        <span className="inline-flex items-center gap-1.5 text-amber-700 font-bold text-xs">
                          En Progreso ({pct}%)
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs">Pendiente</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right font-mono font-bold text-[#7F1D1D]">
                      {pct > 0 ? `${Math.min(90 + Math.floor(pct / 10), 100)} / 100` : '-'}
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
