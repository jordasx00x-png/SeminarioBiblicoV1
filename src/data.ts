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

// Pad all courses with expected lessons and ensure every lesson has rich, high-fidelity content
mockDatabase.courses.forEach(course => {
  const expectedLessons = course.durationMonths ? course.durationMonths * 30 : 90;
  
  // 1. Upgrade/Enrich existing sparse lessons (e.g., manual stubs with minimal text)
  course.lessons = course.lessons.map(lesson => {
    const firstBlock = lesson.blocks && lesson.blocks[0];
    const isFirstBlockShort = firstBlock && 'content' in firstBlock && typeof firstBlock.content === 'string' && firstBlock.content.length < 200;
    const isSparse = !lesson.baseVerse || 
                     !lesson.finalExam || 
                     lesson.finalExam.length === 0 || 
                     lesson.blocks.length <= 1 || 
                     isFirstBlockShort;
    if (isSparse) {
      return generateLessonForDay(course.id, lesson.day, lesson.title, course.type);
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
