const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const randKey = crypto.randomBytes(64).toString('hex');
const exp = '3h'

module.exports = {
    authentication: ({ req }) => {
        let token = req.body.token || req.query.token || req.headers.auth;

        

    },
    createToken
}