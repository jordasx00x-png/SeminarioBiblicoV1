import { useState, useEffect, useRef } from 'react';
import { mockDatabase } from './data';
import { useProgress } from './hooks/useProgress';
import { useAuth } from './hooks/useAuth';
import { useProfile } from './hooks/useProfile';
import { useStudyReminder } from './hooks/useStudyReminder';
import { safeStorage } from './utils/safeStorage';
import { Sidebar } from './components/Sidebar';
import { LessonViewer } from './components/LessonViewer';
import { Dashboard } from './components/Dashboard';
import { CourseOverview } from './components/CourseOverview';
import { LandingPage } from './components/LandingPage';
import { ProfileModal } from './components/ProfileModal';
import { WelcomePage } from './components/WelcomePage';
import { DailyVerseNotification } from './components/DailyVerseNotification';
import { AcademicPanel } from './components/AcademicPanel';
import { StudyCalendar } from './components/StudyCalendar';
import { GradesPanel } from './components/GradesPanel';
import { HomePanel } from './components/HomePanel';
import { OfflineBanner } from './components/OfflineBanner';
import { Menu, X, LayoutDashboard, BookOpen, Settings, Edit3 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const { user, isLoading: authLoading, authError, signInWithGoogle, signInAsGuest, signOut } = useAuth();
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'courses' | 'academic' | 'calendar' | 'grades'>('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(() => {
    return safeStorage.getItem('desktopSidebarOpen') !== 'false';
  });
  const [showProfile, setShowProfile] = useState(false);
  const [showNotebook, setShowNotebook] = useState(false);
  const { profile: customProfile, saveProfile, isLoading: profileLoading } = useProfile();
  const { progress, markCompleted, markBlockExamCompleted, resetFirstLesson, resetAllProgress, isLoading: progressLoading } = useProgress();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Administrative command: automatically reset all previous accounts that have entered
  useEffect(() => {
    const WIPE_KEY = 'seminario_wipe_v3_reset_done';
    if (!safeStorage.getItem(WIPE_KEY)) {
      try {
        localStorage.clear();
        sessionStorage.clear();
      } catch (e) {}
      safeStorage.clear();
      safeStorage.setItem(WIPE_KEY, 'true');
      resetAllProgress();
    }
  }, []);

  const handleResetAllAccounts = () => {
    resetAllProgress();
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {}
    safeStorage.clear();
    safeStorage.setItem('seminario_wipe_v3_reset_done', 'true');
    signOut();
  };

  useStudyReminder(customProfile);

  // Dark mode has been removed, forcing light mode
  useEffect(() => {
    safeStorage.removeItem('darkMode');
    document.documentElement.classList.remove('dark');
  }, []);

  useEffect(() => {
    safeStorage.setItem('desktopSidebarOpen', String(desktopSidebarOpen));
  }, [desktopSidebarOpen]);

  // Scroll to top when course or lesson changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo(0, 0);
    }
  }, [activeCourseId, activeLessonId]);

  if (authLoading && !user) {
    // Return early to landing page without stalling on WelcomePage
    return <LandingPage onSignIn={signInWithGoogle} onSignInAsGuest={signInAsGuest} authError={authError} />;
  }

  if (user && (progressLoading || profileLoading)) {
    return <WelcomePage />;
  }

  if (!user) {
    return <LandingPage onSignIn={signInWithGoogle} onSignInAsGuest={signInAsGuest} authError={authError} />;
  }

  const activeCourse = mockDatabase.courses.find(c => c.id === activeCourseId);
  const activeLesson = activeCourse?.lessons.find(l => l.id === activeLessonId);

  return (
    <div className={`min-h-screen bg-[#FDFCFB] text-[#2C2C2C] dark:bg-[#121212] dark:text-stone-100 font-serif flex flex-col md:flex-row relative transition-colors duration-300`}>
      <DailyVerseNotification />

      
      {/* Mobile top bar */}
      <div className="md:hidden bg-white text-[#1A2533] px-4 md:px-5 py-3 md:py-4 flex justify-between items-center shadow-sm border-b border-[#E0D7C6] sticky top-0 z-50">
         <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#1A2533] flex items-center justify-center shadow-sm shrink-0">
               <span className="font-serif font-bold text-[#E0D7C6] text-sm tracking-widest leading-none">STD</span>
            </div>
            <h1 className="text-[15px] font-bold tracking-tight text-[#1A2533] flex flex-col justify-center leading-tight">
              SEMINARIO
              <span className="text-[8px] font-sans font-bold opacity-70 uppercase tracking-[0.2em]">Teológico Digital</span>
            </h1>
         </div>
         <div className="flex items-center gap-1.5 shrink-0">
            <button
               onClick={() => setShowProfile(true)}
               className="p-2 text-gray-500 hover:text-[#1A2533] transition-colors rounded-lg bg-gray-50 active:bg-gray-100"
            >
               <Settings size={22} />
            </button>
            <button 
              onClick={() => setSidebarOpen(prev => !prev)} 
              className="p-2 text-gray-500 hover:text-[#1A2533] transition-colors rounded-lg bg-gray-50 active:bg-gray-100"
            >
              {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
         </div>
      </div>


      <Sidebar 
         courses={mockDatabase.courses}
         activeCourseId={activeCourseId}
         activeLessonId={activeLessonId}
         activeTab={activeTab}
         onSelectTab={setActiveTab}
         onSelectLesson={(courseId, lessonId) => {
           setActiveCourseId(courseId);
           setActiveLessonId(lessonId);
           setSidebarOpen(false); // Auto-close on mobile
         }}
         progress={progress}
         isOpen={sidebarOpen}
         isDesktopOpen={desktopSidebarOpen}
         onToggleDesktop={() => setDesktopSidebarOpen(prev => !prev)}
         user={user}
         customProfile={customProfile}
         onSignOut={signOut}
         onOpenProfile={() => setShowProfile(true)}
         onClose={() => setSidebarOpen(false)}
      />

      {/* Floating button when desktop sidebar is closed */}
      {!desktopSidebarOpen && (
        <button
          onClick={() => setDesktopSidebarOpen(true)}
          className="hidden md:flex fixed top-4 left-4 z-40 p-2.5 rounded-xl bg-white/90 dark:bg-zinc-800/90 backdrop-blur shadow-lg border border-gray-200 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-700 transition-all active:scale-95"
          aria-label="Abrir menú"
        >
          <Menu size={20} className="text-gray-600 dark:text-gray-300" />
        </button>
      )}

      {/* Overlay to catch clicks off the sidebar in mobile view */}
      {sidebarOpen && (
         <div 
           className="fixed inset-0 z-30 bg-[#1A2533]/80 backdrop-blur-sm md:hidden animate-in fade-in duration-300"
           onClick={() => setSidebarOpen(false)}
         />
      )}



      <AnimatePresence>
      {showProfile && (
        <ProfileModal 
          user={user} 
          onClose={() => setShowProfile(false)} 
          onSave={saveProfile}
          onResetAllAccounts={handleResetAllAccounts}
        />
      )}
      </AnimatePresence>

      <main className="flex-1 flex flex-col min-h-0 w-full relative">
         <div 
           ref={scrollContainerRef}
           className="absolute inset-0 overflow-y-auto custom-scrollbar pb-24 md:pb-0"
         >
           <AnimatePresence mode="wait">
             {activeLesson && activeCourse ? (
               <motion.div 
                 key="lesson"
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -20 }}
                 transition={{ duration: 0.3 }}
               >
                 <LessonViewer 
                   key={activeLesson.id}
                   lesson={activeLesson} 
                   course={activeCourse}
                   progress={progress}
                   onComplete={(score) => markCompleted(activeLesson.id, score)} 
                   onBack={() => {
                     setActiveLessonId(null);
                   }}
                 />
               </motion.div>
             ) : activeCourse ? (
               <motion.div 
                 key="course-overview"
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -20 }}
                 transition={{ duration: 0.3 }}
               >
                 <CourseOverview
                   course={activeCourse}
                   progress={progress}
                   user={user!}
                   customProfile={customProfile}
                   onSelectLesson={(lessonId) => setActiveLessonId(lessonId)}
                   onBack={() => setActiveCourseId(null)}
                 />
               </motion.div>
             ) : activeTab === 'home' ? (
               <motion.div 
                 key="home-panel"
                 initial={{ opacity: 0, scale: 0.98 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.98 }}
                 transition={{ duration: 0.3 }}
               >
                 <HomePanel
                   user={user}
                   customProfile={customProfile}
                   courses={mockDatabase.courses}
                   progress={progress}
                   onNavigateTab={(tab) => {
                     setActiveTab(tab);
                     setActiveCourseId(null);
                     setActiveLessonId(null);
                   }}
                   onSelectCourse={(courseId) => {
                     setActiveCourseId(courseId);
                     setActiveLessonId(null);
                   }}
                 />
               </motion.div>
             ) : activeTab === 'courses' ? (
               <motion.div 
                 key="courses-catalog"
                 initial={{ opacity: 0, scale: 0.98 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.98 }}
                 transition={{ duration: 0.3 }}
               >
                 <Dashboard 
                   user={user} 
                   courses={mockDatabase.courses} 
                   progress={progress} 
                   customProfile={customProfile}
                   onSelectCourse={(courseId) => {
                     setActiveCourseId(courseId);
                     setActiveLessonId(null);
                   }} 
                 />
               </motion.div>
             ) : activeTab === 'academic' ? (
               <motion.div 
                 key="academic-panel"
                 initial={{ opacity: 0, scale: 0.98 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.98 }}
                 transition={{ duration: 0.3 }}
               >
                 <AcademicPanel />
               </motion.div>
             ) : activeTab === 'calendar' ? (
               <motion.div 
                 key="calendar-panel"
                 initial={{ opacity: 0, scale: 0.98 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.98 }}
                 transition={{ duration: 0.3 }}
               >
                 <StudyCalendar 
                   progress={progress} 
                   totalLessons={mockDatabase.courses.reduce((acc, c) => acc + c.lessons.length, 0)} 
                 />
               </motion.div>
             ) : (
               <motion.div 
                 key="grades-panel"
                 initial={{ opacity: 0, scale: 0.98 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.98 }}
                 transition={{ duration: 0.3 }}
               >
                 <GradesPanel 
                   courses={mockDatabase.courses} 
                   progress={progress} 
                   user={user!} 
                   customProfile={customProfile}
                 />
               </motion.div>
             )}
           </AnimatePresence>
         </div>
      </main>



      <footer className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 border-t border-[#E0D7C6] dark:border-zinc-800 h-16 flex items-center justify-around z-40 px-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] transition-colors duration-300">
        <button 
          onClick={() => {
            setActiveCourseId(null);
            setActiveLessonId(null);
            setSidebarOpen(false);
          }}
          className={`flex flex-col items-center gap-1 transition-colors ${!activeCourseId ? 'text-[#7F1D1D]' : 'text-gray-400'}`}
        >
          <LayoutDashboard size={20} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Inicio</span>
        </button>

        {activeCourseId && (
          <button 
            onClick={() => {
              setActiveLessonId(null);
              setSidebarOpen(false);
            }}
            className={`flex flex-col items-center gap-1 transition-colors ${activeCourseId && !activeLessonId ? 'text-[#7F1D1D]' : 'text-gray-400'}`}
          >
            <BookOpen size={20} />
            <span className="text-[10px] font-bold uppercase tracking-tighter">Módulo</span>
          </button>
        )}

        <button 
          onClick={() => setSidebarOpen(prev => !prev)}
          className={`flex flex-col items-center gap-1 transition-colors ${sidebarOpen ? 'text-[#7F1D1D]' : 'text-gray-400'}`}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          <span className="text-[10px] font-bold uppercase tracking-tighter">{sidebarOpen ? 'Cerrar' : 'Menú'}</span>
        </button>
      </footer>

      <OfflineBanner />
    </div>
  );
}
