// api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3500';

export const fetchMyRewards = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/myrewards`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
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
