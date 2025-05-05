import { useState } from "react";
import {
  Users,
  Bell,
  FileText,
  Upload,
  MessageSquare,
  ChevronRight,
} from "lucide-react";

export default function TeacherDashboard() {
  const [teacherName] = useState("Sarah Johnson");

  return (
    <div className="h-[80vh]">
      {/* Main Content */}
      <div className="container mx-auto p-6 mt-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10">
          <h2 className="text-3xl font-bold text-blue-800 mb-3">
            Welcome back, {teacherName}!
          </h2>
          <p className="text-gray-600 mb-6">
            Here's what's happening with your classes today
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-blue-700">Active Students</h3>
                <Users className="text-blue-600" size={20} />
              </div>
              <p className="text-3xl font-bold text-blue-800">124</p>
              <p className="text-sm text-blue-600 mt-2">12 new this week</p>
            </div>


            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-purple-700">Pending Reviews</h3>
                <FileText className="text-purple-600" size={20} />
              </div>
              <p className="text-3xl font-bold text-purple-800">18</p>
              <p className="text-sm text-purple-600 mt-2">5 new submissions</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <h2 className="text-2xl font-bold text-blue-800 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-md p-6 transition hover:shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <div className="p-3 bg-blue-100 rounded-lg inline-block mb-4">
                  <Upload className="text-blue-700" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-blue-800 mb-2">
                  Upload Notes
                </h3>
                <p className="text-gray-600 mb-4">
                  Share study materials with your students
                </p>
                <button className="flex items-center text-blue-700 font-medium hover:text-blue-800 transition">
                  Upload now
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-3 rounded-lg">
                <FileText size={32} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 transition hover:shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <div className="p-3 bg-purple-100 rounded-lg inline-block mb-4">
                  <MessageSquare className="text-purple-700" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-purple-800 mb-2">
                  Make Announcement
                </h3>
                <p className="text-gray-600 mb-4">
                  Send important updates to your classes
                </p>
                <button className="flex items-center text-purple-700 font-medium hover:text-purple-800 transition">
                  Create now
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-3 rounded-lg">
                <Bell size={32} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
