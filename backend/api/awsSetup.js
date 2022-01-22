const AWS = require('aws-sdk');
const ACCESS_KEY_ID = require('../config').ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = require('../config').SECRET_ACCESS_KEY;
const REGION = require('../config').REGION;

module.exports = AWS.config.update({
    accessKeyId : ACCESS_KEY_ID,
    secretAccessKey : SECRET_ACCESS_KEY,
    region : REGION
});