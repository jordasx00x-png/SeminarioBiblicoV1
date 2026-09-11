import { BookOpen } from 'lucide-react';

interface ReadingToolbarProps {
  fontSize: 'normal' | 'large' | 'xlarge';
  setFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
  readingTheme: 'paper' | 'sepia' | 'contrast';
  setReadingTheme: (theme: 'paper' | 'sepia' | 'contrast') => void;
  scrollProgress: number;
  onOpenBibleViewer?: () => void;
}

export function ReadingToolbar({
  fontSize,
  setFontSize,
  readingTheme,
  setReadingTheme,
  scrollProgress,
  onOpenBibleViewer
}: ReadingToolbarProps) {
  return (
    <div className="sticky top-16 z-10 bg-white/95 backdrop-blur border-b border-[#E0D7C6] px-4 md:px-8 py-2.5 flex items-center justify-between shadow-xs transition-colors font-sans">
      {/* Scroll Progress Indicator & Bible Viewer Quick Action */}
      <div className="flex items-center gap-3">
        <div className="w-24 md:w-36 bg-stone-200 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-[#7F1D1D] h-full rounded-full transition-all duration-150"
            style={{ width: `${Math.min(100, Math.max(0, scrollProgress))}%` }}
          />
        </div>
        <span className="text-[11px] font-mono text-gray-500 font-medium">
          {Math.round(scrollProgress)}% leído
        </span>

        {onOpenBibleViewer && (
          <button
            onClick={onOpenBibleViewer}
            className="ml-2 px-2.5 py-1 rounded-md bg-amber-50 hover:bg-amber-100 border border-[#D1B17F]/60 text-[#7F1D1D] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            title="Abrir la Biblia completa con todas sus características en segunda pantalla"
          >
            <BookOpen size={13} />
            <span className="hidden sm:inline">Segunda Pantalla (La Biblia)</span>
          </button>
        )}
      </div>

      {/* Reader Controls */}
      <div className="flex items-center gap-3">
        {/* Font Size Selector */}
        <div className="flex items-center bg-stone-100 p-0.5 rounded-lg border border-stone-200">
          <button
            onClick={() => setFontSize('normal')}
            className={`px-2 py-1 text-xs font-bold rounded transition-all cursor-pointer ${
              fontSize === 'normal' ? 'bg-white shadow-xs text-[#1A2533]' : 'text-gray-500 hover:text-black'
            }`}
            title="Texto Estándar"
          >
            A
          </button>
          <button
            onClick={() => setFontSize('large')}
            className={`px-2 py-1 text-sm font-bold rounded transition-all cursor-pointer ${
              fontSize === 'large' ? 'bg-white shadow-xs text-[#1A2533]' : 'text-gray-500 hover:text-black'
            }`}
            title="Texto Grande"
          >
            A+
          </button>
          <button
            onClick={() => setFontSize('xlarge')}
            className={`px-2 py-1 text-base font-bold rounded transition-all cursor-pointer ${
              fontSize === 'xlarge' ? 'bg-white shadow-xs text-[#1A2533]' : 'text-gray-500 hover:text-black'
            }`}
            title="Texto Extra Grande"
          >
            A++
          </button>
        </div>

        {/* Paper Theme Selector */}
        <div className="hidden sm:flex items-center bg-stone-100 p-0.5 rounded-lg border border-stone-200">
          <button
            onClick={() => setReadingTheme('paper')}
            className={`px-2 py-1 text-[11px] font-medium rounded transition-all cursor-pointer ${
              readingTheme === 'paper' ? 'bg-white shadow-xs text-[#1A2533]' : 'text-gray-500 hover:text-black'
            }`}
            title="Fondo Blanco Natural"
          >
            Blanco
          </button>
          <button
            onClick={() => setReadingTheme('sepia')}
            className={`px-2 py-1 text-[11px] font-medium rounded transition-all cursor-pointer ${
              readingTheme === 'sepia' ? 'bg-[#F4ECD8] shadow-xs text-[#5B4636]' : 'text-gray-500 hover:text-black'
            }`}
            title="Fondo Sepia Papiro"
          >
            Papiro
          </button>
          <button
            onClick={() => setReadingTheme('contrast')}
            className={`px-2 py-1 text-[11px] font-medium rounded transition-all cursor-pointer ${
              readingTheme === 'contrast' ? 'bg-[#1A2533] shadow-xs text-white' : 'text-gray-500 hover:text-black'
            }`}
            title="Alto Contraste"
          >
            Editorial
          </button>
        </div>
      </div>
    </div>
  );
}

