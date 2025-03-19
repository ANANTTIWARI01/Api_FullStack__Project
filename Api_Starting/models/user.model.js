import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        lowercase: true,
    },
    email:{
        type:String,
        required:true,
        unique: true,
    },
    password:{
        type:String,
        required:true,
    },
    image:{
        type:String
    },
    // role:{
    //     type:String,
    //     default:"user",
    // }
})

 const User = mongoose.model("user",userSchema)
 export default User