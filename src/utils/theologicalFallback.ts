export function generateClientTheologicalResponse(
  messageText: string, 
  context?: { courseTitle?: string; lessonTitle?: string }
): string {
  const query = (messageText || '').toLowerCase();

  // Extract Bible passage or topic cleanly from prompt
  const cleanPassage = messageText
    .replace(/por favor/gi, '')
    .replace(/genera/gi, '')
    .replace(/crear/gi, '')
    .replace(/un bosquejo/gi, '')
    .replace(/bosquejo/gi, '')
    .replace(/homilético/gi, '')
    .replace(/homiletico/gi, '')
    .replace(/expositivo/gi, '')
    .replace(/profundo/gi, '')
    .replace(/con exégesis/gi, '')
    .replace(/con exegesis/gi, '')
    .replace(/3 puntos principales/gi, '')
    .replace(/aplicaciones e ilustraciones/gi, '')
    .replace(/aplicaciones/gi, '')
    .replace(/ilustraciones/gi, '')
    .replace(/para el pasaje de:/gi, '')
    .replace(/para el pasaje de/gi, '')
    .replace(/del pasaje/gi, '')
    .replace(/sermón/gi, '')
    .replace(/sermon/gi, '')
    .replace(/prédica/gi, '')
    .replace(/predica/gi, '')
    .trim();

  // -------------------------------------------------------------
  // 1. SPECIFIC MATCH: SALMOS 23 / SALMO 23
  // -------------------------------------------------------------
  if (query.includes('salmo 23') || query.includes('salmos 23') || (query.includes('salmo') && query.includes('23'))) {
    return `### 📜 Bosquejo Homilético Expositivo: Salmo 23

**Título del Sermón:** El Señor es mi Pastor: Provisión, Protección y Gracia Incalculable
**Texto Bíblico Base:** Salmo 23:1-6 (RVR 1960)
> *"Jehová es mi pastor; nada me faltará. En lugares de delicados pastos me hará descansar; junto a aguas de reposo me pastoreará."*

---

#### 1. Marco Exegético y Propósito
- **Contexto Histórico:** Compuesto por David, el rey-pastor de Israel. Usando su profunda experiencia juvenil en los campos de Belén, David contrapone el cuidado abnegado de Dios (*YHVH Ro'i*) a la desolación del desierto de Judea.
- **Análisis de Palabras en Hebreo Bíblico:**
  * **YHVH Ro'i (יְהוָה רֹעִי):** "El Señor es mi Pastor". Expresa una relación de pacto íntimo, personal y soberano.
  * **Lo Echsas (לֹא אֶחְסָר):** "Nada me faltará". Significa "no sufriré escasez ni carencia de lo verdaderamente vital".
  * **Tzalmaveth (צַלְמָוֶת):** "Valle de sombra de muerte" (oscuridad densa, peligro inminente).
  * **Hesed (חֶסֶד):** "Amor de pacto, misericordia inquebrantable y fidelidad perenne".
- **Idea Central del Texto (ICT):** Dios provee, guía, protege y restaura soberanamente la vida de quienes pertenecen a su rebaño.
- **Idea Central del Sermón (ICS):** En las manos del Buen Pastor, el creyente tiene satisfacción completa hoy, paz en medio de las pruebas y una morada eterna asegurada.
- **Proposición Homilética:** Al rendir nuestras vidas al cuidado de Cristo, sustituimos la ansiedad por la confianza gozosa en su providencia.

---

#### 2. Introducción Impactante
- **Gancho Inicial:** Vivimos en una sociedad plagada de agotamiento, insatisfacción constante y temor al futuro.
- **Conexión Pastoral:** David no escribió este salmo en un palacio libre de problemas, sino recordando las garras de leones, los valles oscuros y los enemigos acechantes.
- **Pregunta Transicional:** ¿Cómo experimentar descanso real y seguridad inamovible cuando todo a nuestro alrededor parece inestable?

---

#### 3. Bosquejo Expositivo del Pasaje

##### I. La Provisión y Restauración del Pastor (vv. 1-3)
- **Exégesis:** Los "delicados pastos" (*De'she*) y "aguas de reposo" (*Menuhot*) describen un lugar de reposo seguro donde la oveja puede alimentarse sin temor. El verbo "confortará" (*Shuv*) implica restaurar el alma cansada o descarriada.
- **Apoyo Bíblico:** Juan 10:11, 14; Isaías 40:11.
- **Ilustración Pastoral:** Una oveja patas arriba (*cast down*) no puede levantarse por sí misma; necesita la mano tierna del pastor para enderezarla y salvarle la vida.
- **Aplicación:** Permite que la Palabra de Dios y el Espíritu Santo restauren tus fuerzas en lugar de buscar refugio en cisternas rotas.

##### II. La Presencia y Consuelo en el Valle Oscuro (v. 4)
- **Exégesis:** La "vara" (*Shevet*) era el garrote para defender al rebaño de los depredadores; el "cayado" (*Mish'enet*) era el bastón curvo para guiar y rescatar. Ambas herramientas comunican protección y disciplina amorosa.
- **Apoyo Bíblico:** Isaías 43:2; Romanos 8:38-39.
- **Ilustración Pastoral:** En los valles profundos de Judea, el sol no llega al fondo, pero la voz del pastor resuena más fuerte en las paredes de roca.
- **Aplicación:** Aunque atravieses enfermedades, pérdidas o crisis, la presencia de Cristo está contigo; no estás solo en la prueba.

##### III. La Mesa Servida y la Morada Eterna (vv. 5-6)
- **Exégesis:** Dios pasa de la figura del Pastor a la del Anfitrión Divino. Unge la cabeza con aceite (*Shemen* - honor y sanidad) y llena la copa hasta rebozar (*Revayah*). El "bien" (*Tov*) y la "misericordia" (*Hesed*) persiguen al creyente como guardianes divinos.
- **Apoyo Bíblico:** Juan 14:2-3; Apocalipsis 7:16-17.
- **Aplicación Práctica:** Vivir hoy con mentalidad de eternidad, sabiendo que nuestro hogar final está en la presencia del Dios Altísimo.

---

#### 4. Conclusión Homilética y Llamado
- **Resumen:** Con Jehová como tu Pastor, tu pasado está perdonado, tu presente está protegido y tu futuro está asegurado.
- **Llamado a la Acción:**
  1. Si nunca has entregado tu vida a Jesucristo, ven hoy al Buen Pastor que dio su vida por las ovejas.
  2. Rinde tus cargas y ansiedades en oración.
  3. Camina cada día descansando en su dirección y gracia.

> *"Yo soy el buen pastor; el buen pastor su vida da por las ovejas."* — **Juan 10:11**`;
  }

  // -------------------------------------------------------------
  // 2. SPECIFIC MATCH: 1 TIMOTEO 4:12
  // -------------------------------------------------------------
  if (query.includes('1 timoteo 4:12') || query.includes('1 timoteo 4') || (query.includes('timoteo') && query.includes('juventud'))) {
    return `### 📜 Bosquejo Homilético Expositivo: 1 Timoteo 4:12

**Título del Sermón:** Inquebrantables: Sé Ejemplo de Integridad en el Liderazgo Cristiano
**Texto Bíblico Base:** 1 Timoteo 4:12 (RVR 1960)
> *"Ninguno tenga en poco tu juventud, sino sé ejemplo de los creyentes en palabra, conducta, amor, espíritu, fe y pureza."*

---

#### 1. Marco Exegético y Propósito
- **Contexto Histórico:** El apóstol Pablo escribe a su hijo espiritual Timoteo, encomendado a la iglesia de Éfeso para enfrentar falsos maestros y estructurar el liderazgo eclesial.
- **Análisis de Palabras en Griego Koiné:**
  * **Typos (τύπος):** "Modelo", "patrón", "sello de molde". El testimonio personal de Timoteo debía ser el estándar visible.
  * **Neotes (νεότης):** "Juventud". Menores de 40 años en el contexto cultural grecorromano de ancianos (*presbyteros*).
- **Idea Central del Texto (ICT):** La autoridad espiritual emana de la integridad del testimonio piadoso.
- **Idea Central del Sermón (ICS):** El testimonio íntegro es la mayor apología y el fundamento del servicio cristiano.

---

#### 2. Bosquejo Expositivo del Pasaje

##### I. Superando el Menosprecio Mediante la Autoridad Espiritual ("Ninguno tenga en poco tu juventud")
- **Exégesis:** *Kataphroneo* (mirar hacia abajo con desdén). Pablo exhorta a inspirar respeto a través del carácter cristiano.
- **Aplicación:** No permitas que tu edad o las dudas de otros apaguen el llamado de Dios.

##### II. Las Seis Columnas del Modelo Cristiano ("Sé ejemplo de los creyentes...")
1. **En Palabra (*Logos*):** Hablar piadoso, veraz y edificante.
2. **En Conducta (*Anastrophe*):** Estilo de vida irreprensible.
3. **En Amor (*Agape*):** Amor incondicional y sacrificial.
4. **En Espíritu (*Pneuma*):** Fervor y celo por la verdad.
5. **En Fe (*Pistis*):** Lealtad inquebrantable a las Escrituras.
6. **En Pureza (*Hagneia*):** Santidad moral e intachabilidad.

##### III. El Impacto Permanente del Testimonio Público
- **Aplicación:** Vence las excusas y vive como un referente de Cristo en tu iglesia y comunidad.

> *"Procura con diligencia presentarte a Dios aprobado, como obrero que no tiene de qué avergonzarse."* — **2 Timoteo 2:15**`;
  }

  // -------------------------------------------------------------
  // 3. DYNAMIC SERMON GENERATOR FOR ANY OTHER REQUESTED PASSAGE
  // -------------------------------------------------------------
  if (query.includes('sermon') || query.includes('predica') || query.includes('bosquejo') || query.includes('homiletica') || query.includes('mensaje') || query.includes('predicar') || cleanPassage.length > 2) {
    const targetTopic = cleanPassage && cleanPassage.length > 2 ? cleanPassage.toUpperCase() : 'LA VERDAD Y LA GRACIA DE DIOS';

    return `### 📜 Bosquejo Homilético Expositivo: ${targetTopic}

**Título del Sermón:** La Fidelidad de Dios y el Llamado a la Santidad
**Texto Bíblico Base:** ${targetTopic}

---

#### 1. Marco Exegético y Propósito
- **Idea Central del Texto (ICT):** Las Escrituras revelan la gloria, santidad y soberanía de Dios llamando a su pueblo a cimentar su fe en la verdad inmutable de su Palabra.
- **Idea Central del Sermón (ICS):** Dios nos transforma mediante la exposición fiel de su Palabra y la gracia redentora de Jesucristo.
- **Proposición Homilética:** Al estudiar e internalizar el pasaje de **${targetTopic}**, hallamos dirección, consuelo y poder para servir a Dios con integridad.

---

#### 2. Introducción Impactante
- **Gancho Inicial:** Frente a la incertidumbre del mundo contemporáneo, la Palabra de Dios se levanta como la única ancla inamovible para el alma.
- **Pregunta Transicional:** ¿De qué manera este pasaje bíblico transforma nuestras decisiones y renueva nuestra esperanza?

---

#### 3. Bosquejo Expositivo del Pasaje

##### I. La Verdad Revelada en el Pasaje (${targetTopic})
- **Exégesis:** Análisis del contexto histórico y literario. Dios habla con autoridad para guiar y corregir a su pueblo.
- **Apoyo Bíblico:** Salmo 119:105; 2 Timoteo 3:16-17.
- **Ilustración Pastoral:** Un faro firme en medio de la tempestad no vacila frente a las olas; guía con luz constante a los navegantes.
- **Aplicación:** Cimentar nuestras convicciones en la verdad bíblica y no en emociones pasajeras.

##### II. La Transformación del Carácter Mediante la Obediencia
- **Exégesis:** La fe genuina (*Pistis*) se demuestra en obras de amor y santidad cotidiana.
- **Apoyo Bíblico:** Santiago 1:22; Romanos 12:1-2.
- **Ilustración Pastoral:** Una raíz profunda no se aprecia en la superficie, pero sostiene al árbol maduro contra los vientos más fuertes.
- **Aplicación:** Llevar la enseñanza de la Escritura a la práctica en el hogar, el trabajo y el ministerio.

##### III. La Esperanza Redentora y el Cumplimiento Cristocéntrico
- **Exégesis:** Toda la Escritura apunta al Señor Jesucristo y a su obra perfecta en la cruz (*Lucas 24:27*).
- **Aplicación Práctica:** Vivir con gratitud, sirviendo a los demás con amor agape y testimonio intachable.

---

#### 4. Conclusión Homilética y Llamado
- **Resumen:** El mensaje de Dios en **${targetTopic}** nos urge a renovar nuestra mente y caminar en fidelidad.
- **Llamado a la Acción:**
  1. Examina tu corazón a la luz de las Sagradas Escrituras.
  2. Rinde tus temores y ansiedades al Señor Jesús.
  3. Compromete tu vida a proclamar y vivir el Evangelio con valentía.

> *"Santifícalos en tu verdad; tu palabra es verdad."* — **Juan 17:17**`;
  }

  // -------------------------------------------------------------
  // 4. EXEGESIS / BIBLE STUDY FALLBACK
  // -------------------------------------------------------------
  if (query.includes('exegesis') || query.includes('estudio') || query.includes('analisis')) {
    const studyTarget = cleanPassage && cleanPassage.length > 2 ? cleanPassage.toUpperCase() : 'PASAJE BÍBLICO SOLICITADO';
    return `### 🔍 Análisis Exegético Profundo: ${studyTarget}

#### 1. Contexto Histórico-Gramatical
- **Autor y Época:** Estudio del contexto histórico, cultural y político del pasaje **${studyTarget}**.
- **Audiencia Original:** Desafíos espirituales y comunitarios que motivaron la redacción.
- **Género Literario:** Análisis del estilo sintáctico y estructura del texto.

#### 2. Idiomas Originales (Griego Koiné / Hebreo Bíblico)
- **Vocabulario Clave:** Raíces léxicas, códigos Strong y matices teológicos de los verbos y términos principales.
- **Sintaxis Gramatical:** Tiempos y modos verbales (aoristo, presente continuo, imperativo).

#### 3. Aplicación Teológica y Pastoral
- **Enfoque Redentor:** Conexión con el plan de salvación en Jesucristo.
- **Transformación Práctica:** Lecciones espirituales atemporales para la vida cristiana hoy.`;
  }

  // -------------------------------------------------------------
  // 5. GREETING & GENERAL FALLBACKS
  // -------------------------------------------------------------
  return `¡Paz y gracia de nuestro Señor Jesucristo! 

Soy tu **Especialista en Teología, Exégesis y Homilética** del Seminario Teológico Digital.

Respecto a tu consulta sobre **"${messageText}"**:
- **Creación de Sermones Expositivos**: Puedo estructurar un bosquejo homilético completo para cualquier pasaje o texto bíblico.
- **Exégesis e Idiomas Originales**: Análisis gramático-histórico en Griego Koiné o Hebreo Bíblico.
- **Teología Sistemática**: Fundamentación doctrinal de la fe cristiana.

> *"Toda la Escritura es inspirada por Dios, y útil para enseñar, para redargüir, para corregir, para instruir en justicia."* — **2 Timoteo 3:16**

¿Deseas que prepare un bosquejo de sermón o análisis exegético de algún pasaje en particular?`;
}
