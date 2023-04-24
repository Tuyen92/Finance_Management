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
import ProjectDetail from './components/ProjectDetail';
import GroupDetail from './components/GroupsDetail';
import MeetingDetail from './components/MeetingsDetail';
import SpendingDetail from './components/SpendingDetails';
import IncomeDetail from './components/IncomeDetails';
import NewSpending from './components/NewSpending';
import NewIncome from './components/NewIncome';
import NewGroup from './components/NewGroup';
import NewProject from './components/NewProject';
import NewMeeting from './components/NewMeeting';
import Warning from './components/Warning';
import { UseContext } from './configs/UseContext';
import MyUserReducer from './reducer/MyUserReducer';
import cookie from 'react-cookies';
import Avatar from '@mui/material/Avatar';
import CurrentUser from './components/CurrentUser';
import Button from '@mui/material/Button';
import { useContext } from "react"
import RegisterUser from './components/RegisterUser';
import NewLimitRule from './components/NewLimitRule';


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

  const [user, dispatch] = React.useReducer(MyUserReducer, cookie.load('current_user') || null)

  const logout = () => {
    dispatch({
        "type": "logout"
    })
}

  let userLogin = (
    <>
      <Link style={{ color: '#FFECC9', textDecoration: 'none' }} to="/login/"><strong>LOGIN</strong></Link>
    </>
  )
  if (user !== null)
  {
    userLogin = 
    (
      <>
        <Link style={{ color: '#FFECC9', textDecoration: 'none', marginRight: '1%' }} to="/user/current_user/"><Avatar alt="Remy Sharp" src={"./user.jpg"} /></Link>
        <Button style={{ color: '#FFECC9', textDecoration: 'none' }} onClick={logout}><strong>Logout</strong></Button>
      </>
    )
  }

  let userSuperuser = (<></>)
  if (user !== null && user.is_superuser === true)
  {
    userSuperuser = (
      <>
        <ListItem key='user' style={{ marginTop: '20px', marginBottom: '20px' }}>
          <i className="material-icons" style={{ color: '#FFECC9' }}>face</i>
          <Link style={{ color: '#FFECC9', textDecoration: 'none', marginLeft: '20px' }} to="/user/">User</Link>
        </ListItem>
        <Divider />
      </>)
  }
  // console.log(user);

  return (
    <>
      <UseContext.Provider value={[user, dispatch]}>
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
                {userLogin}
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
                {userSuperuser}

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
                  <Link style={{ color: '#FFECC9', textDecoration: 'none', marginLeft: '20px' }} to="/limit_rules/">Limit Rules</Link>
                </ListItem>
                <Divider />
                
                <ListItem key='meeting' style={{ marginTop: '20px', marginBottom: '20px' }}>
                  <i className="material-icons" style={{ color: '#FFECC9' }}>calendar_month</i>
                  <Link style={{ color: '#FFECC9', textDecoration: 'none', marginLeft: '20px' }} to="/meeting_schedule/">Meeting</Link>
                </ListItem>
                <Divider />

                <ListItem key='warning' style={{ marginTop: '20px', marginBottom: '20px' }}>
                  <i className="material-icons" style={{ color: '#FFECC9' }}>warning</i>
                  <Link style={{ color: '#FFECC9', textDecoration: 'none', marginLeft: '20px' }} to="/warning/">Warning</Link>
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
                  <Route path='/register/' element={<RegisterUser /> }/>
                  <Route path='/user/' element={<Users />}/>
                  <Route path='/user/current_user/' element={<CurrentUser />}/>
                  <Route path='/groups/' element={<GroupsUser />}/>
                  <Route path='/groups/:groupId/' element={<GroupDetail />}/>
                  <Route path='/group/' element={<NewGroup />}/>
                  <Route path='/projects/' element={<Projects />}/>
                  <Route path='/projects/:projectId/' element={<ProjectDetail />}/>
                  <Route path='/project/' element={<NewProject />}/>
                  <Route path='/spendings/' element={<Spendings />}/>
                  <Route path='/spendings/:spendingId/' element={<SpendingDetail />}/>
                  <Route path='/spending/' element={<NewSpending />}/>
                  <Route path='/incomes/' element={<Incomes />}/>
                  <Route path='/incomes/:incomeId/' element={<IncomeDetail />}/>
                  <Route path='/income/' element={<NewIncome />}/>
                  <Route path='/meeting_schedule/' element={<Meetings />}/>
                  <Route path='/meetings/:meetingId/' element={<MeetingDetail />}/>
                  <Route path='/meeting_schedule/' element={<NewMeeting />}/>
                  <Route path='/limit_rules/' element={<LimiteRule />}/>
                  <Route path='/limit_rule/' element={<NewLimitRule />}/>
                  <Route path='/warning/' element={<Warning />}/>
                </Routes>
                <Footer />
              </Typography>
            </Main>
          </Box>
        </BrowserRouter>
      </UseContext.Provider>
    </>
  );
}

export default App;
