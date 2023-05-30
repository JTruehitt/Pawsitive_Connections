const router = require('express').Router();
const homeRoutes = require('./home-routes');
const petRoutes = require('./pet-routes')

router.use('/', homeRoutes)
router.use('/pets', petRoutes)

module.exports = router;