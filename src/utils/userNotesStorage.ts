import { safeStorage } from './safeStorage';
import { db } from '../firebase';
import { collection, doc, setDoc, deleteDoc, getDocs, query, where, orderBy } from 'firebase/firestore';

export interface UserNote {
  id: string;
  userId: string;
  userEmail?: string;
  userName?: string;
  title: string;
  content: string;
  tags?: string[];
  courseId?: string;
  lessonId?: string;
  lessonTitle?: string;
  courseTitle?: string;
  createdAt: number;
  updatedAt: number;
}

const LISTENERS = new Set<() => void>();

export function subscribeToUserNotes(
  arg1: string | (() => void),
  arg2?: () => void
): () => void {
  const cb = typeof arg1 === 'function' ? arg1 : arg2;
  if (typeof cb === 'function') {
    LISTENERS.add(cb);
    return () => {
      LISTENERS.delete(cb);
    };
  }
  return () => {};
}

function notifyListeners() {
  LISTENERS.forEach(cb => {
    if (typeof cb === 'function') {
      try {
        cb();
      } catch (err) {
        console.error('Error executing user notes listener:', err);
      }
    }
  });
}

export function getAccountKey(userId: string | undefined | null): string {
  const safeId = userId || 'invitado_seminario';
  return `seminario_account_notes_v2_${safeId.replace(/[^a-zA-Z0-9_-]/g, '_')}`;
}

export function getUserNotes(userId: string | undefined | null): UserNote[] {
  const accountKey = getAccountKey(userId);
  try {
    const raw = safeStorage.getItem(accountKey);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error reading user notes from safeStorage:', err);
  }

  // Fallback: Check old un-scoped digital notebook key if this is guest/invitado
  if (!userId || userId === 'invitado_seminario') {
    try {
      const oldRaw = safeStorage.getItem('digital_notebook_notes');
      if (oldRaw) {
        const oldParsed = JSON.parse(oldRaw);
        if (Array.isArray(oldParsed) && oldParsed.length > 0) {
          const migrated: UserNote[] = oldParsed.map((item: any) => ({
            id: item.id || String(Date.now()),
            userId: 'invitado_seminario',
            title: item.title || 'Nota sin título',
            content: item.content || '',
            createdAt: item.updatedAt || Date.now(),
            updatedAt: item.updatedAt || Date.now()
          }));
          saveUserNotesBatch('invitado_seminario', migrated);
          return migrated;
        }
      }
    } catch (e) {
      // Ignore migration errors
    }
  }

  return [];
}

export function saveUserNote(
  userId: string | undefined | null,
  noteData: {
    id?: string;
    title: string;
    content: string;
    userEmail?: string;
    userName?: string;
    tags?: string[];
    courseId?: string;
    lessonId?: string;
    lessonTitle?: string;
    courseTitle?: string;
  }
): UserNote {
  const activeUserId = userId || 'invitado_seminario';
  const notes = getUserNotes(activeUserId);
  const now = Date.now();

  let noteId = noteData.id;
  if (!noteId) {
    noteId = `note_${now}_${Math.random().toString(36).substring(2, 7)}`;
  }

  const existingIdx = notes.findIndex(n => n.id === noteId);
  const existingNote = existingIdx >= 0 ? notes[existingIdx] : null;

  const newNote: UserNote = {
    id: noteId,
    userId: activeUserId,
    userEmail: noteData.userEmail || existingNote?.userEmail,
    userName: noteData.userName || existingNote?.userName,
    title: noteData.title.trim() || 'Nueva Nota',
    content: noteData.content,
    tags: noteData.tags || existingNote?.tags || [],
    courseId: noteData.courseId !== undefined ? noteData.courseId : existingNote?.courseId,
    lessonId: noteData.lessonId !== undefined ? noteData.lessonId : existingNote?.lessonId,
    lessonTitle: noteData.lessonTitle !== undefined ? noteData.lessonTitle : existingNote?.lessonTitle,
    courseTitle: noteData.courseTitle !== undefined ? noteData.courseTitle : existingNote?.courseTitle,
    createdAt: existingNote ? existingNote.createdAt : now,
    updatedAt: now
  };

  let updatedNotes: UserNote[];
  if (existingIdx >= 0) {
    updatedNotes = [...notes];
    updatedNotes[existingIdx] = newNote;
  } else {
    updatedNotes = [newNote, ...notes];
  }

  saveUserNotesBatch(activeUserId, updatedNotes);

  // Firestore async backup sync
  if (db && activeUserId && activeUserId !== 'invitado_seminario') {
    try {
      const noteDocRef = doc(db, 'users', activeUserId, 'user_notes', newNote.id);
      setDoc(noteDocRef, {
        ...newNote,
        syncedAt: new Date().toISOString()
      }, { merge: true }).catch(err => {
        console.warn('Firestore note backup notice:', err);
      });
    } catch (e) {
      // safe fallback if offline or restricted
    }
  }

  return newNote;
}

export function deleteUserNote(userId: string | undefined | null, noteId: string): void {
  const activeUserId = userId || 'invitado_seminario';
  const notes = getUserNotes(activeUserId);
  const filtered = notes.filter(n => n.id !== noteId);
  saveUserNotesBatch(activeUserId, filtered);

  // Firestore delete sync
  if (db && activeUserId && activeUserId !== 'invitado_seminario') {
    try {
      const noteDocRef = doc(db, 'users', activeUserId, 'user_notes', noteId);
      deleteDoc(noteDocRef).catch(err => {
        console.warn('Firestore note delete notice:', err);
      });
    } catch (e) {}
  }
}

function saveUserNotesBatch(userId: string, notes: UserNote[]) {
  const accountKey = getAccountKey(userId);
  safeStorage.setItem(accountKey, JSON.stringify(notes));
  notifyListeners();
}

/**
 * Sync notes from Firestore for logged-in user
 */
export async function syncNotesFromFirestore(userId: string): Promise<UserNote[]> {
  if (!db || !userId || userId === 'invitado_seminario') {
    return getUserNotes(userId);
  }

  try {
    const notesRef = collection(db, 'users', userId, 'user_notes');
    const snapshot = await getDocs(notesRef);
    if (!snapshot.empty) {
      const remoteNotes: UserNote[] = [];
      snapshot.forEach(docSnap => {
        const data = docSnap.data();
        if (data && data.id && data.content !== undefined) {
          remoteNotes.push({
            id: data.id,
            userId: data.userId || userId,
            title: data.title || 'Nota',
            content: data.content || '',
            tags: data.tags || [],
            courseId: data.courseId,
            lessonId: data.lessonId,
            lessonTitle: data.lessonTitle,
            courseTitle: data.courseTitle,
            createdAt: data.createdAt || Date.now(),
            updatedAt: data.updatedAt || Date.now()
          });
        }
      });

      if (remoteNotes.length > 0) {
        // Merge with local notes taking latest updatedAt
        const local = getUserNotes(userId);
        const map = new Map<string, UserNote>();
        local.forEach(n => map.set(n.id, n));
        remoteNotes.forEach(rn => {
          const loc = map.get(rn.id);
          if (!loc || rn.updatedAt > loc.updatedAt) {
            map.set(rn.id, rn);
          }
        });
        const merged = Array.from(map.values()).sort((a, b) => b.updatedAt - a.updatedAt);
        saveUserNotesBatch(userId, merged);
        return merged;
      }
    }
  } catch (err) {
    console.warn('Could not sync notes from Firestore:', err);
  }

  return getUserNotes(userId);
}
