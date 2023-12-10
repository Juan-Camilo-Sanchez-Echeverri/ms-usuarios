import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import fs from "fs";

import { response, request } from "express";
import { subirArchivo } from "../helpers/subir-archivo.js";
import Producto from "../models/producto.js";
import Usuario from "../models/usuario.js";

import { v2 } from "cloudinary";
const cloudinary = v2
const callCloudinary = () => {
  cloudinary.config({
    cloud_name: 'dtdflwegb',
    api_key: '656138321441284',
    api_secret: process.env.CLOUDINARY_API_SECRET
  })
  return cloudinary
}


const cargarArchivo = async (req = request, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ msg: "No hay archivos que subir" });
  }
  try {
    const nombre = await subirArchivo(req.files, undefined, "imgs");
    res.json({ nombre });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const actualizarImagen = async (req = request, res = Response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`,
        });
      }
      break;
    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`,
        });
      }
      break;

    default:
      return res.status(500).json({ msg: "Se me olvidó validar esto" });
  }

  // Limpiar imágenes previas
  try {
    if (modelo.img) {
      // Hay que borrar la imagen del servidor
      const pathImagen = path.join(__dirname, "../uploads", coleccion, modelo.img);
      if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
      }
    }
  } catch (error) {

  }

  const nombre = await subirArchivo(req.files, undefined, coleccion);

  modelo.img = nombre;

  await modelo.save();

  res.json(modelo);
}

const mostrarImagen = async (req = request, res = response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`,
        });
      }
      break;
    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`,
        });
      }
      break;

    default:
      return res.status(500).json({ msg: "Se me olvidó validar esto" });
  }

  // Limpiar imágenes previas
  try {
    if (modelo.img) {
      // Hay que borrar la imagen del servidor
      const pathImagen = path.join(__dirname, "../uploads", coleccion, modelo.img);
      if (fs.existsSync(pathImagen)) {
        return res.sendFile(pathImagen);
      }
    }
  } catch (error) {

  }

  const pathImagen = path.join(__dirname, "../assets/no-image.jpg");
  res.sendFile(pathImagen);
}

const actualizarImagenCloudinary = async (req = request, res = Response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`,
        });
      }
      break;
    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`,
        });
      }
      break;

    default:
      return res.status(500).json({ msg: "Se me olvidó validar esto" });
  }

  // Limpiar imágenes previas
  if (modelo.img) {
    const nombreArr = modelo.img.split("/");
    const nombre = nombreArr[nombreArr.length - 1];
    const [public_id] = nombre.split(".");
    callCloudinary().uploader.destroy(public_id);
  }


  try {
    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await callCloudinary().uploader.upload(tempFilePath, { folder: coleccion });
    modelo.img = secure_url;
    await modelo.save();
    res.json(modelo);
  } catch (error) {
    console.log(error);
  }

}


export { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary };
