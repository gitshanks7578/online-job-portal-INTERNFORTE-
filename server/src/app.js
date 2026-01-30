// import mongoose from "mongoose"
// import express, { urlencoded } from "express"
// import cors from "cors"
// import cookieParser from "cookie-parser"
// import authrouter from "./routes/auth.routes.js"
// import adminrouter from "./routes/admin.routes.js"
// import userrouter from "./routes/user.routes.js"
// const app = express()

// app.use(express.json())
// app.use(express.urlencoded({extended:true}))
// // app.use(cors())
// app.use(cors({
//   origin: "http://localhost:5173",  // frontend origin
//   credentials: true                 // allow cookies
// }));
// app.use(cookieParser())

// app.get("/",(req,res)=>{
//     res.send("hello")
// })

// // app.get("api/v1/users",router) wrong
// // mounts a router object on a base path 
// app.use("/api/v1/auth",authrouter) 
// app.use("/api/v1/admin",adminrouter)
// app.use("/api/v1/user",userrouter)
// export default app


import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// ===== Import Routes =====
import authrouter from "./routes/auth.routes.js";
import adminrouter from "./routes/admin.routes.js";
import userrouter from "./routes/user.routes.js";

// ===== Import Middleware =====
import { verifyJwt,verifyRole } from "./middlewares/auth.middleware.js";


const app = express();

// ===== Middleware =====
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173", // frontend origin
    credentials: true,               // allow cookies
  })
);

app.use(cookieParser());

// ===== Test Route =====
app.get("/", (req, res) => {
  res.send("hello");
});




app.use("/api/v1/auth", authrouter);


app.use("/api/v1/admin", verifyJwt, verifyRole(["admin"]), adminrouter);


app.use("/api/v1/user", verifyJwt, verifyRole(["user"]), userrouter);

export default app;
