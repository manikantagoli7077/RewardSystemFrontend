import { Avatar, Container, Typography } from '@mui/material'
import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';

const BoxComponent = ({heading,number,loading}) => {
  return (
    
      <Container maxWidth="sm" style={{
        
        textAlign: 'center',
        marginTop: '20px',
        paddingLeft: '150px',
        paddingRight:'150px',
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

export default BoxComponent
