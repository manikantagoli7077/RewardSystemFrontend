import React, { useEffect, useState } from 'react'
import DataTable from '../components/DataTable'
import axios from 'axios';
import { fetchMyRewards, fetchPendingApprovals } from '../api/api';

const PendingApprovals = () => {
    const [loading,setLoading]=useState(true)
    const [data, setData] = useState([]);

    useEffect(() => {
      try{
        setLoading(true)
        fetchMyRewards().then((result) => {
          setData(result);
          setLoading(false);
        });

      }catch{
        setLoading(false)
      }
      // Fetch data when the component mounts
      
    }, []);
    const myRewards=data.filter((item)=>item.status==='Pending');
  return (
    <div>
      <DataTable data={myRewards} loading={loading} heading='Pending Approvals'/>
    </div>
  )
}

export default PendingApprovals
