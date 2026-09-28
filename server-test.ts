import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head><title>TEST SIMPLE</title></head>
    <body style="background: red; color: white; display: flex; align-items: center; justify-content: center; height: 100vh; font-size: 48px;">
      EL SERVIDOR ESTÁ RESPONDIENDO
    </body>
    </html>
  `);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('Server running on port ' + PORT);
});
