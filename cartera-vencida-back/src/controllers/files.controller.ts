import { Request, Response } from 'express';
import { parseString } from 'xml2js';
import fs from 'fs';
import multer from 'multer';

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

