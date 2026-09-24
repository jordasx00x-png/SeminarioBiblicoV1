import React, { useState, useRef, useEffect } from 'react';

export default function ChatTeologico() {
  // ⚠️ REEMPLAZA LAS LETRAS DE ABAJO CON TU LLAVE DE GROQ QUE EMPIEZA CON gsk_
  const API_KEY = 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; 

  const [mensajes, setMensajes] = useState<{ rol: 'user' | 'ia', texto: string }[]>([]);
  const [input, setInput] = useState('');
  const [cargando, setCargando] = useState(false);
  const historialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (historialRef.current) {
      historialRef.current.scrollTop = historialRef.current.scrollHeight;
    }
  }, [mensajes]);

  const enviarPregunta = async () => {
    if (!input.trim() || cargando) return;

    const textoUsuario = input.trim();
    setMensajes(prev => [...prev, { rol: 'user', texto: textoUsuario }]);
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
              content: "Eres un Asistente Virtual Teológico interactivo para una plataforma educativa de Teología y Estudios Bíblicos. Tu deber es responder dudas de manera respetuosa, académica, clara y objetiva basándote en textos teológicos e históricos." 
            },
            { role: "user", content: textoUsuario }
          ]
        })
      });

      const datos = await respuesta.json();
      const respuestaIA = datos.choices[0].message.content;

      setMensajes(prev => [...prev, { rol: 'ia', texto: respuestaIA }]);
    } catch (error) {
      setMensajes(prev => [...prev, { rol: 'ia', texto: "Error al conectar con el asistente teológico. Verifica tu configuración." }]);
      console.error(error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '500px', background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', height: '500px', margin: '20px auto', fontFamily: 'Segoe UI, sans-serif' }}>
      <h3 style={{ margin: '0 0 10px 0', color: '#1A2533', textAlign: 'center', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
        Asistente Teológico Virtual
      </h3>
      
      <div ref={historialRef} style={{ flexGrow: 1, overflowY: 'auto', padding: '10px', marginBottom: '15px', background: '#fafafa', borderRadius: '8px', border: '1px solid #eef0f3' }}>
        {mensajes.map((msg, index) => (
          <div key={index} style={{ 
            margin: '8px 0', padding: '10px 14px', borderRadius: '8px', maxWidth: '80%', wordWrap: 'break-word',
            backgroundColor: msg.role === 'user' ? '#1A2533' : '#e9ecef', 
            color: msg.role === 'user' ? 'white' : '#333',
            marginLeft: msg.role === 'user' ? 'auto' : '0'
          }}>
            {msg.texto}
          </div>
        ))}
        {cargando && <div style={{ color: '#888', fontStyle: 'italic', fontSize: '13px' }}>El asistente está pensando...</div>}
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && enviarPregunta()}
          placeholder="Escribe tu consulta teológica..." 
          style={{ flexGrow: 1, padding: '12px', border: '1px solid #ced4da', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
        />
        <button 
          onClick={enviarPregunta}
          style={{ padding: '12px 20px', background: '#1A2533', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
