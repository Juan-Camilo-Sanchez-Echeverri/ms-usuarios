import express, { static as static_, json } from 'express';
import cors from 'cors';

import { dbConection } from '../database/config.js';

import { authRouter, categoriasRouter, usuariosRouter, productosRouter, buscarRouter } from '../routes/index.js'

export class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;

		this.paths = {
			auth: '/api/auth',
			buscar: '/api/buscar',
			categorias: '/api/categorias',
			productos: '/api/productos',
			usuarios: '/api/usuarios',
		}

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
		this.app.use(this.paths.auth, authRouter);
		this.app.use(this.paths.usuarios, usuariosRouter);
		this.app.use(this.paths.categorias, categoriasRouter);
		this.app.use(this.paths.productos, productosRouter);
		this.app.use(this.paths.buscar, buscarRouter);
	}

	listen() {
		this.app.listen(this.port, () =>
			console.log(`listening on http://localhost:${this.port}`)
		);
	}
}
