import React, { useState, useRef } from "react";
import OtpBox from "../components/OtpBox";
import { handleBackSpaceAndEnterKEY } from "../util/HandleBackSpaceKey";
import { HandleOtpInput } from "../util/HandleOtpInput";
export default function Login({ onClose }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [currentStep, setCurrentStep] = useState(1);
  const otpBoxRef = useRef([]);

  const handleChange = (e, index) => {
    if (e.target.name === "otp") {
      HandleOtpInput(e, otp, index, setOtp, otpBoxRef);
    } else {
      setPhoneNumber(e.target.value);
    }
  };

  const handlePhoneNumberSubmit = (e) => {
    e.preventDefault();
    console.log(phoneNumber);
    setTimeout(() => {
      setCurrentStep(2); // Move to OTP verification step
    }, 1000);
  };
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    console.log(otp);
  };

  return (
    <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white bg-opacity-80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-xl font-bold"
        >
          ×
        </button>

        {/* Step 1: Phone Number Input */}
        {currentStep === 1 && (
          <div>
            <h2 className="text-3xl font-bold text-blue-800 text-center mb-6">
              Login with Phone Number
            </h2>
            <form onSubmit={handlePhoneNumberSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="phone"
                  value={phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full h-12 border border-blue-300 rounded-lg px-4 py-2"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-xl shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Send OTP
              </button>
            </form>
          </div>
        )}

        {/* Step 2: OTP Verification */}
        {currentStep === 2 && (
          <div>
            <h2 className="text-3xl font-bold text-blue-800 text-center mb-6">
              Verify OTP
            </h2>
            <p className="text-center mb-6">
              A 4-digit OTP has been sent to {phoneNumber}.
            </p>
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div className="grid grid-cols-4 gap-4">
                <OtpBox
                  otp={otp}
                  handleBackSpaceAndEnterKEY={handleBackSpaceAndEnterKEY}
                  handleChange={handleChange}
                  otpBoxRef={otpBoxRef}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-xl shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Verify OTP
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
