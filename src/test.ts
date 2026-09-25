console.log('Bare script starting...');
const root = document.getElementById('root');
if (root) {
  root.innerHTML = '<div style="background: green; color: white; height: 100vh; display: flex; align-items: center; justify-content: center;"><h1>Minimal Script Working</h1></div>';
} else {
  document.body.innerHTML = '<h1>Root not found, but script ran</h1>';
}
