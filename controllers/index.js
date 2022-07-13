const router = require('express').Router()

const homeRoutes = require('./home-routes.js')
const apiRoutes = require('./api');
const profileRoutes = require('./profile-routes.js');

router.use('/', homeRoutes)
router.use('/api', apiRoutes);
router.use('/profile', profileRoutes);

module.exports = router;