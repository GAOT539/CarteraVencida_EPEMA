"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const historical_controller_1 = require("../controllers/historical.controller");
const router = (0, express_1.Router)();
router.post('/', historical_controller_1.newHistorico); // Crear un nuevo registro histórico
router.get('/', historical_controller_1.getHistoricos); // Obtener todos los registros históricos
router.get('/bodega/', historical_controller_1.getHistoricosBodegas); // Obtener todos los registros históricos
router.get('/bodega/pagados', historical_controller_1.getHistoricosBodegasNoPagado); // Obtener todos los registros históricos de bodega no pagados
router.get('/puesto/', historical_controller_1.getHistoricosPuestos); // Obtener todos los registros históricos
router.get('/puesto/pagados', historical_controller_1.getHistoricosPuestosNoPagado); // Obtener todos los registros históricos de bodega no pagados
router.get('/:id', historical_controller_1.getHistoricoById); // Obtener todos los registros históricos por ID
router.get('/ciu/:ciu', historical_controller_1.getHistoricosByCIU); // Obtener todos los registros históricos por CIU
router.delete('/:id', historical_controller_1.deleteHistorico); // Eliminar un registro histórico por ID
router.put('/:id', historical_controller_1.updateHistorico); // Actualizar un registro histórico por ID
router.post('/pagado/:id', historical_controller_1.payHistorico); // Actualizar el campo Pagado del registro histórico por ID
exports.default = router;
