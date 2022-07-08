const router = require('express').Router()
const sequelize = require('../config/connection');

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

router.get('/event/:id', (req, res) => {
    return res.render('singleEvent')
})

module.exports = router