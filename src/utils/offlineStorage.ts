// Utility for managing Offline Storage of Bible Chapters, IndexedDB persistence and Academic Studies

import {
  saveChapterToIndexedDB,
  getChapterFromIndexedDB,
  getIndexedDBSavedCount,
  downloadFullBibleToIndexedDB,
  stopBibleDownload,
  TOTAL_BIBLE_CHAPTERS,
  DownloadProgress
} from './indexedDBBible';

const STORAGE_KEY = 'seminario_bible_offline_chapters_v1';
const SAVED_STUDIES_KEY = 'seminario_saved_offline_studies_v1';

export interface CachedChapter {
  bookId: string;
  chapter: number;
  verses: any[];
  timestamp: number;
}

/**
 * Retrieves cached chapters map from localStorage fallback
 */
export function getOfflineChapterMap(): Record<string, CachedChapter> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    console.error('Error reading offline chapter map:', err);
    return {};
  }
}

/**
 * Saves a chapter to offline storage (IndexedDB + localStorage backup)
 */
export function saveChapterOffline(bookId: string, chapter: number, verses: any[]): void {
  // Save to IndexedDB (unlimited capacity)
  saveChapterToIndexedDB(bookId, chapter, verses);

  // Backup to LocalStorage
  try {
    const map = getOfflineChapterMap();
    const key = `${bookId.toLowerCase()}-${chapter}`;
    map[key] = {
      bookId,
      chapter,
      verses,
      timestamp: Date.now()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch (err) {
    // LocalStorage quota may be reached, IndexedDB handles the bulk
  }
}

/**
 * Synchronous get chapter fallback from LocalStorage
 */
export function getChapterOffline(bookId: string, chapter: number): any[] | null {
  const map = getOfflineChapterMap();
  const key = `${bookId.toLowerCase()}-${chapter}`;
  const entry = map[key];
  return entry ? entry.verses : null;
}

/**
 * Asynchronous get chapter from IndexedDB (or fallback to LocalStorage)
 */
export async function getChapterOfflineAsync(bookId: string, chapter: number): Promise<any[] | null> {
  // Try IndexedDB first
  const indexedData = await getChapterFromIndexedDB(bookId, chapter);
  if (indexedData && indexedData.length > 0) {
    return indexedData;
  }
  // Fallback to LocalStorage
  return getChapterOffline(bookId, chapter);
}

/**
 * Returns total count of offline saved chapters (IndexedDB or LocalStorage)
 */
export function getOfflineChapterCount(): number {
  const map = getOfflineChapterMap();
  return Object.keys(map).length;
}

/**
 * Asynchronously returns total count of saved chapters in IndexedDB
 */
export async function getOfflineChapterCountAsync(): Promise<number> {
  const count = await getIndexedDBSavedCount();
  if (count > 0) return count;
  return getOfflineChapterCount();
}

export { TOTAL_BIBLE_CHAPTERS, stopBibleDownload };
export type { DownloadProgress };

/**
 * Key chapters to pre-fetch for quick offline study (26 key passages)
 */
export const KEY_OFFLINE_CHAPTER_TARGETS = [
  { bookId: 'gen', bookIndex: 1, chapter: 1, name: 'Génesis 1' },
  { bookId: 'gen', bookIndex: 1, chapter: 3, name: 'Génesis 3' },
  { bookId: 'exo', bookIndex: 2, chapter: 20, name: 'Éxodo 20' },
  { bookId: 'sal', bookIndex: 19, chapter: 1, name: 'Salmo 1' },
  { bookId: 'sal', bookIndex: 19, chapter: 23, name: 'Salmo 23' },
  { bookId: 'sal', bookIndex: 19, chapter: 91, name: 'Salmo 91' },
  { bookId: 'sal', bookIndex: 19, chapter: 119, name: 'Salmo 119' },
  { bookId: 'pro', bookIndex: 20, chapter: 3, name: 'Proverbios 3' },
  { bookId: 'isa', bookIndex: 23, chapter: 53, name: 'Isaías 53' },
  { bookId: 'mat', bookIndex: 40, chapter: 5, name: 'Mateo 5' },
  { bookId: 'mat', bookIndex: 40, chapter: 6, name: 'Mateo 6' },
  { bookId: 'mat', bookIndex: 40, chapter: 28, name: 'Mateo 28' },
  { bookId: 'jua', bookIndex: 43, chapter: 1, name: 'Juan 1' },
  { bookId: 'jua', bookIndex: 43, chapter: 3, name: 'Juan 3' },
  { bookId: 'jua', bookIndex: 43, chapter: 14, name: 'Juan 14' },
  { bookId: 'hec', bookIndex: 44, chapter: 2, name: 'Hechos 2' },
  { bookId: 'rom', bookIndex: 45, chapter: 3, name: 'Romanos 3' },
  { bookId: 'rom', bookIndex: 45, chapter: 8, name: 'Romanos 8' },
  { bookId: '1co', bookIndex: 46, chapter: 13, name: '1 Corintios 13' },
  { bookId: 'efe', bookIndex: 49, chapter: 2, name: 'Efesios 2' },
  { bookId: 'fil', bookIndex: 50, chapter: 2, name: 'Filipenses 2' },
  { bookId: 'col', bookIndex: 51, chapter: 1, name: 'Colosenses 1' },
  { bookId: '2ti', bookIndex: 55, chapter: 3, name: '2 Timoteo 3' },
  { bookId: 'heb', bookIndex: 58, chapter: 11, name: 'Hebreos 11' },
  { bookId: 'san', bookIndex: 59, chapter: 1, name: 'Santiago 1' },
  { bookId: 'apo', bookIndex: 66, chapter: 21, name: 'Apocalipsis 21' },
];

/**
 * Downloads and caches all key chapters for offline reading
 */
export async function downloadKeyChaptersForOffline(
  onProgress?: (current: number, total: number, currentName: string) => void
): Promise<number> {
  let count = 0;
  const total = KEY_OFFLINE_CHAPTER_TARGETS.length;

  for (let i = 0; i < total; i++) {
    const item = KEY_OFFLINE_CHAPTER_TARGETS[i];
    if (onProgress) onProgress(i + 1, total, item.name);

    try {
      const response = await fetch(`https://bolls.life/get-chapter/RV1960/${item.bookIndex}/${item.chapter}/`);
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          const verses = data.map(v => ({
            num: v.verse,
            rvr1960: v.text.replace(/<[^>]*>?/gm, ''),
            lbla: v.text.replace(/<[^>]*>?/gm, ''),
            ntv: v.text.replace(/<[^>]*>?/gm, ''),
            nvi: v.text.replace(/<[^>]*>?/gm, '')
          }));
          saveChapterOffline(item.bookId, item.chapter, verses);
          count++;
        }
      }
    } catch (err) {
      console.warn(`Could not fetch ${item.name} offline:`, err);
    }
  }

  return count;
}

/**
 * Full Bible downloader for all 1,189 chapters
 */
export async function downloadFullBibleOffline(
  onProgress: (progress: DownloadProgress) => void
): Promise<{ success: boolean; downloaded: number }> {
  return downloadFullBibleToIndexedDB(onProgress);
}
