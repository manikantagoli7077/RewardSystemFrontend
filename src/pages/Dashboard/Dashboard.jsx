import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material';
import AuthService from '../Service/AuthService';
import Testemp from '../../components/testemp';
import Testman from '../../components/testman';
import Sidebar from '../../components/Sidebar';
import BoxComponent from '../../components/BoxComponent';
import MBoxComponent from '../../components/MBoxComponent';
import axios from 'axios';
import { Link } from 'react-router-dom';

const userRole = AuthService.getRole();

const Dashboard = () => {
  const [data, setData] = useState([]);
    const [totalPoints, setTotalpoints]=useState(0);
    const [loading,setLoading]=useState(true);
    const empId=localStorage.getItem('empId')
    const token=localStorage.getItem('token')
    const BASE_URL=localStorage.getItem('BASE_URL')
    const [rdata,setRData]=useState([]);

    useEffect(() => {
      const fetchMyRewards = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`${BASE_URL}/api/myrequests/${empId}`,{
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
          localStorage.setItem('totalPoints',total)
        };
        
        calculateTotalPoints();
      }, [data]);

      const myRewards=data.filter((item)=>item.status==='Pending');
      const pendingApprovalCount=myRewards.length;
      useEffect(() => {
        // Fetch options from API when the component mounts
        const fetchReqCount = async () => {
          try {
            setLoading(true);
            const response = await axios.get(`${BASE_URL}/api/requests/${empId}`,{
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
  let componentsToRender;

  switch(userRole){
    case 'ROLE_EMPLOYEE':
      componentsToRender=(
    <div style={{display:'flex'}}>
        <div>
          <Link to='/myrewards' style={{textDecoration: 'none', color: 'black' }}>
            <BoxComponent heading="My Rewards" loading={loading} number={totalPoints} />
          </Link>
        </div>
        <div>
          <Link to='/pendingapprovals' style={{textDecoration: 'none', color: 'black' }}>
            <BoxComponent heading="Pending Approvals" loading={loading} number={pendingApprovalCount} />
          </Link>
        </div>
      </div>
      );
      break;
      case 'ROLE_MANAGER':
        componentsToRender=(
        <div style={{display:'flex'}}>
          <div>
            <Link to='/myrewards' style={{textDecoration: 'none', color: 'black' }}>
              <BoxComponent heading="My Rewards" loading={loading} number={totalPoints} />
            </Link>
          </div>
          <div>
            <Link to='/pendingapprovals' style={{textDecoration: 'none', color: 'black' }}>
              <BoxComponent heading="Pending Approvals" loading={loading} number={pendingApprovalCount} />
            </Link>
          </div>
          <div >
            <Link to='/employeerequests' style={{textDecoration: 'none', color: 'black' }}>
              <MBoxComponent heading="Employee Requests" loading={loading} number={requestCount} />
            </Link>
         </div>
        </div>
        );
        break;
  }

  return (
    <Box>
      <Sidebar/>
      <div style={{marginLeft:'20%'}}>
      {componentsToRender}
      </div>
    </Box>
  )
}

export default Dashboard
