const https = require('https');
https.get('https://bible-api.com/john+3:16?translation=almeida', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => console.log(data));
});
