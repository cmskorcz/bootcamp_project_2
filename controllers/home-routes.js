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


module.exports = router