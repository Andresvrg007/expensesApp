import { Router } from 'express';
import { registerUser } from '../controllers/registerController.js';
import { loginUser } from '../controllers/loginController.js';
import { verifyAuth, logout } from '../controllers/authController.js';
import {updatePassword} from '../controllers/updatePassword.js'
import { saveSalary } from '../controllers/userController.js';
// Solo define el router y las rutas
const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/verify', verifyAuth);
router.post('/logout', logout);
router.post('/password', updatePassword);
router.post('/sueldo', saveSalary);

export default router;

