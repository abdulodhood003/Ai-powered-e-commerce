import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';

const Verify = () => {
  const navigate = useNavigate();
  const { token, setCartItems, backendUrl } = useContext(ShopContext);
  const [searchParams] = useSearchParams();
  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');

  const verifyPayment = async () => {
    if (!token) return; // Wait until token is available

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/verifyStripe`,
        { orderId, success },
        { headers: { token } }
      );

      if (response.data.success) {
        setCartItems([]); // clear cart
        toast.success('Payment verified successfully!');
        navigate('/orders'); // redirect to orders page
      } else {
        toast.error('Payment verification failed.');
        navigate('/cart');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Error verifying payment');
      navigate('/cart');
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);

  return <div className="text-center mt-20 text-gray-600">Verifying your payment...</div>;
};

export default Verify;
