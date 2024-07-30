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
exports.obtenerNumeroReporte = exports.payHistorico = exports.updateHistorico = exports.deleteHistorico = exports.getHistoricosByCIU = exports.getHistoricoById = exports.getHistoricosPuestosCero = exports.getHistoricosPuestos = exports.getHistoricosPuestosNoPagado = exports.getHistoricosBodegasCero = exports.getHistoricosBodegasNoPagado = exports.getHistoricosBodegas = exports.getHistoricos = exports.newHistorico = void 0;
const historical_models_1 = require("../models/historical.models");
const manage_error_1 = require("../error/manage.error");
const sequelize_1 = require("sequelize");
const contributors_models_1 = __importDefault(require("../models/contributors.models"));
// Crear un nuevo registro histórico
const newHistorico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ciu, numero_reporte, bodega, puesto, nave, seccion, fecha, meses, cantNotificaciones, archivo, valor, pagado } = req.body;
    try {
        const nuevoHistorico = yield historical_models_1.Historicos.create({
            ciu,
            numero_reporte,
            bodega,
            puesto,
            nave,
            seccion,
            fecha,
            meses,
            cantNotificaciones,
            archivo,
            valor,
            pagado
        });
        res.json({
            msg: nuevoHistorico.dataValues.id
        });
    }
    catch (error) {
        res.status(500).json({
            msg: manage_error_1.ErrorMessages.SERVER_ERROR,
            error
        });
    }
});
exports.newHistorico = newHistorico;
// Obtener todos los registros históricos con nombre y cédula de contribuyentes
const getHistoricos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtener todos los registros históricos
        const historicosList = yield historical_models_1.Historicos.findAll();
        // Obtener los datos de contribuyentes asociados a los históricos
        const historicosWithContribuyentes = yield Promise.all(historicosList.map((historico) => __awaiter(void 0, void 0, void 0, function* () {
            const historicoData = historico.get({ plain: true });
            // Buscar el contribuyente asociado al histórico
            const contribuyente = yield contributors_models_1.default.findOne({
                where: { ciu: historicoData.ciu },
            });
            // Devolver el histórico con los datos del contribuyente
            return Object.assign(Object.assign({}, historicoData), { nombre: contribuyente ? contribuyente.get('nombre') : 'Desconocido', cedula: contribuyente ? contribuyente.get('cedula') : 'Desconocido' });
        })));
        // Enviar la respuesta con los históricos y los datos del contribuyente
        res.json({
            historicosList: historicosWithContribuyentes
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: manage_error_1.ErrorMessages.SERVER_ERROR,
            error
        });
    }
});
exports.getHistoricos = getHistoricos;
// Obtener todos los registros históricos donde bodega no es null
const getHistoricosBodegas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const historicosList = yield historical_models_1.Historicos.findAll({
            where: {
                bodega: {
                    [sequelize_1.Op.ne]: null,
                },
            },
        });
        if (historicosList.length === 0) {
            return res.status(404).json({
                msg: 'No se encontraron historicos asociados a bodegas',
            });
        }
        // Obtener datos de contribuyentes
        const historicosWithContribuyentes = yield Promise.all(historicosList.map((historico) => __awaiter(void 0, void 0, void 0, function* () {
            const historicoData = historico.get({ plain: true });
            const contribuyente = yield contributors_models_1.default.findOne({
                where: { ciu: historicoData.ciu },
            });
            return Object.assign(Object.assign({}, historicoData), { nombre: contribuyente ? contribuyente.get('nombre') : 'Desconocido', cedula: contribuyente ? contribuyente.get('cedula') : 'Desconocido' });
        })));
        res.json(historicosWithContribuyentes);
    }
    catch (error) {
        return res.status(500).json({
            msg: manage_error_1.ErrorMessages.SERVER_ERROR,
            error,
        });
    }
});
exports.getHistoricosBodegas = getHistoricosBodegas;
// Obtener todos los registros históricos donde bodega no es null y pagado es NO
const getHistoricosBodegasNoPagado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const historicosList = yield historical_models_1.Historicos.findAll({
            attributes: [
                'id',
                'numero_reporte',
                'ciu',
                'bodega',
                'puesto',
                'nave',
                'seccion',
                'meses',
                'fecha',
                'cantNotificaciones',
                'archivo',
                'valor',
                'pagado',
                [(0, sequelize_1.col)('contribuyente.nombre'), 'contribuyente.nombre'],
                [(0, sequelize_1.col)('contribuyente.cedula'), 'contribuyente.cedula']
            ],
            include: [{
                    model: contributors_models_1.default,
                    as: 'contribuyente',
                    attributes: []
                }],
            where: {
                pagado: 'NO',
                [sequelize_1.Op.and]: sequelize_1.Sequelize.literal(`(
          historicos.cantNotificaciones = (
            SELECT MAX(h2.cantNotificaciones)
            FROM historicos h2
            WHERE h2.ciu = historicos.ciu
              AND h2.bodega = historicos.bodega
              AND h2.nave = historicos.nave
              AND h2.seccion = historicos.seccion
              AND h2.meses = historicos.meses
              AND DATE_FORMAT(h2.fecha, '%Y-%m') = DATE_FORMAT(historicos.fecha, '%Y-%m')
              AND h2.pagado = 'NO'
              AND h2.bodega != ""
          )
        )`)
            },
            raw: true,
        });
        if (historicosList.length === 0) {
            return res.status(404).json({
                msg: 'No se encontraron historicos asociados a bodegas que no hayan sido pagados',
            });
        }
        res.json(historicosList);
    }
    catch (error) {
        return res.status(500).json({
            msg: manage_error_1.ErrorMessages.SERVER_ERROR,
            error,
        });
    }
});
exports.getHistoricosBodegasNoPagado = getHistoricosBodegasNoPagado;
const getHistoricosBodegasCero = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const historicosList = yield historical_models_1.Historicos.findAll({
            where: {
                bodega: {
                    [sequelize_1.Op.ne]: null,
                },
                cantNotificaciones: 0,
            },
        });
        if (historicosList.length === 0) {
            return res.status(404).json({
                msg: 'No se encontraron historicos asociados a bodegas con cantNotificaciones igual a 0',
            });
        }
        // Obtener datos de contribuyentes
        const historicosWithContribuyentes = yield Promise.all(historicosList.map((historico) => __awaiter(void 0, void 0, void 0, function* () {
            const historicoData = historico.get({ plain: true });
            const contribuyente = yield contributors_models_1.default.findOne({
                where: { ciu: historicoData.ciu },
            });
            return Object.assign(Object.assign({}, historicoData), { nombre: contribuyente ? contribuyente.get('nombre') : 'Desconocido', cedula: contribuyente ? contribuyente.get('cedula') : 'Desconocido' });
        })));
        res.json(historicosWithContribuyentes);
    }
    catch (error) {
        return res.status(500).json({
            msg: manage_error_1.ErrorMessages.SERVER_ERROR,
            error,
        });
    }
});
exports.getHistoricosBodegasCero = getHistoricosBodegasCero;
// Obtener todos los registros históricos donde bodega no es null y pagado es NO
const getHistoricosPuestosNoPagado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const historicosList = yield historical_models_1.Historicos.findAll({
            attributes: [
                'id',
                'numero_reporte',
                'ciu',
                'bodega',
                'puesto',
                'nave',
                'seccion',
                'meses',
                'fecha',
                'cantNotificaciones',
                'archivo',
                'valor',
                'pagado',
                [(0, sequelize_1.col)('contribuyente.nombre'), 'contribuyente.nombre'],
                [(0, sequelize_1.col)('contribuyente.cedula'), 'contribuyente.cedula']
            ],
            include: [{
                    model: contributors_models_1.default,
                    as: 'contribuyente',
                    attributes: []
                }],
            where: {
                pagado: 'NO',
                [sequelize_1.Op.and]: sequelize_1.Sequelize.literal(`(
          historicos.cantNotificaciones = (
            SELECT MAX(h2.cantNotificaciones)
            FROM historicos h2
            WHERE h2.ciu = historicos.ciu
              AND h2.puesto = historicos.puesto
              AND h2.nave = historicos.nave
              AND h2.seccion = historicos.seccion
              AND h2.meses = historicos.meses
              AND DATE_FORMAT(h2.fecha, '%Y-%m') = DATE_FORMAT(historicos.fecha, '%Y-%m')
              AND h2.pagado = 'NO'
              AND h2.puesto != ""
          )
        )`)
            },
            raw: true,
        });
        if (historicosList.length === 0) {
            return res.status(404).json({
                msg: 'No se encontraron historicos asociados a puestos que no hayan sido pagados',
            });
        }
        res.json(historicosList);
    }
    catch (error) {
        return res.status(500).json({
            msg: manage_error_1.ErrorMessages.SERVER_ERROR,
            error,
        });
    }
});
exports.getHistoricosPuestosNoPagado = getHistoricosPuestosNoPagado;
// Obtener todos los registros históricos donde puesto no es null
const getHistoricosPuestos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const historicosList = yield historical_models_1.Historicos.findAll({
            where: {
                puesto: {
                    [sequelize_1.Op.ne]: null,
                },
            },
        });
        if (historicosList.length === 0) {
            return res.status(404).json({
                msg: 'No se encontraron historicos asociados a puestos',
            });
        }
        // Obtener datos de contribuyentes
        const historicosWithContribuyentes = yield Promise.all(historicosList.map((historico) => __awaiter(void 0, void 0, void 0, function* () {
            const historicoData = historico.get({ plain: true });
            const contribuyente = yield contributors_models_1.default.findOne({
                where: { ciu: historicoData.ciu },
            });
            return Object.assign(Object.assign({}, historicoData), { nombre: contribuyente ? contribuyente.get('nombre') : 'Desconocido', cedula: contribuyente ? contribuyente.get('cedula') : 'Desconocido' });
        })));
        res.json(historicosWithContribuyentes);
    }
    catch (error) {
        return res.status(500).json({
            msg: manage_error_1.ErrorMessages.SERVER_ERROR,
            error,
        });
    }
});
exports.getHistoricosPuestos = getHistoricosPuestos;
const getHistoricosPuestosCero = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const historicosList = yield historical_models_1.Historicos.findAll({
            where: {
                puesto: {
                    [sequelize_1.Op.ne]: null,
                },
                cantNotificaciones: 0,
            },
        });
        if (historicosList.length === 0) {
            return res.status(404).json({
                msg: 'No se encontraron historicos asociados a puestos con cantNotificaciones igual a 0',
            });
        }
        // Obtener datos de contribuyentes
        const historicosWithContribuyentes = yield Promise.all(historicosList.map((historico) => __awaiter(void 0, void 0, void 0, function* () {
            const historicoData = historico.get({ plain: true });
            const contribuyente = yield contributors_models_1.default.findOne({
                where: { ciu: historicoData.ciu },
            });
            return Object.assign(Object.assign({}, historicoData), { nombre: contribuyente ? contribuyente.get('nombre') : 'Desconocido', cedula: contribuyente ? contribuyente.get('cedula') : 'Desconocido' });
        })));
        res.json(historicosWithContribuyentes);
    }
    catch (error) {
        return res.status(500).json({
            msg: manage_error_1.ErrorMessages.SERVER_ERROR,
            error,
        });
    }
});
exports.getHistoricosPuestosCero = getHistoricosPuestosCero;
//Obtener historico por el id
const getHistoricoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const historico = yield historical_models_1.Historicos.findByPk(id);
        if (!historico) {
            return res.status(404).json({
                msg: 'No se encontraron historicos asociados'
            });
        }
        res.json({
            historico
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: manage_error_1.ErrorMessages.SERVER_ERROR
        });
    }
});
exports.getHistoricoById = getHistoricoById;
//Obtener historicos por CIU
const getHistoricosByCIU = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ciu } = req.params;
    try {
        const historicos = yield historical_models_1.Historicos.findAll({ where: { ciu } });
        if (historicos.length === 0) {
            return res.status(404).json({
                msg: 'No se encontraron historicos asociados'
            });
        }
        res.json({
            historicos
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: manage_error_1.ErrorMessages.SERVER_ERROR
        });
    }
});
exports.getHistoricosByCIU = getHistoricosByCIU;
// Eliminar un registro histórico por ID
const deleteHistorico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const existHistorico = yield historical_models_1.Historicos.findOne({ where: { id } });
    if (!existHistorico) {
        return res.status(404).json({
            msg: manage_error_1.ErrorMessages.USER_EXIST
        });
    }
    try {
        yield historical_models_1.Historicos.destroy({ where: { id } });
        res.json({
            msg: `El registro histórico con CIU ${existHistorico.ciu} ha sido removido satisfactoriamente`
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: manage_error_1.ErrorMessages.SERVER_ERROR,
            error
        });
    }
});
exports.deleteHistorico = deleteHistorico;
// Actualizar un registro histórico por ID
const updateHistorico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { ciu, numero_reporte, bodega, puesto, nave, fecha, seccion, meses, cantNotificaciones, archivo, valor, pagado } = req.body;
    const existHistorico = yield historical_models_1.Historicos.findOne({ where: { id } });
    if (!existHistorico) {
        return res.status(404).json({
            msg: manage_error_1.ErrorMessages.USER_EXIST
        });
    }
    try {
        yield historical_models_1.Historicos.update({
            ciu,
            numero_reporte,
            bodega,
            puesto,
            nave,
            seccion,
            fecha,
            meses,
            cantNotificaciones,
            archivo,
            valor,
            pagado
        }, { where: { id } });
        res.json({
            msg: `El registro histórico con CIU ${existHistorico.ciu} ha sido editado satisfactoriamente`
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: manage_error_1.ErrorMessages.SERVER_ERROR,
            error
        });
    }
});
exports.updateHistorico = updateHistorico;
// Marcar un registro histórico como pagado (pagado = "SI")
const payHistorico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const existHistorico = yield historical_models_1.Historicos.findOne({ where: { id } });
        if (!existHistorico) {
            return res.status(404).json({
                msg: 'No se encontró un registro histórico con ese ID'
            });
        }
        if (existHistorico.pagado === 'SI') {
            return res.json({
                msg: `El registro histórico con CIU ${existHistorico.ciu} ya está marcado como pagado`
            });
        }
        yield historical_models_1.Historicos.update({ pagado: 'SI' }, { where: { id } });
        res.json({
            msg: `El registro histórico con CIU ${existHistorico.ciu} ha sido marcado como pagado`
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: manage_error_1.ErrorMessages.SERVER_ERROR,
            error
        });
    }
}); // Obtener el siguiente número de reporte
exports.payHistorico = payHistorico;
const obtenerNumeroReporte = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const maxNumeroReporte = yield historical_models_1.Historicos.max('numero_reporte');
        const siguienteNumeroReporte = maxNumeroReporte !== null ? maxNumeroReporte + 1 : 1;
        res.json({ siguienteNumeroReporte });
    }
    catch (error) {
        res.status(500).json({
            msg: manage_error_1.ErrorMessages.SERVER_ERROR,
            error,
        });
    }
});
exports.obtenerNumeroReporte = obtenerNumeroReporte;
