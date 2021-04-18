const Sequelize = require('sequelize')
const sequelize = require('../db/sequelize')

const Workspace = sequelize.define('team', {
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
  createdAt: {type: Sequelize.DATE, field: 'created_at'},
  updatedAt: {type: Sequelize.DATE, field: 'updated_at'},
}, {
  tableName:"workspaces"
  // freezeTableName: true // Model tableName will be the same as the model name
});

module.exports = Workspace