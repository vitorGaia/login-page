import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { sequelize } from '../config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = {};

// Lê todos os arquivos do diretório atual, exceto este (`index.js`)
const files = fs.readdirSync(__dirname).filter(
  (file) => file !== 'index.js' && file.slice(-3) === '.js'
);

// Itera sobre cada arquivo de modelo encontrado
for (const file of files) {
  // Usa import() dinâmico para carregar o módulo do modelo
  const { default: defineModel } = await import(new URL(file, import.meta.url));
  const model = defineModel(sequelize);
  db[model.name] = model;
}

// Executa a função `associate` de cada modelo, se ela existir,
// para criar os relacionamentos entre tabelas.
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Adiciona a instância e o construtor do Sequelize ao objeto db
db.sequelize = sequelize;

export default db;
