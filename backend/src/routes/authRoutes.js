import express from 'express';
import userController from '../controllers/userController.js';
import validateRegister from '../middlewares/validateRegister.js';
import validateLogin from '../middlewares/validateLogin.js';

const router = express.Router();

router.post('/register', validateRegister.validateRegister, userController.register);
router.post('/login', validateLogin.validateLogin, userController.login);

export default router;
