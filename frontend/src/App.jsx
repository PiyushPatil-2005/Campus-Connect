import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Mentors from './pages/Mentors.jsx'
import Login from './pages/Login.jsx'
import MyProfile from './pages/MyProfile.jsx'
import MyAppointments from './pages/MyAppointments.jsx'
import Appointment from './pages/Appointment.jsx'
import Contact from './pages/Contact.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mentors" element={<Mentors />} />
        <Route path="/mentors/:speciality" element={<Mentors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/appointment/:mentorId" element={<Appointment />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App