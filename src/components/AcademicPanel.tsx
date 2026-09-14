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
  Plus
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
              onClick={() => setIsNotesDrawerOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center gap-1.5 border border-amber-400/40 shadow-sm transition-all cursor-pointer shrink-0"
              title="Ver todas mis notas y versículos subrayados"
            >
              <Highlighter className="w-3.5 h-3.5 text-amber-200" />
              <span className="hidden sm:inline">Mis Notas</span>
              <span className="sm:hidden">Notas</span>
              {allNotes.length > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-black/40 text-[10px] font-mono text-amber-200">
                  {allNotes.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsPhraseSearchOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold flex items-center gap-1.5 border border-amber-400 shadow-sm transition-all cursor-pointer shrink-0"
              title="Buscar versículos por frase en toda la Biblia"
            >
              <Search className="w-3.5 h-3.5 text-stone-900" />
              <span className="hidden sm:inline">Buscar por Frase</span>
              <span className="sm:hidden">Frase</span>
            </button>

            <button
              onClick={() => setIsBookDrawerOpen(true)}
              className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 border border-white/20 transition-colors shadow-sm shrink-0"
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
          {/* Quick Phrase Search Trigger Banner */}
          <div className="mb-6 bg-[#FDFBF7] dark:bg-zinc-900 border border-[#E0D7C6] dark:border-zinc-800 rounded-2xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <Search className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800 dark:text-gray-200">
                  ¿Buscas un versículo específico por frase o palabra clave?
                </p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  Busca frases exactas en los 66 libros del canon bíblico.
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsPhraseSearchOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-[#1A2533] dark:bg-zinc-800 hover:bg-[#2C3E50] text-amber-200 text-xs font-bold flex items-center gap-1.5 border border-amber-500/30 transition-all cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Buscar Versículo por Frase</span>
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
                    {/* Render attached note badge if present */}
                    {vNotes.map(n => n.noteText ? (
                      <div key={n.id} className="mt-1 text-xs bg-amber-50/90 dark:bg-zinc-800/90 border border-amber-200 dark:border-zinc-700 p-2 rounded-lg font-sans text-gray-800 dark:text-gray-200 flex items-start gap-2 shadow-xs">
                        <Edit3 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                        <div className="flex-1">
                          {n.selectedText && (
                            <span className="font-serif italic font-semibold text-amber-900 dark:text-amber-300 block text-[11px]">
                              «{n.selectedText}»:
                            </span>
                          )}
                          <span>{n.noteText}</span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeNote(n.id);
                          }}
                          className="text-gray-400 hover:text-red-500 p-0.5 cursor-pointer"
                          title="Eliminar nota"
                        >
                          <Trash2 className="w-3 h-3" />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-[#FAF9F6] dark:bg-zinc-900 border border-[#E0D7C6] dark:border-zinc-700 w-full max-w-4xl h-[90vh] max-h-[820px] rounded-2xl shadow-2xl flex flex-col overflow-hidden font-sans">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-[#1A2533] text-white flex items-center justify-between border-b border-[#2C3E50] shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#7F1D1D] flex items-center justify-center border border-amber-500/30 text-amber-200 shadow-sm">
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-white flex items-center gap-2">
                    <span>Buscador de Versículos por Frase</span>
                    <span className="text-[10px] uppercase font-sans tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Biblia
                    </span>
                  </h3>
                  <p className="text-xs text-gray-300">
                    Encuentre versículos bíblicos buscando por frase o palabra clave
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsPhraseSearchOpen(false)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                title="Cerrar buscador"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Controls Bar */}
            <div className="p-4 bg-[#F4EFE6] dark:bg-zinc-800/60 border-b border-[#E0D7C6] dark:border-zinc-700/80 flex flex-col gap-3 shrink-0">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleExecutePhraseSearch(); }}
                className="flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={phraseQuery}
                    onChange={(e) => setPhraseQuery(e.target.value)}
                    placeholder="Escriba una frase (ej. 'por sus frutos los conoceréis', 'el Señor es mi pastor')..."
                    className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-xl bg-white dark:bg-zinc-900 border border-stone-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-[#7F1D1D] dark:text-white"
                    autoFocus
                  />
                  {phraseQuery && (
                    <button
                      type="button"
                      onClick={() => { setPhraseQuery(''); setPhraseSearchResults([]); setHasSearchedPhrase(false); }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSearchingPhrase || !phraseQuery.trim()}
                  className="px-5 py-2.5 rounded-xl bg-[#7F1D1D] hover:bg-red-800 disabled:opacity-50 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-sm cursor-pointer shrink-0"
                >
                  {isSearchingPhrase ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-amber-200" />
                      <span>Buscando...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 text-amber-200" />
                      <span>Buscar</span>
                    </>
                  )}
                </button>
              </form>

              {/* Sample Quick Phrase Suggestions */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 shrink-0 mr-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  Sugerencias:
                </span>
                {POPULAR_PHRASE_SUGGESTIONS.map((sug, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setPhraseQuery(sug);
                      handleExecutePhraseSearch(sug);
                    }}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-200 border border-stone-300 dark:border-zinc-700 hover:border-amber-500 hover:bg-amber-50 dark:hover:bg-zinc-700 transition-colors shrink-0 cursor-pointer"
                  >
                    "{sug}"
                  </button>
                ))}
              </div>

              {/* Testament Filter Options */}
              {phraseSearchResults.length > 0 && (
                <div className="flex items-center justify-between pt-2 border-t border-[#E0D7C6] dark:border-zinc-700/60 text-xs">
                  <div className="flex items-center gap-2">
                    <Filter className="w-3.5 h-3.5 text-gray-500" />
                    <span className="font-bold text-gray-700 dark:text-gray-300">
                      Filtrar por Testamento:
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {(['ALL', 'Antiguo Testamento', 'Nuevo Testamento'] as const).map(testament => (
                      <button
                        key={testament}
                        onClick={() => setPhraseFilterTestament(testament)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                          phraseFilterTestament === testament
                            ? 'bg-[#7F1D1D] text-white'
                            : 'bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-300 border border-stone-300 dark:border-zinc-700'
                        }`}
                      >
                        {testament === 'ALL' ? 'Toda la Biblia' : testament}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Results Content Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar bg-[#FDFBF7] dark:bg-zinc-950">
              {isSearchingPhrase ? (
                <div className="flex flex-col items-center justify-center py-16 gap-3 text-stone-500 dark:text-stone-400">
                  <Loader2 className="w-8 h-8 animate-spin text-[#7F1D1D]" />
                  <p className="text-sm font-medium">Buscando coincidencias en los 66 libros de la Biblia...</p>
                </div>
              ) : filteredPhraseResults.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E0D7C6] dark:border-zinc-800 text-xs text-gray-500">
                    <span>
                      Se encontraron <strong className="text-gray-900 dark:text-white font-bold">{filteredPhraseResults.length}</strong> versículos para "{phraseQuery}"
                    </span>
                    <span className="font-mono text-[11px]">Haga clic en un versículo para abrirlo en la Biblia</span>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {filteredPhraseResults.map((res, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleSelectSearchResult(res)}
                        className="group p-4 rounded-xl bg-white dark:bg-zinc-900 border border-[#E0D7C6] dark:border-zinc-800 hover:border-amber-500 hover:shadow-md transition-all cursor-pointer relative"
                      >
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold font-serif text-sm text-[#7F1D1D] dark:text-amber-400 group-hover:underline flex items-center gap-1.5">
                              <BookOpen className="w-4 h-4 text-amber-600" />
                              {res.bookName} {res.chapter}:{res.verse}
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-stone-100 dark:bg-zinc-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-zinc-700">
                              {res.division}
                            </span>
                          </div>
                          <span className="text-xs font-bold text-amber-700 dark:text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                            Abrir pasaje &rarr;
                          </span>
                        </div>

                        <p className="font-serif text-sm sm:text-base text-gray-800 dark:text-gray-200 leading-relaxed italic">
                          "{<span dangerouslySetInnerHTML={{ __html: res.text.replace(/<mark>/gi, '<mark class="bg-amber-200 dark:bg-amber-900/80 text-amber-950 dark:text-amber-100 font-bold px-1 rounded border border-amber-400/50">') }} />}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : hasSearchedPhrase ? (
                <div className="text-center py-16 px-4 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-zinc-800 text-amber-800 dark:text-amber-300 flex items-center justify-center mx-auto text-lg font-bold">
                    ?
                  </div>
                  <h4 className="font-bold text-base text-gray-800 dark:text-gray-200">
                    No se encontraron versículos para "{phraseQuery}"
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                    Intente buscar con palabras clave más cortas o sinónimos (por ejemplo: "pastor", "frutos", "fe", "camino verdad").
                  </p>
                </div>
              ) : (
                <div className="text-center py-12 px-4 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-stone-100 dark:bg-zinc-800 text-[#7F1D1D] dark:text-amber-400 flex items-center justify-center mx-auto">
                    <Search className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-base sm:text-lg text-gray-800 dark:text-gray-200 mb-1">
                      Busque cualquier frase o versículo en la Biblia
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
                      Escriba una frase en el buscador superior o elija una de las frases sugeridas para encontrar de inmediato su cita exacta en las Sagradas Escrituras.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 sm:p-4 bg-[#FAF9F6] dark:bg-zinc-900 border-t border-[#E0D7C6] dark:border-zinc-800 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 shrink-0">
              <span className="hidden sm:inline">Traducción activa: {activeTranslation.toUpperCase()}</span>
              <button
                onClick={() => setIsPhraseSearchOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-stone-200 dark:bg-zinc-800 hover:bg-stone-300 dark:hover:bg-zinc-700 text-gray-800 dark:text-gray-200 font-bold transition-colors cursor-pointer ml-auto"
              >
                Cerrar Buscador
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
