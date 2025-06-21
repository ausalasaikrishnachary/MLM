import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { baseurl } from '../../../BaseURL/BaseURL';

const PaymentCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkPaymentStatus = async () => {
      const merchant_order_id = localStorage.getItem('pending_merchant_order_id');
      const variant_id = localStorage.getItem('pending_variant_id');
      const userId = localStorage.getItem('user_id');

      if (!merchant_order_id || !variant_id || !userId) {
        Swal.fire({
          icon: 'error',
          title: 'Missing Info',
          text: 'Unable to verify payment.'
        });
        return navigate('/');
      }

      try {
        const res = await fetch(`https://shrirajteam.com:81/payment-status/?merchant_order_id=${merchant_order_id}`);
        const data = await res.json();

        if (data.status === 'COMPLETED') {
          // Proceed with subscription
          const subRes = await fetch(`${baseurl}/subscriptions/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              user_id: parseInt(userId),
              subscription_variant: variant_id,
              subscription_status: "paid"
            }),
          });

          if (subRes.ok) {
            await fetch(`${baseurl}/users/${userId}/`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ status: "active" }),
            });

            Swal.fire({
              icon: 'success',
              title: 'Subscription Successful!',
              timer: 2000,
              showConfirmButton: false
            });
            navigate('/partner/plans');
          } else {
            throw new Error("Subscription API failed");
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Transaction Failed',
            text: 'Your payment was not successful. Please try again.'
          });
          navigate('/partner/plans');
        }
      } catch (err) {
        console.error("Error checking payment:", err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Unable to verify payment status.'
        });
        navigate('/partner/plans');
      } finally {
        // Clean up
        localStorage.removeItem('pending_variant_id');
        localStorage.removeItem('pending_merchant_order_id');
      }
    };

    checkPaymentStatus();
  }, [navigate]);

  return <p style={{ textAlign: 'center', marginTop: '20%' }}>Verifying payment...</p>;
};

export default PaymentCallback;
