const Sequelize = require('Sequelize')
const sequelize = require('../db/sequelize')

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  slackId: {
    type: Sequelize.STRING,
    field: 'slack_id'
  },
  name: {
    type: Sequelize.STRING,
  },
  teamId: {
    type: Sequelize.INTEGER,
    field: 'team_id'
  }
}, {
  tableName:"users"
  // freezeTableName: true // Model tableName will be the same as the model name
});

module.exports = User