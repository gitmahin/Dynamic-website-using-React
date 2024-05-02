import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


const userSchema = mongoose.Schema({
    profileImg:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true 
    }, 
    pass:{
        type: String,
        required: true 
    }, 
    cpass:{
        type: String,
        required: true 
    }, 
    registerDate:{
        type: String,
        required: true 
    }, 
    lastLoginDate:{
        type: String
    }   
})

userSchema.pre('save', async function (next){
    if(this.isModified('pass')){
        this.pass = await bcrypt.hash(this.pass, 12)
        this.cpass = await bcrypt.hash(this.cpass, 12)
    }
    next()
})

userSchema.methods.saveLogDate = async function(){
    const date = new Date()
    const localDate = date.toLocaleString('en-US', {
        hour12: false
    })

    this.lastLoginDate = localDate
    await this.save()
}

userSchema.methods.generateAuthToken = async function() {
    try {
        return jwt.sign({
            userID: this._id.toString(),
            email: this.email
        }, process.env.SECRET_KEY, {
            expiresIn: '1h'
        }  )    
    } catch (error) {
        console.log('jwt error');
    }
}




export const User = mongoose.model('User', userSchema)