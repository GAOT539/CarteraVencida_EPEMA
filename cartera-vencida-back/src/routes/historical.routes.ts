import { Router } from 'express';
import { deleteHistorico, getHistoricoById, getHistoricos, getHistoricosByCIU, newHistorico, updateHistorico } from '../controllers/historical.controller';

const router = Router();

router.post('/', newHistorico); // Crear un nuevo registro histórico
router.get('/', getHistoricos); // Obtener todos los registros históricos
router.get('/:id', getHistoricoById); // Obtener todos los registros históricos por ID
router.get('/ciu/:ciu', getHistoricosByCIU); // Obtener todos los registros históricos por CIU
router.delete('/:id', deleteHistorico); // Eliminar un registro histórico por ID
router.put('/:id', updateHistorico); // Actualizar un registro histórico por ID

export default router;
