import { Avatar, Box, Container, Typography } from '@mui/material'
import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';

const MBoxComponent = ({heading,number,loading}) => {
    const textStyle={
        color:'white'
    }
  return (
    
      <Box maxWidth="sm" style={{
        
        textAlign: 'center',
        marginTop: '2px',
        paddingLeft: '50px',
        paddingRight:'50px',
        marginLeft:'',
        paddingTop:'20px',
        paddingBottom:'20px',
        border: '2px solid #ccc',
        borderRadius: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        background:'#DD212A',
        justifyContent:"space-between",
      }}>
        <div >

      <Typography style={textStyle}  variant="h5" gutterBottom>
        {heading}
      </Typography>
        </div>
      <Typography  variant="h3" style={{ marginTop: '10px',color:'white' }}>
        {
          loading?(
            <CircularProgress size={40}/>
          ):(
            <>{number}</>
          )
        }
      </Typography>
    </Box>    
    
  )
}

export default MBoxComponent
