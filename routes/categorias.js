import { Router } from 'express';
import { check } from 'express-validator';

import { esAdminRole, validarCampos, validarJWT } from '../middlewares/index.js';
import { actualizarCategoria, borrarCategoria, crearCategoria, obtenerCategoria, obtenerCategorias } from '../controllers/categorias.js';
import { existeCategoriaPorId } from '../helpers/db-validators.js';
import RateLimit from 'express-rate-limit';

const limiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
});
const router = Router();

router.use(limiter);
router.get('/', obtenerCategorias)

router.get('/:id', [
  check('id', 'No es un ID de mongo válido').isMongoId(),
  check('id').custom(existeCategoriaPorId),
  validarCampos
], obtenerCategoria)

router.post('/', [
  validarJWT,
  check('nombre', 'El nombre es obligatorio').notEmpty(),
  validarCampos
], crearCategoria)

router.put('/:id', [
  validarJWT,
  check('nombre', 'El nombre es obligatorio').notEmpty(),
  check('id').custom(existeCategoriaPorId),
  validarCampos
], actualizarCategoria)

router.delete('/:id', [
  validarJWT,
  esAdminRole,
  check('id', 'No es un ID válido').isMongoId(),
  validarCampos
], borrarCategoria)

export { router as categoriasRouter };
