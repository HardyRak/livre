const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://mongo:27017/votre_db');
  } catch (error) {
    process.exit(1);
  }
};

module.exports = connectDB;