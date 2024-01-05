import React, { useState } from 'react';
import { Button, TextField, Paper, Typography, Container } from '@mui/material';
import AuthService from '../service/AuthService';
import { useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie';
import animationData from '../lottie/lottie'
import animationData2 from '../lottie/lottie2'
import CircularProgress from '@mui/material/CircularProgress';

const Login = () => {
const navigate=useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: animationData2,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

const handleLogin = async () => {
    try {
      setLoading(true);
      await AuthService.signIn(username, password);
      const userRole = AuthService.getRole();
      
      if (userRole === 'ROLE_EMPLOYEE') {
        navigate('/employee');
      } else if (userRole === 'ROLE_MANAGER') {
        navigate('/manager');
      } else {
        console.error('Invalid user role');
        
      }
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert("Login Successfull")
      setLoading(false);
    } catch (error) {
      console.error('Login failed:', error.message);
      alert("Login Failed")
      setLoading(false);
      
      
    }
  };


  return (
    <>
    <div style={{display:'flex',float:'left',marginLeft:'4%'}}>
      <Lottie 
	    options={defaultOptions}
        height={400}
        width={400}
      />
    </div>
    
    <Container component="main" maxWidth="sm" style={{marginTop:"6%"}}>
      <div style={
        {textAlign: 'center',
        marginBottom:'10%',
        paddingLeft: '150px',
        paddingRight:'150px',
        paddingTop:'20px',
        paddingBottom:'20px',
        border: '2px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        justifyContent:"space-between"}}>
      <Typography variant="h5">Reward System</Typography>
      
      </div>
    
      <Paper elevation={3} style={{ padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5">Login</Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
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
      </Paper>
    </Container>
    
    </>
  );
};

export default Login;
