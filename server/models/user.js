const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    ttt: {
        type: String,
        required: true,
        default: "Wins: 0 Draws: 0 Losses: 0",
    },
    snake: {
        type: Number,
        required: true,
    },
    pong: {
        type: Number,
        required: true,
    },
    dino: {
        type: Number,
        required: true,
    }
});

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });
  
  userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

const User = model('User', userSchema);

module.exports = User;
