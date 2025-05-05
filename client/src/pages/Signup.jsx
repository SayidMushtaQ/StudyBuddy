import React, { useState, useRef } from "react";
import FormST1 from "../components/auth/signup/form_st1";
import FormST2 from "../components/auth/signup/form_st2";
import FormST3 from "../components/auth/signup/form_st3";
import {handleBackSpaceAndEnterKEY} from '../util/HandleBackSpaceKey'
import {HandleOtpInput} from '../util/HandleOtpInput'
export default function Signup({ onClose }) {
  const [step, setStep] = useState(1);
  const otpBoxRef = useRef([]);
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [form, setForm] = useState({
    name: "",
    country: "",
    state: "",
    district: "",
    college: "",
    address: "",
    phone: "",
    role: "student",
  });

  const handleChange = (e, index) => {
    if (e.target.name === "otp") {
      HandleOtpInput(e, otp, index, setOtp, otpBoxRef);
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
    else console.log("Final Submission", form, otp);
  };

  return (
    <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white bg-opacity-80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-xl font-bold cursor-pointer"
        >
          ×
        </button>

        {step === 1 && (
          <FormST1
            form={form}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
          />
        )}

        {step === 2 && (
          <FormST2 form={form} handleSubmit={handleSubmit} setForm={setForm} />
        )}
        {step === 3 && (
          <FormST3
            otp={otp}
            handleSubmit={handleSubmit}
            handleBackSpaceAndEnterKEY={handleBackSpaceAndEnterKEY}
            handleChange={handleChange}
            otpBoxRef={otpBoxRef}
          />
        )}
      </div>
    </div>
  );
}
