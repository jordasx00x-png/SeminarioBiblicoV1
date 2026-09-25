import express from 'express';
import http from 'http';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import OpenAI from 'openai';

async function startServer() {
  const app = express();
  const PORT = 3000;
  const httpServer = http.createServer(app);

  app.use(express.json({ limit: '10mb' }));

  // API Health check
  app.get('/api/health', (_req, res) => {
    res.json({ 
      status: 'ok', 
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
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

      const openaiKey = process.env.OPENAI_API_KEY;
      const geminiKey = process.env.GEMINI_API_KEY;

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

      // Logic to prefer OpenAI if key is present
      if (openaiKey) {
        const openai = new OpenAI({ 
          apiKey: openaiKey,
          baseURL: process.env.AI_BASE_URL || undefined // Allows using GitHub Models or other providers
        });
        
        const response = await openai.chat.completions.create({
          model: process.env.AI_MODEL || "gpt-4o", // Allows custom models
          messages: [
            { role: "system" as const, content: systemInstruction },
            ...messages.map((m: any) => ({
              role: (m.role === 'assistant' ? 'assistant' : 'user') as "assistant" | "user",
              content: m.content
            }))
          ],
          temperature: 0.7,
        });

        const replyText = response.choices[0].message.content;
        return res.json({ reply: replyText });
      }

      // Fallback to Gemini if requested specifically or if OpenAI key is missing
      if (geminiKey) {
        const ai = new GoogleGenAI({
          apiKey: geminiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            }
          }
        });

        const formattedContents = messages.map((m: { role: string; content: string }) => ({
          role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
          parts: [{ text: m.content }],
        }));

        const modelsToTry = ['gemini-2.0-flash', 'gemini-1.5-flash'];
        let replyText = '';
        let lastError = null;

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
            lastError = err;
          }
        }

        if (replyText) {
          return res.json({ reply: replyText });
        }
        if (lastError) throw lastError;
      }

      return res.status(503).json({
        error: 'El asistente requiere una clave de API (OPENAI_API_KEY o GEMINI_API_KEY). Por favor configúrela en Settings > Secrets.'
      });

    } catch (err: any) {
      console.error('Error en /api/assistant/chat:', err);
      return res.status(500).json({
        error: err?.message || 'Ocurrió un error al consultar el asistente virtual.'
      });
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
