import { getBibleChapter } from "./src/data/bibleTextRepository";
const chapter = getBibleChapter('gen', 1);
console.log("Verse count:", chapter.verses.length);
console.log("First verse:", chapter.verses[0].rvr1960.slice(0, 30));
console.log("Last verse:", chapter.verses[chapter.verses.length - 1].num, chapter.verses[chapter.verses.length - 1].rvr1960.slice(0, 30));
