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
exports.deleteContribuyente = exports.updateContribuyente = exports.getContribuyente = exports.getContribuyentes = exports.newContribuyente = void 0;
const manage_error_1 = require("../error/manage.error");
const contributors_models_1 = __importDefault(require("../models/contributors.models"));
// Crear un nuevo registro de contribuyente
const newContribuyente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ciu, cedula, nombre, estado } = req.body;
    try {
        const contribuyente = yield contributors_models_1.default.create({
            ciu,
            cedula,
            nombre,
            estado
        });
        res.json({
            msg: `Contribuyente con CIU ${ciu} ha sido creado satisfactoriamente!`,
            contribuyente
        });
    }
    catch (error) {
        res.status(500).json({
            msg: manage_error_1.ErrorMessages.SERVER_ERROR,
            error
        });
    }
});
exports.newContribuyente = newContribuyente;
// Obtener todos los registros de contribuyentes
const getContribuyentes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contribuyentes = yield contributors_models_1.default.findAll();
        res.json(contribuyentes);
    }
    catch (error) {
        res.status(500).json({
            msg: manage_error_1.ErrorMessages.SERVER_ERROR,
            error
        });
    }
});
exports.getContribuyentes = getContribuyentes;
// Obtener un registro de contribuyente por CIU
const getContribuyente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ciu } = req.params;
    try {
        const contribuyente = yield contributors_models_1.default.findByPk(ciu);
        if (!contribuyente) {
            return res.status(404).json({
                msg: `Contribuyente con CIU ${ciu} no encontrado`
            });
        }
        res.json(contribuyente);
    }
    catch (error) {
        res.status(500).json({
            msg: manage_error_1.ErrorMessages.SERVER_ERROR,
            error
        });
    }
});
exports.getContribuyente = getContribuyente;
// Actualizar un registro de contribuyente
const updateContribuyente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ciu } = req.params;
    const { cedula, nombre, estado } = req.body;
    try {
        const contribuyente = yield contributors_models_1.default.findByPk(ciu);
        if (!contribuyente) {
            return res.status(404).json({
                msg: `Contribuyente con CIU ${ciu} no encontrado`
            });
        }
        yield contribuyente.update({
            cedula,
            nombre,
            estado
        });
        res.json({
            msg: `Contribuyente con CIU ${ciu} ha sido actualizado satisfactoriamente!`,
            contribuyente
        });
    }
    catch (error) {
        res.status(500).json({
            msg: manage_error_1.ErrorMessages.SERVER_ERROR,
            error
        });
    }
});
exports.updateContribuyente = updateContribuyente;
// Eliminar un registro de contribuyente
const deleteContribuyente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ciu } = req.params;
    try {
        const contribuyente = yield contributors_models_1.default.findByPk(ciu);
        if (!contribuyente) {
            return res.status(404).json({
                msg: `Contribuyente con CIU ${ciu} no encontrado`
            });
        }
        yield contribuyente.destroy();
        res.json({
            msg: `Contribuyente con CIU ${ciu} ha sido eliminado satisfactoriamente!`
        });
    }
    catch (error) {
        res.status(500).json({
            msg: manage_error_1.ErrorMessages.SERVER_ERROR,
            error
        });
    }
});
exports.deleteContribuyente = deleteContribuyente;
exports.default = {
    newContribuyente: exports.newContribuyente,
    getContribuyentes: exports.getContribuyentes,
    getContribuyente: exports.getContribuyente,
    updateContribuyente: exports.updateContribuyente,
    deleteContribuyente: exports.deleteContribuyente
};
