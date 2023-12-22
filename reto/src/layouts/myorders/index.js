import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button, 
  
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {getAllOrders,  postNewOrder, deleteOrder} from '../../api/orders';
import { deleteProducts } from '../../api/products';

const columns = [
  { id: 'idorder', label: 'ID', minWidth: 170 },
  { id: 'nmborder', label: 'ORDER #', minWidth: 100 },
  {
    id: 'date',
    label: 'Date',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'totalprod',
    label: '# Products',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },

  {
    id: 'finalprice',
    label: 'Final Price',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  { id: 'options', label: 'Options', minWidth: 100, align: 'center' },
];




export default function MyOrders() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState(null);
  const history = useHistory();
  const [rows, setRows] = useState([]);
  console.log('Rows:', rows);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllOrders();
        console.log('API Response:', data);
        setRows(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setRows([]); 

      }
    };
    console.log(rows);
  
    fetchData();
  }, []);
  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  
  const handleDelete = (order) => {
    setSelectedOrder(order);
    console.log('Selected order: ', selectedOrder)
    setIsModalOpen(true);
  };

    const confirmDelete = async (id) => {
      console.log("Attempting to delete order with ID:", id);
      try {
        await deleteProducts(id); 
        await deleteOrder(id);
        setRows(rows.filter(row => row.idorder !== id));
        setIsModalOpen(false); 
      } catch (error) {
        console.error('Error deleting order:', error);
      }
    };

  // Function to cancel delete
  const cancelDelete = () => {
    // Close modal
    setIsModalOpen(false);
  };
  const handleUpdate = (row) => {
    // Navigate to the update page with the id as a URL parameter
    history.push(`/add-order/${row}`);
  };
  

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden'}}>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this order?</p>
            <Button variant="contained" color="error" onClick={() => selectedOrder && confirmDelete(selectedOrder)} sx={{margin: 2}}>
              Delete
            </Button>
            <Button variant="outlined" onClick={cancelDelete} sx={{margin: 2}} >
              Cancel
            </Button>
          </div>
        </div>
      )}
      <TableContainer sx={{ maxHeight: 1000 , padding: 3}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}

            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(rows) && rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.idorder}>
                  {columns.map((column) => {
                    if (column.id === 'options') {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          <Button  onClick={() => handleUpdate(row.idorder)}>
                            Update
                          </Button>
                          <Button  onClick={() => handleDelete(row.idorder)}>
                              Delete
                            </Button>
                        </TableCell>
                      );
                    }
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number'
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {Array.isArray(rows) && rows.length > 0 ? (
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
      ) : null}
    </Paper>
    
  );
}