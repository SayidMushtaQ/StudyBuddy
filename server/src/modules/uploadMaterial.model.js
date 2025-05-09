import mongoose from "mongoose";
const materialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true
    },
    classYear: {
      type: String,
      required: [true, "Class year is required"]
    },
    departments: {
      type: [String],
      required: [true, "At least one department must be selected"]
    },
    fileUrl: {
      type: String,
      required: [true, "File URL is required"]
    },
    publicId: {
      type: String,
      required: [true, "Cloudinary public ID is required"]
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);
materialSchema.index({
  title: "text",
  description: "text",
  subject: "text"
});

export const Material = mongoose.model("Material", materialSchema);
