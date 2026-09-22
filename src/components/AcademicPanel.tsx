import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  X,
  Sparkles,
  Filter,
  Loader2,
  Check,
  Highlighter,
  Edit3,
  Trash2,
  Palette,
  FileText,
  Plus,
  RefreshCw,
  ChevronRight
} from 'lucide-react';
import { BIBLE_BOOKS_CANON, findBibleBook } from '../data/completeBibleData';
import { getBibleChapter, ChapterContent } from '../data/bibleTextRepository';
import { generateVerseCommentary, generateCrossReferences } from '../utils/verseCommentaryGenerator';
import { searchBibleByPhrase, VerseSearchResult } from '../utils/bibleSearchEngine';
import { getChapterOffline, getChapterOfflineAsync, saveChapterOffline } from '../utils/offlineStorage';
import { useBibleNotes } from '../hooks/useBibleNotes';
import { HighlightColor, getColorClasses, deleteBibleNote } from '../utils/bibleNotesStorage';
import { BibleNotesDrawer } from './BibleNotesDrawer';

export interface AcademicPanelProps {
  initialBookId?: string;
  initialChapter?: number;
  initialVerse?: number;
  onCloseSecondScreen?: () => void;
  isSecondScreenMode?: boolean;
}

const POPULAR_PHRASE_SUGGESTIONS = [
  'El Señor es mi pastor',
  'Por sus frutos los conoceréis',
  'Justificados pues por la fe',
  'Todo lo puedo en Cristo',
  'Porque de tal manera amó Dios',
  'En el principio era el Verbo',
  'La fe es la certeza de lo que se espera',
  'Lámpara es a mis pies tu palabra',
  'Buscad primeramente el reino de Dios',
  'Yo soy el camino, y la verdad'
];

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
  const [bookDrawerStep, setBookDrawerStep] = useState<'books' | 'chapters'>('books');
  const [activeVerseMenuTab, setActiveVerseMenuTab] = useState<'menu' | 'comentario_biblico' | 'referencias' | 'comentario_historico' | 'subrayado'>('menu');

  // Notes and Highlighting hooks
  const { allNotes, chapterNotes, addOrUpdateHighlight, removeNote } = useBibleNotes(selectedBookId, selectedChapter);
  const [isNotesDrawerOpen, setIsNotesDrawerOpen] = useState<boolean>(false);
  const [noteInputText, setNoteInputText] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<HighlightColor>('yellow');
  const [selectedTextSnippet, setSelectedTextSnippet] = useState<{ verse: number; text: string } | null>(null);

  // Phrase search states
  const [isPhraseSearchOpen, setIsPhraseSearchOpen] = useState<boolean>(false);
  const [phraseQuery, setPhraseQuery] = useState<string>('');
  const [phraseSearchResults, setPhraseSearchResults] = useState<VerseSearchResult[]>([]);
  const [isSearchingPhrase, setIsSearchingPhrase] = useState<boolean>(false);
  const [hasSearchedPhrase, setHasSearchedPhrase] = useState<boolean>(false);
  const [phraseFilterTestament, setPhraseFilterTestament] = useState<'ALL' | 'Antiguo Testamento' | 'Nuevo Testamento'>('ALL');

  useEffect(() => {
    if (initialBookId) setSelectedBookId(initialBookId);
    if (initialChapter) setSelectedChapter(initialChapter);
    if (initialVerse !== undefined && initialVerse !== null) {
      setSelectedVerse(initialVerse);
      setActiveVerseMenuTab('comentario_biblico');
    }
  }, [initialBookId, initialChapter, initialVerse]);

  const handleExecutePhraseSearch = async (overrideQuery?: string) => {
    const term = overrideQuery !== undefined ? overrideQuery : phraseQuery;
    if (!term.trim()) return;

    setIsSearchingPhrase(true);
    setHasSearchedPhrase(true);
    try {
      const results = await searchBibleByPhrase(term, activeTranslation);
      setPhraseSearchResults(results);
    } catch (err) {
      console.error('Error conducting phrase search:', err);
    } finally {
      setIsSearchingPhrase(false);
    }
  };

  const handleSelectSearchResult = (res: VerseSearchResult) => {
    setSelectedBookId(res.bookId);
    setSelectedChapter(res.chapter);
    setSelectedVerse(res.verse);
    setActiveVerseMenuTab('menu');
    setIsPhraseSearchOpen(false);
  };

  const filteredPhraseResults = useMemo(() => {
    if (phraseFilterTestament === 'ALL') return phraseSearchResults;
    return phraseSearchResults.filter(r => r.testament === phraseFilterTestament);
  }, [phraseSearchResults, phraseFilterTestament]);


  const [realVerses, setRealVerses] = useState<any[]>([]);
  const [isLoadingVerses, setIsLoadingVerses] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchVerses = async () => {
      setIsLoadingVerses(true);
      
      // Check offline local storage or IndexedDB cache first
      const cached = await getChapterOfflineAsync(selectedBookId, selectedChapter);
      if (cached && cached.length > 0 && isMounted) {
        setRealVerses(cached);
        setIsLoadingVerses(false);
      }

      try {
        const bookIndex = BIBLE_BOOKS_CANON.findIndex(b => b.id === selectedBookId) + 1;
        const transMap: Record<string, string> = {
          rvr1960: 'RV1960',
          nvi: 'NVI',
          lbla: 'LBLA',
          ntv: 'NTV'
        };
        const translationId = transMap[activeTranslation] || 'RV1960';
        const response = await fetch(`https://bolls.life/get-chapter/${translationId}/${bookIndex}/${selectedChapter}/`);
        if (response.ok) {
          const data = await response.json();
          
          if (isMounted && data && Array.isArray(data)) {
            const mapped = data.map((v: any) => {
              const cleanText = v.text ? v.text.replace(/<[^>]*>?/gm, '').trim() : '';
              return {
                num: v.verse,
                rvr1960: activeTranslation === 'rvr1960' ? cleanText : (cached?.find(c => c.num === v.verse)?.rvr1960 || cleanText),
                lbla: activeTranslation === 'lbla' ? cleanText : (cached?.find(c => c.num === v.verse)?.lbla || cleanText),
                ntv: activeTranslation === 'ntv' ? cleanText : (cached?.find(c => c.num === v.verse)?.ntv || cleanText),
                nvi: activeTranslation === 'nvi' ? cleanText : (cached?.find(c => c.num === v.verse)?.nvi || cleanText)
              };
            });
            setRealVerses(mapped);
            saveChapterOffline(selectedBookId, selectedChapter, mapped);
          }
        }
      } catch (err) {
        console.warn('Network offline or fetch error, using cached or fallback repository:', err);
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
    <div className="min-h-screen bg-[#FAF9F5] dark:bg-zinc-950 text-[#1A2533] dark:text-zinc-100 flex flex-col">
      <header className="bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 px-4 lg:px-6 py-3 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-[#7F1D1D] flex items-center justify-center text-amber-100 shadow-sm border border-[#7F1D1D]/20 shrink-0">
                <BookOpen className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <h1 className="text-xs font-bold tracking-[0.2em] uppercase text-[#7F1D1D] dark:text-amber-500 leading-none mb-1">
                  Seminario Digital
                </h1>
                <p className="text-sm font-serif font-bold text-[#1A2533] dark:text-stone-100 truncate">
                  {currentBook.name} {selectedChapter}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end overflow-x-auto pb-1 md:pb-0">
            <div className="flex items-center gap-1.5 border-r border-stone-200 dark:border-stone-800 pr-2 mr-2">
              <button
                onClick={() => {
                  setBookDrawerStep('books');
                  setIsBookDrawerOpen(true);
                }}
                className="px-4 py-2 rounded bg-white hover:bg-[#FAF9F5] text-[#1A2533] dark:bg-stone-900 dark:text-stone-100 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 border border-stone-300 dark:border-stone-700 transition-all shadow-sm cursor-pointer active:scale-95 shrink-0"
              >
                <BookMarked className="w-4 h-4 text-[#7F1D1D]" strokeWidth={2} />
                <span>Libros</span>
                <ChevronDown className="w-3 h-3 text-stone-400" />
              </button>

              <select
                value={activeTranslation}
                onChange={(e) => setActiveTranslation(e.target.value as any)}
                className="px-3 py-2 rounded bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-[#1A2533] dark:text-stone-100 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-[#7F1D1D] cursor-pointer shadow-sm transition-all"
              >
                <option value="rvr1960">RVR1960</option>
                <option value="lbla">LBLA</option>
                <option value="ntv">NTV</option>
                <option value="nvi">NVI</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 border-r border-stone-200 dark:border-stone-800 pr-2 mr-2">
              <button
                onClick={() => setIsNotesDrawerOpen(true)}
                className="px-4 py-2 rounded bg-white hover:bg-[#FAF9F5] text-[#1A2533] dark:bg-stone-900 dark:text-stone-100 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 border border-stone-300 dark:border-stone-700 shadow-sm transition-all cursor-pointer active:scale-95 shrink-0"
              >
                <Highlighter className="w-4 h-4 text-[#D1B17F]" strokeWidth={2} />
                <span>Archivo</span>
                {allNotes.length > 0 && (
                  <span className="px-1.5 py-0.5 rounded bg-[#7F1D1D] text-[9px] font-black text-white">
                    {allNotes.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsPhraseSearchOpen(true)}
                className="px-3 py-1.5 rounded bg-[#7F1D1D] hover:bg-red-800 text-white text-xs font-bold flex items-center gap-2 border border-[#7F1D1D] shadow-xs transition-colors cursor-pointer shrink-0"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Búsqueda</span>
              </button>
            </div>

            <div className="flex items-center rounded-md bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 p-0.5">
              <button
                onClick={handlePrevChapter}
                className="p-1.5 hover:bg-white dark:hover:bg-stone-700 rounded text-stone-600 dark:text-stone-400 hover:text-[#7F1D1D] transition-colors"
                title="Anterior"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-bold px-2 text-[#1A2533] dark:text-stone-200 uppercase tracking-widest border-x border-stone-200 dark:border-stone-700 mx-1">
                Cap. {selectedChapter}
              </span>
              <button
                onClick={handleNextChapter}
                className="p-1.5 hover:bg-white dark:hover:bg-stone-700 rounded text-stone-600 dark:text-stone-400 hover:text-[#7F1D1D] transition-colors"
                title="Siguiente"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center rounded-md bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 p-0.5 ml-1">
              <button
                onClick={() => setBibleFontSize(prev => prev === 'xl' ? 'lg' : prev === 'lg' ? 'base' : 'sm')}
                className="px-2 py-1 text-[10px] font-bold text-stone-600 hover:text-[#7F1D1D] hover:bg-white dark:hover:bg-stone-700 rounded"
              >
                A-
              </button>
              <button
                onClick={() => setBibleFontSize(prev => prev === 'sm' ? 'base' : prev === 'base' ? 'lg' : 'xl')}
                className="px-2 py-1 text-[10px] font-bold text-stone-600 hover:text-[#7F1D1D] hover:bg-white dark:hover:bg-stone-700 rounded"
              >
                A+
              </button>
            </div>
          </div>
        </div>
      </header>

      {isBookDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="bg-white dark:bg-zinc-950 border border-stone-200 dark:border-stone-800 w-full max-w-5xl max-h-[90vh] rounded shadow-[0_30px_60px_rgba(0,0,0,0.25)] flex flex-col overflow-hidden"
          >
            {/* Header: Institutional Night */}
            <div className="p-5 bg-white dark:bg-stone-900 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#7F1D1D]" />
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded bg-[#FAF9F5] dark:bg-stone-800 flex items-center justify-center border border-stone-200 dark:border-stone-700 shadow-sm shrink-0">
                  <BookMarked className="w-5 h-5 text-[#7F1D1D] dark:text-amber-500" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-sm font-serif font-black text-[#1A2533] dark:text-stone-100 uppercase tracking-tight">
                    {bookDrawerStep === 'books' ? 'Canon Bíblico (66 Libros)' : `Capítulos: ${currentBook?.name || ''}`}
                  </h3>
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-0.5">
                    {bookDrawerStep === 'books' ? 'Índice Canónico del Seminario Digital' : 'Selección de Capítulo Exegético'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {bookDrawerStep === 'chapters' && (
                  <button
                    onClick={() => setBookDrawerStep('books')}
                    className="flex items-center gap-2 px-3 py-1.5 text-[10px] font-black text-[#7F1D1D] uppercase tracking-widest hover:bg-stone-50 dark:hover:bg-stone-800 rounded transition-all"
                  >
                    <ArrowLeft size={14} />
                    Volver
                  </button>
                )}
                <button
                  onClick={() => setIsBookDrawerOpen(false)}
                  className="p-2 text-stone-400 hover:text-[#7F1D1D] hover:bg-stone-50 dark:hover:bg-stone-800 rounded transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {bookDrawerStep === 'books' ? (
              <>
                {/* Search & Filter: Paper Style */}
                <div className="p-5 border-b border-stone-200 dark:border-stone-800 bg-[#FAF9F5] dark:bg-stone-900 flex flex-col lg:flex-row items-center justify-between gap-4">
                  <div className="relative w-full lg:w-96">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="text"
                      placeholder="Localizar Libro..."
                      value={bookSearchQuery}
                      onChange={(e) => setBookSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-xs rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-zinc-950 focus:outline-none focus:border-[#7F1D1D] font-sans transition-all"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 w-full lg:w-auto overflow-x-auto whitespace-nowrap">
                    <span className="text-[9px] font-black text-stone-400 uppercase tracking-[0.2em] mr-2">Filtrar:</span>
                    {(['ALL', 'Antiguo Testamento', 'Nuevo Testamento'] as const).map(tab => (
                      <button
                        key={tab}
                        onClick={() => setBookTestamentTab(tab)}
                        className={`px-4 py-2 rounded text-[10px] font-black uppercase tracking-widest transition-all ${
                          bookTestamentTab === tab
                            ? 'bg-[#7F1D1D] text-white shadow-md'
                            : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-300 dark:border-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        {tab === 'ALL' ? 'Biblia Completa' : tab}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Book Grid */}
                <div className="flex-1 overflow-y-auto p-6 bg-white dark:bg-zinc-950 custom-scrollbar">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {filteredBooks.map(book => (
                      <button
                        key={book.id}
                        onClick={() => {
                          setSelectedBookId(book.id);
                          setBookDrawerStep('chapters');
                        }}
                        className={`w-full text-left p-4 rounded border-2 transition-all flex flex-col justify-between h-24 ${
                          selectedBookId === book.id
                            ? 'bg-[#FAF9F5] dark:bg-stone-900 border-[#7F1D1D] shadow-inner ring-1 ring-[#7F1D1D]/20'
                            : 'bg-white dark:bg-zinc-900 border-stone-100 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-600'
                        }`}
                      >
                        <span className={`text-[8px] font-black uppercase tracking-[0.2em] mb-1 ${
                          selectedBookId === book.id ? 'text-[#7F1D1D]' : 'text-stone-400'
                        }`}>
                          {book.division}
                        </span>
                        <span className={`font-serif font-black text-sm tracking-tight ${
                          selectedBookId === book.id ? 'text-[#1A2533] dark:text-white' : 'text-stone-700 dark:text-stone-300'
                        }`}>
                          {book.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              /* Chapter Selection Grid */
              <div className="flex-1 overflow-y-auto p-8 bg-white dark:bg-zinc-950 custom-scrollbar flex flex-col items-center">
                <div className="w-full max-w-4xl">
                  <div className="mb-8 text-center">
                    <h4 className="font-serif font-black text-2xl text-[#1A2533] dark:text-white uppercase tracking-tighter">
                      {currentBook?.name}
                    </h4>
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mt-2">
                      Seleccione el capítulo para iniciar el análisis exegético
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2">
                    {currentBook && Array.from({ length: currentBook.chaptersCount }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setSelectedChapter(i + 1);
                          setIsBookDrawerOpen(false);
                          setBookDrawerStep('books'); // Reset for next open
                        }}
                        className={`aspect-square flex items-center justify-center text-xs font-mono font-bold rounded border transition-all ${
                          selectedChapter === i + 1
                            ? 'bg-[#7F1D1D] text-white border-[#7F1D1D] shadow-lg scale-110 z-10'
                            : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:border-[#7F1D1D] hover:text-[#7F1D1D]'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            <div className="p-4 bg-[#FAF9F5] dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 flex justify-center">
              <button
                onClick={() => setIsBookDrawerOpen(false)}
                className="px-10 py-3 bg-[#1A2533] hover:bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] rounded shadow-lg transition-all"
              >
                Cerrar Índice
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto bg-white dark:bg-zinc-950 p-6 flex justify-center pb-24">
        <div className="max-w-4xl w-full">
          {/* Quick Phrase Search Trigger Banner: Institutional Design */}
          <div className="mb-10 bg-[#FAF9F5] border-2 border-[#7F1D1D]/10 rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm relative overflow-hidden group border-stone-200">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#7F1D1D]" />
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded bg-[#7F1D1D] text-white flex items-center justify-center shrink-0 shadow-md">
                <Search className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-[#1A2533] dark:text-stone-100">
                  Concordancia y Búsqueda Canónica
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400 font-sans tracking-wide leading-relaxed max-w-md">
                  Investigación textual exegética en los sesenta y seis libros del canon bíblico. Localice frases, términos léxicos y conceptos teológicos fundamentales.
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsPhraseSearchOpen(true)}
              className="px-8 py-3 bg-[#1A2533] hover:bg-black text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded transition-all cursor-pointer shadow-md active:scale-95 whitespace-nowrap"
            >
              Iniciar Búsqueda
            </button>
          </div>

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
              }) : currentChapterContent.verses).map(verse => {
                const vNotes = chapterNotes.filter(n => n.verse === verse.num);
                const mainHighlight = vNotes[0];
                const colorStyle = mainHighlight ? getColorClasses(mainHighlight.color) : null;

                return (
              <div key={verse.num} className="relative">
                <div 
                  onClick={() => {
                    handleVerseClick(verse.num);
                    const existing = chapterNotes.find(n => n.verse === verse.num);
                    if (existing) {
                      setNoteInputText(existing.noteText || '');
                      setSelectedColor(existing.color);
                    } else {
                      setNoteInputText('');
                    }
                  }}
                  onMouseUp={() => {
                    const sel = window.getSelection();
                    if (sel && !sel.isCollapsed) {
                      const txt = sel.toString().trim();
                      if (txt.length > 2) {
                        setSelectedTextSnippet({ verse: verse.num, text: txt });
                        setSelectedVerse(verse.num);
                        setActiveVerseMenuTab('subrayado');
                      }
                    }
                  }}
                  className={`flex gap-4 group p-2.5 rounded-xl transition-colors cursor-pointer ${
                    colorStyle ? colorStyle.bg : (selectedVerse === verse.num 
                      ? 'bg-amber-50 dark:bg-zinc-900 ring-1 ring-amber-300 shadow-sm' 
                      : 'hover:bg-stone-50 dark:hover:bg-zinc-900')
                  }`}
                >
                  <div className="flex flex-col items-center pt-0.5">
                    <span className={`font-bold font-mono text-sm shrink-0 select-none ${
                      selectedVerse === verse.num ? 'text-amber-600 dark:text-amber-400' : 'text-[#7F1D1D] dark:text-amber-500'
                    }`}>
                      {verse.num}
                    </span>
                    {mainHighlight && (
                      <span className={`w-2 h-2 rounded-full mt-1 ${colorStyle?.dot}`}></span>
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p>
                      {verse[activeTranslation as keyof typeof verse] as string || verse.rvr1960}
                    </p>
                    {/* Render attached note badge if present: Institutional Style */}
                    {vNotes.map(n => n.noteText ? (
                      <div key={n.id} className="mt-2 text-[11px] bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 p-3 rounded shadow-sm font-sans text-[#1A2533] dark:text-stone-200 flex items-start gap-3 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1 h-full bg-[#7F1D1D]/20 group-hover:bg-[#7F1D1D] transition-colors" />
                        <Edit3 className="w-3.5 h-3.5 text-[#7F1D1D] dark:text-amber-500 shrink-0 mt-0.5" strokeWidth={1.5} />
                        <div className="flex-1">
                          {n.selectedText && (
                            <span className="font-serif italic font-black text-[#7F1D1D] dark:text-amber-500 block text-[10px] uppercase tracking-tight mb-1">
                              «{n.selectedText}»:
                            </span>
                          )}
                          <span className="leading-relaxed">{n.noteText}</span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeNote(n.id);
                          }}
                          className="text-stone-300 hover:text-[#7F1D1D] p-1 cursor-pointer transition-colors"
                          title="Eliminar anotación"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : null)}
                  </div>
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
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 ml-0 sm:ml-12 p-6 bg-white dark:bg-zinc-900 border border-stone-200 dark:border-stone-800 rounded shadow-xl relative"
                    >
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-[#7F1D1D]" />
                      
                      {activeVerseMenuTab === 'menu' ? (
                        <div className="flex flex-col gap-4">
                          <div className="flex justify-between items-center border-b border-stone-100 dark:border-stone-800 pb-3">
                            <span className="text-[10px] font-black text-[#1A2533] dark:text-stone-400 uppercase tracking-[0.2em]">
                              Herramientas Exegéticas · {currentBook.shortName} {selectedChapter}:{verse.num}
                            </span>
                            <button 
                              onClick={(e) => { e.stopPropagation(); setSelectedVerse(null); }}
                              className="p-1.5 hover:bg-stone-50 dark:hover:bg-zinc-800 rounded transition-colors text-stone-400 hover:text-[#7F1D1D]"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          <button 
                            onClick={() => {
                              const existing = chapterNotes.find(n => n.verse === verse.num);
                              if (existing) {
                                setNoteInputText(existing.noteText || '');
                                setSelectedColor(existing.color);
                              }
                              setActiveVerseMenuTab('subrayado');
                            }}
                            className="flex items-center gap-3 p-3 rounded-lg bg-stone-50 dark:bg-zinc-800/50 hover:bg-amber-50 dark:hover:bg-zinc-800 text-sm font-medium transition-colors border border-transparent hover:border-amber-200 dark:hover:border-zinc-700 text-left cursor-pointer"
                          >
                            <Highlighter className="w-4 h-4 text-amber-500 shrink-0" />
                            <div className="flex-1">
                              <div className="font-semibold text-gray-800 dark:text-gray-200 flex items-center justify-between">
                                <span>Subrayar y Nota Personal</span>
                                {mainHighlight && (
                                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200">
                                    Resaltado
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">Escoge un color de subrayado y escribe tus notas de estudio</div>
                            </div>
                          </button>

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
                              {activeVerseMenuTab === 'subrayado' && `Subrayado y Notas — ${currentBook.name} ${selectedChapter}:${verse.num}`}
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
                            {activeVerseMenuTab === 'subrayado' && (
                              <div className="space-y-4">
                                {selectedTextSnippet && selectedTextSnippet.verse === verse.num && (
                                  <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-zinc-800 border border-amber-300 dark:border-amber-700 text-xs font-serif italic text-amber-950 dark:text-amber-200">
                                    <span className="font-sans font-bold not-italic text-[10px] uppercase block text-amber-600 mb-0.5">Texto seleccionado:</span>
                                    «{selectedTextSnippet.text}»
                                  </div>
                                )}

                                {/* Color Palette */}
                                <div>
                                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wider">
                                    Selecciona Color de Subrayado:
                                  </label>
                                  <div className="flex items-center gap-2 flex-wrap">
                                    {(['yellow', 'green', 'blue', 'pink', 'purple', 'orange'] as HighlightColor[]).map((c) => {
                                      const cDetails = getColorClasses(c);
                                      const isSelected = selectedColor === c;
                                      return (
                                        <button
                                          key={c}
                                          onClick={() => {
                                            setSelectedColor(c);
                                            addOrUpdateHighlight(
                                              selectedBookId,
                                              currentBook.name,
                                              selectedChapter,
                                              verse.num,
                                              c,
                                              selectedTextSnippet?.verse === verse.num ? selectedTextSnippet.text : undefined,
                                              noteInputText
                                            );
                                          }}
                                          className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                                            isSelected ? 'ring-2 ring-amber-500 scale-105 shadow-xs' : 'opacity-80 hover:opacity-100'
                                          } ${cDetails.badge}`}
                                        >
                                          <span className={`w-3 h-3 rounded-full ${cDetails.dot}`}></span>
                                          <span className="capitalize">{c}</span>
                                        </button>
                                      );
                                    })}

                                    {vNotes.length > 0 && (
                                      <button
                                        onClick={() => {
                                          vNotes.forEach(n => removeNote(n.id));
                                          setNoteInputText('');
                                        }}
                                        className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 border border-red-200 dark:border-red-800/50 flex items-center gap-1 cursor-pointer ml-auto"
                                        title="Quitar subrayado y notas de este versículo"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                        <span>Borrar</span>
                                      </button>
                                    )}
                                  </div>
                                </div>

                                {/* Note textarea */}
                                <div>
                                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 uppercase tracking-wider">
                                    Nota de Estudio / Reflexión Personal:
                                  </label>
                                  <textarea
                                    value={noteInputText}
                                    onChange={(e) => setNoteInputText(e.target.value)}
                                    placeholder="Escribe tus notas, exégesis o meditaciones personales para este versículo..."
                                    rows={3}
                                    className="w-full p-3 text-xs bg-stone-50 dark:bg-zinc-800 border border-stone-300 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 dark:text-white font-sans"
                                  />
                                  <div className="flex justify-end gap-2 mt-2">
                                    <button
                                      onClick={() => {
                                        addOrUpdateHighlight(
                                          selectedBookId,
                                          currentBook.name,
                                          selectedChapter,
                                          verse.num,
                                          selectedColor,
                                          selectedTextSnippet?.verse === verse.num ? selectedTextSnippet.text : undefined,
                                          noteInputText
                                        );
                                        setActiveVerseMenuTab('menu');
                                      }}
                                      className="px-4 py-1.5 rounded-xl bg-[#7F1D1D] hover:bg-red-900 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
                                    >
                                      <Check className="w-3.5 h-3.5" />
                                      <span>Guardar Nota y Subrayado</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                            {activeVerseMenuTab === 'comentario_biblico' && (
                              <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                                {verse.theologicalNote && (
                                  <div className="bg-[#FAF9F5] dark:bg-stone-800 p-4 rounded border border-stone-200 dark:border-stone-700 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-[#7F1D1D]" />
                                    <h4 className="font-serif font-black text-[10px] text-[#7F1D1D] dark:text-amber-500 mb-2 flex items-center gap-2 uppercase tracking-[0.15em]">
                                      <BookMarked size={14} />
                                      Nota Teológica · Versículo {verse.num}
                                    </h4>
                                    <p className="text-xs text-[#1A2533] dark:text-stone-200 font-sans leading-relaxed">
                                      {verse.theologicalNote}
                                    </p>
                                  </div>
                                )}
                                <div className="bg-white dark:bg-zinc-950 p-4 rounded border border-stone-200 dark:border-stone-800 shadow-sm">
                                  <h4 className="font-serif font-black text-sm text-[#1A2533] dark:text-zinc-100 mb-2 flex items-center gap-2 border-b border-stone-100 dark:border-stone-800 pb-2">
                                    <div className="w-2.5 h-2.5 rounded bg-[#7F1D1D]"></div>
                                    Matthew Henry (Comentario Expositivo)
                                  </h4>
                                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-sans">
                                    {verseComm.matthewHenry}
                                  </p>
                                </div>
                                <div className="bg-white dark:bg-zinc-950 p-4 rounded border border-stone-200 dark:border-stone-800 shadow-sm">
                                  <h4 className="font-serif font-black text-sm text-[#1A2533] dark:text-zinc-100 mb-2 flex items-center gap-2 border-b border-stone-100 dark:border-stone-800 pb-2">
                                    <div className="w-2.5 h-2.5 rounded bg-emerald-600"></div>
                                    Paul Washer (Enfoque Reformado)
                                  </h4>
                                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-sans">
                                    {verseComm.paulWasher}
                                  </p>
                                </div>
                                <div className="bg-white dark:bg-zinc-950 p-4 rounded border border-stone-200 dark:border-stone-800 shadow-sm">
                                  <h4 className="font-serif font-black text-sm text-[#1A2533] dark:text-zinc-100 mb-2 flex items-center gap-2 border-b border-stone-100 dark:border-stone-800 pb-2">
                                    <div className="w-2.5 h-2.5 rounded bg-sky-600"></div>
                                    Charles Spurgeon (Tesoro del Devocional)
                                  </h4>
                                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-sans">
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
                                <ul className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                                  {crossRefs.map((cr, idx) => (
                                    <li key={idx} className="p-4 bg-white dark:bg-zinc-950 rounded border border-stone-200 dark:border-stone-800 shadow-sm relative group overflow-hidden">
                                      <div className="absolute top-0 left-0 w-1 h-full bg-stone-100 dark:bg-stone-800 group-hover:bg-[#7F1D1D] transition-colors" />
                                      <div className="flex items-center justify-between gap-3 mb-3">
                                        <span className="font-serif font-black text-[#7F1D1D] dark:text-amber-500 text-xs flex items-center gap-2 uppercase tracking-tight">
                                          <LinkIcon size={14} className="text-stone-400" />
                                          {cr.ref}
                                        </span>
                                        <span className="text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded bg-[#FAF9F5] dark:bg-stone-900 text-stone-500 dark:text-stone-400 border border-stone-200 dark:border-stone-800">
                                          {cr.type}
                                        </span>
                                      </div>
                                      <p className="text-xs italic font-serif text-[#1A2533] dark:text-stone-200 mb-3 leading-relaxed bg-[#FAF9F5] dark:bg-stone-900 p-3 rounded border border-stone-100 dark:border-stone-800">
                                        «{cr.quote}»
                                      </p>
                                      <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed font-sans">
                                        <strong className="text-[#1A2533] dark:text-stone-200 font-black uppercase tracking-widest text-[9px]">Análisis: </strong>
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
                    </motion.div>
                  );
                })()}
              </div>
            );
          })}
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

      {/* Phrase Search Modal */}
      {isPhraseSearchOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1A2533]/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="bg-white dark:bg-zinc-950 border border-stone-200 dark:border-stone-800 w-full max-w-5xl max-h-[92vh] rounded flex flex-col overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
            
            {/* Modal Header: Institutional Style */}
            <div className="p-5 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between shrink-0 relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#7F1D1D]" />
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded bg-[#FAF9F5] dark:bg-stone-800 flex items-center justify-center border border-stone-200 dark:border-stone-700 text-[#7F1D1D] dark:text-amber-500 shadow-sm shrink-0">
                  <Search size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-serif font-black text-lg text-[#1A2533] dark:text-stone-100 uppercase tracking-tight flex items-center gap-2">
                    Concordancia Canónica
                  </h3>
                  <p className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] mt-0.5">
                    Investigación de Textos Sagrados • Sesenta y Seis Libros
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsPhraseSearchOpen(false)}
                className="p-2 text-stone-400 hover:text-[#7F1D1D] hover:bg-stone-50 dark:hover:bg-stone-800 rounded transition-colors cursor-pointer"
                title="Cerrar concordancia"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            {/* Search Controls Bar: Paper Style */}
            <div className="p-6 bg-[#FAF9F5] dark:bg-stone-900/50 border-b border-stone-200 dark:border-stone-800 flex flex-col gap-4 shrink-0">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleExecutePhraseSearch(); }}
                className="flex items-center gap-3"
              >
                <div className="relative flex-1">
                  <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" strokeWidth={1.5} />
                  <input
                    type="text"
                    value={phraseQuery}
                    onChange={(e) => setPhraseQuery(e.target.value)}
                    placeholder="Redacte la frase o término doctrinal a localizar..."
                    className="w-full pl-12 pr-12 py-3.5 text-sm rounded bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-800 focus:border-[#7F1D1D] dark:text-white outline-none shadow-sm transition-all"
                    autoFocus
                  />
                  {phraseQuery && (
                    <button
                      type="button"
                      onClick={() => { setPhraseQuery(''); setPhraseSearchResults([]); setHasSearchedPhrase(false); }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[#7F1D1D]"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSearchingPhrase || !phraseQuery.trim()}
                  className="px-8 py-3.5 bg-[#1A2533] hover:bg-black disabled:bg-stone-200 dark:disabled:bg-stone-800 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded transition-all shadow-md cursor-pointer shrink-0 active:scale-95"
                >
                  {isSearchingPhrase ? 'Localizando...' : 'Localizar'}
                </button>
              </form>

              {/* Sample Quick Phrase Suggestions */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar scrollbar-hide">
                <span className="text-[9px] font-black text-stone-400 uppercase tracking-[0.2em] shrink-0 border-r border-stone-300 dark:border-stone-700 pr-3 mr-1">
                  Sugerencias
                </span>
                {POPULAR_PHRASE_SUGGESTIONS.map((sug, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setPhraseQuery(sug);
                      handleExecutePhraseSearch(sug);
                    }}
                    className="px-3 py-1.5 rounded bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:border-[#7F1D1D] hover:text-[#7F1D1D] text-[9px] font-black uppercase tracking-widest transition-all shrink-0 cursor-pointer shadow-sm active:scale-95"
                  >
                    "{sug}"
                  </button>
                ))}
              </div>

              {/* Testament Filter Options */}
              {phraseSearchResults.length > 0 && (
                <div className="flex items-center justify-between pt-4 border-t border-stone-200 dark:border-stone-800">
                  <div className="flex items-center gap-3">
                    <Filter className="w-4 h-4 text-stone-400" />
                    <span className="text-[10px] font-black text-stone-500 dark:text-stone-400 uppercase tracking-[0.2em]">
                      Filtrar Testamento:
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {(['ALL', 'Antiguo Testamento', 'Nuevo Testamento'] as const).map(testament => (
                      <button
                        key={testament}
                        onClick={() => setPhraseFilterTestament(testament)}
                        className={`px-3 py-1.5 rounded text-[9px] font-black uppercase tracking-[0.2em] transition-all border ${
                          phraseFilterTestament === testament
                            ? 'bg-[#7F1D1D] border-[#7F1D1D] text-white shadow-sm'
                            : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-500 hover:border-stone-400'
                        }`}
                      >
                        {testament === 'ALL' ? 'Toda la Biblia' : testament}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Results Content Area: White Background with Stone Grid */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-10 custom-scrollbar bg-white dark:bg-zinc-950">
              {isSearchingPhrase ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4 text-stone-400">
                  <RefreshCw className="w-10 h-10 animate-spin text-[#7F1D1D]" />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em]">Escaneando el Canon Bíblico...</p>
                </div>
              ) : filteredPhraseResults.length > 0 ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-900 text-[10px] font-black uppercase tracking-widest text-stone-400">
                    <span>
                      Hallazgos: <strong className="text-[#1A2533] dark:text-white">{filteredPhraseResults.length}</strong> pasajes para "{phraseQuery}"
                    </span>
                    <span className="hidden sm:inline">Seleccione un registro para consulta exegética completa</span>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    {filteredPhraseResults.map((res, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleSelectSearchResult(res)}
                        className="group p-6 rounded border border-stone-100 dark:border-stone-900 bg-white dark:bg-stone-950 hover:border-[#7F1D1D]/30 hover:bg-[#FAF9F5] dark:hover:bg-stone-900 transition-all cursor-pointer relative"
                      >
                        <div className="flex items-center justify-between gap-4 mb-3">
                          <div className="flex items-center gap-3">
                            <span className="font-serif font-black text-base text-[#7F1D1D] dark:text-amber-500 uppercase tracking-tight group-hover:underline">
                              {res.bookName} {res.chapter}:{res.verse}
                            </span>
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] px-2 py-1 rounded bg-[#FAF9F5] dark:bg-stone-800 text-stone-400 dark:text-stone-300 border border-stone-200 dark:border-stone-700">
                              {res.division}
                            </span>
                          </div>
                          <span className="text-[9px] font-black text-[#7F1D1D] dark:text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest flex items-center gap-2">
                            Consultar pasaje <ChevronRight size={14} strokeWidth={3} />
                          </span>
                        </div>

                        <p className="font-serif italic text-base sm:text-lg text-[#1A2533] dark:text-stone-100 leading-relaxed">
                          "{<span dangerouslySetInnerHTML={{ __html: res.text.replace(/<mark>/gi, '<mark class="bg-amber-100 dark:bg-amber-900/50 text-[#7F1D1D] dark:text-amber-200 font-black px-1 rounded-sm border-b-2 border-[#7F1D1D]/20">') }} />}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : hasSearchedPhrase ? (
                <div className="text-center py-24 px-6 space-y-4">
                  <div className="w-16 h-16 rounded bg-[#FAF9F5] dark:bg-stone-900 text-stone-300 dark:text-stone-700 flex items-center justify-center mx-auto border border-stone-100 dark:border-stone-800">
                    <Search size={32} strokeWidth={1} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-serif font-black text-xl text-[#1A2533] dark:text-stone-100 uppercase tracking-tight">Registro No Encontrado</h4>
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest max-w-md mx-auto leading-loose">
                      No se localizaron coincidencias para "{phraseQuery}". <br/>
                      Recomendamos el uso de términos léxicos fundamentales o raíces semánticas.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-20 px-6 space-y-6">
                  <div className="w-20 h-20 rounded bg-[#FAF9F5] dark:bg-stone-900 text-stone-200 dark:text-stone-800 flex items-center justify-center mx-auto border border-stone-100 dark:border-stone-800">
                    <BookOpen size={40} strokeWidth={1} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-serif font-black text-2xl text-[#1A2533] dark:text-stone-100 uppercase tracking-tight">
                      Consulta Lexicográfica
                    </h4>
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest max-w-md mx-auto leading-relaxed">
                      Ingrese una frase doctrinal o término bíblico para localizar su posición exacta en el canon de las Sagradas Escrituras.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer: Institutional Badge Style */}
            <div className="p-5 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between shrink-0">
              <span className="text-[9px] font-black text-stone-400 uppercase tracking-[0.3em]">
                Fuente: Textus Receptus / {activeTranslation.toUpperCase()} • Seminario Digital
              </span>
              <button
                onClick={() => setIsPhraseSearchOpen(false)}
                className="px-6 py-2 rounded bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-[#1A2533] dark:text-stone-100 text-[10px] font-black uppercase tracking-[0.2em] transition-all cursor-pointer active:scale-95 border border-stone-200 dark:border-stone-700 shadow-sm"
              >
                Cerrar Concordancia
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Bible Notes and Highlights Drawer */}
      <BibleNotesDrawer 
        isOpen={isNotesDrawerOpen}
        onClose={() => setIsNotesDrawerOpen(false)}
        notes={allNotes}
        onNavigateToVerse={(bId, cNum, vNum) => {
          setSelectedBookId(bId);
          setSelectedChapter(cNum);
          setSelectedVerse(vNum);
          setActiveVerseMenuTab('subrayado');
        }}
      />
    </div>
  );
}
