import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp, login } from '../redux/features/auth/authSlice';
import toast from 'react-hot-toast';
import { SendOtp } from '../utils/Apis';

function Login() {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [responseOtp, setResponseOtp] = useState('');
  const [step, setStep] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // STEP 1 → SEND OTP
  const handleSendOtp = async (e) => {
    if (e) e.preventDefault();

    if (mobile.length !== 10) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }

    try {
      const res = await dispatch(sendOtp(mobile)).unwrap();

      const otp1 = res.data.otp;

      setResponseOtp(otp1);
      toast.success('OTP sent successfully!');
      setStep(2);
      const formData = new FormData();
      formData.append('mobile', mobile);
      formData.append('otp', otp1);

      console.log('Form Data:', formData);
      // Now call your SMS API
      const smsRes = await SendOtp(formData);
      console.log('SMS Response:', smsRes);
    } catch (err) {
      toast.error(err.message || 'Failed to send OTP');
    }
  };

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Allow only digits
    if (value.length <= 10) {
      setMobile(value);
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Allow only digits
    if (value.length <= 6) {
      setOtp(value);
    }
  };

  // STEP 2 → VERIFY OTP
  const handleVerifyOtp = (e) => {
    if (e) e.preventDefault();

    if (otp.length < 4) {
      toast.error('Please enter a valid OTP');
      return;
    }

    dispatch(login({ mobile, otp }))
      .unwrap()
      .then(() => {
        toast.success('Login successful!');
        navigate('/');
      })
      .catch((err) => {
        toast.error(err.message || 'Invalid OTP');
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-xl shadow-gray-200/50 rounded-3xl w-full max-w-md p-8 border border-gray-100">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Login</h2>
          <p className="text-gray-500 font-medium">Enter your mobile to receive an OTP</p>
        </div>

        {step === 1 && (
          <form onSubmit={handleSendOtp} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Mobile Number</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold border-r pr-3">+91</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={mobile}
                  onChange={handleMobileChange}
                  placeholder="1234567890"
                  className="w-full pl-16 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-base font-semibold focus:bg-white focus:ring-4 focus:ring-green-600/10 focus:border-green-600 outline-none transition-all"
                  required
                />
              </div>
              <p className="text-[11px] text-gray-400 ml-1">Example: 1234567890 (10 digits only)</p>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-green-200 hover:bg-green-700 active:scale-[0.98] transition-all"
            >
              Send Verification Code
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Enter 4-digit OTP</label>
              <input
                type="text"
                inputMode="numeric"
                value={otp}
                onChange={handleOtpChange}
                placeholder="0000"
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-center text-2xl font-black tracking-[0.5em] focus:bg-white focus:ring-4 focus:ring-green-600/10 focus:border-green-600 outline-none transition-all"
                required
              />
              <p className="text-center text-xs text-gray-400">Sent to +91 {mobile}</p>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-green-200 hover:bg-green-700 active:scale-[0.98] transition-all"
            >
              Verify & LogIn
            </button>

            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full text-sm font-bold text-gray-500 hover:text-green-600 transition-colors"
            >
              Change Mobile Number
            </button>
          </form>
        )}

        <div className="mt-10 pt-8 border-t border-gray-100 text-center">
          <p className="text-sm font-medium text-gray-600">
            Don’t have an account yet?{' '}
            <Link to="/register" className="text-green-600 font-bold hover:underline decoration-2 underline-offset-4">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
