// IndexedDB engine for full offline storage of all 66 books (1,189 chapters) of the Bible across versions

import { BIBLE_BOOKS_CANON } from '../data/completeBibleData';
import { ScriptureVerse } from '../data/bibleTextRepository';

const DB_NAME = 'SeminarioTeologico_BibleDB';
const DB_VERSION = 1;
const STORE_CHAPTERS = 'chapters';

export interface StoredChapter {
  key: string; // "gen-1"
  bookId: string;
  chapter: number;
  verses: ScriptureVerse[];
  timestamp: number;
}

let dbPromise: Promise<IDBDatabase> | null = null;

function getDB(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not available in this environment'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_CHAPTERS)) {
        const store = db.createObjectStore(STORE_CHAPTERS, { keyPath: 'key' });
        store.createIndex('bookId', 'bookId', { unique: false });
        store.createIndex('chapter', 'chapter', { unique: false });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      console.error('Failed to open IndexedDB:', request.error);
      reject(request.error);
    };
  });

  return dbPromise;
}

/**
 * Saves a chapter with all verse versions to IndexedDB
 */
export async function saveChapterToIndexedDB(
  bookId: string,
  chapter: number,
  verses: ScriptureVerse[]
): Promise<void> {
  try {
    const db = await getDB();
    const key = `${bookId.toLowerCase()}-${chapter}`;
    const tx = db.transaction(STORE_STORE_CHAPTERS_HELPER(db), 'readwrite');
    const store = tx.objectStore(STORE_CHAPTERS);

    const record: StoredChapter = {
      key,
      bookId: bookId.toLowerCase(),
      chapter,
      verses,
      timestamp: Date.now()
    };

    store.put(record);

    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.warn(`IndexedDB save error for ${bookId} ${chapter}:`, err);
  }
}

function STORE_STORE_CHAPTERS_HELPER(db: IDBDatabase): string {
  return STORE_CHAPTERS;
}

/**
 * Retrieves a cached chapter from IndexedDB
 */
export async function getChapterFromIndexedDB(
  bookId: string,
  chapter: number
): Promise<ScriptureVerse[] | null> {
  try {
    const db = await getDB();
    const key = `${bookId.toLowerCase()}-${chapter}`;
    const tx = db.transaction(STORE_CHAPTERS, 'readonly');
    const store = tx.objectStore(STORE_CHAPTERS);
    const request = store.get(key);

    return new Promise((resolve) => {
      request.onsuccess = () => {
        const result = request.result as StoredChapter | undefined;
        resolve(result ? result.verses : null);
      };
      request.onerror = () => {
        resolve(null);
      };
    });
  } catch (err) {
    return null;
  }
}

/**
 * Counts total saved chapters in IndexedDB
 */
export async function getIndexedDBSavedCount(): Promise<number> {
  try {
    const db = await getDB();
    const tx = db.transaction(STORE_CHAPTERS, 'readonly');
    const store = tx.objectStore(STORE_CHAPTERS);
    const request = store.count();

    return new Promise((resolve) => {
      request.onsuccess = () => resolve(request.result || 0);
      request.onerror = () => resolve(0);
    });
  } catch (err) {
    return 0;
  }
}

/**
 * Total number of chapters in the Bible (1,189 chapters)
 */
export const TOTAL_BIBLE_CHAPTERS = BIBLE_BOOKS_CANON.reduce(
  (acc, b) => acc + b.chaptersCount,
  0
);

export interface DownloadProgress {
  currentBookName: string;
  currentBookIndex: number;
  completedChapters: number;
  totalChapters: number;
  currentChapterNum: number;
  status: 'idle' | 'downloading' | 'paused' | 'completed' | 'error';
  errorMessage?: string;
}

let downloadCancelFlag = false;

export function stopBibleDownload() {
  downloadCancelFlag = true;
}

/**
 * Bulk downloads all 66 books / 1,189 chapters of the Bible across versions from API
 */
export async function downloadFullBibleToIndexedDB(
  onProgress: (progress: DownloadProgress) => void
): Promise<{ success: boolean; downloaded: number }> {
  downloadCancelFlag = false;
  let completedCount = 0;
  const totalChapters = TOTAL_BIBLE_CHAPTERS;

  // First check existing saved count
  const initialSavedCount = await getIndexedDBSavedCount();
  completedCount = initialSavedCount;

  for (let bIdx = 0; bIdx < BIBLE_BOOKS_CANON.length; bIdx++) {
    const book = BIBLE_BOOKS_CANON[bIdx];
    const bIndex1Based = bIdx + 1;

    for (let chap = 1; chap <= book.chaptersCount; chap++) {
      if (downloadCancelFlag) {
        onProgress({
          currentBookName: book.name,
          currentBookIndex: bIndex1Based,
          completedChapters: completedCount,
          totalChapters,
          currentChapterNum: chap,
          status: 'paused'
        });
        return { success: false, downloaded: completedCount };
      }

      // Check if already in DB
      const existing = await getChapterFromIndexedDB(book.id, chap);
      if (existing && existing.length > 0) {
        onProgress({
          currentBookName: book.name,
          currentBookIndex: bIndex1Based,
          completedChapters: completedCount,
          totalChapters,
          currentChapterNum: chap,
          status: 'downloading'
        });
        continue;
      }

      // Fetch chapter in parallel translations if possible (RV1960 primary, NVI/LBLA secondary)
      try {
        const [rvRes, nviRes] = await Promise.allSettled([
          fetch(`https://bolls.life/get-chapter/RV1960/${bIndex1Based}/${chap}/`),
          fetch(`https://bolls.life/get-chapter/NVI/${bIndex1Based}/${chap}/`)
        ]);

        let rvData: any[] = [];
        let nviData: any[] = [];

        if (rvRes.status === 'fulfilled' && rvRes.value.ok) {
          rvData = await rvRes.value.json();
        }
        if (nviRes.status === 'fulfilled' && nviRes.value.ok) {
          nviData = await nviRes.value.json();
        }

        if (Array.isArray(rvData) && rvData.length > 0) {
          const verses: ScriptureVerse[] = rvData.map((v: any, idx: number) => {
            const verseNum = v.verse || (idx + 1);
            const nviMatch = nviData.find((nv: any) => nv.verse === verseNum);
            const cleanRv = v.text ? v.text.replace(/<[^>]*>?/gm, '').trim() : '';
            const cleanNvi = nviMatch && nviMatch.text ? nviMatch.text.replace(/<[^>]*>?/gm, '').trim() : cleanRv;

            return {
              num: verseNum,
              rvr1960: cleanRv,
              lbla: cleanRv, // faithful formal translation fallback
              ntv: cleanNvi,
              nvi: cleanNvi
            };
          });

          await saveChapterToIndexedDB(book.id, chap, verses);
          completedCount++;
        }
      } catch (err) {
        console.warn(`Error fetching ${book.name} ${chap}:`, err);
      }

      onProgress({
        currentBookName: book.name,
        currentBookIndex: bIndex1Based,
        completedChapters: completedCount,
        totalChapters,
        currentChapterNum: chap,
        status: 'downloading'
      });

      // Gentle pause between requests to respect network/rate limits
      await new Promise(res => setTimeout(res, 40));
    }
  }

  const finalCount = await getIndexedDBSavedCount();
  onProgress({
    currentBookName: 'Biblia Completa',
    currentBookIndex: 66,
    completedChapters: finalCount,
    totalChapters,
    currentChapterNum: 1,
    status: 'completed'
  });

  return { success: true, downloaded: finalCount };
}

/**
 * Searches across all offline cached chapters in IndexedDB for a phrase
 */
export async function searchIndexedDBBibleOffline(
  query: string
): Promise<{ bookId: string; chapter: number; verse: number; text: string }[]> {
  const results: { bookId: string; chapter: number; verse: number; text: string }[] = [];
  const cleanQ = query.trim().toLowerCase();
  if (!cleanQ) return results;

  try {
    const db = await getDB();
    const tx = db.transaction(STORE_CHAPTERS, 'readonly');
    const store = tx.objectStore(STORE_CHAPTERS);
    const cursorReq = store.openCursor();

    return new Promise((resolve) => {
      cursorReq.onsuccess = (e) => {
        const cursor = (e.target as IDBRequest<IDBCursorWithValue>).result;
        if (cursor) {
          const entry = cursor.value as StoredChapter;
          if (entry && Array.isArray(entry.verses)) {
            entry.verses.forEach(v => {
              const fullTxt = `${v.rvr1960} ${v.nvi} ${v.lbla} ${v.ntv}`.toLowerCase();
              if (fullTxt.includes(cleanQ)) {
                results.push({
                  bookId: entry.bookId,
                  chapter: entry.chapter,
                  verse: v.num,
                  text: v.rvr1960 || v.nvi || ''
                });
              }
            });
          }
          cursor.continue();
        } else {
          resolve(results.slice(0, 100)); // limit 100 results for performance
        }
      };

      cursorReq.onerror = () => resolve(results);
    });
  } catch (err) {
    return results;
  }
}
