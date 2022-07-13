const router = require('express').Router()
const sequelize = require('../config/connection');
const { Event } = require('../models');
const users = []
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    return res.render('home')
})

router.get('/login', (req, res) => {
    return res.render('login')
})

/* router.post('/login', (req, res) => {

})
*/

router.get('/signup', (req, res) => {
    return res.render('signup')
})

/* router.post('/signup', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push ({
            id: Date.now().toString(),
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hashedPassword
        })
        res.redirect('/login')
    } catch {
        res.redirect('/signup')

    }
    console.log(users)
})
*/

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