import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes';
import { errorHandler, notFound } from './middleware/errorHandler';
import db from './config/database';
dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 5000;
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '10kb' }));
app.get('/api/health', (_req, res) => {
  const result = db.prepare('SELECT 1 AS ok').get() as { ok: number };
  res.json({ status: 'ok', database: result.ok === 1 ? 'connected' : 'disconnected' });
});
app.use('/api/products', productRoutes);
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => console.log(`API server running at http://localhost:${port}`));
