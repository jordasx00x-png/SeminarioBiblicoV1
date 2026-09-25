import express from 'express';
import path from 'path';

const app = express();
const PORT = 3000;

app.use(express.static('.'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve('index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Test server running on port ${PORT}`);
});
