import React, { useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import colors from '../resources/style/colors';

const Notification: React.FC = () => {
  const [notificationType, setNotificationType] = useState<string>('');

  const handleNotificationChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setNotificationType(event.target.value as string);
  };

  const handleConfirmClick = () => {
    // Aquí puedes agregar la lógica para confirmar la notificación
  };

  const handleDownloadClick = () => {
    // Aquí puedes agregar la lógica para descargar el PDF
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Box mb={2}>
        <Typography variant="h5">Crear Notificación</Typography>
      </Box>
      <Box display="flex" justifyContent="flex-start" alignItems="center" mb={2}>
        <FormControl sx={{ marginRight: 2 }}>
          <InputLabel>Notificación</InputLabel>
          <Select
            value={notificationType}
            //onChange={handleNotificationChange}
            sx={{ width: '12em' }}
          >
            <MenuItem value="Primera">Primera Notificación</MenuItem>
            <MenuItem value="Segunda">Segunda Notificación</MenuItem>
            <MenuItem value="Tercera">Tercera Notificación</MenuItem>
            <MenuItem value="PAGADO">PAGADO</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box display="flex" justifyContent="flex-start" alignItems="center" mb={2}>
        <Button
          variant="contained"
          sx={{ marginRight: 2, backgroundColor: colors.oliveGreen, '&:hover': { backgroundColor: colors.oliveGreenGradient } }}
          onClick={handleConfirmClick}
        >
          Actualizar Contribuyente
        </Button>
        <Button
          variant="contained"
          startIcon={<CloudDownloadIcon />}
          sx={{ backgroundColor: colors.orangeSalmon, '&:hover': { backgroundColor: colors.orangeSalmonGradient } }}
          onClick={handleDownloadClick}
        >
          DESCARGAR PDF
        </Button>
      </Box>
      <hr />
    </Box>
  );
};

export default Notification;
