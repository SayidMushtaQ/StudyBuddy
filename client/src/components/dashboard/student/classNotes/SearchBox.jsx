import React from "react";
import { Search, Filter, X } from "lucide-react";
export default function ClassNotesSearch({
  searchTerm,
  setSearchTerm,
  filtersApplied,
  setShowFilterMenu,
  showFilterMenu,
  clearAllFilters,
  activeFilters,
  toggleFilter,
  teachers,
  subjects,
}) {
  return (
    <div className="bg-white rounded-xl  p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        {/* Search */}
        <div className="relative flex-grow">
          <input
            type="text"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-3.5 text-blue-400" size={20} />
          {searchTerm && (
            <button
              className="absolute right-3 top-3.5 text-purple-400 hover:text-purple-600"
              onClick={() => setSearchTerm("")}
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Filter button */}
        <div className="relative">
          <button
            className={`flex items-center justify-center px-6 py-3 rounded-xl ${
              filtersApplied
                ? "bg-purple-600 hover:bg-purple-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
            onClick={() => setShowFilterMenu(!showFilterMenu)}
          >
            <Filter size={20} className="mr-2" />
            Filters {filtersApplied && <span className="ml-1">Applied</span>}
          </button>

          {/* Filter dropdown menu */}
          {showFilterMenu && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg z-10 p-4">
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
                  {subjects.map((subject) => (
                    <button
                      key={subject}
                      className={`px-3 py-1 text-sm rounded-full ${
                        activeFilters.subjects.includes(subject)
                          ? "bg-blue-600 text-white"
                          : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                      }`}
                      onClick={() => toggleFilter("subjects", subject)}
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
                  {teachers.map((teacher) => (
                    <button
                      key={teacher}
                      className={`px-3 py-1 text-sm rounded-full ${
                        activeFilters.teachers.includes(teacher)
                          ? "bg-blue-600 text-white"
                          : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                      }`}
                      onClick={() => toggleFilter("teachers", teacher)}
                    >
                      {teacher}
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
            values.map((value) => (
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
  );
}
