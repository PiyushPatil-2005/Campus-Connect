import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { v2 } from 'cloudinary'
import { v2 as cloudinary } from 'cloudinary'
import mentorModel from '../models/mentorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import razorpay from 'razorpay'

// API to register user

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing Details" })
        }

        // Email validation
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter a valid Email" })
        }

        // Password length check
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters" })
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token })


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API for user login

const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User does not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            // Password correct → issue token
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            // Password incorrect
            res.json({ success: false, message: "Incorrect Password" })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

const getProfile = async (req, res) => {

    try {

        const userId = req.userId
        const userData = await userModel.findById(userId).select('-password')

        res.json({ success: true, userData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to Update user profile

const updateProfile = async (req, res) => {

    try {

        const userId = req.userId
        const { name, phone, dob, gender } = req.body
        const imageFile = req.file

        // const { userId, name, phone, dob, gender } = req.body
        // const imageFile = req.file

        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "Data Missing" })
        }

        await userModel.findByIdAndUpdate(userId, {
            name,
            phone,
            dob,
            gender
        })

        if (imageFile) {
            // Upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
            const imageUrl = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, { image: imageUrl })
        }

        res.json({ success: true, message: "Profile Updated" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to book appointment

const bookAppointment = async (req, res) => {

    try {

        const userId = req.userId

        const { mentorId, slotDate, slotTime } = req.body

        const menData = await mentorModel.findById(mentorId).select('-password')

        if (!menData.available) {
            return res.json({ success: false, message: "Mentor not available" })
        }

        let slots_booked = menData.slots_booked

        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: "Slot not available" })
            } else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select('-password')

        delete menData.slots_booked

        const appointmentData = {
            userId,
            mentorId,
            userData,
            menData,
            amount: menData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        // save new slots data in mentData
        await mentorModel.findByIdAndUpdate(mentorId, { slots_booked })

        res.json({ success: true, message: "Appointment Booked" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


// API to get user appointments for frontend my-appointments page

const listAppointment = async (req, res) => {
    try {
        const userId = req.userId
        const appointments = await appointmentModel.find({ userId })

        res.json({ success: true, appointments })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


// API to cancel appointment

const cancelAppointment = async (req, res) => {

    try {

        const userId = req.userId
        const { appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        // Verify appointment user
        if (appointmentData.userId !== userId) {
            return res.json({ success: false, message: "Unauthorized action" })

        }

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

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

// API to make payment of appointment using razorpay

const paymentRazorpay = async (req, res) => {

    try {

        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentData || appointmentData.cancelled) {
            return res.json({ success: false, message: "Appointment Cancelled or not found" })
        }

        // creating options for razorpay payment
        const options = {
            amount: appointmentData.amount * 100,
            currency: process.env.CURRENCY,
            receipt: appointmentId
        }

        // creation of an order
        const order = await razorpayInstance.orders.create(options)

        res.json({ success: true, order })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to verify of razorpay

const verifyRazorpay = async (req, res) => {
    try {

        const { razorpay_order_id } = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

        console.log(orderInfo)
        if (orderInfo.status === 'paid') {
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt, {payment:true})
            res.json({success: true, message: "Payment Successful"})
        } else {
            res.json({success:false, message:"Payment failed"})
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, paymentRazorpay, verifyRazorpay }