import React, { useContext, useEffect, useState } from 'react'
import { MentorContext } from '../../context/MentorContext'
import { AppContext } from '../../context/AppContext'

const MentorProfile = () => {

  const { mToken, profileData, setProfileData, getProfileData } = useContext(MentorContext)
  const { currency, backendUrl } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)
  
  useEffect(() => {
    if (mToken) {
      getProfileData()
    }
  }, [mToken])
  
  return profileData && (
    <div>
      <div className='flex flex-col gap-4 m-5'>
        <div>
          <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg' src={profileData.image} alt="" />
        </div>

        <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>
          {/* Mentor Info : name, degree, experience */}

          <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{profileData.name}</p>
          <div className='flex items-center gap-2 mt-1 text-gray-600'>
            <p className='text-xl'>{profileData.degree} - {profileData.speciality}</p>
          </div>

          {/* Mentor About */}
          <div>
            <p className='flex items-center gap-1 font-medium text-neutral-800 mt-3'>About:</p>
            <p className='text-gray-600 max-w-[700px] mt-2'>
              {profileData.about}
            </p>
          </div>

          <p className='text-gray-600 font-medium mt-4'>
            Appointment fee: <span className='text-gray-800'>{currency} {profileData.fees}</span>
          </p>

          <div className='flex text-gray-600 font-medium gap-2'>
            <p>College Name: {profileData.collegeName}</p>
          </div>

          <div className='flex text-gray-600 font-medium gap-2'>
            <p> College Duration <span> : </span>
              {profileData.collegeStartYear}
              <span> - To - </span>
              {profileData.collegeEndYear}
            </p>
          </div>

          <div className='flex gap-1 pt-2'>
            <input type="checkbox" name="" id="" />
            <label htmlFor="">Available</label>
          </div>

          <button className='px-6 py-2 border border-[#5f6FFF] rounded-full mt-5 hover:bg-[#5f6FFF] hover:text-white transition-all cursor-pointer'>Edit</button>

        </div>
      </div>
    </div>
  )
}

export default MentorProfile
