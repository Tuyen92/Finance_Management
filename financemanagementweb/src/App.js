import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './layouts/Footer';
import Projects from './components/Projects';
import Users from './components/Users';
import GroupsUser from './components/GroupsUser';
import Spendings from './components/Spendings';
import Incomes from './components/Incomes';
import Meetings from './components/Meetings';
import LimiteRule from './components/LimitRule';
import { styled, useTheme } from '@mui/material/styles';
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import Header from './layouts/Header';
import Login from './components/Login';


function App() {
  const drawerWidth = 240;

  const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    }),
  );

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
    backgroundColor: "#F46841",
    color: "#FFECC9"
  }));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <BrowserRouter>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="fixed" open={open}>
            <Toolbar>
              <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" sx={{ mr: 2, ...(open && { display: 'none' }) }}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link style={{ color: '#FFECC9', textDecoration: 'none' }} to="/"><strong>FINANCE MANAGEMENT</strong></Link>
              </Typography>
              <Link style={{ color: '#FFECC9', textDecoration: 'none' }} to="/login/"><strong>Login</strong></Link>
            </Toolbar>
          </AppBar>

          <Drawer sx={{width: drawerWidth, flexShrink: 0, '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              backgroundColor: "#609b56",
              color: "#FFECC9"
              },}}
            variant="persistent"
            anchor="left"
            open={open}>
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </DrawerHeader>

            <Divider />
            <List>
              <ListItem key='spending' style={{ marginTop: '20px', marginBottom: '20px' }}>
                <i className="material-icons" style={{ color: '#FFECC9' }}>payments</i>
                <Link style={{ color: '#FFECC9', textDecoration: 'none', marginLeft: '20px' }} to="/spendings/">Spendings</Link>
              </ListItem>
              <Divider />
              
              <ListItem key='income' style={{ marginTop: '20px', marginBottom: '20px' }}>
                <i className="material-icons" style={{ color: '#FFECC9' }}>account_balance_wallet</i>
                <Link style={{ color: '#FFECC9', textDecoration: 'none', marginLeft: '20px' }} to="/incomes/">Incomes</Link>
              </ListItem>
              <Divider />

              <ListItem key='group' style={{ marginTop: '20px', marginBottom: '20px' }}>
                <i className="material-icons" style={{ color: '#FFECC9' }}>diversity_2</i>
                <Link style={{ color: '#FFECC9', textDecoration: 'none', marginLeft: '20px' }} to="/groups/">Groups</Link>
              </ListItem>
              <Divider />

              <ListItem key='project' style={{ marginTop: '20px', marginBottom: '20px' }}>
                <i className="material-icons" style={{ color: '#FFECC9' }}>business_center</i>
                <Link style={{ color: '#FFECC9', textDecoration: 'none', marginLeft: '20px' }} to="/projects/">Projects</Link>
              </ListItem>
              <Divider />

              <ListItem key='limit_rule' style={{ marginTop: '20px', marginBottom: '20px' }}>
                <i className="material-icons" style={{ color: '#FFECC9' }}>savings</i>
                <Link style={{ color: '#FFECC9', textDecoration: 'none', marginLeft: '20px' }} to="/limit_rule/">Limit Rules</Link>
              </ListItem>
              <Divider />

              <ListItem key='warning' style={{ marginTop: '20px', marginBottom: '20px' }}>
                <i className="material-icons" style={{ color: '#FFECC9' }}>warning</i>
                <Link style={{ color: '#FFECC9', textDecoration: 'none', marginLeft: '20px' }} to="/warning/">Warning</Link>
              </ListItem>
              <Divider />

              <ListItem key='role' style={{ marginTop: '20px', marginBottom: '20px' }}>
                <i className="material-icons" style={{ color: '#FFECC9' }}>label</i>
                <Link style={{ color: '#FFECC9', textDecoration: 'none', marginLeft: '20px' }} to="/role/">Role</Link>
              </ListItem>
              <Divider />
            </List>
          </Drawer>

          <Main open={open}>
            <DrawerHeader />
            <Typography>
              <Routes>
                <Route path='/' element={<Header />}/>
                <Route path='/login/' element={<Login />}/>
                <Route path='/user/' element={<Users />}/>
                <Route path='/groups/' element={<GroupsUser />}/>
                <Route path='/projects/' element={<Projects />}/>
                <Route path='/spendings/' element={<Spendings />}/>
                <Route path='/incomes/' element={<Incomes />}/>
                <Route path='/meeting_schedule/' element={<Meetings />}/>
                <Route path='/limit_rule/' element={<LimiteRule />}/>
              </Routes>
              <Footer />
            </Typography>
          </Main>
        </Box>
      </BrowserRouter>
    </>
  );
}

export default App;
