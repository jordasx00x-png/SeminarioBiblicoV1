import React, { useState } from 'react';
import { 
  Home, 
  BookOpen, 
  Edit3, 
  Calendar, 
  Award, 
  Moon, 
  Sun, 
  LogOut, 
  User, 
  Bot, 
  GraduationCap, 
  Menu, 
  X, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut,
  PanelLeftClose,
  PanelLeftOpen,
  BookMarked,
  Layers
} from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';
import { UserProgress } from '../types';

export interface InteractiveSidebarProps {
  activeTab: 'home' | 'courses' | 'academic' | 'calendar' | 'grades';
  onSelectTab: (tab: 'home' | 'courses' | 'academic' | 'calendar' | 'grades') => void;
  user?: FirebaseUser | null;
  customProfile?: { fullName?: string; email?: string; phoneNumber?: string };
  progress: UserProgress;
  onOpenProfile: () => void;
  onOpenAssistant?: () => void;
  onOpenNotes?: () => void;
  onOpenBibleBackground?: () => void;
  activeTool?: 'notes' | 'assistant' | 'bible' | null;
  onSignOut?: () => void;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
  onResetCourseSelection?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onResetZoom?: () => void;
  zoomLevel?: number;
  isSidebarOpen?: boolean;
  onToggleSidebar?: () => void;
}

export function InteractiveSidebar({
  activeTab,
  onSelectTab,
  user,
  customProfile,
  progress,
  onOpenProfile,
  onOpenAssistant,
  onOpenNotes,
  onOpenBibleBackground,
  activeTool = null,
  onSignOut,
  darkMode,
  onToggleDarkMode,
  onResetCourseSelection,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  zoomLevel = 100,
  isSidebarOpen = true,
  onToggleSidebar
}: InteractiveSidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const displayName = customProfile?.fullName || user?.displayName || 'Estudioso de la Palabra';
  const completedLessonsCount = Object.keys(progress.completedLessons || {}).length;

  const navTabs = [
    { 
      id: 'home', 
      label: 'Inicio', 
      subtitle: 'Panel Principal',
      icon: Home 
    },
    { 
      id: 'courses', 
      label: 'Cursos & Malla', 
      subtitle: 'Plan Curricular',
      icon: BookOpen 
    },
    { 
      id: 'academic', 
      label: 'Biblia & Exégesis', 
      subtitle: 'Léxico y Estudio',
      icon: Edit3 
    },
    { 
      id: 'calendar', 
      label: 'Cronograma', 
      subtitle: 'Agenda Semestral',
      icon: Calendar 
    },
    { 
      id: 'grades', 
      label: 'Kardex Académico', 
      subtitle: 'Acreditación',
      icon: Award 
    },
  ] as const;

  const handleTabClick = (tabId: 'home' | 'courses' | 'academic' | 'calendar' | 'grades') => {
    if (onResetCourseSelection) onResetCourseSelection();
    onSelectTab(tabId);
    setIsMobileOpen(false);
  };

  {/* ============================================================ */}
  {/* A. COLLAPSED MINI-SIDEBAR CONTENT (Icon-Only Mode)          */}
  {/* ============================================================ */}
  const renderCollapsedSidebarContent = () => (
    <div className="flex flex-col h-full justify-between items-center py-3 select-none">
      {/* Top Brand Seal & Expand Button */}
      <div className="flex flex-col items-center gap-2.5 pb-3 border-b border-stone-200 dark:border-stone-800 w-full px-2">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="p-2 text-stone-400 hover:text-[#7F1D1D] dark:hover:text-amber-400 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
            title="Expandir menú de navegación"
            aria-label="Expandir menú"
          >
            <PanelLeftOpen size={18} />
          </button>
        )}
      </div>

      {/* Navigation Icons: Principal Sections */}
      <div className="flex-1 overflow-y-auto w-full py-3 space-y-2 flex flex-col items-center custom-scrollbar">
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`relative p-3 rounded-xl transition-all cursor-pointer group flex items-center justify-center ${
                isActive
                  ? 'bg-[#7F1D1D] text-white shadow-md'
                  : 'text-stone-500 dark:text-stone-400 hover:text-[#1A2533] dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
              title={`${tab.label} (${tab.subtitle})`}
              aria-label={tab.label}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />

              {/* Active Indicator */}
              {isActive && (
                <span className="absolute -right-1 top-1/2 -translate-y-1/2 w-1.5 h-5 bg-amber-400 rounded-l-full shadow-sm" />
              )}
            </button>
          );
        })}

        {/* Separator: Apartado de Herramientas en Segundo Plano */}
        <div className="pt-2.5 mt-1 border-t border-stone-200 dark:border-stone-800 w-full flex flex-col items-center space-y-2">
          {/* 1. Bitácora de Estudio */}
          {onOpenNotes && (
            <button
              onClick={onOpenNotes}
              className={`relative p-3 rounded-xl transition-all cursor-pointer flex items-center justify-center ${
                activeTool === 'notes'
                  ? 'bg-[#1A2533] text-amber-300 shadow-md ring-2 ring-amber-400/50'
                  : 'text-stone-500 dark:text-stone-400 hover:text-[#1A2533] dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
              title="Bitácora de Estudio (Apuntes y notas)"
              aria-label="Bitácora de Estudio"
            >
              <BookMarked size={20} strokeWidth={2} />
              {activeTool === 'notes' && (
                <span className="absolute -right-1 top-1/2 -translate-y-1/2 w-1.5 h-4 bg-amber-400 rounded-l-full shadow-sm" />
              )}
            </button>
          )}

          {/* 2. Consultor Doctrinal */}
          {onOpenAssistant && (
            <button
              onClick={onOpenAssistant}
              className={`relative p-3 rounded-xl transition-all cursor-pointer flex items-center justify-center ${
                activeTool === 'assistant'
                  ? 'bg-[#7F1D1D] text-white shadow-md ring-2 ring-[#7F1D1D]/50'
                  : 'text-stone-500 dark:text-stone-400 hover:text-[#7F1D1D] dark:hover:text-amber-400 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
              title="Consultor Doctrinal (Asistente Teológico IA)"
              aria-label="Consultor Doctrinal"
            >
              <Bot size={20} strokeWidth={2} />
              {activeTool === 'assistant' && (
                <span className="absolute -right-1 top-1/2 -translate-y-1/2 w-1.5 h-4 bg-amber-400 rounded-l-full shadow-sm" />
              )}
            </button>
          )}

          {/* 3. Biblia en Segundo Plano */}
          {onOpenBibleBackground && (
            <button
              onClick={onOpenBibleBackground}
              className={`relative p-3 rounded-xl transition-all cursor-pointer flex items-center justify-center ${
                activeTool === 'bible'
                  ? 'bg-[#451A03] text-amber-100 shadow-md ring-2 ring-amber-500/50'
                  : 'text-stone-500 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
              title="Biblia Canónica (Visor de Pasajes)"
              aria-label="Biblia Canónica"
            >
              <Layers size={20} strokeWidth={2} />
              {activeTool === 'bible' && (
                <span className="absolute -right-1 top-1/2 -translate-y-1/2 w-1.5 h-4 bg-amber-400 rounded-l-full shadow-sm" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Bottom Utilities: Theme & Profile Avatar */}
      <div className="flex flex-col items-center gap-2.5 pt-3 border-t border-stone-200 dark:border-stone-800 w-full px-2">
        {onToggleDarkMode && (
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-lg text-stone-500 hover:text-[#7F1D1D] dark:hover:text-amber-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
            title={darkMode ? "Modo Claro" : "Modo Oscuro"}
          >
            {darkMode ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        )}

        <button
          onClick={onOpenProfile}
          className="w-9 h-9 rounded-xl bg-[#7F1D1D] text-amber-50 flex items-center justify-center font-bold text-xs shadow-sm hover:ring-2 hover:ring-[#7F1D1D]/30 transition-all cursor-pointer"
          title={`Expediente: ${displayName}`}
          aria-label="Expediente personal"
        >
          {displayName.charAt(0).toUpperCase()}
        </button>
      </div>
    </div>
  );

  {/* ============================================================ */}
  {/* B. EXPANDED FULL SIDEBAR CONTENT                            */}
  {/* ============================================================ */}
  const renderExpandedSidebarContent = (isMobile = false) => (
    <div className="flex flex-col h-full justify-between select-none">
      {/* 1. Header / Seminary Brand Identity */}
      <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between gap-2">
        <button
          onClick={() => handleTabClick('home')}
          className="flex items-center gap-3 text-left transition-opacity hover:opacity-90 cursor-pointer group min-w-0"
        >
          <div className="flex flex-col text-left leading-none min-w-0">
            <span className="font-serif tracking-wider text-xs sm:text-sm font-black text-[#1A2533] dark:text-stone-100 uppercase truncate">
              Seminario Digital
            </span>
            <span className="font-sans text-[8px] sm:text-[9px] tracking-widest text-[#7F1D1D] dark:text-amber-500 uppercase font-bold mt-1 truncate">
              Campus Teológico
            </span>
          </div>
        </button>

        {isMobile ? (
          <button
            onClick={() => setIsMobileOpen(false)}
            className="p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer shrink-0"
            aria-label="Cerrar menú"
          >
            <X size={20} />
          </button>
        ) : onToggleSidebar ? (
          <button
            onClick={onToggleSidebar}
            className="p-2 text-stone-400 hover:text-[#7F1D1D] dark:hover:text-amber-400 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800/80 transition-colors cursor-pointer shrink-0"
            title="Cerrar menú (mostrar solo logos)"
            aria-label="Colapsar a solo iconos"
          >
            <PanelLeftClose size={18} />
          </button>
        ) : null}
      </div>

      {/* 2. Main Navigation Items */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 custom-scrollbar">
        <div className="px-3 pb-2 flex items-center justify-between">
          <span className="text-[9px] font-black tracking-widest text-stone-400 dark:text-stone-500 uppercase">
            Navegación Principal
          </span>
        </div>

        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-left transition-all cursor-pointer group relative ${
                isActive
                  ? 'bg-[#7F1D1D] text-white shadow-md font-bold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-[#1A2533] dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-900 font-medium'
              }`}
            >
              <div
                className={`p-2 rounded-lg transition-colors shrink-0 ${
                  isActive
                    ? 'bg-black/20 text-white'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 group-hover:text-[#7F1D1D] dark:group-hover:text-amber-400 group-hover:bg-stone-200/70 dark:group-hover:bg-stone-800'
                }`}
              >
                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
              </div>

              <div className="flex-1 min-w-0">
                <p className={`text-xs tracking-wide truncate ${isActive ? 'text-white font-black' : 'font-semibold text-stone-800 dark:text-stone-200'}`}>
                  {tab.label}
                </p>
                <p className={`text-[10px] tracking-wider uppercase mt-0.5 truncate ${isActive ? 'text-white/80' : 'text-stone-400 dark:text-stone-500'}`}>
                  {tab.subtitle}
                </p>
              </div>

              {isActive && (
                <div className="w-1.5 h-6 rounded-full bg-white/40 shrink-0" />
              )}
            </button>
          );
        })}

        {/* ============================================================ */}
        {/* SEPARATED SECTION: Estudio en Segundo Plano & Herramientas   */}
        {/* ============================================================ */}
        <div className="pt-4 mt-3 border-t border-stone-200 dark:border-stone-800">
          <div className="px-3 pb-2 flex items-center justify-between">
            <span className="text-[9px] font-black tracking-widest text-[#7F1D1D] dark:text-amber-500 uppercase">
              Segundo Plano & Herramientas
            </span>
          </div>

          <div className="space-y-1.5">
            {/* 1. Bitácora de Estudio */}
            {onOpenNotes && (
              <button
                onClick={() => {
                  setIsMobileOpen(false);
                  onOpenNotes();
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left transition-all cursor-pointer group ${
                  activeTool === 'notes'
                    ? 'bg-[#1A2533] text-amber-300 shadow-sm ring-1 ring-amber-400/40 font-bold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-[#1A2533] dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-900'
                }`}
              >
                <div className={`p-2 rounded-lg transition-colors shrink-0 shadow-2xs ${
                  activeTool === 'notes'
                    ? 'bg-amber-400 text-[#1A2533]'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 group-hover:bg-[#1A2533] group-hover:text-amber-200'
                }`}>
                  <BookMarked size={17} strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold truncate">Bitácora de Estudio</p>
                  <p className="text-[10px] text-stone-400 uppercase tracking-wider truncate">
                    {activeTool === 'notes' ? '● En pantalla dividida' : 'Apuntes Personales'}
                  </p>
                </div>
              </button>
            )}

            {/* 2. Consultor Doctrinal */}
            {onOpenAssistant && (
              <button
                onClick={() => {
                  setIsMobileOpen(false);
                  onOpenAssistant();
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left transition-all cursor-pointer group ${
                  activeTool === 'assistant'
                    ? 'bg-[#7F1D1D] text-white shadow-sm ring-1 ring-red-400/40 font-bold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-[#7F1D1D] dark:hover:text-amber-400 hover:bg-stone-100 dark:hover:bg-stone-900'
                }`}
              >
                <div className={`p-2 rounded-lg transition-colors shrink-0 shadow-2xs ${
                  activeTool === 'assistant'
                    ? 'bg-amber-400 text-[#7F1D1D]'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 group-hover:bg-[#7F1D1D]/10 group-hover:text-[#7F1D1D] dark:group-hover:text-amber-400'
                }`}>
                  <Bot size={17} strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold truncate">Consultor Doctrinal</p>
                  <p className="text-[10px] text-stone-400 uppercase tracking-wider truncate">
                    {activeTool === 'assistant' ? '● En pantalla dividida' : 'Asistente Teológico IA'}
                  </p>
                </div>
              </button>
            )}

            {/* 3. Biblia en Segundo Plano */}
            {onOpenBibleBackground && (
              <button
                onClick={() => {
                  setIsMobileOpen(false);
                  onOpenBibleBackground();
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left transition-all cursor-pointer group ${
                  activeTool === 'bible'
                    ? 'bg-[#451A03] text-amber-100 shadow-sm ring-1 ring-amber-500/40 font-bold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-amber-700 dark:hover:text-amber-400 hover:bg-stone-100 dark:hover:bg-stone-900'
                }`}
              >
                <div className={`p-2 rounded-lg transition-colors shrink-0 shadow-2xs ${
                  activeTool === 'bible'
                    ? 'bg-amber-400 text-[#451A03]'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 group-hover:bg-amber-100 dark:group-hover:bg-amber-950/50 group-hover:text-amber-700 dark:group-hover:text-amber-400'
                }`}>
                  <Layers size={17} strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold truncate">Biblia en 2° Plano</p>
                  <p className="text-[10px] text-stone-400 uppercase tracking-wider truncate">
                    {activeTool === 'bible' ? '● En pantalla dividida' : 'Visor Flotante Móvil'}
                  </p>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. Bottom Utility & Profile Section */}
      <div className="p-3 border-t border-stone-200 dark:border-stone-800 bg-[#FAF9F5]/70 dark:bg-stone-950/60 space-y-2">
        
        {/* Zoom & Theme Bar */}
        <div className="flex items-center justify-between px-2 py-1 bg-white dark:bg-stone-900 rounded-lg border border-stone-200 dark:border-stone-800">
          {/* Zoom controls */}
          <div className="flex items-center gap-0.5">
            <button 
              onClick={onZoomOut} 
              disabled={zoomLevel <= 50}
              className="p-1 rounded text-stone-500 hover:text-[#7F1D1D] dark:hover:text-amber-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer" 
              title="Alejar pantalla"
            >
              <ZoomOut size={13} />
            </button>
            <button
              onClick={onResetZoom}
              className="text-[10px] font-bold px-1 text-stone-500 hover:text-[#7F1D1D] dark:hover:text-amber-400 tabular-nums cursor-pointer hover:underline transition-colors"
              title="Restablecer al 100%"
            >
              {zoomLevel}%
            </button>
            <button 
              onClick={onZoomIn} 
              disabled={zoomLevel >= 150}
              className="p-1 rounded text-stone-500 hover:text-[#7F1D1D] dark:hover:text-amber-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer" 
              title="Acercar pantalla"
            >
              <ZoomIn size={13} />
            </button>
          </div>

          {/* Theme Toggle */}
          {onToggleDarkMode && (
            <button
              onClick={onToggleDarkMode}
              className="p-1.5 rounded text-stone-500 hover:text-[#7F1D1D] dark:hover:text-amber-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
              title={darkMode ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
            >
              {darkMode ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          )}
        </div>

        {/* User Profile Card */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(prev => !prev)}
            className="w-full flex items-center gap-3 p-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-[#7F1D1D] dark:hover:border-amber-500/50 transition-all text-left cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#7F1D1D] text-amber-50 flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0 leading-tight">
              <p className="text-xs font-serif font-black text-[#1A2533] dark:text-stone-100 truncate">
                {displayName}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span className="text-[9px] text-[#7F1D1D] dark:text-amber-500 font-bold uppercase tracking-wider truncate">
                  {completedLessonsCount} Lecciones
                </span>
              </div>
            </div>
            <ChevronRight size={14} className="text-stone-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
          </button>

          {/* Profile Menu Popover */}
          <AnimatePresence>
            {showProfileMenu && (
              <motion.div 
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl shadow-2xl p-2 z-50 text-stone-700"
                onMouseLeave={() => setShowProfileMenu(false)}
              >
                <div className="p-3 border-b border-stone-100 dark:border-stone-800">
                  <p className="text-xs font-serif font-bold text-[#1A2533] dark:text-white truncate">{displayName}</p>
                  <p className="text-[9px] text-stone-400 uppercase tracking-widest mt-0.5">Estudiante Matriculado</p>
                </div>

                <div className="py-1 space-y-0.5">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      setIsMobileOpen(false);
                      onOpenProfile();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors text-left cursor-pointer"
                  >
                    <User size={14} />
                    <span>Expediente Personal</span>
                  </button>

                  <div className="px-1 py-0.5">
                    <PWAInstallButton />
                  </div>

                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      setIsMobileOpen(false);
                      onSignOut?.();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors text-left cursor-pointer"
                  >
                    <LogOut size={14} />
                    <span>Finalizar Sesión</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );

  return (
    <>
      {/* ============================================================ */}
      {/* 1. DESKTOP LEFT SIDEBAR (Expanded or Collapsed to Icon-Rail) */}
      {/* ============================================================ */}
      <aside 
        className={`hidden lg:flex flex-col shrink-0 h-full border-r border-stone-200 dark:border-stone-800 bg-white dark:bg-zinc-950 z-30 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'w-64 xl:w-72' : 'w-16'
        }`}
      >
        {isSidebarOpen ? renderExpandedSidebarContent(false) : renderCollapsedSidebarContent()}
      </aside>

      {/* ============================================================ */}
      {/* 2. MOBILE / TABLET TOP BAR (Visible on screens < lg)        */}
      {/* ============================================================ */}
      <header className="lg:hidden w-full h-14 bg-white dark:bg-zinc-950 border-b border-stone-200 dark:border-stone-800 px-4 flex items-center justify-between shrink-0 z-40">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileOpen(true)}
            className="p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white rounded-lg hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors cursor-pointer"
            aria-label="Abrir menú de navegación"
          >
            <Menu size={20} />
          </button>

          <div className="flex items-center gap-3">
            <div className="leading-tight">
              <span className="font-serif text-xs font-black text-[#1A2533] dark:text-stone-100 tracking-tight block truncate">
                Seminario Digital
              </span>
              <span className="font-sans text-[8px] tracking-widest text-[#7F1D1D] dark:text-amber-500 uppercase font-bold block">
                {navTabs.find(t => t.id === activeTab)?.label || 'Campus'}
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Right Controls */}
        <div className="flex items-center gap-2">
          {onToggleDarkMode && (
            <button
              onClick={onToggleDarkMode}
              className="p-2 text-stone-500 hover:text-[#7F1D1D] dark:hover:text-amber-400 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors cursor-pointer"
              title={darkMode ? "Modo Claro" : "Modo Oscuro"}
            >
              {darkMode ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          )}

          <button
            onClick={onOpenProfile}
            className="w-8 h-8 rounded-full bg-[#7F1D1D] text-white flex items-center justify-center font-bold text-xs cursor-pointer shadow-sm"
            title="Ver expediente personal"
          >
            {displayName.charAt(0).toUpperCase()}
          </button>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 3. MOBILE / TABLET SLIDE-OUT DRAWER OVERLAY                 */}
      {/* ============================================================ */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Slide-out Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 260 }}
              className="lg:hidden fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-white dark:bg-zinc-950 border-r border-stone-200 dark:border-stone-800 shadow-2xl z-50 flex flex-col"
            >
              {renderExpandedSidebarContent(true)}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// Alias for backwards compatibility if needed
export { InteractiveSidebar as InteractiveHeader };
