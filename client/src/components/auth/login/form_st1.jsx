import React from "react";

export default function FormST1({handlePhoneNumberSubmit,phoneNumber,handleChange}) {
  return (
    <div>
      <h2 className="text-3xl font-bold text-blue-800 text-center mb-6">
        Login with Phone Number
      </h2>
      <form onSubmit={handlePhoneNumberSubmit} className="space-y-6">
        <div>
          <input
            type="text"
            name="phone"
            value={phoneNumber}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="w-full h-12 border border-blue-300 rounded-lg px-4 py-2"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Send OTP
        </button>
      </form>
    </div>
  );
}
