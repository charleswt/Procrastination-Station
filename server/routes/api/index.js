const router = require('express').Router();
const sale = require('./saleRoutes');

router.use('/sale', sale);

module.exports = router