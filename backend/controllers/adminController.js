import validator from 'validator'
import bycrypt from 'bcrypt'
import {v2 as cloudinary } from 'cloudinary'
import mentorModel from '../models/mentorModel.js'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'
import appointmentModel from '../models/appointmentModel.js'


// API for adding mentor

const addMentor = async (req, res) => {

    try {
        const { name, email, password, speciality, degree, collegeName, about, fees, gender, dob, phone, collegeStartYear, collegeEndYear } = req.body
        const image = req.file// Access the uploaded file's path

        console.log({ name, email, password, speciality, degree, collegeName, about, fees, gender, dob }, image)
        
        // checking for all data to add doctor
        
        if( !name || !email || !password || !speciality || !degree || !collegeName || !about || !fees || !gender || !dob || !image ) {
            return res.json({success:false, message: 'Missing Details, All fields are required'})
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Please Enter a Valid Email' })
        }

        // validating password strength
        if(password.length < 8) {
            return res.json({ success: false, message: 'Please enter a strong password' })
        }

        // hashing mentor password
        const salt = await bycrypt.genSalt(10)
        const hashedPassword = await bycrypt.hash(password, salt)

        // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(image.path, {
            resource_type: 'image'
        })
        const imageUrl = imageUpload.secure_url

        const mentorData = {
            name,
            email,
            password: hashedPassword,
            speciality,
            degree,
            collegeName,
            about,
            fees,
            gender,
            dob,
            image: imageUrl,
            date: Date.now(),
            collegeStartYear,
            collegeEndYear,
            phone,
        }

        const newMentor = new mentorModel(mentorData)
        await newMentor.save()

        res.json({ success: true, message: 'Mentor added successfully' })

    } catch (error) {

        console.error('Error adding mentor:', error);

        res.json({ success: false, message: error.message });

    }
}

//  API for admin Login
const loginAdmin = async (req, res) =>  {
    try {
        
        const { email, password } = req.body

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({success:true, token})

        } else {
            res.json({ success:false, message: 'Invalid Credentials' })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get all doctors list for admin panel

const allMentors = async (req, res) => {
    try {
        const mentors = await mentorModel.find({}).select('-password')
        res.json({ success: true, mentors })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get all appointments list
const appointmentsAdmin = async (req, res) => {

    try {

        const appointments = await appointmentModel.find({})
        res.json({success: true, appointments})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API for appointment cancellation

const appointmentCancel = async (req, res) => {

    try {

        const { appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        // releasing mentor slot

        const { mentorId, slotDate, slotTime } = appointmentData

        const mentorData = await mentorModel.findById(mentorId)

        let slots_booked = mentorData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await mentorModel.findByIdAndUpdate(mentorId, { slots_booked })

        res.json({ success: true, message: 'Appointment Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get dashboard data fro admin panel

const adminDashboard = async (req, res) => {

    try {

        const mentors = await mentorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            mentors: mentors.length,
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

export { addMentor, loginAdmin, allMentors,appointmentsAdmin, appointmentCancel, adminDashboard }