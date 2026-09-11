import React, { useState, useMemo, useEffect } from 'react';
import { 
  BookOpen, 
  Search, 
  ChevronDown, 
  ArrowLeft,
  ArrowRight,
  BookMarked,
  MessageSquare,
  Link as LinkIcon,
  History,
  X
} from 'lucide-react';
import { BIBLE_BOOKS_CANON, findBibleBook } from '../data/completeBibleData';
import { getBibleChapter, ChapterContent } from '../data/bibleTextRepository';
import { generateVerseCommentary, generateCrossReferences } from '../utils/verseCommentaryGenerator';

export interface AcademicPanelProps {
  initialBookId?: string;
  initialChapter?: number;
  initialVerse?: number;
  onCloseSecondScreen?: () => void;
  isSecondScreenMode?: boolean;
}

export function AcademicPanel({
  initialBookId,
  initialChapter,
  initialVerse,
  onCloseSecondScreen,
  isSecondScreenMode = false
}: AcademicPanelProps = {}) {
  const [selectedBookId, setSelectedBookId] = useState<string>(initialBookId || 'gen');
  const [selectedChapter, setSelectedChapter] = useState<number>(initialChapter || 1);
  const [selectedVerse, setSelectedVerse] = useState<number | null>(initialVerse || null);
  const [activeTranslation, setActiveTranslation] = useState<'rvr1960' | 'lbla' | 'ntv' | 'nvi'>('rvr1960');
  const [bibleFontSize, setBibleFontSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('base');
  const [isBookDrawerOpen, setIsBookDrawerOpen] = useState<boolean>(false);
  const [bookSearchQuery, setBookSearchQuery] = useState<string>('');
  const [bookTestamentTab, setBookTestamentTab] = useState<'ALL' | 'Antiguo Testamento' | 'Nuevo Testamento'>('ALL');
  const [activeVerseMenuTab, setActiveVerseMenuTab] = useState<'menu' | 'comentario_biblico' | 'referencias' | 'comentario_historico'>('menu');

  useEffect(() => {
    if (initialBookId) setSelectedBookId(initialBookId);
    if (initialChapter) setSelectedChapter(initialChapter);
    if (initialVerse !== undefined && initialVerse !== null) {
      setSelectedVerse(initialVerse);
      setActiveVerseMenuTab('comentario_biblico');
    }
  }, [initialBookId, initialChapter, initialVerse]);


  const [realVerses, setRealVerses] = useState<any[]>([]);
  const [isLoadingVerses, setIsLoadingVerses] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchVerses = async () => {
      setIsLoadingVerses(true);
      try {
        const bookIndex = BIBLE_BOOKS_CANON.findIndex(b => b.id === selectedBookId) + 1;
        // Map translation to bolls.life translation ID
        const translationId = activeTranslation === 'rvr1960' ? 'RV1960' : 'RV1960'; // We use RV1960 for now as it's reliable
        const response = await fetch(`https://bolls.life/get-chapter/${translationId}/${bookIndex}/${selectedChapter}/`);
        const data = await response.json();
        
        if (isMounted && data && Array.isArray(data)) {
          setRealVerses(data.map(v => ({
            num: v.verse,
            rvr1960: v.text.replace(/<[^>]*>?/gm, ''),
            lbla: v.text.replace(/<[^>]*>?/gm, ''),
            ntv: v.text.replace(/<[^>]*>?/gm, ''),
            nvi: v.text.replace(/<[^>]*>?/gm, '')
          })));
        }
      } catch (err) {
        console.error('Error fetching verses:', err);
      } finally {
        if (isMounted) setIsLoadingVerses(false);
      }
    };
    
    fetchVerses();
    return () => { isMounted = false; };
  }, [selectedBookId, selectedChapter, activeTranslation]);

  const currentBook = useMemo(() => {

    return findBibleBook(selectedBookId) || BIBLE_BOOKS_CANON[0];
  }, [selectedBookId]);

  const currentChapterContent = useMemo<ChapterContent>(() => {
    return getBibleChapter(selectedBookId, selectedChapter);
  }, [selectedBookId, selectedChapter]);

  const filteredBooks = useMemo(() => {
    return BIBLE_BOOKS_CANON.filter(book => {
      const matchesSearch = 
        book.name.toLowerCase().includes(bookSearchQuery.toLowerCase()) ||
        book.shortName.toLowerCase().includes(bookSearchQuery.toLowerCase()) ||
        book.division.toLowerCase().includes(bookSearchQuery.toLowerCase());
      
      const matchesTestament = bookTestamentTab === 'ALL' || book.testament === bookTestamentTab;
      return matchesSearch && matchesTestament;
    });
  }, [bookSearchQuery, bookTestamentTab]);

  const handlePrevChapter = () => {
    setSelectedVerse(null);
    if (selectedChapter > 1) {
      setSelectedChapter(selectedChapter - 1);
    } else {
      const currentIdx = BIBLE_BOOKS_CANON.findIndex(b => b.id === selectedBookId);
      if (currentIdx > 0) {
        const prevBook = BIBLE_BOOKS_CANON[currentIdx - 1];
        setSelectedBookId(prevBook.id);
        setSelectedChapter(prevBook.chaptersCount);
      }
    }
  };

  const handleNextChapter = () => {
    setSelectedVerse(null);
    if (selectedChapter < currentBook.chaptersCount) {
      setSelectedChapter(selectedChapter + 1);
    } else {
      const currentIdx = BIBLE_BOOKS_CANON.findIndex(b => b.id === selectedBookId);
      if (currentIdx < BIBLE_BOOKS_CANON.length - 1) {
        const nextBook = BIBLE_BOOKS_CANON[currentIdx + 1];
        setSelectedBookId(nextBook.id);
        setSelectedChapter(1);
      }
    }
  };

  const handleVerseClick = (verseNum: number) => {
    if (selectedVerse === verseNum) {
      setSelectedVerse(null);
    } else {
      setSelectedVerse(verseNum);
      setActiveVerseMenuTab('menu');
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-zinc-950 text-[#1A2533] dark:text-zinc-100 flex flex-col">
      <header className="bg-[#1A2533] text-white border-b border-[#2C3E50] px-4 lg:px-6 py-3 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#7F1D1D] flex items-center justify-center border border-amber-500/30 text-amber-200 shadow-sm">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h1 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
                  <span>Seminario Teológico Digital</span>
                  <span className="hidden sm:inline-block text-[9px] font-sans font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Biblia
                  </span>
                </h1>
                <p className="text-[10px] text-gray-300">
                  {currentBook.name} {selectedChapter}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end overflow-x-auto pb-1 md:pb-0">
            <button
              onClick={() => setIsBookDrawerOpen(true)}
              className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 border border-white/20 transition-colors shadow-sm"
              title="Abrir selector rápido de libros"
            >
              <BookMarked className="w-3.5 h-3.5 text-amber-300" />
              <span>{currentBook.name} {selectedChapter}</span>
              <ChevronDown className="w-3 h-3 opacity-70" />
            </button>

            <select
              value={activeTranslation}
              onChange={(e) => setActiveTranslation(e.target.value as any)}
              className="px-2 py-1.5 rounded-lg bg-black/30 border border-white/20 text-white text-xs font-bold focus:outline-none"
            >
              <option value="rvr1960">RVR1960</option>
              <option value="lbla">LBLA</option>
              <option value="ntv">NTV</option>
              <option value="nvi">NVI</option>
            </select>

            <div className="flex items-center rounded-lg bg-black/20 border border-white/10 p-0.5">
              <button
                onClick={handlePrevChapter}
                className="p-1.5 hover:bg-white/10 rounded text-gray-300 hover:text-white transition-colors"
                title="Capítulo anterior"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-mono px-2 text-amber-200 font-bold">
                Cap. {selectedChapter}
              </span>
              <button
                onClick={handleNextChapter}
                className="p-1.5 hover:bg-white/10 rounded text-gray-300 hover:text-white transition-colors"
                title="Capítulo siguiente"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center rounded-lg bg-black/20 border border-white/10 p-0.5">
              <button
                onClick={() => setBibleFontSize(prev => prev === 'xl' ? 'lg' : prev === 'lg' ? 'base' : 'sm')}
                className="px-2 py-1 text-[11px] font-bold text-gray-300 hover:text-white hover:bg-white/10 rounded"
                title="Reducir fuente"
              >
                A-
              </button>
              <button
                onClick={() => setBibleFontSize(prev => prev === 'sm' ? 'base' : prev === 'base' ? 'lg' : 'xl')}
                className="px-2 py-1 text-[11px] font-bold text-gray-300 hover:text-white hover:bg-white/10 rounded"
                title="Aumentar fuente"
              >
                A+
              </button>
            </div>
          </div>
        </div>
      </header>

      {isBookDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-[#FAF9F6] dark:bg-zinc-900 border border-[#E0D7C6] dark:border-zinc-700 w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            <div className="p-4 bg-[#1A2533] text-white flex items-center justify-between border-b border-[#2C3E50]">
              <div className="flex items-center gap-2">
                <BookMarked className="w-5 h-5 text-amber-300" />
                <div>
                  <h3 className="font-serif font-bold text-base text-white">
                    Canon Bíblico (66 Libros)
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setIsBookDrawerOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-4 border-b border-[#E0D7C6] dark:border-zinc-800 bg-[#F4EFE6] dark:bg-zinc-800/50 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar libro (ej. Romanos)..."
                  value={bookSearchQuery}
                  onChange={(e) => setBookSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-white dark:bg-zinc-900 border border-stone-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-[#7F1D1D]"
                />
              </div>

              <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
                {(['ALL', 'Antiguo Testamento', 'Nuevo Testamento'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setBookTestamentTab(tab)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                      bookTestamentTab === tab
                        ? 'bg-[#7F1D1D] text-white shadow-sm'
                        : 'bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 border border-stone-300 dark:border-zinc-700 hover:bg-stone-50'
                    }`}
                  >
                    {tab === 'ALL' ? 'Toda la Biblia' : tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-[#FDFBF7] dark:bg-zinc-950">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {filteredBooks.map(book => (
                  <div key={book.id} className="space-y-1.5">
                    <button
                      onClick={() => {
                        setSelectedBookId(book.id);
                        setSelectedChapter(1);
                        setIsBookDrawerOpen(false);
                      }}
                      className={`w-full text-left p-3 rounded-xl border transition-all ${
                        selectedBookId === book.id
                          ? 'bg-amber-50 dark:bg-zinc-800 border-amber-500 shadow-md ring-1 ring-amber-400'
                          : 'bg-white dark:bg-zinc-900 border-[#E0D7C6] dark:border-zinc-700 hover:border-amber-300 hover:shadow-sm'
                      }`}
                    >
                      <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                        {book.division}
                      </div>
                      <div className="font-serif font-bold text-sm text-[#1A2533] dark:text-zinc-100 truncate">
                        {book.shortName}
                      </div>
                    </button>
                    {selectedBookId === book.id && (
                      <div className="grid grid-cols-5 gap-1 pt-1">
                        {Array.from({ length: book.chaptersCount }).map((_, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              setSelectedChapter(i + 1);
                              setIsBookDrawerOpen(false);
                            }}
                            className={`py-1 text-[10px] font-mono font-bold rounded ${
                              selectedChapter === i + 1
                                ? 'bg-[#7F1D1D] text-white'
                                : 'bg-stone-200 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-stone-300'
                            }`}
                          >
                            {i + 1}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto bg-white dark:bg-zinc-950 p-6 flex justify-center pb-24">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-8 border-b border-[#E0D7C6] dark:border-zinc-800 pb-6">
            <h2 className="text-3xl md:text-4xl font-black font-serif text-[#1A2533] dark:text-white mb-2">
              {currentBook.name} {selectedChapter}
            </h2>
            <div className="text-sm font-serif text-gray-600 dark:text-gray-400 italic">
              {currentChapterContent.heading}
            </div>
          </div>

          <div className={`space-y-4 font-serif text-gray-900 dark:text-gray-100 leading-relaxed ${
            bibleFontSize === 'sm' ? 'text-sm' :
            bibleFontSize === 'base' ? 'text-base' :
            bibleFontSize === 'lg' ? 'text-xl' : 'text-2xl leading-loose'
          }`}>
            {isLoadingVerses ? (
              <div className="flex flex-col gap-4 py-8">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="flex gap-4 animate-pulse">
                    <div className="w-4 h-4 bg-stone-200 dark:bg-zinc-800 rounded"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-stone-200 dark:bg-zinc-800 rounded w-full"></div>
                      <div className="h-4 bg-stone-200 dark:bg-zinc-800 rounded w-5/6"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (realVerses.length > 0 ? realVerses.map(rv => {
                const curatedVerse = currentChapterContent.verses.find(v => v.num === rv.num);
                return { ...curatedVerse, ...rv, theologicalNote: curatedVerse?.theologicalNote, originalText: curatedVerse?.originalText, isKeyPassage: curatedVerse?.isKeyPassage };
              }) : currentChapterContent.verses).map(verse => (
              <div key={verse.num} className="relative">
                <div 
                  onClick={() => handleVerseClick(verse.num)}
                  className={`flex gap-4 group p-2 rounded-xl transition-colors cursor-pointer ${
                    selectedVerse === verse.num 
                      ? 'bg-amber-50 dark:bg-zinc-900 ring-1 ring-amber-300 shadow-sm' 
                      : 'hover:bg-stone-50 dark:hover:bg-zinc-900'
                  }`}
                >
                  <span className={`font-bold font-mono text-sm shrink-0 pt-1 select-none ${
                    selectedVerse === verse.num ? 'text-amber-600 dark:text-amber-400' : 'text-[#7F1D1D] dark:text-amber-500'
                  }`}>
                    {verse.num}
                  </span>
                  <p className="flex-1">
                    {verse[activeTranslation as keyof typeof verse] as string || verse.rvr1960}
                  </p>
                </div>

                {/* Inline tools overlay for selected verse */}
                {selectedVerse === verse.num && (() => {
                  const verseTextStr = (verse[activeTranslation as keyof typeof verse] as string) || verse.rvr1960 || '';
                  const verseComm = generateVerseCommentary(
                    currentBook.name,
                    selectedChapter,
                    verse.num,
                    verseTextStr,
                    currentBook.author,
                    currentBook.date,
                    currentBook.theme,
                    currentBook.testament,
                    currentBook.division
                  );

                  return (
                    <div className="mt-2 ml-10 p-4 bg-white dark:bg-zinc-900 border border-[#E0D7C6] dark:border-zinc-700 rounded-xl shadow-md animate-in fade-in slide-in-from-top-2">
                      {activeVerseMenuTab === 'menu' ? (
                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                              Herramientas ({currentBook.shortName} {selectedChapter}:{verse.num})
                            </span>
                            <button 
                              onClick={(e) => { e.stopPropagation(); setSelectedVerse(null); }}
                              className="p-1 hover:bg-stone-100 dark:hover:bg-zinc-800 rounded-full text-gray-400"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <button 
                            onClick={() => setActiveVerseMenuTab('comentario_biblico')}
                            className="flex items-center gap-3 p-3 rounded-lg bg-stone-50 dark:bg-zinc-800/50 hover:bg-amber-50 dark:hover:bg-zinc-800 text-sm font-medium transition-colors border border-transparent hover:border-amber-200 dark:hover:border-zinc-700 text-left"
                          >
                            <MessageSquare className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                            <div>
                              <div className="font-semibold text-gray-800 dark:text-gray-200">Comentario Bíblico Devocional</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">Exégesis y aplicación de Henry, Washer y Spurgeon</div>
                            </div>
                          </button>
                          <button 
                            onClick={() => setActiveVerseMenuTab('referencias')}
                            className="flex items-center gap-3 p-3 rounded-lg bg-stone-50 dark:bg-zinc-800/50 hover:bg-amber-50 dark:hover:bg-zinc-800 text-sm font-medium transition-colors border border-transparent hover:border-amber-200 dark:hover:border-zinc-700 text-left"
                          >
                            <LinkIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                            <div>
                              <div className="font-semibold text-gray-800 dark:text-gray-200">Versículos de Referencia</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">Conexiones temáticas en el canon bíblico</div>
                            </div>
                          </button>
                          <button 
                            onClick={() => setActiveVerseMenuTab('comentario_historico')}
                            className="flex items-center gap-3 p-3 rounded-lg bg-stone-50 dark:bg-zinc-800/50 hover:bg-amber-50 dark:hover:bg-zinc-800 text-sm font-medium transition-colors border border-transparent hover:border-amber-200 dark:hover:border-zinc-700 text-left"
                          >
                            <History className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                            <div>
                              <div className="font-semibold text-gray-800 dark:text-gray-200">Comentario Histórico y Cultural</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">Contexto de la época, costumbres y lingüística</div>
                            </div>
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E0D7C6] dark:border-zinc-800">
                            <button 
                              onClick={() => setActiveVerseMenuTab('menu')}
                              className="p-1.5 hover:bg-stone-100 dark:hover:bg-zinc-800 rounded-lg text-gray-500 transition-colors"
                            >
                              <ArrowLeft className="w-4 h-4" />
                            </button>
                            <span className="font-bold text-sm text-[#1A2533] dark:text-white flex-1">
                              {activeVerseMenuTab === 'comentario_biblico' && `Comentario Bíblico — ${currentBook.name} ${selectedChapter}:${verse.num}`}
                              {activeVerseMenuTab === 'referencias' && `Referencias Cruzadas — ${currentBook.name} ${selectedChapter}:${verse.num}`}
                              {activeVerseMenuTab === 'comentario_historico' && `Contexto Histórico y Cultural — v. ${verse.num}`}
                            </span>
                            <button 
                              onClick={() => setSelectedVerse(null)}
                              className="p-1 hover:bg-stone-100 dark:hover:bg-zinc-800 rounded-full text-gray-400"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <div className="text-sm text-gray-600 dark:text-gray-300 font-sans leading-relaxed">
                            {activeVerseMenuTab === 'comentario_biblico' && (
                              <div className="space-y-3 max-h-[320px] overflow-y-auto custom-scrollbar pr-2">
                                {verse.theologicalNote && (
                                  <div className="bg-amber-100/60 dark:bg-amber-950/40 p-3 rounded-lg border border-amber-300 dark:border-amber-800/60">
                                    <h4 className="font-bold text-xs text-amber-900 dark:text-amber-300 mb-1 flex items-center gap-1.5 uppercase tracking-wide">
                                      <BookMarked className="w-3.5 h-3.5" />
                                      Nota Teológica del Versículo {verse.num}
                                    </h4>
                                    <p className="text-xs text-amber-950 dark:text-amber-200">
                                      {verse.theologicalNote}
                                    </p>
                                  </div>
                                )}
                                <div className="bg-stone-50 dark:bg-zinc-800/50 p-3 rounded-lg border border-[#E0D7C6] dark:border-zinc-700">
                                  <h4 className="font-bold text-sm text-[#1A2533] dark:text-zinc-100 mb-1 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-amber-600"></div>
                                    Matthew Henry (Comentario Expositivo)
                                  </h4>
                                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {verseComm.matthewHenry}
                                  </p>
                                </div>
                                <div className="bg-stone-50 dark:bg-zinc-800/50 p-3 rounded-lg border border-[#E0D7C6] dark:border-zinc-700">
                                  <h4 className="font-bold text-sm text-[#1A2533] dark:text-zinc-100 mb-1 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
                                    Paul Washer (Enfoque Reformado)
                                  </h4>
                                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {verseComm.paulWasher}
                                  </p>
                                </div>
                                <div className="bg-stone-50 dark:bg-zinc-800/50 p-3 rounded-lg border border-[#E0D7C6] dark:border-zinc-700">
                                  <h4 className="font-bold text-sm text-[#1A2533] dark:text-zinc-100 mb-1 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                                    Charles Spurgeon (Tesoro del Devocional)
                                  </h4>
                                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {verseComm.charlesSpurgeon}
                                  </p>
                                </div>
                              </div>
                            )}

                            {activeVerseMenuTab === 'referencias' && (() => {
                              const crossRefs = generateCrossReferences(
                                currentBook.name,
                                selectedChapter,
                                verse.num,
                                verseTextStr
                              );
                              return (
                                <ul className="space-y-3 max-h-[320px] overflow-y-auto custom-scrollbar pr-2">
                                  {crossRefs.map((cr, idx) => (
                                    <li key={idx} className="p-3 bg-stone-50 dark:bg-zinc-800/50 rounded-lg border border-[#E0D7C6] dark:border-zinc-700">
                                      <div className="flex items-center justify-between gap-2 mb-1.5">
                                        <span className="font-bold text-amber-700 dark:text-amber-400 text-xs flex items-center gap-1.5">
                                          <LinkIcon className="w-3.5 h-3.5" />
                                          {cr.ref}
                                        </span>
                                        <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50 shrink-0">
                                          {cr.type}
                                        </span>
                                      </div>
                                      <p className="text-xs italic text-gray-700 dark:text-gray-300 mb-1.5 leading-relaxed bg-white/60 dark:bg-zinc-900/40 p-2 rounded border border-stone-200 dark:border-zinc-800">
                                        {cr.quote}
                                      </p>
                                      <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-normal">
                                        <strong className="text-gray-700 dark:text-gray-300 font-medium">Conexión: </strong>
                                        {cr.explanation}
                                      </p>
                                    </li>
                                  ))}
                                </ul>
                              );
                            })()}

                            {activeVerseMenuTab === 'comentario_historico' && (
                              <div className="space-y-3 max-h-[320px] overflow-y-auto custom-scrollbar pr-2">
                                <div className="bg-blue-50/70 dark:bg-blue-950/30 p-3 rounded-lg border border-blue-200 dark:border-blue-900/50">
                                  <h4 className="font-bold text-xs text-blue-900 dark:text-blue-300 mb-1 flex items-center gap-2 uppercase tracking-wide">
                                    <History className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                                    Contexto Histórico del Versículo {verse.num}
                                  </h4>
                                  <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {verseComm.historicalContext}
                                  </p>
                                </div>

                                <div className="bg-stone-50 dark:bg-zinc-800/50 p-3 rounded-lg border border-[#E0D7C6] dark:border-zinc-700">
                                  <h4 className="font-bold text-xs text-gray-800 dark:text-gray-200 mb-1 uppercase tracking-wide">
                                    Entorno Cultural y Lingüístico
                                  </h4>
                                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {verseComm.culturalBackground}
                                  </p>
                                </div>

                                <div className="bg-stone-50 dark:bg-zinc-800/50 p-3 rounded-lg border border-[#E0D7C6] dark:border-zinc-700">
                                  <h4 className="font-bold text-xs text-gray-800 dark:text-gray-200 mb-1 uppercase tracking-wide">
                                    Perspectiva Teológica General
                                  </h4>
                                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {verseComm.theologicalInsight}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            ))}
          </div>
          
          {/* Bottom Bible Navigation Bar */}
          <div className="mt-12 p-3 bg-[#FAF9F6] dark:bg-zinc-900 border-t border-[#E0D7C6] dark:border-zinc-800 flex items-center justify-between text-xs rounded-xl">
            <button
              onClick={handlePrevChapter}
              className="px-4 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-stone-300 dark:border-zinc-700 text-gray-700 dark:text-zinc-200 hover:bg-stone-50 font-bold flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            <span className="font-serif font-bold text-gray-600 dark:text-gray-300 hidden sm:block">
              {currentBook.name} • Capítulo {selectedChapter} de {currentBook.chaptersCount}
            </span>

            <button
              onClick={handleNextChapter}
              className="px-4 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-stone-300 dark:border-zinc-700 text-gray-700 dark:text-zinc-200 hover:bg-stone-50 font-bold flex items-center gap-2"
            >
              <span>Siguiente</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
