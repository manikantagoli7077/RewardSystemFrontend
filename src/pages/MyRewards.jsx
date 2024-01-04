import React, { useEffect, useState } from 'react'
import DataTable from '../components/DataTable'
import axios from 'axios';
import {fetchMyRewards} from '../api/api'

const MyRewards = () => {
    const [loading,setLoading]=useState(true)
    const [data, setData] = useState([]);
    
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

    const myRewards=data.filter((item)=>item.status==='Approved'||item.status==='Rejected');
    
  return (
    <div>
      <DataTable data={myRewards} loading={loading} heading='My Rewards'/>
    </div>
  )
}

export default MyRewards
