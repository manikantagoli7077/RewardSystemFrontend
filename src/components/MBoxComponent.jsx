import { Avatar, Container, Typography } from '@mui/material'
import React from 'react'
import { deepPurple } from '@mui/material/colors';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const MBoxComponent = ({heading,number}) => {
  return (
    
      <Container maxWidth="sm" style={{
        
        textAlign: 'center',
        marginTop: '20px',
        paddingLeft: '100px',
        paddingRight:'100px',
        paddingTop:'20px',
        paddingBottom:'20px',
        border: '2px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        justifyContent:"space-between"
      }}>
        
      <Typography variant="h4" gutterBottom>
        {heading}
      </Typography>
      <Typography variant="h2" style={{ marginTop: '20px' }}>
        {number}
      {/* <Avatar sx={{ width: 100, height: 100, margin: 'auto', backgroundColor: deepPurple[500] }}>
        <AccessTimeIcon sx={{ fontSize: 50 }} />
      </Avatar> */}
      </Typography>
    </Container>    
    
  )
}

export default MBoxComponent
