const router = require('express').Router()
const res = require('express/lib/response');
const sequelize = require('../config/connection');
const { User, Event } = require('../models');


router.get('/', (req, res) => {
    console.log(req.session)
    Event.findAll({
        attributes: [
            'id',
            'name',
            'description',
            'address',
            'date'
        ],
        include: {
            model: User,
            attributes: ['id']
        }
    },
    {
        model: User,
        attributes: ['id']
    })
    .then(dbPostData => {
        
        const loggedIn = req.session.loggedIn
        res.render('home', {loggedIn})
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    }) 
})

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/')
        return;
    }
    return res.render('login')
})


router.get('/signup', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/')
        return;
    }
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