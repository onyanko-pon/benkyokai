const Sequelize = require('sequelize')
const sequelize = require('../db/sequelize')
const Event = require('../models/Event')
const Workspace = require('../models/Workspace')
const EventUser = require('../models/EventUser')

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
  workspaceId: {
    type: Sequelize.INTEGER,
    field: 'workspace_id'
  },
  createdAt: {type: Sequelize.DATE, field: 'created_at'},
  updatedAt: {type: Sequelize.DATE, field: 'updated_at'},
}, {
  tableName:"users"
  // freezeTableName: true // Model tableName will be the same as the model name
});

module.exports = User