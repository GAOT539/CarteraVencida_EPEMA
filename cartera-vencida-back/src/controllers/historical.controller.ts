import { Request, Response } from 'express';
import { Historicos } from '../models/historical.models';
import { ErrorMessages } from '../error/manage.error';

// Crear un nuevo registro histórico
export const newHistorico = async (req: Request, res: Response) => {
  const { ciu, contribuyente, bodega, puesto, fecha, cantNotificaciones, archivo } = req.body;

  try {
    await Historicos.create({
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

  } catch (error) {
    res.status(500).json({
      msg: ErrorMessages.SERVER_ERROR,
      error
    });
  }
}

// Obtener todos los registros históricos
export const getHistoricos = async (req: Request, res: Response) => {
  try {
    const historicosList = await Historicos.findAll();
    res.json({
      historicosList
    });

  } catch (error) {
    return res.status(500).json({
      msg: ErrorMessages.SERVER_ERROR
    });
  }
}
//Obtener historico por el id
export const getHistoricoById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const historico = await Historicos.findByPk(id);

    if (!historico) {
      return res.status(404).json({
        msg: 'No se encontraron historicos asociados'
      });
    }

    res.json({
      historico
    });

  } catch (error) {
    return res.status(500).json({
      msg: ErrorMessages.SERVER_ERROR
    });
  }
}
//Obtener historicos por CIU
export const getHistoricosByCIU = async (req: Request, res: Response) => {
  const { ciu } = req.params;
  console.log(ciu)

  try {
    const historicos = await Historicos.findAll({ where: { ciu } });

    if (historicos.length === 0) {
      return res.status(404).json({
        msg: 'No se encontraron historicos asociados'
      });
    }

    res.json({
      historicos
    });

  } catch (error) {
    return res.status(500).json({
      msg: ErrorMessages.SERVER_ERROR
    });
  }
}

// Eliminar un registro histórico por ID
export const deleteHistorico = async (req: Request, res: Response) => {
  const id = req.params.id;
  const existHistorico: any = await Historicos.findOne({ where: { id } });

  if (!existHistorico) {
    return res.status(404).json({
      msg: ErrorMessages.USER_EXIST
    });
  }

  try {
    await Historicos.destroy({ where: { id } });

    res.json({
      msg: `El registro histórico con CIU ${existHistorico.ciu} ha sido removido satisfactoriamente`
    });

  } catch (error) {
    return res.status(500).json({
      msg: ErrorMessages.SERVER_ERROR,
      error
    });
  }
}

// Actualizar un registro histórico por ID
export const updateHistorico = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { ciu, contribuyente, bodega, puesto, fecha, cantNotificaciones, archivo } = req.body;

  const existHistorico: any = await Historicos.findOne({ where: { id } });

  if (!existHistorico) {
    return res.status(404).json({
      msg: ErrorMessages.USER_EXIST
    });
  }

  try {
    await Historicos.update(
      {
        ciu,
        contribuyente,
        bodega,
        puesto,
        fecha,
        cantNotificaciones,
        archivo
      },
      { where: { id } }
    );

    res.json({
      msg: `El registro histórico con CIU ${existHistorico.ciu} ha sido editado satisfactoriamente`
    });

  } catch (error) {
    return res.status(500).json({
      msg: ErrorMessages.SERVER_ERROR,
      error
    });
  }
}
