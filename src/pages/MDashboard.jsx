import React, { useEffect, useState } from 'react'
import RequestForm from '../components/RequestForm'
import BoxComponent from '../components/BoxComponent'
import { Link } from 'react-router-dom'
// import { fetchMyRewards, fetchPendingApprovals, fetchReqCount } from '../api/api'
import MBoxComponent from '../components/MBoxComponent'
import axios from 'axios'

const MDashboard = () => {
  const [data, setData] = useState([]);
  const [rdata, setRData] = useState([]);
  const [loading,setLoading]=useState(true);
  const [totalPoints, setTotalpoints]=useState(0);
  const empId=localStorage.getItem('empId')
  const token=localStorage.getItem('token')
  // useEffect(() => {
  //   try{
  //     setLoading(true);
  //     fetchMyRewards().then((result) => {
  //       setData(result);
  //       setLoading(false);
  //     });
  //   }catch{
  //     setLoading(false);
  //   }
  //   // Fetch data when the component mounts
    
  // }, []);
  useEffect(() => {
    // Fetch options from API when the component mounts
    const fetchMyRewards = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://rewardsystembackend.onrender.com/api/myrequests/${empId}`,{
          headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer '+token
          },
        });
        console.log(response.data)
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching options:', error);
        setLoading(false);
      }
    };

    fetchMyRewards();
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
    // useEffect(() => {
    //   try{
    //     setLoading(true);
    //     fetchReqCount().then((result) => {
    //       setRData(result);
    //       setLoading(false);
    //     });
    //   }catch{
    //     setLoading(false);
    //   }
    // }, []);
    useEffect(() => {
      // Fetch options from API when the component mounts
      const fetchReqCount = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`https://rewardsystembackend.onrender.com/api/requests/${empId}`,{
            headers:{
              'Content-Type':'application/json',
              'Authorization':'Bearer '+token
            },
          });
          console.log(response.data)
          setRData(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching options:', error);
          setLoading(false);
        }
      };
  
      fetchReqCount();
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
