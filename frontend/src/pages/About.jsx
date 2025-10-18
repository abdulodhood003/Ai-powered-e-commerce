import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import Newsletter from '../components/Newsletter'


const About = () => {
  return (
    <div>
    <div className='text-2xl text-center pt-8 border-t'>


      <Title text1={"ABOUT"} text2={"US"}/>
    </div>


    <div className='my-10 flex flex-col md:flex-row gap-16'>
      <img className='w-full md:max-w-[450px]'src={assets.about_img} alt="" />
      <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
      <p>Welcome to our e-commerce store, your trusted destination for quality products at the best prices. We believe shopping should be easy, enjoyable, and accessible to everyone. From trendy collections to everyday essentials, we bring everything you need in one place. With secure payments and fast delivery, we make sure your experience is smooth and hassle-free.</p>
      <p>We offer a wide range of collections to match your style and needs. With secure payments and quick delivery, your satisfaction is our priority.</p>
      <b className='text-gray-800'>Our Mission</b>
      <p>Our mission is to make online shopping simple and accessible for everyone. We are committed to offering high-quality products at fair prices. With reliable service and customer-first values, we strive to create a seamless shopping experience..</p>
      </div>

    </div>
    <div className='text-xl py-4'>
      <Title text1={'WHY'} text2={'CHOOSE US'}/>
    </div>
    <div className='flex flex-col md:flex-row text-sm mb-20'>
      <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b>Quality Assurance</b>
        <p className='text-gray-600'>Quality assurance ensures that products, services, or processes meet defined standards of quality by preventing errors and improving consistency.</p>
      </div>
       <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b>Conveniece</b>
        <p className='text-gray-600'>Convenience makes life easier by saving time and effort in daily activities.It allows people to complete tasks quickly and focus on what truly matters..</p>
      </div>
    
     <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b>Eceptional Customer Service:</b>
        <p className='text-gray-600'>Exceptional customer service ensures every customer feels valued and satisfied.It goes beyond solving problems by creating trust and lasting relationships.</p>
      </div>
    </div>
    <Newsletter />
    </div>
    
  )
}

export default About