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
     const res = await axios.post(`${import.meta.env.VITE_AXIOS_BASE_URL}/auth/forgetPassword/reset`,{
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
    <div className="auth-page">
      <div className="brand-watermark">NEXORA</div>
      <div className="auth-card">
          <p className="badge mb-4">Account recovery</p>
          <h1 className="text-3xl font-bold text-white">Reset password</h1>
          <p className="mt-2 text-sm text-slate-400">
            Enter and confirm your new password
          </p>

          <form
            className="mt-6 flex flex-col gap-3"
            onSubmit={handleSubmit}
          >
            <label className="field-label">Email</label>
            <input
              className="form-input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
            />
            <label className="field-label mt-1">New password</label>
            <input
              className="form-input"
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label className="field-label mt-1">Confirm password</label>
            <input
              className="form-input"
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />

            <button
              className="btn-primary mt-4 w-full"
              type="submit"
            >
              Update password
            </button>

            <span onClick={handlebacktologin} className="soft-link text-slate-400">
              Back to login
            </span>
          </form>
      </div>
    </div>
  );
}

export default ResetPassword;
