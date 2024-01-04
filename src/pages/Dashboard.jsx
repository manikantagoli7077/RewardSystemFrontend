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
    const [loading,setLoading]=useState(true);
    // const [pendingApprovals, setPendingapprovals]=useState(0);

    useEffect(() => {
      // Fetch data when the component mounts
      try{
        setLoading(true)
        fetchMyRewards().then((result) => {
          setData(result);
          setLoading(false);
        });
      }catch{
        setLoading(false);
      }
      
    }, []);
      useEffect(() => {
        const calculateTotalPoints = () => {
          const approvedRecords=data.filter((item)=>item.status==='Approved');
          const total = approvedRecords.reduce((accumulator, current) => accumulator + parseInt(current.rewards.rewardPoints), 0);
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
      const myRewards=data.filter((item)=>item.status==='Pending');
      const pendingApprovalCount=myRewards.length;

  return (
    
    <>
    <RequestForm/>
    <div style={{display:'flex',margin:'50px',float:'left',marginLeft:'13%'}}>
      <Link to='/myrewards' style={{textDecoration: 'none', color: 'black' }}>
        <BoxComponent heading="My Rewards" loading={loading} number={totalPoints} />
      </Link>
    </div>
    <div style={{display:'flex',margin:'50px'}}>
      <Link to='/pendingapprovals' style={{textDecoration: 'none', color: 'black' }}>
        <BoxComponent heading="Pending Approvals" loading={loading} number={pendingApprovalCount} />
      </Link>
      </div>
        
    
    </>
  )
}

export default Dashboard
