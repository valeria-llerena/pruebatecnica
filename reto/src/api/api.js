export default class Api {
  static async get(URL) {
    try {
      const response = await fetch(URL, { method: "GET" });
      
      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      // Extract and return JSON data
      return response.json();
    } catch (error) {
      console.error('Error in GET request:', error.message);
      throw error; // Re-throw the error to be caught by the calling code
    }
  }

  static async post(URL, data) {
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`Failed to post data: ${response.statusText}`);
      }

      // Extract and return JSON data
      return response.json();
    } catch (error) {
      console.error('Error in POST request:', error.message);
      throw error; // Re-throw the error to be caught by the calling code
    }
  }
}
