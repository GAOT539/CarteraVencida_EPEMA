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
exports.leerXMLBodegas = exports.uploadFile = void 0;
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
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
