import React, { useState, useRef } from "react";
import FormST1 from "../components/auth/signup/form_st1";
import FormST2 from "../components/auth/signup/form_st2";
import FormST3 from "../components/auth/signup/form_st3";
import FormST4 from "../components/auth/signup/form_st4";
import FormST5 from "../components/auth/signup/form_st5";
import { handleBackSpaceAndEnterKEY } from "../util/HandleBackSpaceKey";
import { HandleOtpInput } from "../util/HandleOtpInput";
import axios from "axios";

export default function Signup({ onClose }) {
  const [step, setStep] = useState(5);
  const otpBoxRef = useRef([]);
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [form, setForm] = useState({
    name: "",
    country: "",
    state: "",
    district: "",
    address: "",
    phone: "",
    role: "STUDENT",
    collegeName: "",
    department: "",
    year: "",
    collegeId: "",
    userImage: null,
  });

  const handleChange = (e, index) => {
    if (e.target.name === "otp") {
      HandleOtpInput(e, otp, index, setOtp, otpBoxRef);
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < 5) setStep(step + 1);
    else {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/sign-up`,
        {
          name: form.name,
          country: form.country,
          state: form.state,
          district: form.district,
          address: form.address,
          phone: form.phone,
          role: form.role,
          collegeName: form.collegeName,
          department: form.department,
          year: form.year,
          collegeId: form.collegeId,
          userImage: form.userImage,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
       console.log("Success:", res.data);
      console.log("Final form data:", form);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
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
          <FormST2
            form={form}
            handleSubmit={handleSubmit}
            setForm={setForm}
            handleBack={handleBack}
          />
        )}

        {step === 3 && (
          <FormST3
            form={form}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleBack={handleBack}
          />
        )}

        {step === 4 && (
          <FormST4
            otp={otp}
            handleSubmit={handleSubmit}
            handleBackSpaceAndEnterKEY={handleBackSpaceAndEnterKEY}
            handleChange={handleChange}
            otpBoxRef={otpBoxRef}
            handleBack={handleBack}
          />
        )}

        {step === 5 && (
          <FormST5
            handleSubmit={handleSubmit}
            handleBack={handleBack}
            setForm={setForm} // Pass setForm function to FormST5
          />
        )}
      </div>
    </div>
  );
}
