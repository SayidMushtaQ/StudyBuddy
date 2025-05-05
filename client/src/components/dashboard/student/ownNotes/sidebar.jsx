import React from "react";
import { Trash2, Plus, Search, Book, ArrowUpDown } from "lucide-react";
export default function Sidebar({
  searchTerm,
  setSearchTerm,
  addNewNote,
  setSortBy,
  toggleSortOrder,
  sortBy,
  sortedNotes,
  activeNoteId,
  setActiveNoteId,
  deleteNote,
  formatDate,
}) {
  return (
    <div className="w-full md:w-72 bg-white/90 border-r border-purple-100 flex flex-col">
      <div className="p-6 border-b border-purple-100">
        <h1 className="text-3xl font-bold text-blue-800 flex items-center">
          <Book className="mr-3" size={28} />
          Notes
        </h1>
        <div className="mt-6 relative">
          <input
            className="w-full pl-10 pr-3 py-3 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-3.5 text-blue-400" size={20} />
        </div>
        <button
          className="mt-5 w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl transition shadow-md"
          onClick={addNewNote}
        >
          <Plus size={20} className="mr-2" />
          New Note
        </button>
      </div>

      <div className="flex items-center px-6 py-3 bg-blue-50 border-b border-purple-100">
        <button
          className="flex items-center text-sm text-blue-700 hover:text-blue-800"
          onClick={() => {
            setSortBy("title");
            toggleSortOrder();
          }}
        >
          Sort by {sortBy === "title" ? "Title" : "Date"}
          <ArrowUpDown size={16} className="ml-2" />
        </button>
      </div>

      <div className="overflow-y-auto flex-grow">
        {sortedNotes.length > 0 ? (
          sortedNotes.map((note) => (
            <div
              key={note.id}
              className={`p-4 m-3 border-b border-purple-100 cursor-pointer ${
                note.color
              } rounded-lg shadow-sm transition hover:shadow-md ${
                activeNoteId === note.id ? "border-l-4 border-l-blue-600" : ""
              }`}
              onClick={() => setActiveNoteId(note.id)}
            >
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-blue-800 truncate">
                  {note.title}
                </h3>
                <button
                  className="text-purple-400 hover:text-purple-700 p-1 rounded-full hover:bg-purple-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNote(note.id);
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <p className="text-sm text-blue-700 mt-2 truncate">
                {note.content}
              </p>
              <p className="text-xs text-purple-500 mt-2">
                {formatDate(note.date)}
              </p>
            </div>
          ))
        ) : (
          <p className="p-6 text-blue-700 text-center">No notes found.</p>
        )}
      </div>
    </div>
  );
}
