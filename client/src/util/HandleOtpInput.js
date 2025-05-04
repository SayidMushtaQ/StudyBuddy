export const HandleOtpInput = (e,otp,index,setOtp,otpBoxRef) => {
  const value = e.target.value;
  const newOtps = [...otp];
  newOtps[index] = value;
  setOtp(newOtps);

  if (value && index < 3) {
    otpBoxRef.current[index + 1].focus();
  }

  if (e.key === "Backspace" && !value && index > 0) {
    otpBoxRef.current[index - 1].focus();
  }
};
