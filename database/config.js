import mongoose from 'mongoose';

const dbConection = async () => {

	try {

		await mongoose.connect(process.env.MONGODB_URL);

		console.log('Conexion Exitosa');

	} catch (error) {

		throw new Error('Error a la hora de iniciar la base de datos');
		
	}
};

export { dbConection };
