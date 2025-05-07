import twilio from "twilio";

const client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);


export function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000);
}

export const sendOTP = async (phone, otp) => {
  client.messages
    .create({
      body: `Your OTP is: ${otp}`,
      from: "+18777804236", // Twilio phone number
      to: phone
    })
    .then(message => console.log("OTP sent:", message.sid))
    .catch(error => console.error("Error sending OTP SMS:", error));

  return true;
};
