import { API_URL } from "../data";
import axios from 'axios';

const API_CONTRIBUTORS = `${API_URL}/contribuyentes`;

export const getAllContribuyentes = async () => {
    try {
        const response = await axios.get(API_CONTRIBUTORS);
        const data = response.data;
        return {
            success: true,
            contribuyentes: data,
        }; 
    } catch (error:any) {
        return {
            success: false,
            error: {
                message: error.response ? error.response.data.error : 'Sin respuesta desde el servidor Back-end.',
            },
        };
    }
};

export const getContribuyenteByCIU = async (ciu: string) => {
    try {
        const response = await axios.get(`${API_CONTRIBUTORS}/${ciu}`);
        const data = response.data;
        return {
            success: true,
            contribuyente: data,
        };
    } catch (error:any) {
        return {
            success: false,
            error: {
                message: error.response ? error.response.data.error : 'Sin respuesta desde el servidor Back-end.',
            },
        };
    }
};

export const addContribuyente = async (contribuyenteData: any) => {
    try {
        const response = await axios.post(API_CONTRIBUTORS, contribuyenteData);
        const data = response.data;
        return {
            success: true,
            contribuyente: data,
        };
    } catch (error:any) {
        return {
            success: false,
            error: {
                message: error.response ? error.response.data.error : 'Sin respuesta desde el servidor Back-end.',
            },
        };
    }
};

export const updateContribuyente = async (ciu: string, contribuyenteData: any) => {
    try {
        const response = await axios.put(`${API_CONTRIBUTORS}/${ciu}`, contribuyenteData);
        const data = response.data;
        return {
            success: true,
            contribuyente: data,
        };
    } catch (error:any) {
        return {
            success: false,
            error: {
                message: error.response ? error.response.data.error : 'Sin respuesta desde el servidor Back-end.',
            },
        };
    }
};

export const deleteContribuyente = async (ciu: string) => {
    try {
        const response = await axios.delete(`${API_CONTRIBUTORS}/${ciu}`);
        const data = response.data;
        return {
            success: true,
            message: data.message,
        };
    } catch (error:any) {
        return {
            success: false,
            error: {
                message: error.response ? error.response.data.error : 'Sin respuesta desde el servidor Back-end.',
            },
        };
    }
};
