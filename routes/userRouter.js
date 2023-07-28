const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/all', userController.getAll);
router.get('/:name', userController.getOne);
router.post('/create', userController.create);

module.exports = router;
