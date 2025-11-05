import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplate.js"
import { mailTrapClient,sender } from "./mailtrap.config.js"

export const sendVerificationEmail = async (email,verificationToken)=>{
    const recipient =[{email}]
    try {
        const response = await mailTrapClient.send({
            from : sender,
            to :recipient,
            subject:"verify your email",
            html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
            category : "email verification"
        })
        console.log("email sent successfully")
    } catch (error) {
        throw new Error(`error sending mails ${error.message}`)
    }
}