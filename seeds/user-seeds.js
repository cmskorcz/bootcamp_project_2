const { User } = require('../models');
const { v4: uuidv4 } = require('uuid');

const userData = [
    {
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@gmail.com',
        password: 'password',
        is_auth_email: true,
        auth_url: uuidv4()
    },
    {
        first_name: 'Jane',
        last_name: 'Doe',
        email: 'janedoe@gmail.com',
        password: 'password',
        is_auth_email: true,
        auth_url: uuidv4()
    },
    {
        first_name: 'Bill',
        last_name: 'Bob',
        email: 'billbob@gmail.com',
        password: 'password',
        is_auth_email: true,
        auth_url: uuidv4()
    }
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
