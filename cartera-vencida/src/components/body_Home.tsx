import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import colors from '../resources/style/colors';

const BodyHome: React.FC = () => {
    return (
        <Container maxWidth="sm">
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                minHeight="80vh"
                textAlign="center">
                <Typography variant="h4" component="h1">
                    Aplicación para realizar cálculos de cartera vencida de EPEMA
                </Typography>
                <Typography variant="body1">
                    Bienvenido a la aplicación de cálculo de cartera vencida de EPEMA. Aquí puede calcular y gestionar carteras vencidas de manera eficiente.
                </Typography>
            </Box>
        </Container>
    );
};

export default BodyHome;
