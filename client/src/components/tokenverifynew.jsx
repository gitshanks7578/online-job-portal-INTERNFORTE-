import React, { useState, useRef } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
function TokenVerifynew() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputs = useRef([]);
    const navigate = useNavigate()
  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // move to next input if value entered
    if (value && index < 5) inputs.current[index + 1].focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };
const [email, setEmail] = useState("");
  const handleSubmit = async(e) => {
    e.preventDefault();
    const token = Number(otp.join(""));
   
   try {
     const res = await axios.post(`${import.meta.env.VITE_AXIOS_BASE_URL}/forgetPassword/verify`,{
        email,
        token
    })
    if(res.data.success){
        navigate("/reset-password")
    }
    
   } catch (error) {
    console.log(error.message)
   }
  };

const handleresend = async(e)=>{
  e.preventDefault();
   const res = await axios.post(`${import.meta.env.VITE_AXIOS_BASE_URL}/forgetPassword/send`,{
      email
    })

    if(res.data.success){

      navigate("/verify-otp")
    }
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
          <h1 className="text-zinc-300 text-4xl pt-5 mx-5">Verify Token</h1>
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

            {/* OTP boxes */}
            <label className="text-zinc-300 mt-2">Verification Code</label>
            <div className="flex gap-2 w-full justify-between">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => (inputs.current[i] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className="w-10 h-12 text-center text-xl font-semibold border border-zinc-500 rounded-md bg-transparent focus:border-red-600 outline-none"
                />
              ))}
            </div>

            {/* Submit */}
            <button
              className="w-full mt-6 mx-auto bg-red-700 rounded-md py-2 hover:bg-red-800 ease-in duration-100 cursor-pointer"
              type="submit"
            >
              verify
            </button>

            <span onClick={handleresend} className="text-xs cursor-pointer hover:text-zinc-400 ease duration-100 text-zinc-500">
              Didn’t get the code? Resend
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TokenVerifynew;
