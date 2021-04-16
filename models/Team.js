const Sequelize = require('Sequelize')
const sequelize = require('../db/sequelize')

const Team = sequelize.define('team', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
  },
  slackId: {
    type: Sequelize.STRING,
    field: 'slack_id'
  },
  teamId: {
    type: Sequelize.INTEGER,
    field: 'team_id'
  }
}, {
  tableName:"teams"
  // freezeTableName: true // Model tableName will be the same as the model name
});

module.exports = Team