import React, { useState, useRef, useEffect } from 'react';

export default function VirtualAssistantWidget() {
  // ⚠️ TU LLAVE DE GROQ (LA QUE EMPIEZA CON gsk_)
const API_KEY = (import.meta.env as any).VITE_GROQ_API_KEY;

  const [mensajes, setMensajes] = useState<{ rol: 'user' | 'ia', texto: string, hora: string }[]>([]);
  const [input, setInput] = useState('');
  const [cargando, setCargando] = useState(false);
  const historialRef = useRef<HTMLDivElement>(null);

  // Obtener la hora actual en formato bonito (ej: 4:30 PM)
  const obtenerHoraActual = () => {
    return new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
    if (historialRef.current) {
      historialRef.current.scrollTop = historialRef.current.scrollHeight;
    }
  }, [mensajes]);

  const enviarPregunta = async () => {
    if (!input.trim() || cargando) return;

    const textoUsuario = input.trim();
    const horaEnvio = obtenerHoraActual();
    
    setMensajes(prev => [...prev, { rol: 'user', texto: textoUsuario, hora: horaEnvio }]);
    setInput('');

    try {
      setCargando(true);
      const respuesta = await fetch("https://groq.com", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages: [
            { 
              role: "system", 
              content: "Eres un Asistente Virtual Teológico interactivo para una plataforma educativa de Teología y Estudios Bíblicos llamada Campus Virtual - Asistencia Teológica IA. Tu deber es responder dudas de manera respetuosa, académica, clara y objetiva basándote en textos teológicos e históricos." 
            },
            { role: "user", content: textoUsuario }
          ]
        })
      });

      const datos = await respuesta.json();
      const respuestaIA = datos.choices.message.content;

      setMensajes(prev => [...prev, { rol: 'ia', texto: respuestaIA, hora: obtenerHoraActual() }]);
    } catch (error) {
      setMensajes(prev => [...prev, { rol: 'ia', texto: "Error al conectar con la IA. Por favor, intenta de nuevo.", hora: obtenerHoraActual() }]);
      console.error(error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)', fontFamily: 'Segoe UI, sans-serif', background: '#ffffff' }}>
      
      {/* Contenedor de mensajes */}
      <div ref={historialRef} style={{ flexGrow: 1, overflowY: 'auto', padding: '20px', background: '#ffffff' }}>
        {mensajes.map((msg, index) => (
          <div key={index} style={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
            margin: '15px 0' 
          }}>
            {/* Burbuja de Mensaje (Color azul oscuro de tu captura para el usuario) */}
            <div style={{ 
              padding: '14px 18px', 
              borderRadius: '16px', 
              maxWidth: '75%', 
              wordWrap: 'break-word',
              backgroundColor: msg.role === 'user' ? '#111E2E' : '#E9ECEF', 
              color: msg.role === 'user' ? '#ffffff' : '#111111',
              borderBottomRightRadius: msg.role === 'user' ? '2px' : '16px',
              borderBottomLeftRadius: msg.role === 'ia' ? '2px' : '16px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
              fontWeight: 500,
              fontSize: '15px'
            }}>
              {msg.texto}
            </div>
            {/* Hora en la parte inferior de la burbuja */}
            <span style={{ fontSize: '11px', color: '#6C757D', marginTop: '4px', padding: '0 4px' }}>
              {msg.hora}
            </span>
          </div>
        ))}
        {cargando && (
          <div style={{ color: '#6C757D', fontStyle: 'italic', fontSize: '13px', margin: '10px 0' }}>
            Consultando fuentes teológicas...
          </div>
        )}
      </div>

      {/* Barra de Entrada de texto inferior */}
      <div style={{ padding: '15px 20px', background: '#ffffff', borderTop: '1px solid #E9ECEF', display: 'flex', gap: '12px', alignItems: 'center' }}>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && enviarPregunta()}
          placeholder="Escribe tu consulta doctrinal o teológica aquí..." 
          style={{ flexGrow: 1, padding: '14px 18px', border: '1px solid #DEE2E6', borderRadius: '24px', fontSize: '14px', outline: 'none', background: '#F8F9FA' }}
        />
        <button 
          onClick={enviarPregunta}
          style={{ padding: '12px 24px', background: '#111E2E', color: 'white', border: 'none', borderRadius: '24px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
