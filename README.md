# Jai Body Parser
Simple and fast Node.js module for parsing Http request body. Part of Jai.js ecosystem. Built without any third part dependency.

---
[![Twitter Follow](https://img.shields.io/twitter/follow/Harpalsingh_11?label=Follow)](https://twitter.com/intent/follow?screen_name=Harpalsingh_11)
[![Linkedin: Harpal Singh](https://img.shields.io/badge/-harpalsingh11-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/harpalsingh11)](https://www.linkedin.com/in/harpalsingh11/)
[![GitHub followers](https://img.shields.io/github/followers/hsk11?label=Follow&style=social)](https://github.com/hsk11)
---

## Features

- Easy Setup
- Config the request body size
- Config specific request methods to implement/use
- Config request header content-types to use
- option to save raw body or payload
- Can be used with any framework





## Installation

Install my-project with npm

```bash
  npm install jai-body-parser
```

### Usage / Examples

```javascript
// Express

const express = require('express');
const jaiBodyParser = require('jai-body-parser');

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


//  OR Http

const http = require('http');
const jaiBodyParser = require('jai-body-parser');

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


```

## API Reference

### Options
/* {
    limit: 100, // in kb
    shouldSaveRawBody: false,
    allowedMethods: eligibleMethods,
    allowedContentTypes: contentTypes,
    }
 */

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `limit` | `integer` |  size in kb, default: 100 (100kb)|
| `shouldSaveRawBody` | `boolean` | should save raw body, default: false. useful when authenticating webhook responses|
| `allowedMethods` | `array` |  array of allowed http methods, default: ['post', 'put', 'patch']|
| `allowedContentTypes` | `array` |  array of allowed http methods, default: ['application/x-www-form-urlencoded' 'text/plain', 'application/json', 'application/javascript', 'application/xml']|


