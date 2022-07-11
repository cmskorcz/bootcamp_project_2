const User = require('./User');
const Event = require('./Event');
const Comment = require('./Comment');
const Reaction = require('./Reaction');

Event.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Event, {
    onDelete: 'cascade'
})

module.exports = { User, Event, Comment, Reaction };