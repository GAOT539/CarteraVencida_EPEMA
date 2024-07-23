import { Document, Page, Text, View, Image, Font, pdf } from "@react-pdf/renderer";
import styles from "../resources/style/style_Generator_PDF";

Font.register({
  family: "Roboto",
  fonts: [
    { src: require("../resources/fonts/Roboto/Roboto-Regular.ttf") },
    { src: require("../resources/fonts/Roboto/Roboto-Black.ttf"), fontWeight: "bold" },
    { src: require("../resources/fonts/Roboto/Roboto-Italic.ttf"), fontStyle: "italic" }]
});

const hyphenationCallback = (word: any) => [word];

const MyDocument = (selectedRow: any) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image style={styles.logo} src={require("../resources/images/logoEpema.jpg")} />
        <Text style={styles.title}>
          EMPRESA PUBLICA – EMPRESA MUNICIPAL{"\n"}
          MERCADO MAYORISTA AMBATO
        </Text>
      </View>
      
      <View style={styles.row}>
        <Text style={styles.notification}>NOTIFICACION CARTERA VENCIDA</Text>
        <Text style={styles.reportNumber}>Nº <Text style={styles.reportNumber_N}>{selectedRow.numero_reporte}</Text></Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.section01}>
        <View style={styles.row}>
          <Text style={styles.texts}>FECHA: <Text style={styles.texts_Blod}>{selectedRow.fecha}</Text></Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.texts}>HORA: ________</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.texts}>CIU: <Text style={styles.texts_Blod}>{selectedRow.ciu}</Text></Text>
        </View>
      </View>
      <View style={styles.section02}>
        <View style={styles.wrap}>
          <Text style={styles.texts} hyphenationCallback={hyphenationCallback}>
            Se notifica al Sr./Sra: <Text style={styles.texts_Blod}>{selectedRow.nombre}</Text> CC/RUC: <Text style={styles.texts_Blod}>{selectedRow.cedula}</Text> arrendatario/a del puesto/bodega/local/núcleo/cubículo Nº <Text style={styles.texts_Blod}>{selectedRow.puesto}</Text> de la nave <Text style={styles.texts_Blod}>{selectedRow.nave}</Text> sección <Text style={styles.texts_Blod}>{selectedRow.seccion}</Text> que mantiene pendiente de pago de <Text style={styles.texts_Blod}>{selectedRow.meses}</Text> meses por la ocupación de espacio arrendado. {"\n"}{"\n"}
            Por lo que se le informa que tiene el plazo de cuarenta y ocho (48) horas, una vez recibida esta notificación, para cumplir con sus obligaciones.{"\n"}{"\n"}
            En caso de no dar cumplimiento con lo dispuesto, se procederá a declarar vacante de acuerdo al REGLAMENTO DE FUNCIONAMIENTO INTERNO DEL MERCADO MAYORISTA AMBATO, según la SECCIÓN SEGUNDA DE LA DECLARATORIA UNILATERAL DE VACANTE DE BODEGAS, LOCALES, CUBÍCULOS, NÚCLEOS Y PUESTOS, Art. 23 literal e) que dispone: "Por mora en el pago de tres mensualidades consecutivas".
          </Text>
        </View>
      </View>
      
    </Page>
  </Document>
);

export const generarPDF = async (selectedRow: any) => {
    const doc = <MyDocument {...selectedRow} />;
    const asPdf = pdf(); // No necesita argumentos
    asPdf.updateContainer(doc); // Pasamos el componente React aquí
    const blob = await asPdf.toBlob(); // Crea un blob del documento
    return blob;
  };
