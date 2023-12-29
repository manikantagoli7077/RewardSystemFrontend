import React, { useEffect, useState } from 'react'
import DataTable from '../components/DataTable'
import axios from 'axios';
import { fetchMyRewards, fetchPendingApprovals } from '../api/api';

const PendingApprovals = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
      // Fetch data when the component mounts
      fetchMyRewards().then((result) => {
        setData(result);
      });
    }, []);
    const myRewards=data.filter((item)=>item.status==='pending');
  return (
    <div>
      <DataTable data={myRewards} heading='Pending Approvals'/>
    </div>
  )
}

export default PendingApprovals
