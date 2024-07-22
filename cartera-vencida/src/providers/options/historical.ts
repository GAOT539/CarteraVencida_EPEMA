import { API_URL } from "../data";
import axios from 'axios';

const API_HISTORICAL = `${API_URL}/api`;

// Obtener todos los registros históricos
export const getAllHistoricos = async () => {
    try {
        const response = await axios.get(API_HISTORICAL);
        const data = response.data;
        return {
            success: true,
            historicosList: data.historicosList,
        }; 
    } catch (error: any) {
        return {
            success: false,
            error: {
                message: error.response ? error.response.data.error : 'Sin respuesta desde el servidor Back-end.',
            },
        };
    }
};

// Obtener todos los registros históricos donde bodega no es null
export const getHistoricosBodegas = async () => {
    try {
        const response = await axios.get(`${API_HISTORICAL}/bodega`);
        const data = response.data;
        return {
            success: true,
            historicosWithContribuyentes: data,
        };
    } catch (error: any) {
        return {
            success: false,
            error: {
                message: error.response ? error.response.data.error : 'Sin respuesta desde el servidor Back-end.',
            },
        };
    }
};

// Obtener todos los registros históricos donde bodega no es null y pagado es NO
export const getHistoricosBodegasNoPagado = async () => {
    try {
        const response = await axios.get(`${API_HISTORICAL}/bodegas/nopagado`);
        const data = response.data;
        return {
            success: true,
            historicosList: data.historicosList,
        };
    } catch (error: any) {
        return {
            success: false,
            error: {
                message: error.response ? error.response.data.error : 'Sin respuesta desde el servidor Back-end.',
            },
        };
    }
};

// Obtener todos los registros históricos donde puesto no es null y pagado es NO
export const getHistoricosPuestosNoPagado = async () => {
    try {
        const response = await axios.get(`${API_HISTORICAL}/puestos/nopagado`);
        const data = response.data;
        return {
            success: true,
            historicosList: data.historicosList,
        };
    } catch (error: any) {
        return {
            success: false,
            error: {
                message: error.response ? error.response.data.error : 'Sin respuesta desde el servidor Back-end.',
            },
        };
    }
};

// Obtener todos los registros históricos donde puesto no es null
export const getHistoricosPuestos = async () => {
    try {
        const response = await axios.get(`${API_HISTORICAL}/puesto`);
        const data = response.data;
        return {
            success: true,
            historicosWithContribuyentes: data,
        };
    } catch (error: any) {
        return {
            success: false,
            error: {
                message: error.response ? error.response.data.error : 'Sin respuesta desde el servidor Back-end.',
            },
        };
    }
};

// Obtener registro histórico por ID
export const getHistoricoById = async (id: string) => {
    try {
        const response = await axios.get(`${API_HISTORICAL}/${id}`);
        const data = response.data;
        return {
            success: true,
            historico: data.historico,
        };
    } catch (error: any) {
        return {
            success: false,
            error: {
                message: error.response ? error.response.data.error : 'Sin respuesta desde el servidor Back-end.',
            },
        };
    }
};

// Obtener registros históricos por CIU
export const getHistoricosByCIU = async (ciu: string) => {
    try {
        const response = await axios.get(`${API_HISTORICAL}/ciu/${ciu}`);
        const data = response.data;
        return {
            success: true,
            historicos: data.historicos,
        };
    } catch (error: any) {
        return {
            success: false,
            error: {
                message: error.response ? error.response.data.error : 'Sin respuesta desde el servidor Back-end.',
            },
        };
    }
};

// Crear un nuevo registro histórico
export const addHistorico = async (historicoData: any) => {
    try {
        const response = await axios.post(API_HISTORICAL, historicoData);
        const data = response.data;
        return {
            success: true,
            historico: data,
        };
    } catch (error: any) {
        return {
            success: false,
            error: {
                message: error.response ? error.response.data.error : 'Sin respuesta desde el servidor Back-end.',
            },
        };
    }
};

// Actualizar un registro histórico por ID
export const updateHistorico = async (id: string, historicoData: any) => {
    try {
        const response = await axios.put(`${API_HISTORICAL}/${id}`, historicoData);
        const data = response.data;
        return {
            success: true,
            historico: data,
        };
    } catch (error: any) {
        return {
            success: false,
            error: {
                message: error.response ? error.response.data.error : 'Sin respuesta desde el servidor Back-end.',
            },
        };
    }
};

// Eliminar un registro histórico por ID
export const deleteHistorico = async (id: string) => {
    try {
        const response = await axios.delete(`${API_HISTORICAL}/${id}`);
        const data = response.data;
        return {
            success: true,
            message: data.msg,
        };
    } catch (error: any) {
        return {
            success: false,
            error: {
                message: error.response ? error.response.data.error : 'Sin respuesta desde el servidor Back-end.',
            },
        };
    }
};

// Marcar un registro histórico como pagado
export const payHistorico = async (id: string) => {
    try {
        const response = await axios.put(`${API_HISTORICAL}/pay/${id}`);
        const data = response.data;
        return {
            success: true,
            msg: data.msg,
        };
    } catch (error: any) {
        return {
            success: false,
            error: {
                message: error.response ? error.response.data.error : 'Sin respuesta desde el servidor Back-end.',
            },
        };
    }
};

// Obtener el siguiente número de reporte
export const obtenerNumeroReporte = async () => {
    try {
        const response = await axios.get(`${API_HISTORICAL}/numeroreporte`);
        const data = response.data;
        return {
            success: true,
            siguienteNumeroReporte: data.siguienteNumeroReporte,
        };
    } catch (error: any) {
        return {
            success: false,
            error: {
                message: error.response ? error.response.data.error : 'Sin respuesta desde el servidor Back-end.',
            },
        };
    }
};
