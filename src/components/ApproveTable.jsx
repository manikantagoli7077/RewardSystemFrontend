import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Button } from '@mui/material'
import axios from 'axios';

const ApproveTable = ({data,heading}) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Fetch data from the JSON Server API
    axios.get('http://localhost:3500/myrewards')
      .then(response => setTableData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleActionClick = (id, status) => {
    // Find the row with the given id in the local state
    const updatedData = tableData.map(row => {
      if (row.id === id) {
        return { ...row, status }; // Update the status field
      }
      return row;
    });

    // Update the local state
    setTableData(updatedData);

    // Send a PATCH request to update the status in the JSON Server API
    axios.patch(`http://localhost:3500/myrewards/${id}`, { status })
      .then(response => {
        console.log('Status updated successfully:', response.data)
        alert(`${status} Successfully`);
        window.location.reload();
  })
      .catch(error => console.error('Error updating status:', error));
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
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell></TableCell>
              <TableCell>{row.selectedOption}</TableCell>
              <TableCell>{row.points}</TableCell>
              <TableCell>{row.comment}</TableCell>
              <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleActionClick(row.id,'Approved')}>
                    Approve
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => handleActionClick(row.id,'Rejected')} style={{ marginLeft: '8px' }}>
                    Reject
                  </Button>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default ApproveTable
