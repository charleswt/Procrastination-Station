const typeDefs = 
`type User {
  _id: ID
  username: String
  password: String
  ttt: String
  snake: String
  pong: String
  dino: String
}

type Auth {
  token: ID!
  user: User
}

type Query {
  getUsers: [User]
  getUser(username: String!): User
  getTtt(username: String!): User
  getSnake(username: String!): User
  getPong(username: String!): User
  getDino(username: String!): User
}

type Mutation {
  addUser(username: String!, password: String!): Auth
  login(username: String!, password: String!): Auth
  updateTtt(username: String!): User
  updateSnake(username: String!): User
  updatePong(username: String!): User
  updateDino(username: String!): User
}
`
// Dino we can just save the time played and update it every time the time played is higher than the one in currently saved in the DB
// Snake we do the same thing but with points
// Tic tac toe we can send 0 if loss and 1 if win and then just do an turnery argument call the user query to get user data from ttt that will give us a string that we need to splice then increment the win or loss value from the resulting array(position 1(wins) or 3(losses)) then save it back to that user

module.exports = typeDefs;