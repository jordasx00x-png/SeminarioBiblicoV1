export function generateClientTheologicalResponse(messageText: string, context?: { courseTitle?: string; lessonTitle?: string }): string {
  const query = (messageText || '').toLowerCase();

  // Sermon / Homiletic Outline Generation
  if (query.includes('sermon') || query.includes('predica') || query.includes('bosquejo') || query.includes('homiletica') || query.includes('mensaje') || query.includes('predicar')) {
    return `### 📜 Bosquejo Homilético Expositivo y Profundo

**Título del Sermón:** La Gloria Inmencionable de la Gracia y el Llamado
**Texto Bíblico Base:** Romanos 8:28-30 / Efesios 2:8-10

---

#### 1. Marco Exegético y Propósito
- **Idea Central del Texto (ICT):** Dios ejecuta soberanamente su plan de redención guiando cada acontecimiento para la gloria de su Nombre y el bien de sus escogidos.
- **Idea Central del Sermón (ICS):** Nada en la vida del creyente es un accidente; todo está orquestado por la gracia divina.
- **Proposición Homilética:** Al comprender la providencia de Dios, descansamos en su soberanía y vivimos con propósito eterno.

---

#### 2. Introducción Impactante
- **Gancho Inicial:** En un mundo sumido en la incertidumbre y el caos, el ser humano busca desesperadamente dirección y significado.
- **Contexto:** Pablo escribe a una iglesia en Roma expuesta al sufrimiento, asegurándoles que la soberanía de Dios no es un concepto abstracto, sino un ancla firme.
- **Conexión:** ¿Cómo podemos mantener la fe inquebrantable cuando las circunstancias parecen desmoronarse?

---

#### 3. Bosquejo Expositivo del Pasaje

##### I. El Propósito Inmovible de Dios (v. 28)
- **Exégesis:** El término griego *synergei* (συνεργεῖ - "cooperan juntas para bien") revela que Dios no es espectador, sino el Arquiteto de nuestras vidas.
- **Apoyo Bíblico:** Génesis 50:20; Isaías 46:10.
- **Ilustración Pastoral:** El tapiz visto por la parte posterior muestra hilos enredados y nudos oscuros; pero al voltearlo, se aprecia una obra maestra impecable.
- **Aplicación:** Confiar en Dios incluso cuando no podemos rastrear su mano en la prueba.

##### II. La Cadena Dorada de la Redención (v. 29-30)
- **Exégesis:** De *proegno* (conocidos de antemano) a *edoxasen* (glorificados en tiempo pasado, asegurando la victoria final).
- **Apoyo Bíblico:** Efesios 1:4-6; 2 Timoteo 1:9.
- **Ilustración Pastoral:** Una ancla de barco que no está amarrada al agua, sino fijada en la roca firme del cielo.
- **Aplicación:** Tu identidad no la definen tus fracasos temporales, sino el decreto eterno de Dios.

##### III. La Transformación a la Imagen de Cristo (v. 29b)
- **Exégesis:** El fin último de nuestra salvación no es solo la comodidad, sino la *summorphos* (σύμμορφος - conformidad estructural profunda) a Cristo.
- **Aplicación Práctica:** Medir cada decisión diaria con la pregunta: "¿Esto edifica el carácter de Cristo en mi vida?".

---

#### 4. Conclusión Homilética y Llamado
- **Resumen:** Dios que te conoció, te llamó y te justificó, completará fielmente su obra en ti (*Filipenses 1:6*).
- **Llamado a la Acción:**
  1. Arrepentimiento y fe renovada en el Señor Jesús.
  2. Rinde tus ansiedades al Trono de la Gracia.
  3. Compromete tu vida al servicio activo en el Reino de Dios.

> *"¿Qué, pues, diremos a esto? Si Dios es por nosotros, ¿quién contra nosotros?"* — **Romanos 8:31**`;
  }

  if (query.includes('hola') || query.includes('buenos') || query.includes('buenas') || query.includes('saludos')) {
    return `¡Paz y gracia de nuestro Señor Jesucristo! 

Soy tu **Asistente Virtual Teológico y Pastoral** del Seminario Teológico Digital. 

¿En qué puedo asistirte hoy en tu formación académica y espiritual?
- **Exégesis y análisis de pasajes bíblicos**
- **Vocabulario en Griego Koiné y Hebreo Bíblico**
- **Doctrinas de la Fe Cristiana y Teología Sistemática**
- **Orientación sobre tus clases y lecciones activas**`;
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
    return `### Consulta sobre: ${context.lessonTitle || context.courseTitle}

Respecto a tu lección en curso (**${context.lessonTitle || context.courseTitle}**), aquí tienes los ejes clave de estudio:

1. **Fundamento Exegético**: Analizar siempre el texto en su contexto literario, histórico y gramatical original.
2. **Conexión Teológica**: Observar cómo este pasaje o tema se articula dentro del panorama de la teología bíblica y el plan de redención.
3. **Aplicación Pastoral**: Extraer verdades vivas para la edificación personal, el liderazgo cristiano y el servicio a la iglesia.

> *"Procura con diligencia presentarte a Dios aprobado, como obrero que no tiene de qué avergonzarse, que usa bien la palabra de verdad."* — **2 Timoteo 2:15**

¿Deseas profundizar en algún punto específico de esta lección o pasaje?`;
  }

  return `### Orientación Teológica y Pastoral

Respecto a tu consulta sobre **"${messageText}"**:

1. **Contexto Bíblico**: Las Escrituras enseñan la centralidad de Jesucristo en todo el canon bíblico (Lucas 24:27), guiándonos a estudiar cada pasaje considerando su propósito redentor.
2. **Rigor Teológico**: Te recomendamos examinar los pasajes bíblicos paralelos (*analogía de la fe*), consultando el contexto histórico y los pasajes clave de las Sagradas Escrituras (RVR 1960).
3. **Aplicación Práctica**: Toda verdad teológica debe conducir al amor a Dios, la santidad de vida y la edificación del cuerpo de Cristo.

> *"Toda la Escritura es inspirada por Dios, y útil para enseñar, para redargüir, para corregir, para instruir en justicia."* — **2 Timoteo 3:16**

¿Te gustaría profundizar en algún pasaje bíblico o concepto teológico específico sobre este tema?`;
}
