import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { HealthResponse } from '@app/shared';
import newsRoutes from './routes/news';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  const response: HealthResponse = {
    status: 'ok',
    timestamp: new Date().toISOString()
  };
  res.json(response);
});

app.use('/api', newsRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
