import React, { useEffect, useState } from "react";
import { Alert, Box, SelectChangeEvent, Snackbar, TextField, Typography, useTheme, useMediaQuery, } from "@mui/material";
import { useAppContext } from "../AppContext";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import colors from "../resources/style/colors";
import { generarPDF } from "./crear_PDF";
import { saveAs } from "file-saver";
import { addHistorico, obtenerNumeroReporte, updateHistorico } from "../providers/options/historical";
import { getPDFFile, uploadPDFFile } from "../providers/options/files";
import { getTodayDate } from "@mui/x-date-pickers/internals";

const Taxpayers: React.FC = () => {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const { opcion_Titulo, selectedRow, setupdatedRow } = useAppContext();
  const [contributor, setContributor] = React.useState("");
  const [activity, setActivity] = React.useState("");
  const [warehouse, setWarehouse] = React.useState("");
  const [months, setMonths] = React.useState(0);
  const [ciu, setCiu] = React.useState("");
  const [amount, setAmount] = React.useState(0);
  const [notificationType, setNotificationType] = useState<string>("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const handleNotificationChange = (event: SelectChangeEvent) => { setNotificationType(event.target.value as string); };
  const convertirBlobAFile = (blob: Blob, nombreArchivo: string): File => {
    return new File([blob], nombreArchivo, { type: blob.type, lastModified: new Date().getTime() });
  };
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses empiezan en 0
    const day = String(date.getDate()).padStart(2, '0'); // Asegura dos dígitos
  
    return `${year}-${month}-${day}`;
  };
  const handleConfirmClick = async () => {
    if (!selectedRow) {
      setSnackbarMessage("Debe seleccionar una fila para continuar.");
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    let cantNotificaciones;
    let pagado = "NO";
    let numero_reporte = (await obtenerNumeroReporte()).siguienteNumeroReporte;
    let archivo = null;
    let fecha = formatDate(new Date());
    switch (notificationType) {
      case "Primera":
        cantNotificaciones = 1;
        break;
      case "Segunda":
        cantNotificaciones = 2;
        break;
      case "Tercera":
        cantNotificaciones = 3;
        break;
      case "PAGADO":
        pagado = 'SI';
        break;
      default:
        cantNotificaciones = selectedRow.cantNotificaciones;
        pagado = 'NO';
        break;
    }
    let response;
    if (pagado == "SI") {
      response = await updateHistorico(selectedRow.id, { cantNotificaciones, pagado });
    }else{
      if (cantNotificaciones == 1) {
        response = await updateHistorico(selectedRow.id, { cantNotificaciones, pagado });
        const pdfBlob = await generarPDF(selectedRow, cantNotificaciones);
        await uploadPDFFile(selectedRow.id, convertirBlobAFile(pdfBlob, `notificacion_${selectedRow.ciu}-${selectedRow.numero_reporte}.pdf`))
        await getPDFFile(`notificacion_${selectedRow.ciu}-${selectedRow.numero_reporte}.pdf`)
        setupdatedRow(`${selectedRow.ciu}-${selectedRow.numero_reporte}`)
      } else {
        const updatedRow = { ...selectedRow, cantNotificaciones, numero_reporte, archivo , fecha};
        response = await addHistorico(updatedRow)
        const newId = response.historico.msg
        const pdfBlob = await generarPDF(updatedRow, cantNotificaciones);
        await uploadPDFFile(newId, convertirBlobAFile(pdfBlob, `notificacion_${updatedRow.ciu}-${updatedRow.numero_reporte}.pdf`))
        await getPDFFile(`notificacion_${updatedRow.ciu}-${updatedRow.numero_reporte}.pdf`)
        setupdatedRow(`${updatedRow.ciu}-${updatedRow.numero_reporte}`)
      }
     
    }
    
    if (response.success) {
      setSnackbarMessage("Registro actualizado exitosamente.");
      setSnackbarSeverity('success');
    } else {
      setSnackbarMessage(`Error al actualizar el registro: ${response.error?.message}`);
      setSnackbarSeverity('error');
    }
    setSnackbarOpen(true);
  };

  const handleDownloadClick = async () => {
    if (!selectedRow) {
      setSnackbarMessage("Debe seleccionar una fila para continuar.");
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }
    console.log(selectedRow);
    const pdfBlob = await generarPDF(selectedRow,selectedRow.cantNotificaciones);
    saveAs(pdfBlob, `notificacion_${selectedRow.numero_reporte}.pdf`);
  };

  const handleCloseSnackbar = () => { setSnackbarOpen(false); };

  const naves = selectedRow?.nave ? selectedRow.nave : "NAVE";
  const cantNotificaciones = selectedRow?.cantNotificaciones || 0;
  const pagado = selectedRow?.pagado || 'NO';

  useEffect(() => {
    if (selectedRow) {
      setContributor(selectedRow["contribuyente.nombre"] || "");
      setActivity(selectedRow.seccion || "");
      setWarehouse(selectedRow.ubicacion || "");
      setMonths(selectedRow.meses || 0);
      setCiu(selectedRow.ciu || "");
      setAmount(selectedRow.valor || 0);

      setNotificationType("");
    }
  }, [selectedRow]);

  return (
    <Box sx={{ padding: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1} >
        <Typography variant="h4" gutterBottom>
          {opcion_Titulo}
        </Typography>
        <Typography variant="h5" sx={{ textAlign: "right" }}>
          {naves}
        </Typography>
      </Box>

      <hr />

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} marginBottom={4} flexDirection={{ xs: 'column', md: 'row' }} >
        <TextField label="Contribuyente" value={contributor} onChange={(e) => setContributor(e.target.value)} disabled sx={{ width: { xs: '100%', md: '65%' }, mb: { xs: 2, md: 0 } }} />
        <TextField label="CIU" value={ciu} onChange={(e) => setCiu(e.target.value)} disabled sx={{ width: { xs: '100%', md: '30%' } }} />
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} marginBottom={4} flexDirection={{ xs: 'column', md: 'row' }} >
        <TextField label="Actividad" value={activity} onChange={(e) => setActivity(e.target.value)} disabled sx={{ width: { xs: '100%', md: '65%' }, mb: { xs: 2, md: 0 } }} />
        <TextField label="Meses" type="number" value={months} onChange={(e) => setMonths(Number(e.target.value))} disabled sx={{ width: { xs: '100%', md: '30%' } }} />
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} marginBottom={4} flexDirection={{ xs: 'column', md: 'row' }} >
        <TextField label="Puesto" value={warehouse} onChange={(e) => setWarehouse(e.target.value)} disabled sx={{ width: { xs: '100%', md: '65%' }, mb: { xs: 2, md: 0 } }} />
        <TextField label="Valor a Pagar" type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} disabled sx={{ width: { xs: '100%', md: '30%' } }} />
      </Box>

      <hr />

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} flexDirection={{ xs: 'column', md: 'row' }} >
        <FormControl sx={{ width: "100%", alignItems: "center", marginBottom: { xs: 2, sm: 0 }, }} >
          <InputLabel>Notificación</InputLabel>
          <Select onChange={handleNotificationChange} value={notificationType} sx={{ width: "100%" }} disabled={!selectedRow} >
            <MenuItem value="Primera" disabled={cantNotificaciones >= 1 || pagado === 'SI'}>
              Primera Notificación
            </MenuItem>
            <MenuItem value="Segunda" disabled={cantNotificaciones >= 2 || pagado === 'SI'}>
              Segunda Notificación
            </MenuItem>
            <MenuItem value="Tercera" disabled={cantNotificaciones >= 3 || pagado === 'SI'}>
              Tercera Notificación
            </MenuItem>
            <MenuItem value="PAGADO" disabled={pagado === 'SI'}>
              PAGADO
            </MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 2, }} >
        <Button variant="contained" sx={{
          marginRight: { xs: 0, sm: 2 }, marginBottom: { xs: 2, sm: 0 }, width: { xs: "100%", sm: "auto" }, backgroundColor: colors.oliveGreen, "&:hover": { backgroundColor: colors.oliveGreenGradient },
        }} onClick={handleConfirmClick} >
          Actualizar Cartera
        </Button>
        <Button variant="contained" startIcon={<CloudDownloadIcon />}
          sx={{
            marginRight: { xs: 0, sm: 2 }, marginBottom: { xs: 2, sm: 0 }, width: { xs: "100%", sm: "auto" }, backgroundColor: colors.orangeSalmon, "&:hover": { backgroundColor: colors.orangeSalmonGradient },
          }} onClick={handleDownloadClick} >
          Descargar PDF
        </Button>
      </Box>

      <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={() => setSnackbarOpen(false)} anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Taxpayers;
