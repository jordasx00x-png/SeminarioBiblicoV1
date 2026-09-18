import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Helper for lazy Gemini initialization
  let aiClient: GoogleGenAI | null = null;
  function getGeminiClient(): GoogleGenAI {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY no está configurada en las variables de entorno.");
      }
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return aiClient;
  }

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  // AI Theological Assistant Endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { prompt, lessonContext, history } = req.body;

      if (!prompt || typeof prompt !== 'string') {
        return res.status(400).json({ error: "El mensaje es requerido." });
      }

      const ai = getGeminiClient();

      const systemInstruction = `Eres un Asistente Teológico y Tutor Académico de excelencia para el Seminario Teológico Digital.
Tu objetivo es responder dudas, explicar conceptos teológicos, pasajes bíblicos, hermenéutica, exégesis, historia de la iglesia, idiomas bíblicos (griego y hebreo) y aplicaciones doctrinales para los estudiantes.

Instrucciones clave:
1. Mantén un tono sumamente respetuoso, reverente, académico, claro y pastoral.
2. Si la consulta es sobre una clase o lección específica (Contexto provisto), utiliza los datos de esa clase para profundizar de forma muy precisa.
3. Fundamenta tus respuestas en la Biblia y en la sana doctrina con referencias bíblicas claras (Libro Capítulo:Versículo).
4. Sé directo, estructurado y educativo. Utiliza viñetas o párrafos cortos si la respuesta es extensa.
5. Responde siempre en idioma Español.

${lessonContext ? `CONTEXTO DE LA CLASE ACTUAL:
- Título de la clase: "${lessonContext.title || 'N/A'}"
- Curso: "${lessonContext.courseTitle || 'N/A'}"
${lessonContext.textSnippet ? `- Fragmento/Resumen de la lección: "${lessonContext.textSnippet.substring(0, 1500)}"` : ''}` : ''}`;

      // Build contents array with history if available
      const contentsArray: any[] = [];

      if (Array.isArray(history) && history.length > 0) {
        for (const item of history.slice(-6)) {
          contentsArray.push({
            role: item.role === 'user' ? 'user' : 'model',
            parts: [{ text: item.text }]
          });
        }
      }

      contentsArray.push({
        role: 'user',
        parts: [{ text: prompt }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: contentsArray,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const textResponse = response.text || "No se pudo generar una respuesta en este momento.";
      return res.json({ response: textResponse });

    } catch (error: any) {
      console.error("Error en Gemini API (/api/chat):", error);
      return res.status(500).json({
        error: error.message || "Ocurrió un error al procesar tu consulta con la IA.",
        isKeyMissing: !process.env.GEMINI_API_KEY
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
  });
}

startServer();
