import { Router } from 'express';
import {  carteraVencidaBodegas, carteraVencidaPuestos, leerXMLBodegas, notificarPrimeraBodegas, notificarPrimeraPuestos, uploadFile } from '../controllers/files.controller';

const router = Router();
router.post('/', uploadFile, leerXMLBodegas);
router.post('/bodegas/contribuyentes', uploadFile, carteraVencidaBodegas);
router.post('/puestos/contribuyentes', uploadFile, carteraVencidaPuestos);
router.get('/bodegas/primera', notificarPrimeraBodegas);
router.get('/puestos/primera', notificarPrimeraPuestos);

export default router;