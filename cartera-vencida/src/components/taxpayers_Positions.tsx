import React from 'react';
import { Box, TextField, Typography } from '@mui/material';

const Taxpayers_Wineries: React.FC = () => {
  const [contributor, setContributor] = React.useState('AGUAGUIÑA FREDDY PATRICIO');
  const [activity, setActivity] = React.useState('FRUTA IMPORTADA');
  const [warehouse, setWarehouse] = React.useState('N-A-08');
  const [months, setMonths] = React.useState(3);
  const [ciu, setCiu] = React.useState(392215);
  const [amount, setAmount] = React.useState(388.4);

  return (
    <Box sx={{ padding: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" gutterBottom>Puestos</Typography>
        <Typography variant="h5" gutterBottom sx={{ textAlign: 'right' }}>Nave - AMBULANTES</Typography>
      </Box>
      <hr />
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField
          label="Contribuyente"
          value={contributor}
          onChange={(e) => setContributor(e.target.value)}
          sx={{ width: '48%' }}
        />
        <TextField
          label="CIU"
          value={ciu}
          onChange={(e) => setCiu(Number(e.target.value))}
          sx={{ width: '20%' }}
        />
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField
          label="Actividad"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          sx={{ width: '48%' }}
        />
        <TextField
          label="Meses"
          type="number"
          value={months}
          onChange={(e) => setMonths(Number(e.target.value))}
          sx={{ width: '20%' }}
        />
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField
          label="Puesto"
          value={warehouse}
          onChange={(e) => setWarehouse(e.target.value)}
          sx={{ width: '48%' }}
        />
        <TextField
          label="Valor a Pagar"
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          sx={{ width: '20%' }}
        />
      </Box>
      <hr />
    </Box>
  );
};

export default Taxpayers_Wineries;
