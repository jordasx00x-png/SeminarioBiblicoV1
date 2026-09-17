import React, { useState } from 'react';
import { Course, UserProgress } from '../types';
import { BookOpen, Award, CheckCircle, PlayCircle, ChevronDown, ChevronUp, GraduationCap, Lock, Unlock, ShieldCheck, Search } from 'lucide-react';
import { User } from 'firebase/auth';
import { motion } from 'motion/react';
import { safeStorage } from '../utils/safeStorage';

interface DashboardProps {
  user: User | null;
  courses: Course[];
  progress: UserProgress;
  customProfile?: {fullName?: string; email?: string; phoneNumber?: string};
  onSelectCourse: (courseId: string) => void;
}

export function Dashboard({ user, courses, progress, customProfile, onSelectCourse }: DashboardProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    specialized: true,
    bible: true,
    licenciatura: true,
    maestria: true,
    doctorado: true
  });
  const [searchQuery, setSearchQuery] = useState('');
  
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };
  
  const [bypassUnlocked, setBypassUnlocked] = useState<boolean>(() => {
    return safeStorage.getItem('bypass_licenciatura_unlock') === 'true';
  });

  const handleToggleBypass = () => {
    const newValue = !bypassUnlocked;
    setBypassUnlocked(newValue);
    safeStorage.setItem('bypass_licenciatura_unlock', String(newValue));
  };

  const bibleStudies = courses.filter(c => c.type === 'BIBLE_STUDY');
  const specialized = courses.filter(c => c.type === 'SPECIALIZED');
  const licenciaturaCourses = courses.filter(c => c.type === 'LICENCIATURA');
  const maestriaCourses = courses.filter(c => c.type === 'MAESTRIA');
  const doctoradoCourses = courses.filter(c => c.type === 'DOCTORADO');

  const basicCourses = courses.filter(c => c.type === 'BIBLE_STUDY' || c.type === 'SPECIALIZED');
  const totalBasicLessons = basicCourses.reduce((sum, c) => sum + c.lessons.length, 0);

  const query = searchQuery.toLowerCase().trim();
  const searchFilter = (c: Course) => c.title.toLowerCase().includes(query) || c.description.toLowerCase().includes(query);

  const filteredSpecialized = specialized.filter(searchFilter);
  const filteredBibleStudies = bibleStudies.filter(searchFilter);
  const filteredLicenciatura = licenciaturaCourses.filter(searchFilter);
  const filteredMaestria = maestriaCourses.filter(searchFilter);
  const filteredDoctorado = doctoradoCourses.filter(searchFilter);

  const completedBasicLessons = basicCourses.reduce((sum, c) => {
    return sum + c.lessons.filter(l => progress.completedLessons[l.id]).length;
  }, 0);

  const allBasicCompleted = completedBasicLessons >= totalBasicLessons && totalBasicLessons > 0;
  const isLicenciaturaUnlocked = allBasicCompleted || bypassUnlocked;

  const totalLicenciaturaLessons = licenciaturaCourses.reduce((sum, c) => sum + c.lessons.length, 0);
  const completedLicenciaturaLessons = licenciaturaCourses.reduce((sum, c) => {
    return sum + c.lessons.filter(l => progress.completedLessons[l.id]).length;
  }, 0);
  const allLicenciaturaCompleted = completedLicenciaturaLessons >= totalLicenciaturaLessons && totalLicenciaturaLessons > 0;
  const isMaestriaUnlocked = allLicenciaturaCompleted || bypassUnlocked;

  const totalMaestriaLessons = maestriaCourses.reduce((sum, c) => sum + c.lessons.length, 0);
  const completedMaestriaLessons = maestriaCourses.reduce((sum, c) => {
    return sum + c.lessons.filter(l => progress.completedLessons[l.id]).length;
  }, 0);
  const allMaestriaCompleted = completedMaestriaLessons >= totalMaestriaLessons && totalMaestriaLessons > 0;
  const isDoctoradoUnlocked = allMaestriaCompleted || bypassUnlocked;

  return (
    <div className="p-4 sm:p-6 md:p-10 max-w-7xl mx-auto font-sans text-slate-800 pb-28">
      {/* Hero Header */}
      <div className="relative mb-8 rounded-3xl bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#1E1B4B] p-6 md:p-10 text-white overflow-hidden shadow-xl border border-slate-700/60">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 border border-amber-500/30 text-xs font-semibold uppercase tracking-wider mb-3">
              <GraduationCap size={14} /> Oferta Académica Oficial
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight mb-2">
              Catálogo de Cursos
            </h1>
            <p className="text-slate-300 text-sm md:text-base max-w-2xl leading-relaxed">
              Bienvenido, <span className="font-bold text-amber-300">{customProfile?.fullName || user?.displayName || 'Estudioso'}</span>. Explora la malla curricular teológica y accede a las lecciones correspondientes.
            </p>
          </div>

          <div className="flex gap-3 bg-slate-900/80 p-3.5 rounded-2xl border border-slate-700/80 backdrop-blur-md shrink-0">
            <div className="text-center px-3 border-r border-slate-800">
              <div className="text-2xl font-black text-amber-400 font-mono">{courses.length}</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cursos</div>
            </div>
            <div className="text-center px-3">
              <div className="text-2xl font-black text-emerald-400 font-mono">
                {Object.keys(progress.completedLessons || {}).length}
              </div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Acreditados</div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-12 mt-8">
        {/* Search Bar */}
          <div className="relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por título, temática o palabra clave..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3.5 bg-white border border-slate-200 rounded-2xl outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 transition-all text-sm shadow-sm"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
              >
                ✕
              </button>
            )}
          </div>

          {filteredSpecialized.length === 0 && filteredBibleStudies.length === 0 && filteredLicenciatura.length === 0 && filteredMaestria.length === 0 && query !== '' && (
            <div className="text-center py-12 bg-white rounded-xl border border-[#E0D7C6]">
              <p className="text-gray-500 font-sans">No se encontraron cursos que coincidan con la búsqueda.</p>
            </div>
          )}

          {filteredSpecialized.length > 0 && (
            <section className="animate-in fade-in slide-in-from-bottom-8 duration-500">
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <Award className="text-[#7F1D1D]" size={24} />
                  <h2 className="text-2xl font-bold text-[#1A2533]">Cursos Especializados</h2>
                </div>
                <button
                  onClick={() => toggleSection('specialized')}
                  className="text-xs font-bold text-gray-500 hover:text-[#1A2533] transition-colors flex items-center gap-1 uppercase tracking-widest"
                >
                  {expandedSections.specialized ? <><ChevronUp size={14} /> Ocultar</> : <><ChevronDown size={14} /> Ver Cursos</>}
                </button>
              </div>
              {expandedSections.specialized && (
                <div className="grid lg:grid-cols-2 gap-6">
                  {filteredSpecialized.map(course => <CourseCard key={course.id} course={course} progress={progress} onSelectCourse={onSelectCourse} />)}
                </div>
              )}
            </section>
          )}

          {filteredBibleStudies.length > 0 && (
            <section className="animate-in fade-in slide-in-from-bottom-10 duration-500">
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <BookOpen className="text-[#7F1D1D]" size={24} />
                  <h2 className="text-2xl font-bold text-[#1A2533]">Estudio Bíblico</h2>
                </div>
                <button
                  onClick={() => toggleSection('bible')}
                  className="text-xs font-bold text-gray-500 hover:text-[#1A2533] transition-colors flex items-center gap-1 uppercase tracking-widest"
                >
                  {expandedSections.bible ? <><ChevronUp size={14} /> Ocultar</> : <><ChevronDown size={14} /> Ver Cursos</>}
                </button>
              </div>
              {expandedSections.bible && (
                <div className="grid lg:grid-cols-2 gap-6">
                  {filteredBibleStudies.map(course => <CourseCard key={course.id} course={course} progress={progress} onSelectCourse={onSelectCourse} />)}
                </div>
              )}
            </section>
          )}

          {/* LICENCIATURA EN TEOLOGÍA SUPERIOR */}
          {(query === '' || filteredLicenciatura.length > 0) && (
          <section className="border-t border-[#E0D7C6]/60 pt-10 animate-in fade-in slide-in-from-bottom-12 duration-500 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <GraduationCap className="text-[#D97706]" size={28} />
                <div>
                  <h2 className="text-2xl font-serif font-bold text-[#1A2533]">Licenciatura en Teología Superior</h2>
                  <p className="text-xs text-gray-500 font-sans mt-0.5">Grado avanzado formal para profundizar en idiomas bíblicos y teología dogmática.</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 self-start md:self-auto">
                <div className={`px-2.5 py-1 rounded-full text-xs font-bold font-sans flex items-center gap-1.5 border transition-all ${
                  isLicenciaturaUnlocked 
                    ? 'bg-amber-50 text-[#92400E] border-amber-200 shadow-xs' 
                    : 'bg-gray-100 text-gray-500 border-gray-200'
                }`}>
                  {isLicenciaturaUnlocked ? (
                    <>
                      <Unlock size={12} className="text-[#D97706] animate-pulse" />
                      GRADO DESBLOQUEADO
                    </>
                  ) : (
                    <>
                      <Lock size={12} className="text-gray-400" />
                      LICENCIATURA BLOQUEADA
                    </>
                  )}
                </div>
                
                <button
                  onClick={() => toggleSection('licenciatura')}
                  className="text-[10px] font-bold font-sans px-2.5 py-1 rounded-md border transition-colors bg-white text-gray-700 border-gray-300 hover:bg-gray-50 shadow-xs cursor-pointer flex items-center gap-1 uppercase tracking-widest"
                >
                  {expandedSections.licenciatura ? <><ChevronUp size={12} /> Ocultar</> : <><ChevronDown size={12} /> Ver Cursos</>}
                </button>
                <button
                  onClick={handleToggleBypass}
                  className={`text-[10px] font-bold font-sans px-2.5 py-1 rounded-md border transition-colors ${
                    bypassUnlocked 
                      ? 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100 shadow-xs' 
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 shadow-xs cursor-pointer'
                  }`}
                  title="Permite convalidar/forzar el desbloqueo instantáneo con fines evaluativos"
                >
                  {bypassUnlocked ? "Restaurar Bloqueo Real" : "⚡ Forzar Desbloqueo (Pruebas)"}
                </button>
              </div>
            </div>

            {!isLicenciaturaUnlocked ? (
              <div className="bg-[#FAF9F6] border border-[#E0D7C6] rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 font-sans">
                <div className="space-y-1.5 flex-1">
                  <h4 className="text-sm font-bold text-[#7F1D1D] flex items-center gap-1.5">
                    <Lock size={16} /> Prerrequisito: Cumplir Formación Básica
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed max-w-2xl">
                    Las asignaturas avanzadas de Licenciatura exigen haber acreditado la totalidad de los cursos de la formación básica del Seminario ({completedBasicLessons}/{totalBasicLessons} lecciones completadas). Su boleta del grado de Bachillerato debe estar totalmente firmada para tramitar la admisión al posgrado.
                  </p>
                </div>
                
                <div className="shrink-0 text-center md:text-right space-y-1.5">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Acreditación Básica</div>
                  <div className="text-2xl font-serif font-black text-[#1A2533]">
                    {completedBasicLessons} <span className="text-sm text-gray-400 font-normal">/ {totalBasicLessons} Clases</span>
                  </div>
                  <div className="w-36 h-1.5 bg-gray-200 rounded-full overflow-hidden mx-auto md:ml-auto">
                    <div className="h-full bg-[#7F1D1D]" style={{ width: `${totalBasicLessons > 0 ? (completedBasicLessons / totalBasicLessons) * 100 : 0}%` }} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-emerald-50/40 border border-emerald-200 rounded-xl p-5 md:p-6 flex items-center gap-4 animate-in zoom-in-95 duration-500 font-sans">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 select-none">
                  <ShieldCheck size={22} strokeWidth={1.7} />
                </div>
                <div className="space-y-0.5">
                  <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">Sede Académica de Grado</div>
                  <h4 className="text-sm font-bold text-[#1a2533]">¡Requisitos Acreditados Exitosamente!</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Usted ha sido admitido formalmente a la Licenciatura en Teología Superior. Puede cursar las materias, resolver los desafíos y evaluar su rendimiento a continuación.
                  </p>
                </div>
              </div>
            )}

            {expandedSections.licenciatura && (
              <div className="grid lg:grid-cols-2 gap-6">
                {filteredLicenciatura.map(course => (
                  <CourseCard 
                    key={course.id} 
                    course={course} 
                    progress={progress} 
                    onSelectCourse={isLicenciaturaUnlocked ? onSelectCourse : () => {}} 
                    isLocked={!isLicenciaturaUnlocked}
                  />
                ))}
              </div>
            )}
          </section>
          )}

          {/* MAESTRÍA */}
          {(query === '' || filteredMaestria.length > 0) && (
          <section className="border-t border-[#E0D7C6]/60 pt-10 animate-in fade-in slide-in-from-bottom-12 duration-500 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#1A2533] text-[#FDE68A] flex items-center justify-center shrink-0 shadow-sm border border-[#3E5C76]">
                   <Award size={18} />
                </div>
                <div>
                  <h2 className="text-2xl font-serif font-bold text-[#1A2533]">Maestría en Divinidades</h2>
                  <p className="text-xs text-gray-500 font-sans mt-0.5">Grado de posgrado máximo para erudición y liderazgo formativo global.</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 self-start md:self-auto">
                <div className={`px-2.5 py-1 rounded-full text-xs font-bold font-sans flex items-center gap-1.5 border transition-all ${
                  isMaestriaUnlocked 
                    ? 'bg-blue-50 text-blue-900 border-blue-200 shadow-xs' 
                    : 'bg-gray-100 text-gray-500 border-gray-200'
                }`}>
                  {isMaestriaUnlocked ? (
                    <>
                      <Unlock size={12} className="text-blue-700 animate-pulse" />
                      POSGRADO DESBLOQUEADO
                    </>
                  ) : (
                    <>
                      <Lock size={12} className="text-gray-400" />
                      MAESTRÍA BLOQUEADA
                    </>
                  )}
                </div>
                <button
                  onClick={() => toggleSection('maestria')}
                  className="text-[10px] font-bold font-sans px-2.5 py-1 rounded-md border transition-colors bg-white text-gray-700 border-gray-300 hover:bg-gray-50 shadow-xs cursor-pointer flex items-center gap-1 uppercase tracking-widest"
                >
                  {expandedSections.maestria ? <><ChevronUp size={12} /> Ocultar</> : <><ChevronDown size={12} /> Ver Cursos</>}
                </button>
              </div>
            </div>

            {!isMaestriaUnlocked ? (
              <div className="bg-[#FAF9F6] border border-[#E0D7C6] rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 font-sans">
                <div className="space-y-1.5 flex-1">
                  <h4 className="text-sm font-bold text-[#7F1D1D] flex items-center gap-1.5">
                    <Lock size={16} /> Prerrequisito: Cumplir Licenciatura Previa
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed max-w-2xl">
                    Las materias del programa de Maestría están reservadas para alumnos que hayan acreditado holgadamente su grado de Licenciatura íntegro ({completedLicenciaturaLessons}/{totalLicenciaturaLessons} lecciones completadas) y dispongan del rigor dogmático requerido. No hay excepciones evaluativas para la postulación magisterial.
                  </p>
                </div>
                
                <div className="shrink-0 text-center md:text-right space-y-1.5">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Avance Licenciatura</div>
                  <div className="text-2xl font-serif font-black text-[#1A2533]">
                    {completedLicenciaturaLessons} <span className="text-sm text-gray-400 font-normal">/ {totalLicenciaturaLessons} Clases</span>
                  </div>
                  <div className="w-36 h-1.5 bg-gray-200 rounded-full overflow-hidden mx-auto md:ml-auto">
                    <div className="h-full bg-blue-900" style={{ width: `${totalLicenciaturaLessons > 0 ? (completedLicenciaturaLessons / totalLicenciaturaLessons) * 100 : 0}%` }} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-blue-50/40 border border-blue-200 rounded-xl p-5 md:p-6 flex items-center gap-4 animate-in zoom-in-95 duration-500 font-sans">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 shrink-0 select-none">
                  <ShieldCheck size={22} strokeWidth={1.7} />
                </div>
                <div className="space-y-0.5">
                  <div className="text-[10px] font-bold text-blue-800 uppercase tracking-widest">Admisión de Posgrado</div>
                  <h4 className="text-sm font-bold text-[#1a2533]">¡Estatus de Maestro Reconocido!</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Felicidades por su graduación previa. Usted pertenece al cuadro de honor autorizado para cursar las altas ramas teológicas de la Maestría dogmática para edificación eclesial avanzada.
                  </p>
                </div>
              </div>
            )}

            {expandedSections.maestria && (
              <div className="grid lg:grid-cols-2 gap-6">
                {filteredMaestria.map(course => (
                  <CourseCard 
                    key={course.id} 
                    course={course} 
                    progress={progress} 
                    onSelectCourse={isMaestriaUnlocked ? onSelectCourse : () => {}} 
                    isLocked={!isMaestriaUnlocked}
                  />
                ))}
              </div>
            )}
          </section>
          )}

          {/* DOCTORADO */}
          {(query === '' || filteredDoctorado.length > 0) && (
          <section className="border-t border-[#E0D7C6]/60 pt-10 animate-in fade-in slide-in-from-bottom-12 duration-500 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#7F1D1D] text-white flex items-center justify-center shrink-0 shadow-sm border border-red-900">
                   <ShieldCheck size={18} />
                </div>
                <div>
                  <h2 className="text-2xl font-serif font-bold text-[#1A2533]">Doctorado en Divinidades</h2>
                  <p className="text-xs text-gray-500 font-sans mt-0.5">Máximo nivel de excelencia académica para la investigación teológica y el magisterio eclesial.</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 self-start md:self-auto">
                <div className={`px-2.5 py-1 rounded-full text-xs font-bold font-sans flex items-center gap-1.5 border transition-all ${
                  isDoctoradoUnlocked 
                    ? 'bg-red-50 text-red-900 border-red-200 shadow-xs' 
                    : 'bg-gray-100 text-gray-500 border-gray-200'
                }`}>
                  {isDoctoradoUnlocked ? (
                    <>
                      <Unlock size={12} className="text-red-700 animate-pulse" />
                      GRADO CUMBRE DESBLOQUEADO
                    </>
                  ) : (
                    <>
                      <Lock size={12} className="text-gray-400" />
                      DOCTORADO BLOQUEADO
                    </>
                  )}
                </div>
                <button
                  onClick={() => toggleSection('doctorado')}
                  className="text-[10px] font-bold font-sans px-2.5 py-1 rounded-md border transition-colors bg-white text-gray-700 border-gray-300 hover:bg-gray-50 shadow-xs cursor-pointer flex items-center gap-1 uppercase tracking-widest"
                >
                  {expandedSections.doctorado ? <><ChevronUp size={12} /> Ocultar</> : <><ChevronDown size={12} /> Ver Cursos</>}
                </button>
              </div>
            </div>

            {!isDoctoradoUnlocked ? (
              <div className="bg-[#FAF9F6] border border-[#E0D7C6] rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 font-sans">
                <div className="space-y-1.5 flex-1">
                  <h4 className="text-sm font-bold text-[#7F1D1D] flex items-center gap-1.5">
                    <Lock size={16} /> Prerrequisito: Cumplir Maestría Previa
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed max-w-2xl">
                    El ingreso al Doctorado requiere haber completado satisfactoriamente el grado de Maestría ({completedMaestriaLessons}/{totalMaestriaLessons} lecciones completadas). Este nivel está reservado para el estudio crítico y la producción de conocimiento teológico original.
                  </p>
                </div>
                
                <div className="shrink-0 text-center md:text-right space-y-1.5">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Avance Maestría</div>
                  <div className="text-2xl font-serif font-black text-[#1A2533]">
                    {completedMaestriaLessons} <span className="text-sm text-gray-400 font-normal"> / {totalMaestriaLessons} Clases</span>
                  </div>
                  <div className="w-36 h-1.5 bg-gray-200 rounded-full overflow-hidden mx-auto md:ml-auto">
                    <div className="h-full bg-red-900" style={{ width: `${totalMaestriaLessons > 0 ? (completedMaestriaLessons / totalMaestriaLessons) * 100 : 0}%` }} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-red-50/40 border border-red-200 rounded-xl p-5 md:p-6 flex items-center gap-4 animate-in zoom-in-95 duration-500 font-sans">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-700 shrink-0 select-none">
                  <ShieldCheck size={22} strokeWidth={1.7} />
                </div>
                <div className="space-y-0.5">
                  <div className="text-[10px] font-bold text-red-800 uppercase tracking-widest">Admisión Doctoral</div>
                  <h4 className="text-sm font-bold text-[#1a2533]">¡Bienvenido al Nivel Doctoral!</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Su trayectoria académica lo ha traído hasta aquí. Usted forma parte de la élite de investigadores autorizados para cursar las ramas doctorales del Seminario.
                  </p>
                </div>
              </div>
            )}

            {expandedSections.doctorado && (
              <div className="grid lg:grid-cols-2 gap-6">
                {filteredDoctorado.map(course => (
                  <CourseCard 
                    key={course.id} 
                    course={course} 
                    progress={progress} 
                    onSelectCourse={isDoctoradoUnlocked ? onSelectCourse : () => {}} 
                    isLocked={!isDoctoradoUnlocked}
                  />
                ))}
              </div>
            )}
          </section>
          )}
      </div>
    </div>
  );
}

function CourseCard({ course, progress, onSelectCourse, isLocked = false }: { key?: React.Key, course: Course, progress: UserProgress, onSelectCourse: (courseId: string) => void, isLocked?: boolean }) {
  const total = course.lessons.length;
  const completedReal = course.lessons.filter(l => progress.completedLessons[l.id]).length;
  const percentage = total > 0 ? Math.round((completedReal / total) * 100) : 0;
  
  return (
    <motion.button 
      whileHover={isLocked ? {} : { y: -4, scale: 1.01 }}
      whileTap={isLocked ? {} : { scale: 0.98 }}
      onClick={() => !isLocked && onSelectCourse(course.id)}
      disabled={isLocked}
      className={`bg-white rounded-3xl overflow-hidden transition-all duration-300 flex flex-col h-full group text-left w-full border ${
        isLocked 
          ? 'opacity-60 bg-slate-50/80 border-slate-200 cursor-not-allowed select-none' 
          : 'border-slate-200/90 shadow-sm hover:shadow-xl hover:border-amber-500/40 cursor-pointer'
      }`}
    >
      <div className="p-6 md:p-8 flex-1 w-full relative flex flex-col">
         <div className="text-[10px] md:text-xs font-sans uppercase tracking-widest mb-3 flex items-center justify-between gap-2">
            <span className={`px-3 py-1 rounded-full font-bold border flex items-center gap-1.5 ${
              course.type === 'LICENCIATURA' 
                ? 'text-amber-800 bg-amber-50 border-amber-200/80' 
                : course.type === 'MAESTRIA' 
                ? 'text-indigo-800 bg-indigo-50 border-indigo-200/80' 
                : course.type === 'DOCTORADO' 
                ? 'text-rose-900 bg-rose-50 border-rose-200/80' 
                : 'text-amber-900 bg-amber-50/80 border-amber-200/60'
            }`}>
              <BookOpen size={12} />
              {course.type === 'LICENCIATURA' 
                ? `Licenciatura • ${course.durationMonths || 6} Meses` 
                : course.type === 'MAESTRIA'
                ? `Maestría • ${course.durationMonths || 12} Meses`
                : course.type === 'DOCTORADO'
                ? `Doctorado • ${course.durationMonths || 18} Meses`
                : 'Mínimo 3 Meses'}
            </span>
            {isLocked && (
              <span className="flex items-center gap-1 text-amber-900 font-bold bg-amber-100/80 px-2.5 py-1 rounded-full text-[10px] border border-amber-200/80">
                <Lock size={10} /> BLOQUEADO
              </span>
            )}
         </div>
         <h3 className={`text-xl font-serif font-bold mb-2 transition-colors ${
           isLocked ? 'text-slate-400' : 'text-slate-900 group-hover:text-amber-700'
         }`}>{course.title}</h3>
         <p className="text-slate-500 text-sm leading-relaxed mb-6 font-sans line-clamp-3">
           {course.description}
         </p>
         
          <div className="space-y-2 mb-2 mt-auto">
           <div className="flex justify-between items-end font-sans">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Progreso ({completedReal.toLocaleString('es-ES')}/{total.toLocaleString('es-ES')} Clases)</span>
              <span className="text-xs font-bold text-slate-900">{percentage}%</span>
           </div>
           <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden p-0.5">
             <div className={`h-full rounded-full transition-all duration-500 ${
               course.type === 'LICENCIATURA' ? 'bg-amber-600' : course.type === 'MAESTRIA' ? 'bg-indigo-600' : course.type === 'DOCTORADO' ? 'bg-rose-700' : 'bg-amber-700'
             }`} style={{ width: `${percentage}%` }}></div>
           </div>
         </div>
      </div>
      
      <div className={`border-t p-4 flex justify-between items-center px-6 md:px-8 transition-colors w-full font-sans ${
        isLocked 
          ? 'bg-slate-100/50 border-slate-200' 
          : 'bg-slate-50/70 border-slate-100 group-hover:bg-amber-500/5'
      }`}>
         <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            {total.toLocaleString('es-ES')} Clases {isLocked ? 'por habilitar' : '+ Evaluaciones'}
         </div>
         {isLocked ? (
           <div className="text-amber-900 text-[10px] md:text-xs leading-none font-bold tracking-widest uppercase flex items-center gap-1">
             Requisitos Previos <Lock size={12} />
           </div>
         ) : (
           <div className="flex items-center gap-2 text-slate-800 group-hover:text-amber-800 font-bold text-xs uppercase tracking-wider transition-all">
              Ver Módulo <PlayCircle size={16} className="text-amber-600 group-hover:translate-x-1 transition-transform" />
           </div>
         )}
      </div>
    </motion.button>
  );
}
