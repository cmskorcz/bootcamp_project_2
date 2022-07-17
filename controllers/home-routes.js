const router = require('express').Router()
const sequelize = require('../config/connection');
const { Event, User } = require('../models');


router.get('/', async (req, res) => {
    try {
        const loggedIn = req.session.loggedIn
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
    
        return res.render('home', { events, loggedIn });    
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/login', (req, res) => {
    const loggedIn = req.session.loggedIn
    
    if (!loggedIn) {
        res.render('login')
    } else {
        res.redirect('/profile')
    }
})

router.get('/signup', (req, res) => {
    const loggedIn = req.session.loggedIn

    if (!loggedIn) {
        res.render('signup')
    } else {
        res.redirect('/profile')
    }
})

module.exports = router