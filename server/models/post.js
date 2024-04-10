const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: /^\S+@\S+\.\S+$/
    },
    company: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 500,
    },
    cost: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 12,
    }
})

module.exports = model('Post', postSchema);