import React from "react";
import { Notebook, BookOpen, Clock, ChevronRight } from "lucide-react";
export default function NotesCards({
  viewMode,
  getSortedNotes,
  handleViewNote,
  formatDate,
}) {
  return viewMode === "grid" ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {getSortedNotes().map((note) => (
        <div
          key={`${note.type}-${note.id}`}
          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => handleViewNote(note)}
        >
          <div className="flex items-center justify-between mb-2">
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                note.type === "personal"
                  ? "bg-purple-100 text-purple-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {note.type === "personal" ? "Personal" : "Class"}
            </span>
            <span className="text-xs text-gray-500 flex items-center">
              <Clock size={12} className="mr-1" />
              {new Date(note.lastAccessed).toLocaleDateString()}
            </span>
          </div>
          <h3 className="text-lg font-medium text-indigo-600 mb-1">
            {note.title}
          </h3>
          <div className="mb-2">
            <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
              {note.category}
            </span>
          </div>
          <p className="text-gray-600 text-sm line-clamp-2">{note.content}</p>
        </div>
      ))}
    </div>
  ) : (
    <div className="divide-y divide-gray-200">
      {getSortedNotes().map((note) => (
        <div
          key={`${note.type}-${note.id}`}
          className="py-3 flex items-center justify-between hover:bg-gray-50 cursor-pointer"
          onClick={() => handleViewNote(note)}
        >
          <div className="flex items-center">
            {note.type === "personal" ? (
              <Notebook size={18} className="text-purple-600 mr-3" />
            ) : (
              <BookOpen size={18} className="text-blue-600 mr-3" />
            )}
            <div>
              <h3 className="font-medium text-gray-800">{note.title}</h3>
              <div className="flex items-center text-xs text-gray-500 mt-1">
                <span className="mr-2">{note.category}</span>
                <span>•</span>
                <Clock size={12} className="mx-2" />
                <span>{formatDate(note.date)}</span>
              </div>
            </div>
          </div>
          <ChevronRight size={16} className="text-gray-400" />
        </div>
      ))}
    </div>
  );
}
