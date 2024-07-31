import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, useTheme } from '@mui/material';
import colors from '../resources/style/colors';
import fondo1 from '../resources/images/fondo1.jpg';
import fondo3 from '../resources/images/fondo3.jpg';

const Home: React.FC = () => {
    const theme = useTheme();
    const [backgroundImage, setBackgroundImage] = useState(fondo1); // Imagen inicial
    const images = [fondo1, fondo3];

    useEffect(() => {
        const intervalId = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * images.length);
            setBackgroundImage(images[randomIndex]);
        }, 5000); 

        return () => clearInterval(intervalId);  
    }, []);

    return (
        <Container maxWidth="md">
            <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} justifyContent="center" alignItems="center" minHeight="72vh" textAlign="center" sx={{ padding: 3, borderRadius: 2 }} >
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" flex={1} sx={{ padding: 2 }} >
                    <Typography variant="h4" component="h1" sx={{ color: colors.black, fontWeight: 'bold' }} >
                        Aplicación para Notificación de Cartera Vencida de EP-EMA
                    </Typography>
                    <Typography variant="body1" sx={{ color: colors.black, mt: 4 }} >
                        Bienvenido a la aplicación de cálculo de cartera vencida de EPEMA. Aquí puede notificar y gestionar carteras vencidas de manera eficiente.
                    </Typography>
                </Box>

                <Box flex={1} sx={{ display: 'flex', position: 'relative', overflow: 'hidden', height: '300px', background: `url(${backgroundImage}) no-repeat center center`, backgroundSize: 'cover', }} />
            </Box>
        </Container>
    );
};

export default Home;