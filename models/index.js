const Event = require('./Event')
const User = require('./user')
const Workspace = require('./Workspace')
const EventUser = require('./EventUser')

Event.belongsTo(Workspace, { foreignKey: 'workspace_id' })
Event.belongsTo(User, { foreignKey: 'user_id', as: 'Administrator' })

Event.belongsToMany(User, { through: EventUser, foreignKey: 'user_id' })

Workspace.hasMany(User, { foreignKey: 'workspace_id' })
Workspace.hasMany(Event, { foreignKey: 'workspace_id' })

User.belongsTo(Workspace, { foreignKey: 'workspace_id' })
User.hasOne(Event, { foreignKey: 'user_id', as: "AdminEvent" })

User.belongsToMany(Event, { through: EventUser, foreignKey: 'event_id'})


exports.Event = Event
exports.Workspace = Workspace
exports.User = User
exports.EventUser = EventUser