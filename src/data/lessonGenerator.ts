import { Lesson, ExamQuestion, ContentBlock } from '../types';

// Precise pool of standard, highly accurate Biblical verses for theological reinforcement
const VERSE_POOL = [
  {
    keywords: ['ontología', 'ontologia', 'revelación', 'revelacion', 'ser'],
    reference: 'Éxodo 3:14',
    text: 'Y respondió Dios a Moisés: YO SOY EL QUE SOY. Y dijo: Así dirás a los hijos de Israel: YO SOY me envió a vosotros.'
  },
  {
    keywords: ['fide', 'fe', 'justificación', 'salvación'],
    reference: 'Gálatas 2:16',
    text: 'Sabiendo que el hombre no es justificado por las obras de la ley, sino por la fe de Jesucristo, nosotros también hemos creído en Jesucristo, para ser justificados por la fe de Cristo y no por las obras de la ley, por cuanto por las obras de la ley nadie será justificado.'
  },
  {
    keywords: ['scriptura', 'escritura', 'palabra', 'biblia', 'inerrancia'],
    reference: '2 Timoteo 3:16-17',
    text: 'Toda la Escritura es inspirada por Dios, y útil para enseñar, para redargüir, para corregir, para instruir en justicia, a fin de que el hombre de Dios sea perfecto, enteramente preparado para toda buena obra.'
  },
  {
    keywords: ['gratia', 'gracia', 'elección', 'efesios'],
    reference: 'Efesios 2:8-9',
    text: 'Porque por gracia sois salvos por medio de la fe; y esto no de vosotros, pues es don de Dios; no por obras, para que nadie se gloríe.'
  },
  {
    keywords: ['christus', 'cristo', 'jesús', 'mediador', 'logos'],
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
  { 
    author: 'Juan Calvino', 
    text: 'Toda nuestra salvación está contenida en Cristo, y por lo tanto, debemos cuidarnos de no derivar ni una sola gota de ella de cualquier otra fuente. En Él se hallan acumulados todos los tesoros de la sabiduría y del conocimiento.' 
  },
  { 
    author: 'Martín Lutero', 
    text: 'La fe es una confianza viva y audaz en la gracia de Dios, tan segura de la benevolencia divina que un hombre moriría mil veces antes que dudar de ella. Esta fe transforma el corazón y nos renueva por completo.' 
  },
  { 
    author: 'Charles Spurgeon', 
    text: 'La soberanía de Dios es el fundamento de toda la teología cristiana; es el ancla de nuestra alma en medio de las pruebas severas del desierto temporal. Si Dios no reinara de manera absoluta, la fe carecería de certidumbre.' 
  },
  { 
    author: 'Agustín de Hipona', 
    text: 'Nos hiciste, Señor, para ti, y nuestro corazón estará eternamente inquieto e insatisfecho hasta que halle su descanso permanente en ti. La verdad no se inventa; se recibe mediante la gracia divina.' 
  },
  { 
    author: 'Dr. R.C. Sproul', 
    text: 'La santidad de Dios es lo que define el carácter de la Deidad. No es solo un atributo más; es el coro eterno que resuena alrededor de Su trono celestial y el fundamento de la verdadera reverencia.' 
  },
  { 
    author: 'John Owen', 
    text: 'Toma la fuerza de Cristo para la conquista de tu pecado remanente. Nunca podrás vencer el poder del pecado con resoluciones puramente humanas; solo el Espíritu por la Palabra opera mortificación real.' 
  },
  { 
    author: 'Herman Bavinck', 
    text: 'Dios es el ser absoluto que se revela a Sí mismo de manera voluntaria, inerrante e inteligible a través de Su Palabra viva y escrita. Toda verdadera dogmática es teocéntrica.' 
  },
  { 
    author: 'Cornelius Van Til', 
    text: 'No hay hecho neutral en el universo de Dios. Todo conocimiento presupone la autodeterminación y revelación previa del Trino Creador. La razón humana no es juez de Dios, sino Su sierva.' 
  },
  {
    author: 'Jonathan Edwards',
    text: 'Las cosas divinas tienen una dulzura y gloria insuperable que convence al alma no por meros argumentos abstractos, sino por una percepción espiritual iluminada por el Espíritu Santo.'
  },
  {
    author: 'Matthew Henry',
    text: 'Las Escrituras fueron dadas no para aumentar nuestro orgullo intelectual, sino para guiar nuestros pasos en santidad y conducirme a la adoración humilde al Creador.'
  }
];

export function generateLessonForDay(courseId: string, day: number, title: string, courseType?: string): Lesson {
  const normalizedTitle = title.toLowerCase();
  
  const isDoctorate = courseType === 'DOCTORADO' || courseId.startsWith('doc-');
  const isMaster = courseType === 'MAESTRIA' || courseId.startsWith('mae-');
  const isLicentiate = courseType === 'LICENCIATURA' || courseId.startsWith('lic-');

  // 1. Determine appropriate Biblical base verse
  let baseVerse = DEFAULT_VERSE;
  for (const v of VERSE_POOL) {
    if (v.keywords.some(k => normalizedTitle.includes(k))) {
      baseVerse = { reference: v.reference, text: v.text };
      break;
    }
  }

  // Handle specific "Ontología y Revelación" requested by the user
  const isOntologyClass = normalizedTitle.includes('ontología') || normalizedTitle.includes('ontologia') || normalizedTitle.includes('revelación') || normalizedTitle.includes('revelacion');

  if (isOntologyClass && isDoctorate) {
    baseVerse = {
      reference: 'Éxodo 3:14',
      text: 'Y respondió Dios a Moisés: YO SOY EL QUE SOY. Y dijo: Así dirás a los hijos de Israel: YO SOY me envió a vosotros.'
    };
  }

  // Pick historical theologians for quotes inside content blocks
  const theo1 = THEOLOGIANS_POOL[(day * 3) % THEOLOGIANS_POOL.length];
  const theo2 = THEOLOGIANS_POOL[(day * 5 + 1) % THEOLOGIANS_POOL.length];
  const theo3 = THEOLOGIANS_POOL[(day * 7 + 2) % THEOLOGIANS_POOL.length];

  // 2. Draft massive, highly detailed multi-block theological content in Spanish with biblical texts and historic quotes
  let block1 = '';
  let block2 = '';
  let block3 = '';
  let block4 = '';
  let block5 = '';
  let keyNotes = '';
  let homeworkDesc = '';
  let examQuestion = '';
  let examOptions: string[] = [];
  let examCorrectIdx = 1;
  let examExplanation = '';

  if (isDoctorate) {
    if (isOntologyClass) {
      block1 = `### 1. Prolegómenos Ontológicos: El Ser de Dios (*De Deo Uno*) y la Distinción Creador-Creatura

En el ámbito de la investigación doctoral en Teología Sistemática y Dogmática, el estudio de **Ontología y Revelación** constituye la piedra angular sobre la cual se erige toda la arquitectura de la fe confesional. No es posible abordar la Revelación divina sin antes haber analizado de forma rigurosa la categoría del **Ser Absoluto de Dios** (*De Deo Uno*) y la insuperable **Distinción Creador-Creatura** (*Distinctio inter Creatorem et Creaturam*).

A diferencia de las ontologías filosóficas seculares y de las especulaciones de la metafísica pagana (como el motor inmóvil aristotélico o el "Uno" emanacionista de Plotino), la ontología bíblica afirma que Dios es **Triuno, personal, absoluto e infinitamente trascendente en Su Aseidad** (*Aseitas Dei*: Dios posee vida e independencia causal absoluta en Sí mismo). Dios no es un "ente" más dentro de la categoría general del 'ser', sino la Fuente Trino-Personal increada de todo ser (*Ipsum Esse Subsistens*).

> 📖 **Fundamento Bíblico Inerrante:**
> *"Y respondió Dios a Moisés: YO SOY EL QUE SOY. Y dijo: Así dirás a los hijos de Israel: YO SOY me envió a vosotros."* — **Éxodo 3:14 (RVR1960)**

> ✍️ **Comentario Teológico Histórico (${theo1.author}):**
> *"${theo1.text}"*
> — **${theo1.author}**

#### Puntos Clave Explicativos para Comprensión Histórico-Dogmática:
* **Aseidad y Auto-existencia (*Aseitas*):** Dios no tiene causa externa; Su ser no está determinado ni condicionado por el orden creado.
* **Actus Purus y Simplicidad Divina:** Dios no es una composición de partes divididas, atributos agregados o potencialidades no desarrolladas. Él es acto puro de ser infinito.
* **Distinción Radical Creador-Creatura:** La brecha metafísica entre el Creador increado y la creación finita e contingente es cualitativa y absoluta, imposibilitando cualquier panteísmo o panenteísmo.`;

      block2 = `### 2. La Condescendencia Divina y la Mecánica de la Revelación Especial (*Revelatio Specialis*)

Dada la trascendencia infinita de la Deidad y la finitud contingente de la criatura (agravada por la ceguera noética provocada por la Caída, *usus noeticus peccati*), la criatura es incapaz de ascender intelectualmente al conocimiento de Dios por sus propias fuerzas autónomas. La epistemología teológica sostiene, por ende, que el conocimiento verdadero de Dios es posible **únicamente si Dios se revela a Sí mismo de forma condescendiente** (*condescendio divina*).

> 📖 **Texto Bíblico Relevante:**
> *"Dios, habiendo hablado muchas veces y de muchas maneras en otro tiempo a los padres por los profetas, en estos postreros días nos ha hablado por el Hijo, a quien constituyó heredero de todo, y por quien asimismo hizo el universo."* — **Hebreos 1:1-2 (RVR1960)**

> ✍️ **Comentario de los Teólogos Históricos (${theo2.author}):**
> *"${theo2.text}"*
> — **${theo2.author}**

#### Desglose de los Modos de Revelación:
1. **Revelación General (*Revelatio Generalis*):** Transmitida a través del orden cósmico creado, la providencia y la conciencia humana (*"Los cielos cuentan la gloria de Dios, y el firmamento anuncia la obra de sus manos"*, Salmo 19:1; Romanos 1:19-20). Aunque es clara y deja al pecador sin excusa moral ante el tribunal divino, no provee el conocimiento salvífico ni el medio de reconciliación pactual.
2. **Revelación Especial (*Revelatio Specialis*):** La comunicación voluntaria, articulada, proposicional y salvífica de Dios a través de eventos redentores en la historia, la teofanía, la profecía, la teopneustía escritural (*theópneustos*, 2 Timoteo 3:16) y, de forma suprema e insuperable, en la **Encarnación del Logos** (Juan 1:14).`;

      block3 = `### 3. Exégesis Filológica y Sintaxis en Lenguas Originales (Hebreo BHS y Griego Nestlé-Aland 28ª ed.)

El fundamento exegético de la Ontología y Revelación requiere un escrutinio directo de la tradición manuscrita y la morfología en sus idiomas bíblicos originales:

> 📖 **Texto Bíblico en Griego y Español (Juan 1:1-3, 14):**
> *"Ἐν ἀρχῇ ἦν ὁ Λόγος, καὶ ὁ Λόγος ἦν πρὸς τὸν Θεόν, καὶ Θεὸς ἦν ὁ Λόγος. [...] Y aquel Verbo fue hecho carne, y habitó entre nosotros (y vimos su gloria, gloria como del unigénito del Padre), lleno de gracia y de verdad."* — **Juan 1:1, 14 (RVR1960 & NA28)**

> ✍️ **Comentario Académico Confesional (${theo3.author}):**
> *"${theo3.text}"*
> — **${theo3.author}**

#### Análisis Filológico Avanzado:
* **אֶהְיֶה אֲשֶׁר אֶהְיֶה (*‘Ehyeh ‘ăšer ‘Ehyeh*) en Éxodo 3:14:** La forma verbal *אֶהְיֶה* es un imperfecto Qal de la raíz *hāyāh* ("ser" o "existir"). La construcción es una fórmula de paronomasia intensiva o idéntica (*idem per idem*), empleada en el semítico antiguo para expresar la inmutabilidad, autosuficiencia, fidelidad pactual y libertad absoluta del Nombre Sagrado (**YHWH**).
* **Ἐν ἀρχῇ ἦν (*En archē ēn*) en Juan 1:1:** El uso del verbo imperfecto *ēn* (en contraste con el aoristo *egeneto* de Juan 1:14) denota la existencia continua e increada del Verbo previa a la creación del tiempo.
* **Θεὸς ἦν ὁ Λόγος (*Theos ēn ho Logos*):** La ausencia del artículo definido antes de *Theos* en posición prenuclear enfatiza la **naturaleza sustancial y esencia divina** del Logos, refutando tanto el arrianismo como el modalismo.`;

      block4 = `### 4. Controversias Filosófico-Dogmáticas y Refutación de la Crítica Moderna

La investigación doctoral exige el escrutinio académico y la refutación analítica de los paradigmas modernos y posmodernos que han intentado socavar la ontología ortodoxa y la inerrancia de la Revelación:

> 📖 **Texto Bíblico de Apologética y Inerrancia:**
> *"Toda la Escritura es inspirada por Dios, y útil para enseñar, para redargüir, para corregir, para instruir en justicia, a fin de que el hombre de Dios sea perfecto, enteramente preparado para toda buena obra."* — **2 Timoteo 3:16-17 (RVR1960)**

#### Análisis Crítico de Corrientes Contrapuestas:
1. **La Grieta Epistemológica de Immanuel Kant:** Kant postuló la separación entre el mundo *fenómeno* (lo perceptible) y el *noúmeno* (la realidad en sí / Dios).
   * *Refutación Presuposicional Reformada (Cornelius Van Til / Herman Bavinck):* La Revelación Especial rompe la brecha kantiana porque Dios Todopoderoso se revela con poder en el espacio-tiempo e interpreta soberanamente Su propia creación.
2. **La Reducción Subjetivista de Schleiermacher:** Redujo la religión a un "sentimiento de dependencia absoluta".
   * *Refutación:* Subordinar la verdad dogmática a la psicología humana destruye la verdad objetiva de la fe y sustituye el Teocentrismo por el antropocentrismo.
3. **El Inmanentismo Existencial de Karl Barth:** Afirmó que la Biblia es solo un "testimonio humano" que *llega a ser* Palabra de Dios en el encuentro subjetivo.
   * *Refutación Confesional:* La Escritura **ES** en sí misma la Palabra inspirada, inerrante e infalible de Dios (*verbal fully inspired*), independientemente de la respuesta subjetiva del lector.`;

      block5 = `### 5. Síntesis Doctoral, Metodología de Disertación y Cuestiones Disputadas (*Quaestiones Disputatae*)

Para el estudiante en el nivel de **Doctorado en Investigación Teológica**, esta materia le capacita para formular hipótesis de disertación doctoral que defiendan la verdad bíblica con la máxima calidad académica.

> 📖 **Texto Bíblico del Propósito Final:**
> *"Porque de él, y por él, y para él, son todas las cosas. A él sea la gloria por los siglos. Amén."* — **Romanos 11:36 (RVR1960)**

> ✍️ **Reflexión Histórica de Cierre (Agustín de Hipona):**
> *"La fe busca el entendimiento (Fides quaerens intellectum). No entendemos para creer, sino que creemos para poder entender la profundidad inagotable de la verdad revelada por Dios."* — **Agustín de Hipona**

#### Cuestiones Disputadas para su Monografía Doctoral:
1. **La Analogia Fidei vs. Analogia Entis:** Argumente por qué la Teología Reformada rechaza la *analogia entis* en favor de la *analogia fidei* (*Scriptura sui ipsius interpres*).
2. **Inerrancia Proposicional:** Formule una crítica exegética a los intentos de acomodación posmoderna (Declaración de Chicago sobre la Inerrancia Bíblica).
3. **Impacto de las Lenguas Originales:** Demuestre cómo el análisis del hebreo y griego previene la infiltración de presuposiciones filosóficas seculares.`;

    } else {
      // General Doctorate Generator with expanded biblical texts & historic quotes
      block1 = `### 1. Marco Epistemológico, Prolegómenos y Axiomas Doctrinales de ${title}

En el nivel de **Doctorado en Investigación Teológica y Hermenéutica**, el escrutinio de **${title}** exige trascender la simple divulgación para adentrarse en la investigación epistemológica y presuposicional de alta densidad. Todo análisis teológico de nivel doctoral reconoce que no existen axiomas neutrales en la investigación de las Escrituras: la revelación escrita divinamente constituye la *norma normans non normata* (la norma de normas que no puede ser normada por ninguna otra instancia terrenal).

> 📖 **Texto Bíblico Base:**
> *"Pero el hombre natural no percibe las cosas que son del Espíritu de Dios, porque para él son locura, y no las puede entender, porque se han de discernir espiritualmente."* — **1 Corintios 2:14 (RVR1960)**

> ✍️ **Comentario Teológico Histórico (${theo1.author}):**
> *"${theo1.text}"*
> — **${theo1.author}**

#### Explicación Teológica de los Puntos Fundamentales:
* **Presuposición Teocéntrica:** La verdad teológica no es una construcción cultural ni un consenso pragmático humano, sino la automanifestación divina inerrante.
* **Coherencia Canonica:** Las Escrituras poseen una armonía orgánica que exige ser interpretada a través de la analogía de la fe (*Scriptura sui ipsius interpres*).
* **Rigor Epistemológico:** La erudición doctoral somete todo método analítico al señorío de Jesucristo y la inerrancia de las Sagradas Escrituras.`;

      block2 = `### 2. Exégesis Filológica y Sintaxis Morfológica en Lenguas Originales (Hebreo y Griego)

El rigor científico en la teología doctoral demanda el estudio directo de los textos bíblicos en la Biblia Hebraica Stuttgartensia (BHS) y el Nuevo Testamento Griego (Nestlé-Aland 28ª ed.). En el estudio de **${title}**, el análisis no se limita a traducciones secundarias, sino que examina la sintaxis y la morfología del texto original.

> 📖 **Texto Bíblico de Exégesis:**
> *"Lámpara es a mis pies tu palabra, y lumbrera a mi camino. Abre mis ojos, y miraré las maravillas de tu ley."* — **Salmo 119:105, 18 (RVR1960)**

> ✍️ **Comentario Histórico de Exégesis (${theo2.author}):**
> *"${theo2.text}"*
> — **${theo2.author}**

#### Elementos del Análisis Filológico:
1. **Estructura Sintáctica y Cláusulas:** Identificación de verbos de acción, conectores pactuales, construcciones condicionales y quiasmos estructurales que determinan el énfasis del autor inspirado.
2. **Semántica y Campo Léxico:** Rastreo de la raíz etimológica, variantes textuales en los manuscritos antiguos (Códice Sinaítico, Vaticano, Alejandrino) y uso en la Septuaginta (LXX).
3. **Morfología Verbal:** Análisis del tiempo, modo, voz y aspecto verbal para fundamentar la exégesis dogmática.`;

      block3 = `### 3. Dogmática Comparada, Historia de los Dogmas y Refutación de la Crítica Modernista

A lo largo de la historia de la Iglesia, la doctrina de **${title}** ha sido objeto de intensos debates eclesiales y ataques de corrientes filosóficas contrarias. La investigación doctoral evalúa la evolución histórica y refuta los errores críticos.

> 📖 **Texto Bíblico Apologético:**
> *"Amados, por la gran solicitud que tenía de escribiros acerca de nuestra común salvación, me ha sido necesario escribiros exhortándoos que contendáis ardientemente por la fe que ha sido una vez dada a los santos."* — **Judas 1:3 (RVR1960)**

> ✍️ **Comentario Histórico (${theo3.author}):**
> *"${theo3.text}"*
> — **${theo3.author}**

#### Desarrollo Histórico y Refutación de Errores:
* **Desarrollo Patrístico y Escolástico:** Las formulaciones tempranas en los Padres Apostólicos, la consolidación en los Concilios Ecuménicos (Nicea, Calcedonia) y el refinamiento en la Escolástica Reformada.
* **Diálogo Crítico con la Modernidad:** Confrontación directa con el deconstructivismo posmoderno, el racionalismo ilustrado, el empirismo secular y la teología liberal.
* **Refutación Presuposicional:** Demostración de cómo las falacias de la crítica secular destruyen la coherencia interna de las Escrituras al presuponer un universo sin Dios.`;

      block4 = `### 4. Análisis de Fuentes Primarias y Símbolos de Fe Confesionales

El método de investigación doctoral exige la fundamentación en fuentes primarias documentales y confesionales. En esta lección se examinan los credos eclesiales y los documentos históricos.

> 📖 **Texto Bíblico de Confesión y Firmeza:**
> *"Retén la forma de las sanas palabras que de mí oíste, en la fe y amor que es en Cristo Jesús. Guarda el buen depósito por el Espíritu Santo que habita en nosotros."* — **2 Timoteo 1:13-14 (RVR1960)**

#### Documentos Confesionales de Referencia:
1. **Credos Ecuménicos:** El Símbolo de los Apóstoles, el Credo Niceno-Constantinopolitano y la Definición de Calcedonia como murallas contra la herejía.
2. **Confesiones Reformadas Históricas:** La Confesión de Fe de Westminster (1646), los Cánones de Dort (1618-1619) y el Catecismo de Heidelberg (1563).
3. **Escritos Magisteriales:** Tratados teológicos clásicos (Juan Calvino, Agustín de Hipona, Herman Bavinck, Benjamin Warfield, Geerhardus Vos).`;

      block5 = `### 5. Síntesis Doctoral, Cuestiones Disputadas (*Quaestiones Disputatae*) y Plan de Disertación

La culminación del módulo doctoral conduce a la síntesis analítica y al planteamiento de proyectos de investigación original que aporten luz al magisterio de la Iglesia contemporánea:

> 📖 **Texto Bíblico Final:**
> *"Sino santificad a Dios el Señor en vuestros corazones, y estad siempre preparados para presentar defensa con mansedumbre y reverencia ante todo el que os demande razón de la esperanza que hay en vosotros."* — **1 Pedro 3:15 (RVR1960)**

#### Plan para la Investigación Doctoral:
* **Cuestiones Disputadas (*Quaestiones Disputatae*):** Identificación de dilemas complejos en la hermenéutica contemporánea relacionados con **${title}**.
* **Aplicación al Magisterio Eclesiástico:** Transmisión del rigor académico a la predicación expositiva, la docencia en seminarios teológicos y la apología de la fe.`;
    }

    keyNotes = `* **Epistemología Doctoral:** La revelación divina en las Escrituras es el axioma autoritativo e inerrante (*norma normans non normata*) para todo conocimiento teológico verdadero.\n* **Filología y Exégesis:** Análisis sintáctico y morfológico riguroso del texto en sus lenguas originales (Hebreo BHS y Griego Nestlé-Aland 28ª ed.).\n* **Comentarios Históricos:** Respaldo en la tradición patrística y confesional (Agustín, Calvino, Lutero, Spurgeon, Sproul, Bavinck).`;
    
    homeworkDesc = `Redacte un ensayo de investigación doctoral de 700 palabras analizando críticamente el desarrollo histórico y exegético de **${title}**. Incluya citas de fuentes primarias (Credos ecuménicos, Confesión de Westminster o Cánones de Dort) y pasajes bíblicos clave.`;
    
    examQuestion = `En la investigación doctoral avanzada sobre "${title}", ¿cuál es la metodología hermenéutica irrenunciable para determinar la verdad dogmática?`;
    examOptions = [
      'Subordinar el texto bíblico a las modas filosóficas y sociológicas postseculares de cada siglo.',
      'Someter toda hipótesis al método histórico-gramatical, la analogía de la fe y la inerrancia de las Escrituras inspiradas por Dios.',
      'Aislar pasajes bíblicos en traducciones paráfrasis sin considerar la sintaxis griega o hebrea original.',
      'Depender del consenso pragmático secular sin apelar a la revelación escrita divinamente.'
    ];
    examCorrectIdx = 1;
    examExplanation = 'El Doctorado Teológico postula que la verdadera erudición confiesa la inerrancia bíblica, utilizando las herramientas críticas para exponer el sentido inspirado por el Espíritu Santo.';

  } else if (isMaster) {
    block1 = `### 1. Prolegómenos de Posgrado y Articulación Dogmática de ${title}

En el programa de **Maestría en Teología y Exégesis**, el estudio de **${title}** profundiza en la articulación dogmática, la teología federal de los pactos y las implicaciones pastorales de nivel superior. Para el docente, pastor y erudito de posgrado, esta materia es la articulación viva del plan eterno de redención revelado por Dios en las Escrituras.

> 📖 **Texto Bíblico Principal:**
> *"Pero cuando vino el cumplimiento del tiempo, Dios envió a su Hijo, nacido de mujer y nacido bajo la ley, para que redimiese a los que estaban bajo la ley, a fin de que recibiésemos la adopción de hijos."* — **Gálatas 4:4-5 (RVR1960)**

> ✍️ **Comentario Teológico Histórico (${theo1.author}):**
> *"${theo1.text}"*
> — **${theo1.author}**

#### Explicación Detallada de cada Punto:
* **Soberanía y Redención:** Dios Padre planificó la salvación desde la eternidad, ejecutada por el Hijo en la cruz y aplicada por el Espíritu Santo.
* **Integridad Doctrinal:** El conocimiento teológico exige rigor intelectual acoplado con santidad de vida y devoción congregacional.`;

    block2 = `### 2. Exégesis Sintáctica e Idiomas Bíblicos para el Magisterio Eclesiástico

A nivel Maestría, la exégesis bíblica conecta las herramientas de los idiomas originales (Hebreo y Griego) con el magisterio de la iglesia. Se estudian los conectores pactuales, los tiempos verbales y el vocabulario teológico medular para evitar simplificaciones apresuradas.

> 📖 **Texto Bíblico Exegético:**
> *"Porque la palabra de Dios es viva y eficaz, y más cortante que toda espada de dos filos; y penetra hasta partir el alma y el espíritu, las coyunturas y los tuétanos, y discierne los pensamientos y las intenciones del corazón."* — **Hebreos 4:12 (RVR1960)**

> ✍️ **Comentario Histórico (${theo2.author}):**
> *"${theo2.text}"*
> — **${theo2.author}**

#### Pautas de Interpretación para la Maestría:
1. **Contexto Gramatical e Histórico:** Identificación del propósito del autor bíblico e intención del pasaje.
2. **Revelación Progresiva:** Rastreo del tema a lo largo del Antiguo y Nuevo Testamento hasta su cumplimiento en Cristo.`;

    block3 = `### 3. Teología Federal, Doctrinas de la Gracia y Diálogo Histórico

La fe cristiana confesional se articula a través del marco de la Teología Federal de los Pactos (Pacto de Redención, Pacto de Obras y Pacto de Gracia). En este módulo se analiza cómo **${title}** se integra armónicamente en las Doctrinas de la Gracia (*Sola Scriptura, Sola Fide, Sola Gratia, Solus Christus, Soli Deo Gloria*).

> 📖 **Texto Bíblico sobre la Gracia y Salvación:**
> *"Porque por gracia sois salvos por medio de la fe; y esto no de vosotros, pues es don de Dios; no por obras, para que nadie se gloríe."* — **Efesios 2:8-9 (RVR1960)**

> ✍️ **Comentario Histórico de los Reformadores (${theo3.author}):**
> *"${theo3.text}"*
> — **${theo3.author}**

#### Las Cinco Solas en la Exposición de la Clase:
* **Sola Scriptura:** La Biblia es la única regla infalible de fe y conducta.
* **Sola Fide & Gratia:** La salvación es un regalo inmerecido recibido únicamente por la fe en Cristo.
* **Solus Christus & Soli Deo Gloria:** Jesucristo es el único mediador, y toda la gloria pertenece al Dios Trino.`;

    block4 = `### 4. Implicaciones Pastorales Avanzadas, Consejería y Liderazgo

Toda teología auténtica a nivel Maestría debe desembocar en el crecimiento espiritual de la Iglesia local y el ejercicio fiel del ministerio pastoral.

> 📖 **Texto Bíblico de Exhortación Pastoral:**
> *"Ten cuidado de ti mismo y de la doctrina; persiste en ello, pues haciendo esto, te salvarás a ti mismo y a los que te oyeren."* — **1 Timoteo 4:16 (RVR1960)**

#### Ámbitos de Aplicación Ministerial:
* **Homilética Expositiva:** Predicar y enseñar **${title}** de forma clara, fiel e inteligible.
* **Consejería Bíblica:** Aplicar la doctrina para consolar, fortalecer y restaurar al creyente.
* **Defensa Eclesial:** Proteger a la iglesia local contra desvíos morales y falsas enseñanzas seculares.`;

    keyNotes = `* **Sistemática de Posgrado:** Integración orgánica entre la exégesis bíblica y la teología dogmática confesional.\n* **Suficiencia de la Gracia:** La soberanía de Dios en la salvación y la providencia garantiza la preservación de la Iglesia.\n* **Ilustraciones Históricas:** Comentarios de Agustín, Calvino, Lutero, Spurgeon y Sproul para enriquecer la enseñanza.`;
    
    homeworkDesc = `Elabore una monografía analítica de 500 palabras a nivel Maestría examinando el impacto de **${title}** en la formulación de la sana doctrina e ilustrándolo con citas bíblicas y comentarios históricos.`;
    
    examQuestion = `¿Cuál es el valor medular de articular a nivel Maestría la doctrina de "${title}" en el ministerio pastoral?`;
    examOptions = [
      'Demostrar erudición vacía para debatir en redes sociales sin impacto en la piedad.',
      'Equipar al liderazgo eclesiástico con una hermenéutica sólida y confesional que edifique a la iglesia y la proteja de la falsa doctrina.',
      'Reemplazar la predicación expositiva por discursos de autoayuda secular.',
      'Modificar los credos históricos para adaptarlos a la filosofía posmoderna.'
    ];
    examCorrectIdx = 1;
    examExplanation = 'La Maestría capacita al teólogo para guiar a la grey con fidelidad al texto sagrado, aplicando la dogmática bíblica a los desafíos contemporáneos.';

  } else {
    // Licentiate / General High-Quality Content Generator with full biblical texts and historic commentary
    block1 = `### 1. Fundamentos Doctrinales e Históricos de ${title}

El estudio de **${title}** aborda un pilar indispensable para la formación teológica y espiritual del creyente. En un contexto contemporáneo donde abundan las opiniones superficiales, comprender la enseñanza bíblica sobre este tema proporciona firmeza, convicción y claridad espiritual.

A lo largo de la historia bíblica, Dios ha revelado Su voluntad de forma coherente y progresiva. Analizamos los antecedentes bíblicos y su cumplimiento pleno en la persona y obra de Jesucristo.

> 📖 **Texto Bíblico de Fundamento:**
> *"Sabiendo que el hombre no es justificado por las obras de la ley, sino por la fe de Jesucristo, nosotros también hemos creído en Jesucristo, para ser justificados por la fe de Cristo y no por las obras de la ley..."* — **Gálatas 2:16 (RVR1960)**

> ✍️ **Comentario Teológico Histórico (${theo1.author}):**
> *"${theo1.text}"*
> — **${theo1.author}**

#### Explicación Pedagógica del Punto:
1. **La Autoridad de la Palabra:** La fe cristiana no descansa en inventos humanos, sino en la verdad revelada por Dios en las Escrituras.
2. **El Carácter Teocéntrico:** Dios es la fuente de toda bendición y verdad; nuestra vida y estudio deben darle a Él toda la gloria.`;

    block2 = `### 2. Exégesis Inductiva, Contexto Histórico y Pasajes Bíblicos Clave

Mediante el método de exégesis inductiva (**Observación, Interpretación y Aplicación**), desglosamos las palabras clave e identificamos las verdades centrales para comprender el significado exacto que el autor inspirado transmitió a sus primeros lectores.

> 📖 **Texto Bíblico Relevante:**
> *"Toda la Escritura es inspirada por Dios, y útil para enseñar, para redargüir, para corregir, para instruir en justicia, a fin de que el hombre de Dios sea perfecto, enteramente preparado para toda buena obra."* — **2 Timoteo 3:16-17 (RVR1960)**

> ✍️ **Comentario Histórico (${theo2.author}):**
> *"${theo2.text}"*
> — **${theo2.author}**

#### Pasos de la Exégesis Inductiva:
* **Observación:** ¿Qué dice el texto bíblico exactamente? Identificar personas, verbos y conectores.
* **Interpretación:** ¿Qué significó el pasaje para sus oyentes originales en su contexto histórico?
* **Aplicación:** ¿Cómo aplica esta verdad eterna a mi vida cristiana y al servicio en la iglesia local?`;

    block3 = `### 3. Teología Sistemática y Crecimiento en la Piedad Cristiana

Toda doctrina bíblica verdadera está diseñada no solo para informar la mente, sino para transformar el corazón y la conducta del creyente. Al estudiar **${title}**, descubrimos la belleza del carácter de Dios, Su santidad, Su justicia y Su amor infinito.

> 📖 **Texto Bíblico sobre la Transformación:**
> *"No os conforméis a este siglo, sino transformaos por medio de la renovación de vuestro entendimiento, para que comprobéis cuál sea la buena voluntad de Dios, agradable y perfecta."* — **Romanos 12:2 (RVR1960)**

> ✍️ **Comentario de los Padres e Historiadores (${theo3.author}):**
> *"${theo3.text}"*
> — **${theo3.author}**

#### Frutos de la Sana Doctrina en la Vida Cotidiana:
* **Crecimiento en Oración:** El conocimiento de Dios aviva nuestra vida devocional.
* **Humildad y Santidad:** Reconocer la grandeza de Dios elimina el orgullo y nos motiva a vivir en pureza.
* **Amor Fraternal:** La sana doctrina fortalece la unidad y el amor entre los hermanos en Cristo.`;

    block4 = `### 4. Aplicación Homilética, Discipulado y Servicio Eclesial

Traducir la teología en servicio activo es el objetivo final de la formación teológica. En esta sección se proporcionan herramientas prácticas para compartir estas verdades en la iglesia y la comunidad.

> 📖 **Texto Bíblico del Gran Mandato:**
> *"Por tanto, id, y haced discípulos a todas las naciones, bautizándolos en el nombre del Padre, y del Hijo, y del Espíritu Santo; enseñándoles que guarden todas las cosas que os he mandado..."* — **Mateo 28:19-20 (RVR1960)**

#### Plan Práctico de Discipulado:
* **Discipulado Personal:** Explicar los fundamentos de **${title}** a nuevos creyentes.
* **Enseñanza Eclesial:** Preparar lecciones para la escuela dominical, grupos de hogar o estudios bíblicos.
* **Testimonio Público:** Proclamar el Evangelio con valentía, gracia y respeto en la sociedad.`;

    keyNotes = `* **Fundamento Teológico:** Comprensión clara de los términos bíblicos, pasajes clave y desarrollo doctrinal.\n* **Comentarios Históricos:** Perspectiva enriquecedora de teólogos como Juan Calvino, Martín Lutero, Agustín y Spurgeon.\n* **Crecimiento en Piedad:** Toda doctrina bíblica auténtica produce santidad, humildad y celo por el Evangelio.`;
    
    homeworkDesc = `Escriba un trabajo expositivo de 400 palabras en su libreta teológica explicando los conceptos principales de **${title}**, incluyendo al menos una cita bíblica completa y un comentario histórico de los reformadores o padres de la iglesia.`;
    
    examQuestion = `¿Cuál es el objetivo principal de estudiar "${title}" en su programa de formación teológica?`;
    examOptions = [
      'Cumplir un requisito académico formal sin relevancia para la vida espiritual.',
      'Adquirir una base bíblica y teológica firme respaldada por las Escrituras y el testimonio histórico de la iglesia.',
      'Desarrollar teorías personales independientes al canon bíblico.',
      'Fomentar la división doctrinal en la iglesia local.'
    ];
    examCorrectIdx = 1;
    examExplanation = 'La formación teológica otorga las herramientas hermenéuticas y doctrinales necesarias para comprender y transmitir la Palabra con precisión bíblica y celo pastoral.';
  }

  // 3. Selection of historical theologians and their commentary quotes
  const theologianIdx1 = (day * 3 + 2) % THEOLOGIANS_POOL.length;
  const theologianIdx2 = (day * 7 + 5) % THEOLOGIANS_POOL.length;
  
  const commentaries = [
    THEOLOGIANS_POOL[theologianIdx1],
    THEOLOGIANS_POOL[theologianIdx2 !== theologianIdx1 ? theologianIdx2 : (theologianIdx2 + 1) % THEOLOGIANS_POOL.length]
  ];

  // 4. Verification reinforcement verses
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
    title: `Exégesis Teológica y Filológica (${mainVerseObj.reference})`,
    mainTheme: title,
    historicalGrammaticalContext: `El pasaje de ${mainVerseObj.reference} se sitúa dentro de un momento crucial de la revelación bíblica. El autor sagrado emplea términos gramaticales precisos en la lengua original (Hebreo o Griego) para transmitir verdades inamovibles. La estructura sintáctica destaca la iniciativa divina, la coherencia del pacto y el marco histórico en el que los primeros oyentes recibieron la palabra de Dios sin distorsión.`,
    theologicalAnalysis: `Al analizar teológicamente ${mainVerseObj.reference} en conexión con "${title}", reconocemos que Dios revela Su voluntad soberana de forma clara. La doctrina resalta que la salvación, la santidad y la verdad revelada son de origen exclusivamente divino (monergismo). Este versículo destruye cualquier pretensión de justicia propia o especulación filosófica humana, articulando el dogma cristiano con rigor exegético.`,
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

  // 6. Assemble rich Content blocks with interactive checkpoints
  const blocks: ContentBlock[] = [
    {
      type: 'note',
      id: `${courseId}-day-${day}-b-reading`,
      content: `**Plan de Lectura Bíblica Dirigido (~${totalBibleReadingMinutes} min | Límite Máximo: 20 min):**\nLea con atención devocional el **Versículo Principal (${mainVerseObj.reference})** y los pasajes complementarios (**${complementaryVerses.map(v => v.reference).join(', ')}**).\n\n**Preguntas Clave de Reflexión Teológica:**\n1. ¿De qué forma pone en relieve el versículo principal (${mainVerseObj.reference}) el tema de la clase?\n2. ¿Cómo conectan los versículos complementarios y los comentarios de los grandes teólogos con la doctrina expuesta?\n3. ¿Qué oraciones de gratitud y compromiso suscita este pasaje para su vida personal y eclesial?`
    },
    {
      type: 'text',
      id: `${courseId}-day-${day}-b-blk1`,
      content: block1
    },
    {
      type: 'text',
      id: `${courseId}-day-${day}-b-blk2`,
      content: block2
    },
    {
      type: 'control',
      id: `${courseId}-day-${day}-b-checkpoint1`,
      question: {
        id: `cp1-${courseId}-day-${day}`,
        question: `Punto de Control Exegético: En base a lo analizado sobre "${title}" y el versículo principal ${mainVerseObj.reference}, ¿cuál es el principio hermenéutico que se debe salvaguardar rigurosamente?`,
        options: [
          'Interpretar el texto bíblico guiándose por las emociones del momento y el relativismo moral contemporáneo.',
          'Extraer el significado que el Espíritu inspiró al autor original considerando la gramática, los textos bíblicos, los comentarios históricos y la analogía de la fe.',
          'Asumir que las doctrinas históricas son anticuadas y deben reemplazarse por modas culturales.',
          'Aislar un versículo de su contexto inmediato para defender una opinión personal previa.'
        ],
        correctAnswerIndex: 1,
        explanation: 'La exégesis bíblica auténtica somete al intérprete a la autoridad del texto en su lengua original, contexto histórico y armonía con toda la Escritura revelada.'
      }
    },
    {
      type: 'text',
      id: `${courseId}-day-${day}-b-blk3`,
      content: block3
    },
    {
      type: 'text',
      id: `${courseId}-day-${day}-b-blk4`,
      content: block4
    }
  ];

  if (block5) {
    blocks.push({
      type: 'text',
      id: `${courseId}-day-${day}-b-blk5`,
      content: block5
    });
  }

  blocks.push({
    type: 'note',
    id: `${courseId}-day-${day}-b-notes`,
    content: `**Claves para su Libreta Teológica (Cosas para Anotar):**\n${keyNotes}\n\n_Dedique un tiempo de oración pidiendo al Espíritu Santo que selle permanentemente estas verdades en su libreta de discipulado personal._`
  });

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
      question: `¿Cuál es el peligro de interpretar "${title}" sin considerar la analogía de la fe y el testimonio de los teólogos históricos?`,
      options: [
        'Desarrollar un exceso de piedad y devoción bíblica sincera en la oración.',
        'Caer en herejías doctrinales, eiségesis distorsionada y contradicciones teológicas.',
        'Aprender demasiado sobre las lenguas bíblicas hebrea y griega.',
        'Obtener una comprensión demasiado profunda y madura de las Escrituras.'
      ],
      correctAnswerIndex: 1,
      explanation: 'Cuando se aísla un pasaje de la totalidad del canon bíblico y del testimonio histórico de la iglesia, se cae en el error de la eiségesis y se producen distorsiones doctrinales.'
    },
    {
      id: `f-${courseId}-day-${day}-q3`,
      question: `¿De qué manera el estudio riguroso de las fuentes primarias, citas bíblicas y comentarios históricos fortalece la docencia y el ministerio sobre "${title}"?`,
      options: [
        'Permite sustituir la predicación bíblica por especulaciones seculares desacreditadas.',
        'Otorga certidumbre exegética y teológica para fundamentar la sana doctrina y refutar los errores hermenéuticos sutiles.',
        'Hace innecesaria la labor del Espíritu Santo en la iluminación del creyente.',
        'Aísla al estudiante de la comunidad de fe en la iglesia local.'
      ],
      correctAnswerIndex: 1,
      explanation: 'El dominio exegético, bíblico y confesional proporciona firmeza para alimentar al rebaño con alimento sólido y proteger la fe apostólica.'
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
    estimatedMinutes: 60,
    objectives: [
      `Dominar los fundamentos exegéticos, bíblicos y teológicos avanzados de ${title}`,
      `Analizar los textos bíblicos clave y los comentarios de teólogos históricos (Calvino, Lutero, Agustín, Spurgeon, Sproul)`,
      `Evaluar las implicaciones doctrinales y apologéticas respondiendo a dudas y objeciones`,
      `Articular una aplicación cristocéntrica y pastoral aplicable a la vida personal, eclesial y académica`
    ],
    originalTerms,
    hermeneuticalExercise: {
      title: `Laboratorio Inductivo y Exegético Aplicado: ${title}`,
      observation: `Examine detenidamente ${mainVerseObj.reference}. Identifique los verbos de acción, los pronombres, la morfología y los conectores causales pactuales.`,
      historicalContext: `Considere las circunstancias históricas y culturales respaldadas por el comentario de teólogos e historiadores clave.`,
      christocentricFocus: `Descubra la conexión de esta doctrina con la persona y obra salvífica de Jesucristo exaltando Su sacrificio vicario y señorío eterno.`,
      practicalApplication: `Traduzca esta verdad en piedad práctica y magisterio eclesiástico: renueve su devocional diario, organice clases para su escuela dominical y sirva con celo en su iglesia local.`
    },
    assignments: [
      { id: `t-${courseId}-day-${day}-asg`, description: homeworkDesc }
    ]
  };
}
