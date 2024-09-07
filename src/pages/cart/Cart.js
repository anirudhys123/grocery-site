import React, { useState } from 'react';
import styles from './cart.module.css';
import CartItem from "../../components/cart-item/CartItem";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Error from "../../components/feedback/error/Error";

const Cart = ({ cart, cartCount, updateQuantity }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState('');

  const getTotal = () => {
    let total = 0;
    for (const cartElement of cart) {
      total += cartElement.price * cartElement.quantity;
    }
    return total;
  };

  const handlePaymentSuccess = (paymentId) => {
    console.log("Payment Successful. Payment ID: ", paymentId);
    // Perform any additional actions you need after successful payment
  };

  const loadRazorpay = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpay('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const options = {
      key: 'rzp_test_k3e3fimeByvpbP', // Use your own test or live Razorpay API key
      amount: getTotal() * 100,  // Razorpay works with paise, so multiply by 100
      currency: 'INR',
      name: 'Anirudh Groceries',  // Name displayed on the Razorpay Checkout
      description: `Payment for Cart Items`,
      handler: function (response) {
        alert('Payment successful: ' + response.razorpay_payment_id);
        handlePaymentSuccess(response.razorpay_payment_id);
      },
      prefill: {
        name: 'John Doe',  // Prefilled customer name
        email: 'user@example.com',
        contact: '9999999999',
      },
      notes: {
        address: 'some address',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  if (cart && !cart.length)
    return (
      <div className={styles['wrapper']}>
        <div className={'heading'}>
          <h1>Shopping Cart</h1>
        </div>
        <div className={styles['no-items']}>Your cart is empty</div>
        <Link to={'/products'} className={'btn1'} style={{ width: '150px', padding: '10px', marginLeft:'300px' }}>
          Start Shopping
        </Link>
      </div>
    );

  return (
    <div className={styles['wrapper']}>
      {error && <Error error={error} setError={setError} />}
      <div className={'heading'}>
        <h1>Shopping Cart</h1>
      </div>
      <div className={styles['products-wrapper']}>
        {cart.map((product, i) => (
          <CartItem product={product} updateQuantity={updateQuantity} key={i} />
        ))}
      </div>
      <div className={styles['total-wrapper']}>
        <div className={styles['total-text']}>Total ({cartCount} Items):</div>
        <div className={styles['total-amount']}>₹{getTotal().toFixed(2)} Rs</div>
      </div>

      {/* Stylish Pay Now button that opens Razorpay */}
      <button
        onClick={handlePayment}
        style={{
          background: 'linear-gradient(135deg, #00C9FF 0%, #92FE9D 100%)',
          color: 'white',
          fontSize: '18px',
          padding: '12px 24px',
          border: 'none',
          borderRadius: '30px',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.2s ease-in-out, background 0.2s ease-in-out',
          fontWeight: 'bold',
          display: 'block',
          margin: '20px auto',
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.05)';
          e.target.style.background = 'linear-gradient(135deg, #00C9FF 0%, #00FF77 100%)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.background = 'linear-gradient(135deg, #00C9FF 0%, #92FE9D 100%)';
        }}
      >
        Pay Now
      </button>
    </div>
  );
};

export default Cart;
