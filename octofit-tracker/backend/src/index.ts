import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import apiRoutes from './apiRoutes';

const app: Express = express();
const PORT = Number(process.env.PORT || 8000);
const CODESPACE_NAME = process.env.CODESPACE_NAME;
const MONGODB_URI = 'mongodb://localhost:27017/octofit-tracker';

const BASE_API_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.githubpreview.dev`
  : `http://localhost:${PORT}`;

// Middleware
app.use(express.json());
app.use('/api', apiRoutes);

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Backend is running', apiUrl: BASE_API_URL });
});

app.listen(PORT, () => {
  console.log(`Server is running at ${BASE_API_URL}`);
});
