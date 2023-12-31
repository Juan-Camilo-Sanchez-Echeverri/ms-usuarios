import Role from '../models/role.js';
import { Usuario, Producto, Categoria } from '../models/index.js'

const esRoleValido = async (rol = '') => {

	const existeRol = await Role.findOne({ rol });

	if (!existeRol) throw new Error(`El rol ${rol} no está registrado en la BD`);

};

const emailExiste = async (correo = '') => {

	const existeEmail = await Usuario.findOne({ correo });

	if (existeEmail) throw new Error(`El correo: ${correo}, ya está registrado`);

};

const existeUsuarioPorId = async (id) => {

	const existeUsuario = await Usuario.findById(id);

	if (!existeUsuario) {
		throw new Error(`El id : ${id} no existe en la BD`);
	}
};

const existeCategoriaPorId = async (id) => {

	const existeCategoria = await Categoria.findById(id);

	if (!existeCategoria) {
		throw new Error(`El id : ${id} no existe en la BD`);
	}
}

const existeProductoPorId = async (id) => {

	const existeProducto = await Producto.findById(id);

	if (!existeProducto) {
		throw new Error(`El id : ${id} no existe en la BD`);
	}
}

export { esRoleValido, emailExiste, existeUsuarioPorId, existeCategoriaPorId, existeProductoPorId };
