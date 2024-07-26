import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { TextField, Button, Container, Grid, Box, InputAdornment, Backdrop, CircularProgress, Snackbar, Alert, } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import colors from "../resources/style/colors";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { getHistoricosBodegasNoPagado, getHistoricosBodegasNuevos, getHistoricosPuestosNoPagado, getHistoricosPuestosNuevos, updateHistorico, } from "../providers/options/historical";
import UploadDialog from "./upload_Dialog";
import { useAppContext } from "../AppContext";
import FileOpenIcon from '@mui/icons-material/FileOpen';
import PlagiarismIcon from '@mui/icons-material/Plagiarism';
import { getPDFFile, uploadPDFFile } from "../providers/options/files";
import { generarPDF } from "./crear_PDF";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const columnsHistoricos: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "numero_reporte", headerName: "Número de Reporte", flex: 1 },
  { field: "ciu", headerName: "CIU", flex: 1 },
  { field: "contribuyente.nombre", headerName: "Nombre", flex: 1 },
  { field: "contribuyente.cedula", headerName: "Cedula", flex: 1 },
  { field: "ubicacion", headerName: "Ubicación", flex: 2 },
  { field: "fecha", headerName: "Fecha", flex: 1 },
  { field: "meses", headerName: "Meses", flex: 1 },
  { field: "cantNotificaciones", headerName: "Cantidad de Notificaciones", flex: 1, },
  {
    field: 'archivo', headerName: 'Archivo', flex: 1,
    renderCell: (params) => (<Button variant="outlined" color="secondary" onClick={() => getPDFFile(params.value)} disabled={!params.value} >
      Ver
    </Button>),
  },
  { field: "valor", headerName: "Valor", flex: 1 },
  { field: "pagado", headerName: "Pagado", flex: 1 },
];

export default function DataTable() {
  const [searchText, setSearchText] = useState("");
  const [filteredRows, setFilteredRows] = useState<any[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const { setOpcion_Titulo, opcion_Titulo, setSelectedRow, nuevaData, updatedRow } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<SnackbarSeverity>('info');
  const [buttonDisabled, setButtonDisabled] = useState(false);

  type SnackbarSeverity = 'info' | 'success' | 'error' | 'warning';

  useEffect(() => {
    fetchBodegas();
    setOpcion_Titulo("Bodegas");
  }, []);

  useEffect(() => {
    if (nuevaData == "Bodegas") {
      setOpcion_Titulo("Bodegas Cargadas");
      fetchBodegasNuevos();
    } else if  (nuevaData == "Puestos"){
      setOpcion_Titulo("Puestos Cargados");
      fetchPuestosNuevos();
    }else{

    }
  }, [nuevaData]);


  useEffect(() => {
    const textoSeparado = updatedRow.split('-');
    setSearchText(textoSeparado[0])
    filterData(textoSeparado[0], rows);

    switch (opcion_Titulo) {
      case 'Bodegas':
        fetchBodegas();
        break;
      case 'Puestos':
        fetchPuestos();
        break;
      default:
        console.warn('Opción no reconocida');
        break;
    }

  }, [updatedRow]);

  const fetchBodegasNuevos = async () => {
    try {
      const result = await getHistoricosBodegasNuevos();
      if (result.success) {
        const transformedData = transformData(
          result.historicosWithContribuyentes
        );
        setRows(transformedData);
        filterData(searchText, transformedData);
        setSnackbarMessage('Carga de datos correcta de Bodegas Cargadas.');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
      }else {
        setRows([]);
        setFilteredRows([]);
        setSnackbarMessage('No existen datos cargados en Bodegas Cargadas.');
        setSnackbarSeverity('warning');
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Error fetching Bodegas Cargadas:", error);
      setSnackbarMessage('Error al cargar los datos de Bodegas Cargadas.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const fetchPuestosNuevos = async () => {
    try {
      const result = await getHistoricosPuestosNuevos();
      if (result.success) {
        const transformedData = transformData(
          result.historicosWithContribuyentes
        );
        setRows(transformedData);
        filterData(searchText, transformedData);
        setSnackbarMessage('Carga de datos correcta de Puestos Cargadas.');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
      }else {
        setRows([]);
        setFilteredRows([]);
        setSnackbarMessage('No existen datos cargados en Puestos Cargadas.');
        setSnackbarSeverity('warning');
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Error fetching Puestos Cargadas:", error);
      setSnackbarMessage('Error al cargar los datos de Puestos Cargadas.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const fetchBodegas = async () => {
    try {
      const result = await getHistoricosBodegasNoPagado();
      if (result.success) {
        const transformedData = transformData(result.historicosList);
        setRows(transformedData);
        filterData(searchText, transformedData);
        setSnackbarMessage('Carga de datos correcta de Bodegas.');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
      } else {
        setRows([]);
        setFilteredRows([]);
        setSnackbarMessage('No existen datos cargados en Bodegas.');
        setSnackbarSeverity('warning');
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Error fetching bodegas:", error);
      setSnackbarMessage('Error al cargar los datos de Bodegas.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const fetchPuestos = async () => {
    try {
      const result = await getHistoricosPuestosNoPagado();
      if (result.success) {
        const transformedData = transformData(result.historicosList);
        setRows(transformedData);
        filterData(searchText, transformedData);
        setSnackbarMessage('Carga de datos correcta de Puestos.');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
      } else {
        setRows([]);
        setFilteredRows([]);
        setSnackbarMessage('No existen datos cargados en Puestos.');
        setSnackbarSeverity('warning');
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Error fetching puestos:", error);
      setSnackbarMessage('Error al cargar los datos de Puestos.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const transformData = (data: any[]) => {
    return data.map((row) => ({
      ...row,
      ubicacion: `${row.bodega || ""} ${row.puesto || ""} ${row.nave || ""} ${row.seccion || ""
        }`.trim(),
    }));
  };

  const filterData = (search: string, data: any[]) => {
    let filtered = data;
    if (search) {
      filtered = filtered.filter(
        (row) =>
          row.numero_reporte?.toString().toLowerCase().includes(search.toLowerCase()) ||
          row.ciu?.toString().toLowerCase().includes(search.toLowerCase()) ||
          row.cantNotificaciones?.toString().toLowerCase().includes(search.toLowerCase())
      );
    } setFilteredRows(filtered);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchText(value);
    filterData(value, rows);
  };

  const handleLoadData = () => {
    setDialogOpen(true);
  };

  const handleShowCharged = () => {
    console.log(opcion_Titulo)
    console.log(nuevaData)

    if (opcion_Titulo == "Bodegas") {
      setOpcion_Titulo("Bodegas Cargadas");
      fetchBodegasNuevos();
    } else {
      setOpcion_Titulo("Puestos Cargados");
      fetchPuestosNuevos();
    }
  };
  const convertirBlobAFile = (blob: Blob, nombreArchivo: string): File => {
    return new File([blob], nombreArchivo, { type: blob.type, lastModified: new Date().getTime() });
  };

  const handleDownloadPDFs = async () => {
    const batchSize = 5; // Tamaño del lote
    const zip = new JSZip(); // Crear instancia de JSZip

    if (opcion_Titulo === "Bodegas" || opcion_Titulo === "Puestos") {
      console.log("NO");
    } else {
      setLoading(true); // Iniciar la carga
      for (let i = 0; i < rows.length; i += batchSize) {
        const batch = rows.slice(i, i + batchSize);
        await Promise.all(batch.map(async (element) => {
          try {
            const response = await updateHistorico(element.id, { cantNotificaciones: 1, pagado: "NO" });
            const pdfBlob = await generarPDF(element, 1);
            await uploadPDFFile(element.id, convertirBlobAFile(pdfBlob, `notificacion_${element.ciu}-${element.numero_reporte}.pdf`));
            const file = convertirBlobAFile(pdfBlob, `notificacion_${element.ciu}-${element.numero_reporte}.pdf`);

            // Agregar el archivo al ZIP
            zip.file(file.name, pdfBlob);
          } catch (error) {
            console.error('Error al generar o subir el PDF:', error);
          }
        }));
      }
      setLoading(false); // Finalizar la carga

      // Generar el archivo ZIP y descargarlo
      zip.generateAsync({ type: 'blob' }).then((content) => {
        saveAs(content, `Notificaciones-${new Date().toLocaleDateString()}.zip`); // Descargar el archivo ZIP
      });
    }

    if (opcion_Titulo.includes("Bodegas")) {
      setOpcion_Titulo("Bodegas")
      fetchBodegas()
    } else {
      setOpcion_Titulo("Puestos")
      fetchPuestos()
    }
  };

  const handleChangeBodegas = () => {
    setOpcion_Titulo("Bodegas");
    fetchBodegas();
  };

  const handleChangePuestos = () => {
    setOpcion_Titulo("Puestos");
    fetchPuestos();
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };


  const handleRowClick = (params: any) => {
    const selectedRow = {
      ...params.row,
      seccion: params.row.ubicacion.split(" ").pop() || "",
    };
    setSelectedRow(selectedRow);
  };

  useEffect(() => {
    if (opcion_Titulo.includes('Cargados') || opcion_Titulo.includes('Cargadas')) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [opcion_Titulo]);

  return (
    <Container maxWidth="lg" style={{ padding: 20 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 2, }} >
            <Button variant="contained" sx={{ backgroundColor: colors.oliveGreen, "&:hover": { backgroundColor: colors.oliveGreenGradient }, }} onClick={handleChangeBodegas} >
              Bodegas
            </Button>
            <Button variant="contained" sx={{ backgroundColor: colors.oliveGreen, "&:hover": { backgroundColor: colors.oliveGreenGradient }, }} onClick={handleChangePuestos} >
              Puestos
            </Button>
            <Button disabled={buttonDisabled} variant="contained" startIcon={<CloudUploadIcon />} sx={{ backgroundColor: colors.blue, "&:hover": { backgroundColor: colors.blueGradient }, }} onClick={handleLoadData} >
              Cargar datos
            </Button>
            <Button disabled={!buttonDisabled} variant="contained" startIcon={<FileOpenIcon />} sx={{ backgroundColor: colors.orangeSalmon, "&:hover": { backgroundColor: colors.orangeSalmonGradient }, }} onClick={handleDownloadPDFs} >
              Primera Notificación
            </Button>
            <Button variant="contained" startIcon={<PlagiarismIcon />} sx={{ backgroundColor: colors.purple, "&:hover": { backgroundColor: colors.purpleGradient }, }} onClick={handleShowCharged} disabled={!opcion_Titulo} >
              Ver datos Cargados
            </Button>
            <Backdrop open={loading} style={{ zIndex: 9999 }}>
              <CircularProgress color="inherit" />
            </Backdrop>
          </Box>
          <UploadDialog open={dialogOpen} onClose={handleCloseDialog} titulo={opcion_Titulo} />
        </Grid>

        <Grid item xs={12}>
          <TextField label="Buscar" variant="outlined" value={searchText} onChange={handleSearch} fullWidth InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }} />
        </Grid>

        <Grid item xs={12}>
          <Box style={{ width: "100%" }}>
            <DataGrid
              rows={filteredRows}
              columns={columnsHistoricos}
              columnVisibilityModel={{ id: false, "contribuyente.nombre": false, "contribuyente.cedula": false, }}
              initialState={{ pagination: { paginationModel: { page: 0, pageSize: 11 }, }, }}
              onRowClick={handleRowClick}
              sx={{
                boxShadow: 2, border: 2, borderColor: colors.oliveGreen,
                "& .MuiDataGrid-cell:hover": { color: colors.orangeSalmon, },
                "& .MuiDataGrid-columnHeaderTitleContainer": { backgroundColor: colors.background_WhiteSmokeBlack, },
                "& .MuiDataGrid-columnHeader": { backgroundColor: colors.background_WhiteSmokeBlack, },
              }} />
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        open={openSnackbar} autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
