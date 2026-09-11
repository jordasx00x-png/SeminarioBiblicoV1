const fs = require('fs');
let code = fs.readFileSync('src/components/AcademicPanel.tsx', 'utf-8');

const importReplacement = `import React, { useState, useMemo, useEffect } from 'react';`;
code = code.replace(/import React, { useState, useMemo } from 'react';/, importReplacement);

const newLogic = `
  const [realVerses, setRealVerses] = useState<any[]>([]);
  const [isLoadingVerses, setIsLoadingVerses] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchVerses = async () => {
      setIsLoadingVerses(true);
      try {
        const bookIndex = BIBLE_BOOKS_CANON.findIndex(b => b.id === selectedBookId) + 1;
        // Map translation to bolls.life translation ID
        const translationId = activeTranslation === 'rvr1960' ? 'RV1960' : 'RV1960'; // We use RV1960 for now as it's reliable
        const response = await fetch(\`https://bolls.life/get-chapter/\${translationId}/\${bookIndex}/\${selectedChapter}/\`);
        const data = await response.json();
        
        if (isMounted && data && Array.isArray(data)) {
          setRealVerses(data.map(v => ({
            num: v.verse,
            rvr1960: v.text,
            lbla: v.text,
            ntv: v.text,
            nvi: v.text
          })));
        }
      } catch (err) {
        console.error('Error fetching verses:', err);
      } finally {
        if (isMounted) setIsLoadingVerses(false);
      }
    };
    
    fetchVerses();
    return () => { isMounted = false; };
  }, [selectedBookId, selectedChapter, activeTranslation]);

  const currentBook = useMemo(() => {
`;

code = code.replace(/  const currentBook = useMemo\(\(\) => \{/, newLogic);

const oldMap = `            {currentChapterContent.verses.map(verse => (`;
const newMap = `            {isLoadingVerses ? (
              <div className="flex flex-col gap-4 py-8">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="flex gap-4 animate-pulse">
                    <div className="w-4 h-4 bg-stone-200 dark:bg-zinc-800 rounded"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-stone-200 dark:bg-zinc-800 rounded w-full"></div>
                      <div className="h-4 bg-stone-200 dark:bg-zinc-800 rounded w-5/6"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (realVerses.length > 0 ? realVerses : currentChapterContent.verses).map(verse => (`;

code = code.replace(oldMap, newMap);

fs.writeFileSync('src/components/AcademicPanel.tsx', code);
