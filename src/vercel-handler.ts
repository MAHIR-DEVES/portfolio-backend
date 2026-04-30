import { ensureDBConnection } from './app';
import app from './app';

// Vercel serverless function handler
export default async function handler(req: any, res: any) {
  try {
    // Ensure database connection is established before handling request
    await ensureDBConnection();

    // Handle the request with Express app
    app(req, res);
  } catch (error) {
    console.error('Serverless handler error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to initialize database connection',
    });
  }
}
