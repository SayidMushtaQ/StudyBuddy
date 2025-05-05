import React from "react";
import { PlusCircle } from "lucide-react";
export default function Header({
  totalNoteCount,
  classNoteCount,
  personalNoteCount,
  handleCreateNote,
}) {
  return (
    <div className="bg-indigo-700 text-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Notes Dashboard</h1>
          <p className="text-indigo-100">
            You have {totalNoteCount} notes ({classNoteCount} class notes and{" "}
            {personalNoteCount} personal notes)
          </p>
        </div>
        <button
          className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-white text-indigo-700 font-medium rounded-md hover:bg-indigo-50 transition-colors"
          onClick={handleCreateNote}
        >
          <PlusCircle size={20} className="mr-2" />
          Create New Note
        </button>
      </div>
    </div>
  );
}
