const { Reaction } = require('../models');

const reactionData = [
    {
        id: 1,
        user_id: 1,
        event_id: 2,
    },
    {
        id: 2,
        user_id: 2,
        event_id: 1,
    },
    {
        id: 3,
        user_id: 3,
        event_id: 1
    },
    {
        id: 4,
        user_id: 2,
        event_id: 3,
    },
];

const seedReactions = () => Reaction.bulkCreate(reactionData);

module.exports = seedReactions;