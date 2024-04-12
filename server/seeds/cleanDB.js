const { User} = require('../models');

module.exports = async (modelName, collectionName) => {
    try {
        // Check if the model name is valid
        if (!modelName === 'User') {
            throw new Error('Invalid model name');
        }

        // Delete all documents from the specified collection
        const deleteResult = await modelName.deleteMany({});

        console.log(`Deleted ${deleteResult.deletedCount} documents from ${collectionName} collection`);
    } catch (error) {
        console.error('Error cleaning up database:', error);
    }
};
