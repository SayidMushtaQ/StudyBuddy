import { asyncHandler } from "../../util/asyncHandler.util.js";
import { apiResponse } from "../../util/apiResponse.utils.js";
import { ApiError } from "../../util/apiError.utils.js";
import { User } from "../../modules/userAuth.model.js";
import { generateOTP, sendOTP } from "../../util/generateAndSendOTP.util.js";
import {cloudinary} from "../../config/cloudinary.config.js"; 

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
    collegeId,
    userImage
  } = req.body;

  // if (
  //   !name ||
  //   !country ||
  //   !state ||
  //   !district ||
  //   !address ||
  //   !phone ||
  //   !collegeName ||
  //   !department ||
  //   !year ||
  //   !collegeId ||
  //   !userImage
  // ) {
  //   throw new ApiError(400, "All fields are required");
  // }

  const existingUser = await User.findOne({ phone });
  if (existingUser) {
    throw new ApiError(400, "User with this phone number already exists");
  }

  const otp = generateOTP();

  const cloudinaryResponse = await cloudinary.uploader.upload(userImage, {
    folder: "user_images",
    resource_type: "image"
  });

  if (!cloudinaryResponse || !cloudinaryResponse.secure_url) {
    throw new ApiError(500, "Error uploading image to cloudinary");
  }

  const newUser = new User({
    name,
    country,
    state,
    district,
    address,
    phone,
    role: role || "STUDENT",
    collegeName,
    department,
    year,
    collegeId,
    userImageURL: cloudinaryResponse.secure_url,
    userImagePublicId: cloudinaryResponse.public_id,
    otp: { otp }
  });

  await newUser.save();

  sendOTP(phone, otp);

  console.log("OTP generated for verification:", otp);

  res
    .status(201)
    .json(
      new apiResponse(
        201,
        { userID: newUser._id },
        "User registered successfully. Please verify OTP"
      )
    );
});

export { register };
