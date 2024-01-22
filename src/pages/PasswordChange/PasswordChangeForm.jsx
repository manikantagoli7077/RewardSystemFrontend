import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Paper } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

const PasswordChangeForm = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [verifyNewPassword, setVerifyNewPassword] = useState('');
  const email=localStorage.getItem('email');
  const[loading,setLoading]=useState(false)

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    // Check if new passwords match
    if (newPassword !== verifyNewPassword) {
      console.error('New passwords do not match');
      alert('Passwords do not match')
      return;
    }
    
    try {
      setLoading(true)
      // Send a POST request with the form data
      const response = await axios.post('http://localhost:8080/auth/reset', {
        email,
        currentPassword,
        newPassword,
      });

      // Handle the response (you can update this part based on your API)
      console.log('Password change successful:', response.data);
      alert('Password successfully changed');
      window.location.reload();
      setLoading(false)
    } catch (error) {
      console.error('Error changing password:', error.message);
      alert('Please enter correct password')
      setLoading(false);
    }
  };

  return (
    
    <Container component="main" maxWidth="xs">
        <Sidebar/>
      <Box elevation={3} style={{padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Change Password
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: 20 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Current Password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Verify New Password"
            type="text"
            value={verifyNewPassword}
            onChange={(e) => setVerifyNewPassword(e.target.value)}
          />
          <Button disabled={loading} startIcon={loading && <CircularProgress size={20}/>} type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: 20 }}>
            Change Password
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default PasswordChangeForm;
