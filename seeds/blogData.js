const { Blog } = require('../models');

const blogData = [
    {
        title: 'Object-Relational Mapping',
        content: 'I have really loved learning about ORMs. It has really simplified the way I create queries in SQL!',
        date_posted: '10/31/2021',
        user_id: '1'
    }
];

const seedBlog = () =>Blog.bulkCreate(blogData);

module.exports = seedBlog;