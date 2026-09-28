import {createRoot} from 'react-dom/client';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>Plataforma Activa</h1>
      <p>Si ves este mensaje, React está funcionando correctamente.</p>
    </div>
  );
}
