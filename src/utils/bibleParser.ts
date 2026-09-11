import { BIBLE_BOOKS_CANON, findBibleBook, BibleBookMeta } from '../data/completeBibleData';

export interface ParsedReference {
  book: BibleBookMeta;
  chapter: number;
  verse: number;
  rawReference: string;
}

export function parseBibleReference(referenceStr: string): ParsedReference | null {
  if (!referenceStr) return null;
  const cleanStr = referenceStr.trim();

  // Match e.g. "1 Corintios 13:4", "Gálatas 2:16", "Juan 3:16", "Génesis 1:1", "Salmo 23:1"
  const regex = /^((?:[1-3]\s+)?[A-Za-záéíóúÁÉÍÓÚñÑ\s]+?)\s+(\d+)(?::(\d+)(?:-\d+)?)?$/;
  const match = cleanStr.match(regex);

  if (!match) {
    // Try matching just book and chapter e.g. "Gálatas 2"
    const bookOnlyRegex = /^((?:[1-3]\s+)?[A-Za-záéíóúÁÉÍÓÚñÑ\s]+?)\s+(\d+)$/;
    const bookOnlyMatch = cleanStr.match(bookOnlyRegex);
    if (bookOnlyMatch) {
      const bookObj = findBibleBook(bookOnlyMatch[1].trim());
      if (bookObj) {
        return {
          book: bookObj,
          chapter: Math.min(parseInt(bookOnlyMatch[2], 10), bookObj.chaptersCount),
          verse: 1,
          rawReference: cleanStr
        };
      }
    }
    return null;
  }

  const bookNameRaw = match[1].trim();
  const chapterNum = parseInt(match[2], 10);
  const verseNum = match[3] ? parseInt(match[3], 10) : 1;

  const bookObj = findBibleBook(bookNameRaw);
  if (!bookObj) return null;

  return {
    book: bookObj,
    chapter: Math.min(Math.max(1, chapterNum), bookObj.chaptersCount),
    verse: Math.max(1, verseNum),
    rawReference: cleanStr
  };
}
