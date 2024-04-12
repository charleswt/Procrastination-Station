const db = require('../config/connection');
const { User } = require('../models');
const cleanDB = require('./cleanDB');

const userData = require('../utils/userData.json');

db.once('open', async () => {
    await cleanDB("User", "users");

    // Insert users and posts into the database
    await User.insertMany(userData);

    console.log("Posts added to users successfully");
    process.exit(0);
});