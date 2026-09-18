import { Lesson } from '../types';

export interface NotebookItem {
  id: string;
  category: 'APUNTE' | 'PREGUNTA' | 'ACTIVIDAD';
  title: string;
  instruction: string;
  hint?: string;
}

// Simple deterministic hash based on string
function getHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function generateLessonNotebookActivities(lesson: Lesson): NotebookItem[] {
  const hash = getHash(lesson.id + (lesson.title || ''));
  const verseRef = lesson.baseVerse?.reference || 'el pasaje bíblico principal';
  const verseText = lesson.baseVerse?.text;
  const mainTitle = lesson.title || 'esta lección';
  const mainTheme = lesson.theologicalExegesis?.mainTheme || lesson.title;
  const exegesis = lesson.theologicalExegesis;
  const originalTerms = lesson.originalTerms || [];
  const objectives = lesson.objectives || [];

  const items: NotebookItem[] = [];

  // --- 1. APUNTE PERSONALIZADO POR TEMA ---
  const apunteTypes = [
    {
      title: `Esquema de Análisis Doctrinal: "${mainTitle}"`,
      instruction: `Abre tu cuaderno, coloca la fecha de hoy y el encabezado "${mainTitle}". Dibuja una tabla de 3 columnas en tu hoja:`,
      hint: exegesis?.mainTheme 
        ? `Columna 1: Tema Central (${exegesis.mainTheme}) • Columna 2: Citas Bíblicas (${verseRef}) • Columna 3: Implicaciones teológicas.`
        : `Columna 1: Puntos Clave de la Lección • Columna 2: Pasajes de Apoyo (${verseRef}) • Columna 3: Conceptos a Memoria.`
    },
    {
      title: `Ficha Exegética de Palabras Clave y Términos`,
      instruction: originalTerms.length > 0 
        ? `Transcribe en tu libreta los términos originales de la clase: ${originalTerms.map(t => `${t.term} (${t.transliteration})`).join(', ')}. Anota su significado literal y su peso teológico.`
        : `Identifica en la lección "${mainTitle}" 3 términos teológicos fundamentales. Escribe sus definiciones formales en tu cuaderno y resáltalos con marcador.`,
      hint: `Un glosario personal escrito a mano en las últimas páginas de tu cuaderno sirve como diccionario teológico de consulta rápida.`
    },
    {
      title: `Cuadro de Contexto Histórico-Gramatical`,
      instruction: exegesis?.historicalGrammaticalContext
        ? `Resume en un párrafo en tu libreta el contexto histórico planteado: "${exegesis.historicalGrammaticalContext.substring(0, 120)}..."`
        : `Sintetiza en tu cuaderno el contexto del pasaje (${verseRef}): ¿Quién escribe?, ¿a quién va dirigido?, ¿cuál era la situación histórica de los oyentes?`,
      hint: `Comprender el entorno cultural original en papel evita errores de interpretación anacrónica.`
    },
    {
      title: `Diagrama de Conexión Cristocéntrica`,
      instruction: exegesis?.christocentricFocus
        ? `Anota en tu cuaderno el enfoque cristocéntrico de hoy: "${exegesis.christocentricFocus}". Traza una flecha que conecte este punto con la obra redentora de Jesús.`
        : `Escribe en el centro de tu hoja el título "${mainTitle}" y traza ramificaciones que expliquen cómo esta enseñanza apunta directamente a la persona y obra de Cristo.`,
      hint: `Toda la Escritura encuentra su cumplimiento en Cristo (Lucas 24:27).`
    }
  ];

  const selectedApunte = apunteTypes[hash % apunteTypes.length];
  items.push({
    id: `${lesson.id}_note_custom`,
    category: 'APUNTE',
    title: selectedApunte.title,
    instruction: selectedApunte.instruction,
    hint: selectedApunte.hint
  });

  // --- 2. PREGUNTA 1: REFLEXIÓN PERSONAL & EXÉGESIS ---
  const pregunta1Types = [
    {
      title: `Pregunta de Confrontación Personal`,
      instruction: exegesis?.doctrinalApplication
        ? `Responde en tu cuaderno: En relación a la aplicación doctrinal de hoy ("${exegesis.doctrinalApplication.substring(0, 100)}..."), ¿qué área de tu vida necesita ser ajustada a la luz de la verdad bíblica?`
        : `Reflexiona por escrito: ¿De qué manera la verdad de "${mainTitle}" exige una respuesta activa de fe en tu vida cotidiana y en tu iglesia local?`,
      hint: `Responde con un párrafo sincero. El estudio bíblico académico sin aplicación devocional se vuelve mero intelectualismo.`
    },
    {
      title: `Análisis Crítico y Argumentación`,
      instruction: `Responde por escrito en tu libreta: ¿Cuáles son las implicaciones teológicas de negar o malinterpretar la enseñanza central de "${mainTitle}"? Fundamenta tu respuesta con al menos dos argumentos.`,
      hint: `Escribir objeciones y defensas en papel fortalece tu capacidad apologética para enseñar a otros.`
    },
    {
      title: `Cuestionario de Comprensión Teológica`,
      instruction: objectives.length > 0
        ? `Evaluación en libreta: Basándote en el objetivo ("${objectives[0]}"), redacta en tu cuaderno una explicación de 4 líneas con tus propias palabras.`
        : `Abre tu cuaderno y responde: ¿Cómo explicarías el tema de "${mainTitle}" a un nuevo creyente o un estudiante de la Biblia que nunca ha escuchado de esto?`,
      hint: `Si puedes explicar un concepto con palabras sencillas por escrito, significa que realmente lo has aprehendido.`
    }
  ];

  const selectedPregunta1 = pregunta1Types[(hash + 1) % pregunta1Types.length];
  items.push({
    id: `${lesson.id}_q1_custom`,
    category: 'PREGUNTA',
    title: selectedPregunta1.title,
    instruction: selectedPregunta1.instruction,
    hint: selectedPregunta1.hint
  });

  // --- 3. PREGUNTA 2: TRASCRIPCIÓN & ANÁLISIS BÍBLICO DE PASAJE ---
  items.push({
    id: `${lesson.id}_q2_custom`,
    category: 'PREGUNTA',
    title: `Transcripción Exegética en Libreta: ${verseRef}`,
    instruction: verseText
      ? `Transcribe literalmente a mano en tu cuaderno el texto de ${verseRef}: "${verseText}". Subraya con un color las promesas, con otro los mandatos, y encierra en un círculo los nombres divinos o verbos principales.`
      : `Busca en tu Biblia física el pasaje base de la lección (${verseRef}). Transcríbelo completo en tu libreta, anota el libro, capítulo y versículo, y marca las palabras con mayor peso doctrinal.`,
    hint: `La transcripción caligráfica ejercita la memoria visual y la meditación profunda en el texto sagrado.`
  });

  // --- 4. ACTIVIDAD 1: EJERCICIO PRÁCTICO EN PAPEL ---
  const actividad1Types = [
    {
      title: `Diseño de Bosquejo Homilético / Docente`,
      instruction: `Elabora en tu cuaderno un bosquejo de enseñanza de 3 puntos principales basado en "${mainTitle}". Incluye una introducción atractiva, 3 subpuntos bien estructurados con citas bíblicas, y una conclusión aplicativa.`,
      hint: `Este bosquejo te servirá para estructurar futuros sermones, clases de escuela dominical o grupos de estudio.`
    },
    {
      title: `Matriz Comparativa de Enfoques`,
      instruction: `Dibuja en tu libreta una matriz de doble entrada. Compara la postura bíblica-ortodoxa explicada en "${mainTitle}" contra las interpretaciones erróneas o desviaciones culturales modernas.`,
      hint: `Escribir ambas perspectivas en paralelo agudiza el discernimiento espiritual.`
    },
    {
      title: `Línea de Tiempo / Mapa de Desarrollo Teológico`,
      instruction: `Traza en una hoja completa de tu cuaderno una línea de tiempo o diagrama de flujo que ordene cronológicamente o lógicamente la progresión de los acontecimientos y verdades abordadas en "${mainTitle}".`,
      hint: `Utiliza regla y marcadores de colores para delimitar cada etapa del desarrollo teológico.`
    },
    {
      title: `Plan de Acción Ministerial en Papel`,
      instruction: `Redacta en tu cuaderno un plan de 3 pasos concretos para implementar lo aprendido en "${mainTitle}" en tu ministerio actual, grupo pequeño o dinámica familiar esta misma semana.`,
      hint: `Haz el compromiso específico: ¿Cuándo?, ¿con quién? y ¿cómo aplicarás esta enseñanza?`
    }
  ];

  const selectedActividad1 = actividad1Types[(hash + 2) % actividad1Types.length];
  items.push({
    id: `${lesson.id}_act1_custom`,
    category: 'ACTIVIDAD',
    title: selectedActividad1.title,
    instruction: selectedActividad1.instruction,
    hint: selectedActividad1.hint
  });

  // --- 5. ACTIVIDAD 2: ORACIÓN & CONSAGRACIÓN ESCRITA ---
  items.push({
    id: `${lesson.id}_act2_custom`,
    category: 'ACTIVIDAD',
    title: `Oración Escrita de Consagración: "${mainTitle}"`,
    instruction: `Cierra la sesión de estudio redactando en la parte inferior de tu hoja una oración a mano. Expresa al Señor tu gratitud por la verdad de ${verseRef}, pide perdón por las faltas reveladas y ruega sabiduría para guardar este conocimiento en tu corazón.`,
    hint: `Tu libreta de estudio no solo es un registro académico, sino también un altar de devoción y alabanza a Dios.`
  });

  return items;
}
