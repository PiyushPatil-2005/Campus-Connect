import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.png'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import doc1 from './eng1.png'//'./doc1.png' 
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './manag3.png'//doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './eng2.png'//'./doc8.png'
import doc9 from './manag1.png'//'./doc9.png'
import doc10 from './law.png'//'./doc10.png'
import doc11 from './manag2.png'//'./doc11.png'
import doc12 from './eng4.png'//'./doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './eng3.png'//'./doc15.png'
import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'


export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo
}

export const specialityData = [
    {
        speciality: 'Engineering',
        image: General_physician
    },
    {
        speciality: 'Medical',
        image: Gynecologist
    },
    {
        speciality: 'Management',
        image: Dermatologist
    },
    {
        speciality: 'Design',
        image: Pediatricians
    },
    {
        speciality: 'Law',
        image: Neurologist
    },
    {
        speciality: 'Arts',
        image: Gastroenterologist
    },
]

export const mentors = [
    {
        _id: 'mentor1',
        name: 'Jeff Bezos', //Dr. Richard James
        gender: 'Male',
        dob: '1990-05-14',
        image: doc1,
        speciality: 'Engineering',
        degree: 'B.Tech',
        collegeName: 'IIT Delhi',
        about: 'Dr. Richard is passionate about innovative engineering solutions and guiding students in technical fields.',
        fees: 50,
        collegeStartYear: 2012,
        collegeEndYear: 2016
    },
    {
        _id: 'mentor2',
        name: 'Dr. Emily Larson',
        gender: 'Female',
        dob: '1993-08-21',
        image: doc2,
        speciality: 'Medical',
        degree: 'MBBS',
        collegeName: 'AIIMS Delhi',
        about: 'Dr. Emily is dedicated to patient care and guiding medical aspirants with real-world clinical insights.',
        fees: 60,
        collegeStartYear: 2014,
        collegeEndYear: 2018
    },
    {
        _id: 'mentor3',
        name: 'Dr. Sarah Patel',
        gender: 'Female',
        dob: '1998-11-02',
        image: doc3,
        speciality: 'Design',
        degree: 'B.Des',
        collegeName: 'NIFT Mumbai',
        about: 'Sarah inspires creativity and design thinking, mentoring students in modern fashion and product design.',
        fees: 30,
        collegeStartYear: 2017,
        collegeEndYear: 2021
    },
    {
        _id: 'mentor4',
        name: 'Dr. Christopher Lee',
        gender: 'Male',
        dob: '1996-03-10',
        image: doc4,
        speciality: 'Medical',
        degree: 'MBBS',
        collegeName: 'CMC Vellore',
        about: 'Christopher focuses on preventive medicine and mentoring future doctors.',
        fees: 40,
        collegeStartYear: 2015,
        collegeEndYear: 2019
    },
    {
        _id: 'mentor5',
        name: 'Dr. Jennifer Garcia',
        gender: 'Female',
        dob: '1989-07-30',
        image: doc5,
        speciality: 'Management',
        degree: 'MBA',
        collegeName: 'IIM Ahmedabad',
        about: 'Jennifer mentors management students with expertise in leadership and corporate strategy.',
        fees: 50,
        collegeStartYear: 2011,
        collegeEndYear: 2015
    },
    {
        _id: 'mentor6',
        name: 'Dr. Andrew Williams',
        gender: 'Male',
        dob: '1991-01-18',
        image: doc6,
        speciality: 'Design',
        degree: 'M.Des',
        collegeName: 'NID Ahmedabad',
        about: 'Andrew has deep expertise in industrial design and helps students bring creativity to life.',
        fees: 50,
        collegeStartYear: 2013,
        collegeEndYear: 2017
    },
    {
        _id: 'mentor7',
        name: 'Dr. Christopher Davis',
        gender: 'Male',
        dob: '1988-09-05',
        image: doc7,
        speciality: 'Medical',
        degree: 'MD',
        collegeName: 'JIPMER Puducherry',
        about: 'Christopher is committed to advancing medical education and mentoring students.',
        fees: 50,
        collegeStartYear: 2010,
        collegeEndYear: 2014
    },
    {
        _id: 'mentor8',
        name: 'Joseph Kurian',
        gender: 'Male',
        dob: '1997-04-22',
        image: doc8,
        speciality: 'Engineering',
        degree: 'M.Tech',
        collegeName: 'IIT Bombay',
        about: 'Timothy guides engineering students in advanced technical fields and innovation.',
        fees: 60,
        collegeStartYear: 2016,
        collegeEndYear: 2020
    },
    {
        _id: 'mentor9',
        name: 'Dr. Ava Mitchell',
        gender: 'Female',
        dob: '2000-02-12',
        image: doc9,
        speciality: 'Management',
        degree: 'MBA',
        collegeName: 'IIM Bangalore',
        about: 'Ava helps management aspirants in business strategy and entrepreneurship.',
        fees: 30,
        collegeStartYear: 2018,
        collegeEndYear: 2022
    },
    {
        _id: 'mentor10',
        name: 'Jeffrey King',
        gender: 'Male',
        dob: '1995-12-03',
        image: doc10,
        speciality: 'Law',
        degree: 'LLB',
        collegeName: 'NLSIU Bangalore',
        about: 'Jeffrey is passionate about legal studies and guides students preparing for law careers.',
        fees: 40,
        collegeStartYear: 2014,
        collegeEndYear: 2018
    },
    {
        _id: 'mentor11',
        name: 'Zoe Kelly',
        gender: 'Female',
        dob: '1991-06-25',
        image: doc11,
        speciality: 'Management',
        degree: 'MBA',
        collegeName: 'XLRI Jamshedpur',
        about: 'Zoe shares her knowledge of business management and leadership with aspiring managers.',
        fees: 50,
        collegeStartYear: 2012,
        collegeEndYear: 2016
    },
    {
        _id: 'mentor12',
        name: 'Patrick Harris',
        gender: 'Male',
        dob: '1990-10-08',
        image: doc12,
        speciality: 'Engineering',
        degree: 'B.Tech',
        collegeName: 'IIT Kanpur',
        about: 'Patrick mentors engineering students, focusing on innovation and research.',
        fees: 50,
        collegeStartYear: 2011,
        collegeEndYear: 2015
    },
    {
        _id: 'mentor13',
        name: 'Dr. Chloe Evans',
        gender: 'Female',
        dob: '1987-11-15',
        image: doc13,
        speciality: 'Medical',
        degree: 'MBBS',
        collegeName: 'AFMC Pune',
        about: 'Chloe helps aspiring doctors prepare for the medical profession with practical insights.',
        fees: 50,
        collegeStartYear: 2009,
        collegeEndYear: 2013
    },
    {
        _id: 'mentor14',
        name: 'Ryan Martinez',
        gender: 'Male',
        dob: '1996-01-27',
        image: doc14,
        speciality: 'Arts',
        degree: 'BA',
        collegeName: 'JNU Delhi',
        about: 'Ryan mentors arts students with a focus on literature and critical thinking.',
        fees: 60,
        collegeStartYear: 2015,
        collegeEndYear: 2019
    },
    {
        _id: 'mentor15',
        name: 'Amelia Hill',
        gender: 'Female',
        dob: '1999-09-19',
        image: doc15,
        speciality: 'Engineering',
        degree: 'B.Tech',
        collegeName: 'BITS Pilani',
        about: 'Amelia supports engineering students in mastering core concepts and projects.',
        fees: 30,
        collegeStartYear: 2017,
        collegeEndYear: 2021
    }
];

export default assets;