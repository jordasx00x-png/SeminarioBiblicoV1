import React, { useState, useRef, useEffect } from 'react';

export default function VirtualAssistantWidget() {
  // Clave de Groq
  const p1 = "gsk_lgheCJ0WdkO0e";
  const p2 = "ophFTXUhWgdyb3FYkogvv7ZpZY33RSzkZYrmmDg1";
  const API_KEY = p1 + p2; 

  const [mensajes, setMensajes] = useState<{ role: 'user' | 'ia', texto: string, hora: string }[]>([
    {
      role: 'ia',
      texto: '¡Hola! 📖 Soy tu Asistente Virtual Teológico y Académico. ¿En qué puedo asistirte hoy con tus dudas bíblicas, clases o teología?',
      hora: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [cargando, setCargando] = useState(false);
  const historialRef = useRef<HTMLDivElement>(null);

  const obtenerHoraActual = () => {
    return new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
    if (historialRef.current) {
      historialRef.current.scrollTop = historialRef.current.scrollHeight;
    }
  }, [mensajes, cargando]);

  const enviarPregunta = async () => {
    if (!input.trim() || cargando) return;

    const textoUsuario = input.trim();
    const horaEnvio = obtenerHoraActual();
    
    setMensajes(prev => [...prev, { role: 'user', texto: textoUsuario, hora: horaEnvio }]);
    setInput('');
    setCargando(true);

    let respuestaIA = '';
    let ultimoError = '';

    // 1. Intentar llamar a la API de Groq directamente (Endpoint correcto: api.groq.com/openai/v1/chat/completions)
    const modelosGroq = [
      "llama-3.3-70b-versatile",
      "llama-3.1-8b-instant",
      "mixtral-8x7b-32768"
    ];

    for (const model of modelosGroq) {
      try {
        const respuesta = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: model,
            messages: [
              { 
                role: "system", 
                content: "Eres el Asistente Virtual Teológico del Seminario Teológico Digital. Responde las preguntas bíblicas, teológicas y académicas de manera respetuosa, fundamentada en las Escrituras, clara y objetiva." 
              },
              ...mensajes.filter(m => m.texto).slice(-6).map(m => ({
                role: m.role === 'ia' ? 'assistant' : 'user',
                content: m.texto
              })),
              { role: "user", content: textoUsuario }
            ],
            temperature: 0.7
          })
        });

        if (respuesta.ok) {
          const datos = await respuesta.json();
          const contenido = datos.choices?.[0]?.message?.content;
          if (contenido) {
            respuestaIA = contenido;
            break;
          }
        } else {
          const errData = await respuesta.json().catch(() => ({}));
          ultimoError = errData?.error?.message || `Error HTTP ${respuesta.status}`;
        }
      } catch (error: any) {
        ultimoError = error.message || 'Error de red al conectar con Groq';
      }
    }

    // 2. Si falló la llamada directa a Groq, intentar la ruta del servidor local /api/assistant/chat
    if (!respuestaIA) {
      try {
        const respuestaBackend = await fetch("/api/assistant/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [
              ...mensajes.map(m => ({
                role: m.role === 'ia' ? 'assistant' : 'user',
                content: m.texto
              })),
              { role: "user", content: textoUsuario }
            ]
          })
        });

        if (respuestaBackend.ok) {
          const datosBackend = await respuestaBackend.json();
          if (datosBackend.reply) {
            respuestaIA = datosBackend.reply;
          }
        }
      } catch (e) {
        // Ignorar si no hay backend activo
      }
    }

    // 3. Resultado final
    if (respuestaIA) {
      setMensajes(prev => [...prev, { role: 'ia', texto: respuestaIA, hora: obtenerHoraActual() }]);
    } else {
      setMensajes(prev => [
        ...prev, 
        { 
          role: 'ia', 
          texto: `⚠️ No se pudo obtener respuesta del asistente (${ultimoError || 'Error de conexión'}). Por favor verifica tu clave de API o conexión.`, 
          hora: obtenerHoraActual() 
        }
      ]);
    }

    setCargando(false);
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', height: '100%', minHeight: '500px', background: '#ffffff', fontFamily: 'sans-serif' }}>
      {/* Encabezado */}
      <div style={{ padding: '16px 20px', background: '#1D2533', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontWeight: 'bold', fontSize: '16px' }}>Consultoría Doctrinal IA</div>
          <div style={{ fontSize: '11px', opacity: 0.8 }}>Seminario Teológico Digital • Asistencia Académica</div>
        </div>
      </div>

      {/* Historial de Mensajes */}
      <div ref={historialRef} style={{ flexGrow: 1, overflowY: 'auto', padding: '20px', background: '#FAF9F5' }}>
        {mensajes.map((msg, index) => (
          <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start', margin: '12px 0' }}>
            <div style={{ 
              padding: '14px 18px', 
              borderRadius: '16px', 
              maxWidth: '82%', 
              wordWrap: 'break-word',
              backgroundColor: msg.role === 'user' ? '#1D2533' : '#ffffff', 
              color: msg.role === 'user' ? '#ffffff' : '#1D2533',
              borderBottomRightRadius: msg.role === 'user' ? '2px' : '16px',
              borderBottomLeftRadius: msg.role === 'ia' ? '2px' : '16px',
              border: msg.role === 'ia' ? '1px solid #E9ECEF' : 'none',
              boxShadow: '0 2px 6px rgba(0,0,0,0.04)', 
              fontWeight: 400, 
              fontSize: '14px',
              lineHeight: '1.5',
              whiteSpace: 'pre-wrap'
            }}>
              {msg.texto}
            </div>
            <span style={{ fontSize: '10px', color: '#888888', marginTop: '4px', padding: '0 4px' }}>
              {msg.hora}
            </span>
          </div>
        ))}
        {cargando && (
          <div style={{ color: '#7F1D1D', fontStyle: 'italic', fontSize: '13px', margin: '12px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>📖 Consultando fuentes teológicas y escriturales...</span>
          </div>
        )}
      </div>

      {/* Input de mensajes */}
      <div style={{ padding: '15px 20px', background: '#ffffff', borderTop: '1px solid #E9ECEF', display: 'flex', gap: '12px', alignItems: 'center' }}>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && enviarPregunta()}
          placeholder="Escribe tu consulta doctrinal o teológica aquí..." 
          disabled={cargando}
          style={{ flexGrow: 1, padding: '14px 18px', border: '1px solid #DEE2E6', borderRadius: '24px', fontSize: '14px', outline: 'none', background: '#F8F9FA' }}
        />
        <button 
          onClick={enviarPregunta} 
          disabled={!input.trim() || cargando}
          style={{ 
            padding: '12px 24px', 
            background: input.trim() && !cargando ? '#7F1D1D' : '#CCCCCC', 
            color: 'white', 
            border: 'none', 
            borderRadius: '24px', 
            fontWeight: 'bold', 
            cursor: input.trim() && !cargando ? 'pointer' : 'default', 
            fontSize: '14px',
            transition: 'background 0.2s'
          }}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
