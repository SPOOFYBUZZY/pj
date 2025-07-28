import React, { useState, useRef } from 'react';
import { saveUserToLocalStorage } from '../utils/saveUserToLocalStorage';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [step, setStep] = useState<'name' | 'mobile' | 'otp'>('name');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { sendOtp, verifyOtp } = useAuth();
  const navigate = useNavigate();
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    setError('');
    setStep('mobile');
  };

  const handleMobileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(mobile)) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      await sendOtp(name, mobile);
      setStep('otp');
    } catch {
      setError('Failed to send OTP.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (idx: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);
    if (value && idx < 5) {
      otpRefs.current[idx + 1]?.focus();
    }
    if (!value && idx > 0) {
      otpRefs.current[idx - 1]?.focus();
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setError('Please enter the 6-digit OTP.');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      await verifyOtp(name, mobile, otpValue);
      saveUserToLocalStorage(name, mobile);
      navigate('/');
    } catch {
      setError('Invalid OTP or Name.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <div className="text-center mb-8">
            <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-xl inline-block mb-4">
              PJ Money Power
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600">
              Sign in to your account to continue
            </p>
          </div>

          {step === 'name' && (
            <form onSubmit={handleNameSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your full name"
                />
              </div>
              {error && <div className="text-red-600 text-sm text-center">{error}</div>}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Continue
              </motion.button>
            </form>
          )}

          {step === 'mobile' && (
            <form onSubmit={handleMobileSubmit} className="space-y-6">
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={mobile}
                  onChange={e => setMobile(e.target.value.replace(/[^0-9]/g, ''))}
                  required
                  maxLength={10}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your 10-digit mobile number"
                />
              </div>
              {error && <div className="text-red-600 text-sm text-center">{error}</div>}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Sending OTP...' : 'Send OTP'}
              </motion.button>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                  Enter OTP sent to <span className="font-semibold">{mobile}</span>
                </label>
                <div className="flex justify-center gap-2">
                  {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={el => (otpRefs.current[idx] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={e => handleOtpChange(idx, e.target.value)}
              className="w-12 h-12 text-2xl text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
                  ))}
                </div>
              </div>
              {error && <div className="text-red-600 text-sm text-center">{error}</div>}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Verifying...' : 'Verify & Login'}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Login;