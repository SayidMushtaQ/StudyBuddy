import React from "react";
import {Search} from 'lucide-react'
export default function FilterAndSearch({
  searchQuery,
  setSearchQuery,
  selectedDepartment,
  setSelectedDepartment,
  departments,
  selectedClass,
  setSelectedClass,
  classes,
  filter,
  setFilter,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Search */}
        <div className="md:col-span-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search materials..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Department Filter */}
        <div className="md:col-span-3">
          <select
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Class Filter Dropdown */}
        <div className="md:col-span-3">
          <select
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            {classes.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>

        {/* File Type Filter */}
        <div className="md:col-span-2">
          <select
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="pdf">PDF</option>
          </select>
        </div>
      </div>
    </div>
  );
}
