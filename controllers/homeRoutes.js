const router = require('express').Router();
const { User, Blog } = require('../models');
const withAuth = require('../utils/auth');

module.exports = router;

router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll();
        const blogs = blogData.map((blog) => 
            blog.get({ plain: true })
        );

        res.render('homepage', {
            blogs,
            loggedIn: req.session.loggedIn
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})