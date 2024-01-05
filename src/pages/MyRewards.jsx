import React, { useEffect, useState } from 'react'
import DataTable from '../components/DataTable'
import axios from 'axios';
import {fetchMyRewards} from '../api/api'

const MyRewards = () => {
    const [loading,setLoading]=useState(true)
    const [data, setData] = useState([]);
    const empId=localStorage.getItem('empId')
    const token=localStorage.getItem('token')
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
    // useEffect(() => {
    //   // Fetch data when the component mounts
    //   try{
    //     setLoading(true)
    //     fetchMyRewards().then((result) => {
    //       setData(result);
    //       setLoading(false);
    //     });
    //   }catch{
    //     setLoading(false);
    //   }
      
    // }, []);

    const myRewards=data.filter((item)=>item.status==='Approved'||item.status==='Rejected');
    
  return (
    <div>
      <DataTable data={myRewards} loading={loading} heading='My Rewards'/>
    </div>
  )
}

export default MyRewards
