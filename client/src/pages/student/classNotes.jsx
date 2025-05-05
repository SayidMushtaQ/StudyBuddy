import { useState, useEffect } from 'react';
import { Search, Download, Filter, Book, GraduationCap, Calendar, Tag, ChevronDown, X } from 'lucide-react';

export default function ClassNotesApp() {
  // Sample class notes data
  const [notes] = useState([
    {
      id: 1,
      title: "Introduction to Physics",
      teacher: "Dr. Smith",
      subject: "Physics",
      date: "2025-05-01",
      description: "Fundamental concepts of classical mechanics including Newton's laws, energy conservation, and momentum.",
      tags: ["mechanics", "newton", "fundamentals"],
      fileType: "pdf",
      fileSize: "2.4 MB"
    },
    {
      id: 2,
      title: "Organic Chemistry: Alkenes and Alkynes",
      teacher: "Prof. Johnson",
      subject: "Chemistry",
      date: "2025-04-28",
      description: "Structure, nomenclature, and reactions of alkenes and alkynes, including addition reactions and stereochemistry.",
      tags: ["organic", "reactions", "hydrocarbons"],
      fileType: "pdf",
      fileSize: "3.8 MB"
    },
    {
      id: 3,
      title: "Shakespeare's Hamlet: Character Analysis",
      teacher: "Ms. Williams",
      subject: "Literature",
      date: "2025-04-25",
      description: "In-depth analysis of the main characters in Hamlet, focusing on motivations and psychological aspects.",
      tags: ["shakespeare", "characters", "tragedy"],
      fileType: "docx",
      fileSize: "1.7 MB"
    },
    {
      id: 4,
      title: "Calculus: Integration Techniques",
      teacher: "Dr. Chen",
      subject: "Mathematics",
      date: "2025-04-20",
      description: "Advanced techniques for integration, including substitution, parts, and trigonometric identities.",
      tags: ["calculus", "integration", "advanced"],
      fileType: "pdf",
      fileSize: "4.2 MB"
    },
    {
      id: 5,
      title: "World War II: Pacific Theater",
      teacher: "Mr. Davis",
      subject: "History",
      date: "2025-04-15",
      description: "Overview of major events and strategic decisions in the Pacific Theater during World War II.",
      tags: ["wwii", "pacific", "military"],
      fileType: "pptx",
      fileSize: "8.5 MB"
    },
    {
      id: 6,
      title: "Cell Structure and Function",
      teacher: "Dr. Patel",
      subject: "Biology",
      date: "2025-04-10",
      description: "Detailed exploration of eukaryotic cell structure, organelle functions, and cellular processes.",
      tags: ["cells", "organelles", "eukaryotes"],
      fileType: "pdf",
      fileSize: "5.1 MB"
    },
    {
      id: 7,
      title: "Python Programming: Data Structures",
      teacher: "Prof. Garcia",
      subject: "Computer Science",
      date: "2025-04-05",
      description: "Implementation and application of lists, dictionaries, sets, and tuples in Python programming.",
      tags: ["python", "data structures", "programming"],
      fileType: "ipynb",
      fileSize: "1.2 MB"
    },
    {
      id: 8,
      title: "Classical Conditioning",
      teacher: "Dr. Thompson",
      subject: "Psychology",
      date: "2025-04-01",
      description: "Principles of classical conditioning, including Pavlov's experiments and applications in behavioral therapy.",
      tags: ["conditioning", "behavior", "pavlov"],
      fileType: "pdf",
      fileSize: "2.9 MB"
    }
  ]);

  // Search, filter, and pagination states
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    subjects: [],
    teachers: [],
    tags: [],
    fileTypes: []
  });
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [notesPerPage, setNotesPerPage] = useState(6);

  // Extract unique values for filter options
  const subjects = [...new Set(notes.map(note => note.subject))];
  const teachers = [...new Set(notes.map(note => note.teacher))];
  const allTags = [...new Set(notes.flatMap(note => note.tags))];
  const fileTypes = [...new Set(notes.map(note => note.fileType))];

  // Filter notes based on search term and active filters
  const filteredNotes = notes.filter(note => {
    // Search filter
    const matchesSearch = 
      searchTerm === '' || 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Subject filter
    const matchesSubject = 
      activeFilters.subjects.length === 0 || 
      activeFilters.subjects.includes(note.subject);
    
    // Teacher filter
    const matchesTeacher = 
      activeFilters.teachers.length === 0 || 
      activeFilters.teachers.includes(note.teacher);
    
    // Tags filter
    const matchesTags = 
      activeFilters.tags.length === 0 || 
      note.tags.some(tag => activeFilters.tags.includes(tag));
    
    // File type filter
    const matchesFileType = 
      activeFilters.fileTypes.length === 0 || 
      activeFilters.fileTypes.includes(note.fileType);
    
    return matchesSearch && matchesSubject && matchesTeacher && matchesTags && matchesFileType;
  });
  
  // Pagination calculations
  const totalPages = Math.ceil(filteredNotes.length / notesPerPage);
  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = filteredNotes.slice(indexOfFirstNote, indexOfLastNote);
  
  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeFilters]);
  
  // Page change handler
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Generate page numbers array
  const getPageNumbers = () => {
    const pageNumbers = [];
    
    // Always show first page
    pageNumbers.push(1);
    
    // Current page neighborhood
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(currentPage + 1, totalPages - 1); i++) {
      pageNumbers.push(i);
    }
    
    // Always show last page for large sets
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }
    
    // Add ellipsis markers
    return pageNumbers.reduce((acc, page, index, array) => {
      acc.push(page);
      if (index < array.length - 1 && array[index + 1] - page > 1) {
        acc.push('...');
      }
      return acc;
    }, []);
  };

  // Toggle filter value
  const toggleFilter = (category, value) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev };
      if (newFilters[category].includes(value)) {
        newFilters[category] = newFilters[category].filter(item => item !== value);
      } else {
        newFilters[category] = [...newFilters[category], value];
      }
      return newFilters;
    });
  };

  // Check if any filters are applied
  useEffect(() => {
    const hasActiveFilters = Object.values(activeFilters).some(arr => arr.length > 0);
    setFiltersApplied(hasActiveFilters);
  }, [activeFilters]);

  // Clear all filters
  const clearAllFilters = () => {
    setActiveFilters({
      subjects: [],
      teachers: [],
      tags: [],
      fileTypes: []
    });
    setSearchTerm('');
  };

  // Handle download
  const handleDownload = (noteId) => {
    // In a real application, this would initiate a file download
    alert(`Downloading note with ID: ${noteId}`);
  };

  // Get file icon based on file type
  const getFileIcon = (fileType) => {
    switch (fileType.toLowerCase()) {
      case 'pdf':
        return "📄";
      case 'docx':
        return "📝";
      case 'pptx':
        return "📊";
      case 'ipynb':
        return "📓";
      default:
        return "📁";
    }
  };

  return (
    <div className="h-[80vh]">
      <main className="container mx-auto py-8 px-4">
        <div className="bg-white/90 rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-grow">
              <input
                type="text"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                placeholder="Search notes by title, description, teacher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-3.5 text-blue-400" size={20} />
              {searchTerm && (
                <button 
                  className="absolute right-3 top-3.5 text-purple-400 hover:text-purple-600"
                  onClick={() => setSearchTerm('')}
                >
                  <X size={20} />
                </button>
              )}
            </div>

            {/* Filter button */}
            <div className="relative">
              <button 
                className={`flex items-center justify-center px-6 py-3 rounded-xl transition shadow-md ${
                  filtersApplied 
                    ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
                onClick={() => setShowFilterMenu(!showFilterMenu)}
              >
                <Filter size={20} className="mr-2" />
                Filters {filtersApplied && <span className="ml-1">Applied</span>}
              </button>

              {/* Filter dropdown menu */}
              {showFilterMenu && (
                <div className="absolute right-0 mt-2 w-72 md:w-96 bg-white rounded-xl shadow-lg z-10 p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-blue-800">Filters</h3>
                    <button 
                      className="text-sm text-purple-600 hover:text-purple-800"
                      onClick={clearAllFilters}
                    >
                      Clear all
                    </button>
                  </div>
                  
                  {/* Subject filters */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-blue-700 mb-2">Subject</h4>
                    <div className="flex flex-wrap gap-2">
                      {subjects.map(subject => (
                        <button
                          key={subject}
                          className={`px-3 py-1 text-sm rounded-full ${
                            activeFilters.subjects.includes(subject)
                              ? 'bg-blue-600 text-white'
                              : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                          }`}
                          onClick={() => toggleFilter('subjects', subject)}
                        >
                          {subject}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Teacher filters */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-blue-700 mb-2">Teacher</h4>
                    <div className="flex flex-wrap gap-2">
                      {teachers.map(teacher => (
                        <button
                          key={teacher}
                          className={`px-3 py-1 text-sm rounded-full ${
                            activeFilters.teachers.includes(teacher)
                              ? 'bg-blue-600 text-white'
                              : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                          }`}
                          onClick={() => toggleFilter('teachers', teacher)}
                        >
                          {teacher}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Tags filters */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-blue-700 mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {allTags.map(tag => (
                        <button
                          key={tag}
                          className={`px-3 py-1 text-sm rounded-full ${
                            activeFilters.tags.includes(tag)
                              ? 'bg-blue-600 text-white'
                              : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                          }`}
                          onClick={() => toggleFilter('tags', tag)}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* File type filters */}
                  <div className="mb-2">
                    <h4 className="font-semibold text-blue-700 mb-2">File Type</h4>
                    <div className="flex flex-wrap gap-2">
                      {fileTypes.map(fileType => (
                        <button
                          key={fileType}
                          className={`px-3 py-1 text-sm rounded-full ${
                            activeFilters.fileTypes.includes(fileType)
                              ? 'bg-blue-600 text-white'
                              : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                          }`}
                          onClick={() => toggleFilter('fileTypes', fileType)}
                        >
                          {fileType.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Active filters display */}
          {filtersApplied && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-sm text-blue-700">Active filters:</span>
              {Object.entries(activeFilters).flatMap(([category, values]) => 
                values.map(value => (
                  <span 
                    key={`${category}-${value}`}
                    className="flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                  >
                    {value}
                    <button 
                      className="ml-2 text-purple-600 hover:text-purple-800"
                      onClick={() => toggleFilter(category, value)}
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))
              )}
              <button 
                className="text-sm text-purple-600 hover:text-purple-800 ml-2"
                onClick={clearAllFilters}
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Notes grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentNotes.length > 0 ? (
            currentNotes.map(note => (
              <div key={note.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className="text-2xl mr-3">{getFileIcon(note.fileType)}</div>
                      <span className="uppercase text-xs font-bold bg-blue-100 text-blue-800 px-2 py-1 rounded">{note.fileType}</span>
                    </div>
                    <span className="text-xs text-purple-600">{note.fileSize}</span>
                  </div>
                  
                  <h2 className="text-xl font-bold text-blue-800 mt-3">{note.title}</h2>
                  
                  <div className="flex items-center mt-2 text-sm text-blue-700">
                    <GraduationCap size={16} className="mr-1" />
                    <span>{note.teacher}</span>
                  </div>
                  
                  <div className="flex items-center mt-1 text-sm text-blue-700">
                    <Book size={16} className="mr-1" />
                    <span>{note.subject}</span>
                  </div>
                  
                  <div className="flex items-center mt-1 text-sm text-blue-700">
                    <Calendar size={16} className="mr-1" />
                    <span>{new Date(note.date).toLocaleDateString()}</span>
                  </div>
                  
                  <p className="mt-3 text-purple-800">{note.description}</p>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    {note.tags.map(tag => (
                      <span 
                        key={`${note.id}-${tag}`}
                        className="flex items-center bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs"
                      >
                        <Tag size={12} className="mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <button 
                    className="mt-4 w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition shadow-sm"
                    onClick={() => handleDownload(note.id)}
                  >
                    <Download size={16} className="mr-2" />
                    Download
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-blue-800 mb-2">No notes found</h3>
              <p className="text-blue-700">Try changing your search or filter criteria</p>
              <button 
                className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-md"
                onClick={clearAllFilters}
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
        
        {/* Pagination */}
        {filteredNotes.length > 0 && totalPages > 1 && (
          <div className="mt-10 flex flex-col items-center">
            <div className="flex flex-wrap justify-center items-center gap-2">
              {/* Previous button */}
              <button
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded-lg flex items-center ${
                  currentPage === 1 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                <ChevronDown className="rotate-90 mr-1" size={16} />
                Prev
              </button>
              
              {/* Page numbers */}
              {getPageNumbers().map((page, index) => (
                page === '...' ? (
                  <span key={`ellipsis-${index}`} className="px-3 py-2">...</span>
                ) : (
                  <button
                    key={page}
                    onClick={() => paginate(page)}
                    className={`w-10 h-10 rounded-lg ${
                      currentPage === page
                        ? 'bg-blue-600 text-white font-bold'
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    }`}
                  >
                    {page}
                  </button>
                )
              ))}
              
              {/* Next button */}
              <button
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded-lg flex items-center ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                Next
                <ChevronDown className="-rotate-90 ml-1" size={16} />
              </button>
            </div>
            
            <div className="mt-3 text-sm text-blue-700">
              Showing {indexOfFirstNote + 1}-{Math.min(indexOfLastNote, filteredNotes.length)} of {filteredNotes.length} notes
            </div>
            
            {/* Notes per page selector */}
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-blue-700">Notes per page:</span>
              <select
                value={notesPerPage}
                onChange={(e) => {
                  setNotesPerPage(Number(e.target.value));
                  setCurrentPage(1); // Reset to first page when changing items per page
                }}
                className="bg-white border border-purple-200 text-blue-700 rounded-lg py-1 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="3">3</option>
                <option value="6">6</option>
                <option value="9">9</option>
                <option value="12">12</option>
              </select>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}