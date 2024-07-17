import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { TextField, Container, Grid, Box, InputAdornment, Typography, Button } from '@mui/material';
import colors from '../resources/style/colors';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import SearchIcon from '@mui/icons-material/Search';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

// Configura dayjs con el idioma español
dayjs.locale('es');

let bodegaOrPuesto: string = 'Bodegas'; // Variable para mostrar "Bodegas" o "Puestos"

const columnsPuesto: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    { field: 'firstName', headerName: 'First name', flex: 1 },
    { field: 'lastName', headerName: 'Last name', flex: 1 },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        flex: 0.5,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        flex: 1,
        //valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 25 },
    { id: 6, lastName: 'Melisandre', firstName: 'Gabriel', age: 15 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    { id: 10, lastName: 'Roxie', firstName: 'Harvey', age: 65 }
];

export default function DataTable() {
    const [searchText, setSearchText] = useState('');
    const [filteredRows, setFilteredRows] = useState(rows);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        setSearchText(value);
        const filteredData = rows.filter((row) =>
            row.firstName?.toLowerCase().includes(value) ||
            row.lastName?.toLowerCase().includes(value) ||
            String(row.age).includes(value)
        );
        setFilteredRows(filteredData);
    };

    return (
        <Container maxWidth="lg" style={{ padding: 20 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                    <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="h5" gutterBottom>
                            Historicos - {bodegaOrPuesto}
                        </Typography>
                        <Box display="flex" alignItems="center">
                            <Button variant="contained" sx={{ marginRight: 3, backgroundColor: colors.oliveGreen, '&:hover': { backgroundColor: colors.oliveGreenGradient } }}>
                                BODEGAS
                            </Button>
                            <Button variant="contained" sx={{ marginRight: 3, backgroundColor: colors.oliveGreen, '&:hover': { backgroundColor: colors.oliveGreenGradient } }}>
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
                                        onChange={(newValue: any) => {
                                            setStartDate(newValue);
                                        }}
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
                                        onChange={(newValue: any) => {
                                            setEndDate(newValue);
                                        }}
                                        sx={{ width: 166 }}
                                    />
                                </LocalizationProvider>
                            </Box>
                            <Button variant="contained" sx={{ marginRight: 3, backgroundColor: colors.oliveGreen, '&:hover': { backgroundColor: colors.oliveGreenGradient } }}>
                                FILTRO
                            </Button>

                        </Box>
                        <TextField
                            variant="outlined"
                            size="medium"
                            value={searchText}
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
                    <DataGrid rows={filteredRows} columns={columnsPuesto} />
                </Grid>

            </Grid>
        </Container>
    );
}