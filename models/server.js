import express, { static as static_, json } from 'express';
import cors from 'cors';

import { dbConection } from '../database/config.js';

// Change the import syntax to use module
import { authRouter } from '../routes/auth.js';
import { usuariosRouter } from '../routes/usuarios.js';

export class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		this.usuariosPath = '/api/usuarios';
		this.authPath = '/api/auth';

		// Database
		this.conectarDB();
		// Middlewares
		this.middlewares();
		// Routes
		this.routes();
	}

	async conectarDB() {
		await dbConection();
	}

	middlewares() {
		// CORS
		this.app.use(cors());

		// Parse and read body
		this.app.use(json());

		// Public directory
		this.app.use(static_('public'));
	}

	routes() {
		// Use the imported routers
		this.app.use(this.authPath, authRouter);
		this.app.use(this.usuariosPath, usuariosRouter);
	}

	listen() {
		this.app.listen(this.port, () =>
			console.log(`listening on http://localhost:${this.port}`)
		);
	}
}
