import { useState, useEffect, useRef } from 'react';
import { mockDatabase } from './data';
import { useProgress } from './hooks/useProgress';
import { useAuth } from './hooks/useAuth';
import { useProfile } from './hooks/useProfile';
import { useStudyReminder } from './hooks/useStudyReminder';
import { safeStorage } from './utils/safeStorage';
import { InteractiveHeader } from './components/InteractiveHeader';
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
import { VirtualAssistantWidget } from './components/VirtualAssistantWidget';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const { user, isLoading: authLoading, authError, signInWithGoogle, signInAsGuest, signOut } = useAuth();
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'courses' | 'academic' | 'calendar' | 'grades'>('home');
  const [showProfile, setShowProfile] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const { profile: customProfile, saveProfile, isLoading: profileLoading } = useProfile();
  const { progress, markCompleted, resetAllProgress, isLoading: progressLoading } = useProgress();
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
    isDocked: boolean;
    width: number;
    rightOffset: number;
  }>({
    isOpen: false,
    isMinimized: false,
    isDocked: true,
    width: 0,
    rightOffset: 0
  });

  const isDockedDesktop = notesLayout.isOpen && !notesLayout.isMinimized && notesLayout.isDocked && typeof window !== 'undefined' && window.innerWidth >= 768;

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return safeStorage.getItem('darkMode') === 'true';
  });

  const [zoomLevel, setZoomLevel] = useState<number>(() => {
    const savedZoom = safeStorage.getItem('zoomLevel');
    return savedZoom ? parseInt(savedZoom, 10) : 100;
  });

  const handleZoomIn = () => {
    setZoomLevel(prev => {
      const next = Math.min(150, prev + 10);
      safeStorage.setItem('zoomLevel', next.toString());
      return next;
    });
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => {
      const next = Math.max(50, prev - 10);
      safeStorage.setItem('zoomLevel', next.toString());
      return next;
    });
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      safeStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      safeStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

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
    <div 
      className="min-h-screen bg-slate-50/80 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans flex flex-col relative transition-colors duration-300"
      style={{ zoom: `${zoomLevel}%` } as React.CSSProperties}
    >
      <DailyVerseNotification isAssistantOpen={isAssistantOpen} />

      {/* Full-width Top Interactive Header */}
      <InteractiveHeader
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
        onOpenAssistant={() => setIsAssistantOpen(true)}
        onSignOut={signOut}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(prev => !prev)}
        onResetCourseSelection={() => {
          setActiveCourseId(null);
          setActiveLessonId(null);
        }}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        zoomLevel={zoomLevel}
      />

      <div 
        className={`flex-1 flex flex-col w-full relative pt-4 transition-all duration-300 ease-out ${
          notesLayout.isOpen && !notesLayout.isMinimized
            ? 'lg:max-w-[calc(100vw-550px)] xl:max-w-[calc(100vw-560px)] lg:ml-0 lg:mr-auto pl-0 sm:pl-2 pr-2'
            : 'max-w-7xl mx-auto px-2 sm:px-4 md:px-6'
        }`}
      >
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
             className="w-full custom-scrollbar pb-24 md:pb-12 transition-all duration-300 ease-out"
           >
           <AnimatePresence mode="wait">
             {activeLesson && activeCourse ? (
               <motion.div 
                 key="lesson"
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 transition={{ duration: 0.25 }}
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
                   onOpenAssistant={() => setIsAssistantOpen(true)}
                 />
               </motion.div>
             ) : activeCourse ? (
               <motion.div 
                 key="course-overview"
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 transition={{ duration: 0.25 }}
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
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 transition={{ duration: 0.25 }}
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
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 transition={{ duration: 0.25 }}
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
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 transition={{ duration: 0.25 }}
               >
                 <AcademicPanel />
               </motion.div>
             ) : activeTab === 'calendar' ? (
               <motion.div 
                 key="calendar-panel"
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 transition={{ duration: 0.25 }}
               >
                 <StudyCalendar 
                   progress={progress} 
                   totalLessons={mockDatabase.courses.reduce((acc, c) => acc + c.lessons.length, 0)} 
                 />
               </motion.div>
             ) : (
               <motion.div 
                 key="grades-panel"
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 transition={{ duration: 0.25 }}
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
        onLayoutChange={setNotesLayout}
      />

      <VirtualAssistantWidget 
        isOpen={isAssistantOpen}
        onOpen={() => setIsAssistantOpen(true)}
        onClose={() => setIsAssistantOpen(false)}
        activeCourseTitle={activeCourse?.title}
        activeLessonTitle={activeLesson?.title}
      />

      <OfflineBanner />
    </div>
  );
}
