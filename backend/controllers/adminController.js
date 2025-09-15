import validator from 'validator'
import bycrypt from 'bcrypt'
import {v2 as cloudinary } from 'cloudinary'
import mentorModel from '../models/mentorModel.js'
import jwt from 'jsonwebtoken'


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

export { addMentor, loginAdmin }