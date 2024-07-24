import { Router } from 'express';
import {  actualizarPDFHistorico, carteraVencidaBodegas, carteraVencidaPuestos, leerXMLBodegas, notificarPrimeraBodegas, notificarPrimeraPuestos, uploadFile, verPDFHistorico } from '../controllers/files.controller';
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const router = Router();
router.post('/', uploadFile, leerXMLBodegas);
router.post('/bodegas/contribuyentes', uploadFile, carteraVencidaBodegas);
router.post('/puestos/contribuyentes', uploadFile, carteraVencidaPuestos);
router.get('/bodegas/primera', notificarPrimeraBodegas);
router.get('/puestos/primera', notificarPrimeraPuestos);

router.post('/historicos/subir/:id', upload.single('file'), actualizarPDFHistorico);
router.post('/historicos/ver-pdf', verPDFHistorico);


export default router;