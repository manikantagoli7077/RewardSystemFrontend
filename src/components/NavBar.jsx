import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AuthService from '../service/AuthService';
import { useNavigate } from 'react-router-dom';
import { fetchMyName } from '../api/api';
import CircularProgress from '@mui/material/CircularProgress';

const NavBar = () => {
  const navigate=useNavigate()
  const handleLogout=()=>{
    AuthService.logout();
    navigate('/');
  }
  
  const name=localStorage.getItem('empId')
  
  return (
    <div>
      <AppBar position="static">
      <Toolbar>
        <Typography variant='h6'>
          Hello, {name}! Welcome to Reward system.
        </Typography>
        <Button onClick={handleLogout} style={{color:'white',float:'right',display:'flex'}}>Logout</Button>
      </Toolbar>
    </AppBar>
    </div>
  )
}

export default NavBar
