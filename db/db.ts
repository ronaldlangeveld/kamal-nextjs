const { Sequelize } = require('sequelize');

const db = new Sequelize({
  dialect: 'sqlite',
  storage: 'storage/database.sqlite3',
  logging: false,
});

export default db;
