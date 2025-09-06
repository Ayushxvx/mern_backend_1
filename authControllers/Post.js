import Post from "../models/Post.js";

export const createPost = async (req,res) =>{
    try{
        const {title,description,tags} = req.body;
        const post = await Post.create({
            title,
            description,
            tags,
            author:req.user.id
        });
        res.status(201).json({message:"Post Created Succesfully",post})
    }
    catch(error){
        console.log(`Error = ${error.message}`)
    }
}

export const allPosts = async (req,res) =>{
    try{
        const posts = await Post.find().populate("author","username email").sort("-createdAt");
        res.status(200).json({posts});
    }
    catch(error){
        console.log(`Error = ${error.message}`);
    }
}

export const delPost = async (req,res) =>{
    try{
        const post = await Post.findById(req.params.id);
        if(req.user.id!=post.author.toString() && req.user.role != "admin"){
            res.status(403).json({message:"You are not authorized"});
        }
        await post.deleteOne();
        res.status(200).json({message:"Post deleted successfully"})
    }
    catch(error){
        console.log(`Error = ${error.message}`);
    }
}