import React from "react";

export default function OtpBox({
  otp,
  handleBackSpaceAndEnterKEY,
  handleChange,
  otpBoxRef,
}) {
  return otp.map((digit, index) => (
    <input
      key={index}
      type="text"
      name="otp"
      value={digit}
      maxLength="1"
      className="w-full h-12 text-center text-2xl border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      onKeyUp={(e) => handleBackSpaceAndEnterKEY(e, index,otpBoxRef)}
      onChange={(e) => handleChange(e, index)}
      ref={(ref) => (otpBoxRef.current[index] = ref)}
      required
    />
  ));
}
