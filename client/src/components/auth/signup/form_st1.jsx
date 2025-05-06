import React from "react";

export default function FormST1({form, handleSubmit, handleChange}) {
  return (
    <>
      <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">
        Signup
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-blue-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-blue-300 rounded-xl px-4 py-2"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-blue-700 mb-1">Country</label>
            <input
              type="text"
              name="country"
              value={form.country}
              onChange={handleChange}
              className="w-full border border-blue-300 rounded-xl px-4 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-blue-700 mb-1">State</label>
            <input
              type="text"
              name="state"
              value={form.state}
              onChange={handleChange}
              className="w-full border border-blue-300 rounded-xl px-4 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-blue-700 mb-1">District</label>
            <input
              type="text"
              name="district"
              value={form.district}
              onChange={handleChange}
              className="w-full border border-blue-300 rounded-xl px-4 py-2"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-blue-700 mb-1">Address</label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full border border-blue-300 rounded-xl px-4 py-2"
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-blue-700 mb-1">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border border-blue-300 rounded-xl px-4 py-2"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl shadow-md hover:bg-blue-700"
        >
          Next
        </button>
      </form>
    </>
  );
}