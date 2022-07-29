const http = require('http');
const jaiBodyParser = require('../src/index');

const server = http.createServer(async (req, res) => {
  jaiBodyParser(/* options */)(req, res, (err) => {
    if (err) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ Error: err.stack }));
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ body: req.body }));
  });
});

server.listen(1111, () => {
  console.log('Server listening on http://localhost:1111/ ...');
});
