import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { TextField, Container, Grid, Box, InputAdornment, Typography, Button, Snackbar, Alert } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import SearchIcon from '@mui/icons-material/Search';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import colors from '../resources/style/colors';
import { getAllHistoricos, getHistoricosBodegas, getHistoricosPuestos } from '../providers/options/historical';
import { getPDFFile } from '../providers/options/files';

// Configura dayjs con el idioma español
dayjs.locale('es');

const columnsHistoricos: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'numero_reporte', headerName: 'N. Reporte', flex: 1 },
    { field: 'ciu', headerName: 'CIU', flex: 1 },
    { field: 'nombre', headerName: 'Nombre', flex: 1 },
    { field: 'cedula', headerName: 'Cedula', flex: 1 },
    { field: 'ubicacion', headerName: 'Ubicación', flex: 2 },
    { field: 'fecha', headerName: 'Fecha', flex: 1 },
    { field: 'meses', headerName: 'Meses', flex: 1 },
    { field: 'cantNotificaciones', headerName: 'Cant. Notificaciones', flex: 1 },
    {
        field: 'archivo',
        headerName: 'Archivo',
        flex: 1,
        renderCell: (params) => (
            <Button
                variant="outlined"
                color="primary"
                onClick={() => getPDFFile(params.value)}
            >
                Ver
            </Button>
        ),
    },
    { field: 'valor', headerName: 'Valor', flex: 1 },
    { field: 'pagado', headerName: 'Pagado', flex: 1 }
];

const Body_Historical: React.FC = () => {
    const [rows, setRows] = useState<any[]>([]);
    const [filteredRows, setFilteredRows] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null);
    const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {
        fetchHistoricos();
    }, []);

    const transformData = (data: any[]) => {
        return data.map(row => ({
            ...row,
            ubicacion: `${row.bodega || ''} ${row.puesto || ''} ${row.nave || ''} ${row.seccion || ''}`.trim(),
        }));
    };

    const fetchHistoricos = async () => {
        const result = await getAllHistoricos();
        if (result.success) {
            const transformedData = transformData(result.historicosList);
            setRows(transformedData);
            filterData(searchTerm, startDate, endDate, transformedData);
        }
    };

    const fetchBodegas = async () => {
        const result = await getHistoricosBodegas();
        if (result.success) {
            const transformedData = transformData(result.historicosWithContribuyentes);
            setRows(transformedData);
            filterData(searchTerm, startDate, endDate, transformedData);
        }
    };

    const fetchPuestos = async () => {
        const result = await getHistoricosPuestos();
        if (result.success) {
            const transformedData = transformData(result.historicosWithContribuyentes);
            setRows(transformedData);
            filterData(searchTerm, startDate, endDate, transformedData);
        }
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        filterData(event.target.value, startDate, endDate, rows);
    };

    const handleDateChange = (type: 'start' | 'end') => (date: dayjs.Dayjs | null) => {
        if (type === 'start') {
            if (endDate && date && date.isAfter(endDate)) {
                setEndDate(date);
            }
            setStartDate(date);
        } else {
            if (startDate && date && date.isBefore(startDate)) {
                setStartDate(date);
            }
            setEndDate(date);
        }
        filterData(searchTerm, type === 'start' ? date : startDate, type === 'end' ? date : endDate, rows);
    };

    const filterData = (search: string, start: dayjs.Dayjs | null, end: dayjs.Dayjs | null, data: any[]) => {
        let filtered = data;

        if (search) {
            filtered = filtered.filter(row =>
                row.ciu?.toLowerCase().includes(search.toLowerCase()) ||
                row.ubicacion?.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (start && end) {
            filtered = filtered.filter(row => {
                const date = dayjs(row.fecha);
                return date.isAfter(start) && date.isBefore(end);
            });
        }

        setFilteredRows(filtered);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Container maxWidth="lg" style={{ padding: 20, backgroundColor: colors.background_WhiteSmoke }}>
            <Grid container spacing={2}>
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                    <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="h5" gutterBottom>
                            Historicos
                        </Typography>
                        <Box display="flex" alignItems="center">
                            <Button
                                variant="contained"
                                onClick={fetchBodegas}
                                sx={{ marginRight: 3, backgroundColor: colors.oliveGreen, '&:hover': { backgroundColor: colors.oliveGreenGradient } }}
                            >
                                BODEGAS
                            </Button>
                            <Button
                                variant="contained"
                                onClick={fetchPuestos}
                                sx={{ marginRight: 3, backgroundColor: colors.oliveGreen, '&:hover': { backgroundColor: colors.oliveGreenGradient } }}
                            >
                                PUESTOS
                            </Button>
                        </Box>
                    </Box>
                    <hr />
                </Grid>
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Box display="flex" alignItems="center">
                            <Box display="flex" alignItems="center" mr={2}>
                                <Typography variant="body1" gutterBottom mr={1}>
                                    FECHA INICIO:
                                </Typography>
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                                    <DatePicker
                                        value={startDate}
                                        onChange={handleDateChange('start')}
                                        disableFuture
                                        shouldDisableDate={(date) => endDate ? date.isAfter(endDate) : false}
                                        sx={{ width: 166 }}
                                    />
                                </LocalizationProvider>
                            </Box>
                            <Box display="flex" alignItems="center" mr={2}>
                                <Typography variant="body1" gutterBottom mr={1}>
                                    FECHA FIN:
                                </Typography>
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                                    <DatePicker
                                        value={endDate}
                                        onChange={handleDateChange('end')}
                                        disableFuture
                                        shouldDisableDate={(date) => startDate ? date.isBefore(startDate) : false}
                                        sx={{ width: 166 }}
                                    />
                                </LocalizationProvider>
                            </Box>
                        </Box>
                        <TextField
                            variant="outlined"
                            size="medium"
                            value={searchTerm}
                            onChange={handleSearch}
                            placeholder="Buscar..."
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ width: 400 }}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} style={{ height: 647, width: '100%' }}>
                    <DataGrid
                        rows={filteredRows}
                        columns={columnsHistoricos}
                        columnVisibilityModel={{
                            id: false,
                            nombre: false,
                            cedula: false
                        }}
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
                </Grid>
            </Grid>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    {successMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Body_Historical;
