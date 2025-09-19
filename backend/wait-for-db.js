import net from 'net';

const host = process.env.DB_HOST || 'db';
const port = process.env.DB_PORT || 3306;
const retryInterval = 2000;
const maxRetries = 15;
let retries = 0;

console.log(`Aguardando o banco de dados em ${host}:${port}...`);

const connect = () => {
  const socket = new net.Socket();
  socket.connect(port, host, () => {
    console.log('Banco de dados está pronto.');
    socket.end();
    process.exit(0);
  });

  socket.on('error', (err) => {
    console.log(`Erro de conexão: ${err.message}`);
    socket.destroy();
    if (retries < maxRetries) {
      retries++;
      console.log(`Tentando novamente em ${retryInterval / 1000} segundos... (${retries}/${maxRetries})`);
      setTimeout(connect, retryInterval);
    } else {
      console.error('Não foi possível conectar ao banco de dados após várias tentativas.');
      process.exit(1);
    }
  });
};

connect();
