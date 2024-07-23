// Taxpayers.tsx
import React, { useEffect, useState } from "react";
import { Alert, Box, SelectChangeEvent, Snackbar, TextField, Typography, } from "@mui/material";
import { useAppContext } from "../AppContext";
import { Button, FormControl, InputLabel, MenuItem, Select, } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import colors from "../resources/style/colors";
import { generarPDF } from "./crear_PDF";
import { saveAs } from "file-saver";

const Taxpayers: React.FC = () => {
  const { opcion_Titulo, selectedRow } = useAppContext();
  const [contributor, setContributor] = React.useState("");
  const [activity, setActivity] = React.useState("");
  const [warehouse, setWarehouse] = React.useState("");
  const [months, setMonths] = React.useState(0);
  const [ciu, setCiu] = React.useState("");
  const [amount, setAmount] = React.useState(0);
  const [notificationType, setNotificationType] = useState<string>("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const handleNotificationChange = (event: SelectChangeEvent) => {
    setNotificationType(event.target.value as string);
  };

  const handleConfirmClick = () => {
    // Aquí puedes agregar la lógica para confirmar la notificación
  };

  const handleDownloadClick = async () => {
    if (!selectedRow) {
      setSnackbarOpen(true);
      return;
    }
    console.log(selectedRow);
    const pdfBlob = await generarPDF(selectedRow);
    saveAs(pdfBlob, `notificacion_${selectedRow.numero_reporte}.pdf`);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const naves = selectedRow?.nave ? selectedRow.nave : "NAVE";

  useEffect(() => {
    if (selectedRow) {
      setContributor(selectedRow["contribuyente.nombre"] || "");
      setActivity(selectedRow.seccion || "");
      setWarehouse(selectedRow.ubicacion || "");
      setMonths(selectedRow.meses || 0);
      setCiu(selectedRow.ciu || "");
      setAmount(selectedRow.valor || 0);
    }
  }, [selectedRow]);

  return (
    <Box sx={{ padding: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
      >
        <Typography variant="h4" gutterBottom>
          {opcion_Titulo}
        </Typography>
        <Typography variant="h5" sx={{ textAlign: "right" }}>
          {naves}
        </Typography>
      </Box>
      <hr />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        marginBottom={4}
      >
        <TextField
          label="Contribuyente"
          value={contributor}
          onChange={(e) => setContributor(e.target.value)}
          disabled
          sx={{ width: "65%" }}
        />
        <TextField
          label="CIU"
          value={ciu}
          onChange={(e) => setCiu(e.target.value)}
          disabled
          sx={{ width: "30%" }}
        />
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        marginBottom={4}
      >
        <TextField
          label="Actividad"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          disabled
          sx={{ width: "65%" }}
        />
        <TextField
          label="Meses"
          type="number"
          value={months}
          onChange={(e) => setMonths(Number(e.target.value))}
          disabled
          sx={{ width: "30%" }}
        />
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        marginBottom={4}
      >
        <TextField
          label="Puesto"
          value={warehouse}
          onChange={(e) => setWarehouse(e.target.value)}
          disabled
          sx={{ width: "65%" }}
        />
        <TextField
          label="Valor a Pagar"
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          disabled
          sx={{ width: "30%" }}
        />
      </Box>
      <Box mb={2}>
        <hr />
      </Box>

      <Box sx={{ padding: 4 }}>
        <Box mb={2}>
          <Typography variant="h5">Crear Notificación</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
      <FormControl
        sx={{
          width: '94%',
          alignItems: "center",
          marginBottom: { xs: 2, sm: 0 },
        }}
      >
        <InputLabel>Notificación</InputLabel>
        <Select
          onChange={handleNotificationChange}
          value={notificationType}
          sx={{ width: '100%' }}
        >
          <MenuItem value="Segunda">Segunda Notificación</MenuItem>
          <MenuItem value="Tercera">Tercera Notificación</MenuItem>
          <MenuItem value="PAGADO">PAGADO</MenuItem>
        </Select>
      </FormControl>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            mb: 2,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Button
            variant="contained"
            sx={{
              marginRight: { xs: 0, sm: 2 },
              marginBottom: { xs: 2, sm: 0 },
              width: { xs: "100%", sm: "auto" },
              backgroundColor: colors.oliveGreen,
              "&:hover": { backgroundColor: colors.oliveGreenGradient },
            }}
            onClick={handleConfirmClick}
          >
            Actualizar Cartera
          </Button>
          <Button
            variant="contained"
            startIcon={<CloudDownloadIcon />}
            sx={{
              width: { xs: "100%", sm: "auto" },
              backgroundColor: colors.orangeSalmon,
              "&:hover": { backgroundColor: colors.orangeSalmonGradient },
            }}
            onClick={handleDownloadClick}
          >
            DESCARGAR PDF
          </Button>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
          >
            <Alert onClose={handleCloseSnackbar} severity="error">
              Por favor, seleccione datos de la tabla antes de descargar.
            </Alert>
          </Snackbar>
        </Box>
      </Box>
      <hr />
    </Box>
  );
};

export default Taxpayers;
