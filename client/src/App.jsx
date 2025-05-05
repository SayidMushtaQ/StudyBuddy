import LandingPage from "./pages/Landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Student from './pages/student'
import DashboardLayout from './layouts/Dashboard'
import Notes from "./pages/student/notes";
import CreateOwnNotes from "./pages/student/CreateOwnNotes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/student" element={<DashboardLayout/>}>
          <Route index element={<Student />} />
          <Route path="/student/notes" element={<Notes />} />
          <Route path="/student/notes/create" element={<CreateOwnNotes />} />
        </Route>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
