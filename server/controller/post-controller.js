import { Post } from "../models/postSchema.js";


export const publishPost = async (req, res) =>{
    const {adminEmail, postimg, title, desc} = req.body 
 
    try {
        if(!adminEmail || !title || !desc) {
            res.status(422).json({error:"Fill the required fields"})
        }else{
            const date = new Date()
            const localDate = date.toLocaleString("en-US", {
                hour12: false 
            })

            const createPost = new Post({adminEmail, postimg, title, desc, postDAte: localDate})
            await createPost.save()
            res.status(200).json({message:"Post has been published"})
        }
    } catch (error) {
        res.status(500).json({error:"Server error"})
        
    }
}

export const gettingAdminPosts = (req, res) =>{

    // get admin post using middleware custom request
    try {
        const postdata = req.getPost
        return res.status(200).json(postdata)
    } catch (error) {
        res.status(400).json({error: "Error user authenticate"})
        
    }


    // get all users posts
    // Post.find({}).then((posts) =>{ 
    //     res.status(200).json(posts)
    // }).catch((err) =>{
    //     console.log('getting post error');
        
    // })
}