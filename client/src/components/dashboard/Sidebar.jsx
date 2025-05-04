import React, { useState } from "react";
import {
  Home,
  BookOpen,
  Users,
  MessageCircle,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { name: "Home", icon: <Home />, to: "/student" },
    { name: "Notes", icon: <BookOpen />, to: "/student/notes" },
    { name: "Communities", icon: <Users />, to: "/student/communities" },
    { name: "Chat", icon: <MessageCircle />, to: "/student/chat" },
  ];

  return (
    <div
      className={`h-screen bg-white shadow-lg flex flex-col justify-between transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Top Section */}
      <div>
        {/* Toggle Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-purple-300 cursor-pointer"
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>
        </div>

        {/* Nav Links */}
        <nav className="space-y-2 px-2">
          {navItems.map((item) => (
            <Link
              to={item.to}
              key={item.name}
              className="flex items-center gap-3 text-blue-800 px-4 py-3 rounded-xl hover:bg-blue-100 transition"
            >
              {item.icon}
              {!collapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom Settings Link */}
      <div className="p-2 border-t">
        <Link
          to="/settings"
          className="flex items-center gap-3 text-blue-800 px-4 py-3 rounded-xl hover:bg-blue-100 transition"
        >
          <Settings />
          {!collapsed && <span>Settings</span>}
        </Link>
      </div>
    </div>
  );
}
