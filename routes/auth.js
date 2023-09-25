import { Router } from 'express';
import { check } from 'express-validator';

import { validarCampos } from '../middlewares/vallidar-campos.js';

import { login } from '../controllers/auth.js';


const router = Router();

router.post('/login', [
	check('correo', 'The email is required').isEmail(),
	check('password', 'The password is required').notEmpty(),
	validarCampos,
], login);

export { router as authRouter };
