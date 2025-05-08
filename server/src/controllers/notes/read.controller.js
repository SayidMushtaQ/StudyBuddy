import { asyncHandler } from "../../util/asyncHandler.util.js";
import { apiResponse } from "../../util/apiResponse.utils.js";
import { Note } from "../../modules/notes.model.js";
export const read = asyncHandler(async (req, res) => {
    const notes = await Note.find().sort({ date: -1 })
    res
    .status(200)
    .json(new apiResponse(200, { notes }, "All notes fetched successfully!!"));
})