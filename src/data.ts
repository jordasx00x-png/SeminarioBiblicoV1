import { Database } from './types';
import { exegesisCourse } from './data/courses/exegesis';
import { apologeticaCourse } from './data/courses/apologetica';
import { doctrinasCourse } from './data/courses/doctrinas';
import { pentateucoCourse } from './data/courses/pentateuco';
import { historicosCourse, poeticosCourse } from './data/courses/historicos_poeticos';
import { profetasCourse, evangeliosCourse } from './data/courses/profetas_nuevo_testamento';
import { fundamentosCourse } from './data/courses/fundamentos';
import { pabloCourse } from './data/courses/pablo';
import { licenciaturaCourses } from './data/courses/licenciatura';
import { licenciaturasExtra } from './data/courses/licenciaturas_extra';
import { getLessonTitleForDay } from './data/syllabusTitles';
import { generateLessonForDay } from './data/lessonGenerator';

import { maestriaCourses } from './data/courses/maestria';
import { doctoradoCourses } from './data/courses/doctorado';

export const mockDatabase: Database = {
  courses: [
    exegesisCourse,
    apologeticaCourse,
    doctrinasCourse,
    pentateucoCourse,
    historicosCourse,
    poeticosCourse,
    profetasCourse,
    evangeliosCourse,
    pabloCourse,
    {
      ...fundamentosCourse,
      id: 'bases-fundamentales'
    },
    ...licenciaturaCourses,
    ...licenciaturasExtra,
    ...maestriaCourses,
    ...doctoradoCourses
  ]
};

const BIBLE_STUDY_LESSON_COUNTS: Record<string, number> = {
  pentateuco: 1951,
  historicos: 2340,
  poeticos: 1595,
  profetas: 1830,
  evangelios: 1596,
  pablo: 1192,
  'cartas-pascuales-pablo': 1192
};

// Pad all courses with expected lessons and ensure every lesson has rich, high-fidelity content
mockDatabase.courses.forEach(course => {
  const expectedLessons = course.type === 'BIBLE_STUDY' 
    ? (BIBLE_STUDY_LESSON_COUNTS[course.id] || 90)
    : (course.durationMonths ? course.durationMonths * 30 : 90);
  
  // 1. Upgrade/Enrich existing sparse lessons (e.g., manual stubs with minimal text)
  course.lessons = course.lessons.map(lesson => {
    const isAcademicOrBibleStudy = course.type === 'SPECIALIZED' || 
                                   course.type === 'BIBLE_STUDY' ||
                                   course.type === 'LICENCIATURA' ||
                                   course.type === 'MAESTRIA' ||
                                   course.type === 'DOCTORADO';
    const firstBlock = lesson.blocks && lesson.blocks[0];
    const isFirstBlockShort = firstBlock && 'content' in firstBlock && typeof firstBlock.content === 'string' && firstBlock.content.length < 250;
    const totalTextLength = lesson.blocks.reduce((acc, b) => acc + ('content' in b && typeof b.content === 'string' ? b.content.length : 0), 0);
    const isSparse = !lesson.baseVerse || 
                     !lesson.finalExam || 
                     lesson.finalExam.length === 0 || 
                     lesson.blocks.length <= 2 || 
                     isFirstBlockShort ||
                     (isAcademicOrBibleStudy && totalTextLength < 2200);

    // Force regeneration for Bible Study if it doesn't match the new 3-verse range format
    const isOldBibleFormat = course.type === 'BIBLE_STUDY' && 
                             (lesson.title.includes('Versículo por Versículo') || 
                              !lesson.baseVerse?.reference.includes('-'));

    if (isSparse || isOldBibleFormat) {
      const updatedTitle = getLessonTitleForDay(course.id, lesson.day);
      return generateLessonForDay(course.id, lesson.day, updatedTitle, course.type);
    }
    return lesson;
  });

  // 2. Pad missing days up to expectedLessons
  const existingDays = new Set(course.lessons.map(l => l.day));
  for (let i = 1; i <= expectedLessons; i++) {
    if (!existingDays.has(i)) {
      const title = getLessonTitleForDay(course.id, i);
      const generatedLesson = generateLessonForDay(course.id, i, title, course.type);
      course.lessons.push(generatedLesson);
    }
  }
  course.lessons.sort((a, b) => a.day - b.day);
});
