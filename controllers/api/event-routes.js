const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Event, Comment, User, Reaction } = require('../../models');
const { withAuth, withEmailAuth } = require('../../utils/auth');

// Get all Events
router.get('/', async (req, res) => {
    try {
        const foundEvents = await Event.findAll({
            attributes: [
                'id',
                'name',
                'address',
                'description',
                'date',
                'created_at',
                [sequelize.literal('(SELECT COUNT(*) FROM Reaction WHERE Event.id = Reaction.event_id)'), 'Reactions']
            ],
            include: [
                {
                    model: User,
                    attributes: [
                        'first_name',
                        'last_name',
                        'email'
                    ]
                }
            ]           
        });
    
        res.json(foundEvents);
    
    } catch (error) {
        res.status(500).json(error);
    }
});

// Get one Event
router.get('/:id', async (req, res) => {
    try {
        const foundEvent = await Event.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'name',
                'address',
                'description',
                'date',
                'created_at',
                [sequelize.literal('(SELECT COUNT(*) FROM Reaction WHERE Event.id = Reaction.event_id)'), 'Reactions']
            ],
            include: [
                {
                    model: User,
                    attributes: [
                        'first_name',
                        'last_name',
                        'email'
                    ]
                },
                {
                    model: Comment,
                    attributes: [
                        'id',
                        'comment_text',
                        'created_at'
                    ],
                    include: {
                        model: User,
                        attributes: [
                            'first_name',
                            'last_name'
                        ]
                    }
                }
            ]
        });
    
        if (!foundEvent) {
            res.status(404).json({ message: 'Unable to find event.' });
            return;
        }
    
        res.json(foundEvent);
    
    } catch (error) {
        res.status(500).json(error);
    }
});

// Create Event
router.post('/', withAuth, withEmailAuth, async (req, res) => {
    try {
            const createdEvent = await Event.create({
                name: req.body.name,
                address: req.body.address,
                description: req.body.description,
                date: req.body.date,
                user_id: req.session.user_id
            });
            
            res.json(createdEvent);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Update Event
router.put('/:id', withAuth, withEmailAuth, async (req, res) => {
    try {
        const updatedEvent = await Event.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        if (!updatedEvent) {
            res.status(404).json({ message: 'Unable to find that event' });
            return;
        }

        res.json(updatedEvent);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Delete Event
router.delete('/:id', withAuth, withEmailAuth, async (req, res) => {
    try {
        const deletedEvent = await Event.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!deletedEvent) {
            res.status(404).json({ message: 'Unable to find event' });
            return;
        }

        res.json({ message: 'Event deleted' });        
    } catch (error) {
        res.status(500).json(error)
    }
});

// React to Event
router.put('/reaction', withAuth, withEmailAuth, async (req, res) => {
    try {
        const newReaction = await Event.reaction({...req.body, user_id: req.session.user_id }, { Reaction, Comment, User });
        
        res.json(newReaction);         
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;