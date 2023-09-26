import { request, response } from 'express';
import bcryptjs from 'bcryptjs';

import Usuario from '../models/usuario.js';

import { generarJWT } from '../helpers/generar-jwt.js';
import { googleVerify } from '../helpers/google-verify.js';

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

const googleSignIn = async (req = request, res = response) => {
	const { id_token } = req.body;

	try {

		const { nombre, img, correo } = await googleVerify(id_token);

		let usuario = await Usuario.findOne({ correo });

		if (!usuario) {
			// Create user
			const data = {
				nombre,
				correo,
				password: ':P',
				img,
				rol: "USER_ROLE",
				google: true,
			};

			usuario = new Usuario(data);
			await usuario.save();
		}

		// If the user is in DB
		if (!usuario.estado) {
			return res.status(401).json({
				msg: 'Contact the administrator, user blocked',
			});
		}

		// Generate JWT
		const token = await generarJWT(usuario.id);


		res.json({
			usuario,
			token,
		});

	} catch (error) {
		res.status(400).json({
			ok: false,
			msg: 'El token no se pudo verificar',
		});
	}

};

export { login, googleSignIn };
