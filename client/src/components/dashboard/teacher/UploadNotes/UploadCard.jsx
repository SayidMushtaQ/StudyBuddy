import React from "react";
import {Upload,X} from 'lucide-react'
export default function UploadCard({setUploadModalOpen,setSelectedSubject,selectedSubject,subjects}) {
  return (
    <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-4 w-full max-w-2xl border-t-3 border-blue-200">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-2xl font-bold text-blue-800">
            Upload Teaching Material
          </h3>
          <button
            onClick={() => setUploadModalOpen(false)}
            className="p-1 hover:bg-gray-100 rounded-full transition"
          >
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        <div className="mb-3">
          <label className="block text-gray-700 mb-1 font-medium text-sm">
            Material Title
          </label>
          <input
            type="text"
            placeholder="Enter a title for your material"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-3">
          <label className="block text-gray-700 mb-1 font-medium text-sm">
            Description (Optional)
          </label>
          <textarea
            placeholder="Add a brief description of the material"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-16"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-gray-700 mb-1 font-medium text-sm">
              Subject
            </label>
            <select
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium text-sm">
              Share with Class
            </label>
            <select className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white">
              <option>All Years</option>
              <option>First Year</option>
              <option>Second Year</option>
              <option>Third Year</option>
              <option>Final Year</option>
            </select>
          </div>
        </div>

        {/* Department Access Control */}
        <div className="mb-3">
          <label className="block text-gray-700 mb-1 font-medium text-sm">
            Department Access
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <div className="flex items-center space-x-1">
              <input type="checkbox" id="access-bca" className="h-3 w-3" />
              <label htmlFor="access-bca" className="text-sm">
                BCA
              </label>
            </div>
            <div className="flex items-center space-x-1">
              <input type="checkbox" id="access-mca" className="h-3 w-3" />
              <label htmlFor="access-mca" className="text-sm">
                MCA
              </label>
            </div>
            <div className="flex items-center space-x-1">
              <input type="checkbox" id="access-bsc-cs" className="h-3 w-3" />
              <label htmlFor="access-bsc-cs" className="text-sm">
                BSc CS
              </label>
            </div>
            <div className="flex items-center space-x-1">
              <input type="checkbox" id="access-bsc-it" className="h-3 w-3" />
              <label htmlFor="access-bsc-it" className="text-sm">
                BSc IT
              </label>
            </div>
            <div className="flex items-center space-x-1">
              <input type="checkbox" id="access-msc-it" className="h-3 w-3" />
              <label htmlFor="access-msc-it" className="text-sm">
                MSc IT
              </label>
            </div>
            <div className="flex items-center space-x-1">
              <input type="checkbox" id="access-all" className="h-3 w-3" />
              <label htmlFor="access-all" className="text-sm">
                All Departments
              </label>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1 font-medium text-sm">
            Upload File
          </label>
          <div className="border-2 border-dashed border-blue-200 rounded-lg p-4 text-center bg-blue-50">
            <Upload className="mx-auto text-blue-500 mb-2" size={24} />
            <h4 className="text-base font-medium text-blue-800 mb-1">
              Drag and drop your file here
            </h4>
            <p className="text-gray-500 mb-2 text-sm">
              Supported formats: PDF, DOC, PPT, XLS, JPG, MP4
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-1 px-4 rounded-lg transition text-sm">
              Browse Files
            </button>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setUploadModalOpen(false)}
            className="px-4 py-2 rounded-lg text-blue-700 font-medium hover:bg-blue-50 transition text-sm"
          >
            Cancel
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition shadow-sm hover:shadow-md text-sm">
            Upload Material
          </button>
        </div>
      </div>
    </div>
  );
}
