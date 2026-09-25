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
  } catch (e) {
    console.error('Mount error:', e);
  }
}
