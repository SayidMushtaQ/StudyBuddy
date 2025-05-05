import { useState, useEffect } from "react";
import { dummyNotesCards } from "../../../data/notesDummy";
import ClassNotesSearch from "../../../components/dashboard/student/classNotes/SearchBox";
import ClassNotes from "../../../components/dashboard/student/classNotes/Notes";
import Pagination from "../../../components/dashboard/student/classNotes/Pagination";
export default function ClassNotesApp() {
  // Sample class notes data
  const [notes] = useState(dummyNotesCards);

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    subjects: [],
    teachers: [],
  });
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [filtersApplied, setFiltersApplied] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [notesPerPage] = useState(3);

  // Extract unique values for filter options
  const subjects = [...new Set(notes.map((note) => note.subject))];
  const teachers = [...new Set(notes.map((note) => note.teacher))];

  // Filter notes based on search term and active filters
  const filteredNotes = notes.filter((note) => {
    // Search filter
    const matchesSearch =
      searchTerm === "" ||
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.subject.toLowerCase().includes(searchTerm.toLowerCase());

    // Subject filter
    const matchesSubject =
      activeFilters.subjects.length === 0 ||
      activeFilters.subjects.includes(note.subject);

    // Teacher filter
    const matchesTeacher =
      activeFilters.teachers.length === 0 ||
      activeFilters.teachers.includes(note.teacher);

    return matchesSearch && matchesSubject && matchesTeacher;
  });

  // Calculate pagination
  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = filteredNotes.slice(indexOfFirstNote, indexOfLastNote);
  const totalPages = Math.ceil(filteredNotes.length / notesPerPage);

  // Handle page changes
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeFilters]);

  // Check if any filters are applied
  useEffect(() => {
    const hasActiveFilters = Object.values(activeFilters).some(
      (arr) => arr.length > 0
    );
    setFiltersApplied(hasActiveFilters);
  }, [activeFilters]);

  // Toggle filter value
  const toggleFilter = (category, value) => {
    setActiveFilters((prev) => {
      const newFilters = { ...prev };
      if (newFilters[category].includes(value)) {
        newFilters[category] = newFilters[category].filter(
          (item) => item !== value
        );
      } else {
        newFilters[category] = [...newFilters[category], value];
      }
      return newFilters;
    });
  };

  // Clear all filters
  const clearAllFilters = () => {
    setActiveFilters({
      subjects: [],
      teachers: [],
    });
    setSearchTerm("");
  };

  // Handle download
  const handleDownload = (noteId) => {
    alert(`Downloading note with ID: ${noteId}`);
  };

  // Get file icon based on file type
  const getFileIcon = (fileType) => {
    switch (fileType.toLowerCase()) {
      case "pdf":
        return "📄";
      case "docx":
        return "📝";
      case "pptx":
        return "📊";
      default:
        return "📁";
    }
  };

  // Generate array of page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total is less than max
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);

      // Calculate start and end of page numbers to show
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if at the beginning
      if (currentPage <= 2) {
        endPage = Math.min(totalPages - 1, 4);
      }

      // Adjust if at the end
      if (currentPage >= totalPages - 1) {
        startPage = Math.max(2, totalPages - 3);
      }

      // Add ellipsis if needed at the beginning
      if (startPage > 2) {
        pageNumbers.push("...");
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // Add ellipsis if needed at the end
      if (endPage < totalPages - 1) {
        pageNumbers.push("...");
      }

      // Always show last page
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div className="h-full">
      <main className="container mx-auto py-8 px-4">
        <ClassNotesSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filtersApplied={filtersApplied}
          setShowFilterMenu={setShowFilterMenu}
          showFilterMenu={showFilterMenu}
          clearAllFilters={clearAllFilters}
          activeFilters={activeFilters}
          toggleFilter={toggleFilter}
          teachers={teachers}
          subjects={subjects}
        />
        {/* Notes grid */}
        <ClassNotes
          currentNotes={currentNotes}
          getFileIcon={getFileIcon}
          handleDownload={handleDownload}
          clearAllFilters={clearAllFilters}
        />

        {/* Pagination */}
        <Pagination
          filteredNotes={filteredNotes}
          goToPreviousPage={goToPreviousPage}
          currentPage={currentPage}
          getPageNumbers={getPageNumbers}
          goToPage={goToPage}
          goToNextPage={goToNextPage}
          totalPages={totalPages}
        />
        {/* Results counter */}
        {filteredNotes.length > 0 && (
          <div className="mt-4 text-center text-blue-700">
            Showing {indexOfFirstNote + 1}-
            {Math.min(indexOfLastNote, filteredNotes.length)} of{" "}
            {filteredNotes.length} results
          </div>
        )}
      </main>
    </div>
  );
}
