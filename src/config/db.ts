import mongoose from 'mongoose';

// Track connection status for serverless environments
let isConnected = false;

export const connectDB = async () => {
  // If we already have a connection, skip
  if (isConnected) {
    return;
  }

  try {
    const mongoUri = process.env.MONGO_URI as string;

    // Serverless-optimized Mongoose options
    const options = {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of 30
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      maxPoolSize: 10, // Maintain up to 10 socket connections
      bufferCommands: false, // Disable Mongoose buffering to fail fast
    };

    // For production/serverless, use optimized settings
    if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
      await mongoose.connect(mongoUri, options);
      console.log('MongoDB Connected (Serverless Mode) ✅');
    } else {
      // For local development, use standard connection
      await mongoose.connect(mongoUri);
      console.log('MongoDB Connected ✅');
    }

    isConnected = true;
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    throw error; // Re-throw to handle in calling code
  }
};

// Helper to check connection status
export const isDBConnected = () => {
  return isConnected;
};
