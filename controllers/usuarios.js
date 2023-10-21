import { response, request } from 'express';
import bcryptjs from 'bcryptjs';

import Usuario from '../models/usuario.js';

const usuariosGet = async (req = request, res = response) => {

	const { limite = 5, desde = 0 } = req.query;
	const activos = { estado: true };
	const noActivos = { estado: false };

	const [totalActivos, totalNoActivos, usuarios] = await Promise.all([
		Usuario.countDocuments(activos),
		Usuario.countDocuments(noActivos),
		Usuario.find(activos).skip(Number(desde)).limit(Number(limite)),
	]);

	res.json({ totalActivos, totalNoActivos, usuarios });

};

const usuariosPost = async (req = request, res = response) => {

	const { nombre, correo, password, rol } = req.body;
	const usuario = new Usuario({ nombre, correo, password, rol });

	// Encriptar la contraseña
	const salt = bcryptjs.genSaltSync();
	usuario.password = bcryptjs.hashSync(password.toString(), salt);

	await usuario.save();

	res.json({ usuario });
};

const usuariosPut = async (req = request, res = response) => {

	const { id } = req.params;
	const { _id, password, google, correo, ...resto } = req.body;

	if (password) {
		const salt = bcryptjs.genSaltSync();
		resto.password = bcryptjs.hashSync(password.toString(), salt);
	}

	const usuario = await Usuario.findByIdAndUpdate(id, resto);

	res.json(usuario);

};

const usuariosPatch = (req = request, res = response) => {
	throw new Error('Controlador no implementado');
};

const usuariosDelete = async (req = request, res = response) => {

	const { id } = req.params;

	//Fisicamente lo borramos
	// const usuario = await Usuario.findByIdAndDelete(id);
	const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });


	res.json(usuario);

};

export {
	usuariosDelete,
	usuariosGet,
	usuariosPatch,
	usuariosPost,
	usuariosPut,
};
