
// Definir las interfaces para los tipos de datos del XML
export interface Contribuyente {
    GEN01CODI: string;
    NUMBODEGA?: string;
    ACTIVIDAD?: string;
    VALOR: string;
    MESES: string;
}

export interface ContribuyenteP {
    REN57PCIUINQUILINO: string;
    TITU?: string;
    REN57CARA01?: string;
    TOTAL: string;
    MESES: string;
}

export interface GNave {
    NAVE: string;
    LIST_G_CONTRIBUYENTE: {
        G_CONTRIBUYENTE: Contribuyente | Contribuyente[];
    };
}
export interface GNaves {
    NAVES: string;
    LIST_G_CONTRIBUYENTE: {
        G_CONTRIBUYENTE: ContribuyenteP | ContribuyenteP[];
    };
}

export interface CarteraNombresBode {
    [key: string]: any;
    G_NAVE?: GNave | GNave[];
}
export interface CarteraNombresPuestos {
    [key: string]: any;
    G_NAVES?: GNaves | GNaves[];
}

export interface ParsedXML {
    CARTERANOMBRESBODE: CarteraNombresBode;
}
export interface ParsedXMLP {
    CARTERANOMBRESPUESTOS: CarteraNombresPuestos;
}

