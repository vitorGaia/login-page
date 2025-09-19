#!/bin/sh

set -e

echo "Aguardando o banco de dados..."
node /usr/src/app/wait-for-db.js

echo "Rodando as migrations do banco de dados..."
npx sequelize-cli db:migrate
echo "Migrations concluídas."

exec "$@"
