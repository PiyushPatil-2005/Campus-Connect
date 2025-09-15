import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-600'>
        <p>ABOUT <span className='text-gray-800 font-medium'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full h-[350px] md:max-w-[360px]' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <b className='text-gray-800'>What is Campus Connect?</b>
          <p>Campus connect is a mentorship and counselling platform designed to help students who have completed secondary and higher secondary education.</p>
          <p>Campus Connect acts as a bridge which connects students directly with students from top colleges who share their experiences, 
            tips & provide guidance</p>
          <b className='text-gray-800'>Our Vision</b>
          <p>To empower students with a trusted, hyperlocal networking platform that bridges the gap between school and college life by providing verified connections, career guidance, resource sharing, and a safe digital environment.</p>
          <b className='text-gray-800'>Our Mission</b>
          To become the go-to student ecosystem that supports personal growth, academic success, and community-driven opportunities, helping students make informed decisions and thrive in their educational journey.
        </div>
      </div>

      <div className='text-xl my-4'>
        <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
      </div>

      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#5f6FFF] hover:text-white transition-all duration-300 text-gray-600'>
          <b className='text-[18px]'>Efficiency:</b>
          <p>Streamlined counselling scheduling that fits into your busy lifestyle</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#5f6FFF] hover:text-white transition-all duration-300 text-gray-600'>
          <b className='text-[18px]'>Convenience:</b>
          <p>Access to a network of trusted experience professionals in your intersted area</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#5f6FFF] hover:text-white transition-all duration-300 text-gray-600'>
          <b className='text-[18px]'>Personalization:</b>
          <p>Tailored guidence and suggestion to help choose right career path at right place</p>
        </div>
      </div>
    </div>
  )
}

export default About
