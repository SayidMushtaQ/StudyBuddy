import {
  Camera,
  CheckCircle,
  AlertCircle,
  Calendar,
  Clock
} from "lucide-react";
export const AttendanceMain = ({
  currentDate,
  currentTime,
  cameraActive,
  attendanceStatus,
  feedbackMessage,
  handleStartAttendance,
  resetAttendance,
}) => (
  <div className="flex flex-col items-center w-full">
    <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <h1 className="text-3xl font-bold text-center">Mark Attendance</h1>
      </div>

      {/* Date and Time */}
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Calendar className="mr-3 text-blue-700" size={20} />
            <span className="text-blue-800 font-medium">{currentDate}</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-3 text-blue-700" size={20} />
            <span className="text-blue-800 font-medium">{currentTime}</span>
          </div>
        </div>
      </div>

      {/* Camera View / Status */}
      <div className="p-6">
        <div
          className={`bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl overflow-hidden ${
            cameraActive ? "border-3 border-blue-500 shadow-lg" : "shadow-md"
          }`}
          style={{ minHeight: "300px" }}
        >
          {cameraActive ? (
            <div className="relative h-72 flex items-center justify-center bg-black rounded-xl">
              {/* This would be a live camera feed in a real app */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Camera size={80} className="text-white opacity-30" />
              </div>

              {/* Face outline guide */}
              <div className="absolute w-40 h-40 border-3 border-purple-400 rounded-full opacity-70"></div>

              {attendanceStatus === "success" && (
                <div className="absolute inset-0 bg-green-500 bg-opacity-30 flex items-center justify-center rounded-xl">
                  <CheckCircle size={80} className="text-white" />
                </div>
              )}

              {attendanceStatus === "error" && (
                <div className="absolute inset-0 bg-red-500 bg-opacity-30 flex items-center justify-center rounded-xl">
                  <AlertCircle size={80} className="text-white" />
                </div>
              )}
            </div>
          ) : (
            <div className="h-72 flex flex-col items-center justify-center">
              <Camera size={80} className="text-purple-400 mb-6" />
              <p className="text-blue-800 text-center text-lg font-medium">
                Camera is off
              </p>
              <p className="text-blue-600 text-center mt-3">
                Click "Mark Attendance" to activate
              </p>
            </div>
          )}
        </div>

        {/* Feedback Message */}
        <div className="mt-6">
          <p
            className={`text-center text-lg ${
              attendanceStatus === "success"
                ? "text-green-600 font-medium"
                : attendanceStatus === "error"
                ? "text-red-600 font-medium"
                : "text-blue-700 font-medium"
            }`}
          >
            {feedbackMessage}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col">
          {attendanceStatus === "idle" ? (
            <button
              onClick={handleStartAttendance}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 hover:shadow-md transform hover:scale-[1.02] transition duration-300"
            >
              Mark Attendance
            </button>
          ) : attendanceStatus === "success" ? (
            <button
              onClick={resetAttendance}
              className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 hover:shadow-md transform hover:scale-[1.02] transition duration-300"
            >
              Done
            </button>
          ) : attendanceStatus === "error" ? (
            <button
              onClick={handleStartAttendance}
              className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 hover:shadow-md transform hover:scale-[1.02] transition duration-300"
            >
              Try Again
            </button>
          ) : (
            <button
              className="w-full bg-purple-400 text-white py-4 rounded-xl font-bold text-lg cursor-not-allowed"
              disabled
            >
              Processing...
            </button>
          )}
        </div>
      </div>
    </div>
  </div>
);
