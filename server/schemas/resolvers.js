const User = require('../models/user');
const { packToken, AuthenticationError } = require('../utils/auth');
// Global Token

const resolvers = {
    Query: {
        getUsers: async () => {
            return await User.find();
        },
        getMe: async (parent, args, context) => {
            const user = await User.findOne({ username: context.user.username });
            return user;
        },
    },
    Mutation: {
        addUser: async (parent, { username, password }) => {
            const snake = 0;
            const pong = 0;
            const dino = 0;
            const ttt = "Wins: 0 Draws: 0 Losses: 0";
            try {
                // Check if username is already in use
                const existingUser = await User.findOne({ username });
                if (existingUser) {
                    return new Error('Username already exists');
                }
        
                // Create user
                const user = await User.create({ username, password, ttt, snake, pong, dino });
                console.log(user)
                const token = packToken(user);
                
                return { token, user };
            } catch (error) {
                console.error('Error creating user:', error);
                return new Error('Failed to create user');
            }
        },
        login: async ( parent, { username, password })=> {

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

                let wins = user.ttt.split(" ")[1];
                let draws = user.ttt.split(" ")[3];
                let losses = user.ttt.split(" ")[5];
                
                if(outcome === "2"){
                    wins++;
                } else if (outcome === "0"){
                    draws++;
                } else {
                    losses++;
                }
                user.ttt = `Wins: ${wins} Draws: ${draws} Losses: ${losses}`;

                user.save();

                return user;
            } catch(err) {
                throw new Error('Failed to update Tic-Tac-Toe score');
            }
        },
        updateSnake: async (_, { lastGamesScore }, context) => {
            const user = await User.findOne({ username: context.user.username });
            try {
              if (lastGamesScore > user.snake) {
                user.snake = lastGamesScore;
                user.save();
              }
              return user;
            } catch (err) {
              console.log(err);
            }
          },
        updatePong: async (_, { username, pong }) => {
            // future addition
        },
        updateDino: async (_, { dino }, context) => {
            console.log('hello')
            const user = await User.findOne({ username: context.user.username });
            console.log('hello')
            try{
                if (dino > user.dino){
                    user.dino = dino;
                    user.save();
                }            console.log('hello')
                return user;
            } catch(err){
                console.log(err);
            }
        }
    }
};

module.exports = resolvers;