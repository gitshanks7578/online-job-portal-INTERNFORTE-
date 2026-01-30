// import dotenv from "dotenv"
// import express from "express"
// import mongoose from "mongoose"

// import app from "./app.js"
// import dbConnect from "./db/db.js"
// dotenv.config()

// dbConnect();

// app.listen(process.env.PORT || 8000,()=>{
//     console.log("\n\nserver is running\n\n")
// })

import dotenv from "dotenv";
import app from "./app.js";
import dbConnect from "./db/db.js";

dotenv.config();

dbConnect()
  .then(() => {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
  });


