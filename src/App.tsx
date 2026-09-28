import { useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  signInAnonymously,
  User 
} from 'firebase/auth';
import { auth } from './firebase';
import { mockDatabase } from './data';
import { UserProgress } from './types';
import { InteractiveSidebar } from './components/InteractiveSidebar';
import { HomePanel } from './components/HomePanel';
import { Dashboard } from './components/Dashboard';
import { AcademicPanel } from './components/AcademicPanel';
import { StudyCalendar } from './components/StudyCalendar';
import { GradesPanel } from './components/GradesPanel';
import { LessonViewer } from './components/LessonViewer';
import { LandingPage } from './components/LandingPage';
import { ProfileModal } from './components/ProfileModal';
import { VirtualAssistantWidget } from './components/VirtualAssistantWidget';
import { FloatingNotesWidget } from './components/FloatingNotesWidget';
import { BibleVerseModal } from './components/BibleVerseModal';
import { PWAInstallButton } from './components/PWAInstallButton';
import { safeStorage } from './utils/safeStorage';
import { Menu, Moon, Sun, BookOpen, Bot, BookMarked, Layers, Columns } from 'lucide-react';

const INITIAL_PROGRESS: UserProgress = {
  completedLessons: {},
  quizScores: {},
  notes: {},
  reflections: {},
  highlights: {},
  bookmarkedVerses: [],
  notebookEntries: [],
  unlockedCourses: []
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  // Navegación
  const [activeTab, setActiveTab] = useState<'home' | 'courses' | 'academic' | 'calendar' | 'grades'>('home');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

  // Modo Oscuro
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('darkMode');
      if (saved !== null) return saved === 'true';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('darkMode', String(darkMode));
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {
      console.warn('Dark mode storage error:', e);
    }
  }, [darkMode]);

  // Herramientas en segundo plano / Modales
  const [activeTool, setActiveTool] = useState<'notes' | 'assistant' | 'bible' | null>(null);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isBibleOpen, setIsBibleOpen] = useState(false);
  const [bibleReference, setBibleReference] = useState<string>('Juan 3:16');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Dividir Pantalla (Split Screen Mode)
  const [isSplitMode, setIsSplitMode] = useState(false);

  // Sidebar Expandido/Colapsado
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Perfil del Usuario
  const [customProfile, setCustomProfile] = useState<{ fullName?: string; email?: string; phoneNumber?: string }>(() => {
    try {
      const saved = safeStorage.getItem('custom_user_profile');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  // Progreso del Usuario
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = safeStorage.getItem('seminario_user_progress');
      return saved ? JSON.parse(saved) : INITIAL_PROGRESS;
    } catch (e) {
      return INITIAL_PROGRESS;
    }
  });

  useEffect(() => {
    if (!auth) {
      setAuthLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    if (!auth) return;
    setAuthError(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      console.error('Sign-in error:', err);
      if (err.code === 'auth/unauthorized-domain') {
        setAuthError('Este dominio no está autorizado en la consola de Firebase Authentication.');
      } else {
        setAuthError(err.message || 'Error al iniciar sesión con Google.');
      }
    }
  };

  const handleSignInAsGuest = async () => {
    if (!auth) return;
    try {
      await signInAnonymously(auth);
    } catch (err: any) {
      console.error('Guest sign-in error:', err);
    }
  };

  const handleSignOut = async () => {
    if (auth) await signOut(auth);
    setUser(null);
  };

  const handleSaveProfile = (profileData: { fullName?: string; email?: string; phoneNumber?: string }) => {
    setCustomProfile(profileData);
    safeStorage.setItem('custom_user_profile', JSON.stringify(profileData));
  };

  const handleCompleteLesson = (lessonId: string) => {
    setProgress(prev => {
      const updated = {
        ...prev,
        completedLessons: { ...prev.completedLessons, [lessonId]: true }
      };
      safeStorage.setItem('seminario_user_progress', JSON.stringify(updated));
      return updated;
    });
  };

  const handleToggleTool = (tool: 'notes' | 'assistant' | 'bible') => {
    if (tool === 'assistant') {
      setIsAssistantOpen(prev => !prev);
      setActiveTool(prev => prev === 'assistant' ? null : 'assistant');
    } else if (tool === 'notes') {
      setIsNotesOpen(prev => !prev);
      setActiveTool(prev => prev === 'notes' ? null : 'notes');
    } else if (tool === 'bible') {
      setIsBibleOpen(prev => !prev);
      setActiveTool(prev => prev === 'bible' ? null : 'bible');
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0F172A] text-white flex flex-col items-center justify-center p-6 font-sans">
        <div className="w-16 h-16 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mb-4" />
        <h2 className="text-xl font-serif font-bold tracking-wide">Cargando Seminario Teológico Digital...</h2>
        <p className="text-slate-400 text-xs mt-1">Conectando con la biblioteca académica</p>
      </div>
    );
  }

  if (!user) {
    return (
      <LandingPage 
        onSignIn={handleSignIn} 
        onSignInAsGuest={handleSignInAsGuest}
        authError={authError} 
      />
    );
  }

  const selectedCourse = mockDatabase.courses.find(c => c.id === selectedCourseId);
  const activeLesson = selectedCourse?.lessons.find(l => l.id === activeLessonId);

  return (
    <div className="min-h-screen bg-[#FAF9F5] dark:bg-[#121212] text-[#1A2533] dark:text-stone-100 flex flex-col md:flex-row font-sans transition-colors duration-300 relative">
      
      {/* 1. BARRA DE NAVEGACIÓN LATERAL EN LA IZQUIERDA (InteractiveSidebar) */}
      <div className="hidden md:block shrink-0 sticky top-0 h-screen z-40">
        <InteractiveSidebar
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveTab(tab);
            setSelectedCourseId(null);
            setActiveLessonId(null);
          }}
          user={user}
          customProfile={customProfile}
          progress={progress}
          onOpenProfile={() => setIsProfileOpen(true)}
          onOpenAssistant={() => handleToggleTool('assistant')}
          onOpenNotes={() => handleToggleTool('notes')}
          onOpenBibleBackground={() => handleToggleTool('bible')}
          activeTool={activeTool}
          onSignOut={handleSignOut}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(prev => !prev)}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
        />
      </div>

      {/* 2. ENCABEZADO MÓVIL (SÓLO EN PANTALLAS PEQUEÑAS) */}
      <div className="md:hidden sticky top-0 z-30 bg-[#1A2533] text-white px-4 py-3 flex items-center justify-between shadow-md border-b border-[#2C3E50]">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
            className="p-2 rounded-lg bg-[#2C3E50] text-amber-300 hover:bg-[#34495E]"
            aria-label="Abrir Menú"
          >
            <Menu size={20} />
          </button>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-sm tracking-wide text-amber-200">SEMINARIO TEOLÓGICO</span>
            <span className="text-[10px] text-stone-300">Plataforma Académica</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Botón Dividir Pantalla */}
          <button
            onClick={() => setIsSplitMode(prev => !prev)}
            className={`p-2 rounded-lg transition-colors ${isSplitMode ? 'bg-amber-500 text-stone-900' : 'bg-[#2C3E50] text-stone-300'}`}
            title="Dividir pantalla"
          >
            <Columns size={18} />
          </button>

          {/* Modo Oscuro */}
          <button
            onClick={() => setDarkMode(prev => !prev)}
            className="p-2 rounded-lg bg-[#2C3E50] text-amber-300"
            title="Cambiar Modo"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Perfil */}
          <button
            onClick={() => setIsProfileOpen(true)}
            className="w-8 h-8 rounded-full bg-[#7F1D1D] text-amber-100 font-bold text-xs flex items-center justify-center border border-amber-500/40"
          >
            {(customProfile?.fullName || user.displayName || 'U').charAt(0).toUpperCase()}
          </button>
        </div>
      </div>

      {/* DIBUJO DE MENÚ MÓVIL SI ESTÁ ABIERTO */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex">
          <div className="w-4/5 max-w-xs bg-[#1A2533] h-full text-white p-4 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center pb-4 mb-4 border-b border-stone-700">
                <span className="font-serif font-bold text-amber-300">Menú Principal</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-stone-400 p-1">✕</button>
              </div>

              <nav className="flex flex-col gap-2">
                {[
                  { id: 'home', label: 'Inicio', icon: BookOpen },
                  { id: 'courses', label: 'Cursos & Malla', icon: BookOpen },
                  { id: 'academic', label: 'Biblia & Exégesis', icon: BookOpen },
                  { id: 'calendar', label: 'Cronograma', icon: BookOpen },
                  { id: 'grades', label: 'Kardex Académico', icon: BookOpen },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id as any);
                      setSelectedCourseId(null);
                      setActiveLessonId(null);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`p-3 rounded-xl text-left font-semibold text-sm flex items-center gap-3 ${
                      activeTab === item.id ? 'bg-[#7F1D1D] text-white' : 'text-stone-300 hover:bg-[#2C3E50]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              <div className="mt-6 pt-4 border-t border-stone-700 flex flex-col gap-2">
                <span className="text-xs uppercase text-amber-400 font-bold tracking-wider px-1">Herramientas</span>
                <button
                  onClick={() => { handleToggleTool('notes'); setIsMobileMenuOpen(false); }}
                  className="p-3 rounded-xl text-left text-sm text-stone-200 hover:bg-[#2C3E50] flex items-center gap-3"
                >
                  <BookMarked size={18} /> Bitácora de Notas
                </button>
                <button
                  onClick={() => { handleToggleTool('assistant'); setIsMobileMenuOpen(false); }}
                  className="p-3 rounded-xl text-left text-sm text-stone-200 hover:bg-[#2C3E50] flex items-center gap-3"
                >
                  <Bot size={18} /> Consultor Doctrinal IA
                </button>
                <button
                  onClick={() => { handleToggleTool('bible'); setIsMobileMenuOpen(false); }}
                  className="p-3 rounded-xl text-left text-sm text-stone-200 hover:bg-[#2C3E50] flex items-center gap-3"
                >
                  <Layers size={18} /> Visor de Biblia
                </button>
              </div>
            </div>

            <button
              onClick={handleSignOut}
              className="p-3 rounded-xl bg-red-900/50 hover:bg-red-900 text-red-200 text-sm font-bold text-center mt-4"
            >
              Cerrar Sesión
            </button>
          </div>
          <div className="flex-1" onClick={() => setIsMobileMenuOpen(false)} />
        </div>
      )}

      {/* 3. CONTENEDOR PRINCIPAL / MODO DIVIDIDO (SPLIT SCREEN MODE) */}
      <div className="flex-1 flex flex-col md:flex-row min-w-0 overflow-x-hidden">
        
        {/* PANEL PRINCIPAL (IZQUIERDA O COMPLETO) */}
        <main className={`flex-1 transition-all duration-300 p-4 sm:p-6 lg:p-8 min-w-0 ${
          isSplitMode && (isNotesOpen || isAssistantOpen || isBibleOpen) ? 'md:w-1/2 lg:w-3/5' : 'w-full'
        }`}>
          
          {/* Botón rápido de Pantalla Dividida en Desktop */}
          <div className="hidden md:flex justify-between items-center mb-4">
            <div className="text-xs text-stone-500 dark:text-stone-400 font-medium">
              Seminario Teológico Digital • Campus Virtual
            </div>
            
            <button
              onClick={() => setIsSplitMode(prev => !prev)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                isSplitMode 
                  ? 'bg-amber-500 text-stone-900 border-amber-600 shadow-sm' 
                  : 'bg-stone-100 dark:bg-zinc-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-zinc-700 hover:bg-stone-200'
              }`}
              title="Dividir pantalla en dos paneles paralelos"
            >
              <Columns size={15} />
              <span>{isSplitMode ? 'Pantalla Dividida Activa' : 'Dividir Pantalla'}</span>
            </button>
          </div>

          {activeLessonId && selectedCourse ? (
            <LessonViewer
              course={selectedCourse}
              activeLessonId={activeLessonId}
              progress={progress}
              onBack={() => setActiveLessonId(null)}
              onCompleteLesson={handleCompleteLesson}
              onOpenAssistant={() => handleToggleTool('assistant')}
            />
          ) : activeTab === 'home' ? (
            <HomePanel
              user={user}
              customProfile={customProfile}
              courses={mockDatabase.courses}
              progress={progress}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onSelectCourse={(courseId) => {
                setSelectedCourseId(courseId);
                setActiveTab('courses');
              }}
            />
          ) : activeTab === 'courses' ? (
            <Dashboard
              user={user}
              courses={mockDatabase.courses}
              progress={progress}
              customProfile={customProfile}
              onSelectCourse={(courseId) => {
                setSelectedCourseId(courseId);
                const course = mockDatabase.courses.find(c => c.id === courseId);
                if (course && course.lessons.length > 0) {
                  setActiveLessonId(course.lessons[0].id);
                }
              }}
            />
          ) : activeTab === 'academic' ? (
            <AcademicPanel />
          ) : activeTab === 'calendar' ? (
            <StudyCalendar 
              courses={mockDatabase.courses} 
              progress={progress} 
              onSelectLesson={(lessonId) => {
                const course = mockDatabase.courses.find(c => c.lessons.some(l => l.id === lessonId));
                if (course) {
                  setSelectedCourseId(course.id);
                  setActiveLessonId(lessonId);
                }
              }} 
            />
          ) : activeTab === 'grades' ? (
            <GradesPanel 
              courses={mockDatabase.courses} 
              progress={progress} 
              user={user} 
              customProfile={customProfile} 
            />
          ) : null}
        </main>

        {/* PANEL DERECHO SI PANTALLA DIVIDIDA O HERRAMIENTAS ACTIVAS */}
        {isSplitMode && (isNotesOpen || isAssistantOpen || isBibleOpen) && (
          <div className="hidden md:block w-1/2 lg:w-2/5 border-l border-stone-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 h-screen sticky top-0 overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-stone-200 dark:border-zinc-800 mb-4">
              <span className="font-serif font-bold text-sm text-[#7F1D1D] dark:text-amber-400">
                {isAssistantOpen ? 'Consultoría Doctrinal IA' : isNotesOpen ? 'Bitácora de Notas' : 'Visor Bíblico'}
              </span>
              <button 
                onClick={() => setIsSplitMode(false)}
                className="text-xs text-stone-500 hover:text-black dark:hover:text-white"
              >
                Cerrar Panel
              </button>
            </div>

            {isAssistantOpen && (
              <VirtualAssistantWidget
                isOpen={true}
                onClose={() => setIsAssistantOpen(false)}
                activeCourseTitle={selectedCourse?.title}
                activeLessonTitle={activeLesson?.title}
              />
            )}

            {isNotesOpen && (
              <FloatingNotesWidget
                user={user}
                customProfileName={customProfile?.fullName}
                activeCourseTitle={selectedCourse?.title}
                activeLessonTitle={activeLesson?.title}
                courseId={selectedCourseId || undefined}
                lessonId={activeLessonId || undefined}
                isOpen={true}
                onClose={() => setIsNotesOpen(false)}
                isSplitMode={true}
              />
            )}

            {isBibleOpen && (
              <BibleVerseModal
                reference={bibleReference}
                isOpen={true}
                onClose={() => setIsBibleOpen(false)}
                isSplitMode={true}
              />
            )}
          </div>
        )}

      </div>

      {/* 4. MODALES Y HERRAMIENTAS FLOTANTES (MODO FLOTANTE NO SPLIT) */}
      {!isSplitMode && isAssistantOpen && (
        <VirtualAssistantWidget
          isOpen={isAssistantOpen}
          onClose={() => {
            setIsAssistantOpen(false);
            if (activeTool === 'assistant') setActiveTool(null);
          }}
          activeCourseTitle={selectedCourse?.title}
          activeLessonTitle={activeLesson?.title}
        />
      )}

      {!isSplitMode && isNotesOpen && (
        <FloatingNotesWidget
          user={user}
          customProfileName={customProfile?.fullName}
          activeCourseTitle={selectedCourse?.title}
          activeLessonTitle={activeLesson?.title}
          courseId={selectedCourseId || undefined}
          lessonId={activeLessonId || undefined}
          isOpen={isNotesOpen}
          onClose={() => {
            setIsNotesOpen(false);
            if (activeTool === 'notes') setActiveTool(null);
          }}
        />
      )}

      {!isSplitMode && isBibleOpen && (
        <BibleVerseModal
          reference={bibleReference}
          isOpen={isBibleOpen}
          onClose={() => {
            setIsBibleOpen(false);
            if (activeTool === 'bible') setActiveTool(null);
          }}
        />
      )}

      {/* MODAL DE PERFIL DE USUARIO */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
        customProfile={customProfile}
        onSave={handleSaveProfile}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(prev => !prev)}
      />

      {/* BOTÓN INSTALADOR PWA */}
      <PWAInstallButton />
    </div>
  );
}
