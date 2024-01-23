import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Button } from '@mui/material'
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import "./style.css"
const ApproveTable = ({data,heading,loading}) => {

  const token=localStorage.getItem('token');
  const empId=localStorage.getItem('empId');
  const BASE_URL=localStorage.getItem('BASE_URL');
  

  const handleApprove = (id) => {
    const headers={
      'Content-Type':'application/json',
      'Authorization':'Bearer '+token,
    }
    axios.put(`${BASE_URL}/api/approveOrReject/${empId}`, { id:id,approve: true },{headers})
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
    axios.put(`${BASE_URL}/api/approveOrReject/${empId}`, { id:id,approve: false },{headers})
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
  const tableHeadStyle = {
    borderRadius: '10px', // You can adjust the value as needed
    backgroundColor: '#00539F',
    border: '1px solid #ccc',
  };
  const tableCellStyle = {
    color:'white',
    fontWeight:"5px"
  };
  const tableBodyStyle = {
    border: '1px solid #ccc',
  };
  return (
    <div>
      
        {/* <Typography variant="h4" gutterBottom style={{display:'flex', margin:'3%'}}>
        {heading}
      </Typography> */}
      <TableContainer className="table-container" >
      <Table style={{width:'85%'}}>
        <TableHead style={tableHeadStyle}>
          <TableRow className="table-header">
            <TableCell style={tableCellStyle}>EmpName</TableCell>
            <TableCell style={tableCellStyle}>Reward</TableCell>
            <TableCell style={tableCellStyle}>Points</TableCell>
            <TableCell style={tableCellStyle}>Comments</TableCell>
            <TableCell style={tableCellStyle}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={tableBodyStyle}>
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
              <TableCell width='200px'>
                  <Button  variant="contained" color="primary" onClick={() => handleApprove(row.id)} size='small'>
                    Approve
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => handleReject(row.id)} size='small' style={{ marginLeft: '8px' }}>
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
