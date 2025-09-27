import express from 'express'
import { addMentor, allMentors, loginAdmin, appointmentsAdmin, appointmentCancel, adminDashboard } from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'
import { changeAvailability } from '../controllers/mentorController.js'

const adminRouter = express.Router()

adminRouter.post('/add-mentor', authAdmin, upload.single('image'), addMentor)
adminRouter.post('/login', loginAdmin)
adminRouter.post('/all-mentors', authAdmin, allMentors)
adminRouter.post('/change-availability', authAdmin, changeAvailability)
adminRouter.get('/appointments', authAdmin, appointmentsAdmin)
adminRouter.post('/cancel-appointment', authAdmin, appointmentCancel)
adminRouter.get('/dashboard', authAdmin, adminDashboard )

export default adminRouter