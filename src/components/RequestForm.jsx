import { Button, Container, FormControl, FormLabel, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
// import AuthService from '../service/AuthService';

const RequestForm = () => {
  const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
  const [comment, setComment] = useState('');
  const [empId, setEmpId] = useState('');

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
        const response = await axios.get('http://localhost:3500/options');
        setOptions(response.data);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchOptions();
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const empId=localStorage.getItem('empId');
    const selectedOptionObject = options.find(option => option.value === selectedOption);
    const status="pending"
    try {
      const response = await axios.post('http://localhost:3500/myrewards', {
        selectedOption,
        comment,
        status,
        value: selectedOptionObject.value,
        points: selectedOptionObject.points,
        // empId
      });

      // Handle the response as needed
      console.log('Response:', response.data);
      alert('Submitted Successfully')
      window.location.reload();
    } catch (error) {
      // Handle errors
      console.error('Error:', error);
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
            {options.map((option) => (
              <MenuItem key={option.id} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          id="comment"
          label="Comment"
          multiline
          rows={4}
          fullWidth
          margin="normal"
          variant="outlined"
          value={comment}
          onChange={handleCommentChange}
          required
        />

        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </Container>
  );
};
 

export default RequestForm
