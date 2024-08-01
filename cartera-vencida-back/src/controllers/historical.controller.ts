import { Request, Response } from 'express';
import { Historicos } from '../models/historical.models';
import { ErrorMessages } from '../error/manage.error';
import { col, fn, literal, Op, Sequelize } from 'sequelize';
import Contribuyentes from '../models/contributors.models';

// Crear un nuevo registro histórico
export const newHistorico = async (req: Request, res: Response) => {
  const { ciu,numero_reporte, bodega, puesto, nave, seccion, fecha, meses, cantNotificaciones, archivo, valor, pagado, esHistorico } = req.body;

  try {
    const nuevoHistorico = await Historicos.create({
      ciu,
      numero_reporte,
      bodega,
      puesto,
      nave,
      seccion,
      fecha,
      meses,
      cantNotificaciones,
      archivo,
      valor,
      pagado, 
      esHistorico
    });

    res.json({
      msg: nuevoHistorico.dataValues.id
    });

  } catch (error) {
    res.status(500).json({
      msg: ErrorMessages.SERVER_ERROR,
      error
    });
  }
}

// Obtener todos los registros históricos con nombre y cédula de contribuyentes
export const getHistoricos = async (req: Request, res: Response) => {
  try {
    // Obtener todos los registros históricos
    const historicosList = await Historicos.findAll();

    // Obtener los datos de contribuyentes asociados a los históricos
    const historicosWithContribuyentes = await Promise.all(
      historicosList.map(async (historico) => {
        const historicoData = historico.get({ plain: true });

        // Buscar el contribuyente asociado al histórico
        const contribuyente = await Contribuyentes.findOne({
          where: { ciu: historicoData.ciu },
        });

        // Devolver el histórico con los datos del contribuyente
        return {
          ...historicoData,
          nombre: contribuyente ? contribuyente.get('nombre') : 'Desconocido',
          cedula: contribuyente ? contribuyente.get('cedula') : 'Desconocido',
        };
      })
    );

    // Enviar la respuesta con los históricos y los datos del contribuyente
    res.json({
      historicosList: historicosWithContribuyentes
    });

  } catch (error) {
    return res.status(500).json({
      msg: ErrorMessages.SERVER_ERROR,
      error
    });
  }
};


// Obtener todos los registros históricos donde bodega no es null
export const getHistoricosBodegas = async (req: Request, res: Response) => {
  try {
    const historicosList = await Historicos.findAll({
      where: {
        bodega: {
          [Op.ne]: null,
        },
      },
    });

    if (historicosList.length === 0) {
      return res.status(404).json({
        msg: 'No se encontraron historicos asociados a bodegas',
      });
    }

    // Obtener datos de contribuyentes
    const historicosWithContribuyentes = await Promise.all(
      historicosList.map(async (historico) => {
        const historicoData = historico.get({ plain: true });
        const contribuyente = await Contribuyentes.findOne({
          where: { ciu: historicoData.ciu },
        });

        return {
          ...historicoData,
          nombre: contribuyente ? contribuyente.get('nombre') : 'Desconocido',
          cedula: contribuyente ? contribuyente.get('cedula') : 'Desconocido',
        };
      })
    );

    res.json(historicosWithContribuyentes);
  } catch (error) {
    return res.status(500).json({
      msg: ErrorMessages.SERVER_ERROR,
      error,
    });
  }
};
// Obtener todos los registros históricos donde bodega no es null y pagado es NO
export const getHistoricosBodegasNoPagado = async (req: Request, res: Response) => {
  try {
    const historicosList = await Historicos.findAll({
      attributes: [
        'id',
        'numero_reporte',
        'ciu',
        'bodega',
        'puesto',
        'nave',
        'seccion',
        'meses',
        'fecha',
        'cantNotificaciones',
        'archivo',
        'valor',
        'pagado',
        'esHistorico',
        [col('contribuyente.nombre'), 'contribuyente.nombre'],
        [col('contribuyente.cedula'), 'contribuyente.cedula']
      ],
      include: [{
        model: Contribuyentes,
        as: 'contribuyente',
        attributes: []
      }],
      where: {
        pagado: 'NO',
        esHistorico: 'NO',
        [Op.and]: Sequelize.literal(`(
          historicos.cantNotificaciones = (
            SELECT MAX(h2.cantNotificaciones)
            FROM historicos h2
            WHERE h2.ciu = historicos.ciu
              AND h2.bodega = historicos.bodega
              AND h2.nave = historicos.nave
              AND h2.seccion = historicos.seccion
              AND h2.meses = historicos.meses
              AND DATE_FORMAT(h2.fecha, '%Y-%m') = DATE_FORMAT(historicos.fecha, '%Y-%m')
              AND h2.pagado = 'NO'
              AND h2.esHistorico = 'NO'
              AND h2.bodega != ""
          )
        )`)
      },
      raw: true,
    });

    if (historicosList.length === 0) { 
      return res.status(404).json({
        msg: 'No se encontraron historicos asociados a bodegas que no hayan sido pagados',
      });
    }

    res.json(historicosList);
  } catch (error) {
    return res.status(500).json({
      msg: ErrorMessages.SERVER_ERROR,
      error,
    });
  }
};

export const getHistoricosBodegasCero = async (req: Request, res: Response) => {
  try {
    const historicosList = await Historicos.findAll({
      where: {
        bodega: {
          [Op.ne]: null,
        },
        cantNotificaciones: 0,
      },
    });

    if (historicosList.length === 0) {
      return res.status(404).json({
        msg: 'No se encontraron historicos asociados a bodegas con cantNotificaciones igual a 0',
      });
    }

    // Obtener datos de contribuyentes
    const historicosWithContribuyentes = await Promise.all(
      historicosList.map(async (historico) => {
        const historicoData = historico.get({ plain: true });
        const contribuyente = await Contribuyentes.findOne({
          where: { ciu: historicoData.ciu },
        });

        return {
          ...historicoData,
          nombre: contribuyente ? contribuyente.get('nombre') : 'Desconocido',
          cedula: contribuyente ? contribuyente.get('cedula') : 'Desconocido',
        };
      })
    );

    res.json(historicosWithContribuyentes);
  } catch (error) {
    return res.status(500).json({
      msg: ErrorMessages.SERVER_ERROR,
      error,
    });
  }
};
// Obtener todos los registros históricos donde bodega no es null y pagado es NO
export const getHistoricosPuestosNoPagado = async (req: Request, res: Response) => {
  try {
    const historicosList = await Historicos.findAll({
      attributes: [
        'id',
        'numero_reporte',
        'ciu',
        'bodega',
        'puesto',
        'nave',
        'seccion',
        'meses',
        'fecha',
        'cantNotificaciones',
        'archivo',
        'valor',
        'pagado',
        'esHistorico',
        [col('contribuyente.nombre'), 'contribuyente.nombre'],
        [col('contribuyente.cedula'), 'contribuyente.cedula']
      ],
      include: [{
        model: Contribuyentes,
        as: 'contribuyente',
        attributes: []
      }],
      where: {
        pagado: 'NO',
        esHistorico: 'NO',
        [Op.and]: Sequelize.literal(`(
          historicos.cantNotificaciones = (
            SELECT MAX(h2.cantNotificaciones)
            FROM historicos h2
            WHERE h2.ciu = historicos.ciu
              AND h2.puesto = historicos.puesto
              AND h2.nave = historicos.nave
              AND h2.seccion = historicos.seccion
              AND h2.meses = historicos.meses
              AND DATE_FORMAT(h2.fecha, '%Y-%m') = DATE_FORMAT(historicos.fecha, '%Y-%m')
              AND h2.pagado = 'NO'
              AND h2.esHistorico = 'NO'
              AND h2.puesto != ""
          )
        )`)
      },
      raw: true,
    });

    if (historicosList.length === 0) {
      return res.status(404).json({
        msg: 'No se encontraron historicos asociados a puestos que no hayan sido pagados',
      });
    }

    res.json(historicosList);
  } catch (error) {
    return res.status(500).json({
      msg: ErrorMessages.SERVER_ERROR,
      error,
    });
  }
};

// Obtener todos los registros históricos donde puesto no es null
export const getHistoricosPuestos = async (req: Request, res: Response) => {
  try {
    const historicosList = await Historicos.findAll({
      where: {
        puesto: {
          [Op.ne]: null,  
        },
      },
    });

    if (historicosList.length === 0) {
      return res.status(404).json({
        msg: 'No se encontraron historicos asociados a puestos',
      });
    }
    // Obtener datos de contribuyentes
    const historicosWithContribuyentes = await Promise.all(
      historicosList.map(async (historico) => {
        const historicoData = historico.get({ plain: true });
        const contribuyente = await Contribuyentes.findOne({
          where: { ciu: historicoData.ciu },
        });

        return {
          ...historicoData,
          nombre: contribuyente ? contribuyente.get('nombre') : 'Desconocido',
          cedula: contribuyente ? contribuyente.get('cedula') : 'Desconocido',
        };
      })
    );

    res.json(historicosWithContribuyentes);
  } catch (error) {
    return res.status(500).json({
      msg: ErrorMessages.SERVER_ERROR,
      error,
    });
  }
};
export const getHistoricosPuestosCero = async (req: Request, res: Response) => {
  try {
    const historicosList = await Historicos.findAll({
      where: {
        puesto: {
          [Op.ne]: null,
        },
        cantNotificaciones: 0,
      },
    });

    if (historicosList.length === 0) {
      return res.status(404).json({
        msg: 'No se encontraron historicos asociados a puestos con cantNotificaciones igual a 0',
      });
    }

    // Obtener datos de contribuyentes
    const historicosWithContribuyentes = await Promise.all(
      historicosList.map(async (historico) => {
        const historicoData = historico.get({ plain: true });
        const contribuyente = await Contribuyentes.findOne({
          where: { ciu: historicoData.ciu },
        });

        return {
          ...historicoData,
          nombre: contribuyente ? contribuyente.get('nombre') : 'Desconocido',
          cedula: contribuyente ? contribuyente.get('cedula') : 'Desconocido',
        };
      })
    );

    res.json(historicosWithContribuyentes);
  } catch (error) {
    return res.status(500).json({
      msg: ErrorMessages.SERVER_ERROR,
      error,
    });
  }
};

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
  const { ciu, numero_reporte, bodega, puesto, nave, fecha, seccion,meses, cantNotificaciones, archivo,valor, pagado, esHistorico } = req.body;

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
        numero_reporte,
        bodega,
        puesto,
        nave,
        seccion,
        fecha,
        meses,
        cantNotificaciones,
        archivo,
        valor,
        pagado,
        esHistorico
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

// Marcar un registro histórico como pagado (pagado = "SI")
export const relatedHistoricos = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const historicosList = await Historicos.findAll({
      attributes: [
        'id',
        'numero_reporte',
        'ciu',
        'bodega',
        'puesto',
        'nave',
        'seccion',
        'fecha',
        'meses',
        'cantNotificaciones',
        'archivo',
        'valor',
        'pagado',
        'esHistorico'
      ],
      where: {
        id: {
          [Op.in]: literal(`(
            SELECT h2.id
            FROM cartera_vencida.historicos AS h1
            JOIN cartera_vencida.historicos AS h2 
            ON h1.ciu = h2.ciu 
              AND h1.bodega <=> h2.bodega 
              AND h1.puesto <=> h2.puesto 
              AND h1.nave = h2.nave 
              AND h1.seccion = h2.seccion 
              AND h2.fecha BETWEEN DATE_SUB(h1.fecha, INTERVAL 30 DAY) AND DATE_ADD(h1.fecha, INTERVAL 30 DAY)
            WHERE h1.id = ${id}
          )`)
        }
      },
      order: [['fecha', 'ASC']],
      raw: true,
    });

    if (historicosList.length === 0) { 
      return res.status(404).json({
        msg: 'No se encontraron historicos asociados a bodegas que no hayan sido pagados',
      });
    }

    res.json(historicosList);
  } catch (error) {
    return res.status(500).json({
      msg: ErrorMessages.SERVER_ERROR,
      error,
    });
  }
}// Obtener el siguiente número de reporte
export const obtenerNumeroReporte = async (req: Request, res: Response) => {
  try {
    const maxNumeroReporte = await Historicos.max('numero_reporte');
    const siguienteNumeroReporte = maxNumeroReporte !== null ? (maxNumeroReporte as number) + 1 : 1;
    res.json({ siguienteNumeroReporte });
  } catch (error) {
    res.status(500).json({
      msg: ErrorMessages.SERVER_ERROR,
      error,
    });
  }
};
