import { Course, UserProgress } from '../types';
import { BookOpen, Award, CheckCircle, LogOut, LayoutDashboard, Settings, X, GraduationCap, Calendar as CalendarIcon, FileText, Edit3, Sparkles } from 'lucide-react';
import { User } from 'firebase/auth';
import { safeStorage } from '../utils/safeStorage';
import { PWAInstallButton } from './PWAInstallButton';

interface SidebarProps {
  courses: Course[];
  activeCourseId: string | null;
  activeLessonId: string | null;
  activeTab?: 'home' | 'courses' | 'academic' | 'calendar' | 'grades';
  onSelectTab?: (tab: 'home' | 'courses' | 'academic' | 'calendar' | 'grades') => void;
  onSelectLesson: (courseId: string | null, lessonId: string | null) => void;
  progress: UserProgress;
  isOpen: boolean;
  isDesktopOpen?: boolean;
  onToggleDesktop?: () => void;
  user?: User | null;
  customProfile?: {fullName?: string; email?: string; phoneNumber?: string};
  onSignOut?: () => void;
  onOpenProfile?: () => void;
  onOpenNotebook?: () => void;
  onClose?: () => void;
}

export function Sidebar({ 
  courses, 
  activeCourseId, 
  activeLessonId, 
  activeTab = 'courses',
  onSelectTab,
  onSelectLesson, 
  progress, 
  isOpen, 
  isDesktopOpen = true, 
  onToggleDesktop, 
  user, 
  customProfile, 
  onSignOut, 
  onOpenProfile, 
  onOpenNotebook,
  onClose 
}: SidebarProps) {
  const bibleStudies = courses.filter(c => c.type === 'BIBLE_STUDY');
  const specialized = courses.filter(c => c.type === 'SPECIALIZED');

  const basicCourses = courses.filter(c => c.type !== 'LICENCIATURA');
  const totalBasicLessons = basicCourses.reduce((sum, c) => sum + c.lessons.length, 0);
  const completedBasicLessons = basicCourses.reduce((sum, c) => {
    return sum + c.lessons.filter(l => progress.completedLessons[l.id]).length;
  }, 0);
  const allBasicCompleted = completedBasicLessons >= totalBasicLessons && totalBasicLessons > 0;
  const isLicenciaturaUnlocked = allBasicCompleted || safeStorage.getItem('bypass_licenciatura_unlock') === 'true';

  const isInsideCourseOrLesson = activeCourseId !== null || activeLessonId !== null;

  const handleNavClick = (tab: 'home' | 'courses' | 'academic' | 'calendar' | 'grades') => {
    onSelectLesson(null, null);
    if (onSelectTab) {
      onSelectTab(tab);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className={`fixed inset-y-0 left-0 z-40 bg-[#0F172A] text-slate-100 border-r border-slate-800/80 transform flex flex-col shadow-2xl md:shadow-none transition-all duration-300 ease-in-out pl-0
      ${isOpen ? 'translate-x-0 w-72' : '-translate-x-full w-72'} 
      md:relative md:translate-x-0 
      ${isDesktopOpen ? 'md:w-72' : 'md:w-0 md:border-r-0 md:opacity-0 md:overflow-hidden'}
    `}>
      
      {/* Mobile-only menu header with Close button */}
      <div className="p-5 border-b border-slate-800 flex items-center justify-between md:hidden bg-[#0A0F1D]">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7F1D1D] to-amber-700 flex items-center justify-center shadow-lg border border-amber-500/30 shrink-0">
              <span className="font-serif font-bold text-white text-sm tracking-widest leading-none">STD</span>
           </div>
           <h1 className="text-[15px] font-bold tracking-tight text-white flex flex-col justify-center leading-tight font-sans">
             SEMINARIO
             <span className="text-[9px] font-sans font-bold text-amber-400 uppercase tracking-[0.2em]">Teológico Digital</span>
           </h1>
        </div>
        {onClose && (
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white transition-colors bg-slate-800/60 rounded-xl border border-slate-700/60"
            aria-label="Cerrar menú"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <div className="p-5 border-b border-slate-800/80 hidden md:flex items-center justify-between bg-[#0A0F1D]/50 backdrop-blur-md">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7F1D1D] to-amber-700 flex items-center justify-center shadow-lg border border-amber-500/30 shrink-0">
              <span className="font-serif font-bold text-white text-sm tracking-widest leading-none">STD</span>
           </div>
           <h1 className="text-[16px] font-bold tracking-tight text-white flex flex-col justify-center leading-tight font-sans">
             SEMINARIO
             <span className="text-[9px] font-sans font-bold text-amber-400 uppercase tracking-[0.2em]">Teológico Digital</span>
           </h1>
        </div>
        {onToggleDesktop && (
          <button 
            onClick={onToggleDesktop} 
            className="p-1.5 text-slate-400 hover:text-white transition-all bg-slate-800/50 hover:bg-slate-700/60 rounded-xl border border-slate-700/50 md:flex hidden"
            aria-label="Contraer menú"
          >
            <X size={18} />
          </button>
        )}
      </div>
      
      <nav className="flex-1 overflow-y-auto py-5 px-3.5 space-y-2 custom-scrollbar font-sans">
        <div className="px-2 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Navegación Principal
        </div>

        <div className="space-y-1.5">
           {/* 0. Pantalla de Inicio */}
           <button 
              onClick={() => handleNavClick('home')}
              className={`w-full text-left px-3.5 py-3 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center justify-between group cursor-pointer ${
                !isInsideCourseOrLesson && activeTab === 'home' 
                  ? 'bg-gradient-to-r from-[#7F1D1D] to-red-900 text-white shadow-lg shadow-red-950/50 border border-red-700/60 font-bold' 
                  : 'text-slate-300 hover:bg-slate-800/70 hover:text-white hover:translate-x-1'
              }`}
            >
              <div className="flex items-center gap-3">
                <Sparkles className={`w-4 h-4 transition-colors ${!isInsideCourseOrLesson && activeTab === 'home' ? 'text-amber-300' : 'text-amber-400/80 group-hover:text-amber-300'}`} />
                <span>Inicio / General</span>
              </div>
              <span className={`w-1.5 h-1.5 rounded-full ${!isInsideCourseOrLesson && activeTab === 'home' ? 'bg-amber-400 shadow-xs shadow-amber-400' : 'bg-transparent'}`} />
            </button>

          {/* 1. Catálogo de Cursos (Inicio) */}
          <button 
             onClick={() => handleNavClick('courses')}
             className={`w-full text-left px-3.5 py-3 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center justify-between group cursor-pointer ${
               !isInsideCourseOrLesson && activeTab === 'courses' 
                 ? 'bg-gradient-to-r from-[#7F1D1D] to-red-900 text-white shadow-lg shadow-red-950/50 border border-red-700/60 font-bold' 
                 : 'text-slate-300 hover:bg-slate-800/70 hover:text-white hover:translate-x-1'
             }`}
           >
             <div className="flex items-center gap-3">
               <BookOpen className={`w-4 h-4 transition-colors ${!isInsideCourseOrLesson && activeTab === 'courses' ? 'text-amber-300' : 'text-amber-400/80 group-hover:text-amber-300'}`} />
               <span>Catálogo de Cursos</span>
             </div>
             <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 border border-slate-700/60 font-bold">
               {courses.length}
             </span>
           </button>

          {/* 2. La Biblia */}
          <button 
             onClick={() => handleNavClick('academic')}
             className={`w-full text-left px-3.5 py-3 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center justify-between group cursor-pointer ${
               !isInsideCourseOrLesson && activeTab === 'academic' 
                 ? 'bg-gradient-to-r from-[#7F1D1D] to-red-900 text-white shadow-lg shadow-red-950/50 border border-red-700/60 font-bold' 
                 : 'text-slate-300 hover:bg-slate-800/70 hover:text-white hover:translate-x-1'
             }`}
           >
             <div className="flex items-center gap-3">
               <BookOpen className={`w-4 h-4 transition-colors ${!isInsideCourseOrLesson && activeTab === 'academic' ? 'text-amber-300' : 'text-amber-400/80 group-hover:text-amber-300'}`} />
               <span>Lector Bíblico</span>
             </div>
             <span className="text-[10px] font-sans px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 font-bold">
               RVR60
             </span>
           </button>

          {/* 3. Plan de Estudio (3 Meses) */}
          <button 
             onClick={() => handleNavClick('calendar')}
             className={`w-full text-left px-3.5 py-3 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center justify-between group cursor-pointer ${
               !isInsideCourseOrLesson && activeTab === 'calendar' 
                 ? 'bg-gradient-to-r from-[#7F1D1D] to-red-900 text-white shadow-lg shadow-red-950/50 border border-red-700/60 font-bold' 
                 : 'text-slate-300 hover:bg-slate-800/70 hover:text-white hover:translate-x-1'
             }`}
           >
             <div className="flex items-center gap-3">
               <CalendarIcon className={`w-4 h-4 transition-colors ${!isInsideCourseOrLesson && activeTab === 'calendar' ? 'text-amber-300' : 'text-amber-400/80 group-hover:text-amber-300'}`} />
               <span>Plan de Estudio</span>
             </div>
             <span className="text-[10px] font-sans px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium">
               3 Meses
             </span>
           </button>

          {/* 4. Progreso y Boleta Final */}
          <button 
             onClick={() => handleNavClick('grades')}
             className={`w-full text-left px-3.5 py-3 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center justify-between group cursor-pointer ${
               !isInsideCourseOrLesson && activeTab === 'grades' 
                 ? 'bg-gradient-to-r from-[#7F1D1D] to-red-900 text-white shadow-lg shadow-red-950/50 border border-red-700/60 font-bold' 
                 : 'text-slate-300 hover:bg-slate-800/70 hover:text-white hover:translate-x-1'
             }`}
           >
             <div className="flex items-center gap-3">
               <Award className={`w-4 h-4 transition-colors ${!isInsideCourseOrLesson && activeTab === 'grades' ? 'text-amber-300' : 'text-amber-400/80 group-hover:text-amber-300'}`} />
               <span>Progreso y Boleta</span>
             </div>
             <span className="text-[10px] font-sans px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
               Kardex
             </span>
           </button>
        </div>

        {/* Separator */}
        <div className="pt-4 mt-4 border-t border-slate-800/80 space-y-2">
          <div className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Herramientas y Perfil
          </div>

          {onOpenProfile && (
            <button 
              onClick={() => {
                onOpenProfile();
                if (onClose) onClose();
              }}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 flex items-center gap-3 text-slate-300 hover:bg-slate-800/70 hover:text-white hover:translate-x-1 cursor-pointer"
            >
              <Settings className="w-4 h-4 text-amber-400/80" />
              <span>Ajustes del Perfil</span>
            </button>
          )}

          <div className="pt-2 px-0.5">
            <PWAInstallButton />
          </div>
        </div>
      </nav>
      
      <div className="p-4 bg-[#0A0F1D] border-t border-slate-800/90 font-sans">
         <div className="flex items-center justify-between">
           <div className="flex items-center gap-3 min-w-0">
              <div className="relative shrink-0">
                {user?.photoURL ? (
                   <img src={user.photoURL} alt="Avatar" className="w-9 h-9 rounded-xl object-cover border border-amber-500/30" referrerPolicy="no-referrer" />
                ) : (
                   <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7F1D1D] to-amber-700 flex items-center justify-center text-xs font-bold text-white shadow-xs">
                     {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                   </div>
                )}
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#0A0F1D]" />
              </div>
              <div className="flex flex-col min-w-0">
                 <div className="text-xs font-bold text-white truncate">{customProfile?.fullName || user?.displayName || 'Usuario'}</div>
                 <div className="text-[10px] text-amber-400 font-medium truncate">{isLicenciaturaUnlocked ? 'Rango: Licenciado 🎓' : 'Nivel: Bachillerato'}</div>
              </div>
           </div>
           <div className="flex items-center gap-1 shrink-0">
             {onOpenProfile && (
               <button onClick={onOpenProfile} className="p-1.5 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800" title="Configurar cuenta">
                 <Settings size={15} />
               </button>
             )}
             {onSignOut && (
               <button onClick={onSignOut} className="p-1.5 text-slate-400 hover:text-red-400 transition-colors rounded-lg hover:bg-slate-800" title="Cerrar sesión">
                 <LogOut size={15} />
               </button>
             )}
           </div>
         </div>
      </div>
    </div>
  );
}
