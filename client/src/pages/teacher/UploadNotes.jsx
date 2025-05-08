import { useState } from "react";
import { FileText, File, Video, Image } from "lucide-react";
import { classes, departments, fileTypes, subjects } from "../../data/constant";
import { materials } from "../../data/uploadedNotesDummy";
import Header from "../../components/dashboard/teacher/UploadNotes/Header";
import UploadCard from "../../components/dashboard/teacher/UploadNotes/UploadCard";
import FilesList from "../../components/dashboard/teacher/UploadNotes/FilesList";
import FilterAndSearch from "../../components/dashboard/teacher/UploadNotes/FilterAndSearch";
export default function UploadNotesTab() {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState("All Years");
  const [selectedSubject, setSelectedSubject] = useState("Mathematics");
  const [selectedDepartment, setSelectedDepartment] = useState("BCA");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fileIcons = {
    pdf: <FileText />,
    doc: <File />,
    ppt: <File />,
    xls: <File />,
    jpg: <Image />,
    mp4: <Video />,
  };

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
    const subjectFilter =
      selectedSubject === "All Subjects" ||
      material.subject === selectedSubject;

    // Filter by search query
    const searchFilter = material.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    // Filter by file type
    const typeFilter = filter === "all" || material.type === filter;

    return (
      classFilter &&
      departmentFilter &&
      subjectFilter &&
      searchFilter &&
      typeFilter
    );
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
          <Header setUploadModalOpen={setUploadModalOpen} />
        </div>

        {/* Filters & Search */}
        <FilterAndSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedDepartment={selectedDepartment}
          setSelectedDepartment={setSelectedDepartment}
          departments={departments}
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
          classes={classes}
          filter={filter}
          setFilter={setFilter}
        />

        {/* Files List */}
        <FilesList
          filteredMaterials={filteredMaterials}
          setUploadModalOpen={setUploadModalOpen}
          currentItems={currentItems}
          fileIcons={fileIcons}
          fileTypes={fileTypes}
          indexOfFirstItem={indexOfFirstItem}
          indexOfLastItem={indexOfLastItem}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>

      {/* Upload Modal */}
      {uploadModalOpen && (
        <UploadCard
          setUploadModalOpen={setUploadModalOpen}
          setSelectedSubject={setSelectedSubject}
          selectedSubject={selectedSubject}
          subjects={subjects}
        />
      )}
    </div>
  );
}
