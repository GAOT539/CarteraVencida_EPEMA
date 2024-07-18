import { Request, Response } from 'express';
import { ErrorMessages } from '../error/manage.error';
import Contribuyentes from '../models/contributors.models';

// Crear un nuevo registro de contribuyente
export const newContribuyente = async (req: Request, res: Response) => {
  const { ciu, cedula, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, estado } = req.body;

  try {
    const contribuyente = await Contribuyentes.create({
      ciu,
      cedula,
      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
      estado
    });

    res.json({
      msg: `Contribuyente con CIU ${ciu} ha sido creado satisfactoriamente!`,
      contribuyente
    });

  } catch (error) {
    res.status(500).json({
      msg: ErrorMessages.SERVER_ERROR,
      error
    });
  }
}

// Obtener todos los registros de contribuyentes
export const getContribuyentes = async (req: Request, res: Response) => {
  try {
    const contribuyentes = await Contribuyentes.findAll();
    res.json(contribuyentes);

  } catch (error) {
    res.status(500).json({
      msg: ErrorMessages.SERVER_ERROR,
      error
    });
  }
}

// Obtener un registro de contribuyente por CIU
export const getContribuyente = async (req: Request, res: Response) => {
  const { ciu } = req.params;

  try {
    const contribuyente = await Contribuyentes.findByPk(ciu);

    if (!contribuyente) {
      return res.status(404).json({
        msg: `Contribuyente con CIU ${ciu} no encontrado`
      });
    }

    res.json(contribuyente);

  } catch (error) {
    res.status(500).json({
      msg: ErrorMessages.SERVER_ERROR,
      error
    });
  }
}

// Actualizar un registro de contribuyente
export const updateContribuyente = async (req: Request, res: Response) => {
  const { ciu } = req.params;
  const { cedula, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, estado } = req.body;

  try {
    const contribuyente = await Contribuyentes.findByPk(ciu);

    if (!contribuyente) {
      return res.status(404).json({
        msg: `Contribuyente con CIU ${ciu} no encontrado`
      });
    }

    await contribuyente.update({
      cedula,
      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
      estado
    });

    res.json({
      msg: `Contribuyente con CIU ${ciu} ha sido actualizado satisfactoriamente!`,
      contribuyente
    });

  } catch (error) {
    res.status(500).json({
      msg: ErrorMessages.SERVER_ERROR,
      error
    });
  }
}

// Eliminar un registro de contribuyente
export const deleteContribuyente = async (req: Request, res: Response) => {
  const { ciu } = req.params;

  try {
    const contribuyente = await Contribuyentes.findByPk(ciu);

    if (!contribuyente) {
      return res.status(404).json({
        msg: `Contribuyente con CIU ${ciu} no encontrado`
      });
    }

    await contribuyente.destroy();

    res.json({
      msg: `Contribuyente con CIU ${ciu} ha sido eliminado satisfactoriamente!`
    });

  } catch (error) {
    res.status(500).json({
      msg: ErrorMessages.SERVER_ERROR,
      error
    });
  }
}

export default {
  newContribuyente,
  getContribuyentes,
  getContribuyente,
  updateContribuyente,
  deleteContribuyente
};
