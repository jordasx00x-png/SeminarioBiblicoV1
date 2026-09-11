import { GlossaryTooltip } from './GlossaryTooltip';
import { GLOSSARY } from '../data/glossary';
import { ReactNode, createContext, useContext } from 'react';
import { BookOpen } from 'lucide-react';

export const VerseContext = createContext<{ onSelectVerse?: (ref: string) => void }>({});

interface FormattedContentProps {
  content: string;
  className?: string;
  onSelectVerse?: (ref: string) => void;
}

const BIBLE_BOOKS_REGEX = '(?:[1-3]\\s+)?(?:Génesis|Genesis|Éxodo|Exodo|Levítico|Levitico|Números|Numeros|Deuteronomio|Josué|Josue|Jueces|Rut|Samuel|Reyes|Crónicas|Cronicas|Esdras|Nehemías|Nehemias|Ester|Job|Salmos|Salmo|Proverbios|Eclesiastés|Eclesiastes|Cantares|Isaías|Isaias|Jeremías|Jeremias|Lamentaciones|Ezequiel|Daniel|Oseas|Joel|Amós|Amos|Abdías|Abdias|Jonás|Jonas|Miqueas|Nahúm|Nahum|Habacuc|Sofonías|Sofonias|Hageo|Zacarías|Zacarias|Malaquías|Malaquias|Mateo|Marcos|Lucas|Juan|Hechos|Romanos|Corintios|Gálatas|Galatas|Efesios|Filipenses|Colosenses|Tesalonicenses|Timoteo|Tito|Filemón|Filemon|Hebreos|Santiago|Pedro|Judas|Apocalipsis)';

export function TextWithGlossary({ text, onSelectVerse }: { text: string; onSelectVerse?: (ref: string) => void }) {
  const context = useContext(VerseContext);
  const handleVerseClick = onSelectVerse || context.onSelectVerse;

  // Sort terms by length descending to avoid partial matches
  const glossaryTerms = Object.keys(GLOSSARY).sort((a, b) => b.length - a.length);

  // Apply Bible verse detector
  const applyBibleVerses = (parts: (string | ReactNode)[]): (string | ReactNode)[] => {
    let result = [...parts];
    const verseRegex = new RegExp(`\\b(${BIBLE_BOOKS_REGEX}\\s+\\d+(?::\\d+(?:-\\d+)?)?)\\b`, 'gi');

    const newParts: (string | ReactNode)[] = [];
    result.forEach(part => {
      if (typeof part === 'string') {
        const verseSplit = part.split(verseRegex);
        verseSplit.forEach(s => {
          if (verseRegex.test(s)) {
            // Reset regex lastIndex
            verseRegex.lastIndex = 0;
            newParts.push(
              <span
                key={`${s}-${Math.random()}`}
                onClick={(e) => {
                  if (handleVerseClick) {
                    e.stopPropagation();
                    handleVerseClick(s.trim());
                  }
                }}
                className={`inline-flex items-center gap-1 font-semibold text-[#7F1D1D] bg-amber-100/70 hover:bg-amber-200/90 text-inherit px-1.5 py-0.5 rounded border border-[#D1B17F]/40 transition-colors mx-0.5 align-baseline ${
                  handleVerseClick ? 'cursor-pointer hover:underline shadow-2xs' : ''
                }`}
                title={`Abrir ${s} en la Segunda Pantalla de Estudio Bíblico`}
              >
                <BookOpen size={12} className="text-[#7F1D1D] shrink-0" />
                <span>{s}</span>
              </span>
            );
          } else if (s !== '') {
            newParts.push(s);
          }
        });
      } else {
        newParts.push(part);
      }
    });

    return newParts;
  };

  const applyGlossary = (parts: (string | ReactNode)[]): (string | ReactNode)[] => {
    let result = [...parts];
    
    glossaryTerms.forEach(term => {
      const newParts: (string | ReactNode)[] = [];
      result.forEach(part => {
        if (typeof part === 'string') {
          const regex = new RegExp(`(\\b${term}\\b)`, 'gi');
          const termSplit = part.split(regex);
          termSplit.forEach(s => {
            if (s.toLowerCase() === term.toLowerCase()) {
              newParts.push(<GlossaryTooltip key={`${term}-${Math.random()}`} term={term}>{s}</GlossaryTooltip>);
            } else if (s !== '') {
              newParts.push(s);
            }
          });
        } else {
          newParts.push(part);
        }
      });
      result = newParts;
    });
    
    return result;
  };

  const applyMarkdown = (text: string): (string | ReactNode)[] => {
    let parts: (string | ReactNode)[] = [text];

    // Handle Bold **text**
    let tempParts: (string | ReactNode)[] = [];
    parts.forEach(part => {
      if (typeof part === 'string') {
        const boldSplit = part.split(/(\*\*.*?\*\*)/g);
        boldSplit.forEach(s => {
          if (s.startsWith('**') && s.endsWith('**')) {
            const innerText = s.slice(2, -2);
            // Recursively apply glossary and bible verses to the inner text of bold
            tempParts.push(<strong key={s} className="font-bold text-stone-900 dark:text-stone-100">{applyBibleVerses(applyGlossary([innerText]))}</strong>);
          } else if (s !== '') {
            tempParts.push(s);
          }
        });
      } else {
        tempParts.push(part);
      }
    });
    parts = tempParts;

    // Handle Italics *text*
    tempParts = [];
    parts.forEach(part => {
      if (typeof part === 'string') {
        const italicSplit = part.split(/(\*.*?\*)/g);
        italicSplit.forEach(s => {
          if (s.startsWith('*') && s.endsWith('*')) {
            const innerText = s.slice(1, -1);
            // Recursively apply glossary and bible verses to the inner text of italics
            tempParts.push(<em key={s} className="italic">{applyBibleVerses(applyGlossary([innerText]))}</em>);
          } else if (s !== '') {
            tempParts.push(s);
          }
        });
      } else {
        tempParts.push(part);
      }
    });
    parts = tempParts;

    // Finally apply to the remaining strings
    return applyBibleVerses(applyGlossary(parts));
  };

  return <>{applyMarkdown(text)}</>;
}

export function FormattedContent({ content, className = "", onSelectVerse }: FormattedContentProps) {
  if (!content) return null;
  const paragraphs = content.split('\n\n');

  return (
    <div className={className}>
      {paragraphs.map((p, pi) => (
        <div key={pi} className="mt-4 first:mt-0 leading-loose">
          <TextWithGlossary text={p} onSelectVerse={onSelectVerse} />
        </div>
      ))}
    </div>
  );
}

