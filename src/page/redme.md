import React, { useState, useEffect } from 'react';
import '../page/CartPage.css';
import Navbar from '../components/Navbar';

function CartPage() {
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Calculate total amount based on sample product price and quantity
    const price = 10; // Sample price
    const quantity = 1; // Sample quantity
    const total = price * quantity;
    setTotalAmount(total);
  }, []);

  const createOrder = async () => {
    // Implement order creation logic if required
  };

  const verifyPayment = async (paymentId, signature, orderId) => {
    // Implement payment verification logic if required
  };

  const displayRazorpay = async () => {
    const options = {
      key: 'rzp_test_DVusCxH0NlgOyA',
      amount: totalAmount * 100, // Amount in paisa
      currency: 'INR',
      name: 'Your Company Name',
      description: 'Your Product Purchase',
      handler: function (response) {
        alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
        // Handle successful payment (e.g., clear cart, display confirmation)
      },
    };

    // Check if Razorpay SDK is loaded, load it dynamically if not
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
        <div className="cart-page__item">
          <img src="sample-product.jpg" alt="Sample Product" className="cart-page__thumbnail" />
          <div className="cart-page__info">
            <h2 className="cart-page__title">Sample Product</h2>
            <p className="cart-page__price">Price: $10</p>
            <p className="cart-page__quantity">Quantity: 1</p>
          </div>
        </div>
        <div className="cart-page__total">
          <>
            <p>Total Value: ${totalAmount.toFixed(2)}</p>
            <button className="cart-page__payment-button" onClick={displayRazorpay}>
              Pay Now
            </button>
          </>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
