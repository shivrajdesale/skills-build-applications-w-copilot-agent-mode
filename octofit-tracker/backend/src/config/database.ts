import mongoose from 'mongoose';

const DB_NAME = process.env.MONGO_DB_NAME || 'octofit_db';
const MONGODB_URI = process.env.MONGODB_URI || `mongodb://localhost:27017/${DB_NAME}`;

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(`Connected to MongoDB at ${MONGODB_URI}`);
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
};

export const getMongoUri = () => MONGODB_URI;
