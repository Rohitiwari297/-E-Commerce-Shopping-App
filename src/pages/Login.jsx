import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, login } from "../redux/features/auth/authSlice";

function Login() {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // STEP 1 → SEND OTP
  const handleSendOtp = (e) => {
    e.preventDefault();

    dispatch(sendOtp(mobile))
      .unwrap()
      .then((res) => {
        console.log(res);
        alert("OTP sent successfully!");
        setStep(2);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  

  // STEP 2 → VERIFY OTP
  const handleVerifyOtp = (e) => {
    e.preventDefault();

    dispatch(login({ mobile, otp }))
      .unwrap()
      .then((res) => {
        alert("OTP verified successfully!");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }
 

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Login with OTP
        </h2>

        {step === 1 && (
          <form onSubmit={handleSendOtp} className="mt-6">
            <input
              type="number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter mobile number"
              className="w-full px-4 py-2 border rounded"
              required
            />
            <button className="w-full mt-4 bg-green-600 text-white py-2 rounded">
              Send OTP
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="mt-6">
            <input
              type="number"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full px-4 py-2 border rounded"
              required
            />
            <button className="w-full mt-4 bg-green-600 text-white py-2 rounded">
              Verify OTP
            </button>
          </form>
        )}

        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-green-600">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
