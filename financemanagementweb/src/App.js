import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Header from './layouts/Header';


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
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" sx={{ mr: 2, ...(open && { display: 'none' }) }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}><strong>FINANCE MANAGEMENT</strong></Typography>
            <Button color="inherit"><strong>Login</strong></Button>
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
              <ListItem key='spending'>
                  <ListItemButton>
                      <ListItemIcon><i className="material-icons" style={{ color: '#FFECC9' }}>payments</i></ListItemIcon>
                      <ListItemText primary='Spendings'/>
                  </ListItemButton>
              </ListItem>
              <Divider />
          </List>

          <List>
              <ListItem key='income'>
                  <ListItemButton>
                      <ListItemIcon><i className="material-icons" style={{ color: '#FFECC9' }}>account_balance_wallet</i></ListItemIcon>
                      <ListItemText primary='Incomes'/>
                  </ListItemButton>
              </ListItem>
              <Divider />
          </List>

          <List>
              <ListItem key='group'>
                  <ListItemButton>
                      <ListItemIcon><i className="material-icons" style={{ color: '#FFECC9' }}>diversity_2</i></ListItemIcon>
                      <ListItemText primary='Groups'/>
                  </ListItemButton>
              </ListItem>
              <Divider />
          </List>

          <List>
              <ListItem key='project'>
                  <ListItemButton>
                      <ListItemIcon><i className="material-icons" style={{ color: '#FFECC9' }}>business_center</i></ListItemIcon>
                      <ListItemText primary='Projects'/>
                  </ListItemButton>
              </ListItem>
              <Divider />
          </List>

          <List>
              <ListItem key='limit_rule'>
                  <ListItemButton>
                      <ListItemIcon><i className="material-icons" style={{ color: '#FFECC9' }}>savings</i></ListItemIcon>
                      <ListItemText primary='Limit Rules'/>
                  </ListItemButton>
              </ListItem>
              <Divider />
          </List>

          <List>
              <ListItem key='warning'>
                  <ListItemButton>
                      <ListItemIcon><i className="material-icons" style={{ color: '#FFECC9' }}>warning</i></ListItemIcon>
                      <ListItemText primary='Warning'/>
                  </ListItemButton>
              </ListItem>
              <Divider />
          </List>

          <List>
              <ListItem key='role'>
                <ListItemButton>
                  <ListItemIcon><i className="material-icons" style={{ color: '#FFECC9' }}>label</i></ListItemIcon>
                  <ListItemText primary='Role' />
                </ListItemButton>
              </ListItem>
          </List>
        </Drawer>

        <Main open={open}>
          <DrawerHeader />
          <Typography>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<Header />}/>
                <Route path='/user/' element={<Users />}/>
                <Route path='/groups/' element={<GroupsUser />}/>
                <Route path='/projects/' element={<Projects />}/>
                <Route path='/spendings/' element={<Spendings />}/>
                <Route path='/incomes/' element={<Incomes />}/>
                <Route path='/meeting_schedule/' element={<Meetings />}/>
                <Route path='/limit_rule/' element={<LimiteRule />}/>
              </Routes>
              <Footer />
            </BrowserRouter>
          </Typography>
        </Main>
      </Box>
    </>
  );
}

export default App;
