import { Request, Response } from 'express';
import { parseString } from 'xml2js';
import fs from 'fs';
import multer from 'multer';
import axios from 'axios';
import Contribuyentes from '../models/contributors.models';
import Historicos from '../models/historical.models';
import { Op } from 'sequelize';

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
  let contador = 0;
  const file = req.file;
  if (!file) {
    return res.status(400).json({
      msg: 'No se ha proporcionado ningún archivo'
    });
  }

  try {
    const xmlData = fs.readFileSync(file.path, 'utf-8');
    parseString(xmlData, { explicitArray: false }, async (err, result) => {
      if (err) {
        console.error('Error al parsear el archivo XML:', err);
        return res.status(500).json({
          msg: 'Error al parsear el archivo XML',
          error: err.message
        });
      }

      const cleanString = (str: string) => str.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').replace(/\s+/g, ' ').trim();
      
      const getCurrentDateTime = () => new Date().toLocaleDateString();
      const transformarFecha = (fecha: string) => {
        const [day, month, year] = fecha.split('/');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      };

      const transformarContribuyente = (contribuyente: any, nave: string) => ({
        ciu: contribuyente.GEN01CODI,
        bodega: contribuyente.NUMBODEGA ? contribuyente.NUMBODEGA : 'Cubiculo',
        nave: cleanString(nave),
        seccion: contribuyente.ACTIVIDAD ? contribuyente.ACTIVIDAD : 'Cubiculo',
        fecha: getCurrentDateTime(),
        valor: contribuyente.VALOR,
        meses: contribuyente.MESES
      });

      const filtrarYTransformarContribuyentes = (obj: any) => {
        const contribuyentesTransformados: any[] = [];
        for (const key in obj) {
          if (key.startsWith('LIST')) {
            const list = obj[key].G_NAVE;
            if (Array.isArray(list)) {
              for (const gNave of list) {
                if (gNave.NAVE && gNave.NAVE.trim() !== '') {
                  const nave = gNave.NAVE;
                  const contribuyentes = gNave.LIST_G_CONTRIBUYENTE.G_CONTRIBUYENTE;
                  if (Array.isArray(contribuyentes)) {
                    for (const contribuyente of contribuyentes) {
                      if (Number(contribuyente.MESES) > 3) {
                        contribuyentesTransformados.push(transformarContribuyente(contribuyente, nave));
                      }
                    }
                  } else if (contribuyentes) {
                    if (Number(contribuyentes.MESES) > 3) {
                      contribuyentesTransformados.push(transformarContribuyente(contribuyentes, nave));
                    }
                  }
                }
              }
            } else if (list && list.NAVE && list.NAVE.trim() !== '') {
              const nave = list.NAVE;
              const contribuyentes = list.LIST_G_CONTRIBUYENTE.G_CONTRIBUYENTE;
              if (Array.isArray(contribuyentes)) {
                for (const contribuyente of contribuyentes) {
                  if (Number(contribuyente.MESES) > 3) {
                    contribuyentesTransformados.push(transformarContribuyente(contribuyente, nave));
                  }
                }
              } else if (contribuyentes) {
                if (Number(contribuyentes.MESES) > 3) {
                  contribuyentesTransformados.push(transformarContribuyente(contribuyentes, nave));
                }
              }
            }
          } else if (typeof obj[key] === 'object') {
            contribuyentesTransformados.push(...filtrarYTransformarContribuyentes(obj[key]));
          }
        }
        return contribuyentesTransformados;
      };

      const contribuyentesTransformados = filtrarYTransformarContribuyentes(result.CARTERANOMBRESBODE);

      // Obtener el siguiente número de reporte
      const numeroReporteResponse = await axios.get('http://localhost:3001/api/numeroreporte');
      const siguienteNumeroReporte = numeroReporteResponse.data.siguienteNumeroReporte;
      contador = siguienteNumeroReporte;
      // Obtener el listado de historicos pagados
      const historicosPagadosResponse = await axios.get('http://localhost:3001/api/bodega/pagados');
      const historicosPagados = historicosPagadosResponse.data.historicosList;

      // Crear un mapa para fácil acceso por ciu, puesto y nave
      const historicosMap = new Map();
      historicosPagados.forEach((historico: { ciu: any; puesto: any; nave: any; cantNotificaciones: any; }) => {
        const key = `${historico.ciu}-${historico.puesto}-${historico.nave}`;
        historicosMap.set(key, historico.cantNotificaciones);
      });

      // Recorrer los contribuyentes transformados y hacer la solicitud POST
      for (const contribuyente of contribuyentesTransformados) {
        const key = `${contribuyente.ciu}-${contribuyente.puesto}-${contribuyente.nave}`;
        const cantNotificaciones = historicosMap.has(key) ? historicosMap.get(key) : 0;
        const nuevoHistorico = {
          ciu: contribuyente.ciu,
          numero_reporte: contador,
          bodega: contribuyente.bodega,
          puesto: null,
          nave: contribuyente.nave,
          seccion: contribuyente.seccion,
          fecha: transformarFecha(contribuyente.fecha),
          meses: parseInt(contribuyente.meses),
          cantNotificaciones: cantNotificaciones,
          archivo: null,
          valor: parseFloat(contribuyente.valor),
          pagado: 'NO'
        };
        contador++;
        await axios.post('http://localhost:3001/api/', nuevoHistorico);
      }

      res.json({
        msg: 'Todos los registros se han guardado satisfactoriamente.'
      });

    });
  } catch (error) {
    console.error('Error al leer el archivo XML:', error);
    return res.status(500).json({
      msg: 'Error al leer el archivo XML',
      error: error
    });
  }
};
// Método para obtener todos los registros con cartera vencida de puestos
export const carteraVencidaPuestos = async (req: Request, res: Response) => {
  const file = req.file;
  let contador = 0;
  if (!file) {
    return res.status(400).json({
      msg: 'No se ha proporcionado ningún archivo'
    });
  }

  try {
    const xmlData = fs.readFileSync(file.path, 'utf-8');
    parseString(xmlData, { explicitArray: false }, async (err, result) => {
      if (err) {
        console.error('Error al parsear el archivo XML:', err);
        return res.status(500).json({
          msg: 'Error al parsear el archivo XML',
          error: err.message
        });
      }

      const cleanString = (str: string) => str.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').replace(/\s+/g, ' ').trim();

      const transformarFecha = (fecha: string) => {
        const [day, month, year] = fecha.split('/');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      };

      const getCurrentDateTime = () => new Date().toLocaleDateString();

      const transformarContribuyente = (contribuyente: any, nave: string) => ({
        ciu: contribuyente.REN57PCIUINQUILINO,
        puesto: contribuyente.TITU ? contribuyente.TITU : 'Cubiculo',
        nave: cleanString(nave),
        seccion: contribuyente.REN57CARA01 ? contribuyente.REN57CARA01 : 'Cubiculo',
        fecha: getCurrentDateTime(),
        valor: contribuyente.TOTAL,
        meses: contribuyente.MESES
      });

      const filtrarYTransformarContribuyentes = (obj: any) => {
        const contribuyentesTransformados: any[] = [];
        for (const key in obj) {
          if (key.startsWith('LIST')) {
            const list = obj[key].G_NAVES;
            if (Array.isArray(list)) {
              for (const gNaves of list) {
                if (gNaves.NAVES && gNaves.NAVES.trim() !== '') {
                  const nave = gNaves.NAVES;
                  const contribuyentes = gNaves.LIST_G_CONTRIBUYENTE.G_CONTRIBUYENTE;
                  if (Array.isArray(contribuyentes)) {
                    for (const contribuyente of contribuyentes) {
                      if (Number(contribuyente.MESES) > 3) {
                        contribuyentesTransformados.push(transformarContribuyente(contribuyente, nave));
                      }
                    }
                  } else if (contribuyentes) {
                    if (Number(contribuyentes.MESES) > 3) {
                      contribuyentesTransformados.push(transformarContribuyente(contribuyentes, nave));
                    }
                  }
                }
              }
            } else if (list && list.NAVES && list.NAVES.trim() !== '') {
              const nave = list.NAVES;
              const contribuyentes = list.LIST_G_CONTRIBUYENTE.G_CONTRIBUYENTE;
              if (Array.isArray(contribuyentes)) {
                for (const contribuyente of contribuyentes) {
                  if (Number(contribuyente.MESES) > 3) {
                    contribuyentesTransformados.push(transformarContribuyente(contribuyente, nave));
                  }
                }
              } else if (contribuyentes) {
                if (Number(contribuyentes.MESES) > 3) {
                  contribuyentesTransformados.push(transformarContribuyente(contribuyentes, nave));
                }
              }
            }
          } else if (typeof obj[key] === 'object') {
            contribuyentesTransformados.push(...filtrarYTransformarContribuyentes(obj[key]));
          }
        }
        return contribuyentesTransformados;
      };

      // Filtrar y transformar G_CONTRIBUYENTE de todos los G_NAVES
      const contribuyentesTransformados = filtrarYTransformarContribuyentes(result.CARTERANOMBRESPUESTOS);

      // Obtener el siguiente número de reporte
      const numeroReporteResponse = await axios.get('http://localhost:3001/api/numeroreporte');
      const siguienteNumeroReporte = numeroReporteResponse.data.siguienteNumeroReporte;
      contador = siguienteNumeroReporte;
      // Obtener el listado de historicos pagados
      const historicosPagadosResponse = await axios.get('http://localhost:3001/api/puesto/pagados');
      const historicosPagados = historicosPagadosResponse.data.historicosList;

      // Crear un mapa para fácil acceso por ciu, puesto y nave
      const historicosMap = new Map();
      historicosPagados.forEach((historico: { ciu: any; puesto: any; nave: any; cantNotificaciones: any; }) => {
        const key = `${historico.ciu}-${historico.puesto}-${historico.nave}`;
        historicosMap.set(key, historico.cantNotificaciones);
      });

      // Recorrer los contribuyentes transformados y hacer la solicitud POST
      for (const contribuyente of contribuyentesTransformados) {
        const key = `${contribuyente.ciu}-${contribuyente.puesto}-${contribuyente.nave}`;
        const cantNotificaciones = historicosMap.has(key) ? historicosMap.get(key) : 0;

        const nuevoHistorico = { 
          ciu: contribuyente.ciu,
          numero_reporte: contador,
          bodega: null,
          puesto: contribuyente.puesto,
          nave: contribuyente.nave,
          seccion: contribuyente.seccion,
          fecha: transformarFecha(contribuyente.fecha),
          meses: parseInt(contribuyente.meses),
          cantNotificaciones: cantNotificaciones, 
          archivo: null,
          valor: parseFloat(contribuyente.valor),
          pagado: 'NO'
        };
        contador++;
        await axios.post('http://localhost:3001/api/', nuevoHistorico);
      }

      res.json({
        msg: 'Todos los registros se han guardado satisfactoriamente.'
      });

    });
  } catch (error) {
    console.error('Error al leer el archivo XML:', error);
    return res.status(500).json({
      msg: 'Error al leer el archivo XML',
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
