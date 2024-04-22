const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const {authMiddleware} = require('./utils/auth')
const cookiesMiddleware = require('universal-cookie-express');
const path = require('path');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cookiesMiddleware()).use(function (req, res, next) {

    req.token = req.universalCookies.get('token_auth')
    next()
  });

  const stripe = require('stripe')(process.env.STRIPE_KEY)
  const cors = require('cors')

  app.use(cors())

  const storeItems = new Map([
    [ 1, { priceInCents: 100, name: "Donate" }]
  ])

  app.post("/create-checkout-session", async (req,res)=>{
    try{
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: req.body.items.map(item => {
          const storeItem = storeItems.get(item.id)
          return{
            price_data: {
              currency: 'usd',
              product_data: {
                name: storeItem.name
              },
              unit_amount: storeItem.priceInCents
            },
            quantity: item.quantity
          }
        }),
        success_url: `${path}/success`,
        cancel_url: `${path}/`,
      })
      res.json({ url: session.url})
    }catch(err){
      console.log(err)
    }
  })

  //debug for render
  app.use(express.static(path.join(__dirname, '../client/dist')));
  //debug for render
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });

  app.use('/graphql', expressMiddleware(server, {context:authMiddleware}));
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};
startApolloServer();