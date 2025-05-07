import { asyncHandler } from "../../util/asyncHandler.util.js";
import { apiResponse } from "../../util/apiResponse.utils.js";
import { ApiError } from "../../util/apiError.utils.js";
import { User } from "../../modules/userAuth.model.js";
import { generateOTP } from "../../util/generateAndSendOTP.util.js";

export const resendOTP = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const otp = generateOTP();

  user.otp = { otp };
  await user.save();

  console.log(otp);

  //   await sendOTP(user.phone, otp);

  res.status(200).json(
    new apiResponse(
      200,
      {success:true},
      "OTP sent successfully"
    )
  );
});
