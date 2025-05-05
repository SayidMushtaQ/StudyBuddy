import LandingPage from "./pages/Landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/student/StudentHome'
import DashboardLayout from './layouts/Dashboard'
import Notes from "./pages/student/Notes";
import CreateOwnNotes from "./pages/student/CreateOwnNotes";
import ClassNotes from "./pages/student/classNotes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/student" element={<DashboardLayout/>}>
          <Route index element={<Home />} />
          <Route path="/student/notes" element={<Notes />} />
          <Route path="/student/notes/create" element={<CreateOwnNotes />} />
          <Route path="/student/notes/class" element={<ClassNotes/>} />
        </Route>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
