import React from "react";
import { Upload, FileText, Edit, Trash2, Eye, Shield } from "lucide-react";
export default function FilterList({
  filteredMaterials,
  setUploadModalOpen,
  currentItems,
  fileIcons,
  fileTypes,
  indexOfFirstItem,
  indexOfLastItem,
  setCurrentPage,
  currentPage,
  totalPages,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">
      <h3 className="text-xl font-semibold text-blue-800 mb-6">
        Your Teaching Materials
      </h3>

      {filteredMaterials.length === 0 ? (
        <div className="text-center py-16">
          <FileText className="mx-auto text-gray-300 mb-4" size={48} />
          <h4 className="text-xl font-medium text-gray-600 mb-2">
            No materials found
          </h4>
          <p className="text-gray-500 mb-6">
            Upload your first teaching material or try a different search
          </p>
          <button
            onClick={() => setUploadModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-xl transition shadow-md hover:shadow-lg inline-flex items-center"
          >
            <Upload size={18} className="mr-2" />
            Upload New Material
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-2 font-semibold text-gray-600">
                  Material
                </th>
                <th className="text-left py-4 px-2 font-semibold text-gray-600">
                  Access
                </th>
                <th className="text-left py-4 px-2 font-semibold text-gray-600">
                  Uploaded
                </th>
                <th className="text-left py-4 px-2 font-semibold text-gray-600">
                  Downloads
                </th>
                <th className="text-right py-4 px-2 font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((material) => (
                <tr
                  key={material.id}
                  className="border-b border-gray-100 hover:bg-blue-50 transition"
                >
                  <td className="py-4 px-2">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-lg mr-3">
                        <span className="text-blue-700">
                          {fileIcons[material.type]}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-800">
                          {material.title}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {fileTypes[material.type]} • {material.size} •{" "}
                          {material.subject}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-2">
                    <div>
                      <div className="flex flex-wrap gap-1 mb-1">
                        {material.classes.map((cls) => (
                          <span
                            key={cls}
                            className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-lg"
                          >
                            {cls}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {material.departments.includes("All Departments") ? (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-lg flex items-center">
                            <Shield size={12} className="mr-1" /> Public
                          </span>
                        ) : (
                          material.departments.map((dept) => (
                            <span
                              key={dept}
                              className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-lg flex items-center"
                            >
                              <Shield size={12} className="mr-1" /> {dept}
                            </span>
                          ))
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-2 text-gray-600">
                    {material.uploadedOn}
                  </td>
                  <td className="py-4 px-2 text-gray-600">
                    {material.downloads}
                  </td>
                  <td className="py-4 px-2">
                    <div className="flex justify-end space-x-2">
                      <button className="p-2 hover:bg-blue-100 rounded-lg transition">
                        <Eye size={18} className="text-blue-600" />
                      </button>
                      <button className="p-2 hover:bg-blue-100 rounded-lg transition">
                        <Edit size={18} className="text-blue-600" />
                      </button>
                      <button className="p-2 hover:bg-red-100 rounded-lg transition">
                        <Trash2 size={18} className="text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <p className="text-gray-600">
              Showing {indexOfFirstItem + 1}-
              {Math.min(indexOfLastItem, filteredMaterials.length)} of{" "}
              {filteredMaterials.length} materials
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-lg border ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-blue-700 hover:bg-blue-50"
                }`}
              >
                Previous
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white"
                      : "bg-white text-blue-700 hover:bg-blue-50 border"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-lg border ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-blue-700 hover:bg-blue-50"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
