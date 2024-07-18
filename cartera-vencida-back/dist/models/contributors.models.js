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
        type: sequelize_1.DataTypes.STRING(15),
        allowNull: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(75),
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
