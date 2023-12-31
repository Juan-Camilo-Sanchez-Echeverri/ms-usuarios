import { Schema, model } from 'mongoose';

const UsuarioSchema = Schema({
	nombre: {
		type: String,
		required: [true, 'El nombre es necesario'],
	},

	correo: {
		type: String,
		required: [true, 'El correo es necesario'],
		unique: true,
	},

	password: {
		type: String,
		required: [true, 'El password es necesario'],
	},

	img: {
		type: String,
	},

	rol: {
		type: String,
		required: true,
		enum: ['ADMIN_ROLE', 'USER_ROLE'],
	},

	estado: {
		type: Boolean,
		default: true,
	},

	google: {
		type: Boolean,
		default: false,
	},
});

UsuarioSchema.methods.toJSON = function () {
	const { __v, password, _id, ...usuario } = this.toObject();
	usuario.uid = _id;
	return usuario;
};

export default model('Usuario', UsuarioSchema);
