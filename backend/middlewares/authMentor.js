import jwt from 'jsonwebtoken'

// mentor authentication middleware

const authMentor = (req, res, next) => {
    try {

        const {mtoken} = req.headers
        if(!mtoken) {
            return res.json({ success: false, message: 'Not Authorized Login Again' })
        }

        const token_decode = jwt.verify(mtoken, process.env.JWT_SECRET)
        req.mentorId = token_decode.id
        next()

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export default authMentor