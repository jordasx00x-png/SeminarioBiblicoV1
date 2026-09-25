import React, { useState, useRef, useEffect } from 'react';

type Mensaje = {
  rol: 'user' | 'ia';
  texto: string;
  hora: string;
};

export default function VirtualAssistantWidget() {
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [input, setInput] = useState('');
  const [cargando, setCargando] = useState(false);
  const historialRef = useRef<HTMLDivElement>(null);

  const obtenerHoraActual = () =>
    new Date().toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    });

  useEffect(() => {
    historialRef.current?.scrollTo({
      top: historialRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [mensajes, cargando]);

  const enviarPregunta = async () => {
    const textoUsuario = input.trim();
    if (!textoUsuario || cargando) return;

    const mensajeUsuario: Mensaje = {
      rol: 'user',
      texto: textoUsuario,
      hora: obtenerHoraActual(),
    };

    const historialActual = [...mensajes, mensajeUsuario];
    setMensajes(historialActual);
    setInput('');
    setCargando(true);

    try {
      const respuesta = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: historialActual.map((m) => ({
            role: m.rol === 'ia' ? 'assistant' : 'user',
            content: m.texto,
          })),
        }),
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(datos?.error || 'No se pudo consultar el asistente.');
      }

      setMensajes((prev) => [
        ...prev,
        {
          rol: 'ia',
          texto: datos.reply || 'No recibí una respuesta. Intenta nuevamente.',
          hora: obtenerHoraActual(),
        },
      ]);
    } catch (error) {
      console.error(error);
      setMensajes((prev) => [
        ...prev,
        {
          rol: 'ia',
          texto:
            'No pude conectar con el asistente en este momento. Verifica la conexión y vuelve a intentarlo.',
          hora: obtenerHoraActual(),
        },
      ]);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100dvh - 95px)',
        minHeight: '480px',
        background: '#ffffff',
      }}
    >
      <div
        ref={historialRef}
        style={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: '20px',
          paddingBottom: '12px',
          background: '#ffffff',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {mensajes.length === 0 && (
          <div
            style={{
              maxWidth: '680px',
              margin: '20px auto',
              padding: '20px',
              borderRadius: '16px',
              background: '#F8F9FA',
              color: '#1D2533',
              lineHeight: 1.6,
            }}
          >
            <strong>¡Paz y gracia!</strong>
            <br />
            Soy tu Asistente Virtual Teológico y Académico. Pregúntame sobre
            Biblia, teología, doctrina, historia de la Iglesia o exégesis.
          </div>
        )}

        {mensajes.map((msg, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: msg.rol === 'user' ? 'flex-end' : 'flex-start',
              margin: '15px auto',
              width: '100%',
              maxWidth: '900px',
            }}
          >
            <div
              style={{
                padding: '14px 18px',
                borderRadius: '16px',
                maxWidth: '78%',
                wordWrap: 'break-word',
                whiteSpace: 'pre-wrap',
                backgroundColor: msg.rol === 'user' ? '#1D2533' : '#E9ECEF',
                color: msg.rol === 'user' ? '#ffffff' : '#111111',
                borderBottomRightRadius: msg.rol === 'user' ? '2px' : '16px',
                borderBottomLeftRadius: msg.rol === 'ia' ? '2px' : '16px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                fontWeight: 500,
                fontSize: '15px',
                lineHeight: 1.5,
              }}
            >
              {msg.texto}
            </div>
            <span
              style={{
                fontSize: '11px',
                color: '#6C757D',
                marginTop: '4px',
                padding: '0 4px',
              }}
            >
              {msg.hora}
            </span>
          </div>
        ))}

        {cargando && (
          <div
            style={{
              maxWidth: '900px',
              margin: '10px auto',
              color: '#6C757D',
              fontStyle: 'italic',
              fontSize: '13px',
            }}
          >
            Consultando al asistente...
          </div>
        )}
      </div>

      <div
        style={{
          padding: '12px 16px calc(12px + env(safe-area-inset-bottom))',
          background: '#ffffff',
          borderTop: '1px solid #E9ECEF',
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && enviarPregunta()}
          placeholder="Escribe tu consulta..."
          disabled={cargando}
          style={{
            flexGrow: 1,
            minWidth: 0,
            padding: '14px 18px',
            border: '1px solid #DEE2E6',
            borderRadius: '24px',
            fontSize: '16px',
            outline: 'none',
            background: '#F8F9FA',
          }}
        />
        <button
          onClick={enviarPregunta}
          disabled={cargando}
          style={{
            padding: '12px 20px',
            background: '#1D2533',
            color: 'white',
            border: 'none',
            borderRadius: '24px',
            fontWeight: 'bold',
            cursor: cargando ? 'wait' : 'pointer',
            fontSize: '14px',
            opacity: cargando ? 0.6 : 1,
          }}
        >
          {cargando ? '...' : 'Enviar'}
        </button>
      </div>
    </div>
  );
}
