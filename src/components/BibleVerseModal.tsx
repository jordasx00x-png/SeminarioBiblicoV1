import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useDragControls, useMotionValue } from 'motion/react';
import { 
  BookOpen, 
  X, 
  Copy, 
  Check, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  Layers, 
  Bookmark, 
  ArrowRight, 
  Compass, 
  Sparkles, 
  FileText, 
  ExternalLink,
  GripHorizontal,
  RotateCcw,
  Eye,
  EyeOff,
  PanelRight,
  PanelLeft,
  Move,
  Search
} from 'lucide-react';
import { BibleVerseDetail, getVerseDetails } from '../data/bibleVerses';
import { AcademicPanel } from './AcademicPanel';
import { parseBibleReference } from '../utils/bibleParser';

interface BibleVerseModalProps {
  reference: string;
  fallbackText?: string;
  isOpen: boolean;
  onClose: () => void;
  onSelectCrossReference?: (ref: string) => void;
  isSplitMode?: boolean;
}

export function BibleVerseModal({
  reference,
  fallbackText,
  isOpen,
  onClose,
  onSelectCrossReference,
  isSplitMode = false
}: BibleVerseModalProps) {
  const [currentRef, setCurrentRef] = useState(reference);
  const [currentFallback, setCurrentFallback] = useState(fallbackText);
  const [viewMode, setViewMode] = useState<'full_panel' | 'quick_card'>('full_panel');
  const [selectedVersion, setSelectedVersion] = useState<'rvr1960' | 'nvi' | 'lbla' | 'dhh' | 'original'>('rvr1960');
  const [activeSubTab, setActiveSubTab] = useState<'text' | 'context' | 'exegesis' | 'cross' | 'original'>('text');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isReadingAudio, setIsReadingAudio] = useState(false);
  const [textSize, setTextSize] = useState<'normal' | 'large' | 'xlarge'>('large');

  // Dragging and window positioning controls
  const dragControls = useDragControls();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [dockPosition, setDockPosition] = useState<'center' | 'dock-right' | 'dock-left'>('center');
  const [isMoved, setIsMoved] = useState(false);
  const [seeThroughBackdrop, setSeeThroughBackdrop] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);

  // Dynamic window constraints to allow free movement across any screen width/height
  const [dragLimits, setDragLimits] = useState({ left: -700, right: 700, top: -450, bottom: 450 });

  useEffect(() => {
    const updateLimits = () => {
      const w = typeof window !== 'undefined' ? window.innerWidth : 1200;
      const h = typeof window !== 'undefined' ? window.innerHeight : 800;
      setDragLimits({
        left: -Math.floor(w * 0.45),
        right: Math.floor(w * 0.45),
        top: -Math.floor(h * 0.42),
        bottom: Math.floor(h * 0.42),
      });
    };
    updateLimits();
    window.addEventListener('resize', updateLimits);
    return () => window.removeEventListener('resize', updateLimits);
  }, []);

  // Reset position when opened or when full-screen is toggled
  useEffect(() => {
    if (isOpen) {
      x.set(0);
      y.set(0);
      setIsMoved(false);
      setDockPosition('center');
    }
  }, [isOpen]);

  useEffect(() => {
    if (isFullScreen) {
      x.set(0);
      y.set(0);
      setIsMoved(false);
    }
  }, [isFullScreen]);

  const handleResetPosition = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    x.set(0);
    y.set(0);
    setDockPosition('center');
    setIsMoved(false);
  };

  const handleDockRight = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    x.set(0);
    y.set(0);
    setDockPosition('dock-right');
    setIsMoved(true);
  };

  const handleDockLeft = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    x.set(0);
    y.set(0);
    setDockPosition('dock-left');
    setIsMoved(true);
  };

  const parsedRef = useMemo(() => {
    return parseBibleReference(currentRef);
  }, [currentRef]);

  // Keep state synchronized with props when opened with a new verse
  useEffect(() => {
    if (reference) {
      setCurrentRef(reference);
      setCurrentFallback(fallbackText);
      setViewMode('full_panel');
    }
  }, [reference, fallbackText]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Stop audio speech on close or unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isOpen]);

  const verseData: BibleVerseDetail = useMemo(() => {
    return getVerseDetails(currentRef, currentFallback);
  }, [currentRef, currentFallback]);

  const currentVerseText = useMemo(() => {
    switch (selectedVersion) {
      case 'nvi': return verseData.nvi;
      case 'lbla': return verseData.lbla;
      case 'dhh': return verseData.dhh;
      case 'original': return verseData.originalLanguage?.originalText || verseData.rvr1960;
      case 'rvr1960':
      default:
        return verseData.rvr1960;
    }
  }, [selectedVersion, verseData]);

  if (!isOpen) return null;

  // Handle Speech synthesis reading
  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) return;

    if (isReadingAudio) {
      window.speechSynthesis.cancel();
      setIsReadingAudio(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(`${verseData.reference}. ${currentVerseText}`);
      utterance.lang = 'es-ES';
      utterance.rate = 0.92;
      utterance.onend = () => setIsReadingAudio(false);
      utterance.onerror = () => setIsReadingAudio(false);
      window.speechSynthesis.speak(utterance);
      setIsReadingAudio(true);
    }
  };

  // Copy text to clipboard
  const handleCopy = () => {
    const textToCopy = `"${currentVerseText}" — ${verseData.reference} (${selectedVersion.toUpperCase()})`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  // Navigate to cross reference
  const handleCrossRefClick = (ref: string) => {
    setCurrentRef(ref);
    setCurrentFallback(undefined);
    setActiveSubTab('text');
    if (onSelectCrossReference) {
      onSelectCrossReference(ref);
    }
  };

  const textSizeClass = {
    normal: 'text-lg leading-relaxed',
    large: 'text-xl md:text-2xl leading-relaxed',
    xlarge: 'text-2xl md:text-3xl leading-loose'
  }[textSize];

  const isDocked = dockPosition !== 'center';
  const isTransparentOverlay = seeThroughBackdrop || isMoved || isDocked;

  if (isSplitMode) {
    return (
      <div className="w-full h-full bg-[#FAF9F5] dark:bg-stone-900 text-[#1A2533] dark:text-stone-100 flex flex-col border-stone-300 dark:border-stone-800 overflow-hidden font-serif">
        {/* Top Header: Institutional Academic Style */}
        <header 
          className="bg-[#FAF9F5] dark:bg-stone-900 px-5 py-3.5 flex items-center justify-between border-b-2 border-[#7F1D1D] shrink-0 font-sans select-none"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded bg-[#7F1D1D] flex items-center justify-center text-amber-100 shadow-sm shrink-0 border border-[#7F1D1D]/20">
              <BookOpen size={20} strokeWidth={1.5} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[9px] font-black tracking-wider uppercase text-[#7F1D1D] dark:text-amber-500">
                  Visor Canónico
                </span>
                <span className="text-[9px] font-semibold text-stone-400 uppercase tracking-widest hidden sm:inline">&bull; {verseData.book}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#1A2533] dark:text-stone-100 truncate leading-tight">
                {verseData.reference}
              </h2>
            </div>
          </div>

          {/* Header Right Actions */}
          <div className="flex items-center gap-2 font-sans">
            {/* Quick jump input */}
            <div className="relative hidden xl:block w-36">
              <input
                type="text"
                defaultValue={currentRef}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const val = (e.target as HTMLInputElement).value;
                    if (val.trim()) {
                      setCurrentRef(val.trim());
                      setCurrentFallback(undefined);
                    }
                  }
                }}
                placeholder="Ir a pasaje..."
                className="w-full text-xs px-2.5 py-1 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 outline-none focus:border-[#7F1D1D]"
              />
              <Search size={13} className="absolute right-2 top-2 text-stone-400 pointer-events-none" />
            </div>

            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-md bg-[#1A2533] hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm active:scale-95 flex items-center gap-1.5"
              title="Cerrar visor bíblico"
            >
              <X size={15} />
              <span>Cerrar</span>
            </button>
          </div>
        </header>

        {/* Sub-Header: Mode Selector & Secondary Actions */}
        <div className="bg-white dark:bg-stone-900 px-5 py-2.5 border-b border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-2 font-sans shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setViewMode('full_panel')}
              className={`pb-1 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border-b-2 ${
                viewMode === 'full_panel'
                  ? 'border-[#7F1D1D] text-[#1A2533] dark:text-stone-100'
                  : 'border-transparent text-stone-400 hover:text-stone-600'
              }`}
            >
              Biblia Completa
            </button>
            <button
              onClick={() => setViewMode('quick_card')}
              className={`pb-1 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border-b-2 ${
                viewMode === 'quick_card'
                  ? 'border-[#7F1D1D] text-[#1A2533] dark:text-stone-100'
                  : 'border-transparent text-stone-400 hover:text-stone-600'
              }`}
            >
              Ficha de Estudio
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleSpeech}
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest border transition-all cursor-pointer ${
                isReadingAudio 
                  ? 'bg-amber-100 border-amber-300 text-amber-800 animate-pulse' 
                  : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600 hover:bg-stone-50'
              }`}
            >
              {isReadingAudio ? <VolumeX size={13} /> : <Volume2 size={13} />}
              <span>{isReadingAudio ? 'Detener' : 'Voz'}</span>
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-600 hover:bg-stone-50 transition-all cursor-pointer"
            >
              {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
              <span>{copied ? 'Copiado' : 'Copiar'}</span>
            </button>
          </div>
        </div>

        {/* Dynamic Navigation Subtabs for Full Panel */}
        {viewMode === 'full_panel' && (
          <div className="bg-[#FAF9F5] dark:bg-stone-900/60 px-5 pt-2 border-b border-stone-200 dark:border-stone-800 flex items-center gap-2 overflow-x-auto custom-scrollbar font-sans shrink-0">
            {[
              { id: 'text', label: 'Texto del Pasaje', icon: BookOpen },
              { id: 'context', label: 'Contexto Inmediato', icon: Layers },
              { id: 'exegesis', label: 'Exégesis Teológica', icon: Sparkles },
              { id: 'cross', label: `Referencias (${verseData.crossReferences.length})`, icon: Bookmark },
              { id: 'original', label: 'Hebreo / Griego', icon: Compass }
            ].map(tab => {
              const TabIcon = tab.icon;
              const isActive = activeSubTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id as any)}
                  className={`flex items-center gap-2 py-2 px-3 text-xs font-semibold rounded-t-lg transition-all border-t-2 shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-white dark:bg-stone-800 text-[#7F1D1D] dark:text-amber-400 border-[#7F1D1D] shadow-xs'
                      : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800/50'
                  }`}
                >
                  <TabIcon size={14} className={isActive ? 'text-[#7F1D1D] dark:text-amber-400' : 'text-stone-400'} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Scrollable Main Body */}
        {viewMode === 'full_panel' ? (
          <div className="flex-1 min-h-0 overflow-hidden bg-[#FAF9F5] dark:bg-stone-950 flex flex-col">
            <AcademicPanel
              initialBookId={parsedRef?.book.id || 'gen'}
              initialChapter={parsedRef?.chapter || 1}
              initialVerse={parsedRef?.verse || 1}
              isSecondScreenMode={true}
              onCloseSecondScreen={onClose}
            />
          </div>
        ) : (
          <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-4 md:p-6 bg-[#FDFCFB] dark:bg-stone-950/40">
            {/* SubTab 1: Verse text and versions */}
            {activeSubTab === 'text' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-6 shadow-xs relative">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-5 border-b border-stone-200 dark:border-stone-800 font-sans">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mr-1">Versión:</span>
                      {(['rvr1960', 'nvi', 'lbla', 'dhh', 'original'] as const).map(ver => (
                        <button
                          key={ver}
                          onClick={() => setSelectedVersion(ver)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                            selectedVersion === ver
                              ? 'bg-[#7F1D1D] text-white shadow-xs'
                              : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200'
                          }`}
                        >
                          {ver.toUpperCase()}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-1 text-[10px] text-stone-400">
                      <span>Tamaño:</span>
                      {(['normal', 'large', 'xlarge'] as const).map(size => (
                        <button
                          key={size}
                          onClick={() => setTextSize(size)}
                          className={`px-1.5 py-0.5 rounded font-bold cursor-pointer ${
                            textSize === size ? 'bg-stone-200 dark:bg-stone-700 text-stone-900 dark:text-stone-100' : 'hover:text-stone-700'
                          }`}
                        >
                          {size === 'normal' ? 'A' : size === 'large' ? 'A+' : 'A++'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="relative">
                    <span className="text-4xl text-[#7F1D1D]/15 font-serif absolute -top-4 -left-2 select-none font-bold">“</span>
                    <p className={`text-stone-900 dark:text-stone-100 font-serif ${textSizeClass} relative z-10 pl-3 leading-relaxed`}>
                      {currentVerseText}
                    </p>
                    <span className="text-4xl text-[#7F1D1D]/15 font-serif absolute -bottom-6 right-2 select-none font-bold">”</span>
                  </div>

                  <div className="mt-6 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between font-sans text-xs text-stone-400">
                    <span>{verseData.reference} • Edición Académica</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-medium flex items-center gap-1">
                      <Check size={12} /> Canon Validado
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* SubTab 2: Surrounding Chapter Context */}
            {activeSubTab === 'context' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-xs">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-200 dark:border-stone-800 font-sans">
                    <div>
                      <h3 className="text-base font-serif font-bold text-stone-900 dark:text-stone-100">{verseData.context.heading}</h3>
                      <p className="text-xs text-stone-500">{verseData.book} — Capítulo {verseData.chapter}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-sans">
                      Contexto
                    </span>
                  </div>

                  <div className="space-y-2.5 font-serif text-stone-800 dark:text-stone-200">
                    {verseData.context.surroundingVerses.map((item, idx) => (
                      <div 
                        key={idx}
                        className={`p-3 rounded-lg transition-all flex items-start gap-2.5 ${
                          item.isTarget 
                            ? 'bg-amber-50 dark:bg-amber-950/30 border-l-2 border-[#7F1D1D] font-semibold text-stone-900 dark:text-stone-100' 
                            : 'hover:bg-stone-50 dark:hover:bg-stone-800/40'
                        }`}
                      >
                        <span className={`text-[10px] font-semibold font-sans px-1.5 py-0.5 rounded shrink-0 mt-0.5 ${
                          item.isTarget ? 'bg-[#7F1D1D] text-white' : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                        }`}>
                          v. {item.num}
                        </span>
                        <p className="text-sm md:text-base leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 pt-3 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/40 p-3 rounded-lg font-sans">
                    <h5 className="font-semibold text-xs uppercase tracking-wider text-[#7F1D1D] dark:text-amber-400 mb-1">
                      Marco Histórico y Canónico
                    </h5>
                    <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                      {verseData.context.historicalContext}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* SubTab 3: Exegesis & Theological Commentary */}
            {activeSubTab === 'exegesis' && (
              <div className="space-y-4 animate-in fade-in duration-300 font-sans">
                <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-xs space-y-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-stone-200 dark:border-stone-800">
                    <div className="w-8 h-8 rounded-lg bg-[#111827] text-amber-200 flex items-center justify-center font-serif font-bold text-sm">
                      {verseData.commentary.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-sm">{verseData.commentary.author}</h4>
                      <p className="text-[10px] text-stone-500">Tratado Exegético y Teológico</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h5 className="text-[10px] font-semibold text-[#7F1D1D] dark:text-amber-400 uppercase tracking-wider mb-1">
                        Comentario Expositivo ({verseData.commentary.author})
                      </h5>
                      <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                        {verseData.commentary.notes}
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-[#FAF9F5] dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60 font-serif italic text-xs md:text-sm text-stone-800 dark:text-stone-200 leading-relaxed">
                      "{verseData.rvr1960}"
                    </div>

                    <div className="mt-3 pt-3 border-t border-stone-100 dark:border-stone-800">
                      <h5 className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider mb-1">
                        Aplicación Ministerial y Expositiva
                      </h5>
                      <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                        {verseData.commentary.application}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SubTab 4: Cross References */}
            {activeSubTab === 'cross' && (
              <div className="space-y-3 animate-in fade-in duration-300 font-sans">
                <div className="flex items-center justify-between pb-2 border-b border-stone-200 dark:border-stone-800">
                  <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
                    {verseData.crossReferences.length} Pasajes Paralelos y Correlativos
                  </span>
                  <span className="text-[10px] text-stone-400">Clic para saltar al pasaje</span>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {verseData.crossReferences.map((refItem, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleCrossRefClick(refItem.reference)}
                      className="p-3 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-[#7F1D1D] dark:hover:border-amber-500 transition-all cursor-pointer group shadow-xs"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-serif font-bold text-xs text-[#7F1D1D] dark:text-amber-400 group-hover:underline">
                          {refItem.reference}
                        </span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 uppercase font-semibold">
                          {refItem.label}
                        </span>
                      </div>
                      {refItem.text && (
                        <p className="text-xs font-serif text-stone-700 dark:text-stone-300 line-clamp-2">
                          {refItem.text}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SubTab 5: Original Language */}
            {activeSubTab === 'original' && (
              <div className="space-y-4 animate-in fade-in duration-300 font-sans">
                <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
                    <div>
                      <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-sm">
                        Texto en {verseData.originalLanguage?.language || 'Idioma Original'}
                      </h4>
                      <p className="text-[10px] text-stone-500">Morfología, Raíz y Transliteración</p>
                    </div>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                      {verseData.originalLanguage?.language}
                    </span>
                  </div>

                  <div className="p-4 rounded-lg bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700 text-center space-y-2">
                    <div className="text-xl md:text-2xl font-serif text-stone-900 dark:text-stone-100 py-1" dir={verseData.originalLanguage?.language === 'Hebreo Bíblico' ? 'rtl' : 'ltr'}>
                      {verseData.originalLanguage?.originalText}
                    </div>
                    <div className="text-xs font-mono text-stone-500 italic">
                      Transliteración: {verseData.originalLanguage?.transliteration}
                    </div>
                  </div>

                  {verseData.originalLanguage && (
                    <div className="space-y-2 pt-2">
                      <h5 className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">
                        Término Clave y Raíz Léxica
                      </h5>
                      <div className="p-2.5 rounded bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700">
                        <div className="flex items-center justify-between">
                          <span className="font-serif font-bold text-xs text-stone-900 dark:text-stone-100">{verseData.originalLanguage.keyWord}</span>
                          <span className="text-[9px] font-mono text-stone-400">{verseData.originalLanguage.strong}</span>
                        </div>
                        <p className="text-[10px] text-[#7F1D1D] dark:text-amber-400 font-medium">{verseData.originalLanguage.meaning}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div 
      ref={constraintsRef}
      onClick={(e) => {
        if (e.target === constraintsRef.current && !isMoved && !isDocked && !seeThroughBackdrop) {
          onClose();
        }
      }}
      className={`fixed inset-0 z-50 flex transition-colors duration-200 ${
        isDocked 
          ? (dockPosition === 'dock-right' ? 'items-center justify-end p-2 sm:p-4' : 'items-center justify-start p-2 sm:p-4')
          : 'items-center justify-center p-2 sm:p-4 md:p-6'
      } ${
        isTransparentOverlay
          ? 'bg-black/20 pointer-events-none' 
          : 'bg-black/75 backdrop-blur-xs'
      }`}
    >
      <motion.div 
        drag={!isFullScreen && !isDocked}
        dragControls={dragControls}
        dragListener={false}
        dragMomentum={false}
        dragElastic={0.06}
        dragConstraints={dragLimits}
        style={{ x, y }}
        onDragStart={() => {
          setIsMoved(true);
          setDockPosition('center');
        }}
        initial={{ opacity: 0, scale: 0.97, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 12 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className={`pointer-events-auto bg-[#FAF9F5] dark:bg-stone-900 text-[#1A2533] dark:text-stone-100 rounded-lg shadow-2xl flex flex-col border border-stone-300 dark:border-stone-800 overflow-hidden font-serif ${
          isFullScreen 
            ? 'w-full h-full max-w-none max-h-none rounded-none' 
            : isDocked
            ? 'w-full sm:w-[560px] md:w-[640px] lg:w-[720px] max-w-full h-[95vh] max-h-[950px]'
            : 'w-full max-w-5xl h-[92vh] max-h-[850px]'
        }`}
      >
        {/* Top Header: Institutional Academic Style */}
        <header 
          onPointerDown={(e) => {
            const target = e.target as HTMLElement;
            if (target.closest('button, input, select, a, textarea')) return;
            if (!isFullScreen && !isDocked) {
              dragControls.start(e);
            }
          }}
          className={`bg-[#FAF9F5] dark:bg-stone-900 px-5 py-4 flex items-center justify-between border-b-2 border-[#7F1D1D] shrink-0 font-sans select-none transition-colors ${
            !isFullScreen && !isDocked ? 'cursor-grab active:cursor-grabbing hover:bg-stone-50' : ''
          }`}
        >
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-12 h-12 rounded bg-[#7F1D1D] flex items-center justify-center text-amber-100 shadow-sm shrink-0 border border-[#7F1D1D]/20">
              <BookOpen size={24} strokeWidth={1.5} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-bold tracking-wider uppercase text-[#7F1D1D] dark:text-amber-500">
                  Archivo Canónico
                </span>
                <span className="text-[10px] font-medium text-stone-400 uppercase tracking-widest hidden sm:inline">&bull; {verseData.book}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1A2533] dark:text-stone-100 truncate leading-tight">
                {verseData.reference}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Window Controls Group */}
            <div className="flex items-center gap-1.5 bg-stone-100 dark:bg-stone-800 p-1 rounded-md border border-stone-200 dark:border-stone-700">
              {!isFullScreen && (
                <>
                  <button
                    onClick={handleDockLeft}
                    title="Acoplar a la izquierda"
                    className={`p-1.5 rounded transition-colors cursor-pointer ${
                      dockPosition === 'dock-left' 
                        ? 'bg-white dark:bg-stone-700 text-[#7F1D1D] shadow-sm border border-stone-200 dark:border-stone-600' 
                        : 'text-stone-400 hover:text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    <PanelLeft size={16} strokeWidth={2} />
                  </button>
                  <button
                    onClick={handleResetPosition}
                    title="Restablecer posición"
                    className={`p-1.5 rounded transition-colors cursor-pointer ${
                      dockPosition === 'center' && !isMoved
                        ? 'bg-white dark:bg-stone-700 text-[#7F1D1D] shadow-sm border border-stone-200 dark:border-stone-600' 
                        : 'text-stone-400 hover:text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    <RotateCcw size={16} strokeWidth={2} />
                  </button>
                  <button
                    onClick={handleDockRight}
                    title="Acoplar a la derecha"
                    className={`p-1.5 rounded transition-colors cursor-pointer ${
                      dockPosition === 'dock-right' 
                        ? 'bg-white dark:bg-stone-700 text-[#7F1D1D] shadow-sm border border-stone-200 dark:border-stone-600' 
                        : 'text-stone-400 hover:text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    <PanelRight size={16} strokeWidth={2} />
                  </button>
                </>
              )}
              <button
                onClick={() => setIsFullScreen(!isFullScreen)}
                title={isFullScreen ? "Salir de pantalla completa" : "Pantalla completa"}
                className="p-1.5 rounded text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors cursor-pointer"
              >
                {isFullScreen ? <Minimize2 size={16} strokeWidth={2} /> : <Maximize2 size={16} strokeWidth={2} />}
              </button>
            </div>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-[#1A2533] hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm active:scale-95"
            >
              Cerrar Visor
            </button>
          </div>
        </header>

        {/* Sub-Header: Mode Selector & Secondary Actions */}
        <div className="bg-white dark:bg-stone-900 px-5 py-3 border-b border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 font-sans shrink-0">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setViewMode('full_panel')}
              className={`pb-1 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border-b-2 ${
                viewMode === 'full_panel'
                  ? 'border-[#7F1D1D] text-[#1A2533] dark:text-stone-100'
                  : 'border-transparent text-stone-400 hover:text-stone-600'
              }`}
            >
              Biblia Completa
            </button>
            <button
              onClick={() => setViewMode('quick_card')}
              className={`pb-1 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border-b-2 ${
                viewMode === 'quick_card'
                  ? 'border-[#7F1D1D] text-[#1A2533] dark:text-stone-100'
                  : 'border-transparent text-stone-400 hover:text-stone-600'
              }`}
            >
              Ficha de Estudio
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleSpeech}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest border transition-all cursor-pointer ${
                isReadingAudio 
                  ? 'bg-amber-100 border-amber-300 text-amber-800 animate-pulse' 
                  : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600 hover:bg-stone-50'
              }`}
            >
              {isReadingAudio ? <VolumeX size={14} /> : <Volume2 size={14} />}
              {isReadingAudio ? 'Detener Audio' : 'Escuchar Pasaje'}
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-600 hover:bg-stone-50 transition-all cursor-pointer"
            >
              {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
              {copied ? 'Copiado' : 'Copiar Texto'}
            </button>
            
            {!isFullScreen && (
              <button
                onClick={() => setSeeThroughBackdrop(!seeThroughBackdrop)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest border transition-all cursor-pointer ${
                  seeThroughBackdrop 
                    ? 'bg-[#D1B17F] border-[#D1B17F] text-white shadow-sm' 
                    : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600 hover:bg-stone-50'
                }`}
              >
                {seeThroughBackdrop ? <EyeOff size={14} /> : <Eye size={14} />}
                {seeThroughBackdrop ? 'Enfocar' : 'Ver Clase'}
              </button>
            )}
          </div>
        </div>

        {viewMode === 'full_panel' ? (
          <div className="flex-1 overflow-y-auto bg-[#FAF9F5] dark:bg-stone-950">
            <AcademicPanel
              initialBookId={parsedRef?.book.id || 'gen'}
              initialChapter={parsedRef?.chapter || 1}
              initialVerse={parsedRef?.verse || 1}
              isSecondScreenMode={true}
              onCloseSecondScreen={onClose}
            />
          </div>
        ) : (
          <>
            {/* Secondary Navigation Bar: Translations & Study Views */}
            <div className="bg-stone-100 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 px-4 sm:px-5 py-2.5 flex flex-wrap items-center justify-between gap-3 font-sans shrink-0">
          
          {/* Bible Version Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mr-1 shrink-0">
              Versión:
            </span>
            <button
              onClick={() => setSelectedVersion('rvr1960')}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                selectedVersion === 'rvr1960'
                  ? 'bg-[#7F1D1D] text-white shadow-xs'
                  : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 border border-stone-300 dark:border-stone-700'
              }`}
            >
              RVR 1960
            </button>
            <button
              onClick={() => setSelectedVersion('nvi')}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                selectedVersion === 'nvi'
                  ? 'bg-[#7F1D1D] text-white shadow-xs'
                  : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 border border-stone-300 dark:border-stone-700'
              }`}
            >
              NVI
            </button>
            <button
              onClick={() => setSelectedVersion('lbla')}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                selectedVersion === 'lbla'
                  ? 'bg-[#7F1D1D] text-white shadow-xs'
                  : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 border border-stone-300 dark:border-stone-700'
              }`}
            >
              LBLA
            </button>
            <button
              onClick={() => setSelectedVersion('dhh')}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                selectedVersion === 'dhh'
                  ? 'bg-[#7F1D1D] text-white shadow-xs'
                  : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 border border-stone-300 dark:border-stone-700'
              }`}
            >
              DHH
            </button>
            <button
              onClick={() => setSelectedVersion('original')}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                selectedVersion === 'original'
                  ? 'bg-[#111827] text-amber-200 shadow-xs border border-amber-300/40'
                  : 'bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-stone-200 border border-stone-300 dark:border-stone-700'
              }`}
            >
              Original (Hebreo/Griego)
            </button>
          </div>

          {/* Study Sub-Tabs: Institutional Style */}
          <div className="flex items-center gap-6 overflow-x-auto py-1">
            <button
              onClick={() => setActiveSubTab('text')}
              className={`text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center gap-1.5 border-b-2 pb-1 ${
                activeSubTab === 'text'
                  ? 'border-[#7F1D1D] text-[#1A2533] dark:text-stone-100'
                  : 'border-transparent text-stone-400 hover:text-stone-600'
              }`}
            >
              <FileText size={14} strokeWidth={2} />
              <span>Texto</span>
            </button>
            <button
              onClick={() => setActiveSubTab('context')}
              className={`text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center gap-1.5 border-b-2 pb-1 ${
                activeSubTab === 'context'
                  ? 'border-[#7F1D1D] text-[#1A2533] dark:text-stone-100'
                  : 'border-transparent text-stone-400 hover:text-stone-600'
              }`}
            >
              <Layers size={14} strokeWidth={2} />
              <span>Contexto</span>
            </button>
            <button
              onClick={() => setActiveSubTab('exegesis')}
              className={`text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center gap-1.5 border-b-2 pb-1 ${
                activeSubTab === 'exegesis'
                  ? 'border-[#7F1D1D] text-[#1A2533] dark:text-stone-100'
                  : 'border-transparent text-stone-400 hover:text-stone-600'
              }`}
            >
              <Compass size={14} strokeWidth={2} />
              <span>Exégesis</span>
            </button>
            <button
              onClick={() => setActiveSubTab('cross')}
              className={`text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center gap-1.5 border-b-2 pb-1 ${
                activeSubTab === 'cross'
                  ? 'border-[#7F1D1D] text-[#1A2533] dark:text-stone-100'
                  : 'border-transparent text-stone-400 hover:text-stone-600'
              }`}
            >
              <Sparkles size={14} strokeWidth={2} />
              <span>Paralelos</span>
            </button>
            {verseData.originalLanguage && (
              <button
                onClick={() => setActiveSubTab('original')}
                className={`text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center gap-1.5 border-b-2 pb-1 ${
                  activeSubTab === 'original'
                    ? 'border-[#7F1D1D] text-[#1A2533] dark:text-stone-100'
                    : 'border-transparent text-stone-400 hover:text-stone-600'
                }`}
              >
                <Bookmark size={14} strokeWidth={2} />
                <span>Léxico</span>
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Main Content Area */}
        <div className="flex-1 overflow-y-auto p-5 md:p-8 space-y-6">
          
          {/* SubTab 1: Reading View & Verse Display */}
          {activeSubTab === 'text' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Primary Focal Verse Card */}
              <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-6 md:p-8 shadow-xs relative overflow-hidden">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-100 dark:border-stone-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#7F1D1D]" />
                    <span className="font-sans text-xs font-semibold uppercase tracking-wider text-[#7F1D1D] dark:text-amber-400">
                      {verseData.context.theologicalTheme || 'Texto Bíblico Canónico'}
                    </span>
                  </div>
                  <span className="font-sans text-xs font-semibold text-stone-500 uppercase">
                    Versión {selectedVersion.toUpperCase()}
                  </span>
                </div>

                {/* The Scripture Text */}
                <blockquote className={`font-serif text-stone-900 dark:text-stone-100 italic font-medium leading-relaxed ${textSizeClass}`}>
                  "{currentVerseText}"
                </blockquote>

                <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 flex flex-wrap items-center justify-between gap-4 font-sans text-xs">
                  <span className="font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider text-sm">
                    — {verseData.reference}
                  </span>
                  <div className="text-stone-500 flex items-center gap-3">
                    <span>Libro: <strong className="text-stone-800 dark:text-stone-200">{verseData.book}</strong></span>
                    <span>&bull;</span>
                    <span>Capítulo: <strong className="text-stone-800 dark:text-stone-200">{verseData.chapter}</strong></span>
                  </div>
                </div>
              </div>

              {/* Parallel Comparative Grid */}
              <div className="space-y-3">
                <h4 className="font-sans text-xs font-semibold text-stone-500 uppercase tracking-wider flex items-center gap-2">
                  <Layers size={14} className="text-[#7F1D1D] dark:text-amber-400" />
                  <span>Comparativa Sinóptica de Traducciones</span>
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-sans">
                  {/* RVR1960 Card */}
                  <div 
                    onClick={() => setSelectedVersion('rvr1960')}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      selectedVersion === 'rvr1960' 
                        ? 'bg-amber-50/60 dark:bg-amber-950/20 border-[#7F1D1D] shadow-xs' 
                        : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-stone-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-xs uppercase text-[#7F1D1D] dark:text-amber-400">Reina-Valera 1960</span>
                      {selectedVersion === 'rvr1960' && <Check size={14} className="text-[#7F1D1D] dark:text-amber-400" />}
                    </div>
                    <p className="text-xs text-stone-700 dark:text-stone-300 line-clamp-4 leading-relaxed font-serif italic">
                      "{verseData.rvr1960}"
                    </p>
                  </div>

                  {/* NVI Card */}
                  <div 
                    onClick={() => setSelectedVersion('nvi')}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      selectedVersion === 'nvi' 
                        ? 'bg-amber-50/60 dark:bg-amber-950/20 border-[#7F1D1D] shadow-xs' 
                        : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-stone-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-xs uppercase text-[#7F1D1D] dark:text-amber-400">Nueva Versión Internacional</span>
                      {selectedVersion === 'nvi' && <Check size={14} className="text-[#7F1D1D] dark:text-amber-400" />}
                    </div>
                    <p className="text-xs text-stone-700 dark:text-stone-300 line-clamp-4 leading-relaxed font-serif italic">
                      "{verseData.nvi}"
                    </p>
                  </div>

                  {/* LBLA Card */}
                  <div 
                    onClick={() => setSelectedVersion('lbla')}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      selectedVersion === 'lbla' 
                        ? 'bg-amber-50/60 dark:bg-amber-950/20 border-[#7F1D1D] shadow-xs' 
                        : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-stone-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-xs uppercase text-[#7F1D1D] dark:text-amber-400">La Biblia de las Américas</span>
                      {selectedVersion === 'lbla' && <Check size={14} className="text-[#7F1D1D] dark:text-amber-400" />}
                    </div>
                    <p className="text-xs text-stone-700 dark:text-stone-300 line-clamp-4 leading-relaxed font-serif italic">
                      "{verseData.lbla}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Actions Footer Card */}
              <div className="bg-[#111827] text-white p-5 rounded-xl flex flex-wrap items-center justify-between gap-4 font-sans text-xs border border-stone-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-stone-800 text-[#D1B17F]">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <p className="font-serif font-bold text-stone-100">Profundizar en este Pasaje</p>
                    <p className="text-stone-400 text-[11px]">Consulte el contexto completo del capítulo o el comentario histórico exegético.</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveSubTab('context')}
                    className="px-3.5 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Ver Capítulo Completo</span>
                    <ArrowRight size={13} />
                  </button>
                  <button
                    onClick={() => setActiveSubTab('exegesis')}
                    className="px-3.5 py-2 rounded-lg bg-[#7F1D1D] hover:bg-red-800 text-white font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Exégesis & Comentario</span>
                    <Compass size={13} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SubTab 2: Surrounding Chapter Context */}
          {activeSubTab === 'context' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-6 md:p-8 shadow-xs">
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-200 dark:border-stone-800 font-sans">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100">{verseData.context.heading}</h3>
                    <p className="text-xs text-stone-500">{verseData.book} — Capítulo {verseData.chapter}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded text-xs font-semibold bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                    Contexto Inmediato
                  </span>
                </div>

                {/* Verses stream */}
                <div className="space-y-3 font-serif text-stone-800 dark:text-stone-200">
                  {verseData.context.surroundingVerses.map((item, idx) => (
                    <div 
                      key={idx}
                      className={`p-3.5 rounded-lg transition-all flex items-start gap-3 ${
                        item.isTarget 
                          ? 'bg-amber-50 dark:bg-amber-950/30 border-l-2 border-[#7F1D1D] font-semibold text-stone-900 dark:text-stone-100' 
                          : 'hover:bg-stone-50 dark:hover:bg-stone-800/40'
                      }`}
                    >
                      <span className={`text-xs font-semibold font-sans px-1.5 py-0.5 rounded shrink-0 mt-0.5 ${
                        item.isTarget ? 'bg-[#7F1D1D] text-white' : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                      }`}>
                        v. {item.num}
                      </span>
                      <p className="text-base md:text-lg leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Historical Note */}
                <div className="mt-8 pt-5 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/40 p-4 rounded-lg font-sans">
                  <h5 className="font-semibold text-xs uppercase tracking-wider text-[#7F1D1D] dark:text-amber-400 mb-1">
                    Marco Histórico y Canónico
                  </h5>
                  <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                    {verseData.context.historicalContext}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SubTab 3: Exegesis & Theological Commentary */}
          {activeSubTab === 'exegesis' && (
            <div className="space-y-6 animate-in fade-in duration-300 font-sans">
              
              {/* Author Commentary Box */}
              <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-6 md:p-8 shadow-xs space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-stone-200 dark:border-stone-800">
                  <div className="w-9 h-9 rounded-lg bg-[#111827] text-amber-200 flex items-center justify-center font-serif font-bold text-base">
                    {verseData.commentary.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-base">{verseData.commentary.author}</h4>
                    <p className="text-xs text-stone-500">Tratado Exegético y Teológico</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h5 className="text-xs font-semibold text-[#7F1D1D] dark:text-amber-400 uppercase tracking-wider mb-2">
                      Análisis Dogmático y Doctrinal
                    </h5>
                    <p className="text-sm md:text-base text-stone-800 dark:text-stone-200 leading-relaxed font-serif italic bg-[#FAF9F5] dark:bg-stone-800/40 p-5 rounded-lg border border-stone-200 dark:border-stone-800">
                      "{verseData.commentary.notes}"
                    </p>
                  </div>

                  <div>
                    <h5 className="text-xs font-semibold text-stone-800 dark:text-stone-200 uppercase tracking-wider mb-2">
                      Aplicación Hermenéutica y Pastoral
                    </h5>
                    <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed bg-emerald-50/50 dark:bg-emerald-950/20 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800/40">
                      {verseData.commentary.application}
                    </p>
                  </div>
                </div>
              </div>

              {/* Hermeneutic Principles */}
              <div className="bg-[#FAF9F5] dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-5 rounded-xl text-xs text-stone-700 dark:text-stone-300 space-y-2">
                <h5 className="font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wider">Regla Hermenéutica de la Reforma</h5>
                <p className="leading-relaxed">
                  <em>Scriptura Sacra sui ipsius interpres</em> (La Sagrada Escritura es su propio intérprete). La interpretación fiel de este texto debe armonizar siempre con la totalidad del consejo bíblico revelado.
                </p>
              </div>
            </div>
          )}

          {/* SubTab 4: Cross References / Parallel Passages */}
          {activeSubTab === 'cross' && (
            <div className="space-y-4 animate-in fade-in duration-300 font-sans">
              <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-6 shadow-xs">
                <div className="mb-4 pb-3 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">Pasajes Bíblicos Paralelos</h4>
                    <p className="text-xs text-stone-500">Haga clic en cualquier referencia para abrir su texto y contexto de inmediato.</p>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                    {verseData.crossReferences.length} referencias
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {verseData.crossReferences.map((cross, idx) => (
                    <div 
                      key={idx}
                      onClick={() => handleCrossRefClick(cross.reference)}
                      className="group p-4 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-[#7F1D1D] bg-[#FAF9F5] dark:bg-stone-800/40 hover:bg-amber-50/50 transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div className="space-y-1.5 mb-3">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-sm text-[#7F1D1D] dark:text-amber-400 group-hover:underline flex items-center gap-1.5">
                            <Bookmark size={14} />
                            {cross.reference}
                          </span>
                          <ExternalLink size={13} className="text-stone-400 group-hover:text-[#7F1D1D]" />
                        </div>
                        <p className="text-xs text-stone-700 dark:text-stone-300 line-clamp-3 italic font-serif">
                          "{cross.label}"
                        </p>
                      </div>
                      <span className="text-[11px] font-semibold text-stone-500 uppercase group-hover:text-[#7F1D1D]">
                        Abrir pasaje &rarr;
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SubTab 5: Original Language Lexicon */}
          {activeSubTab === 'original' && verseData.originalLanguage && (
            <div className="space-y-6 animate-in fade-in duration-300 font-sans">
              <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-6 md:p-8 shadow-xs space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#7F1D1D] dark:text-amber-400">
                      {verseData.originalLanguage.language}
                    </span>
                    <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100">Análisis Morfológico y Léxico</h3>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-[#111827] text-amber-200 text-xs font-mono font-semibold">
                    Strong: {verseData.originalLanguage.strong}
                  </span>
                </div>

                {/* Original script display */}
                <div className="bg-[#111827] text-white p-6 rounded-xl text-center space-y-2 border border-stone-800">
                  <p className="text-2xl md:text-3xl font-serif text-amber-300 tracking-wider">
                    {verseData.originalLanguage.originalText}
                  </p>
                  <p className="text-xs font-mono text-stone-400">
                    Transliteración: {verseData.originalLanguage.transliteration}
                  </p>
                </div>

                {/* Word breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800 space-y-1">
                    <span className="text-xs font-semibold text-stone-500 uppercase">Término Raíz Clave</span>
                    <p className="text-base font-bold text-stone-900 dark:text-stone-100">{verseData.originalLanguage.keyWord}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800 space-y-1">
                    <span className="text-xs font-semibold text-stone-500 uppercase">Significado Teológico</span>
                    <p className="text-sm text-stone-700 dark:text-stone-300">{verseData.originalLanguage.meaning}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
        </>
        )}

        {/* Footer with drag support */}
        <footer 
          onPointerDown={(e) => {
            const target = e.target as HTMLElement;
            if (target.closest('button, input, select, a, textarea')) return;
            if (!isFullScreen && !isDocked) {
              dragControls.start(e);
            }
          }}
          className={`bg-[#FAF9F5] dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 px-5 py-3 flex items-center justify-between font-sans text-xs text-stone-500 dark:text-stone-400 shrink-0 select-none ${
            !isFullScreen && !isDocked ? 'cursor-grab active:cursor-grabbing' : ''
          }`}
        >
          <div className="flex items-center gap-2">
            <span>Seminario Teológico Digital &bull; Visor de Escrituras</span>
            {!isFullScreen && (
              <span className="text-[11px] text-stone-400 dark:text-stone-500 italic hidden sm:inline">
                &bull; Puedes arrastrar o acoplar la ventana a los lados para estudiar junto a la clase
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#111827] hover:bg-stone-800 text-white font-semibold transition-colors cursor-pointer"
          >
            Cerrar Visor
          </button>
        </footer>
      </motion.div>
    </div>
  );
}
