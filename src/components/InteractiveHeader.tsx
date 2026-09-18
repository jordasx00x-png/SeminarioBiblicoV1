import React, { useState } from 'react';
import { Home, BookOpen, Edit3, Calendar, Award, Moon, Sun, Flame, CheckCircle2, User, Settings, LogOut, ChevronDown, Sparkles, Download } from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';
import { UserProgress } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { PWAInstallButton } from './PWAInstallButton';

interface InteractiveHeaderProps {
  activeTab: 'home' | 'courses' | 'academic' | 'calendar' | 'grades';
  onSelectTab: (tab: 'home' | 'courses' | 'academic' | 'calendar' | 'grades') => void;
  user?: FirebaseUser | null;
  customProfile?: { fullName?: string; email?: string; phoneNumber?: string };
  progress: UserProgress;
  onOpenProfile: () => void;
  onSignOut?: () => void;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
  onResetCourseSelection?: () => void;
}

export function InteractiveHeader({
  activeTab,
  onSelectTab,
  user,
  customProfile,
  progress,
  onOpenProfile,
  onSignOut,
  darkMode,
  onToggleDarkMode,
  onResetCourseSelection
}: InteractiveHeaderProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showProgressTooltip, setShowProgressTooltip] = useState(false);

  const displayName = customProfile?.fullName || user?.displayName || 'Estudioso';
  const completedLessonsCount = Object.keys(progress.completedLessons || {}).length;

  const navTabs = [
    { id: 'home', label: 'Inicio', icon: Home, badge: null },
    { id: 'courses', label: 'Cursos & Malla', icon: BookOpen, badge: '29' },
    { id: 'academic', label: 'Biblia & Exégesis', icon: Edit3, badge: 'RVR60' },
    { id: 'calendar', label: 'Cronograma', icon: Calendar, badge: '3M' },
    { id: 'grades', label: 'Kardex', icon: Award, badge: 'Boleta' },
  ] as const;

  const handleTabClick = (tabId: 'home' | 'courses' | 'academic' | 'calendar' | 'grades') => {
    if (onResetCourseSelection) onResetCourseSelection();
    onSelectTab(tabId);
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300 bg-[#0F172A]/95 dark:bg-[#0A0F1D]/95 backdrop-blur-2xl border-b border-slate-700/80 shadow-2xl">
      <div className="max-w-[1400px] mx-auto px-2 sm:px-4 md:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2 md:gap-4 text-white">
        
        {/* Left: Brand Logo Pill */}
        <button
          onClick={() => handleTabClick('home')}
          className="flex items-center gap-2.5 px-2 py-1.5 rounded-2xl hover:bg-slate-800/80 transition-all cursor-pointer group shrink-0 active:scale-95"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-700 via-amber-800 to-amber-600 flex items-center justify-center shadow-md border border-amber-500/40 group-hover:scale-105 transition-transform">
            <span className="font-serif font-extrabold text-white text-xs tracking-widest leading-none">STD</span>
          </div>
          <div className="hidden sm:flex flex-col text-left leading-tight">
            <span className="text-xs font-bold tracking-tight text-white font-sans flex items-center gap-1">
              SEMINARIO
              <span className="text-[8px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.2 rounded uppercase tracking-wider font-semibold">DIGITAL</span>
            </span>
            <span className="text-[9px] font-sans text-slate-400">Campus Interactivo</span>
          </div>
        </button>

        {/* Center: Main Interactive Floating Tab Bar */}
        <nav className="flex items-center gap-1 sm:gap-1.5 md:gap-2 overflow-x-auto px-1 py-1 max-w-full justify-center flex-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 lg:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold font-sans transition-all duration-200 cursor-pointer whitespace-nowrap active:scale-95 ${
                  isActive
                    ? 'text-white'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabBackground"
                    className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-700 rounded-xl sm:rounded-2xl shadow-md border border-amber-500/40"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                
                <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                  <Icon size={16} className={isActive ? 'text-amber-200' : 'text-slate-400 shrink-0'} />
                  <span className="hidden xl:inline">{tab.label}</span>
                  <span className="inline xl:hidden">{tab.id === 'home' ? 'Inicio' : tab.id === 'courses' ? 'Cursos' : tab.id === 'academic' ? 'Biblia' : tab.id === 'calendar' ? 'Plan' : 'Kardex'}</span>

                  {tab.badge && (
                    <span className={`hidden md:inline-flex text-[9px] px-1.5 py-0.2 rounded-md font-mono ${
                      isActive ? 'bg-amber-900/60 text-amber-200 border border-amber-400/40' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Right: Quick Controls, Streak & User Profile */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* Streak & Progress Interactive Pill */}
          <div className="relative">
            <button
              onClick={() => setShowProgressTooltip(prev => !prev)}
              className="hidden lg:flex items-center gap-2 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 px-3 py-1.5 rounded-2xl text-xs font-bold text-slate-200 transition-all cursor-pointer active:scale-95"
              title="Ver progreso de estudios"
            >
              <Flame size={15} className="text-amber-400 fill-amber-400/20 animate-pulse" />
              <span className="text-amber-400 font-mono">{completedLessonsCount} Clases</span>
            </button>

            {/* Progress Tooltip Popup */}
            {showProgressTooltip && (
              <div 
                className="absolute right-0 mt-2 w-64 bg-[#0A0F1D] border border-slate-700 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 text-slate-200"
                onMouseLeave={() => setShowProgressTooltip(false)}
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-3">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Sparkles size={14} className="text-amber-400" />
                    Progreso Teológico
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-400">{completedLessonsCount} Acreditadas</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                  Sigue avanzando lección por lección para acreditar tus diplomas y certificados académicos.
                </p>
                <button
                  onClick={() => {
                    setShowProgressTooltip(false);
                    handleTabClick('grades');
                  }}
                  className="w-full py-1.5 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold text-xs rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all text-center"
                >
                  Ver Boleta Oficial
                </button>
              </div>
            )}
          </div>

          {/* Dark Mode Toggle */}
          {onToggleDarkMode && (
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-2xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700/80 text-amber-400 transition-all cursor-pointer active:scale-95"
              title={darkMode ? "Modo Claro" : "Modo Oscuro"}
            >
              {darkMode ? <Sun size={17} className="text-amber-400 fill-amber-400/20" /> : <Moon size={17} className="text-slate-300" />}
            </button>
          )}

          {/* User Profile Button & Dropdown Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(prev => !prev)}
              className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-2xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700/80 transition-all text-xs font-bold text-slate-200 cursor-pointer active:scale-95"
            >
              <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-700 text-white flex items-center justify-center font-bold font-serif shadow-xs border border-amber-400/30">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <span className="hidden xl:inline max-w-[100px] truncate">{displayName}</span>
              <ChevronDown size={14} className="text-slate-400 hidden sm:inline" />
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div 
                className="absolute right-0 mt-2 w-60 bg-[#0F172A] border border-slate-700 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 text-slate-200"
                onMouseLeave={() => setShowProfileMenu(false)}
              >
                <div className="p-3 border-b border-slate-800 space-y-0.5">
                  <p className="text-xs font-bold text-white truncate">{displayName}</p>
                  <p className="text-[10px] text-amber-400 font-medium">Estudiante Registrado</p>
                </div>

                <div className="py-1 space-y-1">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      onOpenProfile();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium hover:bg-slate-800 hover:text-white transition-colors text-left cursor-pointer"
                  >
                    <Settings size={15} className="text-amber-400" />
                    <span>Ajustes del Perfil</span>
                  </button>

                  <div className="px-1 py-1">
                    <PWAInstallButton />
                  </div>
                </div>

                {onSignOut && (
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      onSignOut();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/10 transition-colors text-left mt-1 border-t border-slate-800 cursor-pointer"
                  >
                    <LogOut size={15} />
                    <span>Cerrar Sesión</span>
                  </button>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
