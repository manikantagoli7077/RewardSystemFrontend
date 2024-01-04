import { Button, Container, FormControl, FormLabel, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
// import AuthService from '../service/AuthService';

const RequestForm = () => {
  const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
  const [comments, setComments] = useState('');
  const [empId, setEmpId] = useState('');
  const token=localStorage.getItem('token');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [rewards,setRewards]=useState({});


  useEffect(() => {
    // Retrieve employee ID from localStorage when the component mounts
    const storedEmployeeId = localStorage.getItem('empId');
    if (storedEmployeeId) {
      setEmpId(storedEmployeeId);
    }
  }, []);

  useEffect(() => {
    // Fetch options from API when the component mounts
    const fetchOptions = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://rewardsystembackend.onrender.com/api/all',{
          headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer '+token
          },
        });
        console.log(response.data)
        setOptions(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching options:', error);
        setLoading(false);
      }
    };

    fetchOptions();
  }, []);

  const handleOptionChange = (event) => {
    const selectedRewardName = event.target.value;
    setSelectedOption(selectedRewardName);
    const selectedRewardObject = options.find(option => option.rewardName === selectedRewardName);
    setRewards(selectedRewardObject);

  };

  const handleCommentChange = (event) => {
    setComments(event.target.value);
  };
 

  const handleSubmit = async (event) => {
    setSubmitting(true);
    event.preventDefault();
    // const empId=localStorage.getItem('empId');
    const selectedOptionObject = options.find(option => option.rewardName === selectedOption);
    const status="pending"
    try {
      const headers={
        'Content-Type':'application/json',
        'Authorization':'Bearer '+token,
      }
      const response = await axios.post(`https://rewardsystembackend.onrender.com/api/submit/${empId}`,{
        comments:comments,
        rewards:rewards
      },{headers});
      // Handle the response as needed
      console.log('Response:', response.data);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert('Submitted Successfully')
      setSubmitting(false);
      window.location.reload();
    } catch (error) {
      // Handle errors
      console.error('Error:', error);
      setSubmitting(false);
    }
  };
  
  return (
    <Container maxWidth="md" style={{ marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        Request form
      </Typography>

      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="select-label">Select Option</InputLabel>
          <Select
            labelId="select-label"
            id="select"
            value={selectedOption}
            onChange={handleOptionChange}
            required
          >
            {loading?(
              <MenuItem disabled><CircularProgress size={20} /> Loading...</MenuItem>
            ):(
            options.map((option) => (
              <MenuItem key={option.id} value={option.rewardName}>
                {option.rewardName}
              </MenuItem>
              ))
            )}
          </Select>
        </FormControl>

        <TextField
          id="comments"
          label="Comments"
          multiline
          rows={4}
          fullWidth
          margin="normal"
          variant="outlined"
          value={comments}
          onChange={handleCommentChange}
          required
        />

        <Button 
            variant="contained" 
            color="primary" 
            type="submit" 
            disabled={submitting}
            // disableElevation={submitting}
            startIcon={submitting && <CircularProgress size={20}/>}
        >
          {submitting ? 'Submitting...Please wait' : 'Submit'}
        </Button>
      </form>
    </Container>
  );
};
 

export default RequestForm
