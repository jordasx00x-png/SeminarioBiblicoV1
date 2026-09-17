import React, { useState } from 'react';
import { BookOpen, GraduationCap, Calendar as CalendarIcon, Award, Edit3, Home, Settings, User as UserIcon, LogOut, Menu, Sparkles, Flame, CheckCircle2, ChevronDown, Moon, Sun } from 'lucide-react';
import { User } from 'firebase/auth';
import { UserProgress } from '../types';

interface TopNavbarProps {
  activeTab: 'home' | 'courses' | 'academic' | 'calendar' | 'grades';
  onSelectTab: (tab: 'home' | 'courses' | 'academic' | 'calendar' | 'grades') => void;
  user?: User | null;
  customProfile?: { fullName?: string; email?: string; phoneNumber?: string };
  progress: UserProgress;
  onOpenProfile: () => void;
  onSignOut?: () => void;
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export function TopNavbar({
  activeTab,
  onSelectTab,
  user,
  customProfile,
  progress,
  onOpenProfile,
  onSignOut,
  onToggleSidebar,
  darkMode,
  onToggleDarkMode
}: TopNavbarProps) {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const completedLessonsCount = Object.keys(progress.completedLessons).length;
  const displayName = customProfile?.fullName || user?.displayName || 'Estudioso';

  const navItems = [
    { id: 'home', label: 'Campus Hub', icon: Home },
    { id: 'courses', label: 'Cursos & Grados', icon: BookOpen },
    { id: 'academic', label: 'Biblia Exegética', icon: Edit3 },
    { id: 'calendar', label: 'Cronograma', icon: CalendarIcon },
    { id: 'grades', label: 'Kardex & Boleta', icon: Award },
  ] as const;

  return (
    <header className="sticky top-0 z-50 bg-[#0F172A]/95 text-white backdrop-blur-xl border-b border-slate-800 shadow-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Branding & Mobile Menu Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700/60 active:scale-95 transition-all"
            aria-label="Abrir navegación lateral"
          >
            <Menu size={20} />
          </button>

          <div 
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#7F1D1D] via-amber-800 to-amber-600 flex items-center justify-center shadow-md border border-amber-500/40 group-hover:scale-105 transition-transform">
              <span className="font-serif font-bold text-white text-sm tracking-widest leading-none">STD</span>
            </div>
            <div className="hidden sm:flex flex-col justify-center leading-tight">
              <span className="text-sm font-bold tracking-tight text-white font-sans flex items-center gap-1.5">
                SEMINARIO
                <span className="text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.2 rounded-md uppercase tracking-wider font-semibold">DIGITAL</span>
              </span>
              <span className="text-[10px] font-sans font-medium text-slate-400">Teología y Exégesis</span>
            </div>
          </div>
        </div>

        {/* Center: Top Executive Horizontal Navigation Bar (Desktop & Tablet) */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800/80 shadow-inner">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold font-sans transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md scale-102 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-amber-200' : 'text-slate-400'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Quick Stats, Profile & Settings Menu */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Quick Dark Mode Toggle Button */}
          {onToggleDarkMode && (
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 text-amber-400 hover:text-amber-300 transition-all cursor-pointer active:scale-95"
              title={darkMode ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
              aria-label={darkMode ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
            >
              {darkMode ? <Sun size={17} className="text-amber-400 fill-amber-400/20" /> : <Moon size={17} className="text-slate-300" />}
            </button>
          )}

          {/* Streak & Progress Pills */}
          <div className="hidden lg:flex items-center gap-2 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-xl text-xs">
            <span className="flex items-center gap-1 font-bold text-amber-400">
              <Flame size={15} className="fill-amber-400" />
              <span>Día 1</span>
            </span>
            <span className="text-slate-700">|</span>
            <span className="flex items-center gap-1 font-bold text-emerald-400">
              <CheckCircle2 size={14} />
              <span>{completedLessonsCount} Acreditadas</span>
            </span>
          </div>

          {/* Profile Dropdown Toggle */}
          <div className="relative">
            <button
              onClick={() => setShowProfileDropdown(prev => !prev)}
              className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 transition-all text-xs font-bold text-slate-200 cursor-pointer active:scale-95"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-600 to-amber-700 text-white flex items-center justify-center font-bold font-serif shadow-xs">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <span className="hidden sm:inline max-w-[110px] truncate">{displayName}</span>
              <ChevronDown size={14} className="text-slate-400" />
            </button>

            {/* Profile Menu Dropdown */}
            {showProfileDropdown && (
              <div 
                className="absolute right-0 mt-2 w-56 bg-[#0F172A] border border-slate-700 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200 text-slate-200"
                onMouseLeave={() => setShowProfileDropdown(false)}
              >
                <div className="p-3 border-b border-slate-800">
                  <p className="text-xs font-bold text-white truncate">{displayName}</p>
                  <p className="text-[10px] text-amber-400 font-medium">Estudiante Activo</p>
                </div>

                <button
                  onClick={() => {
                    setShowProfileDropdown(false);
                    onOpenProfile();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium hover:bg-slate-800 hover:text-white transition-colors text-left"
                >
                  <Settings size={15} className="text-slate-400" />
                  <span>Configurar Perfil</span>
                </button>

                {onToggleDarkMode && (
                  <button
                    onClick={() => {
                      onToggleDarkMode();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium hover:bg-slate-800 hover:text-white transition-colors text-left"
                  >
                    <div className="flex items-center gap-2">
                      {darkMode ? <Sun size={15} className="text-amber-400" /> : <Moon size={15} className="text-slate-400" />}
                      <span>Modo Oscuro</span>
                    </div>
                    <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-mono uppercase">
                      {darkMode ? 'ON' : 'OFF'}
                    </span>
                  </button>
                )}

                {onSignOut && (
                  <button
                    onClick={() => {
                      setShowProfileDropdown(false);
                      onSignOut();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/10 transition-colors text-left mt-1 border-t border-slate-800"
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
