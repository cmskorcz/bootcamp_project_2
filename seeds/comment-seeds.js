const { Comment } = require('../models');

const commentData = [
    {
        comment_text: 'This is an example comment',
        user_id: 1,
        event_id: 2
    },
    {
        comment_text: 'This is also a comment',
        user_id: 2,
        event_id: 1
    },
    {
        comment_text: 'I would like to leave a comment',
        user_id: 3,
        event_id: 1
    },
    {
        comment_text: 'comment',
        user_id: 1,
        event_id: 3
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;