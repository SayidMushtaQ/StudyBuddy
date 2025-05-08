import { asyncHandler } from "../../util/asyncHandler.util.js";
import { apiResponse } from "../../util/apiResponse.utils.js";
import { Note } from "../../modules/notes.model.js";
export const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    throw new ApiError(404, "Note not found");
  }
  await note.deleteOne();
  res
    .status(200)
    .json(new apiResponse(200, { noteID:note._id }, "Note deleted successfully!!"));
});
