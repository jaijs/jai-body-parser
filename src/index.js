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

  if (global.jaiBodyParserCompleted) { return next(); } // ensures that the middleware is not executed multiple times
  if (!options.allowedMethods.includes(req.method.toUpperCase()) || !req.headers['content-type'] || !options.allowedContentTypes.includes(req.headers['content-type'].toLowerCase())) {
    return next();
  }
  const chunks = [];
  await new Promise((resolve, reject) => {
    req.on('error', reject);
    req.on('data', (data) => {
      chunks.push(data);
    });
    req.on('end', () => {
      try {
        global.jaiBodyParserCompleted = true;
        const buffer = Buffer.concat(chunks);
        const body = buffer.toString('utf-8');
        if (options.limit && buffer.length > options.limit * 1000) {
          return next(new Error('Request body exceeded limit'));
        }
        if (options.shouldSaveRawBody) {
          req.rawBody = body;
        }
        if (req.headers['content-type'] === 'application/json') {
          req.body = JSON.parse(body);
        } else if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
          req.body = url.parse(`http://JaiJs.org/?${body}`, true).query;
          Object.keys(req.body).forEach((key) => {
            if (options.parseNumbers && !isNaN(Number(req.body[key]))) {
              req.body[key] = Number(req.body[key]);
            }
          })
        } else {
          req.body = body;
        }
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  });
  return next();
}

function builder(options = {}) {
  options = { ...defaultOptions, ...options };
  options.allowedMethods = options.allowedMethods.map((method) => method.toUpperCase());
  return async (req, res, next) => await bodyParser(req, res, next, options);
}

module.exports = builder;