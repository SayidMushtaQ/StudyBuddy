// TopNavbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { User, Settings, LogOut } from "lucide-react";

export default function TopNavbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold bg-gradient-to-br from-blue-100 to-purple-200 px-5 py-1.5 rounded-xl">StudyBuddy</h1>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center space-x-2 bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold px-4 py-2 rounded-full transition"
        >
          <User className="w-5 h-5" />
          <span>User</span>
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
            <button className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </button>
            <button className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-gray-100">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
