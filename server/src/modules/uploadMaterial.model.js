import mongoose from "mongoose";
const materialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Material title is required"],
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
      enum: [
        "All Years",
        "First Year",
        "Second Year",
        "Third Year",
        "Final Year"
      ],
      default: "All Years"
    },
    departments: {
      type: [String],
      validate: {
        validator: function (v) {
          // Either contains valid departments or 'All Departments'
          const validDepartments = [
            "BCA",
            "MCA",
            "BBA",
            "All Departments"
          ];
          if (v.includes("All Departments")) {
            return v.length === 1; // If 'All Departments' is selected, no other should be selected
          }
          return v.every(dep => validDepartments.includes(dep));
        },
        message: "Invalid department selection"
      }
    },
    fileUrl: {
      type: String,
      required: [true, "File URL is required"]
    },
    fileName: {
      type: String,
      required: [true, "File name is required"]
    },
    fileSize: {
      type: Number,
      required: [true, "File size is required"]
    },
    fileType: {
      type: String,
      required: [true, "File type is required"]
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Uploader information is required"]
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
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
