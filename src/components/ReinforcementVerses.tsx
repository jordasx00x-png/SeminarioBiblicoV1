import { BookOpen, Bookmark, ExternalLink, Clock } from 'lucide-react';
import { VerseWithMetadata } from '../types';

interface ReinforcementVersesProps {
  verses: VerseWithMetadata[];
  onSelectVerse?: (verse: { reference: string; text: string }) => void;
}

export function ReinforcementVerses({ verses, onSelectVerse }: ReinforcementVersesProps) {
  if (!verses || verses.length === 0) return null;

  return (
    <section className="bg-white border border-[#E0D7C6] rounded-xl overflow-hidden shadow-sm flex flex-col font-sans mb-6">
      <div className="bg-[#7F1D1D] border-b border-[#991B1B] px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen size={16} className="text-[#FDFCFB]" />
          <h3 className="text-xs font-bold text-[#FDFCFB] uppercase tracking-[0.15em]">Versículos Complementarios de la Clase</h3>
        </div>
        <span className="text-[11px] text-amber-200 font-sans hidden sm:inline">
          Haga clic en un versículo para consultar exégesis completa
        </span>
      </div>

      <div className="p-6 bg-[#FEFCE8]/30">
        <div className="space-y-6">
          {verses.map((verse, index) => (
            <div 
              key={index} 
              onClick={() => onSelectVerse?.(verse)}
              className={`flex flex-col gap-2 rounded-xl p-4 transition-all bg-stone-50/70 border border-stone-200/80 ${
                onSelectVerse ? 'hover:bg-amber-100/60 cursor-pointer group hover:border-[#D1B17F]/60 shadow-2xs' : ''
              }`}
            >
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Bookmark size={14} className="text-[#7F1D1D]" />
                  <span className="text-sm font-bold text-[#1A2533] uppercase tracking-tight group-hover:text-[#7F1D1D] transition-colors">
                    {verse.reference}
                  </span>
                  {verse.readingTimeMinutes && (
                    <span className="text-[11px] font-semibold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-full flex items-center gap-1 border border-amber-200/60">
                      <Clock size={11} />
                      ~{verse.readingTimeMinutes} min de lectura
                    </span>
                  )}
                </div>
                {onSelectVerse && (
                  <span className="text-xs font-bold text-[#7F1D1D] group-hover:underline transition-all flex items-center gap-1">
                    <span>Abrir en Segunda Pantalla</span>
                    <ExternalLink size={12} />
                  </span>
                )}
              </div>

              {verse.relevance && (
                <p className="text-xs font-sans text-gray-600 bg-white/80 p-2 rounded border border-stone-200/60 font-medium">
                  📌 {verse.relevance}
                </p>
              )}

              <p className="text-[#2C2C2C] font-serif text-base md:text-lg leading-relaxed italic border-l-4 border-[#7F1D1D]/30 group-hover:border-[#7F1D1D] pl-4 py-1 transition-colors">
                "{verse.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

