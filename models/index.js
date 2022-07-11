const User = require('./User');
const Event = require('./Event');
const Comment = require('./Comment');
const Reaction = require('./Reaction');

Event.belongsTo(User, {
    foreignKey: 'user_id'
});

Event.hasMany(Comment, {
    onDelete: 'cascade'
})

User.hasMany(Event, {
    onDelete: 'cascade'
});

User.hasMany(Comment, {
    onDelete: 'cascade'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Event, {
    foreignKey: 'event_id'
});

module.exports = { User, Event, Comment, Reaction };