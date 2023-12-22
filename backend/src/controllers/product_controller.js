import { getConnection } from "../database/database.js";

import mysql from "mysql2/promise.js";


const getProductsbyId = async (req, res) => {
  try {
    const idOrder = req.params.idorder; 
    const connection = await getConnection();
    console.log(idOrder); 
    const [result] = await connection
      .promise()
      .query("SELECT * FROM product WHERE fkOrder = ?", idOrder);
      res.json({ data: result });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};



const addProducts = async (req, res) => {
  
  try {
    const connection = await getConnection();
    const records = req.body; 
    const placeholders = records.map(() => "(?, ?, ?, ?, ?)").join(', '); 
    const values = records.flatMap(record => [
      record.quantity,
      record.totalprice,
      record.name,
      record.unitprice, 
      record.fkOrder, 
    ]);

    const query = `INSERT INTO product (quantity, totalprice, name, unitprice,fkOrder) VALUES ${placeholders}`;
    
    const result = await connection.promise().query(query, values);
    console.log(result); 
    res.json({ message: 'Products added successfully' });

  } catch (error) {
    console.log(error);
     //throw new Error('Error creating products.');
  }
}

const deleteProducts = async (req, res) => {
  try {
    const connection = await getConnection();

    // Extract the idOrder from the request parameters
    const idOrder  = req.params.idorder;

    console.log('id order: ', idOrder); // Log the retrieved idOrder

    const result = await connection.promise().query(
      "DELETE FROM shop.product WHERE fkOrder = ?",
      [idOrder]
    );

    console.log(result); // Log the query result for debugging

    res.json({ message: 'Products deleted successfully' }); 
  } catch (error) {
    console.error(error); // Log any errors for debugging
    res.status(500).send('Error deleting products');
  } 
};


export const methods = {
  getProductsbyId,
  addProducts,
  deleteProducts,
};
