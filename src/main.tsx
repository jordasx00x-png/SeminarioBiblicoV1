import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import './index.css';

console.log('Applet main.tsx starting... v1.0.3');

const container = document.getElementById('root');
if (!container) {
  document.body.innerHTML = '<div style="background:red; color:white; padding:20px;">ERROR: #root not found</div>';
} else {
  try {
    createRoot(container).render(
      <StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </StrictMode>
    );
    console.log('Applet mounted successfully');
  } catch (err) {
    console.error('Mounting error:', err);
    container.innerHTML = `<div style="background:orange; color:black; padding:20px;">CRITICAL MOUNT ERROR: ${String(err)}</div>`;
  }
}
