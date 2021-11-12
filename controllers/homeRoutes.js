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

      const blogData = await Blog.findOne({
        where: {
          id: req.params.id,
        },
        include: [{ model:User }]
      });

      const blog = blogData.get({ plain: true });
      // console.log(blog.user.id);
      // console.log(req.session.user_id);
      const commentData = await Comment.findAll({
        where: {
          blog_id: req.params.id,
        }
      });

      let comments = commentData.map((comment) => comment.get({ plain:true }));
      // let help = comments.map(comment=> ({...comment, canEditComment: true}))
      // console.log(help);
      let help;
      comments.map(e => {
        if (e.user_id == req.session.user_id) {
          // help = comments.map(comment=> ({...comment, canEditComment: true}))
          e.canEditComment = true;
        } else {
          // help = comments.map(comment=> ({...comment, canEditComment: false}))
          e.canEditComment = false;
        }
        
      });
      console.log(help);
      if (req.session.user_id == blog.user.id) {
        req.session.save(() => {
          req.session.canEdit = true;
        })
      } else {
        req.session.save(() => {
          req.session.canEdit = false;
        })
      }

      // if (req.session.user_id == comments.user_id) {                   // original logic
      //   req.session.save(() => {                                       // comments is array of objs!!!
      //     // req.session.canEditComment = true;                        // comments.user_is === undefined!!!!
                                                                          // never entered if statement, always false
      //     comments.map(e=> ({...e, canEditComment: true}))
      //     console.log(comments);
      //   })
      // } else {
      //   req.session.save(() => {
      //     req.session.canEditComment = false;
      //   })
      // }
      console.log(comments);
      // console.log(req.session.user_id);
      // console.log(comments.user_id);
      // console.log(req.session);




      res.render('blog', { 
        blog, 
        comments, 
        loggedIn: req.session.loggedIn,
        canEdit: req.session.canEdit,
        // canEditComment: req.session.canEditComment
      });

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

router.get('/edit-blog/:id', withAuth, async (req,res) => {
  try {
    // const blogData = await Blog.findByPk(req.params.id);    
    res.render('edit-blog')
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.get('/comment/:id', withAuth, async (req, res) => {
  try {
    // const commentData = await Comment.findByPk(req.params.id);
    // console.log(commentData);
    // res.status(200).json(commentData);
    res.render('edit-comment');
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