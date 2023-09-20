import { Schema, model } from 'mongoose';

const RoleSchema = new Schema({

	rol: {
		type: String,
		required: [true, 'El rol es obligatorio'],
	},
	
});

export default model('Roles', RoleSchema);
