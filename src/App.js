// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductListPage from './page/ProductListingPage';
import CartPage from './page/CartPage';

function App() {
  const [cart, setCart] = useState([]); // Move cart state to App component

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={() => <ProductListPage setCart={setCart} />} />
        <Route path="/cart" component={() => <CartPage cart={cart} />} />
      </Switch>
    </Router>
  );
}

export default App;