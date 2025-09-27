import mentorModel from "../models/mentorModel.js"
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"

const changeAvailability = async (req, res) => {
    try {

        const { mentorId } = req.body

        const menData = await mentorModel.findById(mentorId)
        await mentorModel.findByIdAndUpdate(mentorId, { available: !menData.available })
        res.json({ success: true, message: 'Availability Changed' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const mentorList = async (req, res) => {
  try {
    const mentors = await mentorModel.find({}).select(['-password', '-email'])
    res.json({ success: true, mentors })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// API fro mentor Login

const loginMentor = async (req, res) => {

  try {

    const { email, password } = req.body
    const mentor = await mentorModel.findOne({email})

    console.log(mentor)

    if (!mentor) {
      return res.json({success: false, message:'Invalid Credentials'})
    }

    const isMatch = await bcrypt.compare(password, mentor.password )

    if (isMatch) {
      const token = JWT.sign({id: mentor._id}, process.env.JWT_SECRET)
      res.json({success: true, token})
    } else {
      res.json({success:false, message:'Invalid Credentials'})
    }
    
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }

}

// API to get mentor appointments for mentor panel

const appointmentsMentor = async (req, res) => {
  try {
    
    const mentorId = req.mentorId
    const appointments = await appointmentModel.find({ mentorId })

    res.json({ success: true, appointments})

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// API to mark appointment completed for mentor panel

const appointmentComplete = async (req, res) => {

  try {

    const mentorId = req.mentorId
    const { appointmentId } = req.body
    const appointmentData = await appointmentModel.findByIdAndUpdate(appointmentId)
    
    if(appointmentData && appointmentData.mentorId === mentorId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {isCompleted: true})
      return res.json({success: true, message: 'Appointment Completed'})
    } else {
      return res.json({success: false, message: 'Mark Failed'})
    }
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// API to cancel completed for mentor panel

const appointmentCancel = async (req, res) => {

  try {

    const mentorId = req.mentorId
    const { appointmentId } = req.body
    const appointmentData = await appointmentModel.findByIdAndUpdate(appointmentId)
    
    if(appointmentData && appointmentData.mentorId === mentorId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled: true})
      return res.json({success: true, message: 'Appointment Cancelled'})
    } else {
      return res.json({success: false, message: 'Cancellation Failed'})
    }
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// API to get dashboard data for mentor panel

const mentorDashboard = async (req, res) => {

  try {
    
    const mentorId = req.mentorId

    const appointments = await appointmentModel.find({ mentorId })

    let earnings = 0

    appointments.map((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount
      }
    })

    let users = []

    appointments.map((item) => {
      if(!users.includes(item.userId)) {
        users.push(item.userId)
      }
    })

    const dashData = {
      earnings,
      appointments: appointments.length,
      users: users.length,
      latestAppointments: appointments.reverse().slice(0, 5)
    }

    res.json({success: true, dashData})

  } catch (error) {
    console.log(error)
    res.json({success: false, message: error.message})
  }
}

// API to get mentor profile for Mentor Panel

const mentorProfile = async (req, res) => {

  try {

    const mentorId = req.mentorId
    const profileData = await mentorModel.findById(mentorId).select('-password')

    res.json({success: true, profileData})

  } catch (error) {
    console.log(error)
    res.json({success: false, message: error.message})
  }
}

// API to update mentor profile data from mentor panel

const updateMentorProfile = async (req, res) => {
  try {

    const mentorId = req.mentorId
    const { about, fees, available } = req.body

    await mentorModel.findByIdAndUpdate(mentorId, {about, fees, available})

    res.json({success: true, message: 'Profile Updated'})
    
  } catch (error) {
    console.log(error)
    res.json({success: false, message: error.message})
  }
}


export { 
  changeAvailability, 
  mentorList, 
  loginMentor, 
  appointmentsMentor, 
  appointmentCancel, 
  appointmentComplete, 
  mentorDashboard,
  mentorProfile,
  updateMentorProfile
 }