const User = require("../models/user");
const { packToken, AuthenticationError } = require("../utils/auth");
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
      const snake = 0,
        pong = snake,
        dino = snake,
        ttt = "Wins: 0 Draws: 0 Losses: 0";
      try {
        // Check if username is already in use
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          return new Error("Username already exists");
        }

        // Create user
        const user = await User.create({
          username,
          password,
          ttt,
          snake,
          pong,
          dino,
        });

        const token = packToken(user);

        return { token, user };
      } catch (error) {
        console.error("Error creating user:", error);
        return new Error("Failed to create user");
      }
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) throw new Error("Incorrect username");

      const passAuth = await user.isCorrectPassword(password);

      if (!passAuth) throw new Error(passAuth, "Incorrect password");

      const token = packToken(user);

      return { token, user };
    },
    updateTtt: async (parent, { outcome }, context) => {
      const user = await User.findOne({ username: context.user.username });
      try {
        const usersplit = user.ttt.split(" ");
        let wins = usersplit[1];
        let draws = usersplit[3];
        let losses = usersplit[5];

        switch (outcome) {
          case "2":
            wins++;
            break;
          case "0":
            draws++;
            break;
          default:
            losses++;
            break;
        }
        user.ttt = `Wins: ${wins} Draws: ${draws} Losses: ${losses}`;

        user.save();

        return user;
      } catch (err) {
        throw new Error("Failed to update Tic-Tac-Toe score");
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
      console.log("hello");
      const user = await User.findOne({ username: context.user.username });
      console.log("hello");
      try {
        if (dino > user.dino) {
          user.dino = dino;
          user.save();
        }
        console.log("hello");
        return user;
      } catch (err) {
        console.log(err);
      }
    },
  },
};

module.exports = resolvers;
