import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, Grid, InputAdornment, Button, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Snackbar, Alert } from '@mui/material';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import colors from '../resources/style/colors';
import { getAllContribuyentes, addContribuyente, updateContribuyente, deleteContribuyente } from '../providers/options/contributors';

const columnsContribuyentes: GridColDef[] = [
    { field: 'ciu', headerName: 'CIU', flex: 1 },
    { field: 'cedula', headerName: 'Cédula', flex: 1 },
    { field: 'nombre', headerName: 'Contribuyente', flex: 1 },
    { field: 'estado', headerName: 'Estado', flex: 1 },
];

const Body_Usuario: React.FC = () => {
    const [ciu, setCiu] = useState('');
    const [cedula, setCedula] = useState('');
    const [nombre, setNombre] = useState('');
    const [estado, setEstado] = useState('Activo');
    const [rows, setRows] = useState<any[]>([]);
    const [selectedRow, setSelectedRow] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {
        fetchContribuyentes();
    }, []);

    const fetchContribuyentes = async () => {
        const result = await getAllContribuyentes();
        if (result.success) {
            setRows(result.contribuyentes);
        }
    };

    const handleCreate = async () => {
        if (!ciu || !cedula || !nombre) {
            alert('Todos los campos deben ser llenados');
            return;
        }


        const result = await addContribuyente({ ciu, cedula, nombre, estado });
        if (result.success) {
            setSuccessMessage('Contribuyente creado exitosamente');
            setOpenSnackbar(true);
            fetchContribuyentes();
        }

    };

    const handleEdit = async () => {
        if (!selectedRow || !ciu || !cedula || !nombre) {
            alert('Seleccione una fila y complete todos los campos');
            return;
        }


        const result = await updateContribuyente(ciu, { cedula, nombre, estado });
        if (result.success) {
            setSuccessMessage('Contribuyente actualizado exitosamente');
            setOpenSnackbar(true);
            fetchContribuyentes();
        }

    };

    const handleDelete = async () => {
        if (!selectedRow) {
            alert('Seleccione una fila para eliminar');
            return;
        }

        if (window.confirm('¿Estás seguro de eliminar este contribuyente permanentemente de la base de datos?')) {
            const result = await deleteContribuyente(selectedRow.ciu);
            if (result.success) {
                setSuccessMessage('Contribuyente eliminado exitosamente');
                setOpenSnackbar(true);
                fetchContribuyentes();
            }
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleRowClick = (params: GridRowParams) => {
        setSelectedRow(params.row);
        setCiu(params.row.ciu);
        setCedula(params.row.cedula);
        setNombre(params.row.nombre);
        setEstado(params.row.estado);
    };

    const handleChange = (event: SelectChangeEvent<any>) => {
        setEstado(event.target.value);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredRows = rows.filter((row) => {
        const searchTermLowercase = searchTerm.toLowerCase();
        return (
            row.ciu.toString().includes(searchTermLowercase) ||
            row.cedula.toString().includes(searchTermLowercase) ||
            row.nombre.toLowerCase().includes(searchTermLowercase)
        );
    });

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
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={3}>
                    <Box display="flex" alignItems="center" mb={2}>
                        <Typography variant="body1" mr={1}>CIU:</Typography>
                        <TextField value={ciu} onChange={(e) => setCiu(e.target.value)} sx={{ flexGrow: 1 }} />
                    </Box>
                    <Box display="flex" alignItems="center" mb={2}>
                        <Typography variant="body1" mr={1}>CEDULA:</Typography>
                        <TextField value={cedula} onChange={(e) => setCedula(e.target.value)} sx={{ flexGrow: 1 }} />
                    </Box>
                    <Box display="flex" mb={2}>
                        <Typography variant="body1" mr={1}>CONTRIBUYENTE:</Typography>
                        <TextField
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
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
                                <MenuItem value={'Activo'}>Activo</MenuItem>
                                <MenuItem value={'Inactivo'}>Inactivo</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={8}>
                    <Box>
                        <DataGrid
                            rows={filteredRows}
                            columns={columnsContribuyentes}
                            getRowId={(row) => row.ciu}
                            onRowClick={handleRowClick}
                            sx={{ width: '100%', height: 550 }} // Ajusta la altura según sea necesario
                        />
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <Box display="flex" justifyContent="flex-start" mt={2}>
                        <Button variant="contained" onClick={handleCreate} sx={{ mr: 2, bgcolor: colors.oliveGreen, '&:hover': { bgcolor: colors.oliveGreenGradient } }}>Crear</Button>
                        <Button variant="contained" onClick={handleEdit} sx={{ mr: 2, bgcolor: colors.blue, '&:hover': { bgcolor: colors.blueGradient } }}>Actualizar</Button>
                        <Button variant="contained" onClick={handleDelete} sx={{ mr: 2, bgcolor: colors.orangeSalmon, '&:hover': { bgcolor: colors.orangeSalmonGradient } }}>Eliminar</Button>
                    </Box>
                </Grid>
            </Grid>
            {successMessage && (
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={3000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert severity="success" onClose={handleCloseSnackbar}>
                        {successMessage}
                    </Alert>
                </Snackbar>
            )}
        </Box>
    );
};

export default Body_Usuario;