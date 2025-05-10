import LandingPage from "./pages/Landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentHome from "./pages/student";
import StudentDashboard from "./layouts/student/Dashboard";
import TeacherDashboard from "./layouts/teacher/Dashboard";

import Notes from "./pages/student/Notes/Index";
import CreateOwnNotes from "./pages/student/Notes/OwnNotes";
import ClassNotes from "./pages/student/Notes/ClassNotes";
import Attendance from './pages/student/Attendance'

import TeacherHome from "./pages/teacher";
import UploadNotes from "./pages/teacher/UploadNotes";
import MakeAnnouncement from "./pages/teacher/MakeAnnouncement";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/student" element={<StudentDashboard />}>
          <Route index element={<StudentHome />} />
          <Route path="/student/notes" element={<Notes />} />
          <Route path="/student/notes/create" element={<CreateOwnNotes />} />
          <Route path="/student/notes/class" element={<ClassNotes />} />
          <Route path="/student/attendance" element={<Attendance />} />
        </Route>
        <Route path="/teacher" element={<TeacherDashboard />}>
          <Route index element={<TeacherHome />} />
          <Route  path="/teacher/upload-notes" element={<UploadNotes />} />
          <Route  path="/teacher/make-announcement" element={<MakeAnnouncement />} />
        </Route>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
