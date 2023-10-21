import { request, response } from "express";



/**
 * La función `esAdminRole` comprueba si el usuario tiene un "ADMIN_ROLE" y le permite continuar si lo
 * tiene.
 * @param [req] - El parámetro `req` representa el objeto de solicitud, que contiene información sobre
 * la solicitud HTTP entrante, como encabezados, parámetros de consulta y cuerpo de la solicitud.
 * @param [res] - El parámetro `res` es el objeto de respuesta en Express.js. Se utiliza para enviar la
 * respuesta al cliente.
 * @param next - El parámetro "siguiente" es una función de devolución de llamada que se utiliza para
 * pasar el control a la siguiente función de middleware en el ciclo de solicitud-respuesta.
 * Normalmente se llama al final de la función de middleware actual para indicar que ha completado su
 * procesamiento y se debe llamar a la siguiente función de middleware.
 * @returns En el fragmento de código proporcionado, si `req.usuario` no está definido, se devolverá
 * una respuesta con el código de estado 500 y un objeto JSON que contiene el mensaje "Se quiere
 * verificar el rol sin validar el token primero".
 */
const esAdminRole = (req = request, res = response, next) => {

  if (!req.usuario) {
    return res.status(500).json({
      msg: "Se quiere verificar el role sin validar el token primero",
    });
  }

  const { rol, nombre } = req.usuario;

  if (rol !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${nombre} no es administrador - No puede hacer esto`,
    });
  }

  next();

};

/**
 * The function `tieneRole` is a middleware function in JavaScript that checks if a user has one of the
 * specified roles before allowing access to a certain service.
 * @param roles - The `roles` parameter is a rest parameter that allows you to pass in multiple roles
 * as arguments to the `tieneRole` function. It collects all the arguments passed into an array called
 * `roles`.
 * @returns The function `tieneRole` returns another function.
 */
const tieneRole = (...roles) => {

  return (req = request, res = response, next) => {
    if (!req.usuario) {
      return res.status(500).json({
        msg: "Se quiere verificar el role sin validar el token primero",
      });
    }

    if (!roles.includes(req.usuario.rol)) {
      return res.status(401).json({
        msg: `El servicio requiere uno de estos roles ${roles}`,
      });
    }

    next();
  };
};

export { esAdminRole, tieneRole };