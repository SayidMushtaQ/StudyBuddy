import twilio from "twilio";

const client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000);
}
export const sendOTP = (phone, otp) => {
  console.log(phone);
  client.messages
    .create({
      body: `Your OTP is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER, // Twilio phone number
      to: phone
    })
    .then(message => console.log("OTP sent:", message.sid))
    .catch(error => console.error("Error sending OTP SMS:", error));
};
