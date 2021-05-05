const Sequelize = require('sequelize')
const sequelize = require('../db/sequelize')
const Workspace = require('../models/Workspace')
const User = require('../models/user')
const EventUser = require('../models/EventUser')

const Event = sequelize.define('event', {
  id: {
    type: Sequelize.INTEGER,
    // field: 'id',
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING,
    field: 'title' // Will result in an attribute that is firstName when user facing but first_name in the database
  },
  description: {
    type: Sequelize.STRING,
    field: 'description'
  },
  userId: {
    type: Sequelize.INTEGER,
    field: 'user_id'
  },
  workspaceId: {
    type: Sequelize.INTEGER,
    field: 'workspace_id'
  },
  createdAt: {type: Sequelize.DATE, field: 'created_at'},
  updatedAt: {type: Sequelize.DATE, field: 'updated_at'},
}, {
  tableName:"events"
  // freezeTableName: true // Model tableName will be the same as the model name
});

module.exports = Event