import { asyncHandler } from "../../util/asyncHandler.util.js";
import { apiResponse } from "../../util/apiResponse.utils.js";
import { ApiError } from "../../util/apiError.utils.js";
import { User } from "../../modules/userAuth.model.js";

export const verifyOTP = asyncHandler(async (req, res) => {
  const { userId, otp } = req.body;

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (!user.otp || user.otp.otp !== otp) {
    throw new ApiError(400, "Invalid OTP");
  }

  user.isVerified = true;
  user.otp = undefined;
  await user.save();

  res.status(200).json(
    new apiResponse(
      200,
      {
        user: {
          id: user._id,
          name: user.name,
          phone: user.phone,
          role: user.role
        }
      },
      "OTP verified successfully. Registration complete."
    )
  );
});
