const { User } = require('../models');
const { packToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        getUsers: async () => {
            return await User.find()
        },
        getUser: async (username) => {
            return await User.findOne({username})
        },
        getTtt: async (username) => {
            const user = User.findOne({username})
            return user.ttt
        },
        getSnake: async (username) => {
            const user = User.findOne({username})
            return user.snake
        },
        getPong: async (username) => {
            const user = User.findOne({username})
            return user.pong
        },
        getDino: async (username) => {
            const user = User.findOne({username})
            return user.dino
        }
    },
    mutations: {
        addUser: async (res, { username, password })=>{
            const ttt = 0;
            const snake = 0;
            const pong = 0;
            const dino = 0;

            const existingUser = User.findOne({ username });
            if(existingUser) return { userExists: 'Username Taken!' };
            
            try{
                const userData = User.create({ username, password, ttt, snake, pong, dino })
                const token = packToken(userData)
                return { token, userData }
            } catch (err){
                console.log('Error creating user');
                res.status(400).json({ message: 'Error creating user' }, err)
            }
            
        },
        login: async (res, { username, password })=> {
            const user = await user.findOne({username})
            if (!user) return res.json(false, { message: 'Incorrect username' })

            const passAuth = await user.isCorrectPassword(password);

            if(!passAuth) return res.json(false, { message: 'Incorrect password' })

            const token = packToken(user);

            return { token, user }
        },
    }
}

module.exports = resolvers;