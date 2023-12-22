import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MyOrders from './layouts/myorders'; // Importing from the folder with an index.js file
import AddOrders from './layouts/addorders';
import Navbar from './layouts/navbar/navbar';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div style={{ marginTop: '40px' }}> 
          <Switch>
            <Route path="/my-orders" exact component={MyOrders} />
            <Route path="/add-order/:id" component={AddOrders} />
            {/* Add more routes for other pages */}
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;