import BASE_URL from "./url";
import Api from "../api/api.js";

const getAllOrders = async () => {
  try {
    const response = await fetch(`${BASE_URL}/order`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
};


const getAllOrdersbyId = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/order/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch orders: ${response.status}`);
    }
    console.log('response', response); 
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching orders: ${error.message}`);
  }
};

const postNewOrder = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/order`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const rspJson = await response.json(); 
    return rspJson.idorder;  

  } catch (error) {
    console.error("Error posting new order:", error);
    //throw error; 
  }
};
const updateOrder = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/order`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
      console.log(response.ok); 
  } catch (error) {
    console.error("Error updating new order:", error);
    throw error; 
  }
};

const deleteOrder = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/order/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to delete order: ${errorMessage}`);
    }

    console.log("Order deleted successfully");
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error; // Re-throw the error for further handling if needed
  }
};



export { getAllOrders, postNewOrder, deleteOrder ,getAllOrdersbyId, updateOrder};



