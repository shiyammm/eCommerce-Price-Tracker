import mongoose from 'mongoose';

let isConnected = false;

export async function connectToDB() {
  mongoose.set('strictQuery', true);

  if (!process.env.MONGODB_URI) return console.log('MongoDB uri not found');

  if (isConnected) return console.log('using existing database');

  try {
    await mongoose.connect(process.env.MONGODB_URI);

    isConnected = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.log(error);
  }
}
