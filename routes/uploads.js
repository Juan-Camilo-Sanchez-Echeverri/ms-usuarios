import { Router } from "express";
import { check } from "express-validator";

import { validarCampos, validarArchivoSubir } from "../middlewares/index.js";
import { actualizarImagen, actualizarImagenCloudinary, cargarArchivo, mostrarImagen } from "../controllers/uploads.js";
import { coleccionesPermitidas } from "../helpers/db-validators.js";

const router = Router();

router.post("/", validarArchivoSubir, cargarArchivo);

router.put("/:coleccion/:id", [
  validarArchivoSubir,
  check("id", "El id debe ser de mongo").isMongoId(),
  check("coleccion").custom((c) => coleccionesPermitidas(c, ["usuarios", "productos"])),
  validarCampos,
], actualizarImagenCloudinary);
// ], actualizarImagen);

router.get("/:coleccion/:id", [
  check("id", "El id debe ser de mongo").isMongoId(),
  check("coleccion").custom((c) => coleccionesPermitidas(c, ["usuarios", "productos"])),
  validarCampos,
], mostrarImagen)

export { router as uploadRouter };
