import {user} from "../models/user.model.js"

export const deleteUserAndData = async(userid)=>{
    try {
        const user_delete = await user.findByIdAndDelete(userid)
        if(!user_delete) throw new Error(400,"couldnt find user to delete ,ref - deleteuseranddata function")
        //code for hard delete the data as well
        
        return user_delete;
        
    } catch (error) {
        throw new Error(500,`deleteUserAndData function failed || ${error.message}`)
    }
}