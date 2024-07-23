import React from 'react';
import DataTable from './dateTable';
import Taxpayers from './taxpayers';
import colors from '../resources/style/colors';
import { Box, Grid, useTheme, useMediaQuery } from '@mui/material';

const Body_Information: React.FC = () => {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box sx={{ backgroundColor: colors.background_WhiteSmoke, minHeight: '100vh', padding: theme.spacing(2) }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', height: '100%', gap: theme.spacing(2) }}>
            <Taxpayers />
          </Box>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Box sx={{ height: '100%' }}>
            <DataTable />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Body_Information;