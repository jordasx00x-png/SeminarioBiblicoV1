import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, CheckCircle2, Clock, BookOpen, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addDays, isPast, isToday } from 'date-fns';
import { es } from 'date-fns/locale';

import { UserProgress } from '../types';

interface StudyCalendarProps {
  progress: UserProgress;
  totalLessons: number;
}

export function StudyCalendar({ progress, totalLessons }: StudyCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // We assume the study started at the beginning of the current month for calculation purposes
  // In a real app, this would be the user's join date
  const startDate = startOfMonth(new Date());
  
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const getLessonForDay = (date: Date) => {
    const diffTime = date.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays >= 0 && diffDays < totalLessons) {
      return diffDays + 1; // Lesson number
    }
    return null;
  };

  const completedCount = Object.keys(progress.completedLessons).length;
  const daysRemaining = totalLessons - completedCount;

  return (
    <div className="bg-white border border-[#E0D7C6] rounded-2xl overflow-hidden shadow-sm font-sans">
      {/* Header / Stats */}
      <div className="bg-[#1A2533] p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold uppercase tracking-widest flex items-center gap-2">
              <Target size={20} className="text-[#D1B17F]" />
              Plan de Estudio Personalizado
            </h3>
            <p className="text-xs text-gray-400">
              Objetivo: Completar el Seminario en {totalLessons} días ({Math.round(totalLessons / 30)} meses)
            </p>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-tighter text-gray-400 mb-1">Completado</p>
              <p className="text-2xl font-bold text-[#D1B17F]">{completedCount}<span className="text-sm font-normal text-gray-500">/{totalLessons}</span></p>
            </div>
            <div className="h-10 w-[1px] bg-gray-700/50"></div>
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-tighter text-gray-400 mb-1">Días Restantes</p>
              <p className="text-2xl font-bold text-white">{daysRemaining}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Calendar Navigation */}
        <div className="flex items-center justify-between mb-8">
          <h4 className="text-sm font-bold text-[#1A2533] uppercase tracking-widest">
            {format(currentDate, 'MMMM yyyy', { locale: es })}
          </h4>
          <div className="flex items-center gap-2">
            <button onClick={prevMonth} className="p-2 hover:bg-[#FAF9F6] rounded-full transition-colors text-gray-400">
              <ChevronLeft size={20} />
            </button>
            <button onClick={nextMonth} className="p-2 hover:bg-[#FAF9F6] rounded-full transition-colors text-gray-400">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 mb-2">
          {['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'].map((day) => (
            <div key={day} className="text-center text-[10px] font-bold text-gray-400 uppercase py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-px bg-[#E0D7C6] border border-[#E0D7C6]">
          {daysInMonth.map((date, idx) => {
            const lessonNum = getLessonForDay(date);
            const isTodayDate = isToday(date);
            const isPastDate = isPast(date) && !isTodayDate;
            const isCompleted = lessonNum && lessonNum <= completedCount;
            
            // Adjust for start of month
            const firstDayOfMonth = parseInt(format(startOfMonth(currentDate), 'i'));
            const style = idx === 0 ? { gridColumnStart: (firstDayOfMonth % 7) + 1 } : {};

            return (
              <div 
                key={date.toString()} 
                style={style}
                className={`min-h-[80px] bg-white p-2 flex flex-col gap-1 transition-all ${
                  !isSameMonth(date, currentDate) ? 'opacity-30' : 'opacity-100'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className={`text-xs font-medium ${isTodayDate ? 'bg-[#1A2533] text-white w-6 h-6 rounded-full flex items-center justify-center' : 'text-gray-400'}`}>
                    {format(date, 'd')}
                  </span>
                  {isCompleted && <CheckCircle2 size={12} className="text-green-500" />}
                </div>

                {lessonNum && (
                  <div className={`mt-auto p-1.5 rounded text-[9px] font-bold uppercase tracking-tighter ${
                    isCompleted 
                      ? 'bg-green-50 text-green-700' 
                      : isTodayDate 
                        ? 'bg-[#1A2533] text-white shadow-sm'
                        : isPastDate
                          ? 'bg-red-50 text-red-700 underline underline-offset-2'
                          : 'bg-[#FAF9F6] text-[#1A2533] border border-[#E0D7C6]'
                  }`}>
                    <div className="flex items-center gap-1">
                      <BookOpen size={10} />
                      Día {lessonNum}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap items-center gap-6 p-4 bg-[#FAF9F6] rounded-xl border border-[#F0E6D2]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Lección Completada</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#1A2533]"></div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Estudio de Hoy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-100 border border-red-200"></div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Pendiente (Atraso)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-white border border-[#E0D7C6]"></div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Futuro</span>
          </div>
        </div>
      </div>
    </div>
  );
}
