import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import AuthService from '../service/AuthService';
import { useNavigate } from 'react-router-dom';
const NavBar = (user,logout) => {
  const navigate=useNavigate()
  const handleLogout=()=>{
    AuthService.logout();
    navigate('/');
  }
  const username=localStorage.getItem('name')
  console.log({user})
  return (
    <div>
      <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          Hello, {username}! Welcome to Reward system.
        </Typography>
        <Button onClick={handleLogout} style={{color:'white',float:'right',display:'flex'}}>Logout</Button>
      </Toolbar>
    </AppBar>
    </div>
  )
}

export default NavBar
