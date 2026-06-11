import React, { useState } from "react";
import axios from "axios"
import {useNavigate} from "react-router-dom"
function TokenVerify() {


  
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const handleSubmit =async(e) => {
    e.preventDefault();
    const res = await axios.post(`${import.meta.env.VITE_AXIOS_BASE_URL}/auth/forgetPassword/send`,{email})

    if(res.data.success){

      navigate("/verify-otp")
    }
   
    
  };

  return (
    <div className="auth-page">
      <div className="brand-watermark">NEXORA</div>
      <div className="auth-card">
        <div className="mb-6">
          <p className="badge mb-4">Password help</p>
          <h1 className="text-3xl font-bold text-white">Verify email</h1>
          <p className="mt-2 text-sm text-slate-400">
            Enter your email to receive a 6 digit code.
          </p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label className="field-label">Email</label>
            <input
              className="form-input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button
              className="btn-primary mt-3 w-full"
              type="submit"
            >
              Send code
            </button>
          </form>
      </div>
    </div>
  );
}

export default TokenVerify;
