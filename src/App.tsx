import React, { useState } from 'react';
import ChatTeologico from './components/ChatTeologico';

function BibleVerseModal({ isOpen, onClose }: any) {
  return isOpen ? (
    <div style={{ padding: '20px', background: '#F8F9FA', borderRadius: '8px', border: '1px solid #DEE2E6', margin: '10px 0' }}>
      <h4>📖 Módulo de Versículos Bíblicos</h4>
      <button onClick={onClose} style={{ padding: '5px 10px', background: '#1D2533', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cerrar Módulo</button>
    </div>
  ) : null;
}

export default function App() {
  const [activeTool, setActiveTool] = useState<'assistant' | 'bible' | null>('assistant');

  return (
    <div style={{ minHeight: '100vh', background: '#f4f6f9', display: 'flex', flexDirection: 'column' }}>
      {/* Encabezado */}
      <header style={{ background: '#ffffff', color: '#1D2533', padding: '15px 20px', display: 'flex', flexDirection: 'column', borderBottom: '1px solid #E9ECEF', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', letterSpacing: '0.5px' }}>CONSULTORÍA DOCTRINAL</h2>
          <span style={{ background: '#D1E7DD', color: '#0F5132', fontSize: '11px', fontWeight: 'bold', padding: '3px 8px', borderRadius: '4px' }}>● ACTIVO</span>
        </div>
        <span style={{ fontSize: '12px', color: '#6C757D', marginTop: '4px', fontWeight: 500 }}>CAMPUS VIRTUAL ● ASISTENCIA TEOLÓGICA IA</span>
      </header>

      {/* Cuerpo */}
      <main style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', background: '#ffffff' }}>
        {activeTool === 'assistant' && <ChatTeologico />}
        {activeTool === 'bible' && <BibleVerseModal isOpen={true} onClose={() => setActiveTool(null)} />}
      </main>
    </div>
  );
}
