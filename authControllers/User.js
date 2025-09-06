import User from "../models/User.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Post from "../models/Post.js";
import { request } from "express";

const generateToken = (id,role) =>{
    let token;
    try{
        token = jwt.sign({id,role},process.env.JWT_SECRET,{
            expiresIn:'7d'
        })
        return token;
    }
    catch(error){
        console.log(`Error = ${error.message}`);
    }
}


export const registerUser = async(req,res) =>{
    try{
        const {username,email,password} = req.body;
        let findUser = await User.findOne({email});
        if (findUser) return res.status(400).json({message:"Email already taken"});
        findUser = await User.findOne({username});
        if(findUser) return res.status(400).json({message:"Username already taken"}); 
        const user = await User.create({
            username,email,password
        });
        res.status(201).json({message:"User created successfully"});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}

export const loginUser = async(req,res) =>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if (!user) return  res.status(404).json({message:"User Not Found"});
        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch){
            res.status(400).json({message:"Invalid password"});
        }
        const token = generateToken(user.id,user.role);
        console.log(`Token = ${token}`)
        res.status(200).json({message:"Login Successful",user,token})
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
} 

export const getUserDetails = async (req, res) => {
  try {
    // req.user already has the user from middleware
    const user = req.user;

    if (!user) return res.status(404).json({ message: "User not found" });

    const posts = await Post.find({ author: user._id });

    res.status(200).json({ user,username: user.username, posts,email:user.email });
  } catch (error) {
    console.error(`Error = ${error.message}`);
    res.status(500).json({ message: "Server error" });
  }
};
