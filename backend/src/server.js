import dotenv from 'dotenv';
import app from './app.js';

dotenv.config({ path: '../.env' });

const PORT = process.env.APP_PORT;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT} 🚀`)
});
