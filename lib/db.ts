import mongoose from 'mongoose';

const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(
      process.env.MONGODB_URI as string,
    );
    return connection;
  } catch (error) {
    throw new Error(error);
  }
};

export default dbConnect;
