import { useState, useEffect, useCallback } from 'react';
import { db, auth } from '../firebase';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { 
  BibleHighlightNote, 
  getAllBibleNotes, 
  getNotesForChapter, 
  saveBibleNote, 
  deleteBibleNote, 
  subscribeToBibleNotes,
  setAllBibleNotesFromFirestore,
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

  // Firebase Realtime Sync across devices
  useEffect(() => {
    const user = auth?.currentUser;
    if (!user || user.uid === 'invitado_seminario' || !db) return;

    const docRef = doc(db, 'users', user.uid, 'biblenotes', 'default');
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data && Array.isArray(data.notes)) {
          setAllBibleNotesFromFirestore(data.notes);
        }
      } else {
        const local = getAllBibleNotes();
        if (local.length > 0) {
          setDoc(docRef, { notes: local, updatedAt: new Date().toISOString() }, { merge: true }).catch(console.error);
        }
      }
    }, (err) => {
      console.error("Firebase bible notes sync error:", err);
    });

    return () => unsubscribe();
  }, [auth?.currentUser?.uid]);

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
