import { Lesson, ExamQuestion, ContentBlock } from '../types';

// Precise pool of standard, highly accurate Biblical verses for theological reinforcement
const VERSE_POOL = [
  {
    keywords: ['fide', 'fe', 'justificación', 'salvación'],
    reference: 'Gálatas 2:16',
    text: 'Sabiendo que el hombre no es justificado por las obras de la ley, sino por la fe de Jesucristo, nosotros también hemos creído en Jesucristo, para ser justificados por la fe de Cristo y no por las obras de la ley, por cuanto por las obras de la ley nadie será justificado.'
  },
  {
    keywords: ['scriptura', 'escritura', 'palabra', 'biblia', 'revelación'],
    reference: '2 Timoteo 3:16-17',
    text: 'Toda la Escritura es inspirada por Dios, y útil para enseñar, para redargüir, para corregir, para instruir en justicia, a fin de que el hombre de Dios sea perfecto, enteramente preparado para toda buena obra.'
  },
  {
    keywords: ['gratia', 'gracia', 'elección', 'efesios'],
    reference: 'Efesios 2:8-9',
    text: 'Porque por gracia sois salvos por medio de la fe; y esto no de vosotros, pues es don de Dios; no por obras, para que nadie se gloríe.'
  },
  {
    keywords: ['christus', 'cristo', 'jesús', 'mediador'],
    reference: '1 Timoteo 2:5',
    text: 'Porque hay un solo Dios, y un solo mediador entre Dios y los hombres, Jesucristo hombre.'
  },
  {
    keywords: ['gloria', 'soli', 'propósito', 'universo'],
    reference: 'Romanos 11:36',
    text: 'Porque de él, y por él, y para él, son todas las cosas. A él sea la gloria por los siglos. Amén.'
  },
  {
    keywords: ['depravación', 'pecado', 'esclavitud'],
    reference: 'Efesios 2:1-2',
    text: 'Y él os dio vida a vosotros, cuando estabais muertos en vuestros delitos y pecados, en los cuales anduvisteis en otro tiempo.'
  },
  {
    keywords: ['elección', 'predestinación', 'soberanía'],
    reference: 'Efesios 1:4-5',
    text: 'Según nos escogió en él antes de la fundación del mundo, para que fuésemos santos y sin mancha delante de él, en amor habiéndonos predestinado para ser adoptados hijos suyos por medio de Jesucristo.'
  },
  {
    keywords: ['pacto', 'alianza', 'obediencia'],
    reference: 'Gálatas 4:4-5',
    text: 'Pero cuando vino el cumplimiento del tiempo, Dios envió a su Hijo, nacido de mujer y nacido bajo la ley, para que redimiese a los que estaban bajo la ley, a fin de que recibiésemos la adopción de hijos.'
  },
  {
    keywords: ['consejeria', 'pastoral', 'corazón'],
    reference: 'Proverbios 4:23',
    text: 'Sobre toda cosa guardada, guarda tu corazón; porque de él mana la vida.'
  },
  {
    keywords: ['idiomas', 'griego', 'hebreo', 'morfología'],
    reference: 'Salmo 119:18',
    text: 'Abre mis ojos, y miraré las maravillas de tu ley.'
  }
];

const DEFAULT_VERSE = {
  reference: 'Colosenses 1:15-17',
  text: 'Él es la imagen del Dios invisible, el primogénito de toda creación. Porque en él fueron creadas todas las cosas, las que están en los cielos y las que están en la tierra.'
};

// Historical scholars for rich commentaries
const THEOLOGIANS_POOL = [
  { author: 'Juan Calvino', text: 'Toda nuestra salvación está contenida en Cristo, y por lo tanto, debemos cuidarnos de no derivar ni una sola gota de ella de cualquier otra fuente.' },
  { author: 'Martín Lutero', text: 'La fe es una confianza viva y audaz en la gracia de Dios, tan segura de la benevolencia divina que un hombre moriría mil veces antes que dudar de ella.' },
  { author: 'Charles Spurgeon', text: 'La soberanía de Dios es el fundamento de toda la teología cristiana; es el ancla de nuestra alma en medio de las pruebas severas del desierto temporal.' },
  { author: 'Agustín de Hipona', text: 'Nos hiciste, Señor, para ti, y nuestro corazón estará eternamente inquieto e insatisfecho hasta que halle su descanso permanente en ti.' },
  { author: 'Dr. R.C. Sproul', text: 'La santidad de Dios es lo que define el carácter de la Deidad. No es solo un atributo más; es el coro eterno que resuena alrededor de Su trono celestial.' },
  { author: 'John Owen', text: 'Toma la fuerza de Cristo para la conquista de tu pecado remanente. Nunca podrás vencer el poder del pecado con resoluciones puramente humanas.' }
];

// Content generator helpers to craft massive detailed theological texts
export function generateLessonForDay(courseId: string, day: number, title: string): Lesson {
  const normalizedTitle = title.toLowerCase();
  
  // 1. Determine appropriate Biblical base verse
  let baseVerse = DEFAULT_VERSE;
  for (const v of VERSE_POOL) {
    if (v.keywords.some(k => normalizedTitle.includes(k))) {
      baseVerse = { reference: v.reference, text: v.text };
      break;
    }
  }

  // 2. Draft dynamic, detailed theological content in Spanish (Academic & Confessional Tone)
  let introPara = '';
  let secondPara = '';
  let keyNotes = '';
  let homeworkDesc = '';
  let examQuestion = '';
  let examOptions: string[] = [];
  let examCorrectIdx = 1;
  let examExplanation = '';

  // Tailor content based on title features
  if (normalizedTitle.includes('fide') || normalizedTitle.includes('fe')) {
    introPara = `La doctrina de **Sola Fide** (Solo por Fe) constituye la articulación fundamental por la cual la Iglesia histórica se sostiene o se derrumba. No se trata simplemente de un asentimiento intelectual abstracto, sino del **instrumento exclusivo** por el cual la justicia forense y perfecta de Jesucristo es imputada legalmente a la cuenta del pecador arrepentido. Bajo esta perspectiva, la fe no es el fundamento meritorio de nuestra salvación, sino la _mano vacía_ que se extiende para asir la gracia prometida en el Redentor.`;
    
    secondPara = `Al desglosar este proceso forense, debemos trazar una frontera estricta entre la **Justificación** e **Imputación**. El creyente común suele confundir la infusión moral (hacerse inherentemente justo) con la declaración legal (ser declarado legalmente absuelto). La Reforma Protestante restableció con claridad quirúrgica que toda justicia humana es insuficiente ante el estándar absoluto de Dios. Es por ello que Cristo cumplió perfectamente la ley de forma activa (obedeciendo) y pasiva (sufriendo la cruz) para acreditarnos Su crédito moral total, de forma gratuita, exclusivamente por medio de la fe personal.`;
    
    keyNotes = `* **Justificación Forense:** Un veredicto legal instantáneo dictado por Dios Padre, no un proceso moral progresivo.\n* **La Fe como Instrumento:** Creemos para ser justificados; la fe misma es un regalo inmerecido del Espíritu Santo, no una obra o mérito de origen natural.\n* **Justicia Imputada:** El favor de Dios se basa en que legalmente vestimos la justicia santa de Jesucristo, no en nuestra obediencia inconstante.`;
    
    homeworkDesc = `Elabore un ensayo expositivo-analítico de 400 palabras en su libreta donde contraste el concepto bíblico de "Justicia Imputada" frente a la doctrina católica-romana tradicional de la "Justicia Infundida". Utilice pasajes de Romanos 3 y 4 en su sustentación.`;
    
    examQuestion = '¿Cuál es la función exacta de la fe en el proceso judicial de nuestra justificación ante Dios?';
    examOptions = [
      'Constituye la buena obra central que merece el favor de Dios.',
      'Es el instrumento exclusivo y canal receptor de la justicia imputada de Cristo.',
      'Representa una fuerza interna con la que pagamos la mitad de nuestra deuda moral.',
      'Es un sentimiento místico que anula la necesidad de que Jesús muriera en la cruz.'
    ];
    examCorrectIdx = 1;
    examExplanation = 'La fe no salva por su propio valor moral; es el canal o instrumento receptáculo a través del cual nos aferramos de manera pasiva y confiada a la gracia y justicia de Cristo.';
  
  } else if (normalizedTitle.includes('scriptura') || normalizedTitle.includes('escritura')) {
    introPara = `El lema formal de la Reforma es **Sola Scriptura**: la creencia inamovible de que solo la Sagrada Escritura (los 66 libros del Antiguo y Nuevo Testamento) constituye la **norma suprema e inerrante** de fe y conducta dentro de la Iglesia de Dios. Esto no descarta la tradición histórica ni los credos clásicos de la Iglesia, sino que los subordina de manera incondicional a la Palabra revelada. La Biblia es autoritativa, suficiente, clara en sus doctrinas básicas de salvación (perspicuidad) y provista de auto-atestiguación divina.`;
    
    secondPara = `Para comprender de forma técnica la suficiencia bíblica, debemos estudiar el concepto del canon. El canon no fue inventado por concilios eclesiásticos del siglo IV; los concilios simplemente _reconocieron_ y _recibieron_ los libros inspirados que poseían la impronta directa del Espíritu Santo y de la delegación apostólica. Desconfiar de la suficiencia bíblica o añadirle revelaciones contemporáneas, visiones emotivas o tradiciones eclesiales jerárquicas equivale a sumergirse en la incertidumbre del relativismo dogmático.`;
    
    keyNotes = `* **Suficiencia Absoluta:** La Biblia contiene todo lo necesario para la salvación de las almas y la edificación doctrinal del creyente.\n* **Norma Normans Non Normata:** La Escritura es la norma de normas que no puede ser normada por ninguna otra autoridad humana o eclesiástica.\n* **Autenticidad del Espíritu:** El testimonio interno del Espíritu Santo convence a la Iglesia de la voz divina en el texto sagrado.`;
    
    homeworkDesc = `Investigue el término teológico latino "Norma Normans Non Normata" y redacte una explicación detallada de cómo este principio de Sola Scriptura protege a la comunidad de creyentes de los abusos de autoridad papal o autoritarismo sectario contemporáneo.`;
    
    examQuestion = '¿Qué significa el principio clásico reformado de "Sola Scriptura" respecto a las otras autoridades del creyente?';
    examOptions = [
      'Que el creyente debe repudiar todo estudio científico, histórico o filosófico secular.',
      'Que la Escritura es la única autoridad inerrante e infalible, a la cual toda tradición y doctrina deben estar totalmente subordinadas.',
      'Que la Iglesia tiene igual rango de infalibilidad que los apóstoles al dictar dogmas.',
      'Que no se necesita ningún maestro, pastor o hermenéutica para comprender la Biblia de forma individual.'
    ];
    examCorrectIdx = 1;
    examExplanation = 'Sola Scriptura no rechaza la tradición o la historia corporativa de la Iglesia, sino que las sitúa bajo la autoridad inerrante, final y absoluta del texto sagrado.';

  } else if (normalizedTitle.includes('gratia') || normalizedTitle.includes('gracia')) {
    introPara = `La teología sistemática confiesa bajo **Sola Gratia** (Solo por Gracia) que la causa eficiente, radical y unilateral de la salvación de un pecador reside exclusivamente en el favor inmerecido y soberano de Dios. Debido al estado de ceguera espiritual total provocado por el pecado original, el libre albedrío del hombre natural y caído no posee la capacidad ni el deseo moral intrínseco de arrepentirse o creer de forma autónoma. Por ende, es Dios quien debe descender a resucitar de forma monergista al rebelde de manera incondicional.`;
    
    secondPara = `La gracia salvífica no es una mera posibilidad pasiva que aguarda a que el pecador asienta para completarse. Al contrario, la gracia es irresistible, transformadora y soberana. Dios el Espíritu Santo, mediante Su gracia eficaz, transforma los corazones de piedra en corazones dóciles de carne, atrayendo de forma dulce pero poderosa al alma hacia los pies de Jesucristo. Cualquier intento doctrinal de formular que el hombre "inicia" su conversión de forma autónoma disminuye la gloria divina y divide el honor de la salvación entre Dios y el pecador.`;
    
    keyNotes = `* **Gracia Unilateral:** La salvación es monergista: responde por completo a la iniciativa de amor y elección divina.\n* **Incapacidad Total:** El hombre caído está espiritualmente muerto, por lo que requiere pasivamente ser resucitado antes de poder creer.\n* **Causa Incondicional:** Dios nos escoge según el afecto de Su voluntad soberana, no en base a méritos o fe previstos en el futuro.`;
    
    homeworkDesc = `Escriba un análisis reflexivo sobre la diferencia teológica fundamental entre una postura Monergista (Dios obra de forma exclusiva en la regeneración) frente a una postura Sinergista (Dios y el hombre cooperan). Presente apoyos doctrinales claros.`;
    
    examQuestion = '¿Cuál es la premisa central aplicable a "Sola Gratia" en la soteriología monergista clásica?';
    examOptions = [
      'La gracia es un incentivo que capacita al hombre natural para que se salve a sí mismo por buenas obras.',
      'La salvación es un acto unilateral y bondadoso del Dios Soberano a favor de pecadores espiritualmente incapaces de elegirle autónomamente.',
      'Dios otorga Su favor exclusivamente a las personas que demuestran tener un intelecto académico superior.',
      'La gracia divina se restringe solo a los santos del Antiguo Testamento.'
    ];
    examCorrectIdx = 1;
    examExplanation = 'El monergismo defiende que como el pecador está muerto espiritualmente, la gracia debe actuar de forma soberana, unilateral y vivificante antes de cualquier respuesta humana.';

  } else if (normalizedTitle.includes('christus') || normalizedTitle.includes('cristo')) {
    introPara = `La confesión de **Solus Christus** (Solo Cristo) proclama que Jesucristo, el Verbo Encarnado, Dios y hombre eterno en Unión Hipostática, es el **único Mediador indispensable y sustituto perfecto** entre la Deidad de Dios tres veces santa y la humanidad pecadora. No hay ningún otro nombre bajo el cielo dado a los hombres en el cual podamos hallar redención. Ningún santo celestial, virgen terrenal o sacerdocio humano puede añadir un solo átomo a la obra perfectísima que Jesús selló al consumar Su sacrificio en el Gólgota.`;
    
    secondPara = `La suficiencia del sacrificio vicario de Jesús reside en Su doble obediencia perfecta: activa y pasiva. Al caminar bajo el sol, guardó cada jota de la Ley, satisfaciendo la exigencia legal del pacto de obras a favor de Su Iglesia escogida. Al ser clavado en el madero, soportó los rigores de la ira judicial de Dios en sustitución legal de aquellos que estaban manchados. Declarar que es necesario recurrir a intermediarios humanos, mediaciones monásticas o ritos mecánicos constituye una afrenta directa al señorío y obra sacerdotal absoluta de Cristo.`;
    
    keyNotes = `* **Único Mediador:** Cristo y nadie más es el intermediario reconciliador ante Dios Padre.\n* **Unión Hipostática:** Jesús posee dos naturalezas perfectas (divina y humana) sin mezcla ni división en una única Persona divina.\n* **Consumación Sacerdotal:** La cruz satisfizo completamente la justicia del Padre, resultando en una redención eterna y terminada.`;
    
    homeworkDesc = `Desarrolle un bosquejo teológico de 5 puntos que demuestre a partir del Nuevo Testamento por qué la mediación accesoria de santos difuntos o sacerdocios adicionales anula la suficiencia del señorío exclusivo de Jesucristo (Solus Christus).`;
    
    examQuestion = '¿Qué doctrina cristológica fundamenta que Jesús sea el único Mediador posible entre Dios y los hombres?';
    examOptions = [
      'Que Jesús era un maestro moral iluminado que nos enseñó un método místico de meditación.',
      'La Unión Hipostática: al ser plenamente Dios y plenamente hombre, une a ambas partes en una sola persona de manera perfecta.',
      'Que fue creado por Dios Padre como el primer ser angélico y más poderoso de la galaxia.',
      'Que Él es un líder estrictamente territorial con poder absoluto solo sobre el área de Jerusalén.'
    ];
    examCorrectIdx = 1;
    examExplanation = 'Al ser plenamente Dios, Su sacrificio posee un valor infinito ante la justicia absoluta; al ser plenamente hombre, representa y sustituye legalmente de forma perfecta a la humanidad.';

  } else {
    // General high-quality theological generator for any title
    introPara = `El estudio de **${title}** reviste una importancia trascendental para la articulación de la sana doctrina de la Iglesia confessional. En las corrientes posmodernas contemporáneas, el pensamiento secular tiende a devaluar la precisión del dogma a favor de un pragmatismo vacío. Sin embargo, la fe bíblica demanda de manera rigurosa que amemos al Señor nuestro Dios con toda nuestra mente y entendimiento, abordando con seriedad hermenéutica cada misterio e instrucción contenida en la revelación apostólica y los pactos bíblicos.`;
    
    secondPara = `Al adentrarnos de forma exegética en esta materia, descubrimos que cada verdad teológica está intrínsecamente entrelazada con el plan global de redención y la edificación del carácter cristiano. No podemos sostener una vida cristiana piadosa si albergamos herejías inconscientes en nuestro pensamiento. Por ello, el análisis exhaustivo de este tema particular enriquece no solo nuestra capacidad intelectual apologética, sino también el altar familiar en el hogar, el orden sagrado del culto, la consejería bíblica aplicada y la pasión misional en el cuerpo eclesiástico.`;
    
    keyNotes = `* **Ortodoxia Teológica:** La correcta enseñanza bíblica guarda al creyente de las corrientes doctrinales de sutil origen secular.\n* **Práctica Piadosa:** Toda doctrina sana impacta de manera directa el carácter diario del discípulo mediante la gracia.\n* **Para la Gloria de Dios:** El fin principal del ministerio académico reside en exaltar la suprema majestad del Trino Creador.`;
    
    homeworkDesc = `Redacte un informe analítico de 350 palabras sobre los aspectos teológicos clave de esta lección y describa una aplicación práctica directa de esta disciplina para el fortalecimiento espiritual del hogar o de su iglesia local.`;
    
    examQuestion = `¿Cuál es el fin último de la capacitación bíblica y el análisis expositivo de este tema doctrinal?`;
    examOptions = [
      'Llenar la mente de conceptos fríos para debatir y demostrar superioridad intelectual arrogante.',
      'Glorificar a Dios mediante el cultivo de una mente sumisa a la verdad bíblica, promoviendo la santidad en Cristo por la gracia.',
      'Establecer doctrinas nuevas y originales que contradigan lo enseñado por los reformadores clásicos.',
      'Lograr la salvación a través del esfuerzo y aprendizaje intelectual humano autónomo.'
    ];
    examCorrectIdx = 1;
    examExplanation = 'El estudio teológico histórico tiene como fin postrero la piedad sincera, la gloria del Señor y la edificación humilde de la Iglesia bajo la soberanía de la Palabra inerrante.';
  }

  // 3. Selection of historical theologians and their commentary quotes
  const theologianIdx1 = (day * 3 + 2) % THEOLOGIANS_POOL.length;
  const theologianIdx2 = (day * 7 + 5) % THEOLOGIANS_POOL.length;
  
  const commentaries = [
    THEOLOGIANS_POOL[theologianIdx1],
    THEOLOGIANS_POOL[theologianIdx2 !== theologianIdx1 ? theologianIdx2 : (theologianIdx2 + 1) % THEOLOGIANS_POOL.length]
  ];

  // 4. Verification reinforcement verses (Versículos Complementarios)
  const verseIdx1 = (day * 13 + 1) % VERSE_POOL.length;
  const verseIdx2 = (day * 17 + 3) % VERSE_POOL.length;
  
  const mainVerseObj = {
    reference: baseVerse.reference,
    text: baseVerse.text,
    readingTimeMinutes: 5,
    relevance: `Versículo Principal de la Clase — Fundamento bíblico medular sobre ${title}.`
  };

  const complementaryVerses = [
    { 
      reference: VERSE_POOL[verseIdx1].reference, 
      text: VERSE_POOL[verseIdx1].text,
      readingTimeMinutes: 4,
      relevance: `Pasaje complementario 1: Refuerza la perspectiva doctrinal del tema en el contexto del canon.`
    },
    { 
      reference: VERSE_POOL[verseIdx2].reference, 
      text: VERSE_POOL[verseIdx2].text,
      readingTimeMinutes: 4,
      relevance: `Pasaje complementario 2: Ilustra la aplicación práctica y la armonía con la sana doctrina.`
    }
  ];

  // Total reading time calculation (Garantizado <= 20 min de lectura bíblica por clase)
  const totalBibleReadingMinutes = mainVerseObj.readingTimeMinutes + 
    complementaryVerses.reduce((acc, v) => acc + (v.readingTimeMinutes || 3), 0); // 13 min total

  const bibleReadingPlan = {
    totalReadingTimeMinutes: totalBibleReadingMinutes, // 13 mins (Límite max: 20 min)
    recommendedPassage: `${mainVerseObj.reference} & pasajes clave en ${complementaryVerses[0].reference}`,
    mainVerse: mainVerseObj,
    complementaryVerses
  };

  const theologicalExegesis = {
    title: `Exégesis y Desarrollo Teológico del Versículo Principal (${mainVerseObj.reference})`,
    mainTheme: title,
    historicalGrammaticalContext: `El pasaje de ${mainVerseObj.reference} se sitúa dentro de un momento crucial de la revelación bíblica. El autor sagrado emplea términos gramaticales precisos en la lengua original para transmitir verdades inamovibles. La estructura sintáctica del pasaje destaca la iniciativa divina, la coherencia del pacto y el marco histórico en el que los primeros oyentes recibieron la palabra de Dios sin distorsión.`,
    theologicalAnalysis: `Al analizar teológicamente ${mainVerseObj.reference} en conexión con "${title}", reconocemos que Dios revela Su voluntad soberana de forma clara. La doctrina contenida en este pasaje resalta que la salvación, la santidad y la verdad revelada son de origen exclusivamente divino (monergismo). Este versículo destruye cualquier pretensión de justicia propia o especulación filosófica humana, articulando el dogma cristiano con rigor exegetico.`,
    christocentricFocus: `Toda la Escritura apunta en última instancia a Jesucristo, y ${mainVerseObj.reference} no es la excepción. Este pasaje encuentra su cumplimiento supremo en la persona y obra del Mesías, quien como el Verbo encarnado satisfizo las demandas del Padre, abrió el camino de la gracia y se constituyó en el único Mediador entre Dios y los hombres.`,
    doctrinalApplication: `Para el creyente y el estudiante de teología, la verdad de ${mainVerseObj.reference} exige una respuesta de fe obediente, humildad intelectual y adoración sincera. Nos motiva a proclamar la verdad con denuedo pastoral, defender la sana doctrina contra el error sutil y modelar una piedad santificada que dé toda la gloria al Dios Trino.`
  };

  // 5. Original terms selection for languages lab
  const ORIGINAL_TERMS_BANK = [
    { term: 'חֶסֶד', transliteration: 'Hesed', language: 'Hebreo' as const, strong: 'H2617', meaning: 'Amor pactual inquebrantable, gracia leal y misericordia soberana', context: 'Define la fidelidad irrevocable de Yahvé hacia Su pueblo elegido a pesar de sus infidelidades.' },
    { term: 'δικαιοσύνη', transliteration: 'Dikaiosýnē', language: 'Griego' as const, strong: 'G1343', meaning: 'Justicia judicial, rectitud perfecta conforme a la ley de Dios', context: 'Término forense central en Romanos y Gálatas para explicar la justificación por la fe.' },
    { term: 'θεόπνευστος', transliteration: 'Theópneustos', language: 'Griego' as const, strong: 'G2315', meaning: 'Exhalado o soplado por Dios, de origen e inspiración divina', context: 'Utilizado en 2 Timoteo 3:16 para fundamentar la autoridad e inerrancia de las Sagradas Escrituras.' },
    { term: 'בְּרֵאשִׁית', transliteration: 'Bərē’šît', language: 'Hebreo' as const, strong: 'H7225', meaning: 'En el principio, cabeza o primicia de una serie temporal', context: 'Apertura soberana de Génesis 1:1 donde Dios crea todo de la nada (creatio ex nihilo).' },
    { term: 'λόγος', transliteration: 'Lógos', language: 'Griego' as const, strong: 'G3056', meaning: 'La Palabra viva, el Verbo eterno, la razón divina encarnada', context: 'En Juan 1:1 identifica a Jesucristo como coeterno y consustancial con el Padre celestial.' },
    { term: 'πνεῦμα', transliteration: 'Pneûma', language: 'Griego' as const, strong: 'G4151', meaning: 'Viento, aliento, el Espíritu Santo de Dios', context: 'Agente divino regenerador que vivifica al pecador y sella al creyente para redención.' },
    { term: 'שָׁלוֹם', transliteration: 'Šālôm', language: 'Hebreo' as const, strong: 'H7965', meaning: 'Paz integral, reconciliación pactual y plenitud del Reino', context: 'Describe la reconciliación del pecador justificado con el Dios Santo a través de la cruz.' },
    { term: 'ἅγιος', transliteration: 'Hágios', language: 'Griego' as const, strong: 'G40', meaning: 'Santo, apartado radicalmente de lo común para el servicio del Rey', context: 'Llamado a la pureza y santificación progresiva de la Iglesia como pueblo de Dios.' }
  ];

  const term1 = ORIGINAL_TERMS_BANK[(day * 3) % ORIGINAL_TERMS_BANK.length];
  const term2 = ORIGINAL_TERMS_BANK[(day * 3 + 1) % ORIGINAL_TERMS_BANK.length];
  const originalTerms = [term1, term2];

  // 6. Build Content blocks with interactive checkpoint
  const blocks: ContentBlock[] = [
    {
      type: 'note',
      id: `${courseId}-day-${day}-b-reading`,
      content: `**Plan de Lectura Bíblica Dirigido (~${totalBibleReadingMinutes} min | Límite Máximo: 20 min):**\nLea con atención devocional el **Versículo Principal (${mainVerseObj.reference})** y los pasajes complementarios (**${complementaryVerses.map(v => v.reference).join(', ')}**).\n\n**Preguntas Clave de Reflexión Teológica:**\n1. ¿De qué forma pone en relieve el versículo principal (${mainVerseObj.reference}) el tema de la clase?\n2. ¿Cómo conectan los versículos complementarios con la doctrina expuesta?\n3. ¿Qué oraciones de gratitud y compromiso suscita este pasaje para su vida devocional?`
    },
    {
      type: 'text',
      id: `${courseId}-day-${day}-b-intro`,
      content: introPara
    },
    {
      type: 'control',
      id: `${courseId}-day-${day}-b-checkpoint`,
      question: {
        id: `cp-${courseId}-day-${day}`,
        question: `Punto de Control Exegético: En base a lo analizado sobre "${title}" y el versículo principal ${mainVerseObj.reference}, ¿cuál es el principio hermenéutico que se debe salvaguardar rigurosamente?`,
        options: [
          'Interpretar el texto bíblico guiándose por las emociones del momento y el relativismo moral contemporáneo.',
          'Extraer el significado que el Espíritu inspiró al autor original considerando la gramática, el contexto histórico y la analogía de la fe.',
          'Asumir que las doctrinas históricas son anticuadas y deben reemplazarse por modas culturales.',
          'Aislar un versículo de su contexto inmediato para defender una opinión personal previa.'
        ],
        correctAnswerIndex: 1,
        explanation: 'La exégesis bíblica auténtica somete al intérprete a la autoridad del texto en su lengua original, contexto histórico y armonía con toda la Escritura revelada.'
      }
    },
    {
      type: 'text',
      id: `${courseId}-day-${day}-b-second`,
      content: secondPara
    },
    {
      type: 'note',
      id: `${courseId}-day-${day}-b-notes`,
      content: `**Claves para su Libreta Teológica (Cosas para Anotar):**\n${keyNotes}\n\n_Dedique un tiempo de oración postrado pidiendo al Espíritu Santo que selle permanentemente estas verdades en su libreta de discipulado personal._`
    }
  ];

  // 7. Build Final Exam structure with multi-question examination
  const finalExam: ExamQuestion[] = [
    {
      id: `f-${courseId}-day-${day}-q1`,
      question: examQuestion,
      options: examOptions,
      correctAnswerIndex: examCorrectIdx,
      explanation: examExplanation
    },
    {
      id: `f-${courseId}-day-${day}-q2`,
      question: `¿Cuál es el peligro de interpretar "${title}" sin considerar la analogía de la fe (Scriptura sui ipsius interpres)?`,
      options: [
        'Desarrollar un exceso de piedad y devoción bíblica sincera en la oración.',
        'Caer en herejías doctrinales, eiségesis distorsionada y contradicciones teológicas.',
        'Aprender demasiado sobre las lenguas bíblicas hebrea y griega.',
        'Obtener una comprensión demasiado profunda y madura de las Escrituras.'
      ],
      correctAnswerIndex: 1,
      explanation: 'Cuando se aísla un pasaje de la totalidad del canon bíblico, se cae en el error de la eiségesis y se producen distorsiones doctrinales que dañan a la iglesia.'
    }
  ];

  // 8. Assemble the final cohesive Lesson structure
  return {
    id: `${courseId}-day-${day}`,
    day,
    title,
    blocks,
    finalExam,
    baseVerse: mainVerseObj,
    bibleReadingTimeMinutes: totalBibleReadingMinutes,
    bibleReadingPlan,
    theologicalExegesis,
    commentaries,
    verses: complementaryVerses,
    estimatedMinutes: 45,
    objectives: [
      `Dominar los principios exegéticos y teológicos fundamentales de ${title}`,
      `Analizar las raíces en idiomas bíblicos originales y sus implicaciones doctrinales`,
      `Articular una aplicación cristocéntrica y pastoral aplicable a la vida personal y eclesial`
    ],
    originalTerms,
    hermeneuticalExercise: {
      title: `Laboratorio Inductivo Aplicado: ${title}`,
      observation: `Examine detenidamente ${mainVerseObj.reference}. Identifique los verbos de acción, los pronombres y los conectores causales. Observe la progresión del pensamiento del autor inspirado.`,
      historicalContext: `Considere las circunstancias del pueblo de Dios al recibir esta revelación: el pacto vigente, los desafíos culturales circundantes y la necesidad de fidelidad al Dios vivo.`,
      christocentricFocus: `Descubra la conexión de esta doctrina con la persona y obra salvífica de Jesucristo. ¿De qué manera esta verdad exalta Su sacrificio, Su sacerdocio eterno o Su gloria venidera?`,
      practicalApplication: `Traduzca esta verdad en piedad práctica: renueve su devocional diario, corrija desvíos en el carácter y sirva con mayor denuedo y humildad en su iglesia local.`
    },
    assignments: [
      { id: `t-${courseId}-day-${day}-asg`, description: homeworkDesc }
    ]
  };
}
