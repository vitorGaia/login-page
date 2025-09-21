import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { sequelize } from '../config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = {};

const files = fs.readdirSync(__dirname).filter(
  (file) => file !== 'index.js' && file.slice(-3) === '.js'
);

// Itera sobre cada arquivo de modelo encontrado
for (const file of files) {
  const { default: defineModel } = await import(new URL(file, import.meta.url));
  const model = defineModel(sequelize);
  db[model.name] = model;
}

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

export default db;
