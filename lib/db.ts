import mongoose from 'mongoose';

const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(
      process.env.MONGODB_URI as string,
      {
        serverSelectionTimeoutMS: 30000, // 30 seconds
      },
    );
    return connection;
  } catch (error: unknown) {
    throw new Error(error as string);
  }
};

export default dbConnect;
