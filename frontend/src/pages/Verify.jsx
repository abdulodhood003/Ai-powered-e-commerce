import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext'; // updated import
import { toast } from 'react-toastify';

const Verify = () => {
  const navigate = useNavigate();
  const { token, setCartItems, backendUrl } = useContext(ShopContext);
  const [searchParams] = useSearchParams();
  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');

  const verifyPayment = async () => {
    try {
      if (!token) return null;

      const response = await axios.post(
        `${backendUrl}/api/order/verifyStripe`,
        { orderId, success },
        { headers: { token: token } }
      );

      if (response.data.success) {
        setCartItems([]); // clear cart
        navigate('/orders'); // redirect to orders
      } else {
        navigate('/cart'); // redirect to cart
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);

  return <div></div>;
};

export default Verify;
