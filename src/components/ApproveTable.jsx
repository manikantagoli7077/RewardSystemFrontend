import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Button } from '@mui/material'
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

const ApproveTable = ({data,heading,loading}) => {

  const token=localStorage.getItem('token');
  const empId=localStorage.getItem('empId')

  const handleApprove = (id) => {
    // Send a PUT request with the approval status set to true
    const headers={
      'Content-Type':'application/json',
      'Authorization':'Bearer '+token,
    }
    axios.put(`https://rewardsystembackend.onrender.com/api/approveOrReject/${empId}`, { id:id,approve: true },{headers})
      .then(response => {
        // Handle the response accordingly (update local state, show a message, etc.)
        console.log('Request Approved:', response.data);
        alert("Request Approved");
        window.location.reload();
      })
      .catch(error => {
        console.error('Error updating data:', error);
      });
  };
  const handleReject = (id) => {
    // Send a PUT request with the approval status set to false
    const headers={
      'Content-Type':'application/json',
      'Authorization':'Bearer '+token,
    }
    axios.put(`https://rewardsystembackend.onrender.com/api/approveOrReject/${empId}`, { id:id,approve: false },{headers})
      .then(response => {
        // Handle the response accordingly (update local state, show a message, etc.)
        console.log('Request Rejected:', response.data);
        alert("Request Rejected");
        window.location.reload();
      })
      .catch(error => {
        console.error('Error updating data:', error);
      });
  };

  return (
    <div>
      <NavBar/>
        <Typography variant="h4" gutterBottom style={{display:'flex', margin:'3%'}}>
        {heading}
      </Typography>
      <TableContainer component={Paper} elevation={3} style={{maxWidth:'70%',justifyContent:'center',margin:'3%',border: '2px solid #ddd', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}} >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Employee Name</TableCell>
            <TableCell>Reward</TableCell>
            <TableCell>Points</TableCell>
            <TableCell>Comments</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
            <TableCell colSpan={5}>
              <CircularProgress size={20} /> Loading...
            </TableCell>
          </TableRow>
          ):(
            data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.empId}</TableCell>
              <TableCell>{row.rewards?row.rewards.rewardName:'N/A'}</TableCell>
              <TableCell>{row.rewards?row.rewards.rewardName:'N/A'}</TableCell>
              <TableCell>{row.comments}</TableCell>
              <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleApprove(row.id)}>
                    Approve
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => handleReject(row.id)} style={{ marginLeft: '8px' }}>
                    Reject
                  </Button>
                </TableCell>
            </TableRow>
          ))
        )}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default ApproveTable
