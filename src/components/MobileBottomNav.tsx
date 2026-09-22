import React, { useState } from 'react';
import { Home, BookOpen, Edit3, Award, Menu, X, Bot, Calendar, FileText, Settings, Moon, Sun, LogOut, Sparkles, ChevronRight, Flame, Layers } from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';
import { motion, AnimatePresence } from 'motion/react';
import { PWAInstallButton } from './PWAInstallButton';

interface MobileBottomNavProps {
  activeTab: 'home' | 'courses' | 'academic' | 'calendar' | 'grades';
  onSelectTab: (tab: 'home' | 'courses' | 'academic' | 'calendar' | 'grades') => void;
  onResetCourseSelection?: () => void;
  onOpenAssistant?: () => void;
  onOpenNotes?: () => void;
  onOpenProfile?: () => void;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
  completedLessonsCount?: number;
  user?: FirebaseUser | null;
  customProfile?: { fullName?: string; email?: string; phoneNumber?: string };
  onSignOut?: () => void;
}

export function MobileBottomNav({
  activeTab,
  onSelectTab,
  onResetCourseSelection,
  onOpenAssistant,
  onOpenNotes,
  onOpenProfile,
  darkMode,
  onToggleDarkMode,
  completedLessonsCount = 0,
  user,
  customProfile,
  onSignOut
}: MobileBottomNavProps) {
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const studentName = customProfile?.fullName || user?.displayName || 'Estudiante';

  const handleTabClick = (tabId: 'home' | 'courses' | 'academic' | 'calendar' | 'grades') => {
    if (onResetCourseSelection) onResetCourseSelection();
    onSelectTab(tabId);
    setShowMoreMenu(false);
  };

  const navItems = [
    { id: 'home', label: 'Inicio', icon: Home, badge: null },
    { id: 'courses', label: 'Cursos', icon: BookOpen, badge: '29' },
    { id: 'academic', label: 'Biblia', icon: Edit3, badge: null },
    { id: 'grades', label: 'Kardex', icon: Award, badge: null },
  ] as const;

  return (
    <>
      {/* NATIVE BOTTOM NAVIGATION BAR (Visible strictly on mobile screens < md) */}
      <nav 
        aria-label="Navegación móvil"
        className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-[#0A0F1D]/95 dark:bg-[#070A14]/98 backdrop-blur-2xl border-t border-slate-800 shadow-[0_-8px_30px_rgba(0,0,0,0.6)]"
        style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 8px)' }}
      >
        <div className="flex items-center justify-around px-2 pt-2 pb-1 text-slate-400">
          
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id && !showMoreMenu;

            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`flex-1 relative flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all duration-200 cursor-pointer select-none active:scale-90 ${
                  isActive ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {/* Active Indicator Background */}
                {isActive && (
                  <motion.div
                    layoutId="mobileActiveTab"
                    className="absolute inset-0 bg-amber-500/15 border border-amber-500/30 rounded-xl"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}

                <div className="relative z-10 flex flex-col items-center gap-0.5">
                  <div className="relative">
                    <Icon size={20} className={isActive ? 'text-amber-400 scale-110 transition-transform' : 'text-slate-400'} />
                    {item.badge && (
                      <span className="absolute -top-1 -right-2 text-[8px] font-mono font-extrabold bg-amber-600 text-white px-1 py-0.2 rounded-full leading-none shadow-xs">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] tracking-tight leading-tight mt-0.5">
                    {item.label}
                  </span>
                </div>
              </button>
            );
          })}

          {/* "MÁS" MENU BUTTON */}
          <button
            onClick={() => setShowMoreMenu(prev => !prev)}
            className={`flex-1 relative flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all duration-200 cursor-pointer select-none active:scale-90 ${
              showMoreMenu || activeTab === 'calendar' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {(showMoreMenu || activeTab === 'calendar') && (
              <motion.div
                layoutId="mobileActiveTabMore"
                className="absolute inset-0 bg-amber-500/15 border border-amber-500/30 rounded-xl"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <div className="relative z-10 flex flex-col items-center gap-0.5">
              <Menu size={20} className={showMoreMenu || activeTab === 'calendar' ? 'text-amber-400 scale-110 transition-transform' : 'text-slate-400'} />
              <span className="text-[10px] tracking-tight leading-tight mt-0.5">
                Más
              </span>
            </div>
          </button>

        </div>
      </nav>

      {/* MOBILE ACTION SHEET (Drawer triggered by "Más") */}
      <AnimatePresence>
        {showMoreMenu && (
          <div className="fixed inset-0 z-50 md:hidden font-sans">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMoreMenu(false)}
              className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            />

            {/* Bottom Sheet Drawer */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="absolute inset-x-0 bottom-0 bg-[#0F172A] border-t border-slate-700/80 rounded-t-3xl shadow-2xl p-4 sm:p-6 max-h-[85vh] overflow-y-auto custom-scrollbar flex flex-col gap-4 text-slate-200"
              style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 24px)' }}
            >
              {/* Sheet Drag Indicator & Close */}
              <div className="flex items-center justify-between pb-1">
                <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto" />
                <button
                  onClick={() => setShowMoreMenu(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-full bg-slate-800/80 cursor-pointer"
                  title="Cerrar menú"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Student Card Summary */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-800/90 to-slate-900 border border-slate-700/70 flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-600 to-red-700 text-white flex items-center justify-center font-bold text-lg font-serif shadow-md border border-amber-400/30 shrink-0">
                    {studentName.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-white truncate">{studentName}</p>
                    <p className="text-[11px] text-amber-400 flex items-center gap-1">
                      <Flame size={12} className="fill-amber-400" />
                      <span>{completedLessonsCount} clases aprobadas</span>
                    </p>
                  </div>
                </div>
                {onOpenProfile && (
                  <button
                    onClick={() => {
                      setShowMoreMenu(false);
                      onOpenProfile();
                    }}
                    className="p-2 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition-colors"
                    title="Editar perfil"
                  >
                    <Settings size={16} />
                  </button>
                )}
              </div>

              {/* Featured: Asistente Teológico IA Card */}
              {onOpenAssistant && (
                <button
                  onClick={() => {
                    setShowMoreMenu(false);
                    onOpenAssistant();
                  }}
                  className="w-full p-4 rounded-2xl bg-gradient-to-r from-amber-600/20 via-amber-500/10 to-transparent border border-amber-500/40 text-left flex items-center justify-between cursor-pointer hover:border-amber-400 transition-all active:scale-98 group shadow-lg"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center shadow-md border border-amber-400/40 shrink-0">
                      <Bot size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-white">Asistente Teológico IA</span>
                        <Sparkles size={13} className="text-amber-300 animate-pulse" />
                      </div>
                      <p className="text-xs text-slate-300">Tutor bíblico y teológico interactivo</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-amber-400 group-hover:translate-x-1 transition-transform" />
                </button>
              )}

              {/* Secondary Navigation Section */}
              <div className="space-y-1.5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
                  Módulos de Estudio
                </p>

                {/* Plan / Cronograma */}
                <button
                  onClick={() => handleTabClick('calendar')}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors cursor-pointer text-left ${
                    activeTab === 'calendar' ? 'bg-amber-500/20 text-amber-200 border border-amber-500/30' : 'bg-slate-800/60 hover:bg-slate-800 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-700/60 text-amber-400">
                      <Calendar size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Cronograma de 3 Meses</p>
                      <p className="text-xs text-slate-400">Plan diario estructurado de clases</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-slate-400" />
                </button>

                {/* Bloc de Notas */}
                {onOpenNotes && (
                  <button
                    onClick={() => {
                      setShowMoreMenu(false);
                      onOpenNotes();
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 transition-colors cursor-pointer text-left text-slate-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-slate-700/60 text-amber-400">
                        <FileText size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Bloc de Notas Personal</p>
                        <p className="text-xs text-slate-400">Tus apuntes, reflexiones y exégesis</p>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-slate-400" />
                  </button>
                )}
              </div>

              {/* System & Settings Section */}
              <div className="space-y-1.5 pt-1 border-t border-slate-800">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
                  Preferencias & Dispositivo
                </p>

                {/* Dark Mode Switch */}
                {onToggleDarkMode && (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 text-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-slate-700/60 text-amber-400">
                        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                      </div>
                      <span className="text-sm font-semibold">
                        {darkMode ? 'Modo Oscuro Activo' : 'Modo Claro Activo'}
                      </span>
                    </div>
                    <button
                      onClick={onToggleDarkMode}
                      className="px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-colors cursor-pointer"
                    >
                      Cambiar
                    </button>
                  </div>
                )}

                {/* PWA Install Button */}
                <div className="pt-1">
                  <PWAInstallButton />
                </div>

                {/* Sign Out */}
                {onSignOut && (
                  <button
                    onClick={() => {
                      setShowMoreMenu(false);
                      onSignOut();
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-xl bg-red-950/30 hover:bg-red-900/40 text-red-300 border border-red-800/30 transition-colors text-left cursor-pointer mt-2"
                  >
                    <LogOut size={18} className="text-red-400" />
                    <span className="text-sm font-bold">Cerrar Sesión</span>
                  </button>
                )}
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
