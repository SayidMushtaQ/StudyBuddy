import React from "react";
import OtpBox from '../OtpBox';

export default function FormST5({
  otp,
  handleSubmit,
  handleBackSpaceAndEnterKEY,
  handleChange,
  otpBoxRef,
  handleBack
}) {
  return (
    <>
      <h2 className="text-3xl font-bold text-blue-800 text-center mb-6">
        Verify OTP
      </h2>
      <p className="text-center mb-6">A 4-digit OTP has been sent to your phone</p>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-4 gap-4">
          <OtpBox
            otp={otp}
            handleBackSpaceAndEnterKEY={handleBackSpaceAndEnterKEY}
            handleChange={handleChange}
            otpBoxRef={otpBoxRef}
          />
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleBack}
            className="w-1/3 bg-gray-200 text-gray-800 py-3 rounded-xl shadow-md hover:bg-gray-300"
          >
            Back
          </button>
          <button
            type="submit"
            className="w-2/3 bg-blue-600 text-white py-3 rounded-xl shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 cursor-pointer"
          >
            Verify & Continue
          </button>
        </div>
      </form>
    </>
  );
}