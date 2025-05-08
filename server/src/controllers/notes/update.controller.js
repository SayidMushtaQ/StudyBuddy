import { asyncHandler } from "../../util/asyncHandler.util.js";
import { ApiError } from "../../util/apiError.utils.js";
import { apiResponse } from "../../util/apiResponse.utils.js";
import { Note } from "../../modules/notes.model.js";
export const update = asyncHandler(async (req, res) => {
  const { field, value } = req.body;
  const note = await Note.findById(req.params.id);
  if (!note) {
    throw new ApiError(404, "Note not found");
  }
  const updateData = {
    [field]: value
  };

  if (field !== "color") {
    updateData.date = new Date().toISOString();
  }
  const updatedNote = await Note.findByIdAndUpdate(req.params.id, updateData, {
    new: true
  });
  res
    .status(201)
    .json(new apiResponse(201, { updatedNote }, "Note updated successfully!!"));
});
