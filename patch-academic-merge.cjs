const fs = require('fs');
let code = fs.readFileSync('src/components/AcademicPanel.tsx', 'utf-8');

const newMap = `            ) : (realVerses.length > 0 ? realVerses.map(rv => {
                const curatedVerse = currentChapterContent.verses.find(v => v.num === rv.num);
                return { ...curatedVerse, ...rv, theologicalNote: curatedVerse?.theologicalNote, originalText: curatedVerse?.originalText, isKeyPassage: curatedVerse?.isKeyPassage };
              }) : currentChapterContent.verses).map(verse => (`;

code = code.replace(/            \) : \(realVerses.length > 0 \? realVerses : currentChapterContent.verses\)\.map\(verse => \(/, newMap);

fs.writeFileSync('src/components/AcademicPanel.tsx', code);
