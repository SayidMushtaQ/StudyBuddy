import React, { useState } from "react";
import {
  Home,
  BookOpen,
  Settings,
  ChevronLeft,
  ChevronRight,
  FilePlus,
  ClipboardList,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", icon: <Home />, to: "/student" },
    {
      name: "Notes",
      icon: <BookOpen />,
      to: "/student/notes",
      sub: [
        {
          name: "Create Own Notes",
          to: "/student/notes/create",
          icon: <FilePlus />,
        },
        {
          name: "Class Notes",
          to: "/student/notes/class",
          icon: <ClipboardList />,
        },
      ],
    },
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
            <div key={item.name}>
              <Link
                to={item.to}
                className="flex items-center gap-3 text-blue-800 px-4 py-3 rounded-xl hover:bg-blue-100 transition"
              >
                {item.icon}
                {!collapsed && <span>{item.name}</span>}
              </Link>

              {/* Sub-items under Notes */}
              {!collapsed &&
                item.sub &&
                location.pathname.startsWith("/student/notes") && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.sub.map((subItem) => (
                      <Link
                        to={subItem.to}
                        key={subItem.name}
                        className="flex items-center gap-2 text-sm text-blue-700 px-2 py-1 rounded-lg hover:bg-blue-50"
                      >
                        {subItem.icon}
                        <span>{subItem.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
            </div>
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
