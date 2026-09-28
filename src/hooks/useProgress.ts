import { useState, useEffect } from 'react';
import { UserProgress } from '../types';
import { db, auth } from '../firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { safeStorage } from '../utils/safeStorage';

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = safeStorage.getItem('seminario_progress');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          completedLessons: parsed.completedLessons || {},
          completedBlockExams: parsed.completedBlockExams || {}
        };
      }
    } catch(e) {
      console.warn("Could not load progress", e);
    }
    return { completedLessons: {}, completedBlockExams: {} };
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = auth?.currentUser;
    if (!user || !db) {
       setIsLoading(false);
       return;
    }

    const docRef = doc(db, 'users', user.uid, 'progress', 'default');
    
    setIsLoading(true);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as UserProgress;
        const newProgress = {
          completedLessons: data.completedLessons || {},
          completedBlockExams: data.completedBlockExams || {}
        };
        setProgress(newProgress);
        safeStorage.setItem('seminario_progress', JSON.stringify(newProgress));
      } else {
        // Init if missing with a static empty progress object to avoid capturing potentially stale state in a loop
        const initialProgress: UserProgress = { completedLessons: {}, completedBlockExams: {} };
        setDoc(docRef, initialProgress, { merge: true }).catch(console.error);
      }
      setIsLoading(false);
    }, (error) => {
       console.error("Firebase progress sync error", error);
       setIsLoading(false);
    });

    return () => unsubscribe();
  }, [auth?.currentUser?.uid]); // depend on user

  const updateFirestore = async (newProgress: UserProgress) => {
    const user = auth?.currentUser;
    if (user && db) {
      const docRef = doc(db, 'users', user.uid, 'progress', 'default');
      try {
        await setDoc(docRef, newProgress, { merge: true });
      } catch (e) {
        console.error("Failed to update firestore progress", e);
      }
    }
  };

  const markCompleted = (lessonId: string, score: number) => {
    setProgress((prev) => {
      const newProgress = {
        ...prev,
        completedLessons: {
          ...prev.completedLessons,
          [lessonId]: { score, completedAt: new Date().toISOString() }
        }
      };
      
      safeStorage.setItem('seminario_progress', JSON.stringify(newProgress));
      updateFirestore(newProgress);
      return newProgress;
    });
  };

  const markBlockExamCompleted = (milestoneKey: string, score: number) => {
    setProgress((prev) => {
      const newProgress = {
        ...prev,
        completedBlockExams: {
          ...(prev.completedBlockExams || {}),
          [milestoneKey]: { score, completedAt: new Date().toISOString() }
        }
      };
      
      safeStorage.setItem('seminario_progress', JSON.stringify(newProgress));
      updateFirestore(newProgress);
      return newProgress;
    });
  };

  const resetFirstLesson = (firstLessonId: string) => {
    setProgress((prev) => {
      const newCompleted = { ...prev.completedLessons };
      delete newCompleted[firstLessonId];
      const newProgress = {
        ...prev,
        completedLessons: newCompleted
      };
      
      safeStorage.setItem('seminario_progress', JSON.stringify(newProgress));
      updateFirestore(newProgress);
      return newProgress;
    });
  };

  const resetAllProgress = () => {
    const emptyProgress: UserProgress = { completedLessons: {}, completedBlockExams: {} };
    setProgress(emptyProgress);
    safeStorage.setItem('seminario_progress', JSON.stringify(emptyProgress));
    updateFirestore(emptyProgress);
    return emptyProgress;
  };

  return { progress, markCompleted, markBlockExamCompleted, resetFirstLesson, resetAllProgress, isLoading };
}
