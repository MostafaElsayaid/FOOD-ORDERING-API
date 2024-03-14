const express = require('express');
const protect = require('../middleware/authMiddleware');
const order = require('../controller/order')

router = express.Router();

router.post('/order', order.createOrder);
router.post('/getorders', order.getAllOrders);
router.post('/getorder', order.getSingleOrder);
router.post('/deliverd', order.markOrderAsDelivered);



module.exports = router; 