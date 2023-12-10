import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { v4 as uuid } from "uuid";

const subirArchivo = (
  files,
  extensionesValidas = ["png", "jpg", "jpeg", "gif", "webp"],
  carpeta = ""
) => {
  return new Promise((resolve, reject) => {
    const { archivo } = files;

    const nombreCortado = archivo.name.split(".");
    const extension = nombreCortado[nombreCortado.length - 1];

    if (!extensionesValidas.includes(extension))
      return reject(
        `La extensión ${extension} no es permitida, las permitidas son ${extensionesValidas}`
      );

    const nombreTemp = uuid() + "." + extension;
    const uploadPath = path.join(__dirname, "../uploads/", carpeta, nombreTemp);

    archivo.mv(uploadPath, (err) => {
      if (err) {
        return reject(err);
      }

      resolve(nombreTemp);
    });
  });
};

export { subirArchivo };
