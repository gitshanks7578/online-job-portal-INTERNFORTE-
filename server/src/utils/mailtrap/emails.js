import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplate.js"
import { mailTrapClient,sender } from "./mailtrap.config.js"
import {user} from "../../models/user.model.js"
export const sendVerificationEmail = async (email)=>{
    const usercheck = await user.findOne({email})
    const recipient =[{email}]
    try {
        const response = await mailTrapClient.send({
            from : sender,
            to :recipient,
            subject:"verify your email",
            html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",usercheck.verificationToken),
            category : "email verification"
        })
        console.log("email sent successfully")
    } catch (error) {
        throw new Error(`error sending mails ${error.message}`)
    }
}