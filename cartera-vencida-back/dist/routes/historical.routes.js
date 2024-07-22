"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const historical_controller_1 = require("../controllers/historical.controller");
const router = (0, express_1.Router)();
router.get('/numeroreporte', historical_controller_1.obtenerNumeroReporte); // Obtener el siguiente número de reporte
router.get('/', historical_controller_1.getHistoricos); // Obtener todos los registros históricos
router.get('/bodega/', historical_controller_1.getHistoricosBodegas); // Obtener todos los registros históricos
router.get('/bodega/pagados', historical_controller_1.getHistoricosBodegasNoPagado); // Obtener todos los registros históricos de bodega no pagados
router.get('/puesto/', historical_controller_1.getHistoricosPuestos); // Obtener todos los registros históricos
router.get('/puesto/pagados', historical_controller_1.getHistoricosPuestosNoPagado); // Obtener todos los registros históricos de bodega no pagados
//router.get('/:id', getHistoricoById); // Obtener todos los registros históricos por ID
//router.get('/ciu/:ciu', getHistoricosByCIU); // Obtener todos los registros históricos por CIU
router.post('/', historical_controller_1.newHistorico); // Crear un nuevo registro histórico
router.post('/pagado/:id', historical_controller_1.payHistorico); // Actualizar el campo Pagado del registro histórico por ID
router.put('/:id', historical_controller_1.updateHistorico); // Actualizar un registro histórico por ID
router.delete('/:id', historical_controller_1.deleteHistorico); // Eliminar un registro histórico por ID
router.get('/bodega/nuevos', historical_controller_1.getHistoricosBodegasCero); // Obtener registros históricos bodegas con 0 notificaciones
router.get('/puesto/nuevos', historical_controller_1.getHistoricosPuestosCero); // Obtener registros históricos puestos con 0 notificaciones
exports.default = router;
