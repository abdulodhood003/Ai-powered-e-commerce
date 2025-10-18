import React, { useContext } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import ChatBot from './components/ChatBot';
import { ShopContext } from './context/ShopContext';

import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import Verify from './pages/Verify';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { products } = useContext(ShopContext);
  const location = useLocation();

  // ❗️Hide Navbar, Footer & Chatbot on login and verify pages
  const hideLayout =
    location.pathname === '/login' || location.pathname === '/verify';

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />

      {/* Show Navbar & SearchBar only when not on /login or /verify */}
      {!hideLayout && (
        <>
          <Navbar />
          <SearchBar />
        </>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/verify" element={<Verify />} />
      </Routes>

      {/* Show Footer and Chatbot only when not on login/verify */}
      {!hideLayout && (
        <>
          <Footer />
          <ChatBot products={products} />
        </>
      )}
    </div>
  );
};

export default App;
