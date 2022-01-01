const router = require('express').Router();
const weatherController = require('../controllers/weatherController');

router.post('/', weatherController.weather_index_all);

module.exports = router;
