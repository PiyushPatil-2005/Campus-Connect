import express from 'express'
import { addMentor, loginAdmin } from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'

const adminRouter = express.Router()

adminRouter.post('/add-mentor', authAdmin, upload.single('image'), addMentor)
adminRouter.post('/login', loginAdmin)

export default adminRouter
