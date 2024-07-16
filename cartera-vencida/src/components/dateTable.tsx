import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { TextField, Button, Container, Grid, Box, InputAdornment } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import SearchIcon from '@mui/icons-material/Search';
import colors from '../resources/colors';

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

  const handleLoadData = () => {
    setFilteredRows(rows);
  };

  const handleNotifyAll = () => {
    console.log('Notificar a todos');
  };

  const handleDownloadPDFs = () => {
    console.log('Descargar PDFs');
  };

  return (
    <Container maxWidth="lg" style={{ padding: 20 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            startIcon={<CloudUploadIcon />}
            sx={{ marginLeft: 2, backgroundColor: colors.oliveGreen, '&:hover': { backgroundColor: colors.oliveGreenGradient } }}
            onClick={handleLoadData}>
            Cargar datos
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Buscar Contribuyente"
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
              columns={columnsPuesto}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 11 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              autoHeight
              sx={{
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
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Box display="flex" justifyContent="space-between">
            <Button variant="contained" sx={{ marginLeft: 2, backgroundColor: colors.oliveGreen, '&:hover': { backgroundColor: colors.oliveGreenGradient } }} onClick={handleNotifyAll}>
              Notificar todos
            </Button>
            <Button
              variant="contained"
              startIcon={<CloudDownloadIcon />}
              sx={{ marginLeft: 2, backgroundColor: colors.orangeSalmon, '&:hover': { backgroundColor: colors.orangeSalmonGradient } }}>
              DESCARGAR PDF
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
