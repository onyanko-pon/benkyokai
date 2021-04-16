const Sequelize = require('sequelize');

// TODO 環境変数からとる
const sequelize = new Sequelize('postgres', 'postgres', 'example', {
  host: 'localhost',
  port: 5432,
  // dialect: 'mysql'|'mariadb'|'sqlite'|'postgres'|'mssql',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  define: {
    timestamps: false
  }
});

module.exports = sequelize