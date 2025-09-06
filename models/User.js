import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    role:{type:String,enum:["user","admin"],required:true,default:"user"},
    password:{type:String,required:true},
},{
    timestamps:true,
})

userSchema.pre("save",async function (next){
    try{
    if(!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
    }
    catch(error){
        console.log(`Error = ${error.message}`);
    }
})

const User = mongoose.model("User",userSchema);
export default User;