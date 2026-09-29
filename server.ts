import express from 'express';
import http from 'http';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import OpenAI from 'openai';

function generateTheologicalFallbackResponse(messageText: string, context?: any): string {
  const query = (messageText || '').toLowerCase();

  // If query asks for a sermon, bosquejo, predica, or specific bible text
  if (
    query.includes('serm') || 
    query.includes('bosquejo') || 
    query.includes('predica') || 
    query.includes('1 timoteo') || 
    query.includes('timoteo') || 
    query.includes('salmo') || 
    query.includes('juan') || 
    query.includes('romanos') || 
    query.includes('mateo') || 
    query.includes('pasaje') || 
    query.includes('texto final')
  ) {
    const isTimoteo = query.includes('timoteo') || query.includes('4:12');
    const isSalmo = query.includes('salmo') || query.includes('23');

    if (isTimoteo) {
      return `### 📜 NINGUNO TENGA EN POCO TU JUVENTUD

**Texto Principal:** 1 Timoteo 4:12  
**Textos Secundarios:** 1 Samuel 17:42, Jeremías 1:6-8, Tito 2:7-8  
**Idea Principal:** El liderazgo y testimonio cristiano no se miden por la edad cronológica, sino por la integridad del carácter, la pureza moral y la fidelidad visible en la conducta diaria.

---

#### 🎙️ INTRODUCCIÓN CON EXÉGESIS
En una cultura que exalta la experiencia acumulada pero a menudo tolera la tibieza moral, la juventud creyente enfrenta el desafío de demostrar una fe auténtica y madura sin dejarse amedrentar por los prejuicios sociales o religiosos.

Timoteo, siendo un pastor joven al frente de la iglesia en Éfeso, enfrentaba presiones internas y oposición de líderes mayores. Pablo escribe esta carta pastoral para infundir valentía y recordarle que la autoridad espiritual no se exige con títulos, sino que se demuestra con una conducta irreprensible.

En el texto griego koiné, el verbo "tenga en poco" es *kataphroneō* (καταφρονέω), compuesto por *kata* (hacia abajo) y *phroneō* (pensar/estimar), que significa literalmente "despreciar o considerar inferior". Pablo ordena en modo imperativo (*kataphroneitō*) que Timoteo no permita que la iglesia rebaje su llamado a causa de su corta edad.

*¿Cómo podemos vivir de tal manera que nuestra fe e integridad sean irreprochables ante Dios y ante la congregación?*

---

#### 🏛️ DESARROLLO HOMILÉTICO

#### I. EL MODELO EN PALABRA Y CONDUCTA
> **Lectura:** *"Ninguno tenga en poco tu juventud, sino sé ejemplo de los creyentes en palabra, conducta..."*

Pablo establece el estándar del joven creyente comenzando por dos áreas inmediatas y visibles: la pureza del habla y la coherencia del testimonio en la vida cotidiana.

**Exégesis:** La palabra "ejemplo" en griego es *typos* (τύπος), el cuño o marca indeleble dejada por un sello. Significa ser un patrón moldeable que otros puedan imitar. "Palabra" (*logos*) y "conducta" (*anastrophē*) abarcan tanto el contenido de nuestras conversaciones como la ética integral de vida.

**Desarrollo y Aplicación Pastoral:** No basta con profesar doctrinas correctas si los labios vierten chisme o falsedad. La conducta diaria debe reflejar la gracia transformadora de Cristo en la familia, el trabajo y los estudios.

> 🔥 *"La autoridad espiritual no se exige con títulos ni edad; se demuestra con una vida de integridad que silencia toda crítica."*

*[A medida que cuidamos nuestro testimonio externo, debemos examinar la motivación interna del corazón...]*

---

#### II. LA TRÍADA DE LA MADUREZ ESPIRITUAL
> **Lectura:** *"...en amor, espíritu, fe..."*

El apóstol avanza hacia las virtudes del hombre interior que sustentan el testimonio público: la motivación suprema del amor y la firmeza doctrinaria de la fe.

**Exégesis:** "Amor" traduce el griego *agape* (ἀγάπη), el amor incondicional y sacrificial. "Fe" (*pistis*) denota tanto la fidelidad inquebrantable a las verdades bíblicas como la confianza absoluta en Dios durante la prueba.

**Desarrollo y Aplicación Pastoral:** El servicio sin amor agape se convierte en activismo hueco. Cultivar una fe profunda mediante el estudio bíblico constante otorga la madurez que la iglesia necesita en tiempos de confusión.

> 🔥 *"La fe viva no calcula riesgos humanos; descansa plenamente en la soberanía divina."*

*[Finalmente, Pablo corona esta exhortación señalando el resguardo moral indispensable...]*

---

#### III. LA PUREZA COMO CORONA DEL SERVICIO
> **Lectura:** *"...en pureza."*

La consagración moral en pensamientos, afectos e intenciones es el sello distintivo de quien ministra el Evangelio de Jesucristo.

**Exégesis:** El término griego *hagneia* (ἁγνεία) se refiere a la pureza casta, la santidad ética y la limpieza de intenciones en las relaciones personales y afectivas.

**Desarrollo y Aplicación Pastoral:** En una sociedad hipersexualizada, la pureza del creyente es un testimonio contracultural de gran poder. Guardar la mente y los afectos garantiza permanecer como vaso limpio para el uso del Señor.

> 🔥 *"Un corazón puro es el testimonio más poderoso para reflejar la gloria de Dios a una generación sedienta de verdad."*

*[Con estas virtudes grabadas en el alma, respondemos al llamado soberano de Dios...]*

---

#### 🎯 CONCLUSIÓN Y LLAMADO
Ser ejemplo no es una opción para unos pocos líderes electos, sino el imperativo divino para todo creyente. Tu juventud o tu condición actual no son un obstáculo, son tu plataforma para glorificar a Cristo.

Hoy el Señor te llama a renovar tu consagración, vestir tu vida de amor y fe inquebrantable, y levantarte como un referente de santidad para tu generación.

> **Versículo de Cierre:** *"Procura con diligencia presentarte a Dios aprobado, como obrero que no tiene de qué avergonzarse, que usa bien la palabra de verdad."* — **2 Timoteo 2:15**`;
    }

    if (isSalmo) {
      return `### 📜 EL SEÑOR ES MI PASTOR: NADA ME FALTARÁ

**Texto Principal:** Salmos 23:1-6  
**Textos Secundarios:** Juan 10:11, Isaías 40:11, Filipenses 4:19  
**Idea Principal:** La suficiencia absoluta de Dios como nuestro Pastor divino garantiza provisión, guía, restauración y victoria frente a cualquier valle de sombra o aflicción.

---

#### 🎙️ INTRODUCCIÓN CON EXÉGESIS
En un mundo invadido por la ansiedad económica, el aislamiento emocional y la incertidumbre del futuro, la promesa de la suficiencia divina en el Salmo 23 brilla como un ancla inamovible para el alma creyente.

David, habiendo sido pastor de ovejas en los desiertos de Judea antes de ser rey de Israel, conocía perfectamente la fragilidad de las ovejas y la entrega total que requiere un pastor digno de confianza.

En el texto hebreo, la primera declaración es *Yahweh Ro'i* (יְהוָה רֹעִי), "Yahvé es mi Pastor". Usar el nombre del pacto (*Yahweh*) junto al verbo pastoril implica una relación íntima, personal y soberana. La conclusión *lo echsar* (לֹא אֶחְסָר) no significa que no tendremos deseos terrenales, sino que no careceremos de nada de lo necesario para cumplir la voluntad divina.

*¿Cómo cambia nuestra vida cuando confiamos en que Dios es nuestro Pastor todopoderoso?*

---

#### 🏛️ DESARROLLO HOMILÉTICO

#### I. LA PROVISIÓN Y EL DESCANSO EN DIOS
> **Lectura:** *"En lugares de delicados pastos me hará descansar; junto a aguas de reposo me pastoreará."*

El Pastor divino no conduce a sus ovejas al agotamiento, sino a la abundancia de su gracia y al reposo que restaura las fuerzas del alma.

**Exégesis:** "Delicados pastos" (*bin'ot deshe*) describe los pastos verdes y tiernos del desierto temprano. "Aguas de reposo" (*me menuchot*) se refiere a aguas tranquilas y profundas donde las ovejas temerosas pueden beber sin pánico.

**Desarrollo y Aplicación Pastoral:** Dios provee el alimento espiritual mediante su Palabra y nos invita a reposar en su soberanía cuando las cargas de la vida abruman nuestra mente.

> 🔥 *"El descanso espiritual no es la ausencia de problemas, sino la presencia de Dios en medio de ellos."*

*[Del reposo de la gracia, el Pastor nos conduce a la caminata de la justicia...]*

---

#### II. LA GUÍA EN EL VALLE DE SOMBRA
> **Lectura:** *"Aunque ande en valle de sombra de muerte, no temeré mal alguno, porque tú estarás conmigo..."*

La vida cristiana no está exenta de valles oscuros o momentos de prueba intensa, pero la presencia de Dios transforma el pánico en victoria.

**Exégesis:** "Sombra de muerte" (*tsalmavet*) significa oscuridad profunda o sombras amenazantes. "Tu vara y tu cayado" (*shivteka umishan'teka*) representan la vara de protección defensiva contra fieras y el cayado de dirección amorosa.

**Desarrollo y Aplicación Pastoral:** En el duelo, la enfermedad o la prueba, la presencia del Pastor nos sostiene. Su disciplina nos corrige y su cayado nos devuelve al camino de salvación.

> 🔥 *"La sombra de la muerte puede intimidarte, pero no puede dañarte porque la Luz del mundo camina a tu lado."*

*[El valle oscurecido no es el destino final; el Pastor nos prepara una mesa de victoria...]*

---

#### III. LA MESA PREPARADA Y EL DESTINO ETERNO
> **Lectura:** *"Aderezas mesa delante de mí en presencia de mis angustiadores; unges mi cabeza con aceite; mi copa está rebosando."*

El Salmo culmina con una imagen triunfal: el Pastor divino actúa como el Anfitrión de honor que celebra el triunfo de sus siervos ante sus enemigos.

**Exégesis:** "Unges" (*dishenta*) hace referencia al aceite perfumado con que se recibía a los huéspedes de honor. "Copa rebosante" (*cosi revayah*) simboliza el gozo colmado e inagotable.

**Desarrollo y Aplicación Pastoral:** Dios nos honra en Cristo Jesús y nos concede un gozo que las circunstancias del mundo jamás podrán arrebatar.

> 🔥 *"Tu copa no se llena por los recursos del mundo, sino por la abundancia inagotable del Espíritu Santo."*

*[Con esta certeza victoriosa, miramos hacia la eternidad...]*

---

#### 🎯 CONCLUSIÓN Y LLAMADO
Yahvé es tu Pastor. Si hoy te encuentras en un valle de sombra, desalentado o temeroso del mañana, recuerda que su vara y su cayado te sostienen, y que su bien y su misericordia te seguirán todos los días de tu vida.

Entrega hoy las riendas de tu vida a Jesucristo, el Buen Pastor que da su vida por sus ovejas.

> **Versículo de Cierre:** *"Yo soy el buen pastor; el buen pastor su vida da por las ovejas."* — **Juan 10:11**`;
    }

    return `### 📜 SERMÓN HOMILÉTICO Y EXEGÉTICO: ${messageText.slice(0, 40)}

**Texto Principal:** Pasaje Solicitado  
**Textos Secundarios:** Hebreos 4:12, 2 Timoteo 3:16  
**Idea Principal:** La Palabra de Dios revelada transforma integralmente el carácter y la vida del creyente a la imagen de Jesucristo.

---

#### 🎙️ INTRODUCCIÓN CON EXÉGESIS
El estudio profundo de las Sagradas Escrituras demanda un acercamiento reverente, exegético y pastoral que extraiga la verdad original del texto para aplicarla a la vida contemporánea.

Este pasaje fue redactado dentro de un marco histórico-gramatical preciso con el propósito de fortalecer la fe de la iglesia primitiva y guiarnos hacia una consagración plena.

En el idioma original, los términos clave comunican la firmeza del pacto divino y la suficiencia de la gracia de Dios para sostener al creyente frente a las adversidades.

*¿De qué manera esta verdad transformadora debe impactar nuestro caminar diario?*

---

#### 🏛️ DESARROLLO HOMILÉTICO

#### I. EL FUNDAMENTO EN LA PALABRA
> **Lectura:** *"El texto bíblico revelado para nuestra enseñanza."*

El primer pilar de la enseñanza nos invita a cimentar nuestra fe únicamente en la verdad escrita de las Sagradas Escrituras.

**Exégesis:** El análisis del texto original revela que la inspiración divina garantiza la autoridad inerrante y la suficiencia del mensaje bíblico.

**Desarrollo y Aplicación Pastoral:** Debemos renovar nuestra mente cada día mediante la lectura y meditación bíblica, permitiendo que la Verdad dirija nuestras decisiones familiares y sociales.

> 🔥 *"La verdad de la Palabra de Dios es la roca firme en un mundo de opiniones cambiantes."*

*[A partir del fundamento bíblico, avanzamos hacia la vivencia práctica de la fe...]*

---

#### II. LA TRANSFORMACIÓN DEL CORAZÓN
> **Lectura:** *"La obra del Espíritu Santo en la vida del creyente."*

La doctrina bíblica no busca únicamente informar la mente, sino transformar los afectos y la voluntad del ser humano.

**Exégesis:** Las palabras clave en griego/hebreo acentúan el cambio profundo de naturaleza que Dios realiza en el corazón de quien cree.

**Desarrollo y Aplicación Pastoral:** La fe viva se evidencia en frutos de amor, perdón, santidad y servicio abnegado al prójimo.

> 🔥 *"La verdadera teología siempre culmina en una doxología de adoración y una vida de santidad."*

*[Con el corazón renovado, asumimos la responsabilidad del testimonio público...]*

---

#### III. LA FIDELIDAD Y EL TESTIMONIO PÚBLICO
> **Lectura:** *"El llamado a ser luz y sal en medio de la generación actual."*

El impacto del Evangelio debe trascender las paredes del templo y reflejarse en cada esfera de la sociedad.

**Exégesis:** Los verbos de acción en el texto original exhortan a una perseverancia continua e inquebrantable en el testimonio cristiano.

**Desarrollo y Aplicación Pastoral:** Seamos embajadores de Cristo en nuestro entorno laboral, académico y comunitario, reflejando el amor de Dios.

> 🔥 *"Una vida consagrada es el mensaje más claro y elocuente del poder del Evangelio."*

*[Con esta gloriosa perspectiva, culminamos renovando nuestro compromiso con el Señor...]*

---

#### 🎯 CONCLUSIÓN Y LLAMADO
Dios nos llama hoy a responder con obediencia humilde y gozosa a su Palabra. Rinde tu vida ante el Señorío de Cristo y camina en la plenitud del Espíritu Santo.

> **Versículo de Cierre:** *"Santifícalos en tu verdad; tu palabra es verdad."* — **Juan 17:17**`;
  }

  if (query.includes('hola') || query.includes('buenos') || query.includes('buenas') || query.includes('saludos')) {
    return `¡Paz y gracia de nuestro Señor Jesucristo! 

Soy el **Asistente Virtual Teológico y Pastoral** del Seminario Teológico Digital. 

¿En qué puedo asistirte hoy en tu formación académica y espiritual?
- **Exégesis y análisis de pasajes bíblicos**
- **Creación de Sermones y Bosquejos Homiléticos**
- **Vocabulario en Griego Koiné y Hebreo Bíblico**
- **Doctrinas de la Fe Cristiana y Teología Sistemática**`;
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

  // Context-aware response if in a specific course or lesson
  if (context?.lessonTitle || context?.courseTitle) {
    return `### Consulta sobre: ${context.lessonTitle || context.courseTitle}

Respecto a tu lección en curso (**${context.lessonTitle || context.courseTitle}**), aquí tienes los ejes clave de estudio:

1. **Fundamento Exegético**: Analizar siempre el texto en su contexto literario, histórico y gramatical original.
2. **Conexión Teológica**: Observar cómo este pasaje o tema se articula dentro del panorama de la teología bíblica y el plan de redención.
3. **Aplicación Pastoral**: Extraer verdades vivas para la edificación personal, el liderazgo cristiano y el servicio a la iglesia.

> *"Procura con diligencia presentarte a Dios aprobado, como obrero que no tiene de qué avergonzarse, que usa bien la palabra de verdad."* — **2 Timoteo 2:15**

¿Deseas profundizar en algún punto específico de esta lección o pasaje?`;
  }

  // Default response for general query
  return `### Orientación Teológica y Pastoral

Respecto a tu consulta sobre **"${messageText}"**:

1. **Contexto Bíblico**: Las Escrituras enseñan la centralidad de Jesucristo en todo el canon bíblico (Lucas 24:27), guiándonos a estudiar cada pasaje considerando su propósito redentor.
2. **Rigor Teológico**: Te recomendamos examinar los pasajes bíblicos paralelos (*analogía de la fe*), consultando el contexto histórico y los pasajes clave de las Sagradas Escrituras (RVR 1960).
3. **Aplicación Práctica**: Toda verdad teológica debe conducir al amor a Dios, la santidad de vida y la edificación del cuerpo de Cristo.

> *"Toda la Escritura es inspirada por Dios, y útil para enseñar, para redargüir, para corregir, para instruir en justicia."* — **2 Timoteo 3:16**

¿Te gustaría profundizar en algún pasaje bíblico o concepto teológico específico sobre este tema?`;
}

async function startServer() {
  const app = express();
  const PORT = 3000;
  const httpServer = http.createServer(app);

  app.use(express.json({ limit: '10mb' }));

  // API Health check
  app.get('/api/health', (_req, res) => {
    res.json({ 
      status: 'ok', 
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.API_KEY),
      hasOpenAIKey: Boolean(process.env.OPENAI_API_KEY)
    });
  });

  // Theological Virtual Assistant Chat Endpoint
  app.post('/api/assistant/chat', async (req, res) => {
    try {
      const { messages, context } = req.body;

      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'Se requiere al menos un mensaje.' });
      }

      const lastUserMsgObj = [...messages].reverse().find((m: any) => m.role === 'user');
      const lastUserText = lastUserMsgObj ? String(lastUserMsgObj.content) : '';

      const openaiKey = process.env.OPENAI_API_KEY;
      const geminiApiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.API_KEY;

      let systemInstruction = `Eres el "Especialista en Teología, Exégesis y Homilética" y Asistente Virtual del Seminario Teológico Digital (STD Campus Interactivo).

CUANDO EL USUARIO PIDA UN SERMÓN, BOSQUEJO, PRÉDICA O MENSAJE DE CUALQUIER PASAJE BÍBLICO, DEBES USAR OBLIGATORIAMENTE ESTA ESTRUCTURA Y FORMATO EXACTO:

### 📜 [TÍTULO DEL SERMÓN]

**Texto Principal:** [Cita Bíblica Base]  
**Textos Secundarios:** [Pasajes Paralelos / Opcional]  
**Idea Principal:** [La Idea Central del Sermón]  

---

#### 🎙️ INTRODUCCIÓN CON EXÉGESIS
[Párrafo con la necesidad o dilema contemporáneo para captar la atención.]

[Párrafo con el contexto histórico-gramatical: autor, fecha, audiencia original y propósito.]

[Párrafo con el análisis exegético en idiomas originales (Griego Koiné o Hebreo Bíblico).]

*[Pregunta de transición que abre paso a los puntos principales...]*

---

#### 🏛️ DESARROLLO HOMILÉTICO

#### I. [NOMBRE Y TÍTULO DEL PUNTO 1]
> **Lectura:** *"[Versículo correspondiente al Punto 1]"*

[Párrafo de introducción del punto que presenta la enseñanza.]

**Exégesis:** [Párrafo con el análisis del texto original, gramática y trasfondo de este versículo.]

**Desarrollo y Aplicación Pastoral:** [Explicación sobre qué hablar en la prédica, la aplicación para la vida diaria y una ilustración práctica recomendada.]

> 🔥 *"Frase o axioma memorable de alto impacto para la congregación."*

*[Puente de transición suave hacia el Punto II...]*

---

#### II. [NOMBRE Y TÍTULO DEL PUNTO 2]
> **Lectura:** *"[Versículo correspondiente al Punto 2]"*

[Párrafo de introducción del punto que presenta la enseñanza.]

**Exégesis:** [Párrafo con el análisis del texto original, gramática y trasfondo de este versículo.]

**Desarrollo y Aplicación Pastoral:** [Explicación sobre qué hablar en la prédica, la aplicación para la vida diaria y una ilustración práctica recomendada.]

> 🔥 *"Frase o axioma memorable de alto impacto para la congregación."*

*[Puente de transición suave hacia el Punto III...]*

---

#### III. [NOMBRE Y TÍTULO DEL PUNTO 3]
> **Lectura:** *"[Versículo correspondiente al Punto 3]"*

[Párrafo de introducción del punto que presenta la enseñanza.]

**Exégesis:** [Párrafo con el análisis del texto original, gramática y trasfondo de este versículo.]

**Desarrollo y Aplicación Pastoral:** [Explicación sobre qué hablar en la prédica, la aplicación para la vida diaria y una ilustración práctica recomendada.]

> 🔥 *"Frase o axioma memorable de alto impacto para la congregación."*

*[Puente de transición hacia la conclusión...]*

---

#### 🎯 CONCLUSIÓN Y LLAMADO
[Resumen homilético con la síntesis de las verdades expuestas.]

[Llamado pastoral directo, desafío para la fe, el arrepentimiento y la consagración.]

> **Versículo de Cierre:** *"[Cita o texto bíblico impactante para terminar]"*

DIRECTRICES CRÍTICAS:
- Basa el sermón ÚNICA Y EXCLUSIVAMENTE en el pasaje bíblico indicado por el usuario.
- Rellena todos los párrafos de corchetes con contenido teológico y pastoral profundo de alta fidelidad, manteniendo las secciones Markdown, divisores (---), bloques de cita (> ) e íconos exactamente como están configurados.`;

      if (context?.courseTitle || context?.lessonTitle) {
        systemInstruction += `\n\nContexto actual del estudiante:\n- Curso en pantalla: ${context.courseTitle || 'No especificado'}\n- Lección en pantalla: ${context.lessonTitle || 'No especificada'}`;
      }

      // 1. Try Gemini API first if API key is present
      if (geminiApiKey) {
        try {
          const ai = new GoogleGenAI({
            apiKey: geminiApiKey,
            httpOptions: {
              headers: {
                'User-Agent': 'aistudio-build',
              }
            }
          });

          const formattedContents = messages.map((m: { role: string; content: string }) => ({
            role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
            parts: [{ text: String(m.content) }],
          }));

          const modelsToTry = ['gemini-2.5-flash', 'gemini-2.5-pro', 'gemini-2.0-flash'];
          let replyText = '';

          for (const modelName of modelsToTry) {
            try {
              const response = await ai.models.generateContent({
                model: modelName,
                contents: formattedContents,
                config: {
                  systemInstruction,
                  temperature: 0.7,
                },
              });
              if (response.text) {
                replyText = response.text;
                break;
              }
            } catch (err: any) {
              console.warn(`Gemini model ${modelName} failed:`, err?.message || err);
            }
          }

          if (replyText) {
            return res.json({ reply: replyText });
          }
        } catch (err: any) {
          console.warn('Gemini request failed, trying fallback OpenAI:', err?.message || err);
        }
      }

      // 2. Try OpenAI if key is present and valid
      if (openaiKey) {
        try {
          const rawBaseUrl = process.env.AI_BASE_URL?.trim();
          const baseURL = rawBaseUrl && (rawBaseUrl.startsWith('http://') || rawBaseUrl.startsWith('https://'))
            ? rawBaseUrl
            : undefined;

          const openai = new OpenAI({ 
            apiKey: openaiKey,
            ...(baseURL ? { baseURL } : {})
          });
          
          const response = await openai.chat.completions.create({
            model: process.env.AI_MODEL || "gpt-4o",
            messages: [
              { role: "system", content: systemInstruction },
              ...messages.map((m: any) => ({
                role: (m.role === 'assistant' ? 'assistant' : 'user') as 'assistant' | 'user',
                content: String(m.content)
              }))
            ],
            temperature: 0.7,
          });

          const replyText = response.choices[0].message.content;
          if (replyText) {
            return res.json({ reply: replyText });
          }
        } catch (err: any) {
          console.warn('OpenAI request failed:', err?.message || err);
        }
      }

      // 3. Guaranteed Fallback Engine (Runs when no API keys are configured or APIs fail)
      const fallbackReply = generateTheologicalFallbackResponse(lastUserText, context);
      return res.json({ reply: fallbackReply });

    } catch (err: any) {
      console.error('Error en /api/assistant/chat:', err);
      const fallbackReply = generateTheologicalFallbackResponse('consulta', req.body?.context);
      return res.json({ reply: fallbackReply });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        hmr: false
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
  });
}

startServer();
