export type ControlQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation?: string;
};

export type ExamQuestion = ControlQuestion & {
  explanation: string;
};

export type ContentBlock = 
  | { type: 'text'; id: string; content: string }
  | { type: 'control'; id: string; question: ControlQuestion }
  | { type: 'note'; id: string; content: string };

export type OriginalTerm = {
  term: string;
  transliteration: string;
  language: 'Hebreo' | 'Griego' | 'Arameo';
  strong?: string;
  meaning: string;
  context: string;
};

export type HermeneuticalExercise = {
  title: string;
  observation: string;
  historicalContext: string;
  christocentricFocus: string;
  practicalApplication: string;
};

export type VerseWithMetadata = {
  reference: string;
  text: string;
  readingTimeMinutes?: number;
  relevance?: string;
};

export type BibleReadingPlan = {
  totalReadingTimeMinutes: number; // Max 20 min rule!
  recommendedPassage: string;
  mainVerse: VerseWithMetadata;
  complementaryVerses: VerseWithMetadata[];
};

export type TheologicalExegesis = {
  title?: string;
  mainTheme?: string;
  historicalGrammaticalContext: string;
  theologicalAnalysis: string;
  christocentricFocus: string;
  doctrinalApplication: string;
};

export type Lesson = {
  id: string;
  day: number;
  title: string;
  blocks: ContentBlock[];
  finalExam: ExamQuestion[];
  baseVerse?: VerseWithMetadata;
  bibleReadingTimeMinutes?: number;
  bibleReadingPlan?: BibleReadingPlan;
  theologicalExegesis?: TheologicalExegesis;
  commentaries?: { author: string; text: string }[];
  verses?: VerseWithMetadata[];
  assignments?: { id: string; description: string }[];
  objectives?: string[];
  estimatedMinutes?: number;
  originalTerms?: OriginalTerm[];
  hermeneuticalExercise?: HermeneuticalExercise;
};

export type Course = {
  id: string;
  title: string;
  type: 'BIBLE_STUDY' | 'SPECIALIZED' | 'LICENCIATURA' | 'MAESTRIA' | 'DOCTORADO';
  description: string;
  lessons: Lesson[];
  durationMonths?: number;
};

export type UserProgress = {
  completedLessons: Record<string, { score: number; completedAt: string }>;
  completedBlockExams?: Record<string, { score: number; completedAt: string }>;
};

export type AssistantMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
};

export type Database = {
  courses: Course[];
};
