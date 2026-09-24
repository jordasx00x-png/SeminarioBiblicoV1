import { useState, useEffect, useRef } from 'react';
import { mockDatabase } from './data';
import { useProgress } from './hooks/useProgress';
import { useAuth } from './hooks/useAuth';
import { useProfile } from './hooks/useProfile';
import { useStudyReminder } from './hooks/useStudyReminder';
import { safeStorage } from './utils/safeStorage';
import { InteractiveSidebar } from './components/InteractiveSidebar';
import { LessonViewer } from './components/LessonViewer';
import { Dashboard } from './components/Dashboard';
import { CourseOverview } from './components/CourseOverview';
import { LandingPage } from './components/LandingPage';
import { ProfileModal } from './components/ProfileModal';
import { WelcomePage } from './components/WelcomePage';
import { AcademicPanel } from './components/AcademicPanel';
import { StudyCalendar } from './components/StudyCalendar';
import { GradesPanel } from './components/GradesPanel';
import { HomePanel } from './components/HomePanel';
import { OfflineBanner } from './components/OfflineBanner';
import { FloatingNotesWidget } from './components/FloatingNotesWidget';
import ChatTeologico from './ChatTeologico';
import { BibleVerseModal } from './components/BibleVerseModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const { user, isLoading: authLoading, authError, signInWithGoogle, signInAsGuest, signOut } = useAuth();
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'courses' | 'academic' | 'calendar' | 'grades'>('home');
  const [showProfile, setShowProfile] = useState(false);
  const [activeTool, setActiveTool] = useState<'notes' | 'assistant' | 'bible' | null>(null);
  const [bibleModalRef, setBibleModalRef] = useState('Juan 1:1');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() => {
    const saved = safeStorage.getItem('seminary_sidebar_open');
    return saved !== null ? saved === 'true' : true;
  });

  const handleToggleSidebar = () => {
    setIsSidebarOpen(prev => {
      const next = !prev;
      safeStorage.setItem('seminary_sidebar_open', String(next));
      return next;
    });
  };

  const handleOpenTool = (tool: 'notes' | 'assistant' | 'bible') => {
    setActiveTool(prev => (prev === tool ? null : tool));
  };

  const handleCloseTool = () => {
    setActiveTool(null);
  };

  const handleOpenBibleWithRef = (ref: string, _text?: string) => {
    setBibleModalRef(ref);
    setActiveTool('bible');
  };

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

  const handleResetZoom = () => {
    setZoomLevel(100);
    safeStorage.setItem('zoomLevel', '100');
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      (document.documentElement.style as any).zoom = `${zoomLevel}%`;
    }
    return () => {
      if (typeof document !== 'undefined') {
        (document.documentElement.style as any).zoom = '100%';
      }
    };
  }, [zoomLevel]);

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
      className="h-full w-full flex-1 bg-white dark:bg-zinc-950 text-slate-900 dark:text-slate-100 font-sans flex flex-col lg:flex-row relative transition-colors duration-300 overflow-hidden"
    >
      {/* Left Sidebar Navigation (Desktop left sidebar + Mobile top bar/drawer) */}
      <InteractiveSidebar
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={handleToggleSidebar}
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
        onOpenAssistant={() => handleOpenTool('assistant')}
        onOpenNotes={() => handleOpenTool('notes')}
        onOpenBibleBackground={() => handleOpenTool('bible')}
        activeTool={activeTool}
        onSignOut={signOut}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(prev => !prev)}
        onResetCourseSelection={() => {
          setActiveCourseId(null);
          setActiveLessonId(null);
        }}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onResetZoom={handleResetZoom}
        zoomLevel={zoomLevel}
      />

      <div 
        className="flex-1 min-h-0 min-w-0 flex flex-col h-full relative transition-all duration-300 ease-out overflow-hidden w-full"
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

        {/* WORKSPACE: Split 50/50 when any of the 3 tools is open */}
        <div className="flex-1 flex flex-col lg:flex-row min-h-0 w-full relative overflow-hidden bg-white dark:bg-zinc-950">
          
          {/* LEFT HALF: Information / Lesson / Course / Academic / Catalog */}
          <div 
            className={`flex flex-col min-h-0 relative overflow-hidden transition-all duration-300 ease-in-out ${
              activeTool 
                ? 'w-full lg:w-1/2 h-1/2 lg:h-full border-b lg:border-b-0 lg:border-r border-stone-200 dark:border-stone-800' 
                : 'w-full h-full'
            }`}
          >
            <main 
              ref={scrollContainerRef}
              className={`w-full flex-1 transition-all duration-300 ease-out ${activeTab === 'academic' ? 'h-full overflow-hidden' : 'overflow-y-auto pb-16 custom-scrollbar overscroll-contain'}`}
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
                      onOpenAssistant={() => handleOpenTool('assistant')}
                      onOpenBible={(ref, text) => handleOpenBibleWithRef(ref, text)}
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
                     className="flex-1 min-h-0 flex flex-col overflow-hidden h-full"
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
            </main>
          </div>

          {/* RIGHT HALF: Active Tool Window (Notes, Assistant, or Bible) */}
          {activeTool && (
            <div className="w-full lg:w-1/2 h-1/2 lg:h-full flex flex-col min-h-0 bg-white dark:bg-zinc-950 relative overflow-hidden shadow-2xl z-20 animate-in fade-in duration-200">
              {activeTool === 'notes' && (
                <FloatingNotesWidget 
                  user={user}
                  customProfileName={customProfile?.fullName}
                  activeCourseTitle={activeCourse?.title}
                  activeLessonTitle={activeLesson?.title}
                  courseId={activeCourse?.id}
                  lessonId={activeLesson?.id}
                  isOpen={true}
                  onClose={handleCloseTool}
                  isSplitMode={true}
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
                />
              )}

              {activeTool === 'assistant' && (
              <ChatTeologico />
              )}

              {activeTool === 'bible' && (
                <BibleVerseModal
                  isOpen={true}
                  reference={bibleModalRef}
                  onClose={handleCloseTool}
                  onSelectCrossReference={(crossRef) => setBibleModalRef(crossRef)}
                  isSplitMode={true}
              )}
            </div>
          )}

        </div>
      </div>

      {/* Dedicated Native Mobile Bottom Navigation Bar */}
      {/* Phrase Search Trigger in AcademicPanel is handled inside the component */}
      <OfflineBanner />
    </div>
  );
}
