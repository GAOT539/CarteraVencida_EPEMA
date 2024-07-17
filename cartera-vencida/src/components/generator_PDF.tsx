import React from 'react';
import { Document, Page, Text, View, Image, Font } from '@react-pdf/renderer';
import styles from '../resources/style/style_Generator_PDF';

Font.register({
    family: 'Roboto',
    fonts: [
        { src: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Me5WZLCzYlKw.ttf' }, // Regular
        { src: 'https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmWUlfBBc4AMP6lQ.ttf', fontWeight: 'bold' }, // Bold
    ]
});

Font.register({
    family: 'Noto Sans TC',
    fonts: [
        { src: 'https://fonts.gstatic.com/s/notosanstc/v12/-nFzOGc18vARCo9D6h25eiQhCk-hJz8Is0elFvs.ttf' }, // Regular
        { src: 'https://fonts.gstatic.com/s/notosanstc/v12/-nF3OGc18vARCo9D6h25eiQhCk-hE-oJslMpN3xNHg.ttf', fontWeight: 'bold' }, // Bold
    ]
});

interface GeneratorPDFProps {
    numero_reporte: string;
}

const GeneratorPDF: React.FC<GeneratorPDFProps> = ({ numero_reporte }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <Image src={require('../resources/images/logoEpema.jpg')} style={styles.logo} />
                <Text style={styles.title}>
                    EMPRESA PÚBLICA – EMPRESA MUNICIPAL MERCADO MAYORISTA AMBATO
                </Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.row}>
                <Text style={styles.notification}>NOTIFICACION CARTERA VENCIDA</Text>
                <Text style={styles.reportNumber}>Nº {numero_reporte}</Text>
            </View>
        </Page>
    </Document>
);

export default GeneratorPDF;
