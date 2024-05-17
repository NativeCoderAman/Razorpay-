import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../page/CartPage.css';

const calculateTotalValue = (cart) => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

function CartPage() {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const totalValue = calculateTotalValue(cart);

  const displayRazorpay = async () => {
    const options = {
      key: 'rzp_test_DVusCxH0NlgOyA',
      amount: totalValue * 100, 
      currency: 'INR',
      name: 'Your Company Name',
      description: 'Your Product Purchase',
      handler: function (response) {
        alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
      },
    };

    if (!window.Razorpay) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = function () {
        createRazorpayInstance(options);
      };
      document.body.appendChild(script);
    } else {
      createRazorpayInstance(options);
    }
  };

  const createRazorpayInstance = (options) => {
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div>
      <Navbar />
      <div className="cart-page">
        <h1 className="cart-page__title">Cart Page</h1>
        <ul className="cart-page__list">
          {cart && cart.map((item) => (
            <li key={item.id} className="cart-page__item">
              <img src={item.thumbnail} alt={item.title} className="cart-page__thumbnail" />
              <div className="cart-page__info">
                <h2 className="cart-page__title">{item.title}</h2>
                <p className="cart-page__price">Price: ${item.price}</p>
                <p className="cart-page__quantity">Quantity: {item.quantity}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="cart-page__total">
          {cart && cart.length > 0 && (
            <>
              <p>Total Value: ${totalValue.toFixed(2)}</p>
              <button className="cart-page__payment-button" onClick={displayRazorpay}>Pay Now</button>
            </>
          )}
          {!cart || cart.length === 0 && <p>Please add products</p>}
        </div>
      </div>
    </div>
  );
}

export default CartPage;
