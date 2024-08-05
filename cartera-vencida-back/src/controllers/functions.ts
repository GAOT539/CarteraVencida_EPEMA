import fs from 'fs';
import { parseString } from 'xml2js';
import axios from 'axios';
import { ParsedXML, ParsedXMLP, Contribuyente, ContribuyenteP, CarteraNombresPuestos, } from './interfaces';
let listaGuardada: any[] = [];
// Función para leer y parsear el archivo XML
export const leerYParsearXML = (filePath: string): Promise<ParsedXML> => {
    return new Promise((resolve, reject) => {
        const xmlData = fs.readFileSync(filePath, 'utf-8');
        parseString(xmlData, { explicitArray: false }, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result as ParsedXML);
            }
        });
    });
};
// Función para leer y parsear el archivo XML puestos
export const leerYParsearXMLP = (filePath: string): Promise<ParsedXMLP> => {
    return new Promise((resolve, reject) => {
        const xmlData = fs.readFileSync(filePath, 'utf-8');
        parseString(xmlData, { explicitArray: false }, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result as ParsedXMLP);
            }
        });
    });
};

// Función para limpiar cadenas
export const cleanString = (str: string) => {
    return str.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').replace(/\s+/g, ' ').trim();
};

// Función para obtener la fecha y hora actuales
const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0'); 
    return `${year}-${day}-${month}`;
  };

// Función para transformar contribuyente
export const transformarContribuyente = (contribuyente: any, nave: string) => {
    return {
        ciu: contribuyente.GEN01CODI,
        bodega: contribuyente.NUMBODEGA ? contribuyente.NUMBODEGA : 'Cubiculo',
        nave: cleanString(nave),
        seccion: contribuyente.ACTIVIDAD ? contribuyente.ACTIVIDAD : 'Cubiculo',
        fecha: formatDate(new Date()),
        valor: contribuyente.VALOR,
        meses: contribuyente.MESES
    };
};
//Funcion para transformar contribuente Puestos
export const transformarContribuyenteP = (contribuyente: ContribuyenteP, nave: string) => {
    const puesto = contribuyente.TITU && contribuyente.TITU.trim() ? contribuyente.TITU : 'Cubiculo';
    return {
        ciu: contribuyente.REN57PCIUINQUILINO,
        puesto: puesto,
        nave: cleanString(nave),
        seccion: contribuyente.REN57CARA01 ? contribuyente.REN57CARA01 : 'Cubiculo',
        fecha: formatDate(new Date()),
        valor: contribuyente.TOTAL,
        meses: contribuyente.MESES
    };
};


// Función para filtrar y transformar contribuyentes
export const filtrarYTransformarContribuyentes = (obj: any) => {
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
//Funcion
export const filtrarYTransformarContribuyentesP = (obj: CarteraNombresPuestos) => {
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

                                    contribuyentesTransformados.push(transformarContribuyenteP(contribuyente, nave));
                                }
                            }
                        } else if (contribuyentes) {
                            if (Number(contribuyentes.MESES) > 3) {
                                contribuyentesTransformados.push(transformarContribuyenteP(contribuyentes, nave));
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
                            contribuyentesTransformados.push(transformarContribuyenteP(contribuyente, nave));
                        }
                    }
                } else if (contribuyentes) {
                    if (Number(contribuyentes.MESES) > 3) {
                        contribuyentesTransformados.push(transformarContribuyenteP(contribuyentes, nave));
                    }
                }
            }
        } else if (typeof obj[key] === 'object') {
            contribuyentesTransformados.push(...filtrarYTransformarContribuyentesP(obj[key]));
        }
    }
    return contribuyentesTransformados;
};

// Función para obtener el siguiente número de reporte
export const obtenerSiguienteNumeroReporte = async () => {
    const numeroReporteResponse = await axios.get('http://localhost:3001/api/numeroreporte');
    return numeroReporteResponse.data.siguienteNumeroReporte;
};

// Función para crear y enviar un nuevo histórico
export const crearYEnviarHistorico = async (contribuyente: any, contador: number) => {
    let cantNotificaciones = 1
    const actividadTransformada = contribuyente.seccion.includes('�') ? contribuyente.seccion.replace(/�/g, 'Ñ') : contribuyente.seccion;
    if (listaGuardada.length != 0) {
        // Verificar si el contribuyente está en la lista guardada
        const registroExistente = listaGuardada.find((registro: any) =>
            registro.ciu == contribuyente.ciu &&
            (registro.bodega == contribuyente.bodega ||
                registro.puesto == contribuyente.puesto) &&
            registro.nave == contribuyente.nave &&
            registro.seccion == actividadTransformada
        );

        // Ajustar cantNotificaciones
        cantNotificaciones = registroExistente ? registroExistente.cantNotificaciones + 1 : 1;
        if (cantNotificaciones > 3) {
            actualizarRegistrosNotificacionesTres([registroExistente])
        }
    }

    if (cantNotificaciones <= 3) {
        const nuevoHistorico = {
            ciu: contribuyente.ciu,
            numero_reporte: contador,
            bodega: contribuyente.bodega ?contribuyente.bodega : null,
            puesto: contribuyente.puesto ?contribuyente.puesto : null,
            nave: contribuyente.nave,
            seccion: actividadTransformada,
            fecha: formatDate(new Date()),
            meses: parseInt(contribuyente.meses),
            cantNotificaciones: cantNotificaciones,
            archivo: null,
            valor: parseFloat(contribuyente.valor),
            pagado: 'NO',
            esHistorico: 'NO'
        };

        await axios.post('http://localhost:3001/api/', nuevoHistorico);
        return nuevoHistorico
    } else {
        return null
    }

};

// Función para obtener registros con pagado NO y esHistorico NO
export const obtenerRegistrosNoPagadosNoHistoricos = async (tipo: 'puestos' | 'bodegas') => {
    try {
        const endpoint = tipo === 'puestos' ? 'http://localhost:3001/api/puesto/pagados' : 'http://localhost:3001/api/bodega/pagados';
        const response = await axios.get(endpoint);
        // Verificar si hay datos
        if (!response.data) {
            console.warn('No se encontraron registros en la base de datos.');
            return [];
        }

        listaGuardada = response.data;
        return response.data;
    } catch (error) {
        console.error('Error al obtener registros:', error);
        return [];
    }
};



// Función para actualizar registros a pagado SI y esHistorico SI en lotes de 5
export const actualizarRegistrosPagadosHistoricos = async (registros: any[]) => {
    if (registros.length === 0) {
        console.warn('No hay registros para actualizar.');
        return;
    }

    const batchSize = 5; // Tamaño del lote

    for (let i = 0; i < registros.length; i += batchSize) {
        const batch = registros.slice(i, i + batchSize);

        const updatePromises = batch.map(async (registro) => {
            try {
                await axios.put(`http://localhost:3001/api/${registro.id}`, {
                    pagado: 'SI',
                    esHistorico: 'SI'
                });
            } catch (error) {
                console.error(`Error al actualizar registro con id ${registro.id}:`, error);
                throw error;  // Lanza el error para manejarlo en el lugar donde se llama a esta función
            }
        });

        try {
            await Promise.all(updatePromises);
        } catch (error) {
            console.error('Error al actualizar registros del lote:', error);
            // Decide si deseas continuar con los siguientes lotes o detener la ejecución
        }
    }
};

// Función para actualizar registros a esHistorico SI cuando cantNotificaciones es 3 en lotes de 5
export const actualizarRegistrosNotificacionesTres = async (registros: any[]) => {
    if (registros.length === 0) {
        console.warn('No hay registros con cantNotificaciones igual a 3 para actualizar.');
        return;
    }

    const batchSize = 5; // Tamaño del lote
    for (let i = 0; i < registros.length; i += batchSize) {
        const batch = registros.slice(i, i + batchSize);
        
        const updatePromises = batch.map(async (registro) => {
            try {
                const response = await axios.get(`http://localhost:3001/api/relacionados/${registro.id}`);
                
                if (Array.isArray(response.data) && response.data.length > 0) {
                    const relatedUpdatePromises = response.data.map(async (respuesta) => {
                        try {
                            await axios.put(`http://localhost:3001/api/${respuesta.id}`, {
                                pagado: 'NO',
                                esHistorico: 'SI'
                            });
                        } catch (error) {
                            console.error(`Error al actualizar el registro relacionado con id ${respuesta.id}:`, error);
                            throw error;
                        }
                    });

                    await Promise.all(relatedUpdatePromises);
                } else {
                    console.warn(`No se encontraron historicos asociados para el registro con id ${registro.id}`);
                }
            } catch (error) {
                console.error(`Error al obtener los datos relacionados para el registro con id ${registro.id}:`, error);
                throw error;
            }
        });

        try {
            await Promise.all(updatePromises);
        } catch (error) {
            console.error('Error al actualizar registros del lote:', error);
            throw error; 
        }
    }
};

// Función para filtrar contribuyentes transformados
export const filtrarContribuyentesTransformados = async (contribuyentesTransformados: any[], tipo: 'puestos' | 'bodegas') => {
    const registrosNoPagadosNoHistoricos = await obtenerRegistrosNoPagadosNoHistoricos(tipo);
    const registrosPagados: any[] = [];
    const registrosNotificacionesTres: any[] = [];

    // Copia de los contribuyentes transformados para eliminar los que cumplan la condición
    let contribuyentesRestantes = [...contribuyentesTransformados];

    // Filtra los contribuyentes transformados
    const contribuyentesFiltrados = contribuyentesTransformados.filter((contribuyente: any) => {
        let existeEnBaseDatos;
        if (contribuyente.puesto === undefined) {
            existeEnBaseDatos = registrosNoPagadosNoHistoricos.find((registro: any) =>
                registro.bodega == contribuyente.bodega &&
                registro.ciu == contribuyente.ciu &&
                registro.nave == contribuyente.nave &&
                registro.seccion == (contribuyente.seccion.includes('�') ? contribuyente.seccion.replace(/�/g, 'Ñ') : contribuyente.seccion) 
                
            );
        } else {
            existeEnBaseDatos = registrosNoPagadosNoHistoricos.find((registro: any) =>
                registro.puesto == contribuyente.puesto &&
                registro.ciu == contribuyente.ciu &&
                registro.nave == contribuyente.nave &&
                registro.seccion == (contribuyente.seccion.includes('�') ? contribuyente.seccion.replace(/�/g, 'Ñ') : contribuyente.seccion)
            );
        }

        if (!existeEnBaseDatos) {
            return true;
        } else {
            if (existeEnBaseDatos.cantNotificaciones == 3) { 
                registrosNotificacionesTres.push(existeEnBaseDatos);
            }
            return false;
        }
    });

    // Agregar registros que existen en la base de datos pero no en contribuyentesTransformados
    registrosNoPagadosNoHistoricos.forEach((registro: any) => {
        const existeEnTransformados = contribuyentesTransformados.find((contribuyente: any) =>
            registro.ciu == contribuyente.ciu &&
            registro.nave == contribuyente.nave &&
            registro.seccion == (contribuyente.seccion.includes('�') ? contribuyente.seccion.replace(/�/g, 'Ñ') : contribuyente.seccion) &&
            (
                (registro.puesto == contribuyente.puesto) ||
                (registro.bodega == contribuyente.bodega)
            )
        );

        if (!existeEnTransformados) {
            registrosPagados.push(registro);
        }
    });

    // Eliminar de contribuyentesRestantes los que están en registrosPagados y registrosNotificacionesTres
    contribuyentesRestantes = contribuyentesRestantes.filter((contribuyente: any) => {
        const noEnPagados = !registrosPagados.find((registro: any) =>
            registro.ciu == contribuyente.ciu &&
            registro.nave == contribuyente.nave &&
            registro.seccion == (contribuyente.seccion.includes('�') ? contribuyente.seccion.replace(/�/g, 'Ñ') : contribuyente.seccion) &&
            (
                (registro.puesto == contribuyente.puesto) ||
                (registro.bodega == contribuyente.bodega)
            )
        );

        const noEnNotificacionesTres = !registrosNotificacionesTres.find((registro: any) =>
            registro.ciu == contribuyente.ciu &&
            registro.nave == contribuyente.nave &&
            registro.seccion == (contribuyente.seccion.includes('�') ? contribuyente.seccion.replace(/�/g, 'Ñ') : contribuyente.seccion) &&
            (
                (registro.puesto == contribuyente.puesto) ||
                (registro.bodega == contribuyente.bodega)
            )
        );

        return noEnPagados && noEnNotificacionesTres;
    });
    await actualizarRegistrosPagadosHistoricos(registrosPagados);
    await actualizarRegistrosNotificacionesTres(registrosNotificacionesTres);

    return contribuyentesRestantes;
};
