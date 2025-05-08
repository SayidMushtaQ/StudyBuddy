import React from "react";
import { Upload } from "lucide-react";
export default function Header({ setUploadModalOpen }) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-3xl font-bold text-blue-800 mb-3">
          Teaching Materials
        </h2>
        <p className="text-gray-600">
          Upload and manage notes, worksheets, and resources for your students
          with department-specific access control
        </p>
      </div>
      <button
        onClick={() => setUploadModalOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition shadow-md hover:shadow-lg flex items-center"
      >
        <Upload size={20} className="mr-2" />
        Upload New
      </button>
    </div>
  );
}
