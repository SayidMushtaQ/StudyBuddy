import { asyncHandler } from "../../util/asyncHandler.util.js";
import { apiResponse } from "../../util/apiResponse.utils.js";
import { ApiError } from "../../util/apiError.utils.js";
import { User } from "../../modules/userAuth.model.js";
import { generateOTP, sendOTP } from "../../util/generateAndSendOTP.util.js";

export const login = asyncHandler(async (req, res) => {
  const { phone } = req.body;
  if (!phone) {
    throw new ApiError(400, "Phone number is required");
  }
  const user = await User.findOne({ phone });
  if (!user) {
    throw new ApiError(400, "User not found. Please register first");
  }

  if (!user.isVerified) {
    throw new ApiError(
      400,
      "Account not verified. Please complete registration first."
    );
  }
  const otp = generateOTP();

  user.otp = { otp };
  await user.save();

  console.log(otp)
  // sendOTP(phone, otp);

  res
    .status(200)
    .json(
      new apiResponse(200, { userID: user._id }, "Login OTP sent successfully")
    );
});
