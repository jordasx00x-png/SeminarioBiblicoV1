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

      let systemInstruction = `Eres el "Asistente Virtual Teológico y Pastoral" del Seminario Teológico Digital (STD Campus Interactivo). 
Tu misión es asistir y responder todas las preguntas que los estudiantes, pastores y usuarios te hagan, ya sean sobre las clases del seminario, dudas bíblicas, teología sistemática, historia de la iglesia, exégesis bíblica o idiomas originales (griego/hebreo).

Directrices para tus respuestas:
1. Claridad y Pedagogía: Explica con sencillez sin perder profundidad académica ni rigor exegético.
2. Fundamentación Bíblica: Cita versículos y pasajes clave de las Sagradas Escrituras (RVR 1960 u otras traducciones según convenga).
3. Respaldo Histórico y Teológico: Puedes aludir al contexto del Antiguo y Nuevo Testamento, pactos, y la tradición cristiana histórica reformada.
4. Idiomas originales: Si una palabra en griego koiné o hebreo bíblico arroja luz (ej. shalom, heshed, logos, agape, charis), inclúyela con su transliteración y significado.
5. Formato: Utiliza Markdown limpio con negritas, listas o citas destacadas cuando sea pertinente. Sé conciso y claro pero completo.`;

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
