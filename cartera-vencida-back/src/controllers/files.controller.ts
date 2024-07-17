import { Request, Response } from 'express';
import { parseString } from 'xml2js';
import fs from 'fs';
import multer from 'multer';
import xml2js from 'xml2js';

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
    const file = req.file;
  if (!file) {
    return res.status(400).json({
      msg: 'No se ha proporcionado ningún archivo'
    });
  }
  try {
    const xmlData = fs.readFileSync(file.path, 'utf-8');
    parseString(xmlData, { explicitArray: false }, (err, result) => {
      if (err) {
        console.error('Error al parsear el archivo XML:', err);
        return res.status(500).json({
          msg: 'Error al parsear el archivo XML',
          error: err.message
        });
      }
      const cleanString = (str: string) => {
        return str.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').replace(/\s+/g, ' ').trim();
      };
      const getCurrentDateTime = () => {
        const now = new Date();
        return now.toLocaleDateString();
      };
      const transformarContribuyente = (contribuyente: any, nave: string) => ({
        ciu: contribuyente.GEN01CODI,
        bodega: contribuyente.NUMBODEGA ? contribuyente.NUMBODEGA : 'Cubiculo',
        nave: cleanString(nave),
        seccion: contribuyente.ACTIVIDAD ? contribuyente.ACTIVIDAD : 'Cubiculo',
        fecha: getCurrentDateTime(),
        valor: contribuyente.VALOR
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
      res.json(contribuyentesTransformados);
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
  
    if (!file) {
      return res.status(400).json({
        msg: 'No se ha proporcionado ningún archivo'
      });
    }
    try {
      const xmlData = fs.readFileSync(file.path, 'utf-8');
      parseString(xmlData, { explicitArray: false }, (err, result) => {
        if (err) {
          console.error('Error al parsear el archivo XML:', err);
          return res.status(500).json({
            msg: 'Error al parsear el archivo XML',
            error: err.message
          });
        }
        const cleanString = (str: string) => {
          return str.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').replace(/\s+/g, ' ').trim();
        };
        const getCurrentDateTime = () => {
          const now = new Date();
          return now.toLocaleDateString();
        };
        const transformarContribuyente = (contribuyente: any, nave: string) => ({
          ciu: contribuyente.REN57PCIUINQUILINO,
          puesto: contribuyente.TITU ? contribuyente.TITU : 'Cubiculo',
          nave: cleanString(nave),
          seccion: contribuyente.REN57CARA01 ? contribuyente.REN57CARA01 : 'Cubiculo',
          fecha: getCurrentDateTime(),
          valor: contribuyente.TOTAL
        });
        const filtrarYTransformarContribuyentes = (obj: any) => {
          const contribuyentesTransformados: any[] = [];
          for (const key in obj) {
            if (key.startsWith('LIST')) { // Verificar si la clave empieza con 'LIST'
              const list = obj[key].G_NAVES;
              if (Array.isArray(list)) {
                for (const gNaves of list) {
                  if (gNaves.NAVES && gNaves.NAVES.trim() !== '') { // Verificar si NAVES no está vacío
                    const nave = gNaves.NAVES;
                    const contribuyentes = gNaves.LIST_G_CONTRIBUYENTE.G_CONTRIBUYENTE;
                    if (Array.isArray(contribuyentes)) {
                      for (const contribuyente of contribuyentes) {
                        if (Number(contribuyente.MESES) > 3) { // Filtrar por MESES > 3
                          contribuyentesTransformados.push(transformarContribuyente(contribuyente, nave));
                        }
                      }
                    } else if (contribuyentes) {
                      if (Number(contribuyentes.MESES) > 3) { // Filtrar por MESES > 3
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
  
        // Devolver los contribuyentes transformados en formato JSON
        res.json(contribuyentesTransformados);
      });
    } catch (error) {
      console.error('Error al leer el archivo XML:', error);
      return res.status(500).json({
        msg: 'Error al leer el archivo XML',
        error: error
      });
    }
  };