import { Router } from 'express';
import { check } from 'express-validator';

import { esAdminRole, validarCampos, validarJWT } from '../middlewares/index.js';
import { actualizarProducto, borrarProducto, crearProducto, obtenerProducto, obtenerProductos } from '../controllers/productos.js';
import { existeCategoriaPorId, existeProductoPorId } from '../helpers/db-validators.js';

const router = Router();

router.get('/', obtenerProductos)

router.get('/:id', [
    check('id', 'No es un ID de mongo válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], obtenerProducto)

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('categoria', 'No es un ID válido').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
], crearProducto)

router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID de mongo válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], actualizarProducto)

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], borrarProducto)

export { router as productosRouter };
