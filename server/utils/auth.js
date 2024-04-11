const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const exp = '3h'
const randSecret = crypto.randomBytes(64).toString('hex')

module.exports = {
    randKey: () => {
        crypto.randomBytes(64).toString('hex');
    },

    authentication: ({ req }) => {
        let token = req.body.token || req.query.token || req.headers.auth;

        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
          }
      
          if (!token) {
            return req;
          }
      
          try {
            const { data } = jwt.verify(token, randSecret, { maxAge: exp });
            req.user = data;
          } catch {
            console.log('Invalid token');
          }
      
          return req;

    },
    packToken: ({username, password, _id})=>{
        const userData = {username, password, _id};
        return jwt.sign({ data: userData }, randSecret, { expiresIn: exp })
    }
}