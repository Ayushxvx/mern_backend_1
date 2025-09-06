import mongoose from "mongoose";
import User from "./User.js";

const postSchema = new mongoose.Schema({
    title:{
        type:String,required:true,
    },
    description:{type:String,required:true},
    tags:[{type:String}],
    author:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}
},{
    timestamps:true
})

const Post = mongoose.model("Post",postSchema);
export default Post;