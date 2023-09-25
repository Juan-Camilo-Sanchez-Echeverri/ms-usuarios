import { request, response } from 'express';
import bcryptjs from 'bcryptjs';
import Usuario from '../models/usuario.js';
import { generarJWT } from '../helpers/generar-jwt.js';

const login = async (req = request, res = response) => {
	const { correo, password } = req.body;

	try {
		// Verify if the email exists
		const usuario = await Usuario.findOne({ correo });
		if (!usuario) {
			return res.status(400).json({
				msg: 'User / Password are not correct - email',
			});
		}

		// Verify if the user is active
		if (!usuario.estado) {
			return res.status(400).json({
				msg: 'User / Password are not correct - status: false',
			});
		}

		// Verify password
		const validPassword = bcryptjs.compareSync(password, usuario.password);
		if (!validPassword) {
			return res.status(400).json({
				msg: 'User / Password are not correct - password',
			});
		}

		// Generate JWT
		const token = await generarJWT(usuario.id);

		res.json({
			usuario,
			token,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			msg: 'Contact the administrator',
		});
	}
};

export { login };
