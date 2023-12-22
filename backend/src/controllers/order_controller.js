import { getConnection } from "../database/database.js";

import mysql from "mysql2/promise.js";


const getOrders = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.promise().query("SELECT * FROM shop.order");
    res.json(result[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const getOrdersId = async (req, res) => {
  try {
    console.log(req.params);
    const idOrder = req.params.id; 
    const connection = await getConnection();
    const [result] = await connection
      .promise()
      .query("SELECT * FROM shop.order WHERE idorder = ?", [idOrder]);
      res.json({ data: result });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};


const addOrder = async (req, res) => {
  try {
    console.log("reqbody", req.body);
    const connection = await getConnection();

    await connection.promise().query("INSERT INTO shop.order SET ?", req.body);

    const [rows] = await connection.promise().query("SELECT LAST_INSERT_ID() as id");
    const lastInsertedId = rows[0].id;

    
    res.json({
      idorder: lastInsertedId
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { idorder, date, nmborder, totalprod, finalprice } = req.body;
    const connection = await getConnection();
    const result = await connection.promise().query("UPDATE shop.order SET date=?, nmborder=?, totalprod=?, finalprice=? WHERE idorder=?",
    [date, nmborder, totalprod, finalprice, idorder]);
    res.json(result[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const deleteOrder = async (req, res) => {
  try {
    
    const connection = await getConnection();
    const idOrder = req.params.idorder; 
    const result = await connection.promise().query(
      "DELETE FROM shop.order WHERE idorder = ?",
      [idOrder]
    );

    console.log(result); 

    res.json({ message: 'Order deleted successfully' }); 
  } catch (error) {
    console.error(error); 
    console.log(req.params);
    const idOrder = req.params.idorder; 
    console.log(idOrder);
    
    res.status(500).send('Error deleting order'); 
  } 
};

export const methods = {
  getOrders,
  getOrdersId,
  addOrder,
  updateOrder,
  deleteOrder,
};
