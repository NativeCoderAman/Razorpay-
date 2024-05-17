import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../page/ProductListingPage.css';
import { Link } from 'react-router-dom';

function ProductListingPage() {
  const [products, setProducts] = useState([]);
  const history = useHistory();

  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then(response => {
        if (response.data && Array.isArray(response.data.products)) {
          setProducts(response.data.products);
        } else {
          console.error('Error: response.data.products is not an array');
        }
      })
      .catch(error => {
        console.error('Error getting products:', error);
      });
  }, []);

  const addToCart = (product) => {
    const storedCart = localStorage.getItem('cart');
    const cart = storedCart ? JSON.parse(storedCart) : [];
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
      const updatedCart = cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }

    history.push('/cart');
  };

  return (
    <div>
      <Navbar />
      <div>
        <div className='product-container'>
          {products.map(product => (
            <div className="product-card" key={product.id}>
              <img src={product.thumbnail} alt={product.title} />
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <p className="price">Price: {product.price}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductListingPage;
