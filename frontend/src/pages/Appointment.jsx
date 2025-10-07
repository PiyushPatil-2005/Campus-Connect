import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedMentors from '../components/RelatedMentors'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appointment = () => {

  const { mentorId } = useParams()
  const { mentors, currencySymbol, backendURL, token, getMentorsData } = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const navigate = useNavigate()

  const [mentorInfo, setMentorInfo] = useState(null)
  const [mentorSlots, setMentorSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const fetchMentorInfo = async () => {
    const mentorInfo = mentors.find(mentor => mentor._id === mentorId)
    setMentorInfo(mentorInfo)
  }

  const getAvailableSlots = async () => {
    setMentorSlots([])

    // getting current date
    let today = new Date()

    for (let i = 0; i < 7; i++) {
      // getting date with index
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      // setting end time of the date with index
      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)

      // setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()

        const slotDate = day + "_" + month + "_" + year
        const slotTime = formattedTime

        const isSlotAvailable = mentorInfo.slots_booked[slotDate] && mentorInfo.slots_booked[slotDate].includes(slotTime) ? false : true

        if (isSlotAvailable) {
          // add slot to array
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          })
        }

        // Increment current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);

      }
      setMentorSlots(prev => ([...prev, timeSlots]))

    }

  }


  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book appointment')
      return navigate('/login')
    }

    try {
      const date = mentorSlots[slotIndex][0].datetime

      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()

      const slotDate = day + "_" + month + "_" + year

      const { data } = await axios.post(backendURL + '/api/user/book-appointment', { mentorId, slotDate, slotTime }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getMentorsData()
        navigate('/my-appointments')
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchMentorInfo()
  }, [mentors, mentorId])

  useEffect(() => {
    getAvailableSlots();
  }, [mentorInfo])

  useEffect(() => {
    console.log(mentorSlots)
  }, [mentorSlots])

  return mentorInfo && (
    <div>
      {/* { Mentors Details } */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-[#5f6FFF] w-full h-90 sm:max-w-72 rounded-lg' src={mentorInfo.image} alt="" />
        </div>

        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          {/*  Mentor Info : name, degree, experience */}
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            {mentorInfo.name}
            <img className='w-5' src={assets.verified_icon} alt="" />
          </p>

          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{mentorInfo.degree} - {mentorInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{mentorInfo.collegeName}</button>
          </div>

          {/* Mentor About */}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
              About <img src={assets.info_icon} alt="" />
            </p>
            <p className='text-sm text-gray-500 max-w -[700px] mt-1'>{mentorInfo.about}</p>
          </div>
          <p className='text-gray-500 font-medium mt-4'>
            Counselling Fee: <span className='text-gray-600'>{currencySymbol} {mentorInfo.fees}</span>
          </p>

        </div>
      </div>

      {/* Booking Slots */}

      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking Slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {
            mentorSlots.length && mentorSlots.map((item, index) => (
              <div onClick={() => setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-[#5f6FFF] text-white' : 'border border-gray-300'}`} key={index}>
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))
          }
        </div>

        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {mentorSlots.length && mentorSlots[slotIndex].map((item, index) => (
            <p onClick={() => setSlotTime(item.time)} className={`text-gray-500 flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-[#5f6FFF] text-white' : 'text-gray-400 border border-gray-300'}`} key={index}>
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>
        <button onClick={bookAppointment} className='bg-[#5f6FFF] text-white font-Medium px-18 py-3 rounded-full my-6 cursor-pointer'>Book a Mentorship Session</button>
      </div>

      {/* Listing Related Mentors*/}

      <RelatedMentors mentorId={mentorId} speciality={mentorInfo.speciality} />


    </div>
  )
}

export default Appointment