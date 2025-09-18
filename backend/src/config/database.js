import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT,
    logging: false,
  }
);

// Tenta reconectar até o banco ficar disponível
const waitForDatabase = async (retries = 10, delay = 3000) => {
  for (let i = 0; i < retries; i++) {
    try {
      await sequelize.authenticate();
      console.log('Conexão com o banco de dados estabelecida ✅');
      return;
    } catch (err) {
      console.log(`Tentativa ${i + 1} falhou. Tentando novamente em ${delay / 1000}s...`);
      await new Promise(res => setTimeout(res, delay));
    }
  }
  console.error('Não foi possível conectar ao banco de dados após várias tentativas ❌');
  process.exit(1);
};

const initializeDatabase = async () => {
  await waitForDatabase();
};

export { sequelize, initializeDatabase };
