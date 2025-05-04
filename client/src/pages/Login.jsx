import React, { useState, useRef } from "react";
import { handleBackSpaceAndEnterKEY } from "../util/HandleBackSpaceKey";
import { HandleOtpInput } from "../util/HandleOtpInput";
import FormST1 from "../components/login/form_st1";
import FormST2 from "../components/login/form_st2";
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
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-xl font-bold cursor-pointer"
        >
          ×
        </button>

        {/* Step 1: Phone Number Input */}
        {currentStep === 1 && (
          <FormST1
            handlePhoneNumberSubmit={handlePhoneNumberSubmit}
            phoneNumber={handleChange}
            handleChange={handleChange}
          />
        )}

        {/* Step 2: OTP Verification */}
        {currentStep === 2 && (
          <FormST2
            otp={otp}
            phoneNumber={phoneNumber}
            handleOtpSubmit={handleOtpSubmit}
            handleBackSpaceAndEnterKEY={handleBackSpaceAndEnterKEY}
            handleChange={handleChange}
            otpBoxRef={otpBoxRef}
          />
        )}
      </div>
    </div>
  );
}
