const crypto = require('crypto');

const key_1 = crypto.randomBytes(32).toString('hex');
const key_2 = crypto.randomBytes(32).toString('hex');
console.table({ key_1, key_2 });