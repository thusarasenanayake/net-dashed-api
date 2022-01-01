const router = require('express').Router();
const wordsController = require('../controllers/wordsController');
const { setCacheToOneDay } = require('../middlewares/cacheMiddleware');

router.get('*', (req, res, next) => setCacheToOneDay(req, res, next));
router.get('/single', wordsController.words_index_single);

module.exports = router;
