import { User } from "../models/userSchema.js"
import { Post } from "../models/postSchema.js"
import bcrypt from 'bcryptjs'

export const register = async (req, res) =>{
    const {profileImg, email, pass, cpass} =  req.body 
    try {
        if(!email || !pass || !cpass){
            res.status(422).json({error:"Fill the required fields"})
        }else{
            const userExisted = await User.findOne({email: email})
            if(userExisted){
                res.status(400).json({error:"User already existed"})
            }else{

                const date = new Date()
                const localDate = date.toLocaleString('en-US', {
                    hour12: false
                })

                const createUser = new User({profileImg, email, pass, cpass, registerDate: localDate})
                await createUser.save()
                res.status(201).json({message:"User registered successfully"})
            }
        }
    } catch (error) {
        res.status(500).json({error:"Server error"})
         
    }
}

export const loginUser = async (req, res) =>{
    const {email , pass} =  req.body
    try {
        if(!email || !pass) {
            res.status(422).json({error:"Fill the required fields"})
        }else{
            const userExisted = await User.findOne({email: email})
            if(userExisted){
                const isMatch = await bcrypt.compare(pass, userExisted.pass)
                if(isMatch){

                    await userExisted.saveLogDate()

                    res.status(200).json({message:"User loged in successfully", token: await userExisted.generateAuthToken(), userID: userExisted._id.toString()})
                }else{
                    res.status(400).json({error:"Invalid credentials"})
                }
            }else{

                res.status(400).json({error:"Invalid credentials email"})
            }
        }
    } catch (error) {
        res.status(500).json({error:"Server error"})
        
    }
}


export const adminuser =(req, res) =>{
    try {
        const userData = req.user
        return res.status(200).json(userData)
    } catch (error) {
        res.status(400).json({error: "Error user authenticate"})
        
    }
}


export const deleteUser = async (req, res) =>{
    try {
       
        const findUser = req.params     
        const delUser =  findUser.email 
        await User.deleteOne({email: delUser})
        await Post.deleteMany({adminEmail: delUser})
        res.status(200).json({message:"user has been deleted"})
    } catch (error) {
        res.status(400).json({error:"Error deleting user"})      
    }


}