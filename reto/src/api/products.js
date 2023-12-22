import BASE_URL from "./url";
const deleteProducts= async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/product/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to delete product: ${errorMessage}`);
      }
      console.log("Products from order deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error; 
    }
  };
  const getAllProducts = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/product/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const postNewProducts = async (data) => {
    try {

      const response = await fetch(`${BASE_URL}/product`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }); 
    console.log(response.ok);
    } catch (error) {
      console.error("Error posting new order:", error);
      throw error; 
    }
  };
  
export { deleteProducts, getAllProducts, postNewProducts};
