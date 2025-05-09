import { asyncHandler } from "../../../util/asyncHandler.util.js";
import { apiResponse } from "../../../util/apiResponse.utils.js";
import { Note } from "../../../modules/notes.model.js";

export const create = asyncHandler(async (req, res) => {
  const { title,color, content  } = req.body;
  if (!title) {
    throw new ApiError(400, "Note title is required");
  }
  const newNote = new Note({
    title,
    content,
    color
  });

  const savedNote = await newNote.save();

  res
    .status(201)
    .json(new apiResponse(201, { savedNote }, "New Note Created Successfully"));
});
