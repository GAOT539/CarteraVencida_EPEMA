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
exports.carteraVencidaPuestos = exports.carteraVencidaBodegas = exports.leerXMLBodegas = exports.uploadFile = void 0;
const xml2js_1 = require("xml2js");
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
// Método para obtener todos los registros con cartera vencida de bodegas
const carteraVencidaBodegas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    if (!file) {
        return res.status(400).json({
            msg: 'No se ha proporcionado ningún archivo'
        });
    }
    try {
        const xmlData = fs_1.default.readFileSync(file.path, 'utf-8');
        (0, xml2js_1.parseString)(xmlData, { explicitArray: false }, (err, result) => {
            if (err) {
                console.error('Error al parsear el archivo XML:', err);
                return res.status(500).json({
                    msg: 'Error al parsear el archivo XML',
                    error: err.message
                });
            }
            const cleanString = (str) => {
                return str.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').replace(/\s+/g, ' ').trim();
            };
            const getCurrentDateTime = () => {
                const now = new Date();
                return now.toLocaleDateString();
            };
            const transformarContribuyente = (contribuyente, nave) => ({
                ciu: contribuyente.GEN01CODI,
                bodega: contribuyente.NUMBODEGA ? contribuyente.NUMBODEGA : 'Cubiculo',
                nave: cleanString(nave),
                seccion: contribuyente.ACTIVIDAD ? contribuyente.ACTIVIDAD : 'Cubiculo',
                fecha: getCurrentDateTime(),
                valor: contribuyente.VALOR
            });
            const filtrarYTransformarContribuyentes = (obj) => {
                const contribuyentesTransformados = [];
                for (const key in obj) {
                    if (key.startsWith('LIST')) {
                        const list = obj[key].G_NAVE;
                        if (Array.isArray(list)) {
                            for (const gNave of list) {
                                if (gNave.NAVE && gNave.NAVE.trim() !== '') {
                                    const nave = gNave.NAVE;
                                    const contribuyentes = gNave.LIST_G_CONTRIBUYENTE.G_CONTRIBUYENTE;
                                    if (Array.isArray(contribuyentes)) {
                                        for (const contribuyente of contribuyentes) {
                                            if (Number(contribuyente.MESES) > 3) {
                                                contribuyentesTransformados.push(transformarContribuyente(contribuyente, nave));
                                            }
                                        }
                                    }
                                    else if (contribuyentes) {
                                        if (Number(contribuyentes.MESES) > 3) {
                                            contribuyentesTransformados.push(transformarContribuyente(contribuyentes, nave));
                                        }
                                    }
                                }
                            }
                        }
                        else if (list && list.NAVE && list.NAVE.trim() !== '') {
                            const nave = list.NAVE;
                            const contribuyentes = list.LIST_G_CONTRIBUYENTE.G_CONTRIBUYENTE;
                            if (Array.isArray(contribuyentes)) {
                                for (const contribuyente of contribuyentes) {
                                    if (Number(contribuyente.MESES) > 3) {
                                        contribuyentesTransformados.push(transformarContribuyente(contribuyente, nave));
                                    }
                                }
                            }
                            else if (contribuyentes) {
                                if (Number(contribuyentes.MESES) > 3) {
                                    contribuyentesTransformados.push(transformarContribuyente(contribuyentes, nave));
                                }
                            }
                        }
                    }
                    else if (typeof obj[key] === 'object') {
                        contribuyentesTransformados.push(...filtrarYTransformarContribuyentes(obj[key]));
                    }
                }
                return contribuyentesTransformados;
            };
            const contribuyentesTransformados = filtrarYTransformarContribuyentes(result.CARTERANOMBRESBODE);
            res.json(contribuyentesTransformados);
        });
    }
    catch (error) {
        console.error('Error al leer el archivo XML:', error);
        return res.status(500).json({
            msg: 'Error al leer el archivo XML',
            error: error
        });
    }
});
exports.carteraVencidaBodegas = carteraVencidaBodegas;
// Método para obtener todos los registros con cartera vencida de puestos
const carteraVencidaPuestos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    if (!file) {
        return res.status(400).json({
            msg: 'No se ha proporcionado ningún archivo'
        });
    }
    try {
        const xmlData = fs_1.default.readFileSync(file.path, 'utf-8');
        (0, xml2js_1.parseString)(xmlData, { explicitArray: false }, (err, result) => {
            if (err) {
                console.error('Error al parsear el archivo XML:', err);
                return res.status(500).json({
                    msg: 'Error al parsear el archivo XML',
                    error: err.message
                });
            }
            const cleanString = (str) => {
                return str.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').replace(/\s+/g, ' ').trim();
            };
            const getCurrentDateTime = () => {
                const now = new Date();
                return now.toLocaleDateString();
            };
            const transformarContribuyente = (contribuyente, nave) => ({
                ciu: contribuyente.REN57PCIUINQUILINO,
                puesto: contribuyente.TITU ? contribuyente.TITU : 'Cubiculo',
                nave: cleanString(nave),
                seccion: contribuyente.REN57CARA01 ? contribuyente.REN57CARA01 : 'Cubiculo',
                fecha: getCurrentDateTime(),
                valor: contribuyente.TOTAL
            });
            const filtrarYTransformarContribuyentes = (obj) => {
                const contribuyentesTransformados = [];
                for (const key in obj) {
                    if (key.startsWith('LIST')) { // Verificar si la clave empieza con 'LIST'
                        const list = obj[key].G_NAVES;
                        if (Array.isArray(list)) {
                            for (const gNaves of list) {
                                if (gNaves.NAVES && gNaves.NAVES.trim() !== '') { // Verificar si NAVES no está vacío
                                    const nave = gNaves.NAVES;
                                    const contribuyentes = gNaves.LIST_G_CONTRIBUYENTE.G_CONTRIBUYENTE;
                                    if (Array.isArray(contribuyentes)) {
                                        for (const contribuyente of contribuyentes) {
                                            if (Number(contribuyente.MESES) > 3) { // Filtrar por MESES > 3
                                                contribuyentesTransformados.push(transformarContribuyente(contribuyente, nave));
                                            }
                                        }
                                    }
                                    else if (contribuyentes) {
                                        if (Number(contribuyentes.MESES) > 3) { // Filtrar por MESES > 3
                                            contribuyentesTransformados.push(transformarContribuyente(contribuyentes, nave));
                                        }
                                    }
                                }
                            }
                        }
                        else if (list && list.NAVES && list.NAVES.trim() !== '') {
                            const nave = list.NAVES;
                            const contribuyentes = list.LIST_G_CONTRIBUYENTE.G_CONTRIBUYENTE;
                            if (Array.isArray(contribuyentes)) {
                                for (const contribuyente of contribuyentes) {
                                    if (Number(contribuyente.MESES) > 3) {
                                        contribuyentesTransformados.push(transformarContribuyente(contribuyente, nave));
                                    }
                                }
                            }
                            else if (contribuyentes) {
                                if (Number(contribuyentes.MESES) > 3) {
                                    contribuyentesTransformados.push(transformarContribuyente(contribuyentes, nave));
                                }
                            }
                        }
                    }
                    else if (typeof obj[key] === 'object') {
                        contribuyentesTransformados.push(...filtrarYTransformarContribuyentes(obj[key]));
                    }
                }
                return contribuyentesTransformados;
            };
            // Filtrar y transformar G_CONTRIBUYENTE de todos los G_NAVES
            const contribuyentesTransformados = filtrarYTransformarContribuyentes(result.CARTERANOMBRESPUESTOS);
            // Devolver los contribuyentes transformados en formato JSON
            res.json(contribuyentesTransformados);
        });
    }
    catch (error) {
        console.error('Error al leer el archivo XML:', error);
        return res.status(500).json({
            msg: 'Error al leer el archivo XML',
            error: error
        });
    }
});
exports.carteraVencidaPuestos = carteraVencidaPuestos;
