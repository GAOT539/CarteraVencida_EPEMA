import React, { useState } from "react";
import { Document, Page, Text, View, PDFDownloadLink, Image, Font } from "@react-pdf/renderer";
import styles from "../resources/style/style_Generator_PDF";
// Registrar las fuentes
Font.register({
  family: "Roboto",
  fonts: [
    { src: require("../resources/fonts/Roboto/Roboto-Regular.ttf") },
    { src: require("../resources/fonts/Roboto/Roboto-Black.ttf"), fontWeight: "bold" },
    { src: require("../resources/fonts/Roboto/Roboto-Italic.ttf"), fontStyle: "italic" }

  ]
});

const hyphenationCallback = (word: any) => [word];

const MyDocument = ({ numero_reporte, fecha, ciu, contribuyente, cedula, num_puesto_bodega, nave, seccion, cant_meses, boleta_Uno, boleta_Dos, boleta_Tres, boleta_Uno_Fijada, boleta_Dos_Fijada, boleta_Tres_Fijada }:
  { numero_reporte: string, fecha: string, ciu: string, contribuyente: string, cedula: string, num_puesto_bodega: string, nave: string, seccion: string, cant_meses: string, boleta_Uno: boolean, boleta_Dos: boolean, boleta_Tres: boolean, boleta_Uno_Fijada: boolean, boleta_Dos_Fijada: boolean, boleta_Tres_Fijada: boolean }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          src={require("../resources/images/logoEpema.jpg")} />
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
          <Text style={styles.texts}>FECHA: <Text style={styles.texts_Blod}>{fecha}</Text></Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.texts}>HORA: ________</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.texts}>CIU: <Text style={styles.texts_Blod}>{ciu}</Text></Text>
        </View>
      </View>
      <View style={styles.section02}>
        <View style={styles.wrap}>
          <Text style={styles.texts} hyphenationCallback={hyphenationCallback}>
            Se notifica al Sr./Sra: <Text style={styles.texts_Blod}>{contribuyente}</Text> CC/RUC: <Text style={styles.texts_Blod}>{cedula}</Text> arrendatario/a del puesto/bodega/local/núcleo/cubículo Nº <Text style={styles.texts_Blod}>{num_puesto_bodega}</Text> de la nave <Text style={styles.texts_Blod}>{nave}</Text> sección <Text style={styles.texts_Blod}>{seccion}</Text> que mantiene pendiente de pago de <Text style={styles.texts_Blod}>{cant_meses}</Text> meses por la ocupación de espacio arrendado. {"\n"}{"\n"}
            Por lo que se le informa que tiene el plazo de cuarenta y ocho (48) horas, una vez recibida esta notificación, para cumplir con sus obligaciones.{"\n"}{"\n"}
            En caso de no dar cumplimiento con lo dispuesto, se procederá a declarar vacante de acuerdo al REGLAMENTO DE FUNCIONAMIENTO INTERNO DEL MERCADO MAYORISTA AMBATO, según la SECCIÓN SEGUNDA DE LA DECLARATORIA UNILATERAL DE VACANTE DE BODEGAS, LOCALES, CUBÍCULOS, NÚCLEOS Y PUESTOS, Art. 23 literal e) que dispone: "Por mora en el pago de tres mensualidades consecutivas".
          </Text>
        </View>
      </View>

      <View style={styles.section03}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Notificación en persona:</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}></Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Arrendatario/a:</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}></Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>CC/RUC:</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}></Text>
            </View>
          </View>
        </View>
        <View style={styles.notificationTextContainer}>
          <Text style={styles.notificationText}>{"\n"}Notificación realizada por: _______________________{"\n"}____________________________________________</Text>
          <Text style={styles.notificationText}>CC: _________________________________________</Text>
        </View>
      </View>

      <View style={styles.section04}>
        <View style={styles.table2}>
          <View style={styles.table2Row}>
            <View style={styles.table2Col}>
              <Text style={styles.table2Cell}>Notificación por boleta:</Text>
            </View>
            <View style={styles.table2Col}>
              <Text style={styles.table2Cell}>Boleta uno(1):</Text>
            </View>
            <View style={styles.table2Col}>
              <Text style={styles.table2Cell_V}>{boleta_Uno ? "X" : ""}</Text>
            </View>
            <View style={styles.table2Col}>
              <Text style={styles.table2Cell}>Boleta dos(2):</Text>
            </View>
            <View style={styles.table2Col}>
              <Text style={styles.table2Cell_V}>{boleta_Dos ? "X" : ""}</Text>
            </View>
            <View style={styles.table2Col}>
              <Text style={styles.table2Cell}>Boleta tres(3):</Text>
            </View>
            <View style={styles.table2Col}>
              <Text style={styles.table2Cell_V}>{boleta_Tres ? "X" : ""}</Text>
            </View>
          </View>
          <View style={styles.table2Row}>
            <View style={styles.table2Col}>
              <Text style={styles.table2Cell}>Notificación por boleta fijada:</Text>
            </View>
            <View style={styles.table2Col}>
              <Text style={styles.table2Cell}>Boleta uno(1):</Text>
            </View>
            <View style={styles.table2Col}>
              <Text style={styles.table2Cell_V}>{boleta_Uno_Fijada ? "X" : ""}</Text>
            </View>
            <View style={styles.table2Col}>
              <Text style={styles.table2Cell}>Boleta dos(2):</Text>
            </View>
            <View style={styles.table2Col}>
              <Text style={styles.table2Cell_V}>{boleta_Dos_Fijada ? "X" : ""}</Text>
            </View>
            <View style={styles.table2Col}>
              <Text style={styles.table2Cell}>Boleta tres(3):</Text>
            </View>
            <View style={styles.table2Col}>
              <Text style={styles.table2Cell_V}>{boleta_Tres_Fijada ? "X" : ""}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section05}>
        <View style={styles.roundedSquare}>
          <Text style={styles.texts} hyphenationCallback={hyphenationCallback}>
            En caso de negativa a recibir la notificación:{"\n"}{"\n"}
            En la ciudad de Ambato, a __________ del mes __________ año ______ siendo las _____ h _____ dentro de las instalaciones del Mercado Mayorista Ambato,encontrandome en la Nave ________ sección ________ puesto/bodega/local/núcle/cubiculo Nro. _____ adjudicado al arrendatario ___________________________________ con CC/RUC No. _______________, quien encotrándose presente y en persoa en su espacio arrendado, se niega a recibir la notificación.{"\n"}{"\n"}
            Para constancia del acto firma como testigo el señor ___________________________________.{"\n"}
            Es todo cuanto puedo certificar en honor a la verdad.{"\n"}
            CERTIFICO.-{"\n"}{"\n"}
            Supervisor de Nave                                        Testigo{"\n"}
            Nombre:                                                            Nombre:{"\n"}
          </Text>
        </View>
      </View>

      <View style={styles.section06}>
        <View style={styles.roundedSquare}>
          <Text style={styles.texts} hyphenationCallback={hyphenationCallback}>
            Notificación al correo electrónico señalado por el usuario catastado (después de la tercera notificación):{"\n"}{"\n"}
            En la ciudad de Ambato, a __________ del mes __________ año ______ siendo las _____ h _____ se procede a notificar al correo electrónico ___________________________________ señalado por el usuario catastrado en el contrato de arrendamiento del puesto/bodega/local/núcleo/cubículo Nro. ______ nave ________ sección ________.{"\n"}
            CERTIFICO.-{"\n"}{"\n"}
            Supervisor de Nave{"\n"}
            Nombre:{"\n"}
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
    cant_meses: "",
    boleta_Uno: false,
    boleta_Dos: false,
    boleta_Tres: false,
    boleta_Uno_Fijada: false,
    boleta_Dos_Fijada: false,
    boleta_Tres_Fijada: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: type === 'checkbox' ? checked : value
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
            type={key.includes("boleta") ? "checkbox" : "text"}
            id={key}
            value={(formData as any)[key]}
            checked={key.includes("boleta") ? (formData as any)[key] : undefined}
            
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