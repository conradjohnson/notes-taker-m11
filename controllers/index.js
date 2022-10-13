const router = require('express').Router();
const apiRoutes = require('./api');

// api routes separated for good practice.
router.use('/api', apiRoutes);

module.exports = router;