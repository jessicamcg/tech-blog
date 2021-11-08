const router = require('express').Router();
const { User, Blog } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req,res) => {
    try {
        const blogData = await Blog.findAll({
            include: [{ model:User }],
          });
          res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.post('/', withAuth, async (req, res) => {
    try {
        // console.log(req.session.user_id);
        const blogData = await Blog.create({
            title: req.body.title,
            content: req.body.content,
            date_posted: Date.now(),
            user_id: req.session.user_id,  // help i cry
        });

        // console.log(blogData);

        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req,res) => {
    try {
        const blogData = await Blog.update(req.body, {
            where: {
              id: req.params.id,
            },
        });
        res.status(200).json(blogData)
    } catch (err) {
        res.status(500).json(err);
    }
})

router.delete('/:id', async (req,res) => {
    try {
        const blogData = await Blog.destroy({
            where: {
              id: req.params.id,
            },
        });

        res.status(200).json(blogData)
    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router;