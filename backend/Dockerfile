FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Copia o script de entrypoint e o torna executável
COPY entrypoint.sh ./
RUN chmod +x ./entrypoint.sh

EXPOSE 3001

# Define o entrypoint e o comando padrão
ENTRYPOINT ["./entrypoint.sh"]
CMD ["node", "src/server.js"]
