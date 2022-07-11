const sequelize = require('../config/connection');

const seedUser = require('./user-seeds');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('Users seeded');
    await seedUser();
};

module.exports = seedAll;