const Sequelize = require('sequelize');

console.log("DB_NAME", process.env.DB_NAME)
console.log("DB_USERNAME", process.env.DB_USERNAME)
console.log("DB_PASSWORD", process.env.DB_PASSWORD)
console.log("DB_HOST", process.env.DB_HOST)
console.log("DB_PORT", process.env.DB_PORT)

// TODO 環境変数からとる
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
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