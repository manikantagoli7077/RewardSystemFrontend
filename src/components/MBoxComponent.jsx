import { Avatar, Container, Typography } from '@mui/material'
import React from 'react'
import { deepPurple } from '@mui/material/colors';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CircularProgress from '@mui/material/CircularProgress';

const MBoxComponent = ({heading,number,loading}) => {
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
        {
          loading?(
            <CircularProgress size={40}/>
          ):(
            <>{number}</>
          )
        }
      </Typography>
    </Container>    
    
  )
}

export default MBoxComponent
