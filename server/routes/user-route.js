import express from 'express'
import { loginUser, register, adminuser, deleteUser} from '../controller/user-controller.js'
import userAuthMiddleware from '../middlewares/userAuthMiddleware.js'


const router = express.Router()


router.route('/api/user-register').post(register)
router.route('/api/user-signin').post(loginUser)
router.route('/api/admin-user').get(userAuthMiddleware, adminuser) 
router.route('/api/delete-user:email').delete(deleteUser) 

export default router