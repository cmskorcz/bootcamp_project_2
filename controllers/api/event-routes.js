const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Event, Comment, User, Reaction } = require('../../models');

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
// Return commented lines when login page built
router.post('/', async (req, res) => {
    try {
        // if (req.session.loggedIn) {
            const createdEvent = await Event.create({
                name: req.body.name,
                address: req.body.address,
                description: req.body.description,
                date: req.body.date,
                user_id: req.body.user_id
                // user_id: req.session.user_id
            });
            
            res.json(createdEvent);
            // return;
        // }

        // res.status(400).json({ message: 'You must be logged in to create an event' })
    } catch (error) {
        res.status(500).json(error);
    }
});

// Update Event
router.put('/:id', async (req, res) => {
    try {
        if (req.session.loggedIn) {
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
            return;
        }

        res.status(400).json({ message: 'You must be logged in to edit this event.' });
        return;

    } catch (error) {
        res.status(500).json(error);
    }
});

// Delete Event
router.delete('/:id', async (req, res) => {
    try {
        if (req.session.loggedIn) {
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
            return;
        }
        res.status(400).json({ message: 'You must be logged in to delete an event' });
    
    } catch (error) {
        res.status(500).json(error)
    }
});

// React to Event
router.put('/reaction', async (req, res) => {
    try {
        if (req.session.loggedIn) {
            const newReaction = await Event.reaction({...req.body, user_id: req.session.user_id }, { Reaction, Comment, User });
            
            res.json(newReaction);
            return;
         }
         res.status(400).json({ message: 'Bad Request' });     
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;