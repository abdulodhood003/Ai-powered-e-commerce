import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom' // ✅ import Link


const Footer = () => {
  return (
    <div className=''>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
          <img src={assets.aurafit} className='mb-5 w-32'/>
          <p className='w-full md:w-2/3 text-gray-600'>
            We bring you quality products at the best prices.
            Enjoy secure shopping, fast delivery, and easy returns.
            Your satisfaction is our top priority.
          </p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li><Link to="/">Home</Link></li> 
            
            <li><Link to="/collection">Collection</Link></li> 
            <li><Link to="/contact">Contact</Link></li> 
            
            <li><Link to="/about">About Us</Link></li> 
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+919042487567</li>
            <li>abdulodudood@gmail.com</li>
          </ul>
        </div>
      </div>

      <div className=''>
        <hr />
        <p className='py-5 text-sm text-center'>
          Copyright 2025@aurafits.com - All Right Reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer
