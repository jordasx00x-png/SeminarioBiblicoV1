import React, { useState, useRef, useEffect } from 'react';
import VirtualAssistantWidget from './components/VirtualAssistantWidget';

// Componente simulado para evitar errores si no existe en tu proyecto
function BibleVerseModal({ isOpen, reference, onClose, onSelectCrossReference, isSplitMode }: any) {
  return isOpen ? (
    <div style={{ padding: '20px', background: '#F8F9FA', borderRadius: '8px', border: '1px solid #DEE2E6', margin: '10px 0' }}>
      <h4>📖 Módulo de Versículos Bíblicos</h4>
      <button onClick={onClose} style={{ padding: '5px 10px', background: '#111E2E', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cerrar Módulo</button>
    </div>
  ) : null;
}

export default function App() {
  const [activeTool, setActiveTool] = useState<'assistant' | 'bible' | null>('assistant');
  const [bibleModalRef, setBibleModalRef] = useState<any>(null);

  const handleCloseTool = () => setActiveTool(null);

  return (
    <div style={{ minHeight: '100vh', background: '#f4f6f9', display: 'flex', flexDirection: 'column' }}>
      {/* Barra de Navegación del Campus Virtual */}
      <header style={{ background: '#111E2E', color: 'white', padding: '15px 20px', display: 'flex', justifyContent: 'between', alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <h2 style={{ margin: 0, fontSize: '18px' }}>Campus Virtual - Seminario Teológico</h2>
        <div style={{ display: 'flex', gap: '10px', marginLeft: 'auto' }}>
          <button onClick={() => setActiveTool('assistant')} style={{ padding: '8px 16px', background: activeTool === 'assistant' ? '#007bff' : 'transparent', color: 'white', border: '1px solid #007bff', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}>
            💬 Asistente IA
          </button>
          <button onClick={() => setActiveTool('bible')} style={{ padding: '8px 16px', background: activeTool === 'bible' ? '#007bff' : 'transparent', color: 'white', border: '1px solid #007bff', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}>
            📖 Biblia
          </button>
        </div>
      </header>

      {/* Contenido Principal Dinámico */}
      <main style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', padding: '20px' }}>
        {activeTool === 'assistant' && (
          <VirtualAssistantWidget />
        )}

        {activeTool === 'bible' && (
          <BibleVerseModal
            isOpen={true}
            reference={bibleModalRef}
            onClose={handleCloseTool}
            onSelectCrossReference={(crossRef: any) => setBibleModalRef(crossRef)}
            isSplitMode={true}
          />
        )}
      </main>

      {/* Footer Fijo */}
      <footer style={{ background: '#ffffff', padding: '10px 20px', textAlign: 'center', fontSize: '12px', color: '#6c757d', borderTop: '1px solid #E9ECEF' }}>
        © 2026 Seminario Teológico Digital - Consultoría Doctrinal
      </footer>
    </div>
  );
}
