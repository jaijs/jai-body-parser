const eligibleMethods = ['post', 'put', 'path'];

const contentTypes = [
  'application/x-www-form-urlencoded',
  'text/plain',
  'application/json',
  'application/javascript',
  'application/xml'];

const defaultOptions = {
  limit: 100, // in kb
  shouldSaveRawBody: false,
  allowedMethods: eligibleMethods,
  allowedContentTypes: contentTypes,
  parseNumbers: true,
};

module.exports = defaultOptions;
