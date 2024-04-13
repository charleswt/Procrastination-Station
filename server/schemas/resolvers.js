const User = require('../models/user');
const { packToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        getUsers: async () => {
            return await User.find();
        },
        getUser: async (_, { username }) => {
            return await User.findOne({ username });
        },
        getTtt: async (_, { username }) => {
            const user = await User.findOne({ username });
            return user ? user.ttt : null;
        },
        getSnake: async (_, { username }) => {
            const user = await User.findOne({ username });
            return user ? user.snake : null;
        },
        getPong: async (_, { username }) => {
            const user = await User.findOne({ username });
            return user ? user.pong : null;
        },
        getDino: async (_, { username }) => {
            const user = await User.findOne({ username });
            return user ? user.dino : null;
        }
    },
    Mutation: {
        addUser: async (parent, { username, password })=>{
            const ttt = '0';
            const snake = '0';
            const pong = '0';
            const dino = '0';
            try{
                const user = User.create({ username, password, ttt, snake, pong, dino })
                const token = packToken(user)
                console.log(token, 'Token')
                console.log(username, password, 'User Pass')
                return { token, user }
            } catch (err){
                console.log(username, password, 'error')
                console.log(err,'Error creating user');
            }
        },
        login: async ( parent, { username, password } )=> {
            const user = await User.findOne({username})
            if (!user) return console.log('Incorrect username')

            const passAuth = await user.comparePassword(password);

            if(!passAuth) return console.log('Incorrect password')

            const token = packToken(user);

            return { token, user }
        },
        updateTtt: async (_, { username, ttt }) => {
            
        },
        updateSnake: async (_, { username, snake }) => {
            
        },
        updatePong: async (_, { username, pong }) => {
            
        },
        updateDino: async (_, { username, dino }) => {
            
        }
    }
};

module.exports = resolvers;