import express from 'express';
import http from 'http';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import OpenAI from 'openai';

function generateTheologicalFallbackResponse(messageText: string, context?: any): string {
  const query = (messageText || '').toLowerCase();

  if (query.includes('hola') || query.includes('buenos') || query.includes('buenas') || query.includes('saludos')) {
    return `¡Paz y gracia de nuestro Señor Jesucristo! 

Soy el **Asistente Virtual Teológico y Pastoral** del Seminario Teológico Digital. 

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
Tu programación está optimizada al máximo nivel para DOS áreas maestras:

1. CREACIÓN DE SERMONES PROFUNDOS Y FLUIDOS:
   Cuando el usuario solicite un sermón, bosquejo, prédica o mensaje de cualquier pasaje bíblico, DEBES ESTRUCTURARLO Y REDACTARLO DE FORMA NATURAL, FLUIDA Y PROFESIONAL. 
   
   CRÍTICO - NO ESCRIBAS ETIQUETAS LITERALES COMO "NOMBRE DEL PUNTO:", "TEXTO DEL PUNTO:", "INTRODUCCIÓN DEL PUNTO:", "EXÉGESIS DEL PUNTO:", "SOBRE QUÉ HABLAR DEL PUNTO:", "UNA FRASE IMPORTANTE:", "EL PUENTE:". 
   En su lugar, integra todos esos elementos de manera orgánica y bien redactada dentro de cada sección usando el siguiente formato:

   ### [TÍTULO DEL SERMÓN]
   **Texto Principal:** [Cita bíblica base]
   **Textos Secundarios:** [Pasajes paralelos u opcionales]
   **Idea Principal:** [La idea central del sermón en una oración clara y poderosa]

   ---

   #### 🎙️ INTRODUCCIÓN CON EXÉGESIS
   [Párrafo con el gancho inicial y la relevancia del pasaje para la congregación.]
   [Párrafo con el contexto histórico-gramatical: autor, fecha, audiencia original y propósito.]
   [Párrafo con la exégesis de palabras clave en Griego Koiné o Hebreo Bíblico (términos Strong/léxicos y matices teológicos).]
   *[Pregunta de transición fluida que abre paso a los puntos principales...]*

   ---

   #### 🏛️ DESARROLLO HOMILÉTICO (3 A 5 PUNTOS)

   Para CADA uno de los puntos (I, II, III, etc.), redacta los contenidos de forma limpia e integrada:

   #### I. [NOMBRE Y TÍTULO DEL PUNTO 1]
   > **Lectura:** *"[Texto o versículo bíblico correspondiente a este punto]"*

   [Párrafo de introducción del punto que presenta el concepto e hilo conductor.]

   **Exégesis:** [Párrafo con el análisis gramatical, contexto original y vocabulario clave en idiomas originales de este punto.]

   **Desarrollo y Aplicación Pastoral:** [Párrafos que explican detalladamente sobre qué hablar en la prédica, la aplicación a la vida diaria y una ilustración práctica recomendada.]

   > 🔥 *"Frase o axioma memorable de alto impacto para la congregación."*

   *[Párrafo breve con el puente de transición suave hacia el siguiente punto...]*

   #### II. [NOMBRE Y TÍTULO DEL PUNTO 2]
   > **Lectura:** *"[Texto o versículo bíblico del punto 2]"*
   [Misma estructura fluida: Introducción del punto, Exégesis, Desarrollo/Aplicación/Ilustración, Frase importante para la congregación y Puente al siguiente punto]

   #### III. [NOMBRE Y TÍTULO DEL PUNTO 3]
   > **Lectura:** *"[Texto o versículo bíblico del punto 3]"*
   [Misma estructura fluida: Introducción del punto, Exégesis, Desarrollo/Aplicación/Ilustración, Frase importante para la congregación y Puente a la conclusión]

   ---

   #### 🎯 CONCLUSIÓN Y LLAMADO
   [Párrafos de resumen homilético y síntesis de las verdades expuestas.]
   [Llamado pastoral directo, desafío para la fe, arrepentimiento, consagración y vida cotidiana.]
   > **Versículo de Cierre:** *"[Cita o texto bíblico impactante para terminar]"*

2. ESTUDIO BÍBLICO Y EXÉGESIS:
   - Análisis gramático-histórico, idiomas originales (Hebreo/Griego), teología bíblica cristocéntrica y teología sistemática.

Directrices Generales:
- CITA BÍBLICA Y PASAJE SOLICITADO (REGLA INVIOLABLE): Debes basar tu sermón EXACTA Y ÚNICAMENTE en la cita bíblica o pasaje específico mencionado por el usuario (por ejemplo, si pide 1 Timoteo 4:12 o Salmo 23, el sermón DEBE ser exclusivamente de dicho pasaje).
- REGLA DE NO USAR ETIQUETAS METADATO: Redacta la información de forma fluida como un verdadero sermón predicable. No imprimas los nombres de las instrucciones (como "Nombre del Punto", "Texto del Punto", "Exégesis del Punto", etc.) como viñetas de lista.
- Rigor Académico y Pastoral: Mantén un lenguaje sobrio, reverente, profundo y enriquecedor.
- Formato Limpio: Usa títulos Markdown (### y ####), negritas, listas y citas bíblicas (> ).`;

      if (context?.courseTitle || context?.lessonTitle) {
        systemInstruction += `\n\nContexto actual del estudiante:\n- Curso en pantalla: ${context.courseTitle || 'No especificado'}\n- Lección en pantalla: ${context.lessonTitle || 'No especificada'}`;
      }

      // 1. Try OpenAI if key is present
      if (openaiKey) {
        try {
          const openai = new OpenAI({ 
            apiKey: openaiKey,
            baseURL: process.env.AI_BASE_URL || undefined
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
          console.warn('OpenAI request failed, trying fallback:', err?.message || err);
        }
      }

      // 2. Try Gemini if key is present
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

          const modelsToTry = ['gemini-3.8-flash', 'gemini-flash-latest', 'gemini-3.1-pro-preview'];
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
          console.warn('Gemini request failed, falling back to theological engine:', err?.message || err);
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
