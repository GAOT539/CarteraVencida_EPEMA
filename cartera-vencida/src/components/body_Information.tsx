import React from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';

const Body_Information: React.FC = () => {
  const [activity, setActivity] = React.useState('FRUTA IMPORTADA');
  const [warehouse, setWarehouse] = React.useState('N-A-08');
  const [months, setMonths] = React.useState(3);
  const [ciu, setCiu] = React.useState(392215);
  const [amount, setAmount] = React.useState(388.4);
  const [notificationType, setNotificationType] = React.useState('Primera');
  const [paginationModel, setPaginationModel] = React.useState<GridPaginationModel>({ pageSize: 5, page: 0 });

  const columns: GridColDef[] = [
    { field: 'contributor', headerName: 'Contribuyente', width: 150 },
    { field: 'warehouse', headerName: 'Bodega', width: 100 },
    { field: 'months', headerName: 'Meses', width: 100 },
    { field: 'total', headerName: 'Total', width: 100 },
    { field: 'notification', headerName: 'Notificación', width: 150 },
    { field: 'payment', headerName: 'Pago', width: 100, renderCell: () => <input type="radio" /> },
  ];

  const rows = [
    { id: 1, contributor: 'AGUAGUIÑA FREDDY', warehouse: 'N-A-08', months: 4, total: 10.40, notification: 'Primera', payment: '' },
    { id: 2, contributor: 'AGUAGUIÑA FREDDY', warehouse: 'N-A-08', months: 4, total: 10.40, notification: 'Segunda', payment: '' },
  ];

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>Bodega</Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">AGUAGUIÑA FREDDY PATRICIO</Typography>
        <TextField label="CIU" value={ciu} onChange={(e) => setCiu(Number(e.target.value))} />
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField label="Actividad" value={activity} onChange={(e) => setActivity(e.target.value)} />
        <TextField label="Bodega" value={warehouse} onChange={(e) => setWarehouse(e.target.value)} />
        <TextField label="Meses" type="number" value={months} onChange={(e) => setMonths(Number(e.target.value))} />
        <TextField label="Valor a Pagar" type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
      </Box>
      <Box mb={2}>
        <Typography variant="h5">Crear Notificación</Typography>
        <FormControl>
          <InputLabel>Notificación</InputLabel>
          <Select value={notificationType} onChange={(e) => setNotificationType(e.target.value as string)}>
            <MenuItem value="Primera">Primera</MenuItem>
            <MenuItem value="Segunda">Segunda</MenuItem>
            <MenuItem value="Tercera">Tercera</MenuItem>
            <MenuItem value="PAGADO">PAGADO</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" sx={{ marginLeft: 2 }}>Confirmar</Button>
        <Button variant="contained" sx={{ marginLeft: 2 }}>DESCARGAR PDF</Button>
      </Box>
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />
      <Box mt={2}>
        <Button variant="contained">Notificar Todos</Button>
        <Button variant="contained" sx={{ marginLeft: 2 }}>DESCARGAR PDF</Button>
      </Box>
    </Box>
  );
};

export default Body_Information;
