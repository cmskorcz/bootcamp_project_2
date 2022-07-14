const router = require('express').Router()
const sequelize = require('../config/connection');
const { Event, User } = require('../models');


router.get('/', async (req, res) => {
    try {
        const eventsArr = await Event.findAll({
            attributes: [
                'id',
                'name',
                'description',
                'address',
                'date'
            ],
            include: [
                {
                    model: User,
                    attributes: [
                        'id',
                        'first_name',
                        'last_name'
                    ]
                }
            ]
        });
        const events = eventsArr.map(event => event.get({ plain: true }));
    
        return res.render('home', { events });    
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/login', (req, res) => {
    return res.render('login')
})

router.get('/signup', (req, res) => {
    return res.render('signup')
})

router.get('/dashboard', (req, res) => {
    return res.render('events')
})

router.get('/event/new', (req, res) => {
    return res.render('newEvent')
})

router.get('/events/:id/edit', async (req, res) => {
    let event = await Event.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'name',
            'description',
            'address',
            'date'
        ]
    });
    event = event.get({ plain: true });
    res.render('editEvent', event)
})

module.exports = router