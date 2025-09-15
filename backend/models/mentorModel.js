import mongoose from "mongoose";


const mentorSchema = mongoose.Schema({

    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    speciality: { type: String, required: true },
    degree: { type: String, required: true },
    gender: { type: String, required: true, default:"Not Selected" },
    dob: { type: String, required: true, default:"Not Selected" },
    collegeName: { type: String, required: true },
    about: { type: String, required: true },
    available: { type: Boolean, default: true },
    collegeStartYear: { type: Number, default: '0000' },
    collegeEndYear: { type: Number, default: '0000' },
    fees: { type: Number, required: true },
    date: { type: Date, default: Date.now() },
    slots_booked: { type: Object, default: {} },
    phone: { type:String, default:"0000000000" }

}, {minimize: false })

const mentorModel = mongoose.models.mentor || mongoose.model('mentors', mentorSchema)

export default mentorModel