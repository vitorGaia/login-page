import app from './app.js';
import { initializeDatabase } from './config/database.js';

const PORT = process.env.APP_PORT;

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
