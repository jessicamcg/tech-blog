const router = require('express').Router();
const { Comment, Blog, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            include: [{ model:Blog }, { model:User }],
          });
          res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
        // console.log(req.session.user_id);
        const commentData = await Comment.create({
            title: req.body.title,
            content: req.body.content,
            date_posted: Date.now(),
            blog_id: req.session.blog_id, 
            user_id: req.session.user_id,
        });

        // console.log(commentData);

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/:id', async (req,res) => {
    try {
        const commentData = await Comment.findOne({
            where: {
                id: req.params.id,
            },
        })
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.put('/:id', async (req,res) => {
    try {
        const commentData = await Comment.update(req.body, {
            where: {
                id: req.params.id,
            },
        })
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req,res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;