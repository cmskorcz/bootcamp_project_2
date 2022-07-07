const router = require('express').Router();
const { Comment } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const response = await Comment.findAll({
            attributes: [
                'id',
                'comment_text',
                'created_at',
                'user_id',
                'event_id'
            ]
        });
        
        res.json(response);

    } catch (error) {
        res.status(500).json(error)
    }  
});

router.post('/', async (req, res) => {
    try {
        const newComment = await Comment.create({
            comment_text: req.body.comment_text,
            user_id: req.session.user_id,
            post_id: req.body.post_id
        });

        res.json(newComment);
    } catch (error) {
        res.status(500).json(error)
    }
});

router.get('/:id', async (req, res) => {
    try {
        const comment = await Comment.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'comment_text',
                'created_at',
                'user_id',
                'event_id'
            ]
        });

        if (!comment) {
            res.status(404).json({ message: 'Unable to locate comment' })
            return;
        }

        res.json(comment);

    } catch (error) {
        res.status(500).json(error)
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedComment = await Comment.update(
            {
                comment_text: req.body.comment_text
            },
            {
                where: {
                    id: req.params.id
                }
            }
        );

        if (!updatedComment) {
            res.status(404).json({ message: 'Unable to locate comment' })
            return
        }

        res.json(updatedComment);
    } catch (error) {
        res.status(500).json(error)
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedComment = await Comment.delete({
            where: {
                id: req.params.id
            }
        });

        if (!deletedComment) {
            res.status(404).json({ message: 'Unable to locate comment' })
            return
        }

        res.json(deletedComment);

    } catch (error) {
        res.status(500).json(error)
    }
})