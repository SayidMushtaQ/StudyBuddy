import { useState } from "react";
import { AttendanceMain } from "../../components/dashboard/student/Attendance/AttendanceMain";

export default function AttendancePage() {
  const [attendanceStatus, setAttendanceStatus] = useState("idle");   
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [cameraActive, setCameraActive] = useState(false);

  // Format current date and time
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Handle the facial recognition process
  const handleStartAttendance = () => {
    setCameraActive(true);
    setAttendanceStatus("scanning");
    setFeedbackMessage("Scanning your face... Please look at the camera");

    // Simulate processing time for the ML model
    setTimeout(() => {
      // Success scenario (in real app, this would be based on ML model results)
      setAttendanceStatus("success");
      setFeedbackMessage("Attendance marked successfully!");

      // Turn off camera after success
      setTimeout(() => {
        setCameraActive(false);
      }, 2000);
    }, 3000);
  };

  const resetAttendance = () => {
    setAttendanceStatus("idle");
    setCameraActive(false);
    setFeedbackMessage("");
  };


  return (
    <div className="p-6 md:p-10">
      <AttendanceMain
        currentDate={currentDate}
        currentTime={currentTime}
        cameraActive={cameraActive}
        attendanceStatus={attendanceStatus}
        feedbackMessage={feedbackMessage}
        handleStartAttendance={handleStartAttendance}
        resetAttendance={resetAttendance}
      />
    </div>
  );
}
