import { DataTypes } from 'sequelize';
import connection from '../db/connection.db';

export const Historicos = connection.define('historicos', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  numero_reporte: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ciu: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  bodega: {
    type: DataTypes.STRING(30),
    allowNull: true,
  },
  puesto: {
    type: DataTypes.STRING(30),
    allowNull: true,
  },
  nave: {
    type: DataTypes.STRING(40),
    allowNull: true,
  },
  seccion: {
    type: DataTypes.STRING(40),
    allowNull: true,
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  meses:{
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cantNotificaciones: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  archivo: {
    type: DataTypes.BLOB,
    allowNull: true,
  },
  valor: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  pagado: {
    type: DataTypes.STRING(2),
    allowNull: false,
  },
}, {
  timestamps: false,
});

export default Historicos;
