
export interface VerseRange {
  bookName: string;
  chapter: number;
  verseStart: number;
  verseEnd: number;
  reference: string;
}

export const COURSE_BIBLE_META: Record<string, { name: string; totalVerses: number }[]> = {
  pentateuco: [
    { name: 'Génesis', totalVerses: 1533 },
    { name: 'Éxodo', totalVerses: 1213 },
    { name: 'Levítico', totalVerses: 859 },
    { name: 'Números', totalVerses: 1288 },
    { name: 'Deuteronomio', totalVerses: 959 }
  ],
  historicos: [
    { name: 'Josué', totalVerses: 658 },
    { name: 'Jueces', totalVerses: 618 },
    { name: 'Rut', totalVerses: 85 },
    { name: '1 Samuel', totalVerses: 810 },
    { name: '2 Samuel', totalVerses: 695 },
    { name: '1 Reyes', totalVerses: 816 },
    { name: '2 Reyes', totalVerses: 719 },
    { name: '1 Crónicas', totalVerses: 942 },
    { name: '2 Crónicas', totalVerses: 822 },
    { name: 'Esdras', totalVerses: 280 },
    { name: 'Nehemías', totalVerses: 406 },
    { name: 'Ester', totalVerses: 167 }
  ],
  poeticos: [
    { name: 'Job', totalVerses: 1070 },
    { name: 'Salmos', totalVerses: 2461 },
    { name: 'Proverbios', totalVerses: 915 },
    { name: 'Eclesiastés', totalVerses: 222 },
    { name: 'Cantares', totalVerses: 117 }
  ],
  profetas: [
    { name: 'Isaías', totalVerses: 1292 },
    { name: 'Jeremías', totalVerses: 1364 },
    { name: 'Lamentaciones', totalVerses: 154 },
    { name: 'Ezequiel', totalVerses: 1273 },
    { name: 'Daniel', totalVerses: 357 },
    { name: 'Oseas', totalVerses: 197 },
    { name: 'Joel', totalVerses: 73 },
    { name: 'Amós', totalVerses: 146 },
    { name: 'Abdías', totalVerses: 21 },
    { name: 'Jonás', totalVerses: 48 },
    { name: 'Miqueas', totalVerses: 105 },
    { name: 'Nahúm', totalVerses: 47 },
    { name: 'Habacuc', totalVerses: 56 },
    { name: 'Sofonías', totalVerses: 53 },
    { name: 'Hageo', totalVerses: 38 },
    { name: 'Zacarías', totalVerses: 211 },
    { name: 'Malaquías', totalVerses: 55 }
  ],
  evangelios: [
    { name: 'Mateo', totalVerses: 1071 },
    { name: 'Marcos', totalVerses: 678 },
    { name: 'Lucas', totalVerses: 1151 },
    { name: 'Juan', totalVerses: 879 },
    { name: 'Hechos de los Apóstoles', totalVerses: 1007 }
  ],
  pablo: [
    { name: 'Romanos', totalVerses: 433 },
    { name: '1 Corintios', totalVerses: 437 },
    { name: '2 Corintios', totalVerses: 257 },
    { name: 'Gálatas', totalVerses: 149 },
    { name: 'Efesios', totalVerses: 155 },
    { name: 'Filipenses', totalVerses: 104 },
    { name: 'Colosenses', totalVerses: 95 },
    { name: '1 Tesalonicenses', totalVerses: 89 },
    { name: '2 Tesalonicenses', totalVerses: 47 },
    { name: '1 Timoteo', totalVerses: 113 },
    { name: '2 Timoteo', totalVerses: 83 },
    { name: 'Tito', totalVerses: 46 },
    { name: 'Filemón', totalVerses: 25 },
    { name: 'Hebreos', totalVerses: 303 },
    { name: 'Santiago', totalVerses: 108 },
    { name: '1 Pedro', totalVerses: 105 },
    { name: '2 Pedro', totalVerses: 61 },
    { name: '1 Juan', totalVerses: 105 },
    { name: '2 Juan', totalVerses: 13 },
    { name: '3 Juan', totalVerses: 14 },
    { name: 'Judas', totalVerses: 25 },
    { name: 'Apocalipsis', totalVerses: 404 }
  ]
};

COURSE_BIBLE_META['cartas-pascuales-pablo'] = COURSE_BIBLE_META['pablo'];

export function calculateBibleRange(courseId: string, day: number): VerseRange {
  const booksList = COURSE_BIBLE_META[courseId] || COURSE_BIBLE_META['pentateuco'];
  
  // 3 verses per day
  const versesPerDay = 3;
  const targetVerseIndexStart = (day - 1) * versesPerDay + 1;
  
  let currentAccumulated = 0;
  let selectedBookName = booksList[0].name;
  let verseIndexInSelectedBook = targetVerseIndexStart;

  for (const b of booksList) {
    if (targetVerseIndexStart <= currentAccumulated + b.totalVerses) {
      selectedBookName = b.name;
      verseIndexInSelectedBook = targetVerseIndexStart - currentAccumulated;
      break;
    }
    currentAccumulated += b.totalVerses;
  }

  const avgVersesPerChapter = 28;
  const chapter = Math.floor((verseIndexInSelectedBook - 1) / avgVersesPerChapter) + 1;
  const verseStart = ((verseIndexInSelectedBook - 1) % avgVersesPerChapter) + 1;
  const verseEnd = verseStart + 2;

  const reference = `${selectedBookName} ${chapter}:${verseStart}-${verseEnd}`;

  return {
    bookName: selectedBookName,
    chapter,
    verseStart,
    verseEnd,
    reference
  };
}
