import React, { useEffect, useState } from 'react'
import DataTable from '../components/DataTable'
import axios from 'axios';
// import { fetchMyRewards, fetchPendingApprovals } from '../api/api';

const PendingApprovals = () => {
    const [loading,setLoading]=useState(true)
    const [data, setData] = useState([]);
    const empId=localStorage.getItem('empId')
    const token=localStorage.getItem('token')

    // useEffect(() => {
    //   try{
    //     setLoading(true)
    //     fetchMyRewards().then((result) => {
    //       setData(result);
    //       setLoading(false);
    //     });

    //   }catch{
    //     setLoading(false)
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
    const myRewards=data.filter((item)=>item.status==='Pending');
  return (
    <div>
      <DataTable data={myRewards} loading={loading} heading='Pending Approvals'/>
    </div>
  )
}

export default PendingApprovals
