import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import './index.css';

console.log('Applet main.tsx starting... v1.0.4');

const container = document.getElementById('root');
if (!container) {
  console.error('Root container not found!');
} else {
  console.log('Root container found, mounting...');
  try {
    createRoot(container).render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    );
    console.log('Mount successful');
  } catch (e: any) {
    console.error('Mount error:', e);
    container.innerHTML = `
      <div style="min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#FAF9F5;font-family:sans-serif;padding:24px;text-align:center;">
        <div style="font-size:36px;margin-bottom:12px;">📖</div>
        <h2 style="color:#1A2533;font-size:20px;font-weight:bold;margin-bottom:8px;">Seminario Teológico Digital</h2>
        <p style="color:#64748b;font-size:14px;max-width:400px;margin-bottom:16px;">Inicializando campus. Si no carga automáticamente, haz clic en el botón.</p>
        <button onclick="window.location.reload()" style="background:#7F1D1D;color:white;border:none;padding:10px 20px;border-radius:8px;font-weight:bold;cursor:pointer;">Recargar Página</button>
      </div>
    `;
  }
}
