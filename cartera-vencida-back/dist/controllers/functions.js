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
exports.filtrarContribuyentesTransformados = exports.actualizarRegistrosNotificacionesTres = exports.actualizarRegistrosPagadosHistoricos = exports.obtenerRegistrosNoPagadosNoHistoricos = exports.crearYEnviarHistorico = exports.obtenerSiguienteNumeroReporte = exports.filtrarYTransformarContribuyentesP = exports.filtrarYTransformarContribuyentes = exports.transformarContribuyenteP = exports.transformarContribuyente = exports.transformarFecha = exports.getCurrentDateTime = exports.cleanString = exports.leerYParsearXMLP = exports.leerYParsearXML = void 0;
const fs_1 = __importDefault(require("fs"));
const xml2js_1 = require("xml2js");
const axios_1 = __importDefault(require("axios"));
let listaGuardada = [];
// Función para leer y parsear el archivo XML
const leerYParsearXML = (filePath) => {
    return new Promise((resolve, reject) => {
        const xmlData = fs_1.default.readFileSync(filePath, 'utf-8');
        (0, xml2js_1.parseString)(xmlData, { explicitArray: false }, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
};
exports.leerYParsearXML = leerYParsearXML;
// Función para leer y parsear el archivo XML puestos
const leerYParsearXMLP = (filePath) => {
    return new Promise((resolve, reject) => {
        const xmlData = fs_1.default.readFileSync(filePath, 'utf-8');
        (0, xml2js_1.parseString)(xmlData, { explicitArray: false }, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
};
exports.leerYParsearXMLP = leerYParsearXMLP;
// Función para limpiar cadenas
const cleanString = (str) => {
    return str.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').replace(/\s+/g, ' ').trim();
};
exports.cleanString = cleanString;
// Función para obtener la fecha y hora actuales
const getCurrentDateTime = () => {
    return new Date().toLocaleDateString();
};
exports.getCurrentDateTime = getCurrentDateTime;
// Función para transformar la fecha
const transformarFecha = (fecha) => {
    const [month, day, year] = fecha.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};
exports.transformarFecha = transformarFecha;
// Función para transformar contribuyente
const transformarContribuyente = (contribuyente, nave) => {
    return {
        ciu: contribuyente.GEN01CODI,
        bodega: contribuyente.NUMBODEGA ? contribuyente.NUMBODEGA : 'Cubiculo',
        nave: (0, exports.cleanString)(nave),
        seccion: contribuyente.ACTIVIDAD ? contribuyente.ACTIVIDAD : 'Cubiculo',
        fecha: (0, exports.transformarFecha)((0, exports.getCurrentDateTime)()),
        valor: contribuyente.VALOR,
        meses: contribuyente.MESES
    };
};
exports.transformarContribuyente = transformarContribuyente;
//Funcion para transformar contribuente Puestos
const transformarContribuyenteP = (contribuyente, nave) => {
    const puesto = contribuyente.TITU && contribuyente.TITU.trim() ? contribuyente.TITU : 'Cubiculo';
    console.log('Puesto:', puesto); // Verifica el valor de puesto
    return {
        ciu: contribuyente.REN57PCIUINQUILINO,
        puesto: puesto,
        nave: (0, exports.cleanString)(nave),
        seccion: contribuyente.REN57CARA01 ? contribuyente.REN57CARA01 : 'Cubiculo',
        fecha: (0, exports.transformarFecha)((0, exports.getCurrentDateTime)()),
        valor: contribuyente.TOTAL,
        meses: contribuyente.MESES
    };
};
exports.transformarContribuyenteP = transformarContribuyenteP;
// Función para filtrar y transformar contribuyentes
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
                                    contribuyentesTransformados.push((0, exports.transformarContribuyente)(contribuyente, nave));
                                }
                            }
                        }
                        else if (contribuyentes) {
                            if (Number(contribuyentes.MESES) > 3) {
                                contribuyentesTransformados.push((0, exports.transformarContribuyente)(contribuyentes, nave));
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
                            contribuyentesTransformados.push((0, exports.transformarContribuyente)(contribuyente, nave));
                        }
                    }
                }
                else if (contribuyentes) {
                    if (Number(contribuyentes.MESES) > 3) {
                        contribuyentesTransformados.push((0, exports.transformarContribuyente)(contribuyentes, nave));
                    }
                }
            }
        }
        else if (typeof obj[key] === 'object') {
            contribuyentesTransformados.push(...(0, exports.filtrarYTransformarContribuyentes)(obj[key]));
        }
    }
    return contribuyentesTransformados;
};
exports.filtrarYTransformarContribuyentes = filtrarYTransformarContribuyentes;
//Funcion
const filtrarYTransformarContribuyentesP = (obj) => {
    const contribuyentesTransformados = [];
    for (const key in obj) {
        if (key.startsWith('LIST')) {
            const list = obj[key].G_NAVES;
            if (Array.isArray(list)) {
                for (const gNaves of list) {
                    if (gNaves.NAVES && gNaves.NAVES.trim() !== '') {
                        const nave = gNaves.NAVES;
                        const contribuyentes = gNaves.LIST_G_CONTRIBUYENTE.G_CONTRIBUYENTE;
                        if (Array.isArray(contribuyentes)) {
                            for (const contribuyente of contribuyentes) {
                                if (Number(contribuyente.MESES) > 3) {
                                    contribuyentesTransformados.push((0, exports.transformarContribuyenteP)(contribuyente, nave));
                                }
                            }
                        }
                        else if (contribuyentes) {
                            if (Number(contribuyentes.MESES) > 3) {
                                contribuyentesTransformados.push((0, exports.transformarContribuyenteP)(contribuyentes, nave));
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
                            contribuyentesTransformados.push((0, exports.transformarContribuyenteP)(contribuyente, nave));
                        }
                    }
                }
                else if (contribuyentes) {
                    if (Number(contribuyentes.MESES) > 3) {
                        contribuyentesTransformados.push((0, exports.transformarContribuyenteP)(contribuyentes, nave));
                    }
                }
            }
        }
        else if (typeof obj[key] === 'object') {
            contribuyentesTransformados.push(...(0, exports.filtrarYTransformarContribuyentesP)(obj[key]));
        }
    }
    return contribuyentesTransformados;
};
exports.filtrarYTransformarContribuyentesP = filtrarYTransformarContribuyentesP;
// Función para obtener el siguiente número de reporte
const obtenerSiguienteNumeroReporte = () => __awaiter(void 0, void 0, void 0, function* () {
    const numeroReporteResponse = yield axios_1.default.get('http://localhost:3001/api/numeroreporte');
    return numeroReporteResponse.data.siguienteNumeroReporte;
});
exports.obtenerSiguienteNumeroReporte = obtenerSiguienteNumeroReporte;
// Función para crear y enviar un nuevo histórico
const crearYEnviarHistorico = (contribuyente, contador) => __awaiter(void 0, void 0, void 0, function* () {
    let cantNotificaciones = 1;
    const actividadTransformada = contribuyente.seccion.includes('�') ? contribuyente.seccion.replace(/�/g, 'Ñ') : contribuyente.seccion;
    if (listaGuardada.length != 0) {
        // Verificar si el contribuyente está en la lista guardada
        const registroExistente = listaGuardada.find((registro) => registro.ciu == contribuyente.ciu &&
            (registro.bodega == contribuyente.bodega ||
                registro.puesto == contribuyente.puesto) &&
            registro.nave == contribuyente.nave &&
            registro.seccion == actividadTransformada);
        // Ajustar cantNotificaciones
        cantNotificaciones = registroExistente ? registroExistente.cantNotificaciones + 1 : 1;
        if (cantNotificaciones > 3) {
            (0, exports.actualizarRegistrosNotificacionesTres)([registroExistente]);
        }
    }
    if (cantNotificaciones <= 3) {
        const nuevoHistorico = {
            ciu: contribuyente.ciu,
            numero_reporte: contador,
            bodega: contribuyente.bodega ? contribuyente.bodega : null,
            puesto: contribuyente.puesto ? contribuyente.puesto : null,
            nave: contribuyente.nave,
            seccion: actividadTransformada,
            fecha: (0, exports.transformarFecha)((0, exports.getCurrentDateTime)()),
            meses: parseInt(contribuyente.meses),
            cantNotificaciones: cantNotificaciones,
            archivo: null,
            valor: parseFloat(contribuyente.valor),
            pagado: 'NO',
            esHistorico: 'NO'
        };
        yield axios_1.default.post('http://localhost:3001/api/', nuevoHistorico);
        return nuevoHistorico;
    }
    else {
        return null;
    }
});
exports.crearYEnviarHistorico = crearYEnviarHistorico;
// Función para obtener registros con pagado NO y esHistorico NO
const obtenerRegistrosNoPagadosNoHistoricos = (tipo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const endpoint = tipo === 'puestos' ? 'http://localhost:3001/api/puesto/pagados' : 'http://localhost:3001/api/bodega/pagados';
        const response = yield axios_1.default.get(endpoint);
        // Verificar si hay datos
        if (!response.data) {
            console.warn('No se encontraron registros en la base de datos.');
            return [];
        }
        listaGuardada = response.data;
        return response.data;
    }
    catch (error) {
        console.error('Error al obtener registros:', error);
        return [];
    }
});
exports.obtenerRegistrosNoPagadosNoHistoricos = obtenerRegistrosNoPagadosNoHistoricos;
// Función para actualizar registros a pagado SI y esHistorico SI
const actualizarRegistrosPagadosHistoricos = (registros) => __awaiter(void 0, void 0, void 0, function* () {
    if (registros.length === 0) {
        console.warn('No hay registros para actualizar.');
        return;
    }
    try {
        for (const registro of registros) {
            yield axios_1.default.put(`http://localhost:3001/api/${registro.id}`, {
                pagado: 'SI',
                esHistorico: 'SI'
            });
        }
    }
    catch (error) {
        console.error('Error al actualizar registros:', error);
        throw error; // Lanza el error para manejarlo en el lugar donde se llama a esta función
    }
});
exports.actualizarRegistrosPagadosHistoricos = actualizarRegistrosPagadosHistoricos;
// Función para actualizar registros a esHistorico SI cuando cantNotificaciones es 3
const actualizarRegistrosNotificacionesTres = (registros) => __awaiter(void 0, void 0, void 0, function* () {
    if (registros.length === 0) {
        console.warn('No hay registros con cantNotificaciones igual a 3 para actualizar.');
        return;
    }
    for (const registro of registros) {
        try {
            const response = yield axios_1.default.get(`http://localhost:3001/api/relacionados/${registro.id}`);
            if (Array.isArray(response.data) && response.data.length > 0) {
                for (const respuesta of response.data) {
                    yield axios_1.default.put(`http://localhost:3001/api/${respuesta.id}`, {
                        pagado: 'NO',
                        esHistorico: 'SI'
                    });
                }
            }
            else {
                console.warn(`No se encontraron historicos asociados para el registro con id ${registro.id}`);
            }
        }
        catch (error) {
            console.error(`Error al obtener los datos relacionados para el registro con id ${registro.id}:`, error);
            throw error;
        }
    }
});
exports.actualizarRegistrosNotificacionesTres = actualizarRegistrosNotificacionesTres;
// Función para filtrar contribuyentes transformados
const filtrarContribuyentesTransformados = (contribuyentesTransformados, tipo) => __awaiter(void 0, void 0, void 0, function* () {
    const registrosNoPagadosNoHistoricos = yield (0, exports.obtenerRegistrosNoPagadosNoHistoricos)(tipo);
    const registrosPagados = [];
    const registrosNotificacionesTres = [];
    // Copia de los contribuyentes transformados para eliminar los que cumplan la condición
    let contribuyentesRestantes = [...contribuyentesTransformados];
    // Filtra los contribuyentes transformados
    const contribuyentesFiltrados = contribuyentesTransformados.filter((contribuyente) => {
        const existeEnBaseDatos = registrosNoPagadosNoHistoricos.find((registro) => registro.ciu == contribuyente.ciu &&
            registro.nave == contribuyente.nave &&
            registro.seccion == contribuyente.seccion &&
            ((registro.puesto == contribuyente.puesto) ||
                (registro.bodega == contribuyente.bodega)));
        if (!existeEnBaseDatos) {
            return true;
        }
        else {
            if (existeEnBaseDatos.cantNotificaciones == 3) {
                registrosNotificacionesTres.push(existeEnBaseDatos);
            }
            return false;
        }
    });
    // Agregar registros que existen en la base de datos pero no en contribuyentesTransformados
    registrosNoPagadosNoHistoricos.forEach((registro) => {
        const existeEnTransformados = contribuyentesTransformados.find((contribuyente) => registro.ciu == contribuyente.ciu &&
            registro.nave == contribuyente.nave &&
            registro.seccion == contribuyente.seccion &&
            ((registro.puesto == contribuyente.puesto) ||
                (registro.bodega == contribuyente.bodega)));
        if (!existeEnTransformados) {
            registrosPagados.push(registro);
        }
    });
    // Eliminar de contribuyentesRestantes los que están en registrosPagados y registrosNotificacionesTres
    contribuyentesRestantes = contribuyentesRestantes.filter((contribuyente) => {
        const noEnPagados = !registrosPagados.find((registro) => registro.ciu == contribuyente.ciu &&
            registro.nave == contribuyente.nave &&
            registro.seccion == contribuyente.seccion &&
            ((registro.puesto == contribuyente.puesto) ||
                (registro.bodega == contribuyente.bodega)));
        const noEnNotificacionesTres = !registrosNotificacionesTres.find((registro) => registro.ciu == contribuyente.ciu &&
            registro.nave == contribuyente.nave &&
            registro.seccion == contribuyente.seccion &&
            ((registro.puesto == contribuyente.puesto) ||
                (registro.bodega == contribuyente.bodega)));
        return noEnPagados && noEnNotificacionesTres;
    });
    yield (0, exports.actualizarRegistrosPagadosHistoricos)(registrosPagados);
    yield (0, exports.actualizarRegistrosNotificacionesTres)(registrosNotificacionesTres);
    return contribuyentesRestantes;
});
exports.filtrarContribuyentesTransformados = filtrarContribuyentesTransformados;
