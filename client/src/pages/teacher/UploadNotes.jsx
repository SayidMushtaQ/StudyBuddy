import { useState } from "react";
import {
  Upload,
  FileText,
  File,
  Video,
  Image,
  Edit,
  Trash2,
  Search,
  X,
  Eye,
  Shield,
} from "lucide-react";

export default function UploadNotesTab() {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState("All Years");
  const [selectedSubject, setSelectedSubject] = useState("Mathematics");
  const [selectedDepartment, setSelectedDepartment] = useState("BCA");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const classes = [
    "All Years",
    "First Year",
    "Second Year",
    "Third Year",
    "Final Year",
  ];
  
  const departments = [
    "All Departments",
    "BCA",
    "MCA",
    "BSc CS",
    "BSc IT",
    "MSc IT",
  ];
  
  const subjects = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Programming",
    "Database Systems",
    "Computer Networks",
    "Web Development",
  ];

  const fileTypes = {
    pdf: "PDF Document",
    doc: "Word Document",
    ppt: "Presentation",
    xls: "Spreadsheet",
    jpg: "Image",
    mp4: "Video",
  };

  const fileIcons = {
    pdf: <FileText />,
    doc: <File />,
    ppt: <File />,
    xls: <File />,
    jpg: <Image />,
    mp4: <Video />,
  };

  const materials = [
    {
      id: 1,
      title: "Algebra Fundamentals Notes",
      type: "pdf",
      size: "4.2 MB",
      uploadedOn: "May 5, 2025",
      subject: "Mathematics",
      classes: ["First Year"],
      departments: ["BCA", "BSc IT"],
      downloads: 45,
      accessLevel: "restricted",
    },
    {
      id: 2,
      title: "Calculus Chapter 5 Notes",
      type: "pdf",
      size: "2.8 MB",
      uploadedOn: "May 5, 2025",
      subject: "Mathematics",
      classes: ["Second Year"],
      departments: ["BCA", "MCA"],
      downloads: 18,
      accessLevel: "restricted",
    },
    {
      id: 3,
      title: "Geometry Revision Worksheet",
      type: "doc",
      size: "1.5 MB",
      uploadedOn: "May 3, 2025",
      subject: "Mathematics",
      classes: ["First Year"],
      departments: ["All Departments"],
      downloads: 32,
      accessLevel: "public",
    },
    {
      id: 4,
      title: "Introduction to Programming",
      type: "pdf",
      size: "3.7 MB",
      uploadedOn: "April 28, 2025",
      subject: "Programming",
      classes: ["First Year"],
      departments: ["BCA"],
      downloads: 67,
      accessLevel: "restricted",
    },
    {
      id: 5,
      title: "Database Design Principles",
      type: "ppt",
      size: "5.7 MB",
      uploadedOn: "April 25, 2025",
      subject: "Database Systems",
      classes: ["Second Year"],
      departments: ["BCA", "BSc CS"],
      downloads: 29,
      accessLevel: "restricted",
    },
    {
      id: 6,
      title: "Web Development Basics",
      type: "pdf",
      size: "3.1 MB",
      uploadedOn: "April 22, 2025",
      subject: "Web Development",
      classes: ["First Year"],
      departments: ["BCA"],
      downloads: 41,
      accessLevel: "restricted",
    },
    {
      id: 7,
      title: "Networking Fundamentals",
      type: "doc",
      size: "2.3 MB",
      uploadedOn: "April 18, 2025",
      subject: "Computer Networks",
      classes: ["Second Year"],
      departments: ["BCA", "BSc IT"],
      downloads: 23,
      accessLevel: "restricted",
    },
    {
      id: 8,
      title: "Object-Oriented Programming",
      type: "ppt",
      size: "6.8 MB",
      uploadedOn: "April 15, 2025",
      subject: "Programming",
      classes: ["First Year"],
      departments: ["BCA", "MCA"],
      downloads: 36,
      accessLevel: "restricted",
    },
    {
      id: 9,
      title: "Data Structures Reference Guide",
      type: "pdf",
      size: "4.7 MB",
      uploadedOn: "April 10, 2025",
      subject: "Programming",
      classes: ["Second Year"],
      departments: ["BCA"],
      downloads: 52,
      accessLevel: "restricted",
    },
    {
      id: 10,
      title: "SQL Cheat Sheet",
      type: "pdf",
      size: "2.5 MB",
      uploadedOn: "April 5, 2025",
      subject: "Database Systems",
      classes: ["First Year"],
      departments: ["BCA", "BSc CS", "BSc IT"],
      downloads: 48,
      accessLevel: "restricted",
    },
  ];

  const filteredMaterials = materials.filter((material) => {
    // Filter by class
    const classFilter =
      selectedClass === "All Years" || material.classes.includes(selectedClass);

    // Filter by department
    const departmentFilter =
      selectedDepartment === "All Departments" || 
      material.departments.includes(selectedDepartment) || 
      material.departments.includes("All Departments");

    // Filter by subject
    const subjectFilter = selectedSubject === "All Subjects" || material.subject === selectedSubject;

    // Filter by search query
    const searchFilter = material.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    // Filter by file type
    const typeFilter = filter === "all" || material.type === filter;

    return classFilter && departmentFilter && subjectFilter && searchFilter && typeFilter;
  });

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMaterials.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredMaterials.length / itemsPerPage);

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <div className="container mx-auto p-6 mt-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-blue-800 mb-3">
                Teaching Materials
              </h2>
              <p className="text-gray-600">
                Upload and manage notes, worksheets, and resources for your
                students with department-specific access control
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
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Search */}
            <div className="md:col-span-4">
              <div className="relative">
                <Search
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search materials..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Department Filter */}
            <div className="md:col-span-3">
              <select
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Class Filter Dropdown */}
            <div className="md:col-span-3">
              <select
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                {classes.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            </div>

            {/* File Type Filter */}
            <div className="md:col-span-2">
              <select
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="pdf">PDF</option>
                <option value="doc">Word</option>
                <option value="ppt">PPT</option>
                <option value="xls">Excel</option>
                <option value="jpg">Images</option>
                <option value="mp4">Videos</option>
              </select>
            </div>
          </div>
        </div>

        {/* Files List */}
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
                              {fileTypes[material.type]} • {material.size} • {material.subject}
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
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
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
      </div>

      {/* Upload Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-blue-800">
                Upload Teaching Material
              </h3>
              <button
                onClick={() => setUploadModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium">
                Material Title
              </label>
              <input
                type="text"
                placeholder="Enter a title for your material"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium">
                Description (Optional)
              </label>
              <textarea
                placeholder="Add a brief description of the material"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-24"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Subject
                </label>
                <select
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
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
                <label className="block text-gray-700 mb-2 font-medium">
                  Share with Class
                </label>
                <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white">
                  <option>All Years</option>
                  <option>First Year</option>
                  <option>Second Year</option>
                  <option>Third Year</option>
                  <option>Final Year</option>
                </select>
              </div>
            </div>

            {/* Department Access Control */}
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium">
                Department Access
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="access-bca" className="h-4 w-4" />
                  <label htmlFor="access-bca">BCA</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="access-mca" className="h-4 w-4" />
                  <label htmlFor="access-mca">MCA</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="access-bsc-cs" className="h-4 w-4" />
                  <label htmlFor="access-bsc-cs">BSc CS</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="access-bsc-it" className="h-4 w-4" />
                  <label htmlFor="access-bsc-it">BSc IT</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="access-msc-it" className="h-4 w-4" />
                  <label htmlFor="access-msc-it">MSc IT</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="access-all" className="h-4 w-4" />
                  <label htmlFor="access-all">All Departments (Public)</label>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-gray-700 mb-2 font-medium">
                Upload File
              </label>
              <div className="border-2 border-dashed border-blue-200 rounded-xl p-8 text-center bg-blue-50">
                <Upload className="mx-auto text-blue-500 mb-4" size={36} />
                <h4 className="text-lg font-medium text-blue-800 mb-2">
                  Drag and drop your file here
                </h4>
                <p className="text-gray-500 mb-4">
                  Supported formats: PDF, DOC, PPT, XLS, JPG, MP4
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition">
                  Browse Files
                </button>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setUploadModalOpen(false)}
                className="px-6 py-3 rounded-xl text-blue-700 font-medium hover:bg-blue-50 transition"
              >
                Cancel
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition shadow-md hover:shadow-lg">
                Upload Material
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}