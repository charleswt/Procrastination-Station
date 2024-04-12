const mongoose = require('mongoose');
require('dotenv').config(); 

mongoose.connect(
  process.env.MONGODB_URI || process.env.DEV_MONGO_STRING
);

module.exports = mongoose.connection;
