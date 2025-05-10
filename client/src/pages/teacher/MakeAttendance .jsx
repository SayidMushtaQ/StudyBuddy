import { useState } from "react";
import {
  Calendar,
  Clock,
  Users,
  CheckCircle,
  AlertCircle,
  Settings,
  Info,
} from "lucide-react";

export default function AttendanceDashboard() {
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("08:30");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [description, setDescription] = useState("");
  const [attendanceSessions, setAttendanceSessions] = useState([]);

  const createSession = () => {
    const newSession = {
      id: attendanceSessions.length + 1,
      date,
      startTime,
      endTime,
      description,
      status: "active",
      studentsPresent: 0,
      studentsTotal: 25,
    };
    setAttendanceSessions([newSession, ...attendanceSessions]);
    setDescription("");
  };


  return (
    <div className="p-6">
      <main className="max-w-6xl mx-auto">
        <div className="mb-12 mt-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">Attendance</h1>
          <p className="text-lg text-blue-700">
            Set attendance time periods for your students
          </p>
        </div>

        {/* Create New Attendance Session */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 border-t-2 border-blue-300">
          <h2 className="text-2xl font-bold text-blue-800 mb-6 flex items-center">
            <Clock className="mr-2" size={24} /> Create New Attendance Window
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div>
              <label className="block text-blue-700 font-medium mb-2">
                Date
              </label>
              <div className="relative">
                <Calendar
                  className="absolute left-3 top-3 text-blue-600"
                  size={18}
                />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full pl-10 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-blue-700 font-medium mb-2">
                Start Time
              </label>
              <div className="relative">
                <Clock
                  className="absolute left-3 top-3 text-blue-600"
                  size={18}
                />
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full pl-10 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-blue-700 font-medium mb-2">
                End Time
              </label>
              <div className="relative">
                <Clock
                  className="absolute left-3 top-3 text-blue-600"
                  size={18}
                />
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full pl-10 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-blue-700 font-medium mb-2">
                Description
              </label>
              <div className="relative">
                <Info
                  className="absolute left-3 top-3 text-blue-600"
                  size={18}
                />
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Morning attendance"
                  className="w-full pl-10 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={createSession}
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-xl font-medium transition duration-200 flex items-center cursor-pointer"
            >
              <CheckCircle className="mr-2" size={20} />
              Create Attendance Window
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
