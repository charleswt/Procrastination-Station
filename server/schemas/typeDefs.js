const typeDefs = 
`type users {
  _id: ID
  username: String
  password: String
  ttt: String
  snake: String
  pong: String
  dino: String
}

type Query {
  getUsers: [users]
  getUser(username: String!)
  getTtt(username: String!)
  getSnake(username: String!)
  getPong(username: String!)
  getDino(username: String!)
}

type Mutations {
  createUser(username: String!, password!): Auth
  login(username: String!, password: String!): Auth
  updateTtt(winLossValue: Number!)
  updateSnake(winLossValue: Number!) 
  updatePong(winLossValue: Number!) 
  updateDino(winLossValue: Number!) 
}
`
// Dino we can just save the time played and update it every time the time played is higher than the one in currently saved in the DB
// Snake we do the same thing but with points
// Tic tac toe we can send 0 if loss and 1 if win and then just do an turnery argument call the user query to get user data from ttt that will give us a string that we need to splice then increment the win or loss value from the resulting array(position 1(wins) or 3(losses)) then save it back to that user

module.exports = typeDefs;