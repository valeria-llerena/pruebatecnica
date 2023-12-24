import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemText, TextField, MenuItem, Box } from '@mui/material';
import { useState } from 'react';

const UpdateModal = ({ isOpen, onClose, rowData , onUpdate}) => {
  const [newQty, setNewQty] = useState(rowData?.quantity || 0); 
  // Add logic to update the row data

  if (!rowData) {
    return null; // or display a message or default content
  }
  const handleUpdateClick = () => {
    // Logic to handle the update operation...
    
    // Assuming updatedRow contains the updated data
    const updatedRow = {
      idproduct: rowData.idproduct,
      quantity: newQty,  // Use the state value here
      unitprice: rowData.unitprice,
      name: rowData.name,
      fkOrder: rowData.fkOrder, 
      totalprice: newQty * rowData.unitprice 
    };
    
    onUpdate(updatedRow); // Call the onUpdate callback with the updated data
    onClose();
  };

  const handleQtyChange = (event) => {
    setNewQty(event.target.value);  // Update the state with the new quantity value
  };
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Update Product Order</DialogTitle>
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
      <p>PRODUCT: {rowData.name}?</p>
        <TextField
          id="newqty"
          label="Number"
          type="number"
          value={newQty}  
          onChange={handleQtyChange}  
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
    </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleUpdateClick} color="primary">
            Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateModal;
