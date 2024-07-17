import React from 'react';
import { Document, Page, Text, View, Image } from '@react-pdf/renderer';
import styles from '../resources/style/style_Generator_PDF';

interface GeneratorPDFProps {
  numero_reporte: string;
  
}

const GeneratorPDF: React.FC<GeneratorPDFProps> = ({ numero_reporte }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image src="cartera-vencida/src/resources/images/logoEpema.jpg" style={styles.logo} />
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
