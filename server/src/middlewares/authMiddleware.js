import { asyncHandler } from "../util/asyncHandler.util.js";
import { ApiError } from "../util/apiError.utils.js";
import { User } from "../modules/user.model.js";

export const authenticateUser = asyncHandler(async (req, res) => {
  let token;

  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }
  if (!token) {
    throw new ApiError(401, "You are not authorized to access this resource");
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decoded);
  const user = await User.findById(decoded.userId);

  if (!user) {
    throw new ApiError(401, "You are not authorized to access this resource");
  }
  req.user = {
    id: user._id,
    phoneNumber: user.phoneNumber,
    verified: user.verified,
    role: user.role
  };
  next();
});
