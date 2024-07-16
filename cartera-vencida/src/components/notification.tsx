import React, { useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';


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
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
      <Typography variant="h5">Crear Notificación</Typography>
      <FormControl>
        <InputLabel>Notificación</InputLabel>
        <Select value={notificationType}>{/* onChange={handleNotificationChange}*/}
          <MenuItem value="Primera">Primera Notificación</MenuItem>
          <MenuItem value="Segunda">Segunda Notificación</MenuItem>
          <MenuItem value="Tercera">Tercera Notificación</MenuItem>
          <MenuItem value="PAGADO">PAGADO</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" sx={{ marginLeft: 2 }} onClick={handleConfirmClick}>
        Confirmar
      </Button>
      <Button variant="contained" sx={{ marginLeft: 2 }} onClick={handleDownloadClick}>
        DESCARGAR PDF
      </Button>
      </Box>
      <hr />
    </Box>
  );
};

export default Notification;
