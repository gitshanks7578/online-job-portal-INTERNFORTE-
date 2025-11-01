import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"

import app from "./app.js"
import dbConnect from "./db/db.js"
dotenv.config()

dbConnect();

console.log("hello world")
app.listen(process.env.PORT || 8000,()=>{
    console.log("\n\nserver is running\n\n")
})


