import mongoose from 'mongoose';

export const connectDb = async () => {
  try {
    const connectionString = process.env.MONGO_URI || 'mongodb+srv://r9ahim:MtaLRPuZHnkiqvDD@cluster0.ixmoo.mongodb.net/food';
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1); // Exit the process if DB connection fails
  }
};
