const { User } = require('../models');

const userData = [
    {
        username: 'test',
        email: 'test@test.com',
        password: 'testtest',
    }
];

const seedUser = () =>User.bulkCreate(userData);

module.exports = seedUser;