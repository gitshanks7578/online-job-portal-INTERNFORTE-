import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authrouter from "./routes/auth.routes.js";
import adminrouter from "./routes/admin.routes.js";
import userrouter from "./routes/user.routes.js";
import path from "path";
import { fileURLToPath } from "url";
import { verifyJwt,verifyRole } from "./middlewares/auth.middleware.js";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", 1);
app.use(
  cors({
    origin:[
       "https://online-job-portal-internforte-1.onrender.com"
    ],
 // frontend origin
    credentials: true,               // allow cookies
  })
);
app.options("*", cors());
app.use(cookieParser());

//test route
app.get("/", (req, res) => {
  res.send("hello");
});



//3 base routes
app.use("/api/v1/auth", authrouter);


app.use("/api/v1/admin", verifyJwt, verifyRole(["admin"]), adminrouter);


app.use("/api/v1/user", verifyJwt, verifyRole(["user"]), userrouter);


app.use(express.static(path.join(__dirname, "../../client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
});
export default app;
