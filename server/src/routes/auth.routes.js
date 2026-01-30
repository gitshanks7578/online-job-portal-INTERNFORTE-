import express from "express"
import {forgetPassword, login, logout, post, registerUser, removeUser } from "../controllers/auth.controller.js"
import { verifyJwt } from "../middlewares/auth.middleware.js"
import {sendEmail,verifyToken} from "../middlewares/sendEmail.js"


const authrouter = express.Router()


authrouter.post("/register",registerUser)
authrouter.post("/login",login)
authrouter.post("/logout",verifyJwt,logout)

//this way we'll need to type email each time
//in next project we'll introduce sessiotoken
authrouter.post("/forgetPassword/send", sendEmail);          // Step 1
authrouter.post("/forgetPassword/verify", verifyToken);      // Step 2
authrouter.post("/forgetPassword/reset", forgetPassword);    //step 3

authrouter.post("/removeUser",verifyJwt,removeUser)

//dummy
authrouter.post("/post",verifyJwt,post)

export default authrouter