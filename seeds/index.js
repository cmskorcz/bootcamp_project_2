const sequelize = require('../config/connection');

const seedUser = require('./user-seeds');
const seedEvents = require('./event-seeds');
const seedComments = require('./comment-seeds');
const seedReactions = require('./reaction-seeds');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('Data Synced');
    await seedUser();
    console.log('Users seeded');
    await seedEvents();
    console.log('Events seeded');
    await seedComments();
    console.log('Comments Seeded');
    await seedReactions();
    console.log('Reactions Seeded');
};

seedAll()