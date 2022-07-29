const url = require('url');
const defaultOptions = require('./config');
/* {
    limit: 100, // in kb
    shouldSaveRawBody: false,
    allowedMethods: eligibleMethods,
    allowedContentTypes: contentTypes,
    }
 */

async function bodyParser(req, res, next, options) {
  if (!options.allowedMethods.includes(req.method.toLowerCase()) || !req.headers['content-type'] || !options.allowedContentTypes.includes(req.headers['content-type'].toLowerCase())) {
    return next();
  }
  const chunks = [];
  await new Promise((resolve, reject) => {
    req.on('error', reject);
    req.on('data', (data) => {
      chunks.push(data);
    });
    req.on('end', () => {
      const buffer = Buffer.concat(chunks);
      const body = buffer.toString('utf-8');
      if (options.limit && buffer.length > options.limit*1000) {
        return next(new Error('Request body exceeded limit'));
      }
      if (options.shouldSaveRawBody) {
        req.rawBody = body;
      }
      if (req.headers['content-type'] === 'application/json') {
        req.body = JSON.parse(body);
      } else if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
        req.body = url.parse(`http://JAI.com/?${body}`, true).query;
      } else {
        req.body = body;
      }
      resolve();
    });
  });
  return next();
}

function builder(options = {}) {
  return (req, res, next) => {
    try {
      bodyParser(req, res, next, { ...defaultOptions, ...options });
    } catch (error) { next(error); }
  };
}

module.exports = builder;
