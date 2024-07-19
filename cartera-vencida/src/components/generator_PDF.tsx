import React, { useState } from "react";
import { Document, Page, Text, View, PDFDownloadLink, Image, Font } from "@react-pdf/renderer";
import styles from "../resources/style/style_Generator_PDF"; // Asegúrate de que la ruta es correcta

// Registrar las fuentes
Font.register({
  family: "Roboto",
  fonts: [
    { src: require("../resources/fonts/Roboto/Roboto-Regular.ttf") }, // Ruta relativa a este archivo
    { src: require("../resources/fonts/Roboto/Roboto-Black.ttf"), fontWeight: "bold" } // Ruta relativa a este archivo
  ]
});

const hyphenationCallback = (word: any) => [word];

const MyDocument = ({ numero_reporte, fecha, ciu, contribuyente, cedula, num_puesto_bodega, nave, seccion, cant_meses }:
  { numero_reporte: string, fecha: string, ciu: string, contribuyente: string, cedula: string, num_puesto_bodega: string, nave: string, seccion: string, cant_meses: string }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          src={require("../resources/images/logoEpema.jpg")}
        />
        <Text style={styles.title}>
          EMPRESA PUBLICA – EMPRESA MUNICIPAL{"\n"}
          MERCADO MAYORISTA AMBATO
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.notification}>NOTIFICACION CARTERA VENCIDA</Text>
        <Text style={styles.reportNumber}>Nº <Text style={styles.reportNumber_N}>{numero_reporte}</Text></Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.section01}>
        <View style={styles.row}>
          <Text style={styles.texts}>FECHA: <Text style={styles.texts_Black}>{fecha}</Text></Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.texts}>HORA: ________</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.texts}>CIU: <Text style={styles.texts_Black}>{ciu}</Text></Text>
        </View>
      </View>
      <View style={styles.section02}>
        <View style={styles.wrap}>
          <Text style={styles.texts} hyphenationCallback={hyphenationCallback}>
            Se notifica al Sr./Sra: <Text style={styles.texts_Black}>{contribuyente}</Text> CC/RUC: <Text style={styles.texts_Black}>{cedula}</Text> arrendatario/a del puesto/bodega/local/núcleo/cubículo Nº <Text style={styles.texts_Black}>{num_puesto_bodega}</Text> de la nave <Text style={styles.texts_Black}>{nave}</Text> sección <Text style={styles.texts_Black}>{seccion}</Text> que mantiene pendiente de pago de <Text style={styles.texts_Black}>{cant_meses}</Text> meses por la ocupación de espacio arrendado. {"\n"}{"\n"}
            Por lo que se le informa que tiene el plazo de cuarenta y ocho (48) horas, una vez recibida esta notificación, para cumplir con sus obligaciones.{"\n"}{"\n"}
            En caso de no dar cumplimiento con lo dispuesto, se procederá a declarar vacante de acuerdo al REGLAMENTO DE FUNCIONAMIENTO INTERNO DEL MERCADO MAYORISTA AMBATO, según la SECCIÓN SEGUNDA DE LA DECLARATORIA UNILATERAL DE VACANTE DE BODEGAS, LOCALES, CUBÍCULOS, NÚCLEOS Y PUESTOS, Art. 23 literal e) que dispone: "Por mora en el pago de tres mensualidades consecutivas".
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);

const GeneradorPDF = () => {
  const [formData, setFormData] = useState({
    numero_reporte: "",
    fecha: "",
    ciu: "",
    contribuyente: "",
    cedula: "",
    num_puesto_bodega: "",
    nave: "",
    seccion: "",
    cant_meses: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

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
      {Object.keys(formData).map(key => (
        <div key={key}>
          <label htmlFor={key}>{key.replace(/_/g, " ")}:</label>
          <input
            type="text"
            id={key}
            value={(formData as any)[key]}
            onChange={handleChange}
          />
          <br />
        </div>
      ))}
      <PDFDownloadLink
        document={<MyDocument {...formData} />}
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

export default GeneradorPDF;
