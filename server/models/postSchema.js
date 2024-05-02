import mongoose from 'mongoose'


const postSchema = mongoose.Schema({
    adminEmail:{
        type: String,
        required: true
    },
    postimg:{
        type: String
    },
    title:{
        type: String,
        required: true
    },
    desc:{
        type: String,
        required: true
    },
    postDAte:{
        type: String,
        required: true
    }
})

export const Post = mongoose.model('Post', postSchema)