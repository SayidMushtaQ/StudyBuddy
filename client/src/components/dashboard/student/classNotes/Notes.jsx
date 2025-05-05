import React from "react";
import { Download, Book, GraduationCap, Calendar, Tag } from "lucide-react";
export default function ClassNotes({
  currentNotes,
  getFileIcon,
  handleDownload,
  clearAllFilters,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {currentNotes.length > 0 ? (
        currentNotes.map((note) => (
          <div
            key={note.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <div className="text-2xl mr-3">
                    {getFileIcon(note.fileType)}
                  </div>
                  <span className="uppercase text-xs font-bold bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {note.fileType}
                  </span>
                </div>
                <span className="text-xs text-purple-600">{note.fileSize}</span>
              </div>

              <h2 className="text-xl font-bold text-blue-800 mt-3">
                {note.title}
              </h2>

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
                {note.tags.map((tag) => (
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
                className="mt-4 w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition"
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
          <h3 className="text-2xl font-bold text-blue-800 mb-2">
            No notes found
          </h3>
          <p className="text-blue-700">
            Try changing your search or filter criteria
          </p>
          <button
            className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            onClick={clearAllFilters}
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
