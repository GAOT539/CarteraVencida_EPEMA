"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const files_controller_1 = require("../controllers/files.controller");
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
const router = (0, express_1.Router)();
router.post('/', files_controller_1.uploadFile, files_controller_1.leerXMLBodegas);
router.post('/bodegas/contribuyentes', files_controller_1.uploadFile, files_controller_1.carteraVencidaBodegas);
router.post('/puestos/contribuyentes', files_controller_1.uploadFile, files_controller_1.carteraVencidaPuestos);
router.get('/bodegas/primera', files_controller_1.notificarPrimeraBodegas);
router.get('/puestos/primera', files_controller_1.notificarPrimeraPuestos);
router.post('/historicos/subir/:id', upload.single('file'), files_controller_1.actualizarPDFHistorico);
router.post('/historicos/ver-pdf', files_controller_1.verPDFHistorico);
exports.default = router;
