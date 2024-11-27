import mongoose from 'mongoose';

let isConnected = false;

export const connectToDatabase = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.MONGODB_STRING_CONNECTION) {
    return console.log('Missing MONGODB_STRING_CONNECTION');
  }

  if (isConnected) {
    return console.log('Database is already connected');
  }

  try {
    await mongoose.connect(process.env.MONGODB_STRING_CONNECTION, {
      dbName: 'dev-overflow',
    });

    isConnected = true;

    console.log('Database is connected!!');
  } catch (error) {
    console.log('Error: ', error);
  }
};
