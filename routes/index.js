const express = require('express');
const router = express.Router();

var homeController = require('../controllers/home');

//for parsing form data
router.use(express.urlencoded());


router.get('/', homeController.home);
router.post('/create-item', homeController.createItem);
router.post('/delete-item', homeController.deleteItem);

module.exports = router;