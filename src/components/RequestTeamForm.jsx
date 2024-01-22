import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useState } from 'react'

const RequestTeamForm = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const openModal = () => {
        setModalOpen(true);
      };
    
      const closeModal = () => {
        setModalOpen(false);
      };
      RequestTeamForm.openModal = openModal;
  return (
    <div>
      <Dialog open={isModalOpen} onClose={closeModal}>
        <DialogTitle>Request Team Form</DialogTitle>
        <DialogContent>Coming Soon</DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default RequestTeamForm
