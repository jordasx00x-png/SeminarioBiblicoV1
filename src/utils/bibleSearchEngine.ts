import { BIBLE_BOOKS_CANON, findBibleBook } from '../data/completeBibleData';
import { KNOWN_BIBLE_VERSES } from '../data/bibleVerses';
import { CURATED_CHAPTERS_DB } from '../data/bibleTextRepository';
import { searchIndexedDBBibleOffline } from './indexedDBBible';

export interface VerseSearchResult {
  bookId: string;
  bookName: string;
  shortName: string;
  chapter: number;
  verse: number;
  text: string;
  testament: 'Antiguo Testamento' | 'Nuevo Testamento';
  division: string;
}

/**
 * Searches the Bible for verses containing a specific phrase or keywords.
 * Combines online bolls.life search API with IndexedDB and local fallback databases.
 */
export async function searchBibleByPhrase(
  query: string,
  translationId: string = 'RV1960'
): Promise<VerseSearchResult[]> {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery || cleanQuery.length < 2) return [];

  const results: VerseSearchResult[] = [];
  const resultMap = new Set<string>(); // To prevent duplicates (key: bookId-chap-verse)

  // 1. Online Bolls.life Search
  try {
    const apiTranslation = translationId.toUpperCase() === 'RVR1960' ? 'RV1960' : 'RV1960';
    const response = await fetch(
      `https://bolls.life/search/${apiTranslation}/?search=${encodeURIComponent(cleanQuery)}`
    );
    
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data)) {
        for (const item of data) {
          const bookIndex = (item.book || 1) - 1;
          const bookMeta = BIBLE_BOOKS_CANON[bookIndex] || BIBLE_BOOKS_CANON[0];
          
          const key = `${bookMeta.id}-${item.chapter}-${item.verse}`;
          if (!resultMap.has(key)) {
            resultMap.add(key);
            results.push({
              bookId: bookMeta.id,
              bookName: bookMeta.name,
              shortName: bookMeta.shortName,
              chapter: item.chapter,
              verse: item.verse,
              text: item.text,
              testament: bookMeta.testament,
              division: bookMeta.division
            });
          }
        }
      }
    }
  } catch (err) {
    console.warn('Online Bible search failed, using IndexedDB and local database search:', err);
  }

  // 2. Search in IndexedDB Offline Storage
  try {
    const dbResults = await searchIndexedDBBibleOffline(cleanQuery);
    dbResults.forEach(item => {
      const bookMeta = BIBLE_BOOKS_CANON.find(b => b.id === item.bookId) || BIBLE_BOOKS_CANON[0];
      const key = `${bookMeta.id}-${item.chapter}-${item.verse}`;
      if (!resultMap.has(key)) {
        resultMap.add(key);
        results.push({
          bookId: bookMeta.id,
          bookName: bookMeta.name,
          shortName: bookMeta.shortName,
          chapter: item.chapter,
          verse: item.verse,
          text: highlightText(item.text, cleanQuery),
          testament: bookMeta.testament,
          division: bookMeta.division
        });
      }
    });
  } catch (err) {
    // ignore
  }

  // 2. Local Fallback Search in CURATED_CHAPTERS_DB and KNOWN_BIBLE_VERSES
  // Search in CURATED_CHAPTERS_DB
  Object.entries(CURATED_CHAPTERS_DB).forEach(([chapKey, chapterObj]) => {
    // chapKey format: "gen-1" or "rom-8"
    const parts = chapKey.split('-');
    if (parts.length === 2) {
      const bookId = parts[0];
      const chapterNum = parseInt(parts[1], 10);
      const bookMeta = BIBLE_BOOKS_CANON.find(b => b.id === bookId) || BIBLE_BOOKS_CANON[0];

      chapterObj.verses.forEach(v => {
        const verseText = (v.rvr1960 || v.lbla || v.nvi || '').toLowerCase();
        if (verseText.includes(cleanQuery)) {
          const key = `${bookMeta.id}-${chapterNum}-${v.num}`;
          if (!resultMap.has(key)) {
            resultMap.add(key);
            // Highlight query terms in local text
            const highlightedText = highlightText(v.rvr1960 || v.lbla || '', cleanQuery);
            results.push({
              bookId: bookMeta.id,
              bookName: bookMeta.name,
              shortName: bookMeta.shortName,
              chapter: chapterNum,
              verse: v.num,
              text: highlightedText,
              testament: bookMeta.testament,
              division: bookMeta.division
            });
          }
        }
      });
    }
  });

  // Search in KNOWN_BIBLE_VERSES
  Object.values(KNOWN_BIBLE_VERSES).forEach(v => {
    const textToSearch = `${v.rvr1960} ${v.lbla} ${v.nvi} ${v.dhh}`.toLowerCase();
    if (textToSearch.includes(cleanQuery)) {
      const bookMeta = findBibleBook(v.book) || BIBLE_BOOKS_CANON[0];
      const verseNum = typeof v.verse === 'number' ? v.verse : parseInt(String(v.verse), 10) || 1;
      const key = `${bookMeta.id}-${v.chapter}-${verseNum}`;
      if (!resultMap.has(key)) {
        resultMap.add(key);
        results.push({
          bookId: bookMeta.id,
          bookName: bookMeta.name,
          shortName: bookMeta.shortName,
          chapter: v.chapter,
          verse: verseNum,
          text: highlightText(v.rvr1960, cleanQuery),
          testament: bookMeta.testament,
          division: bookMeta.division
        });
      }
    }
  });

  return results;
}

/**
 * Highlights matches in string by wrapping them in <mark> tags
 */
function highlightText(text: string, query: string): string {
  if (!text || !query) return text;
  const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
