import React from "react";
import { GraduationCap, User } from "lucide-react";

export default function FormST2({form, handleSubmit, setForm, handleBack}) {
  return (
    <>
      <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">
        Join as a
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div
            onClick={() => setForm({ ...form, role: "STUDENT" })}
            className={`cursor-pointer bg-white rounded-2xl p-6 shadow-md flex flex-col items-center justify-center transition hover:shadow-lg border-2 ${
              form.role === "STUDENT" ? "border-blue-600" : "border-transparent"
            }`}
          >
            <GraduationCap className="w-8 h-8 text-blue-700" />
            <h3 className="text-xl font-semibold text-gray-800 mt-4">
              Student
            </h3>
          </div>
          <div
            onClick={() => setForm({ ...form, role: "TEACHER" })}
            className={`cursor-pointer bg-white rounded-2xl p-6 shadow-md flex flex-col items-center justify-center transition hover:shadow-lg border-2 ${
              form.role === "TEACHER" ? "border-blue-600" : "border-transparent"
            }`}
          >
            <User className="w-8 h-8 text-purple-700" />
            <h3 className="text-xl font-semibold text-gray-800 mt-4">
              Teacher
            </h3>
          </div>
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