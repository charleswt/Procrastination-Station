const User = require('../models/user');
const { packToken, AuthenticationError } = require('../utils/auth');
// Global Token

const resolvers = {
    Query: {
        getUsers: async () => {
            return await User.find();
        },
        getMe: async (context) => {
            return await User.findOne({ username: context.user.username });
        },
        getTtt: async (parent, args, context) => {
            console.log(context)
            const user = await User.findOne({ username: context.user.username });
            
            return user.ttt
        },
        getSnake: async (parent, args, context) => {
            const user = await User.findOne({ username: context.user.username });
            return user.snake
        },
        getPong: async (parent, args, context) => {
            const user = await User.findOne({ username: context.user.username });
            return user.pong
        },
        getDino: async (parent, args, context) => {
            const user = await User.findOne({ username: context.user.username });
            return user.dino
        }
    },
    Mutation: {
        addUser: async (parent, { username, password })=>{
            const ttt = 'Wins: 0 Draws: 0 Losses: 0';
            const snake = '0';
            const pong = '0';
            const dino = '0';
            try{
                const user = User.create({ username, password, ttt, snake, pong, dino })
                const token = packToken(user)
                return { token, user }
            } catch (err){
                console.log(err,'Error creating user');
            }
        },
        login: async ( parent, { username, password } )=> {

            const user = await User.findOne({username})

            if (!user) return console.log('Incorrect username')

            const passAuth = await user.isCorrectPassword(password);

            if(!passAuth) return console.log(passAuth, 'Incorrect password')

            const token = packToken(user);

            return { token, user }
        },
        updateTtt: async (parent, { outcome }, context) => {
            const user = await User.findOne({username: context.user.username })
             try {

                let wins = user.ttt.split(" ")[1]
                let draws = user.ttt.split(" ")[3]
                let losses = user.ttt.split(" ")[5]
                
                if(outcome === "2"){
                    wins++
                    console.log(wins, "wins")
                } else if (outcome === "0"){
                    draws++
                    console.log(draws, "draws")
                } else {
                    losses++
                    console.log(losses, "losses")
                }
                user.ttt = `Wins: ${wins} Draws: ${draws} Losses: ${losses}`

                user.save()

                return user
            } catch(err) {
                throw new Error('Failed to update Tic-Tac-Toe score');
            }
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