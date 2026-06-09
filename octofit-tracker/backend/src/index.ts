import express, { Express, Request, Response } from 'express';
import apiRoutes from './apiRoutes';
import { connectToDatabase, getMongoUri } from './config/database';

const app: Express = express();
const PORT = Number(process.env.PORT || 8000);
const CODESPACE_NAME = process.env.CODESPACE_NAME;
const BASE_API_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.githubpreview.dev`
  : `http://localhost:${PORT}`;

// Middleware
app.use(express.json());
app.use('/api', apiRoutes);

// MongoDB Connection
connectToDatabase().catch(() => {
  console.error('Failed to connect to MongoDB');
});

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'OK',
    message: 'Backend is running',
    apiUrl: BASE_API_URL,
    mongoUri: getMongoUri()
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at ${BASE_API_URL}`);
});
