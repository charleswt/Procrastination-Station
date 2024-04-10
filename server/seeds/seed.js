const db = require('../config/connection');
const { User, Post } = require('../models');
const cleanDB = require('./cleanDB');

const postData = require('./postData.json');
const userData = require('../utils/userData.json');

db.once('open', async () => {
    await cleanDB("User", "users");
    await cleanDB("Post", "posts");

    // Insert users and posts into the database
    const users = await User.insertMany(userData);
    const posts = await Post.insertMany(postData);

    // Iterate over each post
    for (const post of posts) {
        // Find the user with the same email as the post
        const user = users.find(user => user.email === post.email);
        if (user) {
            // If user found, push the post into their posts array
            user.posts.push(post);
            await user.save(); // Save the user to update the database
            console.log(`Post added to user ${user.email}`);
        } else {
            console.log(`No user found for post with email ${post.email}`);
        }
    }

    console.log("Posts added to users successfully");
    process.exit(0);
});