import React from "react";
import { SortDesc, Grid, List } from "lucide-react";
export default function Topnav({ sortBy, setSortBy, viewMode, setViewMode }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
      <h2 className="text-xl font-semibold text-gray-800">
        Recently Accessed Notes
      </h2>

      <div className="flex flex-wrap items-center gap-2 mt-3 md:mt-0">
        {/* Sort Options */}
        <div className="relative">
          <select
            className="pl-8 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="recent">Most Recent</option>
            <option value="oldest">Oldest First</option>
            <option value="alphabetical">A-Z</option>
          </select>
          <SortDesc
            size={16}
            className="absolute left-2 top-2.5 text-gray-500"
          />
        </div>

        {/* View Mode Toggles */}
        <div className="flex border border-gray-200 rounded-md">
          <button
            className={`p-2 ${
              viewMode === "grid"
                ? "bg-indigo-50 text-indigo-700"
                : "bg-white text-gray-500"
            }`}
            onClick={() => setViewMode("grid")}
          >
            <Grid size={18} />
          </button>
          <button
            className={`p-2 ${
              viewMode === "list"
                ? "bg-indigo-50 text-indigo-700"
                : "bg-white text-gray-500"
            }`}
            onClick={() => setViewMode("list")}
          >
            <List size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
