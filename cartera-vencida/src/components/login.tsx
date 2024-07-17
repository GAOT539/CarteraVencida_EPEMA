import React, { useState } from 'react';
import { Grid, Typography, TextField, Button, IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import colors from '../resources/style/colors';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Iniciar sesión:', username, password);
    };

    return (
        <Grid container spacing={2} sx={{ padding: 22, borderRadius: 10 }}>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <IconButton sx={{ padding: 3, fontSize: 60, bgcolor: colors.oliveGreen, color: '#FFFFFF', '&:hover': { bgcolor: colors.oliveGreen } }}>
                    <FontAwesomeIcon icon={faLock} />
                </IconButton>
            </Grid>
            <Grid container item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="h4">Iniciar sesión</Typography>
            </Grid>
            <Grid item xs={12}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <TextField
                                label="Usuario"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                sx={{
                                    width: 400, // establece un ancho fijo de 100px
                                    margin: 'auto' // centra el TextField horizontalmente
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <IconButton>
                                            <FontAwesomeIcon icon={faUser} />
                                        </IconButton>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <TextField
                                label="Contraseña"
                                type="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                sx={{
                                    width: 400, // establece un ancho fijo de 100px
                                    margin: 'auto' // centra el TextField horizontalmente
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <IconButton>
                                            <FontAwesomeIcon icon={faLock} />
                                        </IconButton>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Button variant="contained" sx={{ bgcolor: colors.oliveGreen, color: '#FFFFFF', '&:hover': { bgcolor: colors.oliveGreen } }} type="submit">
                                    Iniciar sesión
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    );
};

export default Login;