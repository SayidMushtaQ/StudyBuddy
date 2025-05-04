export const handleBackSpaceAndEnterKEY = (e, index, otpBoxRef) => {
  if (e.key === "Backspace" && !e.target.value && index > 0) {
    otpBoxRef.current[index - 1].focus();
  }
};
