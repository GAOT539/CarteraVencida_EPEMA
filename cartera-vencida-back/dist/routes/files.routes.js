"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const files_controller_1 = require("../controllers/files.controller");
const router = (0, express_1.Router)();
router.post('/', files_controller_1.uploadFile, files_controller_1.leerXMLBodegas);
router.post('/bodegas/contribuyentes', files_controller_1.uploadFile, files_controller_1.carteraVencidaBodegas);
router.post('/puestos/contribuyentes', files_controller_1.uploadFile, files_controller_1.carteraVencidaPuestos);
exports.default = router;
