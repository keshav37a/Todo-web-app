const express = require('express');
const router = express.Router();

var homeController = require('../controllers/home');

router.get('/', homeController.home);

module.exports = router;