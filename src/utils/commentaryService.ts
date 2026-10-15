// Service to fetch real verse commentaries
const COMMENTARY_BASE_URL = 'https://commentaries.getbible.net/v1';

// Mapping app's book IDs to GetBible numeric IDs
const bookIdMap: Record<string, number> = {
  'gen': 1, 'exo': 2, 'lev': 3, 'num': 4, 'deu': 5,
  'jos': 6, 'jdg': 7, 'rut': 8, '1sa': 9, '2sa': 10,
  '1ki': 11, '2ki': 12, '1ch': 13, '2ch': 14, 'ezr': 15, 'neh': 16, 'est': 17,
  'job': 18, 'psa': 19, 'pro': 20, 'ecc': 21, 'sos': 22,
  'isa': 23, 'jer': 24, 'lam': 25, 'eze': 26, 'dan': 27,
  'hos': 28, 'joe': 29, 'amo': 30, 'oba': 31, 'jon': 32, 'mic': 33, 'nah': 34, 'hab': 35, 'zep': 36, 'hag': 37, 'zec': 38, 'mal': 39,
  'mat': 40, 'mar': 41, 'luk': 42, 'joh': 43, 'act': 44,
  'rom': 45, '1co': 46, '2co': 47, 'gal': 48, 'eph': 49, 'phi': 50, 'col': 51,
  '1th': 52, '2th': 53, '1ti': 54, '2ti': 55, 'tit': 56, 'phm': 57,
  'heb': 58, 'jam': 59, '1pe': 60, '2pe': 61, '1jo': 62, '2jo': 63, '3jo': 64, 'jud': 65,
  'rev': 66
};

export async function fetchRealCommentary(bookId: string, chapter: number, verse: number) {
  const numericBookId = bookIdMap[bookId.toLowerCase()];
  if (!numericBookId) return null;

  try {
    // Attempting to fetch Matthew Henry's Concise Commentary (mhcc)
    const url = `${COMMENTARY_BASE_URL}/mhcc/${numericBookId}/${chapter}.json`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch');
    
    const data = await response.json();
    const entry = data.entries.find((e: any) => e.verse === verse || (e.verses && e.verses.includes(verse)));
    
    if (entry && entry.text) {
      const transRes = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: entry.text })
      });
      if (transRes.ok) {
        const transData = await transRes.json();
        return transData.translatedText;
      }
      return entry.text;
    }
    return null;
  } catch (error) {
    console.error('Error fetching commentary:', error);
    return null;
  }
}
