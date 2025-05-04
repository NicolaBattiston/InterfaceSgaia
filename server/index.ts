import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import linkRoutes from './routes/links';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Middleware
app.use(express.json());
app.use(cors({
  origin: CLIENT_URL,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes
app.use('/api/links', linkRoutes);

// Health check
app.get('/health', (_, res) => {
  res.status(200).json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});

// Error handling
process.on('unhandledRejection', (error) => {
  console.error('Unhandled rejection:', error);
});