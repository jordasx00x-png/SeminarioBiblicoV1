import React, { useState, useEffect } from 'react';
import { X, BookOpen } from 'lucide-react';

const VERSES = [
  { text: "Lámpara es a mis pies tu palabra, Y lumbrera a mi camino.", reference: "Salmos 119:105" },
  { text: "Porque la palabra de Dios es viva y eficaz, y más cortante que toda espada de dos filos.", reference: "Hebreos 4:12" },
  { text: "Tu palabra es verdad.", reference: "Juan 17:17" },
  { text: "La hierba se seca, y se marchita la flor; mas la palabra del Dios nuestro permanece para siempre.", reference: "Isaías 40:8" },
  { text: "Guardad, pues, mucho a vuestras almas; que pues no visteis ninguna figura el día que Jehová habló con vosotros en Horeb de en medio del fuego.", reference: "Deuteronomio 4:15" },
  { text: "La suma de tu palabra es verdad; Y eterno es todo juicio de tu justicia.", reference: "Salmos 119:160" }
];

export function DailyVerseNotification() {
  const [isVisible, setIsVisible] = useState(false);
  const [verse, setVerse] = useState(VERSES[0]);

  useEffect(() => {
    // Basic day-of-year based selection
    const day = new Date().getDate();
    setVerse(VERSES[day % VERSES.length]);
    
    // Show after slight delay
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-10 fade-in duration-500">
      <div className="bg-white dark:bg-zinc-900 border border-[#E0D7C6] dark:border-zinc-700 shadow-xl rounded-lg p-5 w-80 flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2 text-[#7F1D1D] dark:text-red-400">
            <BookOpen size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">Versículo del día</span>
          </div>
          <button onClick={() => setIsVisible(false)} className="text-gray-400 dark:text-zinc-500 hover:text-black dark:hover:text-white">
            <X size={16} />
          </button>
        </div>
        <p className="text-sm font-serif italic text-gray-700 dark:text-zinc-200 leading-relaxed">
          "{verse.text}"
        </p>
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter text-right">
          — {verse.reference}
        </p>
      </div>
    </div>
  );
}
