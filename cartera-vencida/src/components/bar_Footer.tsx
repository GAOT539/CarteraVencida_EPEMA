import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import logoEpema from '../resources/images/logoFill.png';
import colors from '../resources/colors';

const Bar_Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: colors.background_Green,
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: colors.white,
      }}
    >
      <Box sx={{ width: '100px', height: 'auto' }}>
        <img alt="EP-EMA Logo" src={logoEpema} style={{ width: '100%', height: 'auto' }} />
      </Box>
      <Box sx={{ textAlign: 'center', flexGrow: 1 }}>
        <Typography variant="h4" component="h4" sx={{ margin: 0, padding: 0, fontSize: '1.2em' }}>
          El centro de acopio más grande el Ecuador
        </Typography>
        <Typography variant="body1" sx={{ margin: '5px 0' }}>
          Distribuimos productos agrícolas que cumplen los estándares de calidad, al por mayor a precios de competencia.
        </Typography>
        <Divider sx={{ border: 0, borderTop: '1px solid', margin: '10px auto', width: '75%' }} />
        <Typography variant="body2" sx={{ margin: '5px 0' }}>
          EP-EMA © {new Date().getFullYear()}. Todos los derechos reservados.
        </Typography>
      </Box>
    </Box>
  );
};

export default Bar_Footer;
