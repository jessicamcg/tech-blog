const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        // console.log(req.session.user_id);
        const commentData = await Comment.create({
            title: req.body.title,
            content: req.body.content,
            date_posted: Date.now(),
            blog_id: req.session.blog_id, 
        });

        console.log(commentData);

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;