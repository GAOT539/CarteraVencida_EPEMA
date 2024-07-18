import React, { ReactNode, useState } from 'react';
import { Box, TextField, Typography, Grid, InputAdornment, Button, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import colors from '../resources/style/colors';

const columnsContribuyentes: GridColDef[] = [
    { field: 'ciu', headerName: 'CIU', flex: 1 },
    { field: 'cedula', headerName: 'Cédula', flex: 1 },
    { field: 'primer_nombre', headerName: 'Primer nombre', flex: 1 },
    { field: 'segundo_nombre', headerName: 'Segundo nombre', flex: 1 },
    { field: 'primer_apellido', headerName: 'Primer apellido', flex: 1 },
    { field: 'segundo_apellido', headerName: 'Segundo apellido', flex: 1 },
    { field: 'estado', headerName: 'Estado', flex: 1 },
];

const rowsContribuyentes = [
    { id: 1, ciu: '1234567890', cedula: '1234567890', primer_nombre: 'Juan', segundo_nombre: 'Pablo', primer_apellido: 'González', segundo_apellido: 'Rodríguez', estado: 'Activo' },
    { id: 2, ciu: '9876543210', cedula: '9876543210', primer_nombre: 'María', segundo_nombre: 'Luisa', primer_apellido: 'García', segundo_apellido: 'Hernández', estado: 'Inactivo' },
    { id: 3, ciu: '1111111111', cedula: '1111111111', primer_nombre: 'Pedro', segundo_nombre: 'José', primer_apellido: 'Martínez', segundo_apellido: 'López', estado: 'Activo' },
    { id: 4, ciu: '2222222222', cedula: '2222222222', primer_nombre: 'Ana', segundo_nombre: 'María', primer_apellido: 'Díaz', segundo_apellido: 'González', estado: 'Inactivo' },
    // Repetí algunas filas para llenar datos
];

const Users: React.FC = () => {
    const [ciu, setCiu] = React.useState('392215');
    const [cedula, setCedula] = React.useState('1234567890');
    const [primerNombre, setPrimerNombre] = React.useState('Juan');
    const [segundoNombre, setSegundoNombre] = React.useState('Pablo');
    const [primerApellido, setPrimerApellido] = React.useState('González');
    const [segundoApellido, setSegundoApellido] = React.useState('Rodríguez');
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

                <Grid item xs={12} sm={4}>
                    <Box display="flex" alignItems="center" mb={1} >
                        <Typography variant="body1" mr={1}>CIU:</Typography>
                        <TextField value={ciu} onChange={(e) => setCiu(e.target.value)} disabled sx={{ flexGrow: 1 }} />
                    </Box>
                    <Box display="flex" alignItems="center" mb={1}>
                        <Typography variant="body1" mr={1}>CEDULA:</Typography>
                        <TextField value={cedula} onChange={(e) => setCedula(e.target.value)} disabled sx={{ flexGrow: 1 }} />
                    </Box>
                    <Box display="flex" alignItems="center" mb={1}>
                        <Typography variant="body1" mr={1}>PRIMER NOMBRE:</Typography>
                        <TextField value={primerNombre} onChange={(e) => setPrimerNombre(e.target.value)} sx={{ flexGrow: 1 }} />
                    </Box>
                    <Box display="flex" alignItems="center" mb={1}>
                        <Typography variant="body1" mr={1}>SEGUNDO NOMBRE:</Typography>
                        <TextField value={segundoNombre} onChange={(e) => setSegundoNombre(e.target.value)} sx={{ flexGrow: 1 }} />
                    </Box>
                    <Box display="flex" alignItems="center" mb={1}>
                        <Typography variant="body1" mr={1}>PRIMER APELLIDO:</Typography>
                        <TextField value={primerApellido} onChange={(e) => setPrimerApellido(e.target.value)} sx={{ flexGrow: 1 }} />
                    </Box>
                    <Box display="flex" alignItems="center" mb={1}>
                        <Typography variant="body1" mr={1}>SEGUNDO APELLIDO:</Typography>
                        <TextField value={segundoApellido} onChange={(e) => setSegundoApellido(e.target.value)} sx={{ flexGrow: 1 }} />
                    </Box>

                    <Box display="flex" alignItems="center" mb={1}>
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
                            sx={{ width: '100%', height: 400 }} // Ajusta la altura según sea necesario
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

export default Users;
