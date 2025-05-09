import { asyncHandler } from "../../../util/asyncHandler.util.js";
import { apiResponse } from "../../../util/apiResponse.utils.js";
import { ApiError } from "../../../util/apiError.utils.js";
import { Material } from "../../../modules/uploadMaterial.model.js";
import { cloudinary } from "../../../config/cloudinary.config.js";

export const uploadMaterial = asyncHandler(async (req, res) => {
  const { title,description, subject, classYear,departments } = req.body;

  if (!title || !subject || !classYear || !departments) {
    throw new ApiError(400, "Title, subject, class year and departments are required");
  }


  if (!req.files || !req.files.file) {
    throw new ApiError(400, "No file uploaded");
  }
  const file = req.files.file;

  if (file.mimetype !== "application/pdf") {
    throw new ApiError(400, "Only PDF files are allowed");
  }
  const result = await cloudinary.uploader.upload(file.tempFilePath, {
    folder: "teaching_materials",
    resource_type: "auto"
  });
  const material = await Material.create({
    title,
    description: description || "",
    subject,
    classYear,
    departments: JSON.parse(`"${departments}"`),
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
