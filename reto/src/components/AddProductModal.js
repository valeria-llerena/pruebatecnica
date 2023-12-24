import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemText, TextField, MenuItem, Box } from '@mui/material';
import swal from 'sweetalert';

import React, { useState } from 'react';

const AddProductModal = ({ products, open, onClose, onAddToOrder }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState('');

  const handleProductChange = (event) => {
    const productName = event.target.value;
    const product = products.find(p => p.name === productName);
    setSelectedProduct(product);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleAddClick = () => {
    if (selectedProduct && quantity) {
      onAddToOrder({
        idproduct: selectedProduct.idproduct,
        quantity: parseInt(quantity, 10),
        totalprice: quantity * selectedProduct.unitprice,
        name: selectedProduct.name,
        unitprice: selectedProduct.unitprice, 
        
      });
      swal("Product Added!", "You a new product!", "success");
      onClose();
    }
  };
  

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Products</DialogTitle>
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
            <TextField
              id="outlined-select-product"
              select
              label="Select"
              defaultValue=""
              value={selectedProduct ? selectedProduct.name : ''}
              onChange={handleProductChange}
              helperText="Please select a product"
            >
              {products.map((option) => (
                <MenuItem key={option.name} value={option.name}>
                  {option.name} -- {option.unitprice}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-number"
              label="Number"
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
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
        <Button onClick={handleAddClick} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProductModal;
