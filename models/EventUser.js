const Sequelize = require('sequelize')
const sequelize = require('../db/sequelize')

const EventUser = sequelize.define('eventUser', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  eventId: {
    type: Sequelize.INTEGER,
    field: 'event_id'
  },
  userId: {
    type: Sequelize.INTEGER,
    field: 'user_id'
  },
  createdAt: {type: Sequelize.DATE, field: 'created_at'},
  updatedAt: {type: Sequelize.DATE, field: 'updated_at'},
}, {
  tableName:"events_users"
});

module.exports = EventUser