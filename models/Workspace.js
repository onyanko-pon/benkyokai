const Sequelize = require('sequelize')
const sequelize = require('../db/sequelize')
const User = require('../models/user')
const Event = require('../models/Event')

const Workspace = sequelize.define('Workspace', {
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