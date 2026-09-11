const fs = require('fs');
let code = fs.readFileSync('src/data/bibleTextRepository.ts', 'utf-8');
code = code.replace(/const vNum = typeof v\.num === 'string' \? \(parseInt\(v\.num\.replace\(\/\\D\/g, ''\)\) \|\| 1\) : v\.num;/g, "const vNum = typeof v.num === 'string' ? (parseInt((v.num as string).replace(/\\D/g, '')) || 1) : (v.num as number);");
fs.writeFileSync('src/data/bibleTextRepository.ts', code);
