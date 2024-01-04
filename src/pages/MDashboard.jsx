import React, { useEffect, useState } from 'react'
import RequestForm from '../components/RequestForm'
import BoxComponent from '../components/BoxComponent'
import { Link } from 'react-router-dom'
import { fetchMyRewards, fetchPendingApprovals, fetchReqCount } from '../api/api'
import MBoxComponent from '../components/MBoxComponent'

const MDashboard = () => {
  const [data, setData] = useState([]);
  const [rdata, setRData] = useState([]);
  const [loading,setLoading]=useState(true);
  const [totalPoints, setTotalpoints]=useState(0);
  useEffect(() => {
    try{
      setLoading(true);
      fetchMyRewards().then((result) => {
        setData(result);
        setLoading(false);
      });
    }catch{
      setLoading(false);
    }
    // Fetch data when the component mounts
    
  }, []);
    useEffect(() => {
      const calculateTotalPoints = () => {
        const approvedRecords=data.filter((item)=>item.status==='Approved');
        const total = approvedRecords.reduce((accumulator, current) => accumulator + parseInt(current.rewards.rewardPoints), 0);
        setTotalpoints(total);
      };
  
      calculateTotalPoints();
    }, [data]);
    const myRewards=data.filter((item)=>item.status==='Pending');
    const pendingApprovalCount=myRewards.length
    useEffect(() => {
      try{
        setLoading(true);
        fetchReqCount().then((result) => {
          setRData(result);
          setLoading(false);
        });
      }catch{
        setLoading(false);
      }
    }, []);
    const reqCount=rdata.filter((item)=>item.status==='Pending');
    const requestCount=reqCount.length;
  return (
    <>
    <RequestForm/>
    <div style={{display:'flex',margin:'20px',float:'left',marginLeft:'5%'}}>
      <Link to='/myrewards' style={{textDecoration: 'none', color: 'black' }}>
        <MBoxComponent heading="My Rewards" loading={loading} number={totalPoints} />
      </Link>
    </div>
    <div style={{display:'flex',margin:'20px',float:'left'}}>
      <Link to='/pendingapprovals' style={{textDecoration: 'none', color: 'black' }}>
        <MBoxComponent heading="Pending Approvals" loading={loading} number={pendingApprovalCount} />
      </Link>
      </div>
      <div style={{display:'flex',margin:'20px'}}>
      <Link to='/employeerequests' style={{textDecoration: 'none', color: 'black' }}>
        <MBoxComponent heading="Employee Requests" loading={loading} number={requestCount} />
      </Link>
      </div>
        
    
    </>
  )
}

export default MDashboard
