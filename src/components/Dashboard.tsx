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
  const [selectedDegreeTab, setSelectedDegreeTab] = useState<'all' | 'basic' | 'licenciatura' | 'maestria' | 'doctorado'>('all');
  
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
    <div className="p-4 sm:p-6 md:p-8 w-full max-w-7xl mx-auto font-sans text-stone-800 dark:text-stone-100 pb-28">
      {/* Academic Hero Header: Institutional Paper Style */}
      <div className="mb-12 rounded-xl bg-[#FAF9F5] p-10 md:p-14 text-[#1A2533] shadow-sm border border-stone-300 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#7F1D1D]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
        
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-px bg-[#7F1D1D]" />
              <span className="text-[10px] font-bold tracking-[0.3em] text-[#7F1D1D] uppercase">
                Oferta Académica Vigente
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-black text-[#1A2533] tracking-tight mb-4 leading-tight">
              Catálogo de <br /> Especialidades
            </h1>
            <p className="text-stone-600 font-serif italic text-base md:text-lg leading-relaxed">
              Bienvenido, <span className="font-bold text-[#1A2533] not-italic">{customProfile?.fullName || user?.displayName || 'Estudioso'}</span>. Explore la malla curricular teológica y acceda a los módulos de acreditación oficial.
            </p>
          </div>

          <div className="flex gap-6 bg-white p-6 rounded-lg border border-stone-200 shrink-0 shadow-sm relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#7F1D1D]" />
            <div className="text-center px-4 border-r border-stone-100">
              <div className="text-3xl font-serif font-bold text-[#1A2533] tabular-nums">{courses.length}</div>
              <div className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mt-1">Materias</div>
            </div>
            <div className="text-center px-4">
              <div className="text-3xl font-serif font-bold text-emerald-700 tabular-nums">
                {Object.keys(progress.completedLessons || {}).length}
              </div>
              <div className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mt-1">Acreditadas</div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8 mt-8">
        {/* Search Bar */}
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Buscar por título, temática o palabra clave..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-3 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg outline-none focus:border-[#D1B17F] focus:ring-1 focus:ring-[#D1B17F] transition-all text-sm shadow-xs"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 p-1 cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Degree Track Segmented Filter Control */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 dark:bg-stone-800/80 rounded-xl overflow-x-auto border border-stone-200 dark:border-stone-800 font-sans">
          <button
            onClick={() => setSelectedDegreeTab('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedDegreeTab === 'all'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            Todos los Grados ({courses.length})
          </button>
          <button
            onClick={() => setSelectedDegreeTab('basic')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedDegreeTab === 'basic'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            Formación Básica & Bíblica ({basicCourses.length})
          </button>
          <button
            onClick={() => setSelectedDegreeTab('licenciatura')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedDegreeTab === 'licenciatura'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            Licenciatura ({licenciaturaCourses.length})
          </button>
          <button
            onClick={() => setSelectedDegreeTab('maestria')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedDegreeTab === 'maestria'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            Maestría ({maestriaCourses.length})
          </button>
          <button
            onClick={() => setSelectedDegreeTab('doctorado')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedDegreeTab === 'doctorado'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            Doctorado ({doctoradoCourses.length})
          </button>
        </div>

        {filteredSpecialized.length === 0 && filteredBibleStudies.length === 0 && filteredLicenciatura.length === 0 && filteredMaestria.length === 0 && query !== '' && (
          <div className="text-center py-12 bg-white dark:bg-stone-900 rounded-lg border border-stone-200 dark:border-stone-800">
            <p className="text-stone-500 font-sans">No se encontraron cursos que coincidan con la búsqueda.</p>
          </div>
        )}

          {/* CURSOS ESPECIALIZADOS */}
          {(selectedDegreeTab === 'all' || selectedDegreeTab === 'basic') && filteredSpecialized.length > 0 && (
            <section className="animate-in fade-in slide-in-from-bottom-8 duration-500">
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <Award className="text-[#7F1D1D] dark:text-amber-400" size={24} />
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">Cursos Especializados</h2>
                    <p className="text-xs text-stone-500 font-sans">Módulos avanzados de exégesis, apologética y hermenéutica bíblica.</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleSection('specialized')}
                  className="text-xs font-semibold text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 transition-colors flex items-center gap-1 uppercase tracking-widest cursor-pointer"
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

          {/* ESTUDIO BÍBLICO */}
          {(selectedDegreeTab === 'all' || selectedDegreeTab === 'basic') && filteredBibleStudies.length > 0 && (
            <section className="animate-in fade-in slide-in-from-bottom-10 duration-500 pt-6 border-t border-stone-200 dark:border-stone-800">
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <BookOpen className="text-[#7F1D1D] dark:text-amber-400" size={24} />
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">Estudio Bíblico y Fundamentos</h2>
                    <p className="text-xs text-stone-500 font-sans">Formación integral en el texto canónico de las Sagradas Escrituras.</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleSection('bible')}
                  className="text-xs font-semibold text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 transition-colors flex items-center gap-1 uppercase tracking-widest cursor-pointer"
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
          {(selectedDegreeTab === 'all' || selectedDegreeTab === 'licenciatura') && (query === '' || filteredLicenciatura.length > 0) && (
          <section className="border-t border-stone-200 dark:border-stone-800 pt-8 animate-in fade-in slide-in-from-bottom-12 duration-500 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <GraduationCap className="text-[#D97706] dark:text-amber-400" size={28} />
                <div>
                  <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">Licenciatura en Teología Superior</h2>
                  <p className="text-xs text-stone-500 font-sans mt-0.5">Grado avanzado formal para profundizar en idiomas bíblicos y teología dogmática.</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 self-start md:self-auto">
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <span className={`w-2 h-2 rounded-full ${isLicenciaturaUnlocked ? 'bg-emerald-500' : 'bg-stone-400'}`} />
                  <span className={isLicenciaturaUnlocked ? 'text-emerald-700 dark:text-emerald-400' : 'text-stone-500 dark:text-stone-400'}>
                    {isLicenciaturaUnlocked ? 'Grado Desbloqueado' : 'Prerrequisitos Requeridos'}
                  </span>
                </div>
                
                <button
                  onClick={() => toggleSection('licenciatura')}
                  className="text-xs font-semibold text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 transition-colors cursor-pointer flex items-center gap-1"
                >
                  {expandedSections.licenciatura ? <><ChevronUp size={14} /> Ocultar</> : <><ChevronDown size={14} /> Ver Cursos</>}
                </button>
                <button
                  onClick={handleToggleBypass}
                  className="text-[11px] font-mono text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 px-2 py-1 rounded border border-stone-200 dark:border-stone-800 transition-colors cursor-pointer"
                  title="Convalidar requisitos con fines evaluativos"
                >
                  {bypassUnlocked ? "Restaurar" : "⚡ Convalidar"}
                </button>
              </div>
            </div>

            {!isLicenciaturaUnlocked ? (
              <div className="bg-stone-50/70 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 font-sans">
                <div className="space-y-1.5 flex-1">
                  <h4 className="text-sm font-semibold text-[#7F1D1D] dark:text-rose-400 flex items-center gap-1.5">
                    <Lock size={15} /> Prerrequisito: Concluir Formación Básica
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed max-w-2xl">
                    Las asignaturas avanzadas de Licenciatura exigen haber acreditado la totalidad de los cursos de la formación básica del Seminario ({completedBasicLessons}/{totalBasicLessons} lecciones completadas). Su boleta del grado de Bachillerato debe estar totalmente aprobada para tramitar la admisión al posgrado.
                  </p>
                </div>
                
                <div className="shrink-0 text-center md:text-right space-y-1.5">
                  <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest leading-none">Acreditación Básica</div>
                  <div className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 tabular-nums">
                    {completedBasicLessons} <span className="text-sm text-stone-400 font-normal">/ {totalBasicLessons} Clases</span>
                  </div>
                  <div className="w-36 h-1.5 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden mx-auto md:ml-auto">
                    <div className="h-full bg-[#7F1D1D] dark:bg-amber-500 rounded-full" style={{ width: `${totalBasicLessons > 0 ? (completedBasicLessons / totalBasicLessons) * 100 : 0}%` }} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 rounded-xl p-5 md:p-6 flex items-center gap-4 animate-in zoom-in-95 duration-500 font-sans">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 select-none">
                  <ShieldCheck size={22} strokeWidth={1.7} />
                </div>
                <div className="space-y-0.5">
                  <div className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">Sede Académica de Grado</div>
                  <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100">¡Requisitos Acreditados Exitosamente!</h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
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
          {(selectedDegreeTab === 'all' || selectedDegreeTab === 'maestria') && (query === '' || filteredMaestria.length > 0) && (
          <section className="border-t border-stone-200 dark:border-stone-800 pt-8 animate-in fade-in slide-in-from-bottom-12 duration-500 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Award className="text-blue-700 dark:text-blue-400" size={28} />
                <div>
                  <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">Maestría en Divinidades</h2>
                  <p className="text-xs text-stone-500 font-sans mt-0.5">Grado de posgrado formal para erudición bíblica y magisterio formativo global.</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 self-start md:self-auto">
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <span className={`w-2 h-2 rounded-full ${isMaestriaUnlocked ? 'bg-blue-500' : 'bg-stone-400'}`} />
                  <span className={isMaestriaUnlocked ? 'text-blue-700 dark:text-blue-400' : 'text-stone-500 dark:text-stone-400'}>
                    {isMaestriaUnlocked ? 'Posgrado Desbloqueado' : 'Requiere Licenciatura'}
                  </span>
                </div>
                <button
                  onClick={() => toggleSection('maestria')}
                  className="text-xs font-semibold text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 transition-colors cursor-pointer flex items-center gap-1"
                >
                  {expandedSections.maestria ? <><ChevronUp size={14} /> Ocultar</> : <><ChevronDown size={14} /> Ver Cursos</>}
                </button>
              </div>
            </div>

            {!isMaestriaUnlocked ? (
              <div className="bg-stone-50/70 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 font-sans">
                <div className="space-y-1.5 flex-1">
                  <h4 className="text-sm font-semibold text-[#7F1D1D] dark:text-rose-400 flex items-center gap-1.5">
                    <Lock size={15} /> Prerrequisito: Cumplir Licenciatura Previa
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed max-w-2xl">
                    Las materias del programa de Maestría están reservadas para alumnos que hayan acreditado holgadamente su grado de Licenciatura íntegro ({completedLicenciaturaLessons}/{totalLicenciaturaLessons} lecciones completadas) y dispongan del rigor dogmático requerido.
                  </p>
                </div>
                
                <div className="shrink-0 text-center md:text-right space-y-1.5">
                  <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest leading-none">Avance Licenciatura</div>
                  <div className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 tabular-nums">
                    {completedLicenciaturaLessons} <span className="text-sm text-stone-400 font-normal">/ {totalLicenciaturaLessons} Clases</span>
                  </div>
                  <div className="w-36 h-1.5 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden mx-auto md:ml-auto">
                    <div className="h-full bg-blue-700 dark:bg-blue-500 rounded-full" style={{ width: `${totalLicenciaturaLessons > 0 ? (completedLicenciaturaLessons / totalLicenciaturaLessons) * 100 : 0}%` }} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/60 rounded-xl p-5 md:p-6 flex items-center gap-4 animate-in zoom-in-95 duration-500 font-sans">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-700 dark:text-blue-400 shrink-0 select-none">
                  <ShieldCheck size={22} strokeWidth={1.7} />
                </div>
                <div className="space-y-0.5">
                  <div className="text-[10px] font-semibold text-blue-800 dark:text-blue-300 uppercase tracking-widest">Admisión de Posgrado</div>
                  <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100">¡Estatus de Maestro Reconocido!</h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
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
          {(selectedDegreeTab === 'all' || selectedDegreeTab === 'doctorado') && (query === '' || filteredDoctorado.length > 0) && (
          <section className="border-t border-stone-200 dark:border-stone-800 pt-8 animate-in fade-in slide-in-from-bottom-12 duration-500 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-[#7F1D1D] dark:text-rose-400" size={28} />
                <div>
                  <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">Doctorado en Divinidades</h2>
                  <p className="text-xs text-stone-500 font-sans mt-0.5">Máximo nivel de excelencia académica para la investigación teológica y el magisterio eclesial.</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 self-start md:self-auto">
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <span className={`w-2 h-2 rounded-full ${isDoctoradoUnlocked ? 'bg-red-500' : 'bg-stone-400'}`} />
                  <span className={isDoctoradoUnlocked ? 'text-red-700 dark:text-rose-400' : 'text-stone-500 dark:text-stone-400'}>
                    {isDoctoradoUnlocked ? 'Nivel Doctoral Desbloqueado' : 'Requiere Maestría Previa'}
                  </span>
                </div>
                <button
                  onClick={() => toggleSection('doctorado')}
                  className="text-xs font-semibold text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 transition-colors cursor-pointer flex items-center gap-1"
                >
                  {expandedSections.doctorado ? <><ChevronUp size={14} /> Ocultar</> : <><ChevronDown size={14} /> Ver Cursos</>}
                </button>
              </div>
            </div>

            {!isDoctoradoUnlocked ? (
              <div className="bg-stone-50/70 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 font-sans">
                <div className="space-y-1.5 flex-1">
                  <h4 className="text-sm font-semibold text-[#7F1D1D] dark:text-rose-400 flex items-center gap-1.5">
                    <Lock size={15} /> Prerrequisito: Cumplir Maestría Previa
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed max-w-2xl">
                    El ingreso al Doctorado requiere haber completado satisfactoriamente el grado de Maestría ({completedMaestriaLessons}/{totalMaestriaLessons} lecciones completadas). Este nivel está reservado para el estudio crítico y la producción de conocimiento teológico original.
                  </p>
                </div>
                
                <div className="shrink-0 text-center md:text-right space-y-1.5">
                  <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest leading-none">Avance Maestría</div>
                  <div className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 tabular-nums">
                    {completedMaestriaLessons} <span className="text-sm text-stone-400 font-normal"> / {totalMaestriaLessons} Clases</span>
                  </div>
                  <div className="w-36 h-1.5 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden mx-auto md:ml-auto">
                    <div className="h-full bg-red-700 dark:bg-rose-500 rounded-full" style={{ width: `${totalMaestriaLessons > 0 ? (completedMaestriaLessons / totalMaestriaLessons) * 100 : 0}%` }} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-red-50/50 dark:bg-rose-950/20 border border-red-200 dark:border-rose-800/60 rounded-xl p-5 md:p-6 flex items-center gap-4 animate-in zoom-in-95 duration-500 font-sans">
                <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-rose-900/50 flex items-center justify-center text-red-700 dark:text-rose-400 shrink-0 select-none">
                  <ShieldCheck size={22} strokeWidth={1.7} />
                </div>
                <div className="space-y-0.5">
                  <div className="text-[10px] font-semibold text-red-800 dark:text-rose-300 uppercase tracking-widest">Admisión Doctoral</div>
                  <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100">¡Bienvenido al Nivel Doctoral!</h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
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
  
  const degreeLabel = course.type === 'LICENCIATURA' 
    ? 'Licenciatura' 
    : course.type === 'MAESTRIA'
    ? 'Maestría'
    : course.type === 'DOCTORADO'
    ? 'Doctorado'
    : 'Curso Académico';

  const durationLabel = course.durationMonths 
    ? `${course.durationMonths} Meses` 
    : '3 Meses';

  return (
    <motion.button 
      whileHover={isLocked ? {} : { y: -2 }}
      whileTap={isLocked ? {} : { scale: 0.99 }}
      onClick={() => !isLocked && onSelectCourse(course.id)}
      disabled={isLocked}
      className={`bg-white dark:bg-stone-900 rounded-lg overflow-hidden transition-all flex flex-col h-full group text-left w-full border ${
        isLocked 
          ? 'opacity-60 bg-stone-50 dark:bg-stone-950 border-stone-200 dark:border-stone-800 cursor-not-allowed grayscale' 
          : 'border-stone-200 dark:border-stone-800 shadow-sm hover:border-[#7F1D1D] hover:shadow-lg cursor-pointer'
      }`}
    >
      <div className="p-7 md:p-9 flex-1 w-full relative flex flex-col">
         {/* Unboxed Metadata Line */}
         <div className="text-[10px] font-bold uppercase tracking-[0.2em] mb-5 flex items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <span className="text-[#7F1D1D] dark:text-amber-500">
                {degreeLabel}
              </span>
              <span className="w-1 h-1 rounded-full bg-stone-300" />
              <span className="text-stone-400">{durationLabel}</span>
            </div>

            {isLocked && (
              <span className="flex items-center gap-1.5 text-[#7F1D1D] dark:text-rose-400">
                <Lock size={12} strokeWidth={2.5} /> Restringido
              </span>
            )}
         </div>

         <h3 className={`text-xl md:text-2xl font-serif font-black mb-3 transition-colors leading-tight ${
           isLocked ? 'text-stone-400' : 'text-[#1A2533] dark:text-stone-100 group-hover:text-[#7F1D1D] dark:group-hover:text-amber-400'
         }`}>{course.title}</h3>

         <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed mb-8 font-serif italic line-clamp-3">
           {course.description}
         </p>
         
         <div className="space-y-1.5 mb-2 mt-auto">
           <div className="flex justify-between items-end font-sans text-xs">
              <span className="text-stone-400 tabular-nums">Avance: {completedReal} de {total} clases</span>
              <span className="font-semibold text-stone-800 dark:text-stone-200 tabular-nums">{percentage}%</span>
           </div>
           <div className="h-1.5 w-full bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
             <div 
               className="h-full rounded-full transition-all duration-500 bg-[#D1B17F]"
               style={{ width: `${percentage}%` }}
             />
           </div>
         </div>
      </div>
      
      <div className={`border-t p-4 flex justify-between items-center px-6 md:px-7 transition-colors w-full font-sans text-xs ${
        isLocked 
          ? 'bg-stone-100/60 dark:bg-stone-950 border-stone-200 dark:border-stone-800' 
          : 'bg-stone-50/60 dark:bg-stone-800/40 border-stone-100 dark:border-stone-800 group-hover:bg-[#D1B17F]/5'
      }`}>
         <div className="text-stone-400 tabular-nums">
            {total} Lecciones Oficiales
         </div>
         {isLocked ? (
           <div className="text-[#7F1D1D] dark:text-rose-400 font-semibold tracking-wider uppercase flex items-center gap-1">
             Requisitos Previos <Lock size={12} />
           </div>
         ) : (
           <div className="flex items-center gap-1.5 text-stone-800 dark:text-stone-200 group-hover:text-[#7F1D1D] dark:group-hover:text-amber-400 font-semibold transition-colors">
              <span>Ingresar al Curso</span>
              <PlayCircle size={15} className="text-[#7F1D1D] dark:text-amber-400 group-hover:translate-x-0.5 transition-transform" />
           </div>
         )}
      </div>
    </motion.button>
  );
}
