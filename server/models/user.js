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
    tttWins: {
        type: Number,
        require: true,
    },
    snakeWins: {
        type: Number,
        require: true,
    },
    pongWins: {
        type: Number,
        require: true,
    },
    tttWins: {
        type: Number,
        require: true,
    },
    snakeWins: {
        type: Number,
        require: true,
    },
    pongWins: {
        type: Number,
        require: true,
    }
});

// Hash the password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw error;
    }
};

module.exports = model('User', userSchema);