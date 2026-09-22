import { BookOpen, Bookmark, ExternalLink, Clock } from 'lucide-react';
import { VerseWithMetadata } from '../types';

interface ReinforcementVersesProps {
  verses: VerseWithMetadata[];
  onSelectVerse?: (verse: { reference: string; text: string }) => void;
}

export function ReinforcementVerses({ verses, onSelectVerse }: ReinforcementVersesProps) {
  if (!verses || verses.length === 0) return null;

  return (
    <section className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg overflow-hidden shadow-xs flex flex-col font-sans mb-6">
      <div className="bg-[#7F1D1D] px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen size={15} className="text-amber-200" />
          <h3 className="text-xs font-semibold text-white uppercase tracking-widest">
            Pasajes Complementarios de Estudio
          </h3>
        </div>
        <span className="text-[11px] text-amber-200 font-sans hidden sm:inline">
          Haga clic en un pasaje para consultar en el visor bíblico
        </span>
      </div>

      <div className="p-5 md:p-6 bg-stone-50/50 dark:bg-stone-900/40">
        <div className="space-y-4">
          {verses.map((verse, index) => (
            <div 
              key={index} 
              onClick={() => onSelectVerse?.(verse)}
              className={`flex flex-col gap-2 rounded-lg p-4 transition-all bg-white dark:bg-stone-850 border border-stone-200/80 dark:border-stone-800 ${
                onSelectVerse ? 'hover:border-[#D1B17F] cursor-pointer group shadow-2xs' : ''
              }`}
            >
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Bookmark size={14} className="text-[#7F1D1D] dark:text-amber-400" />
                  <span className="text-sm font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wide group-hover:text-[#7F1D1D] dark:group-hover:text-amber-400 transition-colors">
                    {verse.reference}
                  </span>
                  {verse.readingTimeMinutes && (
                    <span className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-1">
                      <span>·</span>
                      <Clock size={11} />
                      ~{verse.readingTimeMinutes} min
                    </span>
                  )}
                </div>
                {onSelectVerse && (
                  <span className="text-xs font-semibold text-[#7F1D1D] dark:text-amber-400 group-hover:underline transition-all flex items-center gap-1">
                    <span>Ver pasaje</span>
                    <ExternalLink size={12} />
                  </span>
                )}
              </div>

              {verse.relevance && (
                <p className="text-xs font-sans text-stone-600 dark:text-stone-300 bg-stone-50 dark:bg-stone-900 p-2.5 rounded border border-stone-200 dark:border-stone-800">
                  <span className="font-semibold text-stone-800 dark:text-stone-200">Relevancia teológica:</span> {verse.relevance}
                </p>
              )}

              <p className="text-stone-800 dark:text-stone-200 font-serif text-base leading-relaxed italic border-l-2 border-[#7F1D1D]/40 dark:border-amber-400/40 group-hover:border-[#7F1D1D] dark:group-hover:border-amber-400 pl-4 py-1 transition-colors">
                &ldquo;{verse.text}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

