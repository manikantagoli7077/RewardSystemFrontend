import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material'
import React from 'react'
import NavBar from './NavBar'

const DataTable = ({data,heading}) => {
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
            <TableCell>Reward</TableCell>
            <TableCell>Points</TableCell>
            <TableCell>Comments</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.selectedOption}</TableCell>
              <TableCell>{row.points}</TableCell>
              <TableCell>{row.comment}</TableCell>
              <TableCell style={{ color: getStatusColor(row.status) }}>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    
  )
}
const getStatusColor = (status) => {
  switch (status) {
    case 'pending':
      return 'orange';
    case 'Rejected':
      return 'red';
    case 'Approved':
      return 'green';
    default:
      return 'black'; // You can set a default color or handle other cases as needed
  }
};

export default DataTable
