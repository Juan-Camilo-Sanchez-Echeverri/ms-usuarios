import { Router } from 'express';
import { check } from 'express-validator';

import { validarCampos } from '../middlewares/validar-campos.js';

import { googleSignIn, login } from '../controllers/auth.js';


const router = Router();

router.post('/login', [
	check('correo', 'The email is required').isEmail(),
	check('password', 'The password is required').notEmpty(),
	validarCampos,
], login);

router.post('/google', [
	check('id_token', 'id_Token es necesario').not().isEmpty(),
	validarCampos,
], googleSignIn);


export { router as authRouter };
