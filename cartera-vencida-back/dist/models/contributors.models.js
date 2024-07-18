"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contribuyentes = void 0;
const sequelize_1 = require("sequelize");
const connection_db_1 = __importDefault(require("../db/connection.db"));
exports.Contribuyentes = connection_db_1.default.define('contribuyentes', {
    ciu: {
        type: sequelize_1.DataTypes.STRING(10),
        primaryKey: true,
    },
    cedula: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: true,
    },
    primer_nombre: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: true,
    },
    segundo_nombre: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: true,
    },
    primer_apellido: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: true,
    },
    segundo_apellido: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: true,
    },
    estado: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: true,
    },
}, {
    timestamps: false,
});
exports.default = exports.Contribuyentes;
