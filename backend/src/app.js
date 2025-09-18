import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', authRoutes);

export default app;
