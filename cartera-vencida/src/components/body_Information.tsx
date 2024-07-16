import React from 'react';
import DataTable from './dateTable';
import Taxpayers from './taxpayers';
import Notification from './notification';
import colors from '../resources/colors';
import { Box, Grid, useTheme, Theme, useMediaQuery } from '@mui/material';

const Body_Information: React.FC = () => {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box sx={{ backgroundColor: colors.background_WhiteSmoke, height: '100vh', padding: theme.spacing(2) }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Box sx={{ height: '100%' }}>
            <Taxpayers />
            <Notification />
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