
import { TextField, Button, Paper, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import AddProductModal from '../../components/AddProductModal';
import OrderTable from '../../components/OrderTable'; 
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { getAllOrdersbyId } from '../../api/orders';
import { useParams } from 'react-router-dom';
import { postNewOrder, updateOrder } from '../../api/orders';
import { postNewProducts, deleteProducts } from '../../api/products';


const AddOrders =  ({ orderId, order }) => {
  const [producttoadd, setOrderProducttoadd] = useState({});
  const [productTable, setProductTable] = useState([]);  
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
    const { id } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null); 
    const [products, setProducts] = useState([])
    const [orderData, setOrderData] = useState({
      idorder: 0,
      date: formattedDate,
      nmborder: 0,
      totalprod: 0, 
      finalprice: 0, 
  });
    const product = [
        { idproduct: 10, name: 'Product A', unitprice: 10 },
        { idproduct: 20, name: 'Product B', unitprice: 2},
        {idproduct: 11, name: 'Product C', unitprice: 5 },
    ];
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getAllOrdersbyId(id); 
          if (data.data.length > 0) {
            setOrderData(data.data[0]);
        } else {
           
        }
          console.log(); 
        } catch (error) {
          console.error('Error fetching order data:', error);
        }
      };
    
      fetchData();
    }, [id]); 
    
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setOrderData({ ...orderData, [name]: value });
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault(); 
    
      if (id == 0) {
        if (productTable.length > 0) {
          try {
            // Place a new order
            const resp = await postNewOrder(orderData);
            const orderInsertedId = resp;           
            const datos = productTable.map(({ idproduct, ...product }) => ({ ...product, fkOrder: orderInsertedId }));
            console.log('DATOS PARA UPLOAD: ', datos);

            const subir = await postNewProducts(datos);
            console.log('Products Uploaded:', subir);
          
          } catch (error) {
            console.error('Error placing order or uploading products:', error);
          }
        } else {
          console.log("Nothing to order. ");
        }
      } else {
        console.log("Remaking order. "); 
        try {
          // Update the existing order
          await updateOrder(orderData);
          console.log('Order Updated:', orderData);
      
          // Delete old products
          await deleteProducts(id); 
          console.log('Products deleted'); 
      
          // Map and prepare the data for upload
          const datos = productTable.map(({ idproduct, ...product }) => ({ ...product, fkOrder: id }));
          console.log('Upload Data: ', datos);
      
          // Upload new products
          const subir = await postNewProducts(datos);
          console.log('Products Uploaded:', subir);
      
      } catch (error) {
          console.error('Error updating order, deleting products, or uploading products:', error);
      }
      }
    };
    
    

    const handleOpenModal = () => {
        setIsModalOpen(true);
      };
    
      const handleCloseModal = () => {
        setIsModalOpen(false);
      };
      function calculateNewFinalPrice(orderData, product) {
        const newFinalPrice = orderData.finalprice + product.totalprice; 
        console.log(newFinalPrice, orderData.finalprice, product.totalprice);
        return newFinalPrice;
    }
    function calculateNewQuantity(orderData, product) {
      const newFinalQuantity = orderData.totalprod + product.quantity; 
      console.log(newFinalQuantity, orderData.totalprod, product.quantity);
      return newFinalQuantity;
  }
    
    
      const handleAddToOrder = (product) => {
        setOrderProducttoadd({ ...product, fkOrder: id });
    
        const updatedOrderData = {
            ...orderData,
            finalprice: calculateNewFinalPrice(orderData, product) ,
            totalprod: calculateNewQuantity(orderData, product)
        };
        
        setOrderData(updatedOrderData);
    };
      
    return (
      <Paper style={{ padding: '3vw'  ,maxWidth: '90vw', margin: 'auto'}}>
        
            <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
            <Box component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '40ch', overflow: 'auto'},
                }}
                noValidate
                autoComplete="off">
                <h2>Order Data</h2>
                <TextField
                    name="id"
                    label="ID"
                    value={orderData?.idorder || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    disabled />
                <TextField
                    name="order"
                    label="Order #"
                    value={orderData?.nmborder || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    disabled />
                <TextField
                    name="date"
                    label="Date"
                    value={orderData?.date || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    disabled />
                <TextField
                    name="products"
                    label="Products"
                    value={orderData?.totalprod || ''} 
                    onChange={handleChange}
                    margin="normal"
                    fullWidth
                    disabled />
                <TextField
                    name="total"
                    label="Final Price"
                    value={orderData?.finalprice || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    disabled />
            </Box>
            
                
                <Button type="submit" variant="contained"   startIcon={<SaveAltIcon />} sx={{margin: '12px', fontSize: '17px', padding:2}}>
                    Make Order
                </Button>
                <Button variant="outlined"  startIcon={<AddCircleIcon />} sx={{margin: '12px', fontSize: '17px', padding:2}} onClick={handleOpenModal }>
                    Add Product
                </Button>
                <AddProductModal
                    products={product}
                    open={isModalOpen}
                    onClose={handleCloseModal}
                    onAddToOrder={handleAddToOrder} />
            </form>

            <div style={{ marginTop: '40px', textAlign: 'center'}}> {}
                <h2>Products List</h2>
                <OrderTable  
                  id={id}
                  producttoadd={producttoadd}
                  productTable= {setProductTable}
                  
                />
            </div>
        </Paper>
    );
  };

export default AddOrders;