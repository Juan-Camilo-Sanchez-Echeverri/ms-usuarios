import { Schema, model } from 'mongoose';

const UsuarioSchema = new Schema({

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

	const { __v, password, ...usuario } = this.toObject();

	return usuario;
	
};

export default model('Usuario', UsuarioSchema);
