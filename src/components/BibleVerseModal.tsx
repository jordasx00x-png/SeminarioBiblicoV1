import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  ExternalLink 
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
}

export function BibleVerseModal({
  reference,
  fallbackText,
  isOpen,
  onClose,
  onSelectCrossReference
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <motion.div 
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className={`bg-[#FAF9F5] text-[#2C2C2C] rounded-2xl shadow-2xl flex flex-col border border-[#D1B17F]/40 overflow-hidden font-serif ${
          isFullScreen 
            ? 'w-full h-full max-w-none max-h-none rounded-none' 
            : 'w-full max-w-5xl h-[92vh] max-h-[850px]'
        }`}
      >
        {/* Top Header */}
        <header className="bg-[#1A2533] text-white px-5 py-4 flex items-center justify-between border-b border-[#2C3E50] shrink-0 font-sans">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#7F1D1D] flex items-center justify-center text-amber-200 shadow-md shrink-0">
              <BookOpen size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase bg-[#D1B17F]/20 text-[#E0D7C6] border border-[#D1B17F]/30">
                  Segunda Pantalla &bull; Visor Bíblico
                </span>
                <span className="text-xs text-gray-400 hidden sm:inline">&bull; {verseData.book} {verseData.chapter}</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold font-serif text-white tracking-wide">
                {verseData.reference}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Reader */}
            <button
              onClick={toggleSpeech}
              title={isReadingAudio ? "Detener lectura de audio" : "Escuchar lectura bíblica"}
              className={`p-2.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                isReadingAudio 
                  ? 'bg-amber-500 text-stone-900 border-amber-400 shadow-sm animate-pulse' 
                  : 'bg-white/10 text-gray-200 border-white/10 hover:bg-white/20'
              }`}
            >
              {isReadingAudio ? <VolumeX size={16} /> : <Volume2 size={16} />}
              <span className="hidden md:inline">{isReadingAudio ? 'Detener' : 'Escuchar'}</span>
            </button>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              title="Copiar texto bíblico"
              className="p-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-200 border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
              <span className="hidden md:inline">{copied ? '¡Copiado!' : 'Copiar'}</span>
            </button>

            {/* Text Size Toggles */}
            <div className="hidden sm:flex items-center bg-white/10 rounded-lg p-0.5 border border-white/10">
              <button
                onClick={() => setTextSize('normal')}
                className={`px-2 py-1 text-xs font-bold rounded ${textSize === 'normal' ? 'bg-[#7F1D1D] text-white' : 'text-gray-300 hover:text-white'}`}
                title="Texto normal"
              >
                A
              </button>
              <button
                onClick={() => setTextSize('large')}
                className={`px-2 py-1 text-sm font-bold rounded ${textSize === 'large' ? 'bg-[#7F1D1D] text-white' : 'text-gray-300 hover:text-white'}`}
                title="Texto grande"
              >
                A+
              </button>
              <button
                onClick={() => setTextSize('xlarge')}
                className={`px-2 py-1 text-base font-bold rounded ${textSize === 'xlarge' ? 'bg-[#7F1D1D] text-white' : 'text-gray-300 hover:text-white'}`}
                title="Texto extra grande"
              >
                A++
              </button>
            </div>

            {/* Full Screen Toggle */}
            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              title={isFullScreen ? "Ventana normal" : "Pantalla completa"}
              className="p-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-200 border border-white/10 transition-colors cursor-pointer"
            >
              {isFullScreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              title="Cerrar visor bíblico (Esc)"
              className="p-2.5 rounded-lg bg-red-900/40 hover:bg-red-900/80 text-white border border-red-700/50 transition-colors cursor-pointer ml-1"
            >
              <X size={18} />
            </button>
          </div>
        </header>

        {/* Mode Selector Sub-Header */}
        <div className="bg-[#111827] text-white px-5 py-2.5 border-b border-zinc-800 flex items-center justify-between font-sans shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles size={15} className="text-amber-400 shrink-0" />
            <span className="text-xs font-bold text-amber-200 uppercase tracking-widest truncate">
              {viewMode === 'full_panel' ? 'Segunda Pantalla: La Biblia Completa (Estudio Exegético)' : 'Ficha Resumen de Versículo'}
            </span>
          </div>
          <div className="flex bg-zinc-800 p-0.5 rounded-lg border border-zinc-700">
            <button
              onClick={() => setViewMode('full_panel')}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'full_panel'
                  ? 'bg-[#7F1D1D] text-white shadow-xs'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <BookOpen size={13} />
              <span>Biblia Completa</span>
            </button>
            <button
              onClick={() => setViewMode('quick_card')}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'quick_card'
                  ? 'bg-[#7F1D1D] text-white shadow-xs'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <FileText size={13} />
              <span>Ficha Resumen</span>
            </button>
          </div>
        </div>

        {viewMode === 'full_panel' ? (
          <div className="flex-1 overflow-y-auto bg-[#FDFBF7]">
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
            <div className="bg-[#EFECE6] border-b border-[#E0D7C6] px-5 py-2.5 flex flex-wrap items-center justify-between gap-3 font-sans shrink-0">
          
          {/* Bible Version Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mr-1 shrink-0">
              Versión:
            </span>
            <button
              onClick={() => setSelectedVersion('rvr1960')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedVersion === 'rvr1960'
                  ? 'bg-[#7F1D1D] text-white shadow-sm'
                  : 'bg-white text-gray-700 hover:bg-stone-200/80 border border-[#D1B17F]/40'
              }`}
            >
              RVR 1960
            </button>
            <button
              onClick={() => setSelectedVersion('nvi')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedVersion === 'nvi'
                  ? 'bg-[#7F1D1D] text-white shadow-sm'
                  : 'bg-white text-gray-700 hover:bg-stone-200/80 border border-[#D1B17F]/40'
              }`}
            >
              NVI
            </button>
            <button
              onClick={() => setSelectedVersion('lbla')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedVersion === 'lbla'
                  ? 'bg-[#7F1D1D] text-white shadow-sm'
                  : 'bg-white text-gray-700 hover:bg-stone-200/80 border border-[#D1B17F]/40'
              }`}
            >
              LBLA
            </button>
            <button
              onClick={() => setSelectedVersion('dhh')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedVersion === 'dhh'
                  ? 'bg-[#7F1D1D] text-white shadow-sm'
                  : 'bg-white text-gray-700 hover:bg-stone-200/80 border border-[#D1B17F]/40'
              }`}
            >
              DHH
            </button>
            <button
              onClick={() => setSelectedVersion('original')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedVersion === 'original'
                  ? 'bg-[#1A2533] text-amber-200 shadow-sm border border-amber-300/40'
                  : 'bg-white text-amber-900 hover:bg-stone-200/80 border border-[#D1B17F]/40'
              }`}
            >
              Texto Original (Hebreo/Griego)
            </button>
          </div>

          {/* Study Sub-Tabs */}
          <div className="flex items-center gap-1 bg-white/70 p-1 rounded-lg border border-[#E0D7C6]">
            <button
              onClick={() => setActiveSubTab('text')}
              className={`px-3 py-1 rounded text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeSubTab === 'text'
                  ? 'bg-[#1A2533] text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <FileText size={13} />
              <span>Lectura</span>
            </button>
            <button
              onClick={() => setActiveSubTab('context')}
              className={`px-3 py-1 rounded text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeSubTab === 'context'
                  ? 'bg-[#1A2533] text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Layers size={13} />
              <span>Contexto ({verseData.chapter})</span>
            </button>
            <button
              onClick={() => setActiveSubTab('exegesis')}
              className={`px-3 py-1 rounded text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeSubTab === 'exegesis'
                  ? 'bg-[#1A2533] text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Compass size={13} />
              <span>Exégesis</span>
            </button>
            <button
              onClick={() => setActiveSubTab('cross')}
              className={`px-3 py-1 rounded text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeSubTab === 'cross'
                  ? 'bg-[#1A2533] text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Sparkles size={13} />
              <span>Paralelos ({verseData.crossReferences.length})</span>
            </button>
            {verseData.originalLanguage && (
              <button
                onClick={() => setActiveSubTab('original')}
                className={`px-3 py-1 rounded text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeSubTab === 'original'
                    ? 'bg-[#1A2533] text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Bookmark size={13} />
                <span>Léxico</span>
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Main Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8">
          
          {/* SubTab 1: Reading View & Verse Display */}
          {activeSubTab === 'text' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Primary Focal Verse Card */}
              <div className="bg-white border-2 border-[#D1B17F]/50 rounded-2xl p-6 md:p-10 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#7F1D1D]/5 rounded-bl-full pointer-events-none" />
                
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#F0EAE1]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#7F1D1D]" />
                    <span className="font-sans text-xs font-bold uppercase tracking-widest text-[#7F1D1D]">
                      {verseData.context.theologicalTheme || 'Texto Bíblico Canónico'}
                    </span>
                  </div>
                  <span className="font-sans text-xs font-bold text-gray-500 uppercase">
                    Versión {selectedVersion.toUpperCase()}
                  </span>
                </div>

                {/* The Scripture Text */}
                <blockquote className={`font-serif text-[#1A2533] italic font-medium ${textSizeClass}`}>
                  "{currentVerseText}"
                </blockquote>

                <div className="mt-6 pt-4 border-t border-[#F0EAE1] flex flex-wrap items-center justify-between gap-4 font-sans text-xs">
                  <span className="font-bold text-[#1A2533] uppercase tracking-wider text-sm">
                    — {verseData.reference}
                  </span>
                  <div className="text-gray-500 flex items-center gap-3">
                    <span>Libro: <strong className="text-gray-800">{verseData.book}</strong></span>
                    <span>&bull;</span>
                    <span>Capítulo: <strong className="text-gray-800">{verseData.chapter}</strong></span>
                  </div>
                </div>
              </div>

              {/* Parallel Comparative Grid */}
              <div className="space-y-3">
                <h4 className="font-sans text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  <Layers size={14} className="text-[#7F1D1D]" />
                  <span>Comparativa Sinóptica de Traducciones</span>
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans">
                  {/* RVR1960 Card */}
                  <div 
                    onClick={() => setSelectedVersion('rvr1960')}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      selectedVersion === 'rvr1960' 
                        ? 'bg-amber-50/80 border-[#7F1D1D] shadow-xs' 
                        : 'bg-white border-[#E0D7C6] hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-xs uppercase text-[#7F1D1D]">Reina-Valera 1960</span>
                      {selectedVersion === 'rvr1960' && <Check size={14} className="text-[#7F1D1D]" />}
                    </div>
                    <p className="text-xs text-gray-700 line-clamp-4 leading-relaxed font-serif italic">
                      "{verseData.rvr1960}"
                    </p>
                  </div>

                  {/* NVI Card */}
                  <div 
                    onClick={() => setSelectedVersion('nvi')}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      selectedVersion === 'nvi' 
                        ? 'bg-amber-50/80 border-[#7F1D1D] shadow-xs' 
                        : 'bg-white border-[#E0D7C6] hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-xs uppercase text-[#7F1D1D]">Nueva Versión Internacional</span>
                      {selectedVersion === 'nvi' && <Check size={14} className="text-[#7F1D1D]" />}
                    </div>
                    <p className="text-xs text-gray-700 line-clamp-4 leading-relaxed font-serif italic">
                      "{verseData.nvi}"
                    </p>
                  </div>

                  {/* LBLA Card */}
                  <div 
                    onClick={() => setSelectedVersion('lbla')}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      selectedVersion === 'lbla' 
                        ? 'bg-amber-50/80 border-[#7F1D1D] shadow-xs' 
                        : 'bg-white border-[#E0D7C6] hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-xs uppercase text-[#7F1D1D]">La Biblia de las Américas</span>
                      {selectedVersion === 'lbla' && <Check size={14} className="text-[#7F1D1D]" />}
                    </div>
                    <p className="text-xs text-gray-700 line-clamp-4 leading-relaxed font-serif italic">
                      "{verseData.lbla}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Actions Footer Card */}
              <div className="bg-[#1A2533] text-white p-5 rounded-xl flex flex-wrap items-center justify-between gap-4 font-sans text-xs">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/10 text-amber-300">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#E0D7C6]">Profundizar en este Pasaje</p>
                    <p className="text-gray-300">Consulte el contexto completo del capítulo o el comentario histórico exegético.</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveSubTab('context')}
                    className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Ver Capítulo Completo</span>
                    <ArrowRight size={14} />
                  </button>
                  <button
                    onClick={() => setActiveSubTab('exegesis')}
                    className="px-4 py-2 rounded-lg bg-[#7F1D1D] hover:bg-red-800 text-white font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Exégesis & Comentario</span>
                    <Compass size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SubTab 2: Surrounding Chapter Context */}
          {activeSubTab === 'context' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-white border border-[#E0D7C6] rounded-2xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E0D7C6] font-sans">
                  <div>
                    <h3 className="text-lg font-bold text-[#1A2533] font-serif">{verseData.context.heading}</h3>
                    <p className="text-xs text-gray-500">{verseData.book} — Capítulo {verseData.chapter}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                    Contexto Inmediato
                  </span>
                </div>

                {/* Verses stream */}
                <div className="space-y-4 font-serif text-gray-800">
                  {verseData.context.surroundingVerses.map((item, idx) => (
                    <div 
                      key={idx}
                      className={`p-3.5 rounded-xl transition-all flex items-start gap-3 ${
                        item.isTarget 
                          ? 'bg-amber-100/70 border-l-4 border-[#7F1D1D] shadow-xs font-semibold text-[#1A2533]' 
                          : 'hover:bg-stone-50'
                      }`}
                    >
                      <span className={`text-xs font-bold font-sans px-2 py-0.5 rounded shrink-0 mt-0.5 ${
                        item.isTarget ? 'bg-[#7F1D1D] text-white' : 'bg-stone-200 text-gray-700'
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
                <div className="mt-8 pt-6 border-t border-[#E0D7C6] bg-stone-50 p-4 rounded-xl font-sans">
                  <h5 className="font-bold text-xs uppercase tracking-wider text-[#7F1D1D] mb-1">
                    Marco Histórico y Canónico
                  </h5>
                  <p className="text-xs text-gray-700 leading-relaxed">
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
              <div className="bg-white border border-[#E0D7C6] rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-[#E0D7C6]">
                  <div className="w-10 h-10 rounded-full bg-[#1A2533] text-amber-200 flex items-center justify-center font-serif font-bold text-lg">
                    {verseData.commentary.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1A2533] text-base">{verseData.commentary.author}</h4>
                    <p className="text-xs text-gray-500">Tratado Exegético y Teológico</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h5 className="text-xs font-bold text-[#7F1D1D] uppercase tracking-wider mb-2">
                      Análisis Dogmático y Doctrinal
                    </h5>
                    <p className="text-sm md:text-base text-gray-800 leading-relaxed font-serif italic bg-[#FAF9F5] p-5 rounded-xl border border-[#E0D7C6]">
                      "{verseData.commentary.notes}"
                    </p>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-[#1A2533] uppercase tracking-wider mb-2">
                      Aplicación Hermenéutica y Pastoral
                    </h5>
                    <p className="text-sm text-gray-700 leading-relaxed bg-emerald-50/60 p-4 rounded-xl border border-emerald-200">
                      {verseData.commentary.application}
                    </p>
                  </div>
                </div>
              </div>

              {/* Hermeneutic Principles */}
              <div className="bg-[#FAF9F5] border border-[#E0D7C6] p-5 rounded-xl text-xs text-gray-700 space-y-2">
                <h5 className="font-bold text-[#1A2533] uppercase tracking-wider">Regla Hermenéutica de la Reforma</h5>
                <p className="leading-relaxed">
                  <em>Scriptura Sacra sui ipsius interpres</em> (La Sagrada Escritura es su propio intérprete). La interpretación fiel de este texto debe armonizar siempre con la totalidad del consejo bíblico revelado.
                </p>
              </div>
            </div>
          )}

          {/* SubTab 4: Cross References / Parallel Passages */}
          {activeSubTab === 'cross' && (
            <div className="space-y-4 animate-in fade-in duration-300 font-sans">
              <div className="bg-white border border-[#E0D7C6] rounded-2xl p-6 shadow-sm">
                <div className="mb-4 pb-3 border-b border-[#E0D7C6] flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-base text-[#1A2533]">Pasajes Bíblicos Paralelos</h4>
                    <p className="text-xs text-gray-500">Haga clic en cualquier referencia para abrir su texto y contexto de inmediato.</p>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded bg-[#7F1D1D]/10 text-[#7F1D1D]">
                    {verseData.crossReferences.length} referencias
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {verseData.crossReferences.map((cross, idx) => (
                    <div 
                      key={idx}
                      onClick={() => handleCrossRefClick(cross.reference)}
                      className="group p-4 rounded-xl border border-[#E0D7C6] hover:border-[#7F1D1D] bg-[#FAF9F5] hover:bg-amber-50/60 transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div className="space-y-1.5 mb-3">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-[#7F1D1D] group-hover:underline flex items-center gap-1.5">
                            <Bookmark size={14} />
                            {cross.reference}
                          </span>
                          <ExternalLink size={14} className="text-gray-400 group-hover:text-[#7F1D1D]" />
                        </div>
                        <p className="text-xs text-gray-700 line-clamp-3 italic font-serif">
                          "{cross.label}"
                        </p>
                      </div>
                      <span className="text-[11px] font-bold text-gray-500 uppercase group-hover:text-[#7F1D1D]">
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
              <div className="bg-white border border-[#E0D7C6] rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#E0D7C6]">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#7F1D1D]">
                      {verseData.originalLanguage.language}
                    </span>
                    <h3 className="text-xl font-bold text-[#1A2533]">Análisis Morfológico y Léxico</h3>
                  </div>
                  <span className="px-3 py-1 rounded bg-[#1A2533] text-amber-200 text-xs font-bold font-mono">
                    Strong: {verseData.originalLanguage.strong}
                  </span>
                </div>

                {/* Original script display */}
                <div className="bg-[#1A2533] text-white p-6 rounded-xl text-center space-y-2">
                  <p className="text-2xl md:text-3xl font-serif text-amber-300 tracking-wider">
                    {verseData.originalLanguage.originalText}
                  </p>
                  <p className="text-xs font-mono text-gray-400">
                    Transliteración: {verseData.originalLanguage.transliteration}
                  </p>
                </div>

                {/* Word breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                    <span className="text-xs font-bold text-gray-500 uppercase">Término Raíz Clave</span>
                    <p className="text-base font-bold text-[#1A2533]">{verseData.originalLanguage.keyWord}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                    <span className="text-xs font-bold text-gray-500 uppercase">Significado Teológico</span>
                    <p className="text-sm text-gray-800">{verseData.originalLanguage.meaning}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
        </>
        )}

        {/* Footer */}
        <footer className="bg-[#FAF9F5] border-t border-[#E0D7C6] px-6 py-3 flex items-center justify-between font-sans text-xs text-gray-500 shrink-0">
          <span>Seminario Teológico Digital &bull; Visor de Escrituras</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#1A2533] text-white font-bold hover:bg-[#2C3E50] transition-colors cursor-pointer"
          >
            Cerrar Visor
          </button>
        </footer>
      </motion.div>
    </div>
  );
}
