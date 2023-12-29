import React from 'react'
import RequestForm from '../components/RequestForm'
import { AppBar, Toolbar, Typography } from '@mui/material'
import BoxComponent from '../components/BoxComponent'
import Dashboard from './Dashboard'
import NavBar from '../components/NavBar'

const Employee = () => {
  return (
    <div>
      <NavBar/>
    <Dashboard/>
    </div>
    
  )
}

export default Employee
