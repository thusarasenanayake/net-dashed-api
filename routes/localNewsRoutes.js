const router = require('express').Router();
const localNewsController = require('../controllers/localNewsController');

router.get('/', localNewsController.news_index_all);
router.get('/:category', localNewsController.news_index_one);

module.exports = router;
