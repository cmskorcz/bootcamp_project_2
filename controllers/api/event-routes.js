const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Event, Comment, User } = require('../../models');

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
                'created_at'
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
                'created_at'
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
router.post('/', async (req, res) => {
    try {
        if (req.session.loggedIn) {
            const createdEvent = await Event.create({
                name: req.body.name,
                address: req.body.address,
                description: req.body.description,
                date: req.body.date,
                user_id: req.session.user_id
            });
            
            res.json(createdEvent);
            return;
        }

        res.status(400).json({ message: 'You must be logged in to create an event' })
    } catch (error) {
        res.status(500).json(error);
    }
})


module.exports = router;