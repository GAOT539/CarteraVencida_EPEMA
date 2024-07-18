import React, { useState, useRef } from "react";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, } from "@react-pdf/renderer";
const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        padding: 20,
        backgroundColor: "#E4E4E4",
        fontSize: 10,
        fontFamily: "Helvetica",
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
        marginBottom: 10,
    },
    logo: {
        width: 50,
        height: 50,
        marginRight: 10
      },
    title: {
        fontSize: 16,
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 14,
        marginBottom: 5,
    },
    text: {
        marginBottom: 5,
    },
});

// Create Document Component
const MyDocument = () => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text>Section #1</Text>
            </View>
            <View style={styles.section}>
                <Text>Section #2</Text>
            </View>
        </Page>
    </Document>
);


const GeneradorPDF = () => {
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [ccRuc, setCcRuc] = useState("");
    const [nombre, setNombre] = useState("");
    const [seccion, setSeccion] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [arrendatario, setArrendatario] = useState("");
    const [puesto, setPuesto] = useState("");
    const [mes, setMes] = useState("");
    const [ano, setAno] = useState("");
    const [boleta1, setBoleta1] = useState("");
    const [boleta2, setBoleta2] = useState("");
    const [boleta3, setBoleta3] = useState("");
    const [boleta1Fijada, setBoleta1Fijada] = useState("");
    const [boleta2Fijada, setBoleta2Fijada] = useState("");
    const [boleta3Fijada, setBoleta3Fijada] = useState("");
    const [observaciones, setObservaciones] = useState("");
    const [supervisorNave, setSupervisorNave] = useState("");
    const [correoElectronico, setCorreoElectronico] = useState("");
    const [testigoNombre, setTestigoNombre] = useState("");

    const handleFechaChange = (event: { target: { value: React.SetStateAction<string>; }; }) => setFecha(event.target.value);
    const handleHoraChange = (event: { target: { value: React.SetStateAction<string>; }; }) => setHora(event.target.value);
    const handleCcRucChange = (event: { target: { value: React.SetStateAction<string>; }; }) => setCcRuc(event.target.value);
    const handleNombreChange = (event: { target: { value: React.SetStateAction<string>; }; }) => setNombre(event.target.value);
    const handleSeccionChange = (event: { target: { value: React.SetStateAction<string>; }; }) => setSeccion(event.target.value);
    const handleCiudadChange = (event: { target: { value: React.SetStateAction<string>; }; }) => setCiudad(event.target.value);
    const handleArrendatarioChange = (event: { target: { value: React.SetStateAction<string>; }; }) =>
        setArrendatario(event.target.value);
    const handlePuestoChange = (event: { target: { value: React.SetStateAction<string>; }; }) => setPuesto(event.target.value);
    const handleMesChange = (event: { target: { value: React.SetStateAction<string>; }; }) => setMes(event.target.value);
    const handleAnoChange = (event: { target: { value: React.SetStateAction<string>; }; }) => setAno(event.target.value);
    const handleBoleta1Change = (event: { target: { value: React.SetStateAction<string>; }; }) => setBoleta1(event.target.value);
    const handleBoleta2Change = (event: { target: { value: React.SetStateAction<string>; }; }) => setBoleta2(event.target.value);
    const handleBoleta3Change = (event: { target: { value: React.SetStateAction<string>; }; }) => setBoleta3(event.target.value);
    const handleBoleta1FijadaChange = (event: { target: { value: React.SetStateAction<string>; }; }) =>
        setBoleta1Fijada(event.target.value);
    const handleBoleta2FijadaChange = (event: { target: { value: React.SetStateAction<string>; }; }) =>
        setBoleta2Fijada(event.target.value);
    const handleBoleta3FijadaChange = (event: { target: { value: React.SetStateAction<string>; }; }) =>
        setBoleta3Fijada(event.target.value);
    const handleObservacionesChange = (event: { target: { value: React.SetStateAction<string>; }; }) =>
        setObservaciones(event.target.value);
    const handleSupervisorNaveChange = (event: { target: { value: React.SetStateAction<string>; }; }) =>
        setSupervisorNave(event.target.value);
    const handleCorreoElectronicoChange = (event: { target: { value: React.SetStateAction<string>; }; }) =>
        setCorreoElectronico(event.target.value);
    const handleTestigoNombreChange = (event: { target: { value: React.SetStateAction<string>; }; }) =>
        setTestigoNombre(event.target.value);

    const MyDocument = () => (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.title}>
                        EMPRESA PÚBLICA - EMPRESA MUNICIPAL
                    </Text>
                    <Text style={styles.title}>MERCADO MAYORISTA AMBATO</Text>
                    <Text style={styles.title}>NOTIFICACIÓN CARTERA VENCIDA</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>FECHA:</Text>
                    <Text style={styles.text}>{fecha}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>HORA:</Text>
                    <Text style={styles.text}>{hora}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>CC/RUC:</Text>
                    <Text style={styles.text}>{ccRuc}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Se notifica al Sr./Sra:</Text>
                    <Text style={styles.text}>{nombre}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>de la nave:</Text>
                    <Text style={styles.text}>{seccion}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>CIU:</Text>
                    <Text style={styles.text}>{ciudad}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>
                        arrendatario/a del puesto/bodega/local/núcleo/cubículo Nro.
                    </Text>
                    <Text style={styles.text}>{puesto}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>
                        que mantiene pendiente de pago
                    </Text>
                    <Text style={styles.text}>{arrendatario}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>
                        meses por la ocupación de espacio arrendado.
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>
                        Por lo que se le informa que tiene el plazo de cuarenta y ocho (48)
                        horas, una vez recibida esta notificación, para cumplir con sus
                        obligaciones.
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>
                        En caso de no dar cumplimiento con lo dispuesto, se procederá a
                        declarar vacante de acuerdo al REGLAMENTO DE FUNCIONAMIENTO
                        INTERNO DEL MERCADO MAYORISTA AMBATO, según la SECCIÓN
                        SEGUNDA DE LA DECLARATORIA UNILATERAL DE VACANTE DE
                        BODEGAS, LOCALES, CUBÍCULOS, NÚCLEOS Y PUESTOS, Art. 23
                        literal e) que dispone: "Por mora en el pago de tres
                        mensualidades consecutivas"
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Notificación en persona:</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Arrendatario/a:</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>CC/RUC:</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Notificación por boleta:</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Boleta uno (1):</Text>
                    <Text style={styles.text}>{boleta1}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Boleta dos(2):</Text>
                    <Text style={styles.text}>{boleta2}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Boleta tres(3):</Text>
                    <Text style={styles.text}>{boleta3}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Notificación recibida por:</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>CC:</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Notificación por boleta fijada:</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Boleta uno (1):</Text>
                    <Text style={styles.text}>{boleta1Fijada}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Boleta dos(2):</Text>
                    <Text style={styles.text}>{boleta2Fijada}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Boleta tres(3):</Text>
                    <Text style={styles.text}>{boleta3Fijada}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Observaciones:</Text>
                    <Text style={styles.text}>{observaciones}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Supervisor de la Nave:</Text>
                    <Text style={styles.text}>{supervisorNave}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>
                        En caso de negativa a recibir la notificación:
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>
                        En la ciudad de Ambato, a {mes} del {ano} siendo las h
                        dentro de las instalaciones del Mercado Mayorista Ambato,
                        sección {puesto}
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>
                        encontrándome en la Nave {ciudad}
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>
                        quien encontrándose presente y en persona en su espacio
                        arrendado, se niega a recibir la notificación.
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>
                        Para constancia del acto firma como testigo el señor
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>
                        Es todo cuanto puedo certificar en honor a la verdad. CERTFICO.-
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Supervisor de Nave:</Text>
                    <Text style={styles.text}>{supervisorNave}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Nombre:</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Testigo:</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Nombre:</Text>
                    <Text style={styles.text}>{testigoNombre}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>
                        Notificación al correo electrónico señalado por el usuario
                        catastrado (después de la tercera notificación):
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>
                        En la ciudad de Ambato, a {mes} del {ano} siendo las h
                        se procede a notificar al correo
                        electrónico
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>
                        señalado por el usuario catastrado en el contrato de
                        arrendamiento del puesto/bodega/local/núcleo/cubículo Nro.
                    </Text>
                    <Text style={styles.text}>{correoElectronico}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>nave</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>CERTFICO.-</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Supervisor de Nave:</Text>
                    <Text style={styles.text}>{supervisorNave}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Nombre:</Text>
                </View>
            </Page>
        </Document>
    );

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
            <label htmlFor="fecha">Fecha:</label>
            <input
                type="date"
                id="fecha"
                value={fecha}
                onChange={handleFechaChange}
            />
            <br />
            <label htmlFor="hora">Hora:</label>
            <input
                type="time"
                id="hora"
                value={hora}
                onChange={handleHoraChange}
            />
            <br />
            <label htmlFor="ccRuc">CC/RUC:</label>
            <input
                type="text"
                id="ccRuc"
                value={ccRuc}
                onChange={handleCcRucChange}
            />
            <br />
            <label htmlFor="nombre">Nombre:</label>
            <input
                type="text"
                id="nombre"
                value={nombre}
                onChange={handleNombreChange}
            />
            <br />
            <label htmlFor="seccion">Sección:</label>
            <input
                type="text"
                id="seccion"
                value={seccion}
                onChange={handleSeccionChange}
            />
            <br />
            <label htmlFor="ciudad">Ciudad:</label>
            <input
                type="text"
                id="ciudad"
                value={ciudad}
                onChange={handleCiudadChange}
            />
            <br />
            <label htmlFor="arrendatario">Arrendatario:</label>
            <input
                type="text"
                id="arrendatario"
                value={arrendatario}
                onChange={handleArrendatarioChange}
            />
            <br />
            <label htmlFor="puesto">Puesto:</label>
            <input
                type="text"
                id="puesto"
                value={puesto}
                onChange={handlePuestoChange}
            />
            <br />
            <label htmlFor="mes">Mes:</label>
            <input
                type="number"
                id="mes"
                value={mes}
                onChange={handleMesChange}
            />
            <br />
            <label htmlFor="ano">Año:</label>
            <input
                type="number"
                id="ano"
                value={ano}
                onChange={handleAnoChange}
            />
            <br />
            <label htmlFor="boleta1">Boleta 1:</label>
            <input
                type="text"
                id="boleta1"
                value={boleta1}
                onChange={handleBoleta1Change}
            />
            <br />
            <label htmlFor="boleta2">Boleta 2:</label>
            <input
                type="text"
                id="boleta2"
                value={boleta2}
                onChange={handleBoleta2Change}
            />
            <br />
            <label htmlFor="boleta3">Boleta 3:</label>
            <input
                type="text"
                id="boleta3"
                value={boleta3}
                onChange={handleBoleta3Change}
            />
            <br />
            <label htmlFor="boleta1Fijada">Boleta 1 Fijada:</label>
            <input
                type="text"
                id="boleta1Fijada"
                value={boleta1Fijada}
                onChange={handleBoleta1FijadaChange}
            />
            <br />
            <label htmlFor="boleta2Fijada">Boleta 2 Fijada:</label>
            <input
                type="text"
                id="boleta2Fijada"
                value={boleta2Fijada}
                onChange={handleBoleta2FijadaChange}
            />
            <br />
            <label htmlFor="boleta3Fijada">Boleta 3 Fijada:</label>
            <input
                type="text"
                id="boleta3Fijada"
                value={boleta3Fijada}
                onChange={handleBoleta3FijadaChange}
            />
            <br />
            <label htmlFor="observaciones">Observaciones:</label>
            <textarea
                id="observaciones"
                value={observaciones}
                onChange={handleObservacionesChange}
            />
            <br />
            <label htmlFor="supervisorNave">Supervisor de la Nave:</label>
            <input
                type="text"
                id="supervisorNave"
                value={supervisorNave}
                onChange={handleSupervisorNaveChange}
            />
            <br />
            <label htmlFor="correoElectronico">Correo Electrónico:</label>
            <input
                type="email"
                id="correoElectronico"
                value={correoElectronico}
                onChange={handleCorreoElectronicoChange}
            />
            <br />
            <label htmlFor="testigoNombre">Testigo Nombre:</label>
            <input
                type="text"
                id="testigoNombre"
                value={testigoNombre}
                onChange={handleTestigoNombreChange}
            />
            <br />
            <PDFDownloadLink
                document={<MyDocument />}
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