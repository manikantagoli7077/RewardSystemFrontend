import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import DataTable from '../../components/DataTable'
import axios from 'axios';

const MyRewards = () => {
  const [loading,setLoading]=useState(true);
  const [data,setData]=useState([]);
  const empId=localStorage.getItem('empId')
  const token=localStorage.getItem('token')
  const BASE_URL=localStorage.getItem('BASE_URL')

  useEffect(()=>{
    const fetchMyRewards=async ()=>{
      try{
        setLoading(true);
        const response=await axios.get(`${BASE_URL}/api/myrequests/${empId}`,{
          headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer '+token
          },
        });
        setData(response.data)
        console.log(response.data)
        setLoading(false);
      }catch(error){
        console.error('Error fetching options:',error);
        setLoading(false);
      }
    };
    fetchMyRewards();
  },[]);
  const myRewards=data.filter((item)=>item.status==='Approved'||item.status==='Rejected');
  return (
    <div>
        <Sidebar/>
        <div style={{marginLeft:'20%'}}>
        
            {/* MyRewards */}
        <DataTable data={myRewards} loading={loading} heading='My Rewards'/>
        </div>
    </div>
  )
}

export default MyRewards
