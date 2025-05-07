import { asyncHandler } from "../../util/asyncHandler.util.js";
import { apiResponse } from "../../util/apiResponse.utils.js";
import { ApiError } from "../../util/apiError.utils.js";
import { User } from '../../modules/userAuth.model.js';
import {generateOTP} from '../../util/generateAndSendOTP.util.js'

const register = asyncHandler(async (req, res) => {
  const {
    name,
    country,
    state,
    district,
    address,
    phone,
    role = "STUDENT",
    collegeName,
    department,
    year,
    collegeId
  } = req.body;

  const existingUser = await User.findOne({ phone });
  if (existingUser) {
    throw new ApiError(400, "User with this phone number already exists");
  }

  const otp = generateOTP();

  const newUser = new User({
    name,
    country,
    state,
    district,
    address,
    phone,
    role: role || "STUDENT", // Default to student if not specified
    collegeName,
    department,
    year,
    collegeId,
    otp: { otp }
  });

  await newUser.save();

  // await sendOTP(phone, otp);
  console.log(otp)
  res
    .status(201)
    .json(
      new apiResponse(
        201,
        { Ok: "Ok" },
        "User registered successfully. Please verify OTP"
      )
    );
});

export { register };
