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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHistorico = exports.deleteHistorico = exports.getHistoricosByCIU = exports.getHistoricoById = exports.getHistoricosPuestos = exports.getHistoricosBodegas = exports.getHistoricos = exports.newHistorico = void 0;
const historical_models_1 = require("../models/historical.models");
const manage_error_1 = require("../error/manage.error");
const sequelize_1 = require("sequelize");
// Crear un nuevo registro histórico
const newHistorico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ciu, contribuyente, bodega, puesto, fecha, cantNotificaciones, archivo } = req.body;
    try {
        yield historical_models_1.Historicos.create({
            ciu,
            contribuyente,
            bodega,
            puesto,
            fecha,
            cantNotificaciones,
            archivo
        });
        res.json({
            msg: `Registro histórico con CIU ${ciu} ha sido creado satisfactoriamente!`
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
// Obtener todos los registros históricos
const getHistoricos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const historicosList = yield historical_models_1.Historicos.findAll();
        res.json({
            historicosList
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: manage_error_1.ErrorMessages.SERVER_ERROR
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
        res.json({
            historicosList,
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: manage_error_1.ErrorMessages.SERVER_ERROR,
            error,
        });
    }
});
exports.getHistoricosBodegas = getHistoricosBodegas;
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
        res.json({
            historicosList,
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: manage_error_1.ErrorMessages.SERVER_ERROR,
            error,
        });
    }
});
exports.getHistoricosPuestos = getHistoricosPuestos;
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
    console.log(ciu);
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
    const { ciu, contribuyente, bodega, puesto, fecha, cantNotificaciones, archivo } = req.body;
    const existHistorico = yield historical_models_1.Historicos.findOne({ where: { id } });
    if (!existHistorico) {
        return res.status(404).json({
            msg: manage_error_1.ErrorMessages.USER_EXIST
        });
    }
    try {
        yield historical_models_1.Historicos.update({
            ciu,
            contribuyente,
            bodega,
            puesto,
            fecha,
            cantNotificaciones,
            archivo
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
