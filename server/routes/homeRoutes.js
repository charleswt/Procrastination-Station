const router = require('express').Router();
const { getPosts } = require('../controllers/homeRoutes');

router.route('/').get(getPosts)

module.exports = router;