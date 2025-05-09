import { asyncHandler } from "../../../util/asyncHandler.util.js";
import { apiResponse } from "../../../util/apiResponse.utils.js";
import { ApiError } from "../../../util/apiError.utils.js";
import { Material } from "../../../modules/uploadMaterial.model.js";
import { cloudinary } from "../../../config/cloudinary.config.js";

export const uploadMaterial = asyncHandler(async (req, res) => {
  if (!req.files || !req.files.file) {
    throw new ApiError(400, "No file uploaded");
  }
  const file = req.files.file;

  if (file.mimetype !== "application/pdf") {
    throw new ApiError(400, "Only PDF files are allowed");
  }
  const result = await cloudinary.uploader.upload(file.tempFilePath, {
    folder: "teaching_materials",
    resource_type: "raw"
  });
  const material = await Material.create({
    title: req.body.title,
    description: req.body.description || "",
    subject: req.body.subject,
    classYear: req.body.classYear,
    departments: JSON.parse(req.body.departments),
    fileUrl: result.secure_url,
    publicId: result.public_id,
    // uploadedBy: req.user.id
  });
  res
    .status(201)
    .json(
      new apiResponse(
        201,
        {material},
        "Material uploaded successfully!!"
      )
    );
});
