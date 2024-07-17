import { Router } from 'express';
import { leerXMLBodegas, uploadFile } from '../controllers/files.controller';

const router = Router();
router.post('/', uploadFile, leerXMLBodegas);

export default router;