import React, { useEffect, useState } from 'react'
import DataTable from '../components/DataTable'
import axios from 'axios';
import {fetchMyRewards} from '../api/api'

const MyRewards = () => {
    const [data, setData] = useState([]);
    
    useEffect(() => {
      // Fetch data when the component mounts
      fetchMyRewards().then((result) => {
        setData(result);
      });
    }, []);

    const myRewards=data.filter((item)=>item.status==='Approved'||item.status==='Rejected');
    
  return (
    <div>
      <DataTable data={myRewards} heading='My Rewards'/>
    </div>
  )
}

export default MyRewards
