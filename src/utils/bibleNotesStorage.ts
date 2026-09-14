import { safeStorage } from './safeStorage';

export type HighlightColor = 'yellow' | 'green' | 'blue' | 'pink' | 'purple' | 'orange';

export interface BibleHighlightNote {
  id: string;
  bookId: string;
  bookName: string;
  chapter: number;
  verse: number;
  selectedText?: string; // Fragment highlighted or full verse if empty
  color: HighlightColor;
  noteText?: string; // User personal note
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = 'seminario_bible_highlights_notes_v1';
const LISTENERS: Set<() => void> = new Set();

export function subscribeToBibleNotes(callback: () => void): () => void {
  LISTENERS.add(callback);
  return () => {
    LISTENERS.delete(callback);
  };
}

function notifyListeners() {
  LISTENERS.forEach(cb => cb());
}

export function getAllBibleNotes(): BibleHighlightNote[] {
  try {
    const raw = safeStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Error reading bible notes:', err);
    return [];
  }
}

export function getNotesForChapter(bookId: string, chapter: number): BibleHighlightNote[] {
  const all = getAllBibleNotes();
  const bId = bookId.toLowerCase();
  return all.filter(n => n.bookId.toLowerCase() === bId && n.chapter === chapter);
}

export function saveBibleNote(
  data: {
    id?: string;
    bookId: string;
    bookName: string;
    chapter: number;
    verse: number;
    selectedText?: string;
    color: HighlightColor;
    noteText?: string;
  }
): BibleHighlightNote {
  const all = getAllBibleNotes();
  const now = new Date().toISOString();
  
  let existingIndex = -1;
  if (data.id) {
    existingIndex = all.findIndex(n => n.id === data.id);
  } else {
    // Check if there is already a note for this verse/selected text
    existingIndex = all.findIndex(
      n => n.bookId.toLowerCase() === data.bookId.toLowerCase() &&
           n.chapter === data.chapter &&
           n.verse === data.verse &&
           (n.selectedText || '') === (data.selectedText || '')
    );
  }

  let note: BibleHighlightNote;

  if (existingIndex >= 0) {
    note = {
      ...all[existingIndex],
      color: data.color,
      noteText: data.noteText !== undefined ? data.noteText : all[existingIndex].noteText,
      selectedText: data.selectedText !== undefined ? data.selectedText : all[existingIndex].selectedText,
      updatedAt: now
    };
    all[existingIndex] = note;
  } else {
    note = {
      id: data.id || `note_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      bookId: data.bookId,
      bookName: data.bookName,
      chapter: data.chapter,
      verse: data.verse,
      selectedText: data.selectedText || undefined,
      color: data.color,
      noteText: data.noteText || '',
      createdAt: now,
      updatedAt: now
    };
    all.push(note);
  }

  try {
    safeStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    notifyListeners();
  } catch (err) {
    console.error('Error saving bible note:', err);
  }

  return note;
}

export function deleteBibleNote(id: string): void {
  const all = getAllBibleNotes();
  const filtered = all.filter(n => n.id !== id);
  try {
    safeStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    notifyListeners();
  } catch (err) {
    console.error('Error deleting bible note:', err);
  }
}

export function getColorClasses(color: HighlightColor): {
  bg: string;
  badge: string;
  border: string;
  dot: string;
} {
  switch (color) {
    case 'yellow':
      return {
        bg: 'bg-amber-100 dark:bg-amber-950/60 text-amber-950 dark:text-amber-100 border-l-4 border-amber-400',
        badge: 'bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-100 border-amber-300',
        border: 'border-amber-400',
        dot: 'bg-amber-400 ring-amber-300'
      };
    case 'green':
      return {
        bg: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-950 dark:text-emerald-100 border-l-4 border-emerald-400',
        badge: 'bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100 border-emerald-300',
        border: 'border-emerald-400',
        dot: 'bg-emerald-500 ring-emerald-300'
      };
    case 'blue':
      return {
        bg: 'bg-sky-100 dark:bg-sky-950/60 text-sky-950 dark:text-sky-100 border-l-4 border-sky-400',
        badge: 'bg-sky-200 dark:bg-sky-900 text-sky-900 dark:text-sky-100 border-sky-300',
        border: 'border-sky-400',
        dot: 'bg-sky-400 ring-sky-300'
      };
    case 'pink':
      return {
        bg: 'bg-rose-100 dark:bg-rose-950/60 text-rose-950 dark:text-rose-100 border-l-4 border-rose-400',
        badge: 'bg-rose-200 dark:bg-rose-900 text-rose-900 dark:text-rose-100 border-rose-300',
        border: 'border-rose-400',
        dot: 'bg-rose-400 ring-rose-300'
      };
    case 'purple':
      return {
        bg: 'bg-purple-100 dark:bg-purple-950/60 text-purple-950 dark:text-purple-100 border-l-4 border-purple-400',
        badge: 'bg-purple-200 dark:bg-purple-900 text-purple-900 dark:text-purple-100 border-purple-300',
        border: 'border-purple-400',
        dot: 'bg-purple-400 ring-purple-300'
      };
    case 'orange':
    default:
      return {
        bg: 'bg-orange-100 dark:bg-orange-950/60 text-orange-950 dark:text-orange-100 border-l-4 border-orange-400',
        badge: 'bg-orange-200 dark:bg-orange-900 text-orange-900 dark:text-orange-100 border-orange-300',
        border: 'border-orange-400',
        dot: 'bg-orange-400 ring-orange-300'
      };
  }
}
