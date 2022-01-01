const router = require('express').Router();
const foreignNewsController = require('../controllers/foreignNewsController');

router.get('/', foreignNewsController.news_index_all);
router.get('/:category', foreignNewsController.news_index_one);

module.exports = router;
