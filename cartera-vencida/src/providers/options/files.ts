import { API_URL } from "../data";
import axios from 'axios';

const API_FILES = `${API_URL}/archivo`;

// Método para leer el archivo XML de bodegas
export const readXMLBodegas = async (file: string | Blob) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post(`${API_FILES}/bodegas`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return {
            success: true,
            xmlData: response.data,
        };
    } catch (error) {
        return {
            success: false,
            error: {
                message: error ? error : 'Sin respuesta desde el servidor Back-end.',
            },
        };
    }
};

// Método para obtener la cartera vencida de bodegas
export const getCarteraVencidaBodegas = async (file: string | Blob) => {
    try {
        const formData = new FormData();
        formData.append('xml', file);

        const response = await axios.post(`${API_FILES}/bodegas/contribuyentes`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            error: {
                message: error ? error : 'Sin respuesta desde el servidor Back-end.',
            },
        };
    }
};

// Método para obtener la cartera vencida de puestos
export const getCarteraVencidaPuestos = async (file: string | Blob) => {
    try {
        const formData = new FormData();
        formData.append('xml', file);

        const response = await axios.post(`${API_FILES}/puestos/contribuyentes`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            error: {
                message: error ? error : 'Sin respuesta desde el servidor Back-end.',
            },
        };
    }
};

// Método para notificar la primera vez de bodegas
export const notifyFirstBodegas = async () => {
    try {
        const response = await axios.get(`${API_FILES}/notificarprimerabodegas`);
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            error: {
                message: error ? error : 'Sin respuesta desde el servidor Back-end.',
            },
        };
    }
};

// Método para notificar la primera vez de puestos
export const notifyFirstPuestos = async () => {
    try {
        const response = await axios.get(`${API_FILES}/notificarprimerapuestos`);
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            error: {
                message: error ? error : 'Sin respuesta desde el servidor Back-end.',
            },
        };
    }
};

// Método para obtener un archivo PDF usando POST
export const getPDFFile = async (filename: string) => {
    try {
        const response = await axios.post(`${API_FILES}/historicos/ver-pdf`, { filename }, {
            responseType: 'blob', // Asegúrate de que la respuesta sea tratada como un blob
        });

        // Crear una URL para el archivo y abrirlo en una nueva pestaña
        const url = URL.createObjectURL(response.data);
        window.open(url); // Abre el archivo en una nueva pestaña

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            error: {
                message: error || 'Sin respuesta desde el servidor Back-end.',
            },
        };
    }
};

export const getPDFFileOpen = async (filename: string) => {
    try {
        const response = await axios.post(`${API_FILES}/historicos/ver-pdf`, { filename }, {
            responseType: 'blob', // Asegúrate de que la respuesta sea tratada como un blob
        });

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            error: {
                message: error || 'Sin respuesta desde el servidor Back-end.',
            },
        };
    }
};

export const uploadPDFFile = async (id: string, file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
  
      const response = await axios.post(`${API_FILES}/historicos/subir/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 200) {
        return {
          success: true,
          data: response.data,
        };
      } else {
        return {
          success: false,
          error: {
            message: 'Error al subir el archivo',
          },
        };
      }
    } catch (error) {
      return {
        success: false,
        error: {
          message: error || 'Error en la solicitud',
        },
      };
    }
  };