const router = require('express').Router()

const homeRoutes = require('./home-routes.js')
const apiRoutes = require('./api');
const profileRoutes = require('./profile-routes.js');
const eventRoutes = require('./event-routes.js');

router.use('/', homeRoutes)
router.use('/api', apiRoutes);
router.use('/profile', profileRoutes);
router.use('/event', eventRoutes);

module.exports = router;