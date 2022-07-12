const { Event } = require('../models');

const eventData = [
    {
        name: 'Event 1',
        address: '123 Main St',
        description: 'This is an example description',
        date: 'July 29, 2022',
        user_id: 1
    },
    {
        name: 'Event 2',
        address: '123 North St',
        description: 'This is an example description',
        date: 'July 29, 2022',
        user_id: 2
    },
    {
        name: 'Event 3',
        address: '123 Other St',
        description: 'This is an example description',
        date: 'July 29, 2022',
        user_id: 3
    }
]

const seedEvents = () => Event.bulkCreate(eventData);

module.exports = seedEvents;