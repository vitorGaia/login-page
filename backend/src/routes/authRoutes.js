import express from 'express';
import userController from '../controllers/userController.js';
import validateRegister from '../middlewares/validateRegister.js';

const router = express.Router();

router.post('/register', validateRegister.validateRegister, userController.register);

export default router;
