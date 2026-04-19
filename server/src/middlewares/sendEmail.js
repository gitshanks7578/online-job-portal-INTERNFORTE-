import {user} from "../models/user.model.js"
import { sendVerificationEmail } from "../utils/mailtrap/emails.js"
export const sendEmail = async(req,res)=>{
    try {
        const{email} = req.body
        if(!email) return res.status(400).json({message : "need email to change password",success:false})
        const finduser = await user.findOne({email}).select("-password")
        if(!finduser) return res.status(404).json({message:"finduser doesnt exist/sendEmail func/"})
        if(finduser.verificationCodeExpiresIn < Date.now() || !finduser.verificationToken){
            finduser.verificationToken = Math.floor(100000 + Math.random() * 900000);
            finduser.verificationCodeExpiresIn = Date.now() + 10 * 60 * 1000;
        }
        await finduser.save()
        //email function caller with argument finduser.email
        // await sendVerificationEmail(email)
        return res.status(200).json({message:"email sent successfully",success:true})

        
    } catch (err) {
        return res.status(500).json({message:`email send function failed in first step || ${err.message}`})
    }
}

export const verifyToken = async(req,res)=>{
    try {
        const {email,token} = req.body
        if(!token || !email) return res.status(400).json({message:"all field required",success:false})
        const user_in_db = await user.findOne({email})
        if(token !== user_in_db.verificationToken)
            return res.status(400).json({message :"invalid user token",success:false})
        user_in_db.isVerified = true;
        await user_in_db.save()
        return res.status(200).json({message:"user verified",success:true})
        
    } catch (error) {
        return res.status(500).json({message :`verifyToken func failed || ${error.message}`,success:false})
    }
}

// export const checkTokenExpirationForUpdation = async(req,res)=>{
//     try {
        
//     } catch (error) {
//         return res.status(500).json({message:"token expiry middlware failed"})
//     }
// }
