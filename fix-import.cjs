const fs = require('fs');
let code = fs.readFileSync('src/data/academicBibleStudies.ts', 'utf-8');
code = code.replace(/export interface InterlinearWord {[\s\S]*?}/, `export interface InterlinearWord {
  original: string;
  transliteration: string;
  strong: string;
  morphology?: string;
  morphologyExpanded?: string;
  literal?: string;
  explanation?: string;
  english?: string;
  spanish?: string;
}`);
fs.writeFileSync('src/data/academicBibleStudies.ts', code);
