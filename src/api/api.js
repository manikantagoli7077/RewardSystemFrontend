// api.js
import axios from 'axios';

const BASE_URL = 'https://rewardsystembackend.onrender.com';
const token=localStorage.getItem('token');
const empId=localStorage.getItem('empId');
const headers={
  'Content-Type':'application/json',
  'Authorization':'Bearer '+token,
};

// export const fetchMyRewards = async () => {
//   try {
//     const response = await axios.get(`${BASE_URL}/api/myrequests/${empId}`,{headers});
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     throw error;
//   }
// };
export const fetchReqCount = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/requests/${empId}`,{headers});
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
// export const fetchMyName = async () => {
//   try {
//     const response = await axios.get(`${BASE_URL}/api/getname/${empId}`,{headers});
//     localStorage.setItem('empName',response.data)
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     throw error;
//   }
// };
export const fetchPendingApprovals = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/pendingapprovals`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };


export const postData = async (payload) => {
  try {
    const response = await axios.post(`${BASE_URL}/post`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};
