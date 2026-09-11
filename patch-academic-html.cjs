const fs = require('fs');
let code = fs.readFileSync('src/components/AcademicPanel.tsx', 'utf-8');

code = code.replace(/v\.text/g, "v.text.replace(/<[^>]*>?/gm, '')");

fs.writeFileSync('src/components/AcademicPanel.tsx', code);
