import { Grid, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import BoxComponent from '../components/BoxComponent'
import RequestForm from '../components/RequestForm'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { fetchMyRewards, fetchPendingApprovals } from '../api/api'

const Dashboard = () => {
    // const classes = useStyles();
    const [data, setData] = useState([]);
    const [pendingApprovals,setPendingApprovals]=useState([]);
    const [totalPoints, setTotalpoints]=useState(0);
    // const [pendingApprovals, setPendingapprovals]=useState(0);

    useEffect(() => {
      // Fetch data when the component mounts
      fetchMyRewards().then((result) => {
        setData(result);
      });
    }, []);
      useEffect(() => {
        const calculateTotalPoints = () => {
          const approvedRecords=data.filter((item)=>item.status==='Approved');
          const total = approvedRecords.reduce((accumulator, current) => accumulator + current.points, 0);
          setTotalpoints(total);
        };
    
        calculateTotalPoints();
      }, [data]);

      // useEffect(() => {
      //   // Fetch data when the component mounts
      //   fetchMyRewards().then((result) => {
      //     setPendingApprovals(result);
      //   });
      // }, []);
      const myRewards=data.filter((item)=>item.status==='pending');
      const pendingApprovalCount=myRewards.length;

  return (
    
    <>
    <RequestForm/>
    <div style={{display:'flex',margin:'50px',float:'left',marginLeft:'13%'}}>
      <Link to='/myrewards' style={{textDecoration: 'none', color: 'black' }}>
        <BoxComponent heading="My Rewards" number={totalPoints} />
      </Link>
    </div>
    <div style={{display:'flex',margin:'50px'}}>
      <Link to='/pendingapprovals' style={{textDecoration: 'none', color: 'black' }}>
        <BoxComponent heading="Pending Approvals" number={pendingApprovalCount} />
      </Link>
      </div>
        
    
    </>
  )
}

export default Dashboard
