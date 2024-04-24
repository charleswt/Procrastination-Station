const typeDefs = 
`type User {
  _id: ID
  username: String
  password: String
  ttt: String
  snake: Int
  pong: Int
  dino: Int
}

type Auth {
  token: ID!
  user: User
}

type Query {
  getUsers: [User]
  getMe: User
}

type Mutation {
  addUser(username: String!, password: String!): Auth
  login(username: String!, password: String!): Auth
  updateTtt(outcome: String!): User
  updateSnake(lastGamesScore: Int!): User
  updatePong(pong: Int!): User
  updateDino(dino: Int!): User
}
`

module.exports = typeDefs;