import { asyncHandler } from "../../../util/asyncHandler.util.js";
import { apiResponse } from "../../../util/apiResponse.utils.js";
import { Material } from "../../../modules/uploadMaterial.model.js";

export const getMaterialBySub = asyncHandler(async (req, res) => {
  const { subject } = req.params;
  const materials = await Material.find({ subject });

  res
    .status(200)
    .json(
      new apiResponse(
        200,
        { materials, count: materials.length },
        "Sub Material get successfully!!"
      )
    );
});
