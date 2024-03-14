const express = require('express');
const food = require('../controller/food');
const protect = require('../middleware/authMiddleware');

router = express.Router();

router.post('/addfood', food.createFood);
router.get('/getAllFoods', food.getAllFoods);
router.get('/getNewFoods', food.getNewFood);
router.get('/specialFood', food.getFoodsFromDistinctCatagory);
router.get('/getTopRated', food.getTopRating);
router.get('/getFood/:id', food.getFoodById);


module.exports = router; 