import React, { useEffect, useState } from 'react'
import RequestForm from '../components/RequestForm'
import BoxComponent from '../components/BoxComponent'
import { Link } from 'react-router-dom'
import { fetchMyRewards, fetchPendingApprovals } from '../api/api'
import MBoxComponent from '../components/MBoxComponent'

const MDashboard = () => {
  const [data, setData] = useState([]);
  const [pendingApprovals,setPendingApprovals]=useState([]);
  const [totalPoints, setTotalpoints]=useState(0);
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
    <div style={{display:'flex',margin:'20px',float:'left',marginLeft:'5%'}}>
      <Link to='/myrewards' style={{textDecoration: 'none', color: 'black' }}>
        <MBoxComponent heading="My Rewards" number={totalPoints} />
      </Link>
    </div>
    <div style={{display:'flex',margin:'20px',float:'left'}}>
      <Link to='/pendingapprovals' style={{textDecoration: 'none', color: 'black' }}>
        <MBoxComponent heading="Pending Approvals" number={pendingApprovalCount} />
      </Link>
      </div>
      <div style={{display:'flex',margin:'20px'}}>
      <Link to='/employeerequests' style={{textDecoration: 'none', color: 'black' }}>
        <MBoxComponent heading="Employee Requests" number={pendingApprovalCount} />
      </Link>
      </div>
        
    
    </>
  )
}

export default MDashboard
