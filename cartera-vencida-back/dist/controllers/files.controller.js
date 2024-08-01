"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verPDFHistorico = exports.actualizarPDFHistorico = exports.notificarPrimeraPuestos = exports.notificarPrimeraBodegas = exports.carteraVencidaPuestos = exports.carteraVencidaBodegas = exports.leerXMLBodegas = exports.uploadFile = void 0;
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const contributors_models_1 = __importDefault(require("../models/contributors.models"));
const historical_models_1 = __importDefault(require("../models/historical.models"));
const sequelize_1 = require("sequelize");
const path_1 = __importDefault(require("path"));
const functions_1 = require("./functions");
// Configuración de multer para manejar archivos
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Carpeta donde se guardarán los archivos
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Nombre del archivo en el servidor
    }
});
const upload = (0, multer_1.default)({ storage });
// Middleware para manejar la carga de archivos
exports.uploadFile = upload.single('xml'); // Nombre del campo en el formulario HTML
// Método para leer y devolver el contenido del archivo XML como texto
const leerXMLBodegas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    if (!file) {
        return res.status(400).json({
            msg: 'No se ha proporcionado ningún archivo'
        });
    }
    // Leer el archivo XML
    try {
        const xmlData = fs_1.default.readFileSync(file.path, 'utf-8');
        // Devolver el contenido del XML como texto
        res.type('text/xml').send(xmlData);
    }
    catch (error) {
        console.error('Error al leer el archivo XML:', error);
        return res.status(500).json({
            msg: 'Error al leer el archivo XML',
            error: "error.message"
        });
    }
});
exports.leerXMLBodegas = leerXMLBodegas;
// Método para obtener todos los registros con cartera vencida de bodegas
const carteraVencidaBodegas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let listaIngresados = [];
    let contador = 0;
    const file = req.file;
    if (!file) {
        return res.status(400).json({
            msg: 'No se ha proporcionado ningún archivo'
        });
    }
    try {
        const result = yield (0, functions_1.leerYParsearXML)(file.path);
        let contribuyentesTransformados = (0, functions_1.filtrarYTransformarContribuyentes)(result.CARTERANOMBRESBODE);
        contribuyentesTransformados = yield (0, functions_1.filtrarContribuyentesTransformados)(contribuyentesTransformados, 'bodegas');
        // Obtener el siguiente número de reporte
        contador = yield (0, functions_1.obtenerSiguienteNumeroReporte)();
        // Recorrer los contribuyentes transformados y hacer la solicitud POST
        for (const contribuyente of contribuyentesTransformados) {
            listaIngresados.push(yield (0, functions_1.crearYEnviarHistorico)(contribuyente, contador));
            contador++;
        }
        res.json({
            listaIngresados
        });
    }
    catch (error) {
        console.error('Error al procesar el archivo:', error);
        return res.status(500).json({
            msg: 'Error al procesar el archivo',
            error: error
        });
    }
});
exports.carteraVencidaBodegas = carteraVencidaBodegas;
// Método para obtener todos los registros con cartera vencida de puestos
const carteraVencidaPuestos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let listaIngresados = [];
    const file = req.file;
    let contador = 0;
    if (!file) {
        return res.status(400).json({
            msg: 'No se ha proporcionado ningún archivo'
        });
    }
    try {
        const result = yield (0, functions_1.leerYParsearXMLP)(file.path);
        let contribuyentesTransformados = (0, functions_1.filtrarYTransformarContribuyentesP)(result.CARTERANOMBRESPUESTOS);
        console.log("Puestos Transformados");
        console.log(contribuyentesTransformados);
        contribuyentesTransformados = yield (0, functions_1.filtrarContribuyentesTransformados)(contribuyentesTransformados, 'puestos');
        console.log("Puestos Filtrados");
        console.log(contribuyentesTransformados);
        // Obtener el siguiente número de reporte
        contador = yield (0, functions_1.obtenerSiguienteNumeroReporte)();
        // Recorrer los contribuyentes transformados y hacer la solicitud POST
        for (const contribuyente of contribuyentesTransformados) {
            console.log("XD");
            listaIngresados.push(yield (0, functions_1.crearYEnviarHistorico)(contribuyente, contador));
            contador++;
        }
        res.json({
            listaIngresados
        });
    }
    catch (error) {
        console.error('Error al procesar el archivo:', error);
        return res.status(500).json({
            msg: 'Error al procesar el archivo',
            error: error
        });
    }
});
exports.carteraVencidaPuestos = carteraVencidaPuestos;
const notificarPrimeraBodegas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtener los historicos de bodegas con cantNotificaciones igual a 0
        const historicosList = yield historical_models_1.default.findAll({
            where: {
                cantNotificaciones: 0,
                bodega: { [sequelize_1.Op.ne]: null } // Asegúrate de filtrar solo los historicos de bodegas
            },
        });
        if (historicosList.length === 0) {
            return res.status(404).json({
                msg: 'No se encontraron historicos con cantNotificaciones igual a 0 en bodegas',
            });
        }
        const ids = historicosList.map(historico => historico.get('id'));
        yield historical_models_1.default.update({ cantNotificaciones: 1 }, {
            where: {
                id: ids,
            },
        });
        const historicosWithContribuyentes = yield Promise.all(historicosList.map((historico) => __awaiter(void 0, void 0, void 0, function* () {
            const historicoData = historico.get({ plain: true });
            const contribuyente = yield contributors_models_1.default.findOne({
                where: { ciu: historicoData.ciu },
            });
            return Object.assign(Object.assign({}, historicoData), { nombre: contribuyente ? contribuyente.get('nombre') : 'Desconocido', cedula: contribuyente ? contribuyente.get('cedula') : 'Desconocido', cantNotificaciones: 1 });
        })));
        res.json(historicosWithContribuyentes);
    }
    catch (error) {
        console.error('Error en notificarPrimeraBodegas:', error);
        return res.status(500).json({
            msg: 'Error al procesar la solicitud',
            error: error,
        });
    }
});
exports.notificarPrimeraBodegas = notificarPrimeraBodegas;
const notificarPrimeraPuestos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtener los historicos de puestos con cantNotificaciones igual a 0
        const historicosList = yield historical_models_1.default.findAll({
            where: {
                cantNotificaciones: 0,
                puesto: { [sequelize_1.Op.ne]: null } // Asegúrate de filtrar solo los historicos de puestos
            },
        });
        if (historicosList.length === 0) {
            return res.status(404).json({
                msg: 'No se encontraron historicos con cantNotificaciones igual a 0 en puestos',
            });
        }
        const ids = historicosList.map(historico => historico.get('id'));
        yield historical_models_1.default.update({ cantNotificaciones: 1 }, {
            where: {
                id: ids,
            },
        });
        const historicosWithContribuyentes = yield Promise.all(historicosList.map((historico) => __awaiter(void 0, void 0, void 0, function* () {
            const historicoData = historico.get({ plain: true });
            const contribuyente = yield contributors_models_1.default.findOne({
                where: { ciu: historicoData.ciu },
            });
            return Object.assign(Object.assign({}, historicoData), { nombre: contribuyente ? contribuyente.get('nombre') : 'Desconocido', cedula: contribuyente ? contribuyente.get('cedula') : 'Desconocido', cantNotificaciones: 1 });
        })));
        res.json(historicosWithContribuyentes);
    }
    catch (error) {
        console.error('Error en notificarPrimeraPuestos:', error);
        return res.status(500).json({
            msg: 'Error al procesar la solicitud',
            error: error,
        });
    }
});
exports.notificarPrimeraPuestos = notificarPrimeraPuestos;
// Método para actualizar el archivo PDF de un histórico
const actualizarPDFHistorico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const file = req.file;
    if (!file) {
        return res.status(400).json({
            msg: 'No se ha proporcionado ningún archivo'
        });
    }
    try {
        // Verificar si el historial existe
        const historico = yield historical_models_1.default.findByPk(id);
        if (!historico) {
            return res.status(404).json({
                msg: 'Histórico no encontrado'
            });
        }
        // Obtener el nombre original del archivo
        const originalName = file.originalname;
        // Crear la ruta completa para guardar el archivo
        const filePath = path_1.default.join('C:/Historicos', originalName);
        // Guardar el archivo en el sistema de archivos
        fs_1.default.writeFileSync(filePath, file.buffer);
        // Actualizar la base de datos con la URL del archivo (puedes guardar solo el nombre si no necesitas la ruta completa)
        yield historical_models_1.default.update({ archivo: filePath }, // Guarda solo el nombre del archivo en la base de datos
        {
            where: {
                id: id,
            },
        });
        // Responder con éxito
        return res.status(200).json({
            msg: 'Archivo PDF actualizado exitosamente',
            filePath: filePath // Opcional: Devuelve la ruta donde se guardó el archivo
        });
    }
    catch (error) {
        console.error('Error al actualizar el archivo PDF:', error);
        return res.status(500).json({
            msg: 'Error al actualizar el archivo PDF',
            error: error
        });
    }
});
exports.actualizarPDFHistorico = actualizarPDFHistorico;
const verPDFHistorico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filename } = req.body; // Obtener el nombre del archivo del cuerpo de la solicitud
    if (!filename) {
        return res.status(400).send('Nombre del archivo no proporcionado');
    }
    // Normalizar el nombre del archivo para evitar problemas de ruta
    const sanitizedFilename = path_1.default.basename(filename);
    // Construir la ruta del archivo en el servidor
    const filePath = path_1.default.join('C:/Historicos', sanitizedFilename);
    fs_1.default.access(filePath, fs_1.default.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).send('Archivo no encontrado');
        }
        // Configurar el encabezado de respuesta para el tipo de archivo PDF
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `inline; filename="${sanitizedFilename}"`);
        res.sendFile(filePath, (err) => {
            if (err) {
                res.status(500).send('Error al enviar el archivo');
            }
        });
    });
});
exports.verPDFHistorico = verPDFHistorico;
