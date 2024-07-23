// Taxpayers.tsx
import React, { useEffect } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { useAppContext } from '../AppContext';

const Taxpayers: React.FC = () => {
  const { opcion_Titulo, selectedRow } = useAppContext();
  const [contributor, setContributor] = React.useState('');
  const [activity, setActivity] = React.useState('');
  const [warehouse, setWarehouse] = React.useState('');
  const [months, setMonths] = React.useState(0);
  const [ciu, setCiu] = React.useState('');
  const [amount, setAmount] = React.useState(0);

  useEffect(() => {
    if (selectedRow) {
      setContributor(selectedRow['contribuyente.nombre'] || '');
      setActivity(selectedRow.seccion || '');
      setWarehouse(selectedRow.ubicacion || '');
      setMonths(selectedRow.meses || 0);
      setCiu(selectedRow.ciu || '');
      setAmount(selectedRow.valor || 0);
    }
  }, [selectedRow]);

  return (
    <Box sx={{ padding: 4 }}>
      <Box mb={2}>
        <Typography variant="h4" gutterBottom>{opcion_Titulo}</Typography>
      </Box>
      <Box mb={2}>
        <Typography variant="h5" sx={{ textAlign: 'right' }}>Nave - AMBULANTES</Typography>
      </Box>
      <Box mb={2}>
        <hr />
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} marginBottom={4}>
        <TextField
          label="Contribuyente"
          value={contributor}
          onChange={(e) => setContributor(e.target.value)}
          disabled
          sx={{ width: '65%' }}
        />
        <TextField
          label="CIU"
          value={ciu}
          onChange={(e) => setCiu(e.target.value)}
          disabled
          sx={{ width: '30%' }}
        />
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} marginBottom={4}>
        <TextField
          label="Actividad"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          disabled
          sx={{ width: '65%' }}
        />
        <TextField
          label="Meses"
          type="number"
          value={months}
          onChange={(e) => setMonths(Number(e.target.value))}
          disabled
          sx={{ width: '30%' }}
        />
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} marginBottom={4}>
        <TextField
          label="Puesto"
          value={warehouse}
          onChange={(e) => setWarehouse(e.target.value)}
          disabled
          sx={{ width: '65%' }}
        />
        <TextField
          label="Valor a Pagar"
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          disabled
          sx={{ width: '30%' }}
        />
      </Box>
      <Box mb={2}>
        <hr />
      </Box>
    </Box>
  );
};

export default Taxpayers;
