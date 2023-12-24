import React from 'react';
import swal from 'sweetalert';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemText, TextField, MenuItem, Box } from '@mui/material';


const DeleteModal = ({ isOpen, onClose, rowData, onDelete }) => {
  // Add logic to delete the row
  const handleDeleteClick = () => {
    onDelete(rowData); // Call the passed onDelete function with the selected row data
    swal("Product deleted!", "", "warning");
    onClose();
  };

  if (!rowData) {
    return null; // or display a message or default content
  }

  const { Name } = rowData; // Destructure the rowData safely
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Delete {rowData.Name}?</DialogTitle>
      <DialogContent dividers>
        
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
      <div>
      <p>Are you sure you want to delete {rowData.Name}?</p>
      </div>
    </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDeleteClick} color="primary" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
