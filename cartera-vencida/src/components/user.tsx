import React, { useState } from 'react';
import { Box, TextField, Typography, Grid, InputAdornment, Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';

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
    { id: 3, ciu: '1111111111', cedula: '1111111111', primer_nombre: 'Pedro', segundo_nombre: 'José', primer_apellido: 'Martínez', segundo_apellido: 'López', estado: 'Activo' },
    { id: 4, ciu: '2222222222', cedula: '2222222222', primer_nombre: 'Ana', segundo_nombre: 'María', primer_apellido: 'Díaz', segundo_apellido: 'González', estado: 'Inactivo' },
    { id: 3, ciu: '1111111111', cedula: '1111111111', primer_nombre: 'Pedro', segundo_nombre: 'José', primer_apellido: 'Martínez', segundo_apellido: 'López', estado: 'Activo' },
    { id: 4, ciu: '2222222222', cedula: '2222222222', primer_nombre: 'Ana', segundo_nombre: 'María', primer_apellido: 'Díaz', segundo_apellido: 'González', estado: 'Inactivo' },
    { id: 3, ciu: '1111111111', cedula: '1111111111', primer_nombre: 'Pedro', segundo_nombre: 'José', primer_apellido: 'Martínez', segundo_apellido: 'López', estado: 'Activo' },
];

const Taxpayers: React.FC = () => {
    const [contribuyente, setContribuyente] = React.useState('AGUAGUIÑA FREDDY PATRICIO');
    const [ciu, setCiu] = React.useState('392215');
    const [cedula, setCedula] = React.useState('1234567890');
    const [primerNombre, setPrimerNombre] = React.useState('Juan');
    const [segundoNombre, setSegundoNombre] = React.useState('Pablo');
    const [primerApellido, setPrimerApellido] = React.useState('González');
    const [segundoApellido, setSegundoApellido] = React.useState('Rodríguez');
    const [estado, setEstado] = React.useState('Activo');

    return (
        <Box sx={{ padding: 4 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                        <Typography variant="h4" gutterBottom>Contribuyentes</Typography>
                        <TextField
                            label="Buscar Contribuyente"
                            variant="outlined"
                            sx={{ width: 500 }} // Agregué este prop
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
                <Grid item xs={6}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} >
                        <Typography variant="body1" gutterBottom mr={1}>
                            CIU:
                        </Typography>
                        <TextField
                            value={ciu}
                            onChange={(e) => setCiu(e.target.value)}
                            disabled
                            sx={{ width: '50%' }}
                        />
                    </Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} >
                        <Typography variant="body1" gutterBottom mr={1}>
                            CEDULA:
                        </Typography>
                        <TextField
                            value={cedula}
                            onChange={(e) => setCedula(e.target.value)}
                            disabled
                            sx={{ width: '50%' }}
                        />
                    </Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} >
                        <Typography variant="body1" gutterBottom mr={1}>
                            PRIMER NOMBRE:
                        </Typography>
                        <TextField
                            value={primerNombre}
                            onChange={(e) => setPrimerNombre(e.target.value)}
                            disabled
                            sx={{ width: '50%' }}
                        />
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} >
                        <Typography variant="body1" gutterBottom mr={1}>
                            SEGUNDO NOMBRE:
                        </Typography>
                        <TextField
                            value={segundoNombre}
                            onChange={(e) => setSegundoNombre(e.target.value)}
                            disabled
                            sx={{ width: '50%' }}
                        />
                    </Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} >
                        <Typography variant="body1" gutterBottom mr={1}>
                            PRIMER APELLIDO:
                        </Typography>
                        <TextField
                            value={primerApellido}
                            onChange={(e) => setPrimerApellido(e.target.value)}
                            disabled
                            sx={{ width: '50%' }}
                        />
                    </Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} >
                        <Typography variant="body1" gutterBottom mr={1}>
                            SEGUNDO APELLIDO:
                        </Typography>
                        <TextField
                            value={segundoApellido}
                            onChange={(e) => setSegundoApellido(e.target.value)}
                            disabled
                            sx={{ width: '50%' }}
                        />
                    </Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} >
                        <Typography variant="body1" gutterBottom mr={1}>
                            ESTADO:
                        </Typography>
                        <TextField
                            value={estado}
                            onChange={(e) => setEstado(e.target.value)}
                            disabled
                            sx={{ width: '50%' }}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <hr />
                    <DataGrid
                        rows={rowsContribuyentes}
                        columns={columnsContribuyentes}
                        checkboxSelection
                        getRowId={(row) => row.ciu}
                        sx={{ width: '100%', height: 'auto' }}
                    />
                </Grid>
                <Grid item xs={12}>
    <Box display="flex" justifyContent="flex-start" mb={2}>
        <Button variant="contained" color="primary">Crear</Button>
        <Button variant="contained" color="secondary" sx={{ ml: 2 }}>Eliminar</Button>
        <Button variant="contained" color="primary" sx={{ ml: 2 }}>Editar</Button>
    </Box>
</Grid>
            </Grid>
        </Box>
    );
};

export default Taxpayers;