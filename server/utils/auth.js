const jwt = require('jsonwebtoken');

const exp = '3h'
const secret = process.env.SECRET || "example";

module.exports = {
    randKey: ()=>{
        crypto.randomBytes(64).toString('hex');
    },
    authMiddleware: ({ req })=>{
        const token = req.token || req.headers.authorization

          if (!token) {
            return req;
          }
      
          try {
            const { data } = jwt.verify(token, secret, { maxAge: exp })
            req.user = data       
          } catch {
            console.log('Invalid token');
          }
      
          return req;
    },
    packToken: ({username, _id})=>{
        const userData = {username, _id};
        return jwt.sign({ data: userData }, secret, { expiresIn: exp })
    }
}