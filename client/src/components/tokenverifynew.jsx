import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TokenVerifynew() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [email, setEmail] = useState("");
  const inputs = useRef([]);
  const navigate = useNavigate();

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) inputs.current[index + 1].focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Number(otp.join(""));

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_AXIOS_BASE_URL}/auth/forgetPassword/verify`,
        {
          email,
          token,
        },
      );
      if (res.data.success) {
        navigate("/reset-password");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleresend = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${import.meta.env.VITE_AXIOS_BASE_URL}/forgetPassword/send`, {
      email,
    });

    if (res.data.success) {
      navigate("/verify-otp");
    }
  };

  return (
    <div className="auth-page">
      <div className="brand-watermark">NEXORA</div>
      <div className="auth-card">
        <p className="badge mb-4">Secure reset</p>
        <h1 className="text-3xl font-bold text-white">Verify token</h1>
        <p className="mt-2 text-sm text-slate-400">
          Enter your email and the 6-digit verification code.
        </p>

        <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
          <label className="field-label">Email</label>
          <input
            className="form-input"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="field-label mt-2">Verification code</label>
          <div className="flex w-full justify-between gap-2">
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
                className="h-12 w-10 rounded-xl border border-slate-500/30 bg-slate-950/60 text-center text-xl font-semibold text-white outline-none focus:border-red-400 focus:ring-4 focus:ring-red-400/10 sm:w-12"
              />
            ))}
          </div>

          <button className="btn-primary mt-3 w-full" type="submit">
            Verify
          </button>

          <span onClick={handleresend} className="soft-link text-slate-400">
            Didn't get the code? Resend
          </span>
        </form>
      </div>
    </div>
  );
}

export default TokenVerifynew;
