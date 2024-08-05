import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { TextField, Button, Container, Grid, Box, InputAdornment, Backdrop, CircularProgress, Snackbar, Alert, Menu, MenuItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import colors from "../resources/style/colors";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { getHistoricosBodegasNoPagado, getHistoricosPuestosNoPagado, getHistoricosPuestosNuevos } from "../providers/options/historical";
import UploadDialog from "./upload_Dialog";
import { useAppContext } from "../AppContext";
import FileOpenIcon from '@mui/icons-material/FileOpen';
import { getPDFFile, uploadPDFFile, getPDFFileOpen } from "../providers/options/files";
import { generarPDF } from "./trigger_PDF";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

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
  const { setOpcion_Titulo, opcion_Titulo, setSelectedRow, nuevaData, updatedRow, setVarClear } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<SnackbarSeverity>('info');
  const [varNaveFiltro, setVarNaveFiltro] = useState<string[]>([]);
  const [varNaveFiltroLargo, setVarNaveFiltroLargo] = useState<string[]>([]);
  const navesBodegasCorto = ['A', 'B', 'C', 'CF', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'LL', 'M', 'N', 'Ñ', 'P', 'Q', 'Z',];
  const navesBodegasLargo = ['ENVASE', 'HIERVAS'];
  const navesPuestosCorto = ['B', 'C', 'D', 'F', 'H', 'K', 'L', 'LL', 'M', 'N', 'O', 'P', 'Q', 'Y', 'Z'];
  const navesPuestosLargo = ['AMBULANTES', 'AUTO-LUJOS', 'BATERIAS', 'ROPA', 'HIERBAS', 'TRICI'];
  type SnackbarSeverity = 'info' | 'success' | 'error' | 'warning';

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
      console.error("Error fetching Bodegas:", error);
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
      console.error("Error fetching Puestos:", error);
      setSnackbarMessage('Error al cargar los datos de Puestos.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const transformData = (data: any[]) => {
    return data.map((row) => ({
      ...row,
      ubicacion: `${(row.bodega || "").replace(/^NAVE\s*/, "")} ${(row.puesto || "").replace(/^NAVE\s*/, "")} ${(row.seccion || "").replace(/^NAVE\s*/, "")}`.trim(),
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
 
  const filterDataNave = (search: string, data: any[]) => {
    let filtered = data;
    if (search) {
      if (search == ('AUTO-LUJOS') || search == ('ROPA') || search == ('A') || search == ('CF') || search == ('D') || search == ('E') || search == ('G') || search == ('H')
        || search == ('I') || search == ('J') || search == ('K') || search == ('N') || search == ('Ñ') || search == ('P') || search == ('Q') || search == ('Z')) {
        console.log('NAVE ' + search)
        filtered = filtered.filter((row) => row.nave?.toUpperCase().toString() == ("NAVE " + search).toUpperCase());
      } else {
        filtered = filtered.filter((row) => row.nave?.toUpperCase().toString() == search.toUpperCase());
      }
    } setFilteredRows(filtered);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchText(value);
    filterData(value, rows);
  };

  const handleLoadData = () => {
    setDialogOpen(true);
    setVarClear(true);
    if (opcion_Titulo.includes('Bodegas')) {
      fetchBodegas();
    } else {
      fetchPuestos();
    }
  };

  const convertirBlobAFile = (blob: Blob, nombreArchivo: string): File => {
    return new File([blob], nombreArchivo, { type: blob.type, lastModified: new Date().getTime() });
  };

  const handlePDFGeneration = async () => {
    const batchSize = 5;
    const zip = new JSZip();

    setLoading(true);
    for (let i = 0; i < rows.length; i += batchSize) {
      const batch = rows.slice(i, i + batchSize);
      await Promise.all(batch.map(async (element) => {
        try {
          const pdfBlob = await generarPDF(element);
          await uploadPDFFile(element.id, convertirBlobAFile(pdfBlob, `notificacion_${element.ciu}-${element.numero_reporte}.pdf`));
          const file = convertirBlobAFile(pdfBlob, `notificacion_${element.ciu}-${element.numero_reporte}.pdf`);
          zip.file(file.name, pdfBlob);
        } catch (error) {
          console.error('Error al generar o subir el PDF:', error);
        }
      }));
    }
    setLoading(false);

    zip.generateAsync({ type: 'blob' }).then((content) => {
      saveAs(content, `Notificaciones-${new Date().toLocaleDateString()}.zip`);
    });

    if (opcion_Titulo.includes("Bodegas")) {
      setOpcion_Titulo("Bodegas");
      fetchBodegas();
      setVarClear(true);
    } else {
      setOpcion_Titulo("Puestos");
      fetchPuestos();
      setVarClear(true);
    }
  };

  const handleGeneration = async () => {
    const batchSize = 5;
    const zip = new JSZip();

    setLoading(true);
    for (let i = 0; i < filteredRows.length; i += batchSize) {
      const batch = filteredRows.slice(i, i + batchSize);
      await Promise.all(batch.map(async (element) => {
        try {
          const pdfBlob = (await getPDFFileOpen(`notificacion_${element.ciu}-${element.numero_reporte}.pdf`)).data;
          const file = convertirBlobAFile(pdfBlob, `notificacion_${element.ciu}-${element.numero_reporte}.pdf`);
          zip.file(file.name, pdfBlob);
        } catch (error) {
          console.error('Error al generar o subir el PDF:', error);
        }
      }));
    }
    setLoading(false);

    zip.generateAsync({ type: 'blob' }).then((content) => {
      saveAs(content, `NAVES-Notificaciones-${new Date().toLocaleDateString()}.zip`);
    });

    setVarClear(true);
  };

  const handleChangeBodegas = () => {
    setOpcion_Titulo("Bodegas");
    fetchBodegas();
    setVarClear(true);
    setSearchText('');
  };

  const handleChangePuestos = () => {
    setOpcion_Titulo("Puestos");
    fetchPuestos();
    setVarClear(true);
    setSearchText('');
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleRowClick = (params: any) => {
    setSelectedRow(params.row);
  };

  const handleMenuItemClick = (nave: string) => {
    filterDataNave(nave, rows);
  };

  useEffect(() => {
    if (opcion_Titulo.includes('Bodegas')) {
      setVarNaveFiltro(navesBodegasCorto);
      setVarNaveFiltroLargo(navesBodegasLargo);
    } else {
      setVarNaveFiltro(navesPuestosCorto);
      setVarNaveFiltroLargo(navesPuestosLargo);
    }
  }, [opcion_Titulo]);

  useEffect(() => {
    fetchBodegas();
    setOpcion_Titulo("Bodegas");
  }, []);

  useEffect(() => {
    if (nuevaData == "Bodegas") {
      setOpcion_Titulo("Bodegas");
      fetchBodegas();
    } else {
      setOpcion_Titulo("Puestos");
      fetchPuestos();
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
            <Button variant="contained" startIcon={<CloudUploadIcon />} sx={{ backgroundColor: colors.blue, "&:hover": { backgroundColor: colors.blueGradient }, }} onClick={handleLoadData} >
              Cargar datos
            </Button>
            <Button variant="contained" startIcon={<FileOpenIcon />} sx={{ backgroundColor: colors.orangeSalmon, "&:hover": { backgroundColor: colors.orangeSalmonGradient }, }} onClick={handlePDFGeneration} >
              Generar PDF
            </Button>
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <Button variant="contained" {...bindTrigger(popupState)}
                    sx={{ backgroundColor: colors.oliveGreen, "&:hover": { backgroundColor: colors.oliveGreenDarker }, }} >
                    Filtro Naves
                  </Button>
                  <Menu {...bindMenu(popupState)} sx={{ width: 'auto' }}>
                    <Grid container spacing={0.5} sx={{ padding: '10px' }}>
                      {varNaveFiltro.map((item, index) => (
                        <Grid item xs={6} sm={3} md={2} key={index}>
                          <MenuItem onClick={() => { handleMenuItemClick(item); popupState.close(); }}
                            sx={{ padding: '2px 4px', minWidth: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', fontSize: '14px', }} >
                            {item}
                          </MenuItem>
                        </Grid>
                      ))}
                    </Grid>
                    <hr style={{ marginLeft: '5%', marginRight: '5%' }} />
                    <Grid container spacing={0.5} sx={{ padding: '10px' }}>
                      {varNaveFiltroLargo.map((item, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <MenuItem onClick={() => { handleMenuItemClick(item); popupState.close(); }}
                            sx={{ padding: '4px 8px', minWidth: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', fontSize: '14px', }} >
                            {item}
                          </MenuItem>
                        </Grid>
                      ))}
                    </Grid>
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
            <Button variant="contained" startIcon={<FileOpenIcon />} sx={{ backgroundColor: colors.purple, "&:hover": { backgroundColor: colors.purpleGradient }, }} onClick={handleGeneration} >
              Descargar PDFs
            </Button>
            <Backdrop open={loading} style={{ zIndex: 99999 }}>
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
        open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
