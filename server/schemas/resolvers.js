const { User } = require('../models');
const { packToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return await User.find()
        }
    },
    // mutations: {
    //     addUser: async (res, { username, password })=>{
    //         const ttt = 0;
    //         const snake = 0;
    //         const pong = 0;
    //         const dino = 0;

    //         const existingUser = User.findOne({ username });
    //         if(existingUser) return { userExists: 'Username Taken!' };
            
    //         try{
    //             const userData = User.create({ username, password, ttt, snake, pong, dino })
    //             const token = packToken(userData)
    //             return { token, userData }
    //         } catch (err){
    //             console.log('Error creating user');
    //             res.status(400).json({ message: 'Error creating user' }, err)
    //         }
            
    //     }
    // }
}

module.exports = resolvers;