const express = require('express');
const session = require('express-session');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const routes = require('./routes')

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(session({
    secret: 'Super secret secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 300000, // 5 minutes
        httpOnly: true,
        secure: false, // Set to true if using HTTPS
        sameSite: 'strict'
    }
}));

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(routes)
  
  if (process.env.NODE_ENV === 'production' || !process.env.NODE_ENV) {
    app.use(express.static(path.join(__dirname, '../client/dist')));
    
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/homepage.html'));
    });
  }
  
  app.use('/graphql', expressMiddleware(server));

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};
startApolloServer();