import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Grid, Typography, Button, Box } from '@mui/material';
import colors from '../resources/style/colors';

const Body_Error: React.FC<{ isProtected?: boolean }> = ({ isProtected }) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'; // Puedes usar tu propia lógica de autenticación
    const location = useLocation();

    if (isProtected && !isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!isProtected && location.pathname !== '/') {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    backgroundColor: '#F8D7DA',
                    textAlign: 'center'
                }}
            >
                
                <Typography variant="h1" sx={{ fontSize: '4rem', marginTop: 2, color: '#721C24' }}>
                    404 Error
                </Typography>
                <Typography variant="h6" sx={{ fontSize: '1.5rem', marginBottom: 2, color: '#721C24' }}>
                    Not Found
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '1rem', marginBottom: 4, color: '#721C24' }}>
                    La página que estás buscando no existe.
                </Typography>
                <Button  variant="contained" 
                    sx={{ 
                        bgcolor: colors.oliveGreen, 
                        color: '#FFFFFF', 
                        '&:hover': { bgcolor: colors.oliveGreen } 
                    }} 
                    onClick={() => (window.location.href = '/')}
                >
                    Ir al inicio
                </Button>
            </Box>
        );
    }

    return <Outlet />;
};

export default Body_Error;
