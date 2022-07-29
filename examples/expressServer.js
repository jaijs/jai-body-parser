
const express = require('express');
const jaiBodyParser = require('../src/index');

const app = express();
const port = 1111;
app.use(jaiBodyParser(/* options */));
app.post('*', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ body: req.body }));
});


app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}/ ...`);
});
