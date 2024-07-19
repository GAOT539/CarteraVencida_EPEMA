import { Router } from 'express';
import { deleteHistorico, getHistoricoById, getHistoricos, getHistoricosBodegas, getHistoricosBodegasNoPagado, getHistoricosByCIU, getHistoricosPuestos, getHistoricosPuestosNoPagado, newHistorico, obtenerNumeroReporte, payHistorico, updateHistorico } from '../controllers/historical.controller';

const router = Router();
router.get('/numeroreporte', obtenerNumeroReporte); // Obtener el siguiente número de reporte
router.get('/', getHistoricos); // Obtener todos los registros históricos
router.get('/bodega/', getHistoricosBodegas); // Obtener todos los registros históricos
router.get('/bodega/pagados', getHistoricosBodegasNoPagado); // Obtener todos los registros históricos de bodega no pagados
router.get('/puesto/', getHistoricosPuestos); // Obtener todos los registros históricos
router.get('/puesto/pagados', getHistoricosPuestosNoPagado); // Obtener todos los registros históricos de bodega no pagados
router.get('/:id', getHistoricoById); // Obtener todos los registros históricos por ID
router.get('/ciu/:ciu', getHistoricosByCIU); // Obtener todos los registros históricos por CIU
router.post('/', newHistorico); // Crear un nuevo registro histórico
router.post('/pagado/:id', payHistorico); // Actualizar el campo Pagado del registro histórico por ID
router.put('/:id', updateHistorico); // Actualizar un registro histórico por ID
router.delete('/:id', deleteHistorico); // Eliminar un registro histórico por ID

export default router;
