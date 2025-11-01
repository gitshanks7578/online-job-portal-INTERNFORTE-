import mongoose from "mongoose";
import bcrypt from "bcrypt"
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    refreshToken:{
        type:String
    }
},{timestamps : true})


userSchema.pre("save",async function(next) {
    if(!this.isModified("password")){
       return next()
    }
     this.password = await bcrypt.hash(this.password,10)
    next()
})


export const user = mongoose.model("user",userSchema)