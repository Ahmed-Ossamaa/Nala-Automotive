const express = require('express');
const router = express.Router();
const auth = require('../controllers/AuthController');
const { protect } = require('../middleWare/authMW');
const validate = require('../middleWare/validation');
const { registerSchema, loginSchema, updateProfileSchema, changePasswordSchema } = require('../validation/authValidator');


// Public routes
router.post('/register',validate(registerSchema) ,auth.register);
router.post('/login',validate(loginSchema) ,auth.login);
router.post('/refresh-token', auth.refreshToken);

// Protected user routes
router.post('/logout', protect, auth.logout);
router.get('/me', protect, auth.getMe);
router.patch('/update', protect, validate(updateProfileSchema) , auth.updateProfile);
router.patch('/change-password', protect, validate(changePasswordSchema) ,auth.changePassword);

module.exports = router;
