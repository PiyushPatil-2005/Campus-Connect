import express from 'express'
import authMentor from '../middlewares/authMentor.js'
import { mentorList, loginMentor, appointmentsMentor, appointmentComplete, appointmentCancel, mentorDashboard, mentorProfile, updateMentorProfile } from '../controllers/mentorController.js'

const mentorRouter = express.Router()

mentorRouter.get('/list', mentorList)
mentorRouter.post('/login', loginMentor)
mentorRouter.get('/appointments', authMentor, appointmentsMentor)
mentorRouter.post('/complete-appointment', authMentor, appointmentComplete)
mentorRouter.post('/cancel-appointment', authMentor, appointmentCancel)
mentorRouter.get('/dashboard', authMentor, mentorDashboard )
mentorRouter.get('/profile', authMentor, mentorProfile)
mentorRouter.post('/update-profile', authMentor, updateMentorProfile)


export default mentorRouter