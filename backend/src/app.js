import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

const app = express();

app.use(express.json());

app.use(cors());

app.use('/api', authRoutes);

// Middleware de tratamento de erros (deve ser o último)
app.use(errorMiddleware.errorHandler);

export default app;
