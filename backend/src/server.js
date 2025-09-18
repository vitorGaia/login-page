import dotenv from 'dotenv';
import app from './app.js';
import { initializeDatabase } from './config/database.js';

dotenv.config({ path: '../.env' });

const PORT = process.env.APP_PORT || 3001;

const startServer = async () => {
  try {
    await initializeDatabase();

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT} 🚀`);
    });
  } catch (error) {
    console.error('Falha ao iniciar o servidor:', error);
    process.exit(1);
  }
};

startServer();
