import React, { ReactNode, useState } from 'react';
import { Box, TextField, Typography, Grid, InputAdornment, Button, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import colors from '../resources/style/colors';

const columnsContribuyentes: GridColDef[] = [
    { field: 'ciu', headerName: 'CIU', flex: 1 },
    { field: 'cedula', headerName: 'Cédula', flex: 1 },
    { field: 'nombre', headerName: 'Contribuyente', flex: 1 },
    { field: 'estado', headerName: 'Estado', flex: 1 },
];

const rowsContribuyentes = [
    { id: 1, ciu: '1234567890', cedula: '1234567890', nombre: 'Juan', estado: 'Activo' },
    { id: 2, ciu: '9876543210', cedula: '9876543210', nombre: 'María', estado: 'Inactivo' },
    { id: 3, ciu: '1111111111', cedula: '1111111111', nombre: 'Pedro', estado: 'Activo' },
    { id: 4, ciu: '2222222222', cedula: '2222222222', nombre: 'Ana', estado: 'Inactivo' },
    { id: 2, ciu: '9876543210', cedula: '9876543210', nombre: 'María', estado: 'Inactivo' },
    { id: 3, ciu: '1111111111', cedula: '1111111111', nombre: 'Pedro', estado: 'Activo' },
    { id: 4, ciu: '2222222222', cedula: '2222222222', nombre: 'Ana', estado: 'Inactivo' },
    { id: 2, ciu: '9876543210', cedula: '9876543210', nombre: 'María', estado: 'Inactivo' },
    { id: 3, ciu: '1111111111', cedula: '1111111111', nombre: 'Pedro', estado: 'Activo' },
    { id: 4, ciu: '2222222222', cedula: '2222222222', nombre: 'Ana', estado: 'Inactivo' },
    // Repetí algunas filas para llenar datos
];

const Body_User: React.FC = () => {
    const [ciu, setCiu] = React.useState('392215');
    const [cedula, setCedula] = React.useState('1234567890');
    const [nombre, setPrimerNombre] = React.useState('Juan');
    const [estado, setEstado] = React.useState('ACTIVO');

    function handleChange(event: SelectChangeEvent<any>, child: ReactNode): void {
        console.log('change');
    }

    return (
        <Box sx={{ padding: 4 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                        <Typography variant="h4" gutterBottom>Contribuyentes</Typography>
                        <TextField
                            label="Buscar Contribuyente"
                            variant="outlined"
                            sx={{ minWidth: 200 }} // Ajuste el tamaño mínimo
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={3}>
                    <Box display="flex" alignItems="center" mb={2} >
                        <Typography variant="body1" mr={1}>CIU:</Typography>
                        <TextField value={ciu} onChange={(e) => setCiu(e.target.value)} disabled sx={{ flexGrow: 1 }} />
                    </Box>
                    <Box display="flex" alignItems="center" mb={2}>
                        <Typography variant="body1" mr={1}>CEDULA:</Typography>
                        <TextField value={cedula} onChange={(e) => setCedula(e.target.value)} disabled sx={{ flexGrow: 1 }} />
                    </Box>
                    <Box display="flex"  mb={2}>
                        <Typography variant="body1" mr={1}>CONTRIBUYENTE:</Typography>
                        <TextField
                            value={nombre}
                            onChange={(e) => setPrimerNombre(e.target.value)}
                            sx={{ flexGrow: 1 }}
                            multiline
                            rows={3}
                        />
                    </Box>

                    <Box display="flex" alignItems="center" mb={2}>
                        <FormControl fullWidth sx={{ flexGrow: 1 }}>
                            <InputLabel id="demo-simple-select-label">ESTADO</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={estado}
                                label="ESTADO"
                                onChange={handleChange}
                            >
                                <MenuItem value={'ACTIVO'}>ACTIVO</MenuItem>
                                <MenuItem value={'INACTIVO'}>INACTIVO</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={8}>
                    <Box>
                        <DataGrid
                            rows={rowsContribuyentes}
                            columns={columnsContribuyentes}
                            checkboxSelection
                            getRowId={(row) => row.ciu}
                            sx={{ width: '113%', height: 550 }} // Ajusta la altura según sea necesario
                        />
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <Box display="flex" justifyContent="flex-start" mt={2}>
                        <Button variant="contained" sx={{ mr: 2, bgcolor: colors.oliveGreen, '&:hover': { bgcolor: colors.oliveGreenGradient } }}>Crear</Button>
                        <Button variant="contained" sx={{ mr: 2, bgcolor: colors.blue, '&:hover': { bgcolor: colors.blueGradient } }}>Editar</Button>
                        <Button variant="contained" sx={{ mr: 2, bgcolor: colors.orangeSalmon, '&:hover': { bgcolor: colors.orangeSalmonGradient } }}>Eliminar</Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Body_User;
