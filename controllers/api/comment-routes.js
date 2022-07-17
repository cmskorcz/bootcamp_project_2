const router = require('express').Router()
const sequelize = require('../../config/connection');
const { Comment, User, Event } = require('../../models');
const { withAuth, withEmailAuth } = require('../../utils/auth');


// Get All Comments
router.get('/', async (req, res) => {
    try {
        const foundComments = await Comment.findAll({
            attributes: [
                'id',
                'comment_text',
                'created_at'
            ],
            include: [
                {
                    model: Event,
                    attributes: [
                        'id',
                        'name'
                    ],
                    include: {
                        model: User,
                        attributes: [
                            'id',
                            'first_name',
                            'last_name',
                            'email'
                        ]
                    }
                },
                {
                    model: User,
                    attributes: [
                        'id',
                        'first_name',
                        'last_name',
                        'email',
                        'created_at'
                    ]
                }
            ]
        });
    
        res.json(foundComments)
    
    } catch (error) {
        res.status(500).json(error)
    }
});

// Find single comment
router.get('/:id', async (req, res) => {
    try {
        const foundComment = await Comment.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'comment_text',
                'created_at'
            ],
            include: [
                {
                    model: Event,
                    attributes: [
                        'id',
                        'name',
                        'address',
                        'description',
                        'date',
                        'created_at'
                    ],
                    include: {
                        model: User,
                        attributes: ['id', 'first_name', 'last_name']
                    }
                },
                {
                    model: User,
                    attributes: ['id', 'first_name', 'last_name']
                }
            ]
        });
    
        if (!foundComment) {
            res.status(404).json({ message: 'Unable to find comment' });
            return;
        }
        res.json(foundComment);
    
    } catch (error) {
        res.status(500).json(error);   
    }
})

// Create Comment
router.post('/', withAuth, withEmailAuth, async (req, res) => {
    try {
        const comment = await Comment.create({
            comment_text: req.body.comment_text,
            event_id: req.body.event_id,
            user_id: req.body.user_id
        });

        if (!comment) {
            res.status(400).json({ message: 'unable to create comment' })
            return
        }

        res.json(comment)
    } catch (error) {
        res.status(500).json(error)
    }
})
// });

// Update Comment
router.put('/:id', withAuth, withEmailAuth, async (req, res) => {
    try {
        const updatedComment = await Comment.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        if (!updatedComment) {
            res.status(404).json({ message: 'Unable to find comment' });
            return;
        }

        res.json({ message: 'Comment update successful' });
    } catch (error) {
        res.status(500).json(error);        
    }
});

router.delete('/:id', withAuth, withEmailAuth, async (req, res) => {
    try {
        const deletedComment = await Comment.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!deletedComment) {
            res.status(404).json({ message: 'Unable to find comment' });
            return;
        }

        res.json({ message: 'Comment successfully deleted' });
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;