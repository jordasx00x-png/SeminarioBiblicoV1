import { useState, useEffect, useRef } from 'react';
import { mockDatabase } from './data';
import { useProgress } from './hooks/useProgress';
import { useAuth } from './hooks/useAuth';
import { useProfile } from './hooks/useProfile';
import { useStudyReminder } from './hooks/useStudyReminder';
import { safeStorage } from './utils/safeStorage';
import { Sidebar } from './components/Sidebar';
import { TopNavbar } from './components/TopNavbar';
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
import { FloatingNotesWidget } from './components/FloatingNotesWidget';
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

  const [notesLayout, setNotesLayout] = useState<{
    isOpen: boolean;
    isMinimized: boolean;
    width: number;
    rightOffset: number;
  }>({
    isOpen: false,
    isMinimized: false,
    width: 0,
    rightOffset: 0
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return safeStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      safeStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      safeStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

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
    <div className="min-h-screen bg-slate-50/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans flex flex-col relative transition-colors duration-300">
      <DailyVerseNotification />

      {/* Top Global Executive Campus Navbar */}
      <TopNavbar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          setActiveCourseId(null);
          setActiveLessonId(null);
        }}
        user={user}
        customProfile={customProfile}
        progress={progress}
        onOpenProfile={() => setShowProfile(true)}
        onSignOut={signOut}
        onToggleSidebar={() => setSidebarOpen(prev => !prev)}
        isSidebarOpen={sidebarOpen}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(prev => !prev)}
      />

      <div className="flex-1 flex relative">
        <Sidebar 
           courses={mockDatabase.courses}
           activeCourseId={activeCourseId}
           activeLessonId={activeLessonId}
           activeTab={activeTab}
           onSelectTab={setActiveTab}
           onSelectLesson={(courseId, lessonId) => {
             setActiveCourseId(courseId);
             setActiveLessonId(lessonId);
             setSidebarOpen(false);
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
           darkMode={darkMode}
           onToggleDarkMode={() => setDarkMode(prev => !prev)}
        />

        {/* Overlay to catch clicks off the sidebar in mobile view */}
        {sidebarOpen && (
           <div 
             className="fixed inset-0 z-30 bg-slate-950/70 backdrop-blur-sm md:hidden animate-in fade-in duration-300"
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
            darkMode={darkMode}
            onToggleDarkMode={() => setDarkMode(prev => !prev)}
          />
        )}
        </AnimatePresence>

        <main className="flex-1 flex flex-col min-h-0 w-full relative">
           <div 
             ref={scrollContainerRef}
             className="absolute inset-0 overflow-y-auto custom-scrollbar pb-24 md:pb-6 transition-all duration-300 ease-out"
             style={{
               paddingRight: notesLayout.isOpen && !notesLayout.isMinimized && typeof window !== 'undefined' && window.innerWidth >= 768
                 ? `${notesLayout.rightOffset}px`
                 : '0px'
             }}
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
      </div>

      <footer className="md:hidden fixed bottom-3 left-3 right-3 bg-[#0F172A]/95 text-slate-200 backdrop-blur-xl border border-slate-700/80 rounded-2xl h-16 flex items-center justify-around z-40 px-2 shadow-2xl transition-all font-sans">
        <button 
          onClick={() => {
            setActiveTab('home');
            setActiveCourseId(null);
            setActiveLessonId(null);
            setSidebarOpen(false);
          }}
          className={`flex flex-col items-center gap-1 transition-all px-3 py-1 rounded-xl ${!activeCourseId && activeTab === 'home' ? 'text-amber-400 bg-amber-400/10 font-bold scale-105' : 'text-slate-400 hover:text-white'}`}
        >
          <LayoutDashboard size={18} />
          <span className="text-[9px] font-bold uppercase tracking-wider">Inicio</span>
        </button>

        <button 
          onClick={() => {
            setActiveTab('courses');
            setActiveCourseId(null);
            setActiveLessonId(null);
            setSidebarOpen(false);
          }}
          className={`flex flex-col items-center gap-1 transition-all px-3 py-1 rounded-xl ${!activeCourseId && activeTab === 'courses' ? 'text-amber-400 bg-amber-400/10 font-bold scale-105' : 'text-slate-400 hover:text-white'}`}
        >
          <BookOpen size={18} />
          <span className="text-[9px] font-bold uppercase tracking-wider">Cursos</span>
        </button>

        <button 
          onClick={() => {
            setActiveTab('academic');
            setActiveCourseId(null);
            setActiveLessonId(null);
            setSidebarOpen(false);
          }}
          className={`flex flex-col items-center gap-1 transition-all px-3 py-1 rounded-xl ${!activeCourseId && activeTab === 'academic' ? 'text-amber-400 bg-amber-400/10 font-bold scale-105' : 'text-slate-400 hover:text-white'}`}
        >
          <Edit3 size={18} />
          <span className="text-[9px] font-bold uppercase tracking-wider">Biblia</span>
        </button>

        <button 
          onClick={() => setSidebarOpen(prev => !prev)}
          className={`flex flex-col items-center gap-1 transition-all px-3 py-1 rounded-xl ${sidebarOpen ? 'text-amber-400 bg-amber-400/10 font-bold scale-105' : 'text-slate-400 hover:text-white'}`}
        >
          {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          <span className="text-[9px] font-bold uppercase tracking-wider">{sidebarOpen ? 'Cerrar' : 'Menú'}</span>
        </button>
      </footer>

      <FloatingNotesWidget 
        user={user}
        customProfileName={customProfile?.fullName}
        activeCourseTitle={activeCourse?.title}
        activeLessonTitle={activeLesson?.title}
        courseId={activeCourse?.id}
        lessonId={activeLesson?.id}
        onNavigateToLesson={(cId, lId) => {
          let targetCourseId = cId;
          if (!targetCourseId && lId) {
            const course = mockDatabase.courses.find(c => c.lessons.some(l => l.id === lId));
            if (course) targetCourseId = course.id;
          }
          if (targetCourseId) {
            setActiveTab('courses');
            setActiveCourseId(targetCourseId);
            setActiveLessonId(lId);
          }
        }}
        onLayoutChange={(info) => setNotesLayout(info)}
      />

      <OfflineBanner />
    </div>
  );
}
