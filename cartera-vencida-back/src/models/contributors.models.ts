import { DataTypes } from 'sequelize';
import connection from '../db/connection.db';

export const Contribuyentes = connection.define('contribuyentes', {
  ciu: {
    type: DataTypes.STRING(10),
    primaryKey: true,
  },
  cedula: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  primer_nombre: {
    type: DataTypes.STRING(30),
    allowNull: true,
  },
  segundo_nombre: {
    type: DataTypes.STRING(30),
    allowNull: true,
  },
  primer_apellido: {
    type: DataTypes.STRING(30),
    allowNull: true,
  },
  segundo_apellido: {
    type: DataTypes.STRING(30),
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
