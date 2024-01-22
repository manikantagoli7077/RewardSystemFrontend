import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';

const RewardInfo = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [Rewards, setRewards] = useState([]);
    const [loading, setLoading] = useState(true);
    const BASE_URL=localStorage.getItem('BASE_URL');
    const token=localStorage.getItem('token')
    
    const openModal = () => {
        setModalOpen(true);
      };
    
      const closeModal = () => {
        setModalOpen(false);
      };
      RewardInfo.openModal = openModal;

      useEffect(()=>{
        const fetchRewardInfo=async()=>{
          try{
            setLoading(true);
            const response=await axios.get(`${BASE_URL}/api/all`,{
              headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+token
              },
            });
            setRewards(response.data);
            setLoading(false);
          }catch(error){
            console.error('Error fetching options:',error);
            setLoading(false);
          }
        };
        fetchRewardInfo();
      },[]);
    

  return (
    <div>
      <Dialog open={isModalOpen} onClose={closeModal}>
        <DialogTitle>
            <Typography>Reward Information</Typography>
        </DialogTitle>
        <DialogContent>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Reward Name</TableCell>
                            <TableCell>Points</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                    loading?(
                        <TableRow>
                            <TableCell colSpan={5}>
                                <CircularProgress size={20}/>Loading...
                            </TableCell>
                        </TableRow>
                    ):(
                        Rewards.map((row)=>(
                            <TableRow key={row.id}>
                                <TableCell>{row.rewardName}</TableCell>
                                <TableCell>{row.rewardPoints}</TableCell>                               
                            </TableRow>
                        ))
                    )
                }
                    </TableBody>
                </Table>
            </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default RewardInfo
