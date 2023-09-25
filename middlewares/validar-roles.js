import { request, response } from "express";


/**
 * The function `esAdminRole` checks if the user has an "ADMIN_ROLE" and returns an error message if
 * they don't.
 * @param [req] - The `req` parameter represents the request object, which contains information about
 * the incoming HTTP request such as headers, query parameters, and request body.
 * @param [res] - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to manipulate the response, such as
 * setting the status code, sending JSON data, or redirecting the client to a different URL.
 * @param next - The `next` parameter is a function that is used to pass control to the next middleware
 * function in the request-response cycle. It is typically called at the end of the current middleware
 * function to indicate that it has completed its processing and the next middleware function should be
 * called.
 * @returns In the code snippet, if the `req.usuario` is not defined, a response with status code 500
 * and a JSON object containing the message "Se quiere verificar el role sin validar el token primero"
 * will be returned.
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