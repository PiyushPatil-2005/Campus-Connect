import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import mentorRouter from './routes/mentorRoute.js';
import userRouter from './routes/userRoute.js';
// import express from 'express';
// import userRoutes from './routes/userRoutes.js';


// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// Body parser middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// middlewares
app.use(express.json());
app.use(cors());

// api endpoints
app.use('/api/admin', adminRouter)
app.use('/api/mentor', mentorRouter)
app.use('/api/user', userRouter)


app.get('/', (req, res) => {
    res.send('API WORKING')
})

app.listen(port, () => console.log("Server Started", port))