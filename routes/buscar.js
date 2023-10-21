import { Router } from 'express'
import { buscar } from '../controllers/index.js'

const router = Router()

router.get('/:coleccion/:termino', buscar)

export { router as buscarRouter }