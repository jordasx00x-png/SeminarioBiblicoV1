export interface EvaluationCriteria {
  name: string;
  weight: number;
  score: number; // 0 to 100
  feedback: string;
}

export interface AssignmentEvaluationResult {
  score: number; // 0 to 100
  passed: boolean;
  statusText: 'Aprobado con Distinción Teológica' | 'Aprobado Satisfactoriamente' | 'Aprobado con Observaciones' | 'Requiere Revisión y Reenvío';
  gradeLetter: 'A+' | 'A' | 'B+' | 'B' | 'C' | 'D';
  wordCount: number;
  detectedVerses: string[];
  detectedKeyTerms: string[];
  criteria: EvaluationCriteria[];
  strengths: string[];
  improvements: string[];
  theologicalSummary: string;
  recommendedReadings: string[];
  evaluatedAt: string;
}

const BIBLE_BOOKS_REGEX = '(?:[1-3]\\s+)?(?:Génesis|Genesis|Éxodo|Exodo|Levítico|Levitico|Números|Numeros|Deuteronomio|Josué|Josue|Jueces|Rut|Samuel|Reyes|Crónicas|Cronicas|Esdras|Nehemías|Nehemias|Ester|Job|Salmos|Salmo|Proverbios|Eclesiastés|Eclesiastes|Cantares|Isaías|Isaias|Jeremías|Jeremias|Lamentaciones|Ezequiel|Daniel|Oseas|Joel|Amós|Amos|Abdías|Abdias|Jonás|Jonas|Miqueas|Nahúm|Nahum|Habacuc|Sofonías|Sofonias|Hageo|Zacarías|Zacarias|Malaquías|Malaquias|Mateo|Marcos|Lucas|Juan|Hechos|Romanos|Corintios|Gálatas|Galatas|Efesios|Filipenses|Colosenses|Tesalonicenses|Timoteo|Tito|Filemón|Filemon|Hebreos|Santiago|Pedro|Judas|Apocalipsis)';

const THEOLOGICAL_VOCABULARY = [
  'exégesis', 'exegesis', 'hermenéutica', 'hermeneutica', 'gracia', 'justificación', 'justificacion', 
  'imputación', 'imputacion', 'fe', 'sola fide', 'sola scriptura', 'sola gratia', 'solus christus',
  'soli deo gloria', 'evangelio', 'cristo', 'pablo', 'apóstol', 'apóstoles', 'pacto', 'alianza',
  'redención', 'redencion', 'propiciación', 'propiciacion', 'regeneración', 'santificación', 'santificacion',
  'soberanía', 'soberania', 'contexto', 'histórico', 'gramatical', 'literario', 'griego', 'hebreo',
  'arameo', 'autor', 'audiencia', 'intención', 'aplicación', 'pastoral', 'iglesia', 'doctrina',
  'ortodoxia', 'espíritu santo', 'inspiración', 'inerrancia', 'canon', 'teología', 'cruz', 'resurrección',
  'pecado', 'salvación', 'reconciliación', 'escatología', 'eiségesis', 'eisegesis', 'cristocéntrico'
];

export function evaluateAssignmentSubmission(
  content: string,
  assignmentDescription: string,
  lessonTitle: string
): AssignmentEvaluationResult {
  const trimmed = content.trim();
  const words = trimmed.length > 0 ? trimmed.split(/\s+/).filter(w => w.length > 0) : [];
  const wordCount = words.length;

  // Extract Bible verses
  const verseRegex = new RegExp(`\\b(${BIBLE_BOOKS_REGEX}\\s+\\d+(?::\\d+(?:-\\d+)?)?)\\b`, 'gi');
  const matches = trimmed.match(verseRegex) || [];
  const detectedVerses = Array.from(new Set(matches.map(m => m.trim())));

  // Extract theological terms
  const lowerContent = trimmed.toLowerCase();
  const detectedKeyTerms = THEOLOGICAL_VOCABULARY.filter(term => lowerContent.includes(term));

  // Determine scores for 4 academic dimensions
  // 1. Rigor Teológico y Exegético (25%)
  let theologicalScore = 0;
  let theologicalFeedback = '';
  if (wordCount < 30) {
    theologicalScore = 25;
    theologicalFeedback = 'El desarrollo teológico es sumamente breve. Se requiere una mayor articulación conceptual y profundización en la tesis central.';
  } else {
    const termCount = detectedKeyTerms.length;
    if (termCount >= 6) {
      theologicalScore = Math.min(100, 85 + Math.min(15, termCount * 2));
      theologicalFeedback = 'Excelente precisión técnica y conceptual. Demuestra dominio del vocabulario teológico, distinguiendo categorías con fidelidad doctrinal.';
    } else if (termCount >= 3) {
      theologicalScore = 75 + termCount * 3;
      theologicalFeedback = 'Buen manejo del marco teológico general. Puede profundizar aún más en las distinciones doctrinales clave.';
    } else {
      theologicalScore = 55 + termCount * 5;
      theologicalFeedback = 'Se abordan nociones doctrinales pero con vocabulario genérico. Se sugiere incorporar términos teológicos y exegéticos precisos.';
    }
  }

  // 2. Fundamentación Bíblica & Citas (25%)
  let biblicalScore = 0;
  let biblicalFeedback = '';
  if (detectedVerses.length >= 3) {
    biblicalScore = Math.min(100, 88 + (detectedVerses.length - 3) * 4);
    biblicalFeedback = `Sólido sustento escritural con ${detectedVerses.length} pasajes citados (${detectedVerses.slice(0, 3).join(', ')}${detectedVerses.length > 3 ? '...' : ''}). Los textos interactúan adecuadamente con el argumento.`;
  } else if (detectedVerses.length === 2) {
    biblicalScore = 80;
    biblicalFeedback = `Buen respaldo bíblico fundamentado en ${detectedVerses.join(' y ')}. Se sugiere contrastar con pasajes del Antiguo o Nuevo Testamento para enriquecer la teología bíblica.`;
  } else if (detectedVerses.length === 1) {
    biblicalScore = 68;
    biblicalFeedback = `Se incluye 1 referencia (${detectedVerses[0]}). Para un nivel académico superior se aconseja correlacionar al menos dos o tres textos adicionales.`;
  } else {
    // Check if mentions scripture generally
    if (lowerContent.includes('biblia') || lowerContent.includes('escritura') || lowerContent.includes('palabra')) {
      biblicalScore = 50;
      biblicalFeedback = 'Menciona la Escritura en términos generales, pero carece de citas bíblicas específicas con libro, capítulo y versículo.';
    } else {
      biblicalScore = 35;
      biblicalFeedback = 'No se detectaron citas bíblicas de respaldo. Todo trabajo teológico debe cimentarse explícitamente en el texto sagrado.';
    }
  }

  // 3. Estructura, Extensión y Coherencia Argumentativa (25%)
  let structureScore = 0;
  let structureFeedback = '';
  const paragraphs = trimmed.split(/\n\s*\n/).filter(p => p.trim().length > 0);

  if (wordCount >= 250 && paragraphs.length >= 3) {
    structureScore = 95;
    structureFeedback = `Excelente estructuración formal (${wordCount} palabras distribuidas en ${paragraphs.length} párrafos). Presenta una progresión lógica clara de tesis, desarrollo y síntesis.`;
  } else if (wordCount >= 150 && paragraphs.length >= 2) {
    structureScore = 85;
    structureFeedback = `Buena extensión (${wordCount} palabras) y división adecuada en secciones. El hilo conductor se mantiene constante.`;
  } else if (wordCount >= 70) {
    structureScore = 70;
    structureFeedback = `Extensión aceptable (${wordCount} palabras), pero se beneficiaría de estructurarse en introducción, argumentación exegética y conclusiones explícitas.`;
  } else if (wordCount >= 25) {
    structureScore = 50;
    structureFeedback = `Extensión reducida (${wordCount} palabras). El ensayo requiere mayor desarrollo analítico para satisfacer el estándar del seminario.`;
  } else {
    structureScore = 20;
    structureFeedback = `Texto insuficiente (${wordCount} palabras). No se alcanza a conformar un argumento académico comprensible.`;
  }

  // 4. Aplicación Pastoral y Relevancia Práctica (25%)
  let practicalScore = 0;
  let practicalFeedback = '';
  const practicalKeywords = ['iglesia', 'vida', 'creyente', 'pastoral', 'ministerio', 'corazón', 'práctica', 'diaria', 'comunidad', 'fe', 'testimonio', 'aplicar', 'discipulado'];
  const matchedPractical = practicalKeywords.filter(k => lowerContent.includes(k));

  if (matchedPractical.length >= 4) {
    practicalScore = 92;
    practicalFeedback = 'Destacada vinculación entre la ortodoxia (doctrina sana) y la ortopraxis (vida piadosa y ministerio). Traduce la teología en edificación comunitaria.';
  } else if (matchedPractical.length >= 2) {
    practicalScore = 80;
    practicalFeedback = 'Buena orientación práctica. Plantea implicaciones relevantes para la vida del creyente y la labor eclesial.';
  } else if (matchedPractical.length >= 1) {
    practicalScore = 65;
    practicalFeedback = 'Contiene menciones prácticas leves. Se recomienda profundizar en cómo esta verdad transforma el pastoreo y la devoción cotidiana.';
  } else {
    practicalScore = 45;
    practicalFeedback = 'El ensayo permanece puramente teórico. Toda verdad bíblica debe culminar en adoración, arrepentimiento o servicio ministerial.';
  }

  // Calculate weighted composite score
  const compositeScore = Math.round(
    theologicalScore * 0.25 +
    biblicalScore * 0.25 +
    structureScore * 0.25 +
    practicalScore * 0.25
  );

  const passed = compositeScore >= 70;

  // Grade letters and status texts
  let gradeLetter: AssignmentEvaluationResult['gradeLetter'] = 'C';
  let statusText: AssignmentEvaluationResult['statusText'] = 'Aprobado Satisfactoriamente';

  if (compositeScore >= 92) {
    gradeLetter = 'A+';
    statusText = 'Aprobado con Distinción Teológica';
  } else if (compositeScore >= 85) {
    gradeLetter = 'A';
    statusText = 'Aprobado con Distinción Teológica';
  } else if (compositeScore >= 78) {
    gradeLetter = 'B+';
    statusText = 'Aprobado Satisfactoriamente';
  } else if (compositeScore >= 70) {
    gradeLetter = 'B';
    statusText = 'Aprobado con Observaciones';
  } else if (compositeScore >= 50) {
    gradeLetter = 'C';
    statusText = 'Requiere Revisión y Reenvío';
  } else {
    gradeLetter = 'D';
    statusText = 'Requiere Revisión y Reenvío';
  }

  // Strengths
  const strengths: string[] = [];
  if (wordCount >= 150) strengths.push(`Desarrollo amplio con ${wordCount} palabras articuladas.`);
  if (detectedVerses.length >= 2) strengths.push(`Uso certero de citas bíblicas (${detectedVerses.join(', ')}).`);
  if (detectedKeyTerms.length >= 4) strengths.push(`Manejo de terminología teológica especializada (${detectedKeyTerms.slice(0, 4).join(', ')}).`);
  if (matchedPractical.length >= 2) strengths.push('Enfoque equilibrado entre el análisis doctrinal y la aplicación eclesial.');
  if (strengths.length === 0) strengths.push('Iniciativa y compromiso en la entrega del trabajo académico.');

  // Improvements
  const improvements: string[] = [];
  if (wordCount < 180) improvements.push('Expandir el marco argumentativo alcanzando al menos 200 a 350 palabras.');
  if (detectedVerses.length < 2) improvements.push('Incorporar más citas bíblicas explícitas con referencias exactas (Capítulo y Versículo).');
  if (detectedKeyTerms.length < 3) improvements.push('Profundizar en el uso de conceptos técnicos de la lección (ej. contexto histórico, gracia soberana, exégesis).');
  if (matchedPractical.length < 2) improvements.push('Añadir una sección conclusiva dedicada a la aplicación pastoral en la congregación local.');

  // Theological summary synthesis
  let theologicalSummary = '';
  if (passed) {
    theologicalSummary = `El documento presentado satisface los requerimientos formativos de "${lessonTitle}". Refleja comprensión de los principios exegéticos y doctrinales abordados en la clase, demostrando madurez en la articulación de la fe reformada y bíblica.`;
  } else {
    theologicalSummary = `El documento requiere fortalecimiento en la fundamentación textual y la amplitud argumentativa antes de recibir acreditación definitiva. Revise las observaciones indicadas y utilice la plantilla académica para un reenvío exitoso.`;
  }

  const recommendedReadings = [
    'Juan Calvino — Institución de la Religión Cristiana (Libro III)',
    'Gordon Fee & Douglas Stuart — La Lectura Eficaz de la Biblia',
    'R.C. Sproul — Cómo Conocer la Voluntad de Dios y Amar la Verdad'
  ];

  const criteria: EvaluationCriteria[] = [
    {
      name: 'Rigor Exegético y Teológico',
      weight: 25,
      score: theologicalScore,
      feedback: theologicalFeedback
    },
    {
      name: 'Fundamentación Bíblica & Citas',
      weight: 25,
      score: biblicalScore,
      feedback: biblicalFeedback
    },
    {
      name: 'Estructura y Coherencia Académica',
      weight: 25,
      score: structureScore,
      feedback: structureFeedback
    },
    {
      name: 'Aplicación Pastoral y Vida Práctica',
      weight: 25,
      score: practicalScore,
      feedback: practicalFeedback
    }
  ];

  return {
    score: compositeScore,
    passed,
    statusText,
    gradeLetter,
    wordCount,
    detectedVerses,
    detectedKeyTerms,
    criteria,
    strengths,
    improvements,
    theologicalSummary,
    recommendedReadings,
    evaluatedAt: new Date().toISOString()
  };
}
