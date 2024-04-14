const db = require('../config/connection');
const User = require('../models/user');
const cleanDB = require('./cleanDB');

const userData = require('./userData.json');

db.once('open', async () => {
    await cleanDB("User", "users");

    // Insert users and posts into the database
    await User.create(userData);

    console.log("Posts added to users successfully");
    process.exit(0);
});