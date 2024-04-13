const User = require('../models/user');

module.exports = async (modelName, collectionName) => {
    try {
        // Check if the model name is valid
        if (modelName !== 'User') {
            throw new Error('Invalid model name');
        }

        // Delete all documents from the User collection
        const deleteResult = await User.deleteMany({});

        console.log(`Deleted ${deleteResult.deletedCount} documents from ${collectionName} collection`);
    } catch (error) {
        console.error('Error cleaning up database:', error);
    }
};