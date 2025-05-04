import React from "react";
import OtpBox from "../OtpBox";
export default function FormST2({
  otp,
  phoneNumber,
  handleOtpSubmit,
  handleBackSpaceAndEnterKEY,
  handleChange,
  otpBoxRef,
}) {
  return (
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
  );
}
