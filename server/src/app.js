import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authrouter from "./routes/auth.routes.js";
import adminrouter from "./routes/admin.routes.js";
import userrouter from "./routes/user.routes.js";

import { verifyJwt,verifyRole } from "./middlewares/auth.middleware.js";


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173", // frontend origin
    credentials: true,               // allow cookies
  })
);

app.use(cookieParser());

//test route
app.get("/", (req, res) => {
  res.send("hello");
});



//3 base routes
app.use("/api/v1/auth", authrouter);


app.use("/api/v1/admin", verifyJwt, verifyRole(["admin"]), adminrouter);


app.use("/api/v1/user", verifyJwt, verifyRole(["user"]), userrouter);

export default app;
