const { Blog } = require('../models');

const blogData = [

];

const seedBlog = () =>Blog.bulkCreate(blogData);

module.exports = seedBlog;