import React, { useState } from 'react'
import { Button, TextField, Paper, Typography, Container, Grid, CssBaseline, Avatar } from '@mui/material';
import {makeStyles} from '@mui/styles';
import { Link, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import AuthService from '../Service/AuthService';
import { Box } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';


const Login = () => {

    const navigate=useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    

    // const red='#DD212A'
    const handleLogin = async () => {
        try {
          setLoading(true);
          await AuthService.signIn(username, password);
          const userRole = AuthService.getRole();
          
          if (userRole === 'ROLE_EMPLOYEE') {
            navigate('/Dashboard');
            console.log('Login successfull')
          } else if (userRole === 'ROLE_MANAGER') {
            navigate('/Dashboard');
          } else if (userRole === 'ROLE_ADMIN') {
              navigate('/Admin');
          } else {
            console.error('Invalid user role');
            
          }
          await new Promise((resolve) => setTimeout(resolve, 2000));
          alert("Login Successfull")
          setLoading(false);
          window.location.reload();
        } catch (error) {
          console.error('Login failed:', error.message);
          alert("Login Failed")
          setLoading(false);
          window.location.reload();
          
          
        }
      };
  return (
    <Container component="main" maxWidth="sm" style={{marginTop:"6%"}}>
       
      
      <Box style={{ padding: 50 , display: 'flex', flexDirection: 'column', alignItems: 'center',marginTop:'8%',width:'70%' }}>
      <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
        <Typography variant="h5">Reward System Login</Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          color='black'
          id="username"
          label="username"
          name="username"
          autoComplete="username"
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          
          
          
          
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          color='black'
          
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button 
          type="button"
          fullWidth
          variant="contained"
          
          color="primary"
          style={{ margin: '16px 0' }}
          onClick={handleLogin}
         
          
          disabled={loading}
          startIcon={loading && <CircularProgress size={20}/>}
        >
          {loading ? 'Logging in...Please wait' : 'Login'}
        </Button>
        <Grid container display='none'>
              <Grid item xs disabled>
                <Link href="#" variant="body2" disabled>
                  Forgot password?
                </Link>
              </Grid>
              
            </Grid>

      </Box>
    </Container>
  )
}

export default Login
