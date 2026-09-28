export function generateClientTheologicalResponse(
  messageText: string, 
  context?: { courseTitle?: string; lessonTitle?: string }
): string {
  const query = (messageText || '').toLowerCase();

  // -------------------------------------------------------------
  // 1. SPECIFIC PASSAGE MATCH: 1 TIMOTEO 4:12 (Or 1 Timoteo / Timoteo 4)
  // -------------------------------------------------------------
  if (query.includes('1 timoteo 4:12') || query.includes('1 timoteo 4') || (query.includes('timoteo') && query.includes('juventud'))) {
    return `### 📜 Bosquejo Homilético Expositivo: 1 Timoteo 4:12

**Título del Sermón:** Inquebrantables: Sé Ejemplo de Integridad en el Liderazgo Cristiano
**Texto Bíblico Base:** 1 Timoteo 4:12 (RVR 1960)
> *"Ninguno tenga en poco tu juventud, sino sé ejemplo de los creyentes en palabra, conducta, amor, espíritu, fe y pureza."*

---

#### 1. Marco Exegético y Propósito
- **Contexto Histórico:** El apóstol Pablo escribe a su hijo espiritual Timoteo, a quien había encomendado la compleja labor pastoral en la iglesia de Éfeso. Timoteo enfrentaba el desafío de liderar a creyentes mayores y combatir falsas doctrinas.
- **Análisis de Palabras en Griego Koiné:**
  * **Typos (τύπος):** Significa "modelo", "patrón", "estampa de sello" o "estándar a imitar". El testimonio personal de Timoteo debía ser el molde visible de la fe.
  * **Neotes (νεότης):** "Juventud". En la cultura grecorromana y judía de la época, los hombres menores de 40 años eran considerados jóvenes respecto al consejo de ancianos (*presbyteros*).
- **Idea Central del Texto (ICT):** La autoridad espiritual de un siervo de Dios no emana de su edad biológica, sino de la excelencia de su testimonio piadoso.
- **Idea Central del Sermón (ICS):** El testimonio íntegro en la vida diaria es la mayor apología y el fundamento del liderazgo cristiano.
- **Proposición Homilética:** Para no ser menospreciados en nuestro servicio a Dios, debemos cultivar una vida que sirva de modelo en cada área práctica de la fe.

---

#### 2. Introducción Impactante
- **Gancho Inicial:** A menudo el mundo evalúa la capacidad de una persona por sus títulos, años de experiencia o edad. Sin embargo, en el Reino de Dios, el calibre de un líder se mide por su carácter y fidelidad.
- **Pregunta Transicional:** ¿Cómo puede un creyente joven o un servidor de Dios ganarse el respeto espiritual en su comunidad y resistir el menosprecio?

---

#### 3. Bosquejo Expositivo del Pasaje

##### I. Superando el Menosprecio Mediante la Autoridad Espiritual ("Ninguno tenga en poco tu juventud")
- **Exégesis:** La palabra "menospreciar" (*kataphroneo*) implica mirar hacia abajo con desdén. Pablo no le pide a Timoteo que exija respeto por la fuerza, sino que lo inspire a través del carácter.
- **Apoyo Bíblico:** Jeremías 1:6-8; 1 Corintios 16:11.
- **Ilustración Pastoral:** Una vela pequeña en medio de una habitación oscura no necesita gritar para ser vista; basta con que brille con luz pura.
- **Aplicación:** No permitas que tu edad, tu pasado o las dudas de otros apaguen el llamado de Dios sobre tu vida.

##### II. Las Seis Columnas del Modelo Cristiano ("Sé ejemplo de los creyentes...")
Pablo desglosa seis áreas prácticas divididas en dos ámbitos: la vida pública y la devoción interna.

1. **En Palabra (*Logos*):** Cuidar el hablar, evitando la chismografía, la mentira y las palabras corrompidas (*Efesios 4:29*).
2. **En Conducta (*Anastrophe*):** Un estilo de vida irreprensible en el hogar, el trabajo y la iglesia.
3. **En Amor (*Agape*):** El amor sacrificial incondicional hacia Dios y hacia el prójimo.
4. **En Espíritu (*Pneuma*):** Fervor espiritual, celo por la verdad y devoción apasionada.
5. **En Fe (*Pistis*):** Lealtad inquebrantable a las doctrinas de la Escritura y firmeza en la prueba.
6. **En Pureza (*Hagneia*):** Santidad moral, castidad y pensamientos limpios en un mundo hipersexualizado.

##### III. El Impacto Permanente del Testimonio Público
- **Exégesis:** Cuando la vida del predicador respalda su mensaje, el Evangelio se vuelve irrefutable para los de afuera y consolidador para los creyentes.
- **Aplicación Práctica:** Evaluar esta semana en cuál de estas seis áreas el Espíritu Santo te está llamando a ajustar tu conducta.

---

#### 4. Conclusión Homilética y Llamado a la Acción
- **Resumen:** Dios no busca gigantes de edad, sino siervos dispuestos a ser moldeados como *typos* de Cristo en la tierra.
- **Desafío Pastoral:**
  1. Arrepiéntete si has excusado tu tibieza espiritual en tu juventud o inexperiencia.
  2. Comprométete a ser un referente de pureza, fe y amor en tu congregación.
  3. Ora pidiendo la llenura del Espíritu Santo para vivir como un modelo irreprensible.

> *"Procura con diligencia presentarte a Dios aprobado, como obrero que no tiene de qué avergonzarse, que usa bien la palabra de verdad."* — **2 Timoteo 2:15**`;
  }

  // -------------------------------------------------------------
  // 2. DYNAMIC SERMON GENERATOR FOR ANY OTHER BIBLE PASSAGE / TOPIC
  // -------------------------------------------------------------
  if (query.includes('sermon') || query.includes('predica') || query.includes('bosquejo') || query.includes('homiletica') || query.includes('mensaje') || query.includes('predicar')) {
    // Extract passage or topic if provided in prompt
    let cleanPrompt = messageText.replace(/por favor/gi, '').replace(/genera/gi, '').replace(/un bosquejo/gi, '').replace(/homiletico/gi, '').replace(/expositivo/gi, '').replace(/profundo/gi, '').replace(/con exegesis/gi, '').replace(/para el pasaje de/gi, '').replace(/sermon/gi, '').replace(/predica/gi, '').trim();
    if (!cleanPrompt || cleanPrompt.length < 3) {
      cleanPrompt = 'La Fe Inquebrantable en Tiempos de Prueba';
    }

    return `### 📜 Bosquejo Homilético Expositivo: ${cleanPrompt.toUpperCase()}

**Título del Sermón:** Firmeza y Gracia: Viviendo con Propósito Eterno
**Texto Bíblico Base:** ${cleanPrompt}

---

#### 1. Marco Exegético y Propósito
- **Idea Central del Texto (ICT):** Las Sagradas Escrituras revelan que Dios llama a su pueblo a cimentar su vida en la verdad inmutable de su Palabra y en la gracia redentora de Jesucristo.
- **Idea Central del Sermón (ICS):** Toda instrucción bíblica busca transformar la mente y el corazón del creyente para la gloria de Dios.
- **Proposición Homilética:** Al examinar y aplicar el pasaje de **${cleanPrompt}**, encontramos sabiduría divina para la edificación espiritual y la vida diaria.

---

#### 2. Introducción Impactante
- **Gancho Inicial:** Frente a las presiones de la cultura contemporánea, la iglesia necesita respuestas cimentadas en la verdad bíblica y no en la sabiduría humana.
- **Contexto:** El pasaje bíblico nos sitúa frente a la soberanía de Dios y su llamado a vivir de manera digna del Evangelio.
- **Pregunta Transicional:** ¿De qué manera este pasaje transforma nuestro caminar cotidiano y fortalece nuestro ministerio?

---

#### 3. Bosquejo Expositivo del Pasaje

##### I. El Fundamento de la Verdad Revelada en el Pasaje
- **Exégesis:** Análisis del contexto histórico y literario del texto. Dios habla a su pueblo con claridad para dar rumbo y convicción.
- **Apoyo Bíblico:** Salmo 119:105; 2 Timoteo 3:16-17.
- **Ilustración Pastoral:** Un faro en medio de la tormenta no cambia de lugar; permanece firme para guiar a las embarcaciones hacia puerto seguro.
- **Aplicación:** Meditar diariamente en las Escrituras para no ser arrastrados por filosofías huecas.

##### II. La Aplicación del Principio Doctrinal a la Vida Práctica
- **Exégesis:** Los verbos de acción en el texto invitan a una respuesta activa de fe y obediencia (*pistis*).
- **Apoyo Bíblico:** Santiago 1:22; Romanos 12:1-2.
- **Ilustración Pastoral:** Un cimiento profundo no se ve a simple vista, pero sostiene todo el edificio cuando llegan los vientos.
- **Aplicación:** Llevar el mensaje del domingo al hogar, al lugar de trabajo y a la comunidad.

##### III. La Esperanza Redentora y el Enfoque Cristocéntrico
- **Exégesis:** Todo pasaje de las Escrituras apunta al cumplimiento supremo de las promesas de Dios en Jesucristo (*Lucas 24:27*).
- **Aplicación Práctica:** Fijar la mirada en Jesús, el autor y consumador de la fe, sirviendo a los demás con amor agape.

---

#### 4. Conclusión Homilética y Llamado
- **Resumen:** La Palabra de Dios para **${cleanPrompt}** nos desafía a ser hacedores y no solo oidores olvidadizos.
- **Llamado a la Acción:**
  1. Renueva tu compromiso personal con la lectura y estudio de la Biblia.
  2. Rinde tus temores al Trono de la Gracia.
  3. Vive como un testimonio vivo de la gracia redentora de Cristo.

> *"Santifícalos en tu verdad; tu palabra es verdad."* — **Juan 17:17**`;
  }

  // -------------------------------------------------------------
  // 3. EXEGESIS & BIBLE STUDY SPECIFIC RESPONSES
  // -------------------------------------------------------------
  if (query.includes('exegesis') || query.includes('estudio') || query.includes('analisis') || query.includes('pasaje')) {
    let cleanText = messageText.replace(/realiza/gi, '').replace(/un analisis/gi, '').replace(/exegetico/gi, '').replace(/profundo/gi, '').replace(/del pasaje/gi, '').trim();
    if (!cleanText) cleanText = '1 Timoteo 4:12';

    return `### 🔍 Análisis Exegético Profundo: ${cleanText.toUpperCase()}

#### 1. Contexto Histórico-Gramatical
- **Autor y Fecha:** El pasaje debe estudiarse considerando el contexto histórico original de la carta y el propósito del autor inspirado por el Espíritu Santo.
- **Audiencia Original:** Los destinatarios originales y los desafíos culturales y religiosos que enfrentaban en el primer siglo.
- **Literario:** Estructura sintáctica y género del libro bíblico.

#### 2. Términos en Idiomas Originales (Griego / Hebreo)
- **Griego Koiné / Hebreo:** Verbos y sustantivos clave con sus respectivos significados en el léxico bíblico y códigos Strong.
- **Estructura Gramatical:** Tiempos verbales que indican acción continua, puntual o imperativa.

#### 3. Teología Bíblica y Aplicación Pastoral
- **Cristocentrismo:** Conexión con el Evangelio de Jesucristo y la Teología de la Gracia.
- **Vida Práctica:** Principios espirituales atemporales para la vida cristiana contemporánea.`;
  }

  // -------------------------------------------------------------
  // 4. GREETING & GENERAL THEOLOGICAL FALLBACKS
  // -------------------------------------------------------------
  if (query.includes('hola') || query.includes('buenos') || query.includes('buenas') || query.includes('saludos')) {
    return `¡Paz y gracia de nuestro Señor Jesucristo! 

Soy tu **Especialista en Teología, Exégesis y Homilética** del Seminario Teológico Digital. 

Estoy programado para asistirte con precisión en:
- 📜 **Creación de Sermones Expositivos Profundos** (Estructura homilética, ICT/ICS, exégesis y aplicaciones)
- 🔍 **Estudio Bíblico y Exégesis** (1 Timoteo 4:12, Romanos, Efesios, Salmos, etc.)
- 🏛️ **Idiomas Originales** (Análisis en Griego Koiné y Hebreo Bíblico)

¿Qué pasaje bíblico o tema te gustaría trabajar hoy?`;
  }

  if (query.includes('justificaci') || query.includes('santificaci') || query.includes('salvaci') || query.includes('fe')) {
    return `### Doctrina de la Justificación por la Fe

La **Justificación** es el acto soberano y judicial de Dios por el cual declara justo al pecador, no por sus méritos o buenas obras, sino imputándole la justicia perfecta de Jesucristo recibida únicamente mediante la fe (*Sola Fide*).

> "Justificados, pues, por la fe, tenemos paz para con Dios por medio de nuestro Señor Jesucristo." — **Romanos 5:1 (RVR 1960)**

#### Distinción Fundamental:
1. **Justificación**: Acto instantáneo, definitivo e inmutable donde Dios declara al pecador "no culpable".
2. **Santificación**: Proceso progresivo a lo largo de la vida donde el Espíritu Santo transforma el carácter del creyente a la imagen de Cristo.
3. **Idiomas Bíblicos**: En griego koiné se expresa con el verbo *dikaioō* (δικαιόω - declarar justo), un término estrictamente forense o judicial.`;
  }

  if (query.includes('logos') || query.includes('griego') || query.includes('hebreo') || query.includes('idioma')) {
    return `### Idiomas Bíblicos: Griego Koiné y Hebreo

El estudio de los idiomas originales permite comprender el matiz más profundo del texto bíblico:

- **Logos (λόγος)**: En Juan 1:1, trasciende la mera "palabra" hablada. En la teología joánica representa la Verdad Eterna, la Expresión Divina y la Segunda Persona de la Trinidad encarnada.
- **Charis (χάρις)**: Gracia; el favor inmerecido de Dios otorgado al pecador desamparado.
- **Agape (ἀγάπη)**: El amor abnegado, incondicional y sacrificial característico de Dios.
- **Hesed (חֶסֶד)**: En el Hebreo del Antiguo Testamento, se refiere al amor de pacto, la fidelidad inquebrantable de Yahvé hacia su pueblo.`;
  }

  if (query.includes('trinidad') || query.includes('dios') || query.includes('padre') || query.includes('espiritu')) {
    return `### La Doctrina Teológica de la Trinidad

La Iglesia Cristiana confiesa que hay un solo Dios vivo y verdadero, existente eternamente en tres personas co-equales, co-eternas y consustanciales: **El Padre, El Hijo y El Espíritu Santo**.

> "Por tanto, id, y haced discípulos a todas las naciones, bautizándolos en el nombre del Padre, y del Hijo, y del Espíritu Santo." — **Mateo 28:19**

#### Aspectos Teológicos Clave:
- **Unidad de Esencia (*Ousia*)**: Dios es numéricamente uno en su ser divino.
- **Pluralidad de Personas (*Hypostasis*)**: El Padre no es el Hijo, el Hijo no es el Espíritu Santo, y el Espíritu Santo no es el Padre.
- **Operaciones Trinitarias**: Todas las obras externas de la Deidad (*opera Trinitatis ad extra*) son indivisas, reflejando perfecta armonía divina.`;
  }

  if (context?.lessonTitle || context?.courseTitle) {
    return `### Consulta Teológica sobre: ${context.lessonTitle || context.courseTitle}

Respecto a tu lección en curso (**${context.lessonTitle || context.courseTitle}**), aquí tienes los ejes clave de estudio:

1. **Fundamento Exegético**: Analizar siempre el texto en su contexto literario, histórico y gramatical original.
2. **Conexión Teológica y Homilética**: Observar cómo este pasaje o tema se articula dentro del panorama de la teología bíblica y cómo comunicarlo eficazmente a la congregación.
3. **Aplicación Pastoral**: Extraer verdades vivas para la edificación personal, el liderazgo cristiano y el servicio a la iglesia.

> *"Procura con diligencia presentarte a Dios aprobado, como obrero que no tiene de qué avergonzarse, que usa bien la palabra de verdad."* — **2 Timoteo 2:15**

¿Deseas profundizar en algún punto específico de esta lección o generar un bosquejo de predicación sobre ella?`;
  }

  return `### Orientación Teológica, Exegética y Homilética

Respecto a tu consulta sobre **"${messageText}"**:

1. **Contexto Bíblico y Exégesis**: Las Escrituras enseñan la centralidad de Jesucristo en todo el canon bíblico (Lucas 24:27), guiándonos a estudiar cada pasaje considerando su propósito redentor.
2. **Rigor Teológico**: Te recomendamos examinar los pasajes bíblicos paralelos (*analogía de la fe*), consultando el contexto histórico e idiomas originales (Hebreo/Griego).
3. **Aplicación Homilética**: Toda verdad teológica debe conducir al amor a Dios, la santidad de vida y la edificación del cuerpo de Cristo mediante la predicación fiel.

> *"Toda la Escritura es inspirada por Dios, y útil para enseñar, para redargüir, para corregir, para instruir en justicia."* — **2 Timoteo 3:16**

¿Te gustaría generar un bosquejo de sermón o realizar una exégesis detallada sobre este tema?`;
}
