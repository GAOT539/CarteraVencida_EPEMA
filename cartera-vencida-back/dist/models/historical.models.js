"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Historicos = void 0;
const sequelize_1 = require("sequelize");
const connection_db_1 = __importDefault(require("../db/connection.db"));
const contributors_models_1 = __importDefault(require("./contributors.models"));
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
    bodega: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: true,
    },
    puesto: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: true,
    },
    nave: {
        type: sequelize_1.DataTypes.STRING(40),
        allowNull: true,
    },
    seccion: {
        type: sequelize_1.DataTypes.STRING(40),
        allowNull: true,
    },
    fecha: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: true,
    },
    meses: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    cantNotificaciones: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    archivo: {
        type: sequelize_1.DataTypes.STRING(200),
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
// Definición de la asociación
exports.Historicos.belongsTo(contributors_models_1.default, {
    foreignKey: 'ciu',
    as: 'contribuyente',
});
exports.default = exports.Historicos;
