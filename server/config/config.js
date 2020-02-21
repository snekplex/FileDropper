require('dotenv').config();

const config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  SERVER_PORT: process.env.SERVER_PORT || 3001,
  SERVER_HOST: process.env.SERVER_HOST || 'localhost',
  MONGO_HOST: process.env.MONGO_HOST || 'mongodb://127.0.0.1/',
  MONGO_PORT: process.env.MONGO_PORT || 27017,
  MONGO_DATABASE: process.env.MONGO_DATABASE || 'FileDropper',
  FRONTEND_ORIGIN: process.env.FRONTEND_ORIGIN || 'http://localhost:3000',
};

module.exports = config;