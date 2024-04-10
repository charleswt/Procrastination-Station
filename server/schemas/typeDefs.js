const typeDefs = 
`type users {
    _id: ID
    email: String
    password: String
    posts: [Post]
}

type Post {
    _id: ID
    company: String
    description: String
    cost: String
}

type Query {
    users: [users]
}`

module.exports = typeDefs;
