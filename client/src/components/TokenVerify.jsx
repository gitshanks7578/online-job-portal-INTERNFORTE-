import React, { useState } from "react";
import axios from "axios"
import {useNavigate} from "react-router-dom"
function TokenVerify() {


  
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const handleSubmit =async(e) => {
    e.preventDefault();
    const res = await axios.post(`${import.meta.env.VITE_AXIOS_BASE_URL}/forgetPassword/send`,{
      email
    })

    if(res.data.success){

      navigate("/verify-otp")
    }
   
    
  };

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
          <h1 className="text-zinc-300 text-4xl pt-5 mx-5">Verify email</h1>
          <p className="mx-5 mt-2 text-xs text-zinc-400">
            Enter your email and the 6-digit verification code
          </p>

          <form
            className="p-5 flex flex-col gap-4 justify-center items-start"
            onSubmit={handleSubmit}
          >
            {/* Email */}
            <label className="text-zinc-300">Email</label>
            <input
              className="border border-zinc-500 rounded-md w-full p-2 bg-transparent text-white"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            
      

            {/* Submit */}
            <button
              className="w-full mt-6 mx-auto bg-red-700 rounded-md py-2 hover:bg-red-800 ease-in duration-100 cursor-pointer"
              type="submit"
            >
              submit
            </button>

            
          </form>
        </div>
      </div>
    </div>
  );
}

export default TokenVerify;
