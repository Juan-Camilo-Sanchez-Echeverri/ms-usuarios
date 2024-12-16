import { Router } from 'express';
import { check } from 'express-validator';
import RateLimit from 'express-rate-limit';


import { esAdminRole, tieneRole, validarJWT, validarCampos } from "../middlewares/index.js";

import { emailExiste, esRoleValido, existeUsuarioPorId } from '../helpers/db-validators.js';

import {
	usuariosDelete,
	usuariosGet,
	usuariosPatch,
	usuariosPost,
	usuariosPut,
} from '../controllers/usuarios.js';


const router = Router();

const limiter = RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // max 100 requests per windowMs
});

router.use(limiter);

router.get('/', [
	check('limite', "El valor de 'limite' debe ser numérico")
		.isNumeric()
		.optional(),
	check('desde', "El valor de 'desde' debe ser numérico")
		.isNumeric()
		.optional(),
	validarCampos,
], usuariosGet);

router.post('/', [
	check('nombre', 'El nombre es obligatorio').not().isEmpty(),
	check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6, }),
	check('correo', 'El Correo no es valido').isEmail(),
	check('correo').custom(emailExiste),
	// check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
	check('rol').custom(esRoleValido),
	validarCampos,
], usuariosPost);

router.put('/:id', [
	check('id', 'No es un ID válido').isMongoId(),
	check('id').custom(existeUsuarioPorId),
	check('rol').custom(esRoleValido),
	validarCampos,
], usuariosPut);

router.patch('/', usuariosPatch);

router.delete('/:id', [
	limiter,
	validarJWT,
	// esAdminRole,
	tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
	check('id', 'No es un ID válido').isMongoId(),
	check('id').custom(existeUsuarioPorId),
	validarCampos,
], usuariosDelete);

export { router as usuariosRouter };
