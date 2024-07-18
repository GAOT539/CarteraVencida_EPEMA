import React, { useState } from "react";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        paddingTop: 28.35,
        paddingRight: 28.35,
        paddingBottom: 28.35,
        paddingLeft: 28.35
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    logo: {
        width: 50,
        height: 50,
        marginRight: 10
    },
    title: {
        fontFamily: 'Helvetica-Bold',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        flex: 1
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        marginVertical: 10
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    notification: {
        fontFamily: 'Helvetica',
        fontWeight: 'bold',
        fontSize: 12,
        color: 'white',
        backgroundColor: '#181818',
        padding: 4,
        borderRadius: 2
    },
    reportNumber_N: {
        fontFamily: 'Helvetica',
        fontSize: 12,
        color: 'red'
    },
    reportNumber: {
        fontFamily: 'Helvetica-Bold',
        fontSize: 12,
        fontWeight: 'bold'
    },
});

const MyDocument = ({ numero_reporte }: { numero_reporte: string }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <Image
                    style={styles.logo}
                    source={require("../resources/images/logoFill.png")}
                />
                <Text style={styles.title}>
                    EMPRESA PÚBLICA – EMPRESA MUNICIPAL{"\n"}
                    MERCADO MAYORISTA AMBATO
                </Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.notification}>NOTIFICACION CARTERA VENCIDA</Text>
                <View style={styles.row}>
                    <Text style={styles.reportNumber}>Nº</Text>
                    <Text style={styles.reportNumber_N}>{numero_reporte}</Text>
                </View>
            </View>
            <View style={styles.separator} />
        </Page>
    </Document>
);

const GeneradorPDFv02 = () => {
    const [numero_reporte, setnumero_reporte] = useState<string>("");

    const handleNumero_reporteChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        setnumero_reporte(event.target.value);

    const [loading, setLoading] = useState(false);

    const handleDownload = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    return (
        <div>
            <h1>Generador de PDF</h1>
            <label htmlFor="numero_reporte">Nº Reporte:</label>
            <input
                type="text"
                id="numero_reporte"
                value={numero_reporte}
                onChange={handleNumero_reporteChange}
            />
            <br />
            <PDFDownloadLink
                document={<MyDocument numero_reporte={numero_reporte} />}
                fileName="notificacion.pdf"
                onClick={handleDownload}
            >
                {({ loading }) => (
                    <button disabled={loading}>
                        {loading ? "Generando..." : "Generar PDF"}
                    </button>
                )}
            </PDFDownloadLink>
            {loading && <p>Generando PDF...</p>}
        </div>
    );
};

export default GeneradorPDFv02;
