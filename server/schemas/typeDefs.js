const typeDefs = 
`type users {
    _id: ID
    password: String
    ttt: String
    snake: String
    pong: String
    dino: String
}


type Query {
    users: [users]
}`

module.exports = typeDefs;
