import React from "react";
import { Plus, Book } from "lucide-react";
export default function Writer({activeNote,updateNote,formatDate,colorOptions,addNewNote}) {
  return (
    activeNote ? (
      <>
        <div className="p-6 border-b border-purple-100 bg-white/90 shadow-sm">
          <input
            className="w-full text-2xl font-bold mb-4 px-4 py-2 border border-transparent rounded-xl focus:outline-none focus:border-purple-200 text-blue-800"
            value={activeNote.title}
            onChange={(e) => updateNote("title", e.target.value)}
            placeholder="Note title"
          />
          <div className="flex flex-wrap items-center text-sm text-blue-700">
            <span>Last edited: {formatDate(activeNote.date)}</span>
            <div className="ml-6 flex items-center">
              <span className="mr-3">Color:</span>
              <div className="flex space-x-2">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    className={`w-6 h-6 rounded-full ${color} border shadow-sm ${
                      activeNote.color === color
                        ? "border-blue-800 ring-2 ring-blue-400"
                        : "border-purple-200"
                    }`}
                    onClick={() => updateNote("color", color)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <textarea
          className="flex-grow w-full p-6 text-blue-800 bg-white/80 resize-none focus:outline-none shadow-inner"
          value={activeNote.content}
          onChange={(e) => updateNote("content", e.target.value)}
          placeholder="Start typing your note here..."
        />
      </>
    ) : (
      <div className="flex-grow flex flex-col items-center justify-center text-blue-700">
        <Book size={80} className="mb-6 text-purple-300" />
        <p className="text-2xl font-bold text-blue-800 mb-2">
          Select a note or create a new one
        </p>
        <p className="text-blue-700 mb-6">
          Your thoughts deserve a beautiful home
        </p>
        <button
          className="mt-4 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition shadow-md"
          onClick={addNewNote}
        >
          <Plus size={20} className="mr-2" />
          New Note
        </button>
      </div>
    )
  );
}
