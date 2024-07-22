import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, MenuItem, Avatar } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import logoEpema from '../resources/images/logoEpema-Photoroom.png';
import colors from '../resources/style/colors';

const pages = [
  { name: 'Cartera Vencida', path: '/informacion' },
  { name: 'Históricos', path: '/historicos' },
  { name: 'Gestor Usuarios', path: '/login' }
];

function Bar_Header() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    handleCloseNavMenu();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: colors.background_Green }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar
            alt="EP-EMA Logo"
            src={logoEpema}
            sx={{
              display: { xs: 'none', md: 'flex' },
              width: 60,
              height: 60,
              marginRight: 1,
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => navigate('/')} 
            sx={{
              fontSize: '1.8rem',
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: colors.white,
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            EP-EMA
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="open navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: colors.white }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={() => handleNavigate(page.path)}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Avatar
            alt="EP-EMA Logo"
            src={logoEpema}
            sx={{
              display: { xs: 'flex', md: 'none' },
              width: 40,
              height: 40,
              marginRight: 1,
            }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={() => navigate('/')} 
            sx={{
              fontSize: '1.6rem',
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: colors.white,
              textDecoration: 'none',
              cursor: 'pointer', 
            }}
          >
            EP-EMA
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => handleNavigate(page.path)}
                sx={{
                  my: 2,
                  color: colors.white,
                  display: 'block',
                  '&:hover': {
                    backgroundColor: colors.oliveGreenDarker,
                    color: colors.white,
                  },
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Bar_Header;
