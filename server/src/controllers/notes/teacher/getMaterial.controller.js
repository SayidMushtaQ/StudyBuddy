import { asyncHandler } from "../../../util/asyncHandler.util.js";
import { apiResponse } from "../../../util/apiResponse.utils.js";
import { Material } from "../../../modules/uploadMaterial.model.js";

export const getMaterial = asyncHandler(async (req, res) => {
  const materials = await Material.find();

  res
    .status(200)
    .json(
      new apiResponse(
        200,
        { materials, count: materials.length },
        "Material get successfully!!"
      )
    );
});
