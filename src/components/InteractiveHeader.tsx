import React, { useState } from 'react';
import { Home, BookOpen, Edit3, Calendar, Award, Moon, Sun, Flame, CheckCircle2, User, Settings, LogOut, ChevronDown, Sparkles, Download, ZoomIn, ZoomOut, Bot, GraduationCap } from 'lucide-react';
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
  onOpenAssistant?: () => void;
  onSignOut?: () => void;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
  onResetCourseSelection?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  zoomLevel?: number;
}

export function InteractiveHeader({
  activeTab,
  onSelectTab,
  user,
  customProfile,
  progress,
  onOpenProfile,
  onOpenAssistant,
  onSignOut,
  darkMode,
  onToggleDarkMode,
  onResetCourseSelection,
  onZoomIn,
  onZoomOut,
  zoomLevel = 100
}: InteractiveHeaderProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showProgressTooltip, setShowProgressTooltip] = useState(false);

  const displayName = customProfile?.fullName || user?.displayName || 'Estudioso';
  const completedLessonsCount = Object.keys(progress.completedLessons || {}).length;

  const navTabs = [
    { id: 'home', label: 'Inicio', icon: Home },
    { id: 'courses', label: 'Cursos & Malla', icon: BookOpen },
    { id: 'academic', label: 'Biblia & Exégesis', icon: Edit3 },
    { id: 'calendar', label: 'Cronograma', icon: Calendar },
    { id: 'grades', label: 'Kardex', icon: Award },
  ] as const;

  const handleTabClick = (tabId: 'home' | 'courses' | 'academic' | 'calendar' | 'grades') => {
    if (onResetCourseSelection) onResetCourseSelection();
    onSelectTab(tabId);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-zinc-950 text-[#1A2533] dark:text-stone-100 border-b border-stone-200 dark:border-stone-800 shadow-sm">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        
        {/* Left: Brand Identity */}
        <button
          onClick={() => handleTabClick('home')}
          className="flex items-center gap-3 py-1 text-left transition-opacity hover:opacity-90 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded bg-[#7F1D1D] flex items-center justify-center text-amber-50 shadow-sm border border-[#7F1D1D]/10">
            <GraduationCap size={22} strokeWidth={1.5} />
          </div>
          <div className="flex flex-col text-left leading-none">
            <span className="font-serif tracking-[0.1em] text-[10px] sm:text-sm font-black text-[#1A2533] dark:text-stone-100 uppercase">
              Seminario Digital
            </span>
            <span className="font-sans text-[8px] sm:text-[10px] tracking-[0.2em] text-[#7F1D1D] dark:text-amber-500 uppercase font-bold mt-0.5">
              Campus Teológico
            </span>
          </div>
        </button>

        {/* Center: Main Interactive Tab Bar */}
        <nav className="flex items-center gap-0.5 sm:gap-1 lg:gap-2 px-1 py-1 justify-center flex-1">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`relative flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 lg:px-4 py-2 rounded text-[10px] sm:text-xs lg:text-[11px] font-bold uppercase tracking-wider sm:tracking-widest transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'text-[#7F1D1D] dark:text-amber-400'
                    : 'text-stone-500 hover:text-[#1A2533] dark:hover:text-white hover:bg-stone-50 dark:hover:bg-stone-900'
                }`}
              >
                <div className={`${isActive ? 'text-[#7F1D1D]' : 'text-stone-400'} shrink-0`}>
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className="hidden lg:inline">{tab.label}</span>
                <span className="inline lg:hidden">{tab.id === 'home' ? 'Inicio' : tab.id === 'courses' ? 'Cursos' : tab.id === 'academic' ? 'Biblia' : tab.id === 'calendar' ? 'Plan' : 'Kardex'}</span>
                
                {isActive && (
                  <motion.div 
                    layoutId="activeHeaderTab"
                    className="absolute -bottom-[13px] left-0 right-0 h-0.5 bg-[#7F1D1D]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Quick Controls & User Profile */}
        <div className="flex items-center gap-3 shrink-0">
          
          <div className="flex items-center gap-1 border-r border-stone-200 dark:border-stone-800 pr-3 mr-1">
            {/* Zoom Controls */}
            <div className="hidden lg:flex items-center rounded-md bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-0.5">
              <button onClick={onZoomOut} className="p-1.5 hover:bg-white dark:hover:bg-stone-800 rounded text-stone-500 transition-colors" title="Zoom Out"><ZoomOut size={14} /></button>
              <span className="text-[10px] font-bold px-1 text-stone-400 tabular-nums">{zoomLevel}%</span>
              <button onClick={onZoomIn} className="p-1.5 hover:bg-white dark:hover:bg-stone-800 rounded text-stone-500 transition-colors" title="Zoom In"><ZoomIn size={14} /></button>
            </div>

            {/* Dark Mode Toggle */}
            {onToggleDarkMode && (
              <button
                onClick={onToggleDarkMode}
                className="p-2 rounded-md hover:bg-stone-100 dark:hover:bg-stone-900 text-stone-500 hover:text-[#7F1D1D] transition-colors cursor-pointer"
                title={darkMode ? "Modo Claro" : "Modo Oscuro"}
              >
                {darkMode ? <Sun size={17} /> : <Moon size={17} />}
              </button>
            )}
          </div>

          {/* User Profile Button */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(prev => !prev)}
              className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full border border-stone-200 dark:border-stone-800 hover:border-[#7F1D1D] transition-all cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-900 text-[#7F1D1D] flex items-center justify-center font-bold text-xs border border-stone-200 dark:border-stone-800 group-hover:bg-[#7F1D1D] group-hover:text-white transition-colors">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <ChevronDown size={14} className="text-stone-400 group-hover:text-[#7F1D1D] transition-colors" />
            </button>

            {/* Profile Dropdown */}
            <AnimatePresence>
              {showProfileMenu && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-3 w-72 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl shadow-2xl p-2 z-50 text-stone-700"
                  onMouseLeave={() => setShowProfileMenu(false)}
                >
                  <div className="p-4 border-b border-stone-100 dark:border-stone-800 space-y-1">
                    <p className="text-sm font-serif font-black text-[#1A2533] dark:text-white truncate">{displayName}</p>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <p className="text-[10px] text-[#7F1D1D] dark:text-amber-500 font-bold uppercase tracking-widest">Alumno Matriculado</p>
                    </div>
                  </div>

                  <div className="py-2 space-y-1">
                    {onOpenAssistant && (
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          onOpenAssistant();
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-[11px] font-bold uppercase tracking-widest text-stone-600 hover:bg-[#7F1D1D] hover:text-white transition-all text-left cursor-pointer group"
                      >
                        <Bot size={16} className="text-[#7F1D1D] group-hover:text-white" />
                        <span>Consultor Doctrinal</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        onOpenProfile();
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-[11px] font-bold uppercase tracking-widest text-stone-600 hover:bg-stone-50 dark:hover:bg-stone-800 transition-all text-left cursor-pointer"
                    >
                      <User size={16} />
                      <span>Expediente Personal</span>
                    </button>

                    <div className="px-2 py-1">
                      <PWAInstallButton />
                    </div>

                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        onSignOut?.();
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-[11px] font-bold uppercase tracking-widest text-rose-600 hover:bg-rose-50 transition-all text-left cursor-pointer"
                    >
                      <LogOut size={16} />
                      <span>Finalizar Sesión</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Zoom Controls */}
          {(onZoomIn || onZoomOut) && (
            <div className="hidden sm:flex items-center gap-0.5 bg-slate-800/50 border border-slate-700/80 rounded-xl p-0.5 ml-1">
              <button
                onClick={onZoomOut}
                disabled={zoomLevel <= 50}
                className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                title="Alejar (Reducir tamaño)"
              >
                <ZoomOut size={16} />
              </button>
              <div className="w-10 text-center text-[10px] font-mono font-bold text-slate-400 select-none">
                {zoomLevel}%
              </div>
              <button
                onClick={onZoomIn}
                disabled={zoomLevel >= 150}
                className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                title="Acercar (Aumentar tamaño)"
              >
                <ZoomIn size={16} />
              </button>
            </div>
          )}

        </div>
      </div>
    </header>
  );
}
