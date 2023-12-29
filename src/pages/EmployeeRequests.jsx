import React, { useEffect, useState } from 'react'
import ApproveTable from '../components/ApproveTable';
import axios from 'axios';

const EmployeeRequests = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Fetch data from your API using Axios
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:3500/myrewards'); // Replace with your actual API endpoint
            setData(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);
      const myRewards=data.filter((item)=>item.status==='pending');

      
    

  return (
    <div>
      <ApproveTable data={myRewards} heading='Employee Requests'  />
    </div>
  )
}

export default EmployeeRequests
