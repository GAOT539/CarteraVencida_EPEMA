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
