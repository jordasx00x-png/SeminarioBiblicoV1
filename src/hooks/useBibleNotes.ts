import { useState, useEffect, useCallback } from 'react';
import { 
  BibleHighlightNote, 
  getAllBibleNotes, 
  getNotesForChapter, 
  saveBibleNote, 
  deleteBibleNote, 
  subscribeToBibleNotes,
  HighlightColor
} from '../utils/bibleNotesStorage';

export function useBibleNotes(bookId?: string, chapter?: number) {
  const [allNotes, setAllNotes] = useState<BibleHighlightNote[]>(getAllBibleNotes());
  const [chapterNotes, setChapterNotes] = useState<BibleHighlightNote[]>([]);

  const refreshNotes = useCallback(() => {
    const notes = getAllBibleNotes();
    setAllNotes(notes);
    if (bookId && chapter) {
      setChapterNotes(getNotesForChapter(bookId, chapter));
    }
  }, [bookId, chapter]);

  useEffect(() => {
    refreshNotes();
    const unsubscribe = subscribeToBibleNotes(refreshNotes);
    return unsubscribe;
  }, [refreshNotes]);

  const addOrUpdateHighlight = useCallback((
    bookIdParam: string,
    bookNameParam: string,
    chapterParam: number,
    verseParam: number,
    color: HighlightColor,
    selectedText?: string,
    noteText?: string,
    id?: string
  ) => {
    return saveBibleNote({
      id,
      bookId: bookIdParam,
      bookName: bookNameParam,
      chapter: chapterParam,
      verse: verseParam,
      color,
      selectedText,
      noteText
    });
  }, []);

  const removeNote = useCallback((id: string) => {
    deleteBibleNote(id);
  }, []);

  return {
    allNotes,
    chapterNotes,
    addOrUpdateHighlight,
    removeNote,
    refreshNotes
  };
}
