const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
          include: [{ model: User }]
        });

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
      req.session.save(() => {
        
        req.session.blog_id = req.params.id;
  
      });

      const blogData = await Blog.findByPk(req.params.id);
  
      const blog = blogData.get({ plain: true });

      const commentData = await Comment.findAll({
        where: {
          blog_id: req.params.id,
        }
      });

      const comments = commentData.map((comment) => comment.get({ plain:true }));
  
      res.render('blog', { blog, 
        comments, 
        loggedIn: req.session.loggedIn 
      });

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }
  const blogData = await Blog.findAll({  // how to only display blog of the current logged in user
    where: {
      user_id: req.session.user_id
    },
    include: [{ model:User }]
  });
  const blogs = blogData.map((blog) => 
      blog.get({ plain: true })
  );
  res.render('dashboard', {
    blogs,
    loggedIn: req.session.loggedIn
  });
});

router.get('/new-blog-form', async (req,res) => {
  if (!req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('new-blog-form');

});

router.get('/add-comment', async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('add-comment');
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('signup');
});
  
module.exports = router;