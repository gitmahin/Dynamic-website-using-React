import jwt from 'jsonwebtoken'
import { User } from '../models/userSchema.js'
import { Post } from '../models/postSchema.js'


const userAuthMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')


    const jwtoken = token.replace('Bearer', "").trim()

    if (!jwtoken) {
        res.status(401).json({ error: "Unauthorized HTTP request" })
    } else {
        try {
            const isVerified = jwt.verify(jwtoken, process.env.SECRET_KEY)
            // console.log(isVerified);

            const userData = await User.findOne({ email: isVerified.email }).select({ pass: 0, cpass: 0 })
            const postdata = await Post.find({adminEmail: isVerified.email})
            // console.log(postdata);
            
          
            // console.log(userData);

            req.user = userData
            req.getPost = postdata
            req.token = token
            req.userID = userData._id

            next()

        } catch (error) {
            res.status(401).json({ error: "Unauthorized HTTP request" })

        }

    }
}

export default userAuthMiddleware