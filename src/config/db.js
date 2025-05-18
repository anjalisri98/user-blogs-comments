const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URL);

    console.log('MongoDB Connected');
  } catch (error) {
    console.error('DB connection error', error);
    process.exit(1);
  }
};

module.exports = connectDB;