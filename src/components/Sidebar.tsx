import { Course, UserProgress } from '../types';
import { BookOpen, Award, CheckCircle, LogOut, LayoutDashboard, Settings, X, GraduationCap, Calendar as CalendarIcon, FileText, Edit3, Sparkles } from 'lucide-react';
import { User } from 'firebase/auth';
import { safeStorage } from '../utils/safeStorage';

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
    <div className={`fixed inset-y-0 left-0 z-40 bg-[#1A2533] dark:bg-zinc-950 text-white border-r border-[#E0D7C6] dark:border-zinc-800 transform flex flex-col shadow-2xl md:shadow-none transition-all duration-300 ease-in-out pl-0
      ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64'} 
      md:relative md:translate-x-0 
      ${isDesktopOpen ? 'md:w-64' : 'md:w-0 md:border-r-0 md:opacity-0 md:overflow-hidden'}
    `}>
      
      {/* Mobile-only menu header with Close button */}
      <div className="p-5 border-b border-[#2C3E50] dark:border-zinc-800 flex items-center justify-between md:hidden bg-[#151D28] dark:bg-zinc-900">
        <div className="flex items-center gap-3">
           <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center border border-white/20 shrink-0">
              <span className="font-serif font-bold text-[#E0D7C6] text-sm tracking-widest leading-none">STD</span>
           </div>
           <h1 className="text-[15px] font-bold tracking-tight text-[#E0D7C6] flex flex-col justify-center leading-tight">
             SEMINARIO
             <span className="text-[8px] font-sans font-bold opacity-70 uppercase tracking-[0.2em] text-[#E0D7C6]">Teológico Digital</span>
           </h1>
        </div>
        {onClose && (
          <button 
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white transition-colors bg-[#1A2533]/50 dark:bg-zinc-800 rounded-lg border border-[#2C3E50] dark:border-zinc-700"
            aria-label="Cerrar menú"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <div className="p-5 border-b border-[#2C3E50] dark:border-zinc-800 hidden md:flex items-center justify-between">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center border border-white/20 shrink-0 shadow-lg">
              <span className="font-serif font-bold text-[#E0D7C6] text-sm tracking-widest leading-none">STD</span>
           </div>
           <h1 className="text-[16px] font-bold tracking-tight text-[#E0D7C6] flex flex-col justify-center leading-tight">
             SEMINARIO
             <span className="text-[9px] font-sans font-bold opacity-70 uppercase tracking-[0.2em] text-[#E0D7C6]">Teológico Digital</span>
           </h1>
        </div>
        {onToggleDesktop && (
          <button 
            onClick={onToggleDesktop} 
            className="p-1.5 text-gray-400 hover:text-white transition-colors bg-[#1A2533]/50 dark:bg-zinc-800 rounded-lg border border-[#2C3E50] dark:border-zinc-700 md:flex hidden"
            aria-label="Contraer menú"
          >
            <X size={18} />
          </button>
        )}
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
        <div className="space-y-1">
           {/* 0. Pantalla de Inicio */}
           <button 
              onClick={() => handleNavClick('home')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors flex items-center justify-between group ${
                !isInsideCourseOrLesson && activeTab === 'home' 
                  ? 'bg-[#7F1D1D] text-white shadow-md font-semibold' 
                  : 'text-gray-300 hover:bg-[#2C3E50] dark:hover:bg-zinc-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Sparkles className={`w-4 h-4 ${!isInsideCourseOrLesson && activeTab === 'home' ? 'text-white' : 'text-[#E0D7C6]'}`} />
                <span>Pantalla de Inicio</span>
              </div>
            </button>
          {/* 1. Catálogo de Cursos (Inicio) */}
          <button 
             onClick={() => handleNavClick('courses')}
             className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors flex items-center justify-between group ${
               !isInsideCourseOrLesson && activeTab === 'courses' 
                 ? 'bg-[#7F1D1D] text-white shadow-md font-semibold' 
                 : 'text-gray-300 hover:bg-[#2C3E50] dark:hover:bg-zinc-800 hover:text-white'
             }`}
           >
             <div className="flex items-center gap-3">
               <BookOpen className={`w-4 h-4 ${!isInsideCourseOrLesson && activeTab === 'courses' ? 'text-white' : 'text-[#E0D7C6]'}`} />
               <span>Catálogo de Cursos</span>
             </div>
             <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-gray-300">
               {courses.length}
             </span>
           </button>

          {/* 2. La Biblia */}
          <button 
             onClick={() => handleNavClick('academic')}
             className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors flex items-center justify-between group ${
               !isInsideCourseOrLesson && activeTab === 'academic' 
                 ? 'bg-[#7F1D1D] text-white shadow-md font-semibold' 
                 : 'text-gray-300 hover:bg-[#2C3E50] dark:hover:bg-zinc-800 hover:text-white'
             }`}
           >
             <div className="flex items-center gap-3">
               <BookOpen className={`w-4 h-4 ${!isInsideCourseOrLesson && activeTab === 'academic' ? 'text-white' : 'text-[#E0D7C6]'}`} />
               <span>La Biblia</span>
             </div>
           </button>

          {/* 3. Plan de Estudio (3 Meses) */}
          <button 
             onClick={() => handleNavClick('calendar')}
             className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors flex items-center gap-3 ${
               !isInsideCourseOrLesson && activeTab === 'calendar' 
                 ? 'bg-[#7F1D1D] text-white shadow-md font-semibold' 
                 : 'text-gray-300 hover:bg-[#2C3E50] dark:hover:bg-zinc-800 hover:text-white'
             }`}
           >
             <CalendarIcon className={`w-4 h-4 ${!isInsideCourseOrLesson && activeTab === 'calendar' ? 'text-white' : 'text-[#E0D7C6]'}`} />
             <span>Plan de Estudio</span>
           </button>

          {/* 4. Progreso y Boleta Final */}
          <button 
             onClick={() => handleNavClick('grades')}
             className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors flex items-center gap-3 ${
               !isInsideCourseOrLesson && activeTab === 'grades' 
                 ? 'bg-[#7F1D1D] text-white shadow-md font-semibold' 
                 : 'text-gray-300 hover:bg-[#2C3E50] dark:hover:bg-zinc-800 hover:text-white'
             }`}
           >
             <Award className={`w-4 h-4 ${!isInsideCourseOrLesson && activeTab === 'grades' ? 'text-white' : 'text-[#E0D7C6]'}`} />
             <span>Progreso y Boleta</span>
           </button>
        </div>

        {/* Separator */}
        <div className="pt-4 mt-4 border-t border-[#2C3E50] dark:border-zinc-800 space-y-1">
          {onOpenProfile && (
            <button 
              onClick={() => {
                onOpenProfile();
                if (onClose) onClose();
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-3 text-gray-300 hover:bg-[#2C3E50] dark:hover:bg-zinc-800 hover:text-white"
            >
              <Settings className="w-4 h-4 text-[#E0D7C6]" />
              <span>Ajustes del Perfil</span>
            </button>
          )}
        </div>
      </nav>
      
      <div className="p-4 bg-[#111A24] dark:bg-zinc-900 border-t border-[#2C3E50] dark:border-zinc-800">
         <div className="flex items-center justify-between mb-3">
           <div className="flex items-center gap-3">
              {user?.photoURL ? (
                 <img src={user.photoURL} alt="Avatar" className="w-8 h-8 rounded" referrerPolicy="no-referrer" />
              ) : (
                 <div className="w-8 h-8 rounded bg-[#7F1D1D] flex items-center justify-center text-xs text-white">
                   {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                 </div>
              )}
              <div className="flex flex-col">
                 <div className="text-xs font-bold text-white max-w-[120px] truncate">{customProfile?.fullName || user?.displayName || 'Usuario'}</div>
                 <div className="text-[10px] text-gray-400">{isLicenciaturaUnlocked ? 'Rango: Licenciado 🎓' : 'Nivel: Bachillerato'}</div>
              </div>
           </div>
           <div className="flex items-center gap-2">
             {onOpenProfile && (
               <button onClick={onOpenProfile} className="text-gray-400 hover:text-white transition-colors" title="Configurar cuenta">
                 <Settings size={16} />
               </button>
             )}
             {onSignOut && (
               <button onClick={onSignOut} className="text-gray-400 hover:text-white transition-colors" title="Cerrar sesión">
                 <LogOut size={16} />
               </button>
             )}
           </div>
         </div>
      </div>
    </div>
  );
}
