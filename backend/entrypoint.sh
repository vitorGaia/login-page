#!/bin/sh

# Aborta o script se qualquer comando falhar
set -e

# Espera um pouco para garantir que o banco de dados esteja pronto
# (Opcional, mas bom para ter certeza)
echo "Aguardando o banco de dados..."
sleep 3

# Roda as migrations
echo "Rodando as migrations do banco de dados..."
npx sequelize-cli db:migrate
echo "Migrations concluídas."

# Em seguida, executa o comando principal do contêiner
# (o que foi passado para o `CMD` no Dockerfile)
exec "$@"
