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

router.get('/dashboard', withAuth, async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }
  const blogData = await Blog.findAll({  // how to only display blog of the current logged in user
    // where: {
    //   user_id: req.session.user_id
    // },
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
  // const blogData = await Blog.findAll({  // how to only display blog of the current logged in user
  //   // where: {
  //   //   user_id: req.session.user_id
  //   // },
  //   include: [{ model:User }]
  // });
  // const blogs = blogData.map((blog) => 
  //     blog.get({ plain: true })
  // );
  res.render('new-blog-form');
  // res.render('new-blog-form', {
  //   blogs,
  //   loggedIn: req.session.loggedIn
  // });
})

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