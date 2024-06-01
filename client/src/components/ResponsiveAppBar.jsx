import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';
import { PiSealQuestionDuotone } from "react-icons/pi";
import { useAuth } from '../common/AuthProvider';
import { UserLogout } from '../common/AuthHandler/apiHandler';
import { useNavigate } from 'react-router-dom';
import LoadingButton from './Loadingbutton';

const pages = [
  { name: 'Questions', link: 'my-questions' },
  { name: 'AI Solution', link: 'ai-solution' },
  { name: 'Ask Queations', link: 'ask-question' },
  { name: 'About Us', link: 'about-us' },
  { name: 'Contact Us', link: 'contact-us' }
];
const settings = ['Profile', 'Logout'];

function ResponsiveAppBar() {
  const {user, logout} = useAuth();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    
    setAnchorElUser(null);
  };

  const UserlogoutHandler = async() => {
    await UserLogout(navigate,logout);
    handleCloseUserMenu();
  }

  return (
    <AppBar position="static" className='mb-5'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <Link to='/' className='text-center flex flex-col items-center py-3 mr-5'>
            <PiSealQuestionDuotone className='text-3xl text-fuchsia-50' />
            <Typography
              variant="h6"
              noWrap
              component="p"
              className='text-2xl font-bold text-fuchsia-50 text-center'
              sx={{
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Sq&a
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
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
              {pages.map((page, index) => (
                <Link key={index} to={page.link} className='hover: underline'>
                  <MenuItem key={page.name} href={page?.link} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" className='py-2 px-4'>{page.name}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Link to='/'>
            <Typography
              variant="h5"
              noWrap
              component="p"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => (
              <Link key={index} to={`/${page.link}`} className='hover:underline'>
                <Button
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  className='py-2 px-4'
                >
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={user?.user?.name}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={user?.user?.profilePicture} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/* {settings.map((setting, index) => ( */}
                
                <Link to={`/${settings[0].toLowerCase()}`}>
                  <MenuItem key={settings[0]} onClick={handleCloseUserMenu} >
                  <Typography textAlign="center">{settings[0]}</Typography>
                </MenuItem>
                </Link>

                <Link>
                  <MenuItem onClick={UserlogoutHandler} >
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Link>
              {/* ))} */}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
