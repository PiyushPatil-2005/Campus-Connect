import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Mentors = () => {

  const { speciality } = useParams()
  const [ filterDoc, setFilterDoc ] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate()
  
  const { mentors } = useContext(AppContext);

  const applyFilter = () => {
    if(speciality) {
      setFilterDoc(mentors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(mentors)
    }
  }

  useEffect(()=>{
    applyFilter()
  }, [mentors, speciality])

  return (
    <div>
      <p className='text-[18px] text-gray-600'>Browse through the experienced mentors.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button className={` py-1 px-3 border rounded text transition-all sm:hidden ${showFilter ? 'bg-[#5f6FFF] text-white' : ''} `} onClick={()=> setShowFilter(prev => !prev)}>Fliter</button>
        <div className={`flex flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex' }`}>
          <p onClick={()=> speciality === 'Engineering' ? navigate('/mentors') : navigate('/mentors/Engineering')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded trandition-all cursor-pointer ${speciality === "Engineering" ? "bg-indigo-100 text-black" : ""}`}>Engineering</p>
          <p onClick={()=> speciality === 'Medical' ? navigate('/mentors') : navigate('/mentors/Medical')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded trandition-all cursor-pointer ${speciality === "Medical" ? "bg-indigo-100 text-black" : ""}`}>Medical</p>
          <p onClick={()=> speciality === 'Management' ? navigate('/mentors') : navigate('/mentors/Management')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded trandition-all cursor-pointer ${speciality === "Management" ? "bg-indigo-100 text-black" : ""}`}>Management</p>
          <p onClick={()=> speciality === 'Design' ? navigate('/mentors') : navigate('/mentors/Design')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded trandition-all cursor-pointer ${speciality === "Design" ? "bg-indigo-100 text-black" : ""}`}>Design</p>
          <p onClick={()=> speciality === 'Law' ? navigate('/mentors') : navigate('/mentors/Law')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded trandition-all cursor-pointer ${speciality === "Law" ? "bg-indigo-100 text-black" : ""}`}>Law</p>
          <p onClick={()=> speciality === 'Arts' ? navigate('/mentors') : navigate('/mentors/Arts')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded trandition-all cursor-pointer ${speciality === "Arts" ? "bg-indigo-100 text-black" : ""}`}>Arts</p>
        </div>
        <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 gap-y-6'>
          {
            filterDoc.map((item, index)=>(
            <div onClick={()=>navigate(`/appointment/${item._id}`)} className='border border-blue-300 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
               <img className='w-full h-68 bg-blue-50' src={item.image} alt="" /> 
               <div className='p-4'>
                <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-gray-500' } `}>
                    <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-500' } rounded-full`}></p><p>{item.available ? 'Available' : 'Not Available' }</p>
                </div>
                <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                <p className='text-gray-600 text-sm'>{item.speciality}</p>
               </div>
            </div>
        ))
          }
        </div>
      </div>
    </div>
  )
}

export default Mentors
