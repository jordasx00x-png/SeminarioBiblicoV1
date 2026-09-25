import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-sm w-full mx-4 border border-slate-200">
        <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg">
          📖
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Seminario Teológico</h1>
        <p className="text-slate-500 mb-8 text-sm">Si puedes ver este mensaje y el botón funciona, React está cargando correctamente.</p>
        
        <div className="flex flex-col gap-3">
          <button 
            onClick={() => setCount(prev => prev + 1)}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all active:scale-95 shadow-md"
          >
            Prueba de Interacción: {count}
          </button>
          
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-semibold transition-all"
          >
            Recargar Página
          </button>
        </div>
        
        <p className="mt-8 text-[10px] text-slate-400 uppercase tracking-widest font-bold">
          Modo de Diagnóstico Activo
        </p>
      </div>
    </div>
  );
}
