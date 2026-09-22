import { Lesson } from '../types';

export interface SeminaryNotebookTask {
  id: string;
  number: number;
  badge: string;
  badgeColor: string;
  title: string;
  task: string;
  guidePrompt: string;
}

export type SimpleNotebookTask = SeminaryNotebookTask;
export type NotebookItem = SeminaryNotebookTask;

// Simple deterministic hash based on string
function getHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export interface LessonNotebookPlan {
  pedagogicalFocus: string;
  focusBadge: string;
  tasks: SeminaryNotebookTask[];
}

export function generateLessonNotebookPlan(lesson: Lesson): LessonNotebookPlan {
  const hash = getHash(lesson.id + (lesson.title || '') + (lesson.day || 1));
  const verseRef = lesson.baseVerse?.reference || 'Pasaje de la Lección';
  const verseText = lesson.baseVerse?.text;
  const mainTitle = lesson.title || 'esta clase';
  const exegesis = lesson.theologicalExegesis;
  const originalTerms = lesson.originalTerms || [];
  const primaryTerm = originalTerms.length > 0 ? originalTerms[0] : null;
  const secondaryTerm = originalTerms.length > 1 ? originalTerms[1] : null;
  const hermeneutical = lesson.hermeneuticalExercise;
  const commentaries = lesson.commentaries || [];
  const primaryCommentary = commentaries.length > 0 ? commentaries[0] : null;
  const objectives = lesson.objectives || [];

  // Determine the primary pedagogical archetype for this specific class (cycles every 5 styles)
  const archetypeIndex = hash % 5;

  let pedagogicalFocus = '';
  let focusBadge = '';
  const tasks: SeminaryNotebookTask[] = [];

  switch (archetypeIndex) {
    // =========================================================================
    // ARQUETIPO 1: EXÉGESIS RIGUROSA, LENGUAS ORIGINALES & CONTEXTO
    // =========================================================================
    case 0: {
      pedagogicalFocus = 'Enfoque: Exégesis y Lenguas Originales';
      focusBadge = 'Exégesis & Contexto';

      // Tarea 1: Idiomas bíblicos o análisis de vocabulario
      tasks.push({
        id: `${lesson.id}_arq1_1`,
        number: 1,
        badge: 'Idiomas Bíblicos',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950/70 dark:text-blue-300 dark:border-blue-800',
        title: primaryTerm 
          ? `1. Estudio Léxico del Término: ${primaryTerm.term} (${primaryTerm.language})`
          : `1. Disección Exegética del Pasaje: ${verseRef}`,
        task: primaryTerm
          ? `Anota en tu libreta el vocablo "${primaryTerm.term}" (${primaryTerm.transliteration}). Define su significado literal: "${primaryTerm.meaning}" y explica cómo este término transforma la comprensión del versículo ${verseRef}.`
          : `Transcribe en tu cuaderno el versículo ${verseRef}. Subraya los verbos en tiempo presente o imperativo y explica qué acción precisa demanda Dios del lector.`,
        guidePrompt: 'En tu libreta: Término/Pasaje central • Raíz o significado literal • Aporte teológico al texto.'
      });

      // Tarea 2: Contexto Histórico-Gramatical
      tasks.push({
        id: `${lesson.id}_arq1_2`,
        number: 2,
        badge: 'Contexto Histórico',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-800',
        title: '2. Reconstrucción del Entorno de los Primeros Oyentes',
        task: exegesis?.historicalGrammaticalContext
          ? `Sintetiza en tu libreta el trasfondo de la época: "${exegesis.historicalGrammaticalContext.slice(0, 160)}...". ¿Cuál era la presión social, política o religiosa que enfrentaban los destinatarios originales?`
          : `Investiga en tu libreta: ¿A quién fue escrito ${verseRef}? Describe las circunstancias del autor y la crisis o necesidad concreta de la congregación receptora.`,
        guidePrompt: 'Anota: Destinatarios originales • Situación histórica • Por qué era vital esta carta o mensaje.'
      });

      // Tarea 3: Ejercicio Hermenéutico (Evitar Eiségesis)
      tasks.push({
        id: `${lesson.id}_arq1_3`,
        number: 3,
        badge: 'Hermenéutica',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-800',
        title: '3. Filtro Hermenéutico: Exégesis vs. Malas Interpretaciones',
        task: hermeneutical?.observation
          ? `Trabaja con el ejercicio hermenéutico de la clase: "${hermeneutical.observation.slice(0, 140)}...". Explica cómo este principio evita sacar versículos fuera de contexto.`
          : `Escribe en tu cuaderno: ¿Qué error comete una persona que lee ${verseRef} desconectándolo del resto del capítulo? Formula una regla práctica de interpretación personal.`,
        guidePrompt: 'Escribe: Error interpretativo común • Lo que el texto realmente dice en su contexto.'
      });

      // Tarea 4: Oración de Humildad Intelectual
      tasks.push({
        id: `${lesson.id}_arq1_4`,
        number: 4,
        badge: 'Devoción Exegética',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300 dark:bg-purple-950/70 dark:text-purple-300 dark:border-purple-800',
        title: '4. Sumisión del Estudiante ante la Palabra',
        task: `Concluye redactando en tu libreta una oración confesando tus límites humanos. Ruega al Espíritu Santo que guarde tu mente de manipular las Escrituras y te conceda humildad para someter tu criterio a la revelación divina.`,
        guidePrompt: 'Redacta a mano una oración sincera pidiendo reverencia e iluminación espiritual.'
      });
      break;
    }

    // =========================================================================
    // ARQUETIPO 2: HOMILÉTICA, DOCENCIA & DISCIPULADO
    // =========================================================================
    case 1: {
      pedagogicalFocus = 'Enfoque: Homilética y Pedagogía Pastoral';
      focusBadge = 'Homilética & Docencia';

      // Tarea 1: Bosquejo Expositivo de Enseñanza
      tasks.push({
        id: `${lesson.id}_arq2_1`,
        number: 1,
        badge: 'Bosquejo Homilético',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300 dark:bg-indigo-950/70 dark:text-indigo-300 dark:border-indigo-800',
        title: `1. Bosquejo de 3 Puntos: "${mainTitle}"`,
        task: `Diseña en tu cuaderno un bosquejo para predicar o enseñar esta lección en un grupo bíblico o congregación:\n` +
          `• Título llamativo y cristocéntrico\n` +
          `• Punto I: El Fundamento en ${verseRef}\n` +
          `• Punto II: El Conflicto o Explicación Doctrinal\n` +
          `• Punto III: La Demanda Práctica de Fe`,
        guidePrompt: 'Traza tu esquema con divisiones claras y citas bíblicas de apoyo.'
      });

      // Tarea 2: 3 Preguntas de Discipulado
      tasks.push({
        id: `${lesson.id}_arq2_2`,
        number: 2,
        badge: 'Discipulado',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300 dark:bg-teal-950/70 dark:text-teal-300 dark:border-teal-800',
        title: '2. Preguntas Socráticas para Grupo de Estudio',
        task: `Redacta 3 preguntas profundas y no retóricas que le harías a tus discípulos o clase dominical para guiarlos a reflexionar en "${mainTitle}". Cada pregunta debe exigir examen de conciencia y no un simple "sí" o "no".`,
        guidePrompt: 'Formula 3 preguntas: 1 de comprensión, 1 de convicción y 1 de acción práctica.'
      });

      // Tarea 3: Analogía o Ilustración Pastoral
      tasks.push({
        id: `${lesson.id}_arq2_3`,
        number: 3,
        badge: 'Ilustración Didáctica',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-800',
        title: '3. Creación de una Ilustración Contemporánea',
        task: `El Señor Jesús usaba parábolas del campo y la vida cotidiana. Escribe en tu libreta una ilustración o metáfora moderna (de la vida laboral, médica, familiar o tecnológica) que explique con nitidez la doctrina central de esta clase.`,
        guidePrompt: 'Redacta un párrafo con la historia breve o analogía y la lección espiritual que ilustra.'
      });

      // Tarea 4: Consagración del Mensajero
      tasks.push({
        id: `${lesson.id}_arq2_4`,
        number: 4,
        badge: 'Carga Pastoral',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/70 dark:text-rose-300 dark:border-rose-800',
        title: '4. Intercesión por Aquellos a Quienes Enseñas',
        task: `Un maestro sin intercesión es un mero conferencista. Anota el nombre de 2 o 3 personas específicas a quienes Dios te ha llamado a influenciar o enseñar. Pide a Dios que esta doctrina eche raíz profunda en sus vidas.`,
        guidePrompt: 'Anota nombres concretos y redacta una oración de intercesión pastoral.'
      });
      break;
    }

    // =========================================================================
    // ARQUETIPO 3: APOLOGÉTICA & DEFENSA DE LA SANA DOCTRINA
    // =========================================================================
    case 2: {
      pedagogicalFocus = 'Enfoque: Apologética y Defensa Doctrinal';
      focusBadge = 'Apologética & Teología';

      // Tarea 1: Identificación de Herejías o Distorsiones Modernas
      tasks.push({
        id: `${lesson.id}_arq3_1`,
        number: 1,
        badge: 'Discernimiento',
        badgeColor: 'bg-red-100 text-red-900 border-red-300 dark:bg-red-950/70 dark:text-red-300 dark:border-red-800',
        title: `1. Matriz de Errores Doctrinales vs. Verdad Bíblica`,
        task: `Dibuja una tabla de 2 columnas en tu cuaderno:\n` +
          `• Columna Izquierda: Desviaciones comunes o filosofías del mundo sobre "${mainTitle}" (ej. relativismo, legalismo o evangelio de la prosperidad).\n` +
          `• Columna Derecha: Lo que la Palabra de Dios establece irrevocablemente en ${verseRef}.`,
        guidePrompt: 'Contrasta al menos 2 distorsiones contemporáneas frente a la postura ortodoxa.'
      });

      // Tarea 2: Argumentación Apologética Bíblica
      tasks.push({
        id: `${lesson.id}_arq3_2`,
        number: 2,
        badge: 'Defensa de la Fe',
        badgeColor: 'bg-orange-100 text-orange-900 border-orange-300 dark:bg-orange-950/70 dark:text-orange-300 dark:border-orange-800',
        title: '2. Argumentación Frente a Objeciones Críticas',
        task: `Imagina que un escéptico o creyente confundido desafía la doctrina expuesta en "${mainTitle}". Redacta una respuesta fundamentada con argumentos exegéticos, lógica bíblica y gracia pastoral (1 Pedro 3:15).`,
        guidePrompt: 'Escribe un argumento sólido en 2 párrafos: con claridad teológica y respeto fraternal.'
      });

      // Tarea 3: Cadena de Citas Intertestamentarias
      tasks.push({
        id: `${lesson.id}_arq3_3`,
        number: 3,
        badge: 'Referencias Cruzadas',
        badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300 dark:bg-cyan-950/70 dark:text-cyan-300 dark:border-cyan-800',
        title: '3. Cadena Bíblica de Respaldos Cruzados',
        task: `Busca en tu Biblia 2 pasajes adicionales (uno del Antiguo Testamento y otro de las Epístolas o Evangelios) que afirmen la misma verdad de ${verseRef}. Cópialos brevemente y anota cómo se complementan armónicamente.`,
        guidePrompt: 'Escribe: Pasaje 1 (AT) • Pasaje 2 (NT) • Conexión doctrinal armónica entre ambos.'
      });

      // Tarea 4: Oración por Firmeza y Fidelidad
      tasks.push({
        id: `${lesson.id}_arq3_4`,
        number: 4,
        badge: 'Fidelidad Doctrinal',
        badgeColor: 'bg-violet-100 text-violet-900 border-violet-300 dark:bg-violet-950/70 dark:text-violet-300 dark:border-violet-800',
        title: '4. Voto Escrito de Valentía Doctrinal',
        task: `Redacta una oración pidiendo la valentía de los reformadores y apóstoles para no claudicar ante las presiones culturales del siglo XXI y proclamar la verdad con amor pero sin adulterarla.`,
        guidePrompt: 'Escribe tu compromiso solemne de lealtad a la verdad bíblica.'
      });
      break;
    }

    // =========================================================================
    // ARQUETIPO 4: TEOLOGÍA CRISTOCÉNTRICA & PACTOS REDENTORES
    // =========================================================================
    case 3: {
      pedagogicalFocus = 'Enfoque: Teología Bíblica y Cristocentrismo';
      focusBadge = 'Cristocéntrico & Pactos';

      // Tarea 1: El Hilo Rojo en Cristo
      tasks.push({
        id: `${lesson.id}_arq4_1`,
        number: 1,
        badge: 'Cristología',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-800',
        title: '1. El Hilo Rojo: ¿Cómo apunta este tema a Cristo?',
        task: exegesis?.christocentricFocus
          ? `Analiza el foco cristocéntrico de hoy: "${exegesis.christocentricFocus}". Explica en tu libreta por qué este texto no puede entenderse plenamente sin la Cruz y la Resurrección del Salvador.`
          : `Escribe en tu cuaderno cómo el pasaje ${verseRef} encuentra su cumplimiento supremo en la persona, ministerio o sacrificio expiatorio de Jesús (Lucas 24:27).`,
        guidePrompt: 'Desarrolla en tu hoja: La sombra o promesa • El cumplimiento perfecto en Jesucristo.'
      });

      // Tarea 2: Ley vs. Gracia / Religión vs. Evangelio
      tasks.push({
        id: `${lesson.id}_arq4_2`,
        number: 2,
        badge: 'Teología de la Gracia',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-800',
        title: '2. Contraste: Esfuerzo Humano vs. Gracia Transformadora',
        task: `¿Por qué intentar obedecer las demandas de "${mainTitle}" por mera fuerza de voluntad produce frustración o fariseísmo? Explica cómo el Espíritu Santo capacita sobrenaturalmente al creyente mediante la gracia.`,
        guidePrompt: 'Escribe: El callejón sin salida del legalismo • El poder habilitador del Evangelio.'
      });

      // Tarea 3: Diálogo con Comentaristas de la Iglesia
      tasks.push({
        id: `${lesson.id}_arq4_3`,
        number: 3,
        badge: 'Tradición Histórica',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950/70 dark:text-blue-300 dark:border-blue-800',
        title: primaryCommentary 
          ? `3. Diálogo Teológico: Aporte de ${primaryCommentary.author}`
          : '3. Análisis del Testimonio Histórico de la Iglesia',
        task: primaryCommentary
          ? `Lee la perspectiva histórica de ${primaryCommentary.author}: "${primaryCommentary.text.slice(0, 140)}...". Resume en 2 líneas qué advertencia o luz teológica aporta a tu interpretación actual.`
          : `Reflexiona en tu cuaderno: ¿Cómo entendieron los padres de la iglesia o los reformadores la doctrina de ${verseRef}? Anota la importancia de estar anclados en el consenso histórico de la iglesia fiel.`,
        guidePrompt: 'Anota: Autor/Época • Idea medular • Aplicación para la iglesia hoy.'
      });

      // Tarea 4: Doxología y Adoración Personal
      tasks.push({
        id: `${lesson.id}_arq4_4`,
        number: 4,
        badge: 'Doxología',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/70 dark:text-rose-300 dark:border-rose-800',
        title: '4. Doxología Escrita (Cántico de Adoración)',
        task: `La teología que no desemboca en doxología está muerta. Concluye redactando en tu libreta una alabanza escrita a Jesucristo, exaltando su señorío por las glorias descubiertas en esta lección.`,
        guidePrompt: 'Escribe un salmo o alabanza sincera rindiendo tu corazón a Cristo.'
      });
      break;
    }

    // =========================================================================
    // ARQUETIPO 5: ÉTICA MINISTERIAL, CASOS REALES & CONSEJERÍA
    // =========================================================================
    case 4:
    default: {
      pedagogicalFocus = 'Enfoque: Ética Ministerial y Consejería Pastoral';
      focusBadge = 'Ética & Pastoral';

      // Tarea 1: Resolución de Caso Ético/Pastoral
      tasks.push({
        id: `${lesson.id}_arq5_1`,
        number: 1,
        badge: 'Caso Pastoral',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300 dark:bg-purple-950/70 dark:text-purple-300 dark:border-purple-800',
        title: '1. Resolución de un Caso Pastoral Real',
        task: `Plantea en tu libreta el caso de un creyente que enfrenta un conflicto ético o familiar relacionado con "${mainTitle}". ¿Qué consejo pastoral bíblico le darías basándote estrictamente en ${verseRef}?`,
        guidePrompt: 'Escribe: El dilema de la persona • El principio de las Escrituras • El plan de restauración.'
      });

      // Tarea 2: Autoexamen del Corazón del Líder
      tasks.push({
        id: `${lesson.id}_arq5_2`,
        number: 2,
        badge: 'Autoexamen',
        badgeColor: 'bg-red-100 text-red-900 border-red-300 dark:bg-red-950/70 dark:text-red-300 dark:border-red-800',
        title: '2. Radiografía Interior: Honestidad ante Dios',
        task: exegesis?.doctrinalApplication
          ? `Confronta tu vida secreta frente a esta aplicación: "${exegesis.doctrinalApplication.slice(0, 140)}...". ¿Existe alguna contradicción entre lo que profesas o enseñas y lo que vives en privado?`
          : `Examina con lupa espiritual tu motivación en el ministerio o servicio cristiano: ¿Buscas el aplauso humano o la fidelidad ante el tribunal de Cristo? Escribe un diagnóstico honesto.`,
        guidePrompt: 'Anota una reflexión privada y transparente sobre tu condición espiritual.'
      });

      // Tarea 3: Plan de Acción Ministerial en 3 Pasos
      tasks.push({
        id: `${lesson.id}_arq5_3`,
        number: 3,
        badge: 'Plan de Acción',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-800',
        title: '3. Plan de Acción Inmediata (Esta Semana)',
        task: `Escribe 3 decisiones concretas y medibles para aplicar lo aprendido en tu congregación, hogar o lugar de trabajo:\n` +
          `1. Una conversación difícil o de reconciliación que debes tener.\n` +
          `2. Un hábito de disciplina espiritual que implementarás.\n` +
          `3. Una persona específica a quien servirás con humildad.`,
        guidePrompt: 'Redacta los 3 compromisos con plazos definidos para esta misma semana.'
      });

      // Tarea 4: Oración de Arrepentimiento y Restauración
      tasks.push({
        id: `${lesson.id}_arq5_4`,
        number: 4,
        badge: 'Quebrantamiento',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-800',
        title: '4. Oración de Quebrantamiento y Consagración',
        task: `Cierra tu cuaderno derramando tu corazón delante del Señor. Pide perdón por las faltas que el Espíritu Santo te haya mostrado durante esta sesión y suplica poder de lo alto para ser un siervo íntegro.`,
        guidePrompt: 'Escribe tu oración de arrepentimiento y consagración a Dios.'
      });
      break;
    }
  }

  return {
    pedagogicalFocus,
    focusBadge,
    tasks
  };
}

export function generateLessonNotebookActivities(lesson: Lesson): SeminaryNotebookTask[] {
  return generateLessonNotebookPlan(lesson).tasks;
}
