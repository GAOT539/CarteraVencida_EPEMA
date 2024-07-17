import { Router } from 'express';
import {  carteraVencidaBodegas, carteraVencidaPuestos, leerXMLBodegas, uploadFile } from '../controllers/files.controller';

const router = Router();
router.post('/', uploadFile, leerXMLBodegas);
router.post('/bodegas/contribuyentes', uploadFile, carteraVencidaBodegas);
router.post('/puestos/contribuyentes', uploadFile, carteraVencidaPuestos);

export default router;