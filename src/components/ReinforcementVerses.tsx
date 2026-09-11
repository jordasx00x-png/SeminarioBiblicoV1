import { BookOpen, Bookmark, ExternalLink } from 'lucide-react';

interface ReinforcementVersesProps {
  verses: { reference: string; text: string }[];
  onSelectVerse?: (verse: { reference: string; text: string }) => void;
}

export function ReinforcementVerses({ verses, onSelectVerse }: ReinforcementVersesProps) {
  if (!verses || verses.length === 0) return null;

  return (
    <section className="bg-white border border-[#E0D7C6] rounded-xl overflow-hidden shadow-sm flex flex-col font-sans mb-6">
      <div className="bg-[#7F1D1D] border-b border-[#991B1B] px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen size={16} className="text-[#FDFCFB]" />
          <h3 className="text-xs font-bold text-[#FDFCFB] uppercase tracking-[0.15em]">Lecturas y Versículos de Refuerzo</h3>
        </div>
        <span className="text-[11px] text-amber-200 font-sans hidden sm:inline">
          Haga clic en un versículo para abrir en segunda pantalla
        </span>
      </div>

      <div className="p-6 bg-[#FEFCE8]/30">
        <div className="space-y-6">
          {verses.map((verse, index) => (
            <div 
              key={index} 
              onClick={() => onSelectVerse?.(verse)}
              className={`flex flex-col gap-2 rounded-xl p-3.5 transition-all ${
                onSelectVerse ? 'hover:bg-amber-100/60 cursor-pointer group border border-transparent hover:border-[#D1B17F]/50 shadow-2xs' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bookmark size={14} className="text-[#7F1D1D]" />
                  <span className="text-sm font-bold text-[#1A2533] uppercase tracking-tight group-hover:text-[#7F1D1D] transition-colors">
                    {verse.reference}
                  </span>
                </div>
                {onSelectVerse && (
                  <span className="text-xs font-bold text-[#7F1D1D] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    <span>Abrir en Segunda Pantalla</span>
                    <ExternalLink size={12} />
                  </span>
                )}
              </div>
              <p className="text-[#2C2C2C] font-serif text-lg leading-relaxed italic border-l-4 border-[#7F1D1D]/30 group-hover:border-[#7F1D1D] pl-4 py-1 transition-colors">
                "{verse.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

