import express from 'express';
import userController from '../controllers/userController.js';
import validateRegister from '../middlewares/validateRegister.js';
import validateLogin from '../middlewares/validateLogin.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', validateRegister.validateRegister, userController.register);
router.post('/login', validateLogin.validateLogin, userController.login);
router.get('/profile', authMiddleware.authMiddleware, userController.getProfile);

export default router;
