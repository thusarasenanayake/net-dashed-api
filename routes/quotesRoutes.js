const router = require('express').Router();
const quotesController = require('../controllers/quotesController');
const { setCacheToOneDay } = require('../middlewares/cacheMiddleware');

router.get('*', (req, res, next) => setCacheToOneDay(req, res, next));
router.get('/single', quotesController.quotes_index_one);

module.exports = router;
