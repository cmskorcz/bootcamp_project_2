const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('./layout/main')
})

module.exports = router