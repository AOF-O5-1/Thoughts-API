import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routes from './routes/index';

dotenv.config(); // ✅ Ensure environment variables are loaded at the start

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);

//  MongoDB Connection Function
const connectDB = async () => {
  try {
    if (!MONGODB_URI) {
      throw new Error(" MONGODB_URI is missing in .env file.");
    }

    await mongoose.connect(MONGODB_URI);
    console.log(' MongoDB Atlas connected successfully');
  } catch (error) {
    console.error(' MongoDB connection error:', error);
    process.exit(1);
  }
};

//  Connect to MongoDB & Start Server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
  });
});
