import express from 'express'
import { gettingAdminPosts, publishPost } from '../controller/post-controller.js'
import userAuthMiddleware from '../middlewares/userAuthMiddleware.js'
const postRouter = express.Router()

postRouter.route('/api/publish-auth-post').post(publishPost) 
postRouter.route('/api/get-admin-post').get(userAuthMiddleware, gettingAdminPosts)


export default postRouter