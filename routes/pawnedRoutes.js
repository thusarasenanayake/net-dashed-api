const router = require('express').Router();
const pawnedController = require('../controllers/pawnedController');

router.post('/', pawnedController.pawned_index_all);

module.exports = router;
