import React, { useState } from "react";
import axios from "axios"
import {useNavigate} from "react-router-dom"
function ResetPassword() {
  const [newPassword, setPassword] = useState("");
  const [confirmPassword, setConfirm] = useState("");
  const [email,setemail] = useState("")
  const navigate = useNavigate()
  const handleSubmit = async(e) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
     try {
     const res = await axios.post(`${import.meta.env.VITE_AXIOS_BASE_URL}/forgetPassword/reset`,{
      email,
      newPassword,
      confirmPassword
    })
    if(res.data.success){
        navigate("/login")
    }
    
   } catch (error) {
    console.log(error.message)
   }
   
  };
const handlebacktologin = ()=>{
  navigate("/login")
}
  return (
    <div className="relative">
      {/* Background */}
      <div className="w-full h-screen bg-zinc-950 absolute top-0 left-0 z-4">
        <h1 className="h-screen flex flex-row justify-center items-center sm:text-[10rem] md:text-[10rem] lg:text-[12rem] xl:text-[16rem] overflow-hidden text-nowrap font-bold text-zinc-900">
          NEXORA
        </h1>
      </div>

      {/* Foreground */}
      <div className="text-white w-full h-screen absolute top-0 left-0 z-7 flex flex-row justify-center items-center">
        <div className="bg-zinc-800 rounded-xl w-[25%] h-max shadow-xl">
          <h1 className="text-zinc-300 text-4xl pt-5 mx-5">Reset Password</h1>
          <p className="mx-5 mt-2 text-xs text-zinc-400">
            Enter and confirm your new password
          </p>

          <form
            className="p-5 flex flex-col gap-3 justify-center items-start"
            onSubmit={handleSubmit}
          >
            <label className="text-zinc-300">Email</label>
            <input
              className="border border-zinc-500 rounded-md w-full p-2 bg-transparent text-white"
              type="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
            />
            <label className="text-zinc-300">New Password</label>
            <input
              className="border border-zinc-500 rounded-md w-full p-2 bg-transparent text-white"
              type="password"
              value={newPassword}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label className="text-zinc-300">Confirm Password</label>
            <input
              className="border border-zinc-500 rounded-md w-full p-2 bg-transparent text-white"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />

            <button
              className="w-full mt-6 mx-auto bg-red-700 rounded-md py-2 hover:bg-red-800 ease-in duration-100 cursor-pointer"
              type="submit"
            >
              Update Password
            </button>

            <span onClick={handlebacktologin} className="text-xs cursor-pointer hover:text-zinc-400 ease duration-100 text-zinc-500">
              Back to Login
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
