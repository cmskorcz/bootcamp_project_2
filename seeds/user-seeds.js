const { User } = require('../models');

const userData = [
    {
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@gmail.com',
        password: 'password'
    },
    {
        first_name: 'Jane',
        last_name: 'Doe',
        email: 'janedoe@gmail.com',
        password: 'password'
    },
    {
        first_name: 'Bill',
        last_name: 'Bob',
        email: 'billbob@gmail.com',
        password: 'password'
    }
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
