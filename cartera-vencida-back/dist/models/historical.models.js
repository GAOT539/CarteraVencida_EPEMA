"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Historicos = void 0;
const sequelize_1 = require("sequelize");
const connection_db_1 = __importDefault(require("../db/connection.db"));
exports.Historicos = connection_db_1.default.define('historicos', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    numero_reporte: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    ciu: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false,
    },
    contribuyente: {
        type: sequelize_1.DataTypes.STRING(80),
        allowNull: true,
    },
    bodega: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: true,
    },
    puesto: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: true,
    },
    fecha: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: true,
    },
    cantNotificaciones: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    archivo: {
        type: sequelize_1.DataTypes.BLOB,
        allowNull: true,
    },
    valor: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: true,
    },
    pagado: {
        type: sequelize_1.DataTypes.STRING(2),
        allowNull: false,
    },
}, {
    timestamps: false,
});
exports.default = exports.Historicos;
