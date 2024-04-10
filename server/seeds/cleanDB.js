const { User, Post } = require('../models');

module.exports = async (modelName, collectionName) => {
    try {
        // Check if the model name is valid
        if (!(modelName === 'User' || modelName === 'Post')) {
            throw new Error('Invalid model name');
        }

        // Determine the model based on the provided modelName
        const Model = modelName === 'User' ? User : Post;

        // Delete all documents from the specified collection
        const deleteResult = await Model.deleteMany({});

        console.log(`Deleted ${deleteResult.deletedCount} documents from ${collectionName} collection`);
    } catch (error) {
        console.error('Error cleaning up database:', error);
    }
};
