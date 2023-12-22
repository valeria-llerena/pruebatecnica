import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import UpdateModal from './UpdateModal'; // Adjust the path accordingly
import DeleteModal from './DeleteModal';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';
import { getAllProducts } from '../api/products';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData( id, Name, UnitPrice, Qty, Options) {
  const TotalPrice = UnitPrice*Qty; 
  return { id, Name, UnitPrice, Qty, TotalPrice, Options: '' };
}

const rows = [
  createData(10, 'Yogurt', 10, 2, 13),
];




export default function CustomizedTables({id, productTable, producttoadd}) {
    const [updateModalOpen, setUpdateModalOpen] = React.useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
    const [selectedRow, setSelectedRow] = React.useState(null);
    const [rows, setRows] = useState([]);

    console.log('desde ordertable', producttoadd);
    
    const updateRow = (updatedRow) => {

      const rowIndex = rows.findIndex(row => row.idproduct === updatedRow.idproduct);
      if (rowIndex !== -1) {
          
          const updatedRows = [...rows];
          updatedRows[rowIndex] = updatedRow;
          setRows(updatedRows);
      }
    };
    const handleDelete = (row) => {
      
      const updatedRows = rows.filter(r => r.idproduct !== row.idproduct);
      setRows(updatedRows);
      setDeleteModalOpen(false);
    };
    useEffect(() => {
      if (rows) {
        if( Array.isArray(rows)){
          productTable(rows);
        }
      }
  }, );

    useEffect(() => {
      if (producttoadd) {
          setRows([...rows, producttoadd]); 
      }
  }, [producttoadd]);
    useEffect(() => {
      
      const fetchData = async () => {
        try {
          const data = await getAllProducts(id);
          console.log('API Response:', data.data);

          setRows(data.data);
        } catch (error) {
          console.error('Error fetching data:', error);
          setRows([]); 
  
        }
      };
      console.log(rows);
    
      fetchData();
    }, []);
    
    const handleUpdateClick = (row) => {
      setSelectedRow(row);
      setUpdateModalOpen(true);
    };
  
    const handleDeleteClick = (row) => {
      setSelectedRow(row);
      setDeleteModalOpen(true);
    };
  return (
    <div>
<TableContainer component={Paper}>
      <Table sx={{ minWidth: 700}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right">ID</StyledTableCell>
            <StyledTableCell align="right">Name&nbsp;</StyledTableCell>
            <StyledTableCell align="right">Unit Price</StyledTableCell>
            <StyledTableCell align="right">Quantity</StyledTableCell>
            <StyledTableCell align="right">Total Price</StyledTableCell>
            <StyledTableCell align="right">Options</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { Array.isArray(rows) && rows.map((row, index) => (
            
            <StyledTableRow key={row.index}>
              <StyledTableCell component="th" scope="row">
                {row.index}
              </StyledTableCell>
              <StyledTableCell align="right">{row.name}</StyledTableCell>
              <StyledTableCell align="right">{row.unitprice}</StyledTableCell>
              <StyledTableCell align="right">{row.quantity}</StyledTableCell>
              <StyledTableCell align="right">{row.totalprice}</StyledTableCell>
              <StyledTableCell align="right">
                <IconButton color='error' onClick={() => handleDeleteClick(row)}><DeleteIcon /></IconButton>

                <IconButton color='success' onClick={() => handleUpdateClick(row)}><AddShoppingCartIcon /></IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <UpdateModal 
        isOpen={updateModalOpen} 
        onClose={() => setUpdateModalOpen(false)} 
        rowData={selectedRow}
        onUpdate={updateRow}
      />
      
      <DeleteModal 
        isOpen={deleteModalOpen} 
        onClose={() => setDeleteModalOpen(false)} 
        rowData={selectedRow}
        onDelete={handleDelete} 
      />
    </div>
    
    
  );
}
CustomizedTables.propTypes = {
  id: PropTypes.string.isRequired, 

};