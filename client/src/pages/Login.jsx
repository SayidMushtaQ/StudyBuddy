import React, { useState, useRef } from "react";
import { handleBackSpaceAndEnterKEY } from "../util/HandleBackSpaceKey";
import { HandleOtpInput } from "../util/HandleOtpInput";
import FormST1 from "../components/auth/login/form_st1";
import FormST2 from "../components/auth/login/form_st2";
import axios from "axios";
export default function Login({ onClose }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [currentStep, setCurrentStep] = useState(1);
  const otpBoxRef = useRef([]);

  const handleChange = (e, index) => {
    console.log(e.target.value);
    if (e.target.name === "otp") {
      HandleOtpInput(e, otp, index, setOtp, otpBoxRef);
    } else {
      setPhoneNumber(e.target.value);
    }
  };

  const handlePhoneNumberSubmit = async (e) => {
    e.preventDefault();
    console.log(phoneNumber);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        { phone: `+91${phoneNumber}` },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", res);
      localStorage.setItem("userId", res.data.data.userID);
      setCurrentStep(2);
    } catch (error) {
      console.error(error.message);
      return;
    }
  };
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/auth/verify-otp`,
      {
        userId,
        otp: otp.join(""),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log("User verified:", res);
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
            phoneNumber={phoneNumber}
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
