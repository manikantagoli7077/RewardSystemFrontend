// YourComponent.js
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

const RequestForm = () => {
    const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [comments,setComments]=useState('');
  const [rewards,setRewards]=useState({});
  const [empId,setEmpId]=useState('');
  const BASE_URL=localStorage.getItem('BASE_URL')
  const token=localStorage.getItem('token')
  

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  RequestForm.openModal = openModal;

  useEffect(()=>{
    const storedEmployeeId=localStorage.getItem('empId');
    if(storedEmployeeId){
      setEmpId(storedEmployeeId);
    }
  },[]);

  useEffect(()=>{
    const fetchOptions=async()=>{
      try{
        setLoading(true);
        const response=await axios.get(`${BASE_URL}/api/all`,{
          headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer '+token
          },
        });
        setOptions(response.data);
        setLoading(false);
      }catch(error){
        console.error('Error fetching options:',error);
        setLoading(false);
      }
    };
    fetchOptions();
  },[]);

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
    const selectedOptionObject = options.find(option => option.rewardName === selectedOption);
    const status="pending"
    try {
      const headers={
        'Content-Type':'application/json',
        'Authorization':'Bearer '+token,
      }
      const response = await axios.post(`${BASE_URL}:8080/api/submit/${empId}`,{
        comments:comments,
        rewards:rewards
      },{headers});
      // Handle the response as needed
      console.log('Response:', response.data);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert('Submitted Successfully')
      setSubmitting(false);
      window.location.reload(true);
    } catch (error) {
      // Handle errors
      console.error('Error:', error);
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Dialog open={isModalOpen} onClose={closeModal}>
        <DialogTitle>Request form</DialogTitle>
        <DialogContent>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RequestForm;


