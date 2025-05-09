import { asyncHandler } from "../../../util/asyncHandler.util.js";
import { apiResponse } from "../../../util/apiResponse.utils.js";
import { ApiError } from "../../../util/apiError.utils.js";
import { Material } from "../../../modules/uploadMaterial.model.js";
import { cloudinary } from "../../../config/cloudinary.config.js";
export const deleteMaterial = asyncHandler(async (req, res) => {
  const material = await Material.findById(req.params.id);
  if (!material) {
    throw new ApiError(404, "Material not found");
  }
  await cloudinary.uploader.destroy(material.publicId);

  await material.deleteOne();

  res
    .status(200)
    .json(new apiResponse(200, {}, "Material deleted successfully!!"));
});
