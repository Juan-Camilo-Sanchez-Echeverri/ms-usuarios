import {
	usuariosDelete,
	usuariosGet,
	usuariosPatch,
	usuariosPost,
	usuariosPut,
} from '../controllers/usuarios.js';

import { Router } from 'express';
import { check, query } from 'express-validator';

import { validarCampos } from '../middlewares/vallidar-campos.js';
import {
	emailExiste,
	esRoleValido,
	existeUsuarioPorId,
} from '../helpers/db-validators.js';

const router = Router();

router.get(
	'/',
	[
		query('limite', "El valor de 'limite' debe ser numérico")
			.isNumeric()
			.optional(),
		query('desde', "El valor de 'desde' debe ser numérico")
			.isNumeric()
			.optional(),
		validarCampos,
	],
	usuariosGet
);

router.post(
	'/',
	[
		check('nombre', 'El nombre es obligatorio').not().isEmpty(),
		check('password', 'El password debe de ser más de 6 letras').isLength({
			min: 6,
		}),
		check('correo', 'El Correo no es valido').isEmail(),
		check('correo').custom(emailExiste),
		// check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
		check('rol').custom(esRoleValido),
		validarCampos,
	],
	usuariosPost
);

router.put(
	'/:id',
	[
		check('id', 'No es un ID válido').isMongoId(),
		check('id').custom(existeUsuarioPorId),
		check('rol').custom(esRoleValido),
		validarCampos,
	],
	usuariosPut
);

router.patch('/', usuariosPatch);

router.delete(
	'/:id',
	[
		check('id', 'No es un ID válido').isMongoId(),
		check('id').custom(existeUsuarioPorId),
		validarCampos,
	],
	usuariosDelete
);

export default router;
