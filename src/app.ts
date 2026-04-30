import express from 'express';
import cors from 'cors';
import routes from './routes';
import { connectDB, isDBConnected } from './config/db';

const app = express();

// middleware
app.use(cors());
app.use(express.json());

app.use('/api/v1', routes);

// test route
app.get('/', (req, res) => {
  res.send('API is running 🚀');
});

// For Vercel serverless deployment, handle database connection per request
// This ensures the connection is ready before handling requests
let dbConnectionPromise: Promise<void> | null = null;

export const ensureDBConnection = async () => {
  if (!dbConnectionPromise || !isDBConnected()) {
    dbConnectionPromise = connectDB();
  }
  return dbConnectionPromise;
};

// Initialize DB connection on import (for local development)
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  connectDB().catch(err => console.error('DB connection failed:', err));
}

export default app;
