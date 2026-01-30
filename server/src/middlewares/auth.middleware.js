
import {user} from "../models/user.model.js"
import jwt from "jsonwebtoken"

//ACCESS TOKENS are saved into cookies or headers
//while REFRESH TOKENS are saved into the database
// export const verifyJwt = async(req,res,next)=>{
//     try {
//         const token = req?.cookies.accesstoken || req.header("authorization")?.replace("Bearer ","")
//         if(!token) throw new Error("401 unauthorized")
//         const decoded_token =  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
//         const existing_user  = await user.findById(decoded_token._id).select("-password -refreshToken")
//         if(!existing_user) throw new Error("invalid token 401")
            
//             //attaching a custom property to request object
//             req.User = existing_user
//             next()
//     } catch (error) {
//         return res.status(500).json({message : "verifyjwt middleware failed",success : false})
//     }
// }


export const verifyJwt = async (req,res,next)=>{
    try {
        const token = req?.cookies.accessToken || req.header("authorization")?.replace("Bearer ","")
        if(!token) throw new Error("401 unauthorized")
        const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        const existing_user = await user.findById(decoded._id).select("-password -refreshToken")
        if(!existing_user) return res.status(500).json({message:"something went wrong acquiring user in verifyjwt",success:false})
        
            req.User = existing_user
            next()
     } catch (err) {
        return res.status(500).json({message : "verifyjwt middleware failed",success:false})
    }
}

export const verifyRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.User.role)) {
      return res.status(403).json({ message: "Forbidden: insufficient permissions", success: false });
    }
    next();
  };
};
