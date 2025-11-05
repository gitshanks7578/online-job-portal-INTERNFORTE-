// import mongoose from "mongoose";
// import bcrypt from "bcrypt"
// import jwt from "jsonwebtoken"
// const userSchema = mongoose.Schema({
//     name:{
//         type:String,
//         required:true,
        
//     },
//     email:{
//         type:String,
//         required:true,
//         lowercase:true,
//         unique:true,
//         trim:true
//     },
//     password:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     refreshToken:{
//         type:String
//     }
// },{timestamps : true})


// userSchema.pre("save",async function(next) {
//     if(!this.isModified("password")){
//        return next()
//     }
//      this.password = await bcrypt.hash(this.password,10)
//     next()
// })


// userSchema.methods.isPasswordCorrect = async function(password){
//     return await bcrypt.compare(password,this.password)
// }


// userSchema.methods.generateRefreshToken = function(){
//     return jwt.sign({
//         _id : this._id
//     },
//     process.env.REFRESH_TOKEN_SECRET,{
//         expiresIn:process.env.REFRESH_TOKEN_EXPIRY
//     }
// )
// }
// userSchema.methods.generateAccessToken = function(){
//     return jwt.sign({
// this "_id : this._id  ---> will be used later on in "decoded._id" to get id when we verify it
//         _id : this._id
//     },
//     process.env.ACCESS_TOKEN_SECRET,{
//         expiresIn:process.env.ACCESS_TOKEN_EXPIRY
//     }
// )
// }

// export const user = mongoose.model("user",userSchema)



import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required :true,
        lowercase:true,
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    refreshToken:{
        type:String
    },
    verificationToken:{
        type:Number,
    },
    verificationCodeExpiresIn:{
        type :Date
    }
},{timestamps:true})

userSchema.pre("save" , async function(){
    if(!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password,10)
    
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id : this._id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    }
        
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id : this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn : process.env.REFRESH_TOKEN_EXPIRY
    }
        
    )
}
export const user = mongoose.model("user",userSchema)