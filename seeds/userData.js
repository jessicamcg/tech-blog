const { User } = require('../models');

const userData = [
    {
        username: 'admin',
        email: 'test@test.com',
        password: 'testtest',
    }
];

const seedUser = () =>User.bulkCreate(userData);

module.exports = seedUser;