const sequelize = require('../config/connection');

const seedUser = require('./user-seeds');
const seedEvents = require('./event-seeds');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('Data Synced');
    await seedUser();
    console.log('Users seeded');
    await seedEvents();
    console.log('Events seeded')
};

module.exports = seedAll;