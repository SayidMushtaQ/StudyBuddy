import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  filteredNotes,
  goToPreviousPage,
  currentPage,
  getPageNumbers,
  goToPage,
  goToNextPage,
  totalPages,
}) {
  return (
    filteredNotes.length > 0 && (
      <div className="mt-8 flex justify-center">
        <div className="flex items-center bg-white px-4 py-2 rounded-xl shadow-md">
          {/* Previous page button */}
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-600 hover:bg-blue-100"
            }`}
          >
            <ChevronLeft size={20} />
          </button>

          {/* Page numbers */}
          <div className="flex items-center mx-2">
            {getPageNumbers().map((page, index) =>
              page === "..." ? (
                <span key={`ellipsis-${index}`} className="px-2 text-blue-800">
                  ...
                </span>
              ) : (
                <button
                  key={`page-${page}`}
                  onClick={() => goToPage(page)}
                  className={`w-8 h-8 mx-1 flex items-center justify-center rounded-full ${
                    currentPage === page
                      ? "bg-blue-600 text-white"
                      : "text-blue-800 hover:bg-blue-100"
                  }`}
                >
                  {page}
                </button>
              )
            )}
          </div>

          {/* Next page button */}
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-lg ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-600 hover:bg-blue-100"
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    )
  );
}
