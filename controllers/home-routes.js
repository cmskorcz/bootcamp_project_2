const router = require('express').Router()
const sequelize = require('../config/connection');
const { Event } = require('../models');


router.get('/', (req, res) => {
    return res.render('home')
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