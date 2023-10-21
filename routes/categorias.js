import { Router } from 'express';
import { check } from 'express-validator';

import { esAdminRole, validarCampos, validarJWT } from '../middlewares/index.js';
import { actualizarCategoria, borrarCategoria, crearCategoria, obtenerCategoria, obtenerCategorias } from '../controllers/categorias.js';
import { existeCategoriaPorId } from '../helpers/db-validators.js';



const router = Router();


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
