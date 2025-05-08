import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
      trim: true,
      default: "New Note"
    },
    content: {
      type: String,
      default: ""
    },
    date: {
      type: Date,
      default: Date.now
    },
    color: {
      type: String,
      default: "#ffffff"
    }
  },
  {
    timestamps: true
  },
  { timestamps: true }
);

export const Note = mongoose.model("Note", noteSchema);
