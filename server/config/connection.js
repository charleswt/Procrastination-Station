const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI || process.env.DEV_MONGO_STRING
);

module.exports = mongoose.connection;
