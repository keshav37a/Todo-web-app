const express = require('express');
const router = express.Router();

var homeController = require('../controllers/home');

//for parsing form data
router.use(express.urlencoded());


router.get('/', homeController.home);
router.post('/create-item', homeController.createItem);
router.get('/delete-item', homeController.deleteItem);
router.get('/sort-item', homeController.sortItem);
router.get('/filter-item', homeController.filterItem);
router.get('/search', homeController.searchItem);

//exporting the router so that these calls can be called from the x
module.exports = router;