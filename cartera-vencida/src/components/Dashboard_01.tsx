// src/components/Dashboard.tsx
import React from 'react';
import {
  AppBar, Toolbar, Typography, Button, Container, Grid, Paper, TextField, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Radio, RadioGroup, FormControlLabel, InputLabel, FormControl, Box
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            EP-EMA
          </Typography>
          <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            EMPRESA PUBLICA EMPRESA MUNICIPAL MERCADO MAYORISTA AMBATO
          </Typography>
          <Button color="inherit">Bodegas</Button>
          <Button color="inherit">Puestos</Button>
          <Button color="inherit">Históricos</Button>
        </Toolbar>
      </AppBar>
      <Box my={4}>
        <Typography variant="h4">Bodega</Typography>
        <Paper sx={{ padding: 2, marginBottom: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">AGUAGUÑA FREDDY PATRICIO</Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField label="Actividad" value="FRUTA IMPORTADA" fullWidth disabled />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Bodega" value="N-A-08" fullWidth disabled />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Meses" value="3" fullWidth disabled />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Valor a pagar" value="388.4" fullWidth disabled />
            </Grid>
            <Grid item xs={6}>
              <TextField label="CIU" value="392215" fullWidth disabled />
            </Grid>
          </Grid>
        </Paper>
        <Typography variant="h5">Crear Notificación</Typography>
        <Paper sx={{ padding: 2, marginBottom: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Notificación</InputLabel>
                <Select defaultValue="Primera">
                  <MenuItem value="Primera">Primera</MenuItem>
                  <MenuItem value="Segunda">Segunda</MenuItem>
                  <MenuItem value="Tercera">Tercera</MenuItem>
                  <MenuItem value="PAGADO">PAGADO</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" sx={{ marginRight: 2 }}>Confirmar</Button>
              <Button variant="contained" color="secondary">Descargar PDF</Button>
            </Grid>
          </Grid>
        </Paper>
        <Typography variant="h5">AMBULANTES</Typography>
        <TextField label="search" fullWidth InputProps={{
          endAdornment: <SearchIcon />
        }} sx={{ marginBottom: 2 }} />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Contribuyente</TableCell>
                <TableCell>Bodega</TableCell>
                <TableCell>Meses</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Notificación</TableCell>
                <TableCell>Pago</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>AGUAGUÑA FREDDY</TableCell>
                <TableCell>N-A-08</TableCell>
                <TableCell>4</TableCell>
                <TableCell>10.40</TableCell>
                <TableCell>Primera</TableCell>
                <TableCell>
                  <RadioGroup row>
                    <FormControlLabel value="primera" control={<Radio />} label="Primera" />
                    <FormControlLabel value="segunda" control={<Radio />} label="Segunda" />
                  </RadioGroup>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>Notificar Todos</Button>
      </Box>
    </Container>
  );
};

export default Dashboard;
