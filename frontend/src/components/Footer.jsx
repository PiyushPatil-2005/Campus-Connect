import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        {/* { Left Section } */}

        <div>
          <img className='mb-5 w-40' src={assets.logo} alt="" />
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>Campus Connect – Learn • Share • Grow. <br /> 
              Empowering the next generation of students <br /> and communities.  
              Join us in shaping the future of campus life.  
           </p>
        </div>

        {/* { Center Section } */}

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Home</li>
            <li>About</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* { Right Section } */}

        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+91 6739506032</li>
            <li>campusconnect@gmail.com</li>
          </ul>
        </div>
      </div>
      {/* { Copy right text } */}
      <div>
        <hr />
        <p className='py-5 text-center'>Copyright 2025@ Campus Connect - All Right Reserved</p>
      </div>
    </div>
  )
}

export default Footer
