import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { TextField, Button, Container, Grid, Box, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import colors from '../resources/style/colors';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { getAllHistoricos, getHistoricosBodegasNoPagado, getHistoricosPuestosNoPagado } from '../providers/options/historical';
import UploadDialog from './upload_Dialog';
import { useAppContext } from '../AppContext';

// Columnas actualizadas para coincidir con las de Body_Historical.tsx
const columnsHistoricos: GridColDef[] = [
  { field: 'id', headerName: 'ID', flex: 1 }, // Muestra la columna ID
  { field: 'numero_reporte', headerName: 'Número de Reporte', flex: 1 },
  { field: 'ciu', headerName: 'CIU', flex: 1 },
  { field: 'ubicacion', headerName: 'Ubicación', flex: 2 },
  { field: 'fecha', headerName: 'Fecha', flex: 1 },
  { field: 'meses', headerName: 'Meses', flex: 1 },
  { field: 'cantNotificaciones', headerName: 'Cantidad de Notificaciones', flex: 1 },
  { field: 'archivo', headerName: 'Archivo', flex: 1 },
  { field: 'valor', headerName: 'Valor', flex: 1 },
  { field: 'pagado', headerName: 'Pagado', flex: 1 }
];

export default function DataTable() {
  const [searchText, setSearchText] = useState('');
  const [filteredRows, setFilteredRows] = useState<any[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const { setOpcion_Titulo, opcion_Titulo } = useAppContext();

  useEffect(() => {
    // Cargar los datos iniciales
    fetchBodegas() ;
    setOpcion_Titulo('Bodegas');
  }, []);

  const fetchHistoricos = async () => {
    try {
      const result = await getAllHistoricos();
      if (result.success) {
        const transformedData = transformData(result.historicosList);
        setRows(transformedData);
        filterData(searchText, transformedData); // Filtrar datos después de cargar
      }
    } catch (error) {
      console.error('Error fetching historicos:', error);
    }
  };

  const fetchBodegas = async () => {
    try {
      const result = await getHistoricosBodegasNoPagado();
      if (result.success) {
        const transformedData = transformData(result.historicosList);
        setRows(transformedData);
        filterData(searchText, transformedData); // Filtrar datos después de cargar
      }
    } catch (error) {
      console.error('Error fetching bodegas:', error);
    }
  };

  const fetchPuestos = async () => {
    try {
      const result = await getHistoricosPuestosNoPagado();
      if (result.success) {
        const transformedData = transformData(result.historicosList);
        setRows(transformedData);
        filterData(searchText, transformedData); // Filtrar datos después de cargar
      }
    } catch (error) {
      console.error('Error fetching puestos:', error);
    }
  };

  const transformData = (data: any[]) => {
    return data.map(row => ({
      ...row,
      ubicacion: `${row.bodega || ''} ${row.puesto || ''} ${row.nave || ''} ${row.seccion || ''}`.trim(),
    }));
  };

  const filterData = (search: string, data: any[]) => {
    let filtered = data;
    if (search) {
      filtered = filtered.filter(row =>
        row.numero_reporte?.toString().toLowerCase().includes(search.toLowerCase()) ||
        row.ciu?.toLowerCase().includes(search.toLowerCase()) ||
        row.cantNotificaciones?.toString().toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredRows(filtered);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchText(value);
    filterData(value, rows);
  };

  const handleLoadData = () => {
    setDialogOpen(true);
  };

  const handleNotifyAll = () => {
    console.log('Notificar a todos');
  };

  const handleDownloadPDFs = () => {
    console.log('Descargar PDFs');
  };

  const handleChangeBodegas = () => {
    setOpcion_Titulo('Bodegas');
    fetchBodegas(); // Cargar datos de bodegas
  };

  const handleChangePuestos = () => {
    setOpcion_Titulo('Puestos');
    fetchPuestos(); // Cargar datos de puestos
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Container maxWidth="lg" style={{ padding: 20 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Button
            variant="contained" sx={{ marginLeft: 2, backgroundColor: colors.oliveGreen, '&:hover': { backgroundColor: colors.oliveGreenGradient } }}
            onClick={handleChangeBodegas}
          >
            Bodegas
          </Button>
          <Button
            variant="contained" sx={{ marginLeft: 2, backgroundColor: colors.oliveGreen, '&:hover': { backgroundColor: colors.oliveGreenGradient } }}
            onClick={handleChangePuestos}
          >
            Puestos
          </Button>
          <Button
            variant="contained"
            startIcon={<CloudUploadIcon />}
            sx={{ marginLeft: 2, backgroundColor: colors.orangeSalmon, '&:hover': { backgroundColor: colors.orangeSalmonGradient } }}
            onClick={handleLoadData}
            disabled={!opcion_Titulo}
          >
            Cargar datos
          </Button>
          <UploadDialog
            open={dialogOpen}
            onClose={handleCloseDialog}
            titulo={opcion_Titulo}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Buscar"
            variant="outlined"
            value={searchText}
            onChange={handleSearch}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Box style={{ width: '100%' }}>
            <DataGrid
              rows={filteredRows}
              columns={columnsHistoricos}
              columnVisibilityModel={{
                id: false
              }}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 11 },
                },
              }}
              pageSizeOptions={[5, 10]}
              sx={{
                boxShadow: 2,
                border: 2,
                borderColor: colors.oliveGreen,
                '& .MuiDataGrid-cell:hover': {
                  color: colors.orangeSalmon,
                },
                '& .MuiDataGrid-columnHeaderTitleContainer': {
                  backgroundColor: colors.background_WhiteSmokeBlack,
                },
                '& .MuiDataGrid-columnHeader': {
                  backgroundColor: colors.background_WhiteSmokeBlack,
                }
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
