import React from "react";

export default function FormST3({form, handleSubmit, handleChange, handleBack}) {
  return (
    <>
      <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">
        College Details
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-blue-700 mb-1">College Name</label>
          <input
            type="text"
            name="collegeName"
            value={form.collegeName}
            onChange={handleChange}
            className="w-full border border-blue-300 rounded-xl px-4 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-blue-700 mb-1">Department</label>
          <input
            type="text"
            name="department"
            value={form.department}
            onChange={handleChange}
            className="w-full border border-blue-300 rounded-xl px-4 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-blue-700 mb-1">Year</label>
          <select
            name="year"
            value={form.year}
            onChange={handleChange}
            className="w-full border border-blue-300 rounded-xl px-4 py-2"
            required
          >
            <option value="">Select Year</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-blue-700 mb-1">College ID</label>
          <input
            type="text"
            name="collegeId"
            value={form.collegeId}
            onChange={handleChange}
            className="w-full border border-blue-300 rounded-xl px-4 py-2"
            required
          />
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleBack}
            className="w-1/3 bg-gray-200 text-gray-800 py-3 rounded-xl shadow-md hover:bg-gray-300"
          >
            Back
          </button>
          <button
            type="submit"
            className="w-2/3 bg-blue-600 text-white py-3 rounded-xl shadow-md hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      </form>
    </>
  );
}