import React from 'react'
import AuthService from '../pages/Service/AuthService';
import Testemp from './testemp';
import Testman from './testman';
import logo from '../images/logo.png'
import DashboardIcon from '@mui/icons-material/Dashboard';
import StarsIcon from '@mui/icons-material/Stars';
import GradeIcon from '@mui/icons-material/Grade';
import PendingIcon from '@mui/icons-material/Pending';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockResetIcon from '@mui/icons-material/LockReset';
import LogoutIcon from '@mui/icons-material/Logout';
import RuleSharpIcon from '@mui/icons-material/RuleSharp';
import { AppBar, Box, Button, Container, CssBaseline, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import RequestForm from './RequestForm';
import { Link, useNavigate } from 'react-router-dom';
import RequestTeamForm from './RequestTeamForm';
import RewardInfo from './RewardInfo';

const drawerWidth = 230;

const Sidebar = () => {
  const empName=localStorage.getItem('empName')
  const empId=localStorage.getItem('empId');
  const totalPoints=localStorage.getItem('totalPoints')
  const navigate=useNavigate();
const userRole = AuthService.getRole();
const logout=()=>{
    AuthService.logout();
    navigate('/')
}

const isManager = userRole === 'ROLE_MANAGER';
// let componentsToRender;
// switch(userRole){
//     case 'ROLE_EMPLOYEE':
//       componentsToRender=(
//         <>
//         <Testemp/>
//         </>
//       );
//       break;
//       case 'ROLE_MANAGER':
//         componentsToRender=(
//           <>
//           <Testman/>
//           </>
//         );
//         break;
//   }

// //   const popup=()=>{
// //     RequestForm.openModal();
// //   }
const openModal = () => {
    RequestForm.openModal();
  };
  const openInfoModal = () => {
    RewardInfo.openModal();
  };

const openTeamModal=()=>{
  RequestTeamForm.openModal();
}
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
        style={{display:'flex',background:'none',boxShadow:'none',border:'solid',borderWidth:'0 0 1px 0',borderColor:'#E0E0E0'}}
      >
       
        <Toolbar>
          <div>
            <Button variant='contained' onClick={openModal}>Request Nomination</Button>
            <RequestForm/>
          </div>
          
          {isManager && (
            <>
            <Button color='secondary' variant='contained' onClick={openTeamModal} style={{marginLeft:'3%'}}>Request Team Nomination</Button>
            <RequestTeamForm/>
            </>
          
          
          )}
          <div style={{marginLeft:'2%'}}>
            <Button variant='contained' onClick={openInfoModal}>Reward Information</Button>
            <RewardInfo/>
          </div>
          <div style={{marginLeft:'2%'}}>
            <Button variant='contained' on>My Points: {totalPoints} </Button>
            
          </div>
          {/* <div style={{display:'flex',color:'#DC8B29', marginLeft:'20%', borderStyle:'dashed',borderWidth:'2px',padding:'5px',float:'right'}}>
          <AttachMoneyIcon />
          <Typography>100</Typography>
          </div> */}
          {/* <Typography style={{display:'flex',color:'#DD212A', marginLeft:'5%'}}>HELLO, {empId}!</Typography> */}
        </Toolbar>
      </AppBar>
      
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
        style={{fontSize:'20px'}}
      >
        <Toolbar>
            <img src={logo} width={150}/>
        </Toolbar>
        <Divider />
        <List>
        <ListItem disablePadding>
                <ListItemButton>
                    {/* <ListItemIcon sx={{color:"#DD212A"}}>
                       <DashboardIcon/>
                    </ListItemIcon> */}
                    <ListItemText>
                      <Link to='/Dashboard' style={{textDecoration:'none',color:'black'}}>
                        <Typography variant="body1" sx={{ fontSize: '14px' }} color='black'>Welcome, {empName} !</Typography>
                      </Link>
                    </ListItemText>
                </ListItemButton>
            </ListItem >
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon sx={{color:"#DD212A"}}>
                       <DashboardIcon/>
                    </ListItemIcon>
                    <ListItemText>
                      <Link to='/Dashboard' style={{textDecoration:'none',color:'black'}}>
                        <Typography variant="body1" sx={{ fontSize: '14px' }} color='black'>Dashboard</Typography>
                      </Link>
                    </ListItemText>
                </ListItemButton>
            </ListItem >
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon sx={{color:"#DD212A"}}>
                       <StarsIcon/>
                    </ListItemIcon>
                    <ListItemText>
                      <Link to='/myrewards' style={{textDecoration:'none',color:'black'}}>
                        <Typography variant="body1" sx={{ fontSize: '14px' }} color='black'>My Rewards</Typography>
                        </Link>
                    </ListItemText>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon sx={{color:"#DD212A"}}>
                       <GradeIcon/>
                    </ListItemIcon>
                    <ListItemText>
                      <Link to='/myteamrewards'style={{textDecoration:'none',color:'black'}}>
                        <Typography variant="body1" sx={{ fontSize: '14px' }} color='black'>Team Rewards</Typography>
                        </Link>
                    </ListItemText>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon sx={{color:"#DD212A"}}>
                       <PendingIcon/>
                    </ListItemIcon>
                    <ListItemText>
                      <Link to='/pendingapprovals' style={{textDecoration:'none',color:'black'}}>
                        <Typography variant="body1" sx={{ fontSize: '14px' }} color='black'>Pending Approvals</Typography>
                      </Link>
                    </ListItemText>
                </ListItemButton>
            </ListItem>
            {isManager && (
                <>
                <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon sx={{color:"#DD212A"}}>
                       <RuleSharpIcon/>
                    </ListItemIcon>
                    <ListItemText>
                      <Link to='/employeerequests' style={{textDecoration:'none',color:'black'}}>
                        <Typography variant="body1" sx={{ fontSize: '14px' }} color='black'>Employee Requests</Typography>
                       </Link>
                    </ListItemText>
                </ListItemButton>
            </ListItem>
                
                </>
            )}
            
            
        </List>
        <Divider />
        <List>
        <ListItem disablePadding>
                <ListItemButton disabled>
                    <ListItemIcon  sx={{color:"#F78121"}}>
                       <AccountCircleIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        <Typography variant="body1" sx={{ fontSize: '14px' }} color='black'>My Profile</Typography>
                    </ListItemText>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon sx={{color:"#F78121"}}>
                       <LockResetIcon/>
                    </ListItemIcon>
                    <ListItemText>
                      <Link to='/passwordchange' style={{textDecoration:'none',color:'black'}}>
                        <Typography variant="body1" sx={{ fontSize: '14px' }} color='black'>Change Password</Typography>
                        </Link>
                    </ListItemText>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon sx={{color:"#F78121"}}>
                       <LogoutIcon/>
                    </ListItemIcon>
                    <ListItemText onClick={logout}>
                        <Typography variant="body1" sx={{ fontSize: '14px' }} color='black' >Logout</Typography>
                    </ListItemText>
                </ListItemButton>
            </ListItem>
        </List>
      
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        {/* <Typography paragraph>
          yes
        </Typography>
        <Typography paragraph>
          HI
        </Typography> */}
      </Box>
    </Box>
  
  )
}

export default Sidebar
