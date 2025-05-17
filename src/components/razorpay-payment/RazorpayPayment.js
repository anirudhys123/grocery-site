import React from 'react';
import { useNavigate } from 'react-router-dom';

const RazorpayPayment = ({ amount, bookingDetails, onPaymentSuccess }) => {
  const navigate = useNavigate();

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
      key: 'rzp_test_9VqSlFsO3x2pPm',
      amount: amount * 100,
      currency: 'INR',
      name: 'Anirudh Groceries',  // Set the name here
      description: `Payment for ${bookingDetails.service}`,
      handler: function (response) {
        alert('Payment successful: ' + response.razorpay_payment_id);
        onPaymentSuccess(response.razorpay_payment_id);
      },
      prefill: {
        name: bookingDetails.name,
        email: 'user@example.com',
        contact: '9999999999',
      },
      notes: {
        address: 'some address',
      },
      theme: {
        color: '#3399cc',
      },
      metadata: {
        integration_name: "Bizwy",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <button className="btn btn-success" onClick={handlePayment} style={{ backgroundColor: 'green', color: 'white',fontSize:'20px' }}>
      Pay Now
    </button>
  );
};

export default RazorpayPayment;
