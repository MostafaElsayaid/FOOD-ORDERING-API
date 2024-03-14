const express = require('express');
const userController = require('../controller/user');
const protect = require('../middleware/authMiddleware');

 router = express.Router();

router.post('/register',userController.registerController) ;
router.post('/get-user',protect , userController.authController);
router.put('/update' , userController.updateUserProfile);
router.post('/login' , userController.loginController);
router.post('/verifyOtp' , userController.verifyOtpController);


module.exports = router; 