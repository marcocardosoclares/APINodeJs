const redis = require('redis');
const manipulaLista = require('./manipulaLista');
const allowList = redis.createClient({ prefix: 'allowlist-refresh-token:' });
module.exports = manipulaLista(allowList);