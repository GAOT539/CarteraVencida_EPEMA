import { Request, Response } from 'express';
import { parseString } from 'xml2js';
import fs from 'fs';
import multer from 'multer';
import axios from 'axios';
import Contribuyentes from '../models/contributors.models';
import Historicos from '../models/historical.models';
import { Op } from 'sequelize';
import path from 'path';
import {
  filtrarYTransformarContribuyentes,
  leerYParsearXML,
  obtenerSiguienteNumeroReporte,
  crearYEnviarHistorico,
  leerYParsearXMLP,
  filtrarContribuyentesTransformados,
  filtrarYTransformarContribuyentesP
} from './functions';
import { ParsedXMLP } from './interfaces';

// Configuración de multer para manejar archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Carpeta donde se guardarán los archivos
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Nombre del archivo en el servidor
  }
});
const upload = multer({ storage });

// Middleware para manejar la carga de archivos
export const uploadFile = upload.single('xml'); // Nombre del campo en el formulario HTML

// Método para leer y devolver el contenido del archivo XML como texto
export const leerXMLBodegas = async (req: Request, res: Response) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({
      msg: 'No se ha proporcionado ningún archivo'
    });
  }

  // Leer el archivo XML
  try {
    const xmlData = fs.readFileSync(file.path, 'utf-8');

    // Devolver el contenido del XML como texto
    res.type('text/xml').send(xmlData);
  } catch (error) {
    console.error('Error al leer el archivo XML:', error);
    return res.status(500).json({
      msg: 'Error al leer el archivo XML',
      error: "error.message"
    });
  }
};

// Método para obtener todos los registros con cartera vencida de bodegas
export const carteraVencidaBodegas = async (req: Request, res: Response) => {
  let listaIngresados: any[] = [];

  let contador = 0;
  const file = req.file;
  if (!file) {
    return res.status(400).json({
      msg: 'No se ha proporcionado ningún archivo'
    });
  }

  try {
    const result = await leerYParsearXML(file.path);
    let contribuyentesTransformados = filtrarYTransformarContribuyentes(result.CARTERANOMBRESBODE);
    contribuyentesTransformados = await filtrarContribuyentesTransformados(contribuyentesTransformados, 'bodegas');
    // Obtener el siguiente número de reporte
    contador = await obtenerSiguienteNumeroReporte();

    // Recorrer los contribuyentes transformados y hacer la solicitud POST
    for (const contribuyente of contribuyentesTransformados) {
      listaIngresados.push(await crearYEnviarHistorico(contribuyente, contador))
      contador++;
    }

    res.json({
      listaIngresados
    });

  } catch (error) {
    console.error('Error al procesar el archivo:', error);
    return res.status(500).json({
      msg: 'Error al procesar el archivo',
      error: error
    });
  }
};
// Método para obtener todos los registros con cartera vencida de puestos
export const carteraVencidaPuestos = async (req: Request, res: Response) => {
  let listaIngresados: any[] = [];
  const file = req.file;
  let contador = 0;
  if (!file) {
    return res.status(400).json({
      msg: 'No se ha proporcionado ningún archivo'
    });
  }

  try {
    const result: ParsedXMLP = await leerYParsearXMLP(file.path);
    let contribuyentesTransformados = filtrarYTransformarContribuyentesP(result.CARTERANOMBRESPUESTOS);
    console.log("Puestos Transformados")
    console.log(contribuyentesTransformados)
    contribuyentesTransformados = await filtrarContribuyentesTransformados(contribuyentesTransformados, 'puestos');
    console.log("Puestos Filtrados")
    console.log(contribuyentesTransformados)
    // Obtener el siguiente número de reporte
    contador = await obtenerSiguienteNumeroReporte();
    // Recorrer los contribuyentes transformados y hacer la solicitud POST
    for (const contribuyente of contribuyentesTransformados) {
      console.log("XD")
      listaIngresados.push(await crearYEnviarHistorico(contribuyente, contador))
      contador++;
    }

    res.json({
      listaIngresados
    });

  } catch (error) {
    console.error('Error al procesar el archivo:', error);
    return res.status(500).json({
      msg: 'Error al procesar el archivo',
      error: error
    });
  }
};

export const notificarPrimeraBodegas = async (req: Request, res: Response) => {
  try {
    // Obtener los historicos de bodegas con cantNotificaciones igual a 0
    const historicosList = await Historicos.findAll({
      where: {
        cantNotificaciones: 0,
        bodega: { [Op.ne]: null } // Asegúrate de filtrar solo los historicos de bodegas
      },
    });

    if (historicosList.length === 0) {
      return res.status(404).json({
        msg: 'No se encontraron historicos con cantNotificaciones igual a 0 en bodegas',
      });
    }

    const ids = historicosList.map(historico => historico.get('id'));
    await Historicos.update(
      { cantNotificaciones: 1 },
      {
        where: {
          id: ids,
        },
      }
    );

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
          cantNotificaciones: 1,
        };
      })
    );

    res.json(historicosWithContribuyentes);
  } catch (error) {
    console.error('Error en notificarPrimeraBodegas:', error);
    return res.status(500).json({
      msg: 'Error al procesar la solicitud',
      error: error,
    });
  }
};

export const notificarPrimeraPuestos = async (req: Request, res: Response) => {
  try {
    // Obtener los historicos de puestos con cantNotificaciones igual a 0
    const historicosList = await Historicos.findAll({
      where: {
        cantNotificaciones: 0,
        puesto: { [Op.ne]: null } // Asegúrate de filtrar solo los historicos de puestos
      },
    });

    if (historicosList.length === 0) {
      return res.status(404).json({
        msg: 'No se encontraron historicos con cantNotificaciones igual a 0 en puestos',
      });
    }

    const ids = historicosList.map(historico => historico.get('id'));
    await Historicos.update(
      { cantNotificaciones: 1 },
      {
        where: {
          id: ids,
        },
      }
    );

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
          cantNotificaciones: 1,
        };
      })
    );

    res.json(historicosWithContribuyentes);
  } catch (error) {
    console.error('Error en notificarPrimeraPuestos:', error);
    return res.status(500).json({
      msg: 'Error al procesar la solicitud',
      error: error,
    });
  }
};

// Método para actualizar el archivo PDF de un histórico
export const actualizarPDFHistorico = async (req: Request, res: Response) => {
  const { id } = req.params;
  const file = req.file;

  if (!file) {
    return res.status(400).json({
      msg: 'No se ha proporcionado ningún archivo'
    });
  }

  try {
    // Verificar si el historial existe
    const historico = await Historicos.findByPk(id);

    if (!historico) {
      return res.status(404).json({
        msg: 'Histórico no encontrado'
      });
    }

    // Obtener el nombre original del archivo
    const originalName = file.originalname;

    // Crear la ruta completa para guardar el archivo
    const filePath = path.join('C:/Historicos', originalName);

    // Guardar el archivo en el sistema de archivos
    fs.writeFileSync(filePath, file.buffer);

    // Actualizar la base de datos con la URL del archivo (puedes guardar solo el nombre si no necesitas la ruta completa)
    await Historicos.update(
      { archivo: filePath }, // Guarda solo el nombre del archivo en la base de datos
      {
        where: {
          id: id,
        },
      }
    );

    // Responder con éxito
    return res.status(200).json({
      msg: 'Archivo PDF actualizado exitosamente',
      filePath: filePath // Opcional: Devuelve la ruta donde se guardó el archivo
    });
  } catch (error) {
    console.error('Error al actualizar el archivo PDF:', error);
    return res.status(500).json({
      msg: 'Error al actualizar el archivo PDF',
      error: error
    });
  }
};

export const verPDFHistorico = async (req: Request, res: Response) => {
  const { filename } = req.body; // Obtener el nombre del archivo del cuerpo de la solicitud

  if (!filename) {
    return res.status(400).send('Nombre del archivo no proporcionado');
  }

  // Normalizar el nombre del archivo para evitar problemas de ruta
  const sanitizedFilename = path.basename(filename);

  // Construir la ruta del archivo en el servidor
  const filePath = path.join('C:/Historicos', sanitizedFilename);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send('Archivo no encontrado');
    }

    // Configurar el encabezado de respuesta para el tipo de archivo PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${sanitizedFilename}"`);

    res.sendFile(filePath, (err) => {
      if (err) {
        res.status(500).send('Error al enviar el archivo');
      }
    });
  });
};