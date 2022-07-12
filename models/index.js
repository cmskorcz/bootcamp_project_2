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

Reaction.belongsTo(User, {
    foreignKey: 'user_id',
});

Reaction.belongsTo(Event, {
    foreignKey: 'event_id'
});

User.hasMany(Reaction, {
    onDelete: 'cascade'
});

Event.hasMany(Reaction, {
    onDelete: 'cascade'
});

Event.belongsToMany(User, {
    through: Reaction,
    foreignKey: 'event_id',
})

User.belongsToMany(Event, {
    through: Reaction,
    foreignKey: 'user_id',
    as: 'saved_events'
})

module.exports = { User, Event, Comment, Reaction };