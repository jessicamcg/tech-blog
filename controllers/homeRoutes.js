const router = require('express').Router();
const { User, Blog } = require('../models');
const withAuth = require('../utils/auth');


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
});

router.get('/blog/:id', withAuth, async (req, res) => {
    try {
      const blogData = await Blog.findByPk(req.params.id);
  
      const blog = blogData.get({ plain: true });
  
      res.render('blog', { blog, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
});
  
module.exports = router;