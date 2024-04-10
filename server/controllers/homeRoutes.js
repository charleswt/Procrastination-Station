const { Post } = require('../models')
const path = require('path')

module.exports = {
    getPosts: async (req, res) => {
        try{
            
            res.status(200).sendFile(path.join(__dirname, '../../client/dist/homepage.html'));
        }catch(err){
            console.log(err)
            res.status(404).json(err)
        }
    }
}