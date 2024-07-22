import { DataTypes } from 'sequelize';
import connection from '../db/connection.db';
import Historicos from './historical.models';

export const Contribuyentes = connection.define('contribuyentes', {
  ciu: {
    type: DataTypes.STRING(10),
    primaryKey: true,
  },
  cedula: {
    type: DataTypes.STRING(15),
    allowNull: true,
  },
  nombre: {
    type: DataTypes.STRING(75),
    allowNull: true,
  },
  estado: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
}, {
  timestamps: false,
});

export default Contribuyentes;
